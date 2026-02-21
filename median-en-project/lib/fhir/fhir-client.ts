/**
 * FHIR R5 Integration Client
 * Production-ready HL7 FHIR R5 standard implementation
 *
 * Features:
 * - Real FHIR server connectivity (HAPI, Epic, Cerner)
 * - Patient resource management
 * - Observation, Medication, Procedure resources
 * - Blockchain integration (hash verification)
 * - HIPAA-compliant data handling
 */

import axios, { AxiosInstance } from "axios";
import { createHash } from "crypto";

// ==================== TYPES ====================

export interface FHIRConfig {
  serverUrl: string;
  clientId?: string;
  clientSecret?: string;
  tokenEndpoint?: string;
}

export interface FHIRAuthorization {
  accessToken: string;
  tokenType: string;
  expiresAt: Date;
  scope: string;
}

// FHIR R5 Resource Types
export interface Patient {
  resourceType: "Patient";
  id?: string;
  identifier?: Identifier[];
  name?: HumanName[];
  gender?: "male" | "female" | "other" | "unknown";
  birthDate?: string;
  address?: Address[];
  telecom?: ContactPoint[];
  meta?: Meta;
}

export interface Observation {
  resourceType: "Observation";
  id?: string;
  status: "registered" | "preliminary" | "final" | "amended" | "corrected" | "cancelled";
  category?: CodeableConcept[];
  code: CodeableConcept;
  subject: Reference;
  effectiveDateTime?: string;
  issued?: string;
  valueQuantity?: Quantity;
  valueCodeableConcept?: CodeableConcept;
  valueString?: string;
  interpretation?: CodeableConcept[];
  note?: Annotation[];
  meta?: Meta;
}

export interface MedicationRequest {
  resourceType: "MedicationRequest";
  id?: string;
  status: "active" | "on-hold" | "cancelled" | "completed" | "entered-in-error" | "stopped" | "draft" | "unknown";
  intent: "proposal" | "plan" | "order" | "original-order" | "reflex-order" | "filler-order" | "instance-order" | "option";
  medicationCodeableConcept?: CodeableConcept;
  subject: Reference;
  authoredOn?: string;
  requester?: Reference;
  dosageInstruction?: Dosage[];
  meta?: Meta;
}

export interface Procedure {
  resourceType: "Procedure";
  id?: string;
  status: "preparation" | "in-progress" | "not-done" | "on-hold" | "stopped" | "completed" | "entered-in-error" | "unknown";
  code: CodeableConcept;
  subject: Reference;
  performedDateTime?: string;
  performer?: ProcedurePerformer[];
  outcome?: CodeableConcept;
  note?: Annotation[];
  meta?: Meta;
}

// Supporting types
export interface Identifier {
  use?: "usual" | "official" | "temp" | "secondary" | "old";
  system?: string;
  value?: string;
}

export interface HumanName {
  use?: "usual" | "official" | "temp" | "nickname" | "anonymous" | "old" | "maiden";
  family?: string;
  given?: string[];
  prefix?: string[];
  suffix?: string[];
}

export interface Address {
  use?: "home" | "work" | "temp" | "old" | "billing";
  line?: string[];
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface ContactPoint {
  system?: "phone" | "fax" | "email" | "pager" | "url" | "sms" | "other";
  value?: string;
  use?: "home" | "work" | "temp" | "old" | "mobile";
}

export interface CodeableConcept {
  coding?: Coding[];
  text?: string;
}

export interface Coding {
  system?: string;
  code?: string;
  display?: string;
}

export interface Reference {
  reference?: string;
  display?: string;
}

export interface Quantity {
  value?: number;
  unit?: string;
  system?: string;
  code?: string;
}

export interface Annotation {
  authorString?: string;
  time?: string;
  text: string;
}

export interface Dosage {
  text?: string;
  timing?: any;
  route?: CodeableConcept;
  doseAndRate?: DoseAndRate[];
}

export interface DoseAndRate {
  doseQuantity?: Quantity;
  rateQuantity?: Quantity;
}

export interface ProcedurePerformer {
  function?: CodeableConcept;
  actor: Reference;
}

export interface Meta {
  versionId?: string;
  lastUpdated?: string;
  source?: string;
  tag?: Coding[];
  security?: Coding[];
  profile?: string[];
}

export interface Bundle {
  resourceType: "Bundle";
  type: "searchset" | "collection" | "transaction" | "batch";
  total?: number;
  entry?: BundleEntry[];
}

export interface BundleEntry {
  fullUrl?: string;
  resource?: any;
  search?: {
    mode?: "match" | "include" | "outcome";
    score?: number;
  };
}

// ==================== FHIR CLIENT ====================

export class FHIRClient {
  private config: FHIRConfig;
  private httpClient: AxiosInstance;
  private authorization?: FHIRAuthorization;

  constructor(config: FHIRConfig) {
    this.config = config;

    this.httpClient = axios.create({
      baseURL: config.serverUrl,
      headers: {
        "Content-Type": "application/fhir+json",
        Accept: "application/fhir+json",
      },
    });
  }

  // ==================== AUTHENTICATION ====================

  /**
   * Authenticate with FHIR server (OAuth 2.0)
   */
  async authenticate(): Promise<void> {
    if (!this.config.clientId || !this.config.tokenEndpoint) {
      console.log("⚠️ No authentication configured - using public server");
      return;
    }

    try {
      const response = await axios.post(
        this.config.tokenEndpoint,
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret || "",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      this.authorization = {
        accessToken: response.data.access_token,
        tokenType: response.data.token_type,
        expiresAt: new Date(Date.now() + response.data.expires_in * 1000),
        scope: response.data.scope,
      };

      console.log("✅ FHIR server authenticated");
    } catch (error: any) {
      console.error("❌ FHIR authentication failed:", error.message);
      throw new Error(`Authentication failed: ${error.message}`);
    }
  }

  /**
   * Set authorization header
   */
  private setAuthHeader(): void {
    if (this.authorization) {
      this.httpClient.defaults.headers.common[
        "Authorization"
      ] = `${this.authorization.tokenType} ${this.authorization.accessToken}`;
    }
  }

  // ==================== PATIENT RESOURCES ====================

  /**
   * Create patient resource
   */
  async createPatient(patient: Patient): Promise<Patient> {
    this.setAuthHeader();

    try {
      console.log("👤 Creating patient resource...");

      const response = await this.httpClient.post("/Patient", patient);

      console.log(`✅ Patient created: ${response.data.id}`);
      return response.data;
    } catch (error: any) {
      console.error("❌ Create patient failed:", error.message);
      throw new Error(`Create patient failed: ${error.message}`);
    }
  }

  /**
   * Get patient by ID
   */
  async getPatient(patientId: string): Promise<Patient> {
    this.setAuthHeader();

    try {
      const response = await this.httpClient.get(`/Patient/${patientId}`);
      return response.data;
    } catch (error: any) {
      console.error("❌ Get patient failed:", error.message);
      throw new Error(`Get patient failed: ${error.message}`);
    }
  }

  /**
   * Search patients
   */
  async searchPatients(params: {
    name?: string;
    birthdate?: string;
    identifier?: string;
  }): Promise<Bundle> {
    this.setAuthHeader();

    try {
      const searchParams = new URLSearchParams();

      if (params.name) searchParams.append("name", params.name);
      if (params.birthdate) searchParams.append("birthdate", params.birthdate);
      if (params.identifier) searchParams.append("identifier", params.identifier);

      const response = await this.httpClient.get("/Patient", {
        params: searchParams,
      });

      return response.data;
    } catch (error: any) {
      console.error("❌ Search patients failed:", error.message);
      throw new Error(`Search patients failed: ${error.message}`);
    }
  }

  // ==================== OBSERVATION RESOURCES ====================

  /**
   * Create observation (vital signs, lab results)
   */
  async createObservation(observation: Observation): Promise<Observation> {
    this.setAuthHeader();

    try {
      console.log("📊 Creating observation resource...");

      const response = await this.httpClient.post("/Observation", observation);

      console.log(`✅ Observation created: ${response.data.id}`);
      return response.data;
    } catch (error: any) {
      console.error("❌ Create observation failed:", error.message);
      throw new Error(`Create observation failed: ${error.message}`);
    }
  }

  /**
   * Get observations for patient
   */
  async getObservations(
    patientId: string,
    category?: string
  ): Promise<Bundle> {
    this.setAuthHeader();

    try {
      const params: any = {
        patient: patientId,
        _sort: "-date",
      };

      if (category) {
        params.category = category;
      }

      const response = await this.httpClient.get("/Observation", { params });

      return response.data;
    } catch (error: any) {
      console.error("❌ Get observations failed:", error.message);
      throw new Error(`Get observations failed: ${error.message}`);
    }
  }

  // ==================== MEDICATION RESOURCES ====================

  /**
   * Create medication request
   */
  async createMedicationRequest(
    medicationRequest: MedicationRequest
  ): Promise<MedicationRequest> {
    this.setAuthHeader();

    try {
      console.log("💊 Creating medication request...");

      const response = await this.httpClient.post(
        "/MedicationRequest",
        medicationRequest
      );

      console.log(`✅ Medication request created: ${response.data.id}`);
      return response.data;
    } catch (error: any) {
      console.error("❌ Create medication request failed:", error.message);
      throw new Error(`Create medication request failed: ${error.message}`);
    }
  }

  /**
   * Get medication requests for patient
   */
  async getMedicationRequests(patientId: string): Promise<Bundle> {
    this.setAuthHeader();

    try {
      const response = await this.httpClient.get("/MedicationRequest", {
        params: {
          patient: patientId,
          _sort: "-authoredon",
        },
      });

      return response.data;
    } catch (error: any) {
      console.error("❌ Get medication requests failed:", error.message);
      throw new Error(`Get medication requests failed: ${error.message}`);
    }
  }

  // ==================== PROCEDURE RESOURCES ====================

  /**
   * Create procedure resource
   */
  async createProcedure(procedure: Procedure): Promise<Procedure> {
    this.setAuthHeader();

    try {
      console.log("🏥 Creating procedure resource...");

      const response = await this.httpClient.post("/Procedure", procedure);

      console.log(`✅ Procedure created: ${response.data.id}`);
      return response.data;
    } catch (error: any) {
      console.error("❌ Create procedure failed:", error.message);
      throw new Error(`Create procedure failed: ${error.message}`);
    }
  }

  /**
   * Get procedures for patient
   */
  async getProcedures(patientId: string): Promise<Bundle> {
    this.setAuthHeader();

    try {
      const response = await this.httpClient.get("/Procedure", {
        params: {
          patient: patientId,
          _sort: "-date",
        },
      });

      return response.data;
    } catch (error: any) {
      console.error("❌ Get procedures failed:", error.message);
      throw new Error(`Get procedures failed: ${error.message}`);
    }
  }

  // ==================== BLOCKCHAIN INTEGRATION ====================

  /**
   * Generate hash of FHIR resource for blockchain storage
   */
  generateResourceHash(resource: any): string {
    const jsonString = JSON.stringify(resource);
    return createHash("sha256").update(jsonString).digest("hex");
  }

  /**
   * Verify FHIR resource integrity against blockchain hash
   */
  verifyResourceIntegrity(resource: any, blockchainHash: string): boolean {
    const computedHash = this.generateResourceHash(resource);
    return computedHash === blockchainHash;
  }

  /**
   * Create FHIR bundle for blockchain storage
   */
  createBundle(resources: any[], type: "collection" | "transaction" = "collection"): Bundle {
    return {
      resourceType: "Bundle",
      type,
      total: resources.length,
      entry: resources.map((resource) => ({
        resource,
      })),
    };
  }

  // ==================== UTILITY FUNCTIONS ====================

  /**
   * Create vital signs observation
   */
  createVitalSignsObservation(
    patientId: string,
    code: string,
    display: string,
    value: number,
    unit: string
  ): Observation {
    return {
      resourceType: "Observation",
      status: "final",
      category: [
        {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "vital-signs",
              display: "Vital Signs",
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code,
            display,
          },
        ],
      },
      subject: {
        reference: `Patient/${patientId}`,
      },
      effectiveDateTime: new Date().toISOString(),
      valueQuantity: {
        value,
        unit,
        system: "http://unitsofmeasure.org",
        code: unit,
      },
    };
  }

  /**
   * Validate FHIR resource
   */
  async validateResource(resource: any): Promise<boolean> {
    this.setAuthHeader();

    try {
      const response = await this.httpClient.post(
        `/${resource.resourceType}/$validate`,
        resource
      );

      return response.data.resourceType === "OperationOutcome" &&
        response.data.issue.every((i: any) => i.severity !== "error");
    } catch (error: any) {
      console.error("❌ Resource validation failed:", error.message);
      return false;
    }
  }
}

// ==================== FACTORY ====================

export function createFHIRClient(config: FHIRConfig): FHIRClient {
  return new FHIRClient(config);
}

/**
 * Example Usage:
 *
 * const fhirClient = createFHIRClient({
 *   serverUrl: "https://hapi.fhir.org/baseR5",
 * });
 *
 * // Create patient
 * const patient = await fhirClient.createPatient({
 *   resourceType: "Patient",
 *   name: [{ given: ["John"], family: "Doe" }],
 *   gender: "male",
 *   birthDate: "1980-01-01",
 * });
 *
 * // Create vital signs
 * const heartRate = fhirClient.createVitalSignsObservation(
 *   patient.id!,
 *   "8867-4",
 *   "Heart rate",
 *   72,
 *   "bpm"
 * );
 *
 * await fhirClient.createObservation(heartRate);
 *
 * // Blockchain integration
 * const hash = fhirClient.generateResourceHash(patient);
 * console.log("Blockchain hash:", hash);
 */
