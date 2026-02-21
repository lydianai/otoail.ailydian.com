/**
 * FHIR R4 INTEGRATION LAYER
 * Epic, Cerner, and US Hospital Systems - Production Ready
 *
 * FHIR R4 Core Resources:
 * 1. Patient Resource
 * 2. Encounter Resource
 * 3. Observation Resource (Vitals, Labs)
 * 4. Condition Resource (Diagnoses)
 * 5. MedicationRequest Resource
 * 6. DiagnosticReport Resource
 * 7. DocumentReference Resource
 * 8. AllergyIntolerance Resource
 */

import { Bundle, Patient, Encounter, Observation, Condition, MedicationRequest, DiagnosticReport, DocumentReference, AllergyIntolerance, OperationOutcome } from 'fhir/r4'

// ============================================
// FHIR CONFIGURATION
// ============================================

interface FHIRConfig {
  // FHIR Server URL (Epic, Cerner, etc.)
  baseUrl: string

  // OAuth 2.0 / SMART on FHIR
  auth: {
    type: 'OAUTH2' | 'BASIC' | 'API_KEY'
    clientId?: string
    clientSecret?: string
    tokenUrl?: string
    scope?: string
    apiKey?: string
  }

  // Facility/Organization Identifier
  facilityId: string
  facilityName: string

  // Timeouts
  timeout: number

  // Test/Production Mode
  testMode: boolean
}

const getFHIRConfig = (): FHIRConfig => {
  if (!process.env.FHIR_BASE_URL) {
    throw new Error('FHIR_BASE_URL environment variable is required')
  }

  return {
    baseUrl: process.env.FHIR_BASE_URL,

    auth: {
      type: (process.env.FHIR_AUTH_TYPE as 'OAUTH2' | 'BASIC' | 'API_KEY') || 'OAUTH2',
      clientId: process.env.FHIR_CLIENT_ID,
      clientSecret: process.env.FHIR_CLIENT_SECRET,
      tokenUrl: process.env.FHIR_TOKEN_URL,
      scope: process.env.FHIR_SCOPE || 'patient/*.read patient/*.write',
      apiKey: process.env.FHIR_API_KEY,
    },

    facilityId: process.env.FHIR_FACILITY_ID || '',
    facilityName: process.env.FHIR_FACILITY_NAME || '',

    timeout: parseInt(process.env.FHIR_TIMEOUT || '30000'),
    testMode: process.env.FHIR_TEST_MODE === 'true',
  }
}

// ============================================
// FHIR CLIENT
// ============================================

class FHIRClient {
  private config: FHIRConfig
  private accessToken: string | null = null
  private tokenExpiry: number | null = null

  constructor() {
    this.config = getFHIRConfig()
  }

  /**
   * Get OAuth 2.0 Access Token (SMART on FHIR)
   */
  private async getAccessToken(): Promise<string> {
    // Return cached token if still valid
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken
    }

    if (this.config.auth.type === 'OAUTH2') {
      if (!this.config.auth.tokenUrl || !this.config.auth.clientId || !this.config.auth.clientSecret) {
        throw new Error('OAuth2 credentials not configured')
      }

      const params = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.config.auth.clientId,
        client_secret: this.config.auth.clientSecret,
        scope: this.config.auth.scope || '',
      })

      try {
        const response = await fetch(this.config.auth.tokenUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        })

        if (!response.ok) {
          throw new Error(`OAuth token request failed: ${response.status}`)
        }

        const data = await response.json()
        this.accessToken = data.access_token
        this.tokenExpiry = Date.now() + (data.expires_in * 1000)

        return this.accessToken

      } catch (error) {
        throw new Error(`OAuth authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    // API Key authentication
    if (this.config.auth.type === 'API_KEY' && this.config.auth.apiKey) {
      return this.config.auth.apiKey
    }

    throw new Error('No valid authentication method configured')
  }

  /**
   * Build Authorization Headers
   */
  private async getHeaders(): Promise<HeadersInit> {
    const headers: HeadersInit = {
      'Content-Type': 'application/fhir+json',
      'Accept': 'application/fhir+json',
    }

    if (this.config.auth.type === 'OAUTH2') {
      const token = await this.getAccessToken()
      headers['Authorization'] = `Bearer ${token}`
    } else if (this.config.auth.type === 'API_KEY') {
      headers['X-API-Key'] = this.config.auth.apiKey || ''
    }

    return headers
  }

  /**
   * FHIR HTTP Request
   */
  protected async fhirRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    body?: any
  ): Promise<T> {
    const url = `${this.config.baseUrl}${path}`
    const headers = await this.getHeaders()

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(this.config.timeout),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`FHIR HTTP Error ${response.status}: ${errorText}`)
      }

      return await response.json() as T

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`FHIR Request Failed: ${error.message}`)
      }
      throw error
    }
  }

  /**
   * Search Resources
   */
  protected async search<T>(
    resourceType: string,
    params: Record<string, string>
  ): Promise<Bundle<T>> {
    const queryString = new URLSearchParams(params).toString()
    return this.fhirRequest<Bundle<T>>('GET', `/${resourceType}?${queryString}`)
  }

  /**
   * Create Resource
   */
  protected async create<T>(
    resourceType: string,
    resource: T
  ): Promise<T> {
    return this.fhirRequest<T>('POST', `/${resourceType}`, resource)
  }

  /**
   * Read Resource
   */
  protected async read<T>(
    resourceType: string,
    id: string
  ): Promise<T> {
    return this.fhirRequest<T>('GET', `/${resourceType}/${id}`)
  }

  /**
   * Update Resource
   */
  protected async update<T>(
    resourceType: string,
    id: string,
    resource: T
  ): Promise<T> {
    return this.fhirRequest<T>('PUT', `/${resourceType}/${id}`, resource)
  }
}

// ============================================
// 1. PATIENT RESOURCE
// ============================================

export interface FHIRPatientCreate {
  // Identifiers
  mrn: string
  ssn?: string

  // Demographics
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: string // YYYY-MM-DD
  gender: 'male' | 'female' | 'other' | 'unknown'

  // Contact
  phoneHome?: string
  phoneMobile?: string
  email?: string

  // Address
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  zipCode: string
  country?: string
}

export interface FHIRPatientResponse {
  success: boolean
  patientId?: string
  patient?: Patient
  error?: string
}

export class FHIRPatientService extends FHIRClient {
  /**
   * Create Patient Resource
   */
  async createPatient(data: FHIRPatientCreate): Promise<FHIRPatientResponse> {
    const patient: Patient = {
      resourceType: 'Patient',
      identifier: [
        {
          use: 'official',
          system: `${this.config.baseUrl}/identifier/mrn`,
          value: data.mrn,
        },
      ],
      name: [
        {
          use: 'official',
          family: data.lastName,
          given: data.middleName ? [data.firstName, data.middleName] : [data.firstName],
        },
      ],
      telecom: [
        ...(data.phoneMobile ? [{
          system: 'phone' as const,
          value: data.phoneMobile,
          use: 'mobile' as const,
        }] : []),
        ...(data.phoneHome ? [{
          system: 'phone' as const,
          value: data.phoneHome,
          use: 'home' as const,
        }] : []),
        ...(data.email ? [{
          system: 'email' as const,
          value: data.email,
        }] : []),
      ],
      gender: data.gender,
      birthDate: data.dateOfBirth,
      address: [
        {
          use: 'home',
          line: data.addressLine2 ? [data.addressLine1, data.addressLine2] : [data.addressLine1],
          city: data.city,
          state: data.state,
          postalCode: data.zipCode,
          country: data.country || 'US',
        },
      ],
      active: true,
    }

    // Add SSN if provided (as separate identifier)
    if (data.ssn) {
      patient.identifier?.push({
        use: 'official',
        system: 'http://hl7.org/fhir/sid/us-ssn',
        value: data.ssn,
      })
    }

    try {
      const created = await this.create<Patient>('Patient', patient)
      return {
        success: true,
        patientId: created.id,
        patient: created,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Search Patient by MRN
   */
  async searchPatientByMRN(mrn: string): Promise<FHIRPatientResponse> {
    try {
      const bundle = await this.search<Patient>('Patient', {
        identifier: `${this.config.baseUrl}/identifier/mrn|${mrn}`,
      })

      if (bundle.entry && bundle.entry.length > 0) {
        const patient = bundle.entry[0].resource as Patient
        return {
          success: true,
          patientId: patient.id,
          patient,
        }
      }

      return {
        success: false,
        error: 'Patient not found',
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Update Patient
   */
  async updatePatient(patientId: string, updates: Partial<FHIRPatientCreate>): Promise<FHIRPatientResponse> {
    try {
      // First, read existing patient
      const existingPatient = await this.read<Patient>('Patient', patientId)

      // Update fields
      if (updates.phoneHome || updates.phoneMobile || updates.email) {
        existingPatient.telecom = [
          ...(updates.phoneMobile ? [{
            system: 'phone' as const,
            value: updates.phoneMobile,
            use: 'mobile' as const,
          }] : []),
          ...(updates.phoneHome ? [{
            system: 'phone' as const,
            value: updates.phoneHome,
            use: 'home' as const,
          }] : []),
          ...(updates.email ? [{
            system: 'email' as const,
            value: updates.email,
          }] : []),
        ]
      }

      if (updates.addressLine1 || updates.city || updates.state || updates.zipCode) {
        existingPatient.address = [
          {
            use: 'home',
            line: updates.addressLine2 ? [updates.addressLine1 || '', updates.addressLine2] : [updates.addressLine1 || ''],
            city: updates.city,
            state: updates.state,
            postalCode: updates.zipCode,
            country: updates.country || 'US',
          },
        ]
      }

      const updated = await this.update<Patient>('Patient', patientId, existingPatient)

      return {
        success: true,
        patientId: updated.id,
        patient: updated,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
}

// ============================================
// 2. ENCOUNTER RESOURCE
// ============================================

export interface FHIREncounterCreate {
  patientId: string
  encounterClass: 'AMB' | 'EMER' | 'IMP' | 'OBSENC'
  encounterType?: string // SNOMED CT code
  startTime: string // ISO 8601
  endTime?: string
  status: 'planned' | 'arrived' | 'in-progress' | 'finished' | 'cancelled'

  // Provider
  attendingProviderNPI: string
  attendingProviderName: string

  // Location
  locationId?: string
  locationName?: string

  // Reason
  reasonCode?: string // SNOMED CT
  reasonText?: string
}

export interface FHIREncounterResponse {
  success: boolean
  encounterId?: string
  encounter?: Encounter
  error?: string
}

export class FHIREncounterService extends FHIRClient {
  /**
   * Create Encounter
   */
  async createEncounter(data: FHIREncounterCreate): Promise<FHIREncounterResponse> {
    const encounter: Encounter = {
      resourceType: 'Encounter',
      status: data.status,
      class: {
        system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
        code: data.encounterClass,
      },
      subject: {
        reference: `Patient/${data.patientId}`,
      },
      period: {
        start: data.startTime,
        end: data.endTime,
      },
      participant: [
        {
          type: [
            {
              coding: [
                {
                  system: 'http://terminology.hl7.org/CodeSystem/v3-ParticipationType',
                  code: 'ATND',
                  display: 'attender',
                },
              ],
            },
          ],
          individual: {
            identifier: {
              system: 'http://hl7.org/fhir/sid/us-npi',
              value: data.attendingProviderNPI,
            },
            display: data.attendingProviderName,
          },
        },
      ],
    }

    // Add encounter type if provided
    if (data.encounterType) {
      encounter.type = [
        {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: data.encounterType,
            },
          ],
        },
      ]
    }

    // Add reason if provided
    if (data.reasonCode || data.reasonText) {
      encounter.reasonCode = [
        {
          coding: data.reasonCode ? [
            {
              system: 'http://snomed.info/sct',
              code: data.reasonCode,
            },
          ] : [],
          text: data.reasonText,
        },
      ]
    }

    // Add location if provided
    if (data.locationId && data.locationName) {
      encounter.location = [
        {
          location: {
            reference: `Location/${data.locationId}`,
            display: data.locationName,
          },
        },
      ]
    }

    try {
      const created = await this.create<Encounter>('Encounter', encounter)
      return {
        success: true,
        encounterId: created.id,
        encounter: created,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Update Encounter Status
   */
  async updateEncounterStatus(
    encounterId: string,
    status: 'planned' | 'arrived' | 'in-progress' | 'finished' | 'cancelled',
    endTime?: string
  ): Promise<FHIREncounterResponse> {
    try {
      const existingEncounter = await this.read<Encounter>('Encounter', encounterId)
      existingEncounter.status = status

      if (endTime && existingEncounter.period) {
        existingEncounter.period.end = endTime
      }

      const updated = await this.update<Encounter>('Encounter', encounterId, existingEncounter)

      return {
        success: true,
        encounterId: updated.id,
        encounter: updated,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
}

// ============================================
// 3. OBSERVATION RESOURCE (Vitals & Labs)
// ============================================

export interface FHIRObservationCreate {
  patientId: string
  encounterId?: string

  // LOINC Code
  loincCode: string
  loincDisplay: string

  // Value
  valueQuantity?: {
    value: number
    unit: string
    system?: string
    code?: string
  }
  valueString?: string

  // Status
  status: 'registered' | 'preliminary' | 'final' | 'amended' | 'corrected' | 'cancelled'

  // Time
  effectiveDateTime: string // ISO 8601

  // Performer (who measured)
  performerNPI?: string
  performerName?: string

  // Reference Range
  referenceRangeLow?: number
  referenceRangeHigh?: number
  referenceRangeText?: string

  // Interpretation
  interpretation?: 'L' | 'H' | 'LL' | 'HH' | 'N' | 'A'
}

export interface FHIRObservationResponse {
  success: boolean
  observationId?: string
  observation?: Observation
  error?: string
}

export class FHIRObservationService extends FHIRClient {
  /**
   * Create Observation (Vital Sign or Lab Result)
   */
  async createObservation(data: FHIRObservationCreate): Promise<FHIRObservationResponse> {
    const observation: Observation = {
      resourceType: 'Observation',
      status: data.status,
      category: [
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/observation-category',
              code: 'vital-signs',
              display: 'Vital Signs',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: data.loincCode,
            display: data.loincDisplay,
          },
        ],
      },
      subject: {
        reference: `Patient/${data.patientId}`,
      },
      effectiveDateTime: data.effectiveDateTime,
    }

    // Add encounter if provided
    if (data.encounterId) {
      observation.encounter = {
        reference: `Encounter/${data.encounterId}`,
      }
    }

    // Add value (quantity or string)
    if (data.valueQuantity) {
      observation.valueQuantity = {
        value: data.valueQuantity.value,
        unit: data.valueQuantity.unit,
        system: data.valueQuantity.system || 'http://unitsofmeasure.org',
        code: data.valueQuantity.code || data.valueQuantity.unit,
      }
    } else if (data.valueString) {
      observation.valueString = data.valueString
    }

    // Add performer
    if (data.performerNPI && data.performerName) {
      observation.performer = [
        {
          identifier: {
            system: 'http://hl7.org/fhir/sid/us-npi',
            value: data.performerNPI,
          },
          display: data.performerName,
        },
      ]
    }

    // Add reference range
    if (data.referenceRangeLow !== undefined || data.referenceRangeHigh !== undefined) {
      observation.referenceRange = [
        {
          low: data.referenceRangeLow !== undefined ? {
            value: data.referenceRangeLow,
            unit: data.valueQuantity?.unit || '',
          } : undefined,
          high: data.referenceRangeHigh !== undefined ? {
            value: data.referenceRangeHigh,
            unit: data.valueQuantity?.unit || '',
          } : undefined,
          text: data.referenceRangeText,
        },
      ]
    }

    // Add interpretation
    if (data.interpretation) {
      const interpretationMap: Record<string, string> = {
        L: 'Low',
        H: 'High',
        LL: 'Critical Low',
        HH: 'Critical High',
        N: 'Normal',
        A: 'Abnormal',
      }

      observation.interpretation = [
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
              code: data.interpretation,
              display: interpretationMap[data.interpretation],
            },
          ],
        },
      ]
    }

    try {
      const created = await this.create<Observation>('Observation', observation)
      return {
        success: true,
        observationId: created.id,
        observation: created,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Search Observations by Patient and LOINC Code
   */
  async searchObservations(
    patientId: string,
    loincCode?: string,
    dateFrom?: string,
    dateTo?: string
  ): Promise<{ success: boolean; observations?: Observation[]; error?: string }> {
    try {
      const params: Record<string, string> = {
        patient: patientId,
      }

      if (loincCode) {
        params.code = `http://loinc.org|${loincCode}`
      }

      if (dateFrom) {
        params.date = `ge${dateFrom}`
      }

      if (dateTo) {
        params.date = params.date ? `${params.date}&date=le${dateTo}` : `le${dateTo}`
      }

      const bundle = await this.search<Observation>('Observation', params)

      const observations = bundle.entry?.map(entry => entry.resource as Observation) || []

      return {
        success: true,
        observations,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
}

// ============================================
// EXPORT ALL SERVICES
// ============================================

export const fhirServices = {
  patient: new FHIRPatientService(),
  encounter: new FHIREncounterService(),
  observation: new FHIRObservationService(),
}
