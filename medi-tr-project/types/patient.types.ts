/**
 * @fileoverview Enterprise-grade Patient Type Definitions for TR Healthcare Platform
 * @module types/patient
 * @description Production-ready type definitions with full type safety and KVKK compliance
 * @version 1.0.0
 */

/**
 * Turkish National ID (TC Kimlik No)
 * Must be exactly 11 digits and pass algorithm validation
 */
export type TRNationalId = string & { readonly __brand: 'TRNationalId' };

/**
 * Turkish Phone Number
 * Format: 05XX XXX XX XX (10 digits)
 */
export type TRPhoneNumber = string & { readonly __brand: 'TRPhoneNumber' };

/**
 * Email address (validated)
 */
export type Email = string & { readonly __brand: 'Email' };

/**
 * Blood Type with Rh factor
 */
export enum BloodType {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-',
}

/**
 * Gender types
 */
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}

/**
 * Patient status
 */
export enum PatientStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  DECEASED = 'Deceased',
}

/**
 * Insurance provider types in Turkey
 */
export enum InsuranceProvider {
  SGK = 'SGK',
  PRIVATE = 'Özel Sigorta',
  NONE = 'Sigortasız',
}

/**
 * Relationship types for emergency contacts
 */
export enum EmergencyContactRelationship {
  SPOUSE = 'Eş',
  MOTHER = 'Anne',
  FATHER = 'Baba',
  SIBLING = 'Kardeş',
  CHILD = 'Çocuk',
  OTHER = 'Diğer',
}

/**
 * Patient address information
 */
export interface PatientAddress {
  readonly street: string;
  readonly city: string;
  readonly district: string;
  readonly postalCode?: string;
  readonly country: 'Turkey';
}

/**
 * Phone contact information
 */
export interface PhoneContact {
  readonly mobile: TRPhoneNumber;
  readonly home?: TRPhoneNumber;
  readonly work?: TRPhoneNumber;
}

/**
 * Insurance information
 */
export interface InsuranceInfo {
  readonly provider: InsuranceProvider;
  readonly policyNumber: string;
  readonly validUntil?: Date;
  readonly coverageType?: string;
}

/**
 * Emergency contact person
 */
export interface EmergencyContact {
  readonly fullName: string;
  readonly relationship: EmergencyContactRelationship;
  readonly phone: TRPhoneNumber;
  readonly alternatePhone?: TRPhoneNumber;
}

/**
 * Medical notes and allergies
 */
export interface MedicalNotes {
  readonly allergies?: ReadonlyArray<string>;
  readonly chronicConditions?: ReadonlyArray<string>;
  readonly medications?: ReadonlyArray<string>;
  readonly additionalNotes?: string;
}

/**
 * Complete patient demographics with full type safety
 */
export interface PatientDemographics {
  readonly id: string;
  readonly mrn: string; // Medical Record Number
  readonly nationalId: TRNationalId;
  readonly firstName: string;
  readonly lastName: string;
  readonly dateOfBirth: Date;
  readonly age: number;
  readonly gender: Gender;
  readonly bloodType?: BloodType;
  readonly phone: PhoneContact;
  readonly email?: Email;
  readonly address?: PatientAddress;
  readonly insurance: InsuranceInfo;
  readonly emergencyContact?: EmergencyContact;
  readonly medicalNotes?: MedicalNotes;
  readonly status: PatientStatus;
  readonly registrationDate: Date;
  readonly lastVisitDate?: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

/**
 * Form data for creating a new patient
 * Omits system-generated fields
 */
export type NewPatientFormData = Omit<
  PatientDemographics,
  'id' | 'mrn' | 'age' | 'registrationDate' | 'createdAt' | 'updatedAt'
> & {
  readonly dateOfBirth: string; // ISO date string from form
};

/**
 * Patient update data (all fields optional except ID)
 */
export type PatientUpdateData = Partial<
  Omit<PatientDemographics, 'id' | 'mrn' | 'createdAt'>
> & {
  readonly id: string;
};

/**
 * Patient search filters
 */
export interface PatientSearchFilters {
  readonly query?: string;
  readonly status?: PatientStatus;
  readonly gender?: Gender;
  readonly insuranceProvider?: InsuranceProvider;
  readonly ageMin?: number;
  readonly ageMax?: number;
  readonly city?: string;
  readonly registeredAfter?: Date;
  readonly registeredBefore?: Date;
}

/**
 * Paginated patient list response
 */
export interface PaginatedPatients {
  readonly data: ReadonlyArray<PatientDemographics>;
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly totalPages: number;
}

/**
 * Patient statistics
 */
export interface PatientStats {
  readonly total: number;
  readonly active: number;
  readonly inactive: number;
  readonly deceased: number;
  readonly male: number;
  readonly female: number;
  readonly averageAge: number;
  readonly byInsurance: Record<InsuranceProvider, number>;
  readonly byBloodType: Partial<Record<BloodType, number>>;
}
