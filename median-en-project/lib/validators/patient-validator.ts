/**
 * @fileoverview Production-Grade Zod Validation Schemas for Patient Data
 * @module lib/validators/patient-validator
 * @description Enterprise-level validation with comprehensive error messages
 * @version 1.0.0
 */

import { z } from 'zod';
import { validateTRNationalId } from './tr-id-validator';
import {
  BloodType,
  Gender,
  PatientStatus,
  InsuranceProvider,
  EmergencyContactRelationship,
} from '@/types/patient.types';

/**
 * Turkish National ID validator with custom error messages
 */
const trNationalIdSchema = z
  .string()
  .length(11, 'TC Kimlik No tam olarak 11 haneli olmalıdır')
  .regex(/^\d+$/, 'TC Kimlik No sadece rakam içermelidir')
  .refine((id) => id[0] !== '0', 'TC Kimlik No 0 ile başlayamaz')
  .refine(validateTRNationalId, 'Geçersiz TC Kimlik No (kontrol basamakları hatalı)');

/**
 * Turkish phone number validator (05XX XXX XX XX format)
 */
const trPhoneSchema = z
  .string()
  .min(10, 'Telefon numarası en az 10 haneli olmalıdır')
  .max(15, 'Telefon numarası en fazla 15 karakter olabilir')
  .regex(
    /^(0|\\+90)?5\d{9}$/,
    'Geçersiz telefon formatı. Örnek: 0532 123 45 67'
  )
  .transform((phone) => phone.replace(/\s/g, '')); // Remove spaces

/**
 * Email validator with Turkish character support
 */
const emailSchema = z
  .string()
  .email('Geçerli bir e-posta adresi giriniz')
  .toLowerCase()
  .optional()
  .or(z.literal(''));

/**
 * Date of birth validator (must be in the past, realistic age range)
 */
const dateOfBirthSchema = z
  .string()
  .or(z.date())
  .refine(
    (date) => {
      const birthDate = new Date(date);
      const now = new Date();
      return birthDate < now;
    },
    'Doğum tarihi geçmiş bir tarih olmalıdır'
  )
  .refine(
    (date) => {
      const birthDate = new Date(date);
      const now = new Date();
      const age = now.getFullYear() - birthDate.getFullYear();
      return age <= 150 && age >= 0;
    },
    'Doğum tarihi gerçekçi bir yaş aralığında olmalıdır (0-150)'
  );

/**
 * Patient address validation schema
 */
export const patientAddressSchema = z.object({
  street: z.string().min(5, 'Adres en az 5 karakter olmalıdır'),
  city: z.string().min(2, 'İl adı en az 2 karakter olmalıdır'),
  district: z.string().min(2, 'İlçe adı en az 2 karakter olmalıdır'),
  postalCode: z.string().optional(),
  country: z.literal('Turkey'),
});

/**
 * Phone contact validation schema
 */
export const phoneContactSchema = z.object({
  mobile: trPhoneSchema,
  home: trPhoneSchema.optional(),
  work: trPhoneSchema.optional(),
});

/**
 * Insurance information validation schema
 */
export const insuranceInfoSchema = z.object({
  provider: z.nativeEnum(InsuranceProvider, {
    errorMap: () => ({ message: 'Geçerli bir sigorta türü seçiniz' }),
  }),
  policyNumber: z.string().min(1, 'Sigorta poliçe numarası giriniz'),
  validUntil: z.date().optional(),
  coverageType: z.string().optional(),
});

/**
 * Emergency contact validation schema
 */
export const emergencyContactSchema = z.object({
  fullName: z.string().min(3, 'Acil durum kişisinin adı en az 3 karakter olmalıdır'),
  relationship: z.nativeEnum(EmergencyContactRelationship, {
    errorMap: () => ({ message: 'Geçerli bir yakınlık derecesi seçiniz' }),
  }),
  phone: trPhoneSchema,
  alternatePhone: trPhoneSchema.optional(),
});

/**
 * Medical notes validation schema
 */
export const medicalNotesSchema = z.object({
  allergies: z.array(z.string()).optional(),
  chronicConditions: z.array(z.string()).optional(),
  medications: z.array(z.string()).optional(),
  additionalNotes: z.string().max(2000, 'Notlar en fazla 2000 karakter olabilir').optional(),
});

/**
 * Complete new patient form validation schema
 * Used for patient registration
 */
export const newPatientFormSchema = z.object({
  // Personal Information
  nationalId: trNationalIdSchema,
  firstName: z
    .string()
    .min(2, 'Ad en az 2 karakter olmalıdır')
    .max(50, 'Ad en fazla 50 karakter olabilir')
    .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Ad sadece harf içermelidir'),
  lastName: z
    .string()
    .min(2, 'Soyad en az 2 karakter olmalıdır')
    .max(50, 'Soyad en fazla 50 karakter olabilir')
    .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Soyad sadece harf içermelidir'),
  dateOfBirth: dateOfBirthSchema,
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: 'Geçerli bir cinsiyet seçiniz' }),
  }),
  bloodType: z.nativeEnum(BloodType).optional(),

  // Contact Information
  phone: phoneContactSchema,
  email: emailSchema,
  address: patientAddressSchema.optional(),

  // Insurance Information
  insurance: insuranceInfoSchema,

  // Emergency Contact
  emergencyContact: emergencyContactSchema.optional(),

  // Medical Information
  medicalNotes: medicalNotesSchema.optional(),

  // Status
  status: z.nativeEnum(PatientStatus).default(PatientStatus.ACTIVE),
  lastVisitDate: z.date().optional(),
});

/**
 * Patient update validation schema
 * All fields are optional except ID
 */
export const patientUpdateSchema = z.object({
  id: z.string().uuid('Geçersiz hasta ID'),
  nationalId: trNationalIdSchema.optional(),
  firstName: z.string().min(2).max(50).optional(),
  lastName: z.string().min(2).max(50).optional(),
  dateOfBirth: dateOfBirthSchema.optional(),
  gender: z.nativeEnum(Gender).optional(),
  bloodType: z.nativeEnum(BloodType).optional(),
  phone: phoneContactSchema.optional(),
  email: emailSchema,
  address: patientAddressSchema.optional(),
  insurance: insuranceInfoSchema.optional(),
  emergencyContact: emergencyContactSchema.optional(),
  medicalNotes: medicalNotesSchema.optional(),
  status: z.nativeEnum(PatientStatus).optional(),
  lastVisitDate: z.date().optional(),
});

/**
 * Patient search filters validation schema
 */
export const patientSearchFiltersSchema = z.object({
  query: z.string().optional(),
  status: z.nativeEnum(PatientStatus).optional(),
  gender: z.nativeEnum(Gender).optional(),
  insuranceProvider: z.nativeEnum(InsuranceProvider).optional(),
  ageMin: z.number().int().min(0).max(150).optional(),
  ageMax: z.number().int().min(0).max(150).optional(),
  city: z.string().optional(),
  registeredAfter: z.date().optional(),
  registeredBefore: z.date().optional(),
});

/**
 * Type inference helpers
 */
export type NewPatientFormInput = z.infer<typeof newPatientFormSchema>;
export type PatientUpdateInput = z.infer<typeof patientUpdateSchema>;
export type PatientSearchFiltersInput = z.infer<typeof patientSearchFiltersSchema>;

/**
 * Validation helper function with detailed error formatting
 */
export function validatePatientForm(data: unknown): {
  success: boolean;
  data?: NewPatientFormInput;
  errors?: Array<{ field: string; message: string }>;
} {
  const result = newPatientFormSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors = result.error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));

  return { success: false, errors };
}

/**
 * Async validation helper with custom error handling
 */
export async function validatePatientFormAsync(
  data: unknown
): Promise<{
  success: boolean;
  data?: NewPatientFormInput;
  errors?: Array<{ field: string; message: string }>;
}> {
  try {
    const validData = await newPatientFormSchema.parseAsync(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return { success: false, errors };
    }
    throw error;
  }
}
