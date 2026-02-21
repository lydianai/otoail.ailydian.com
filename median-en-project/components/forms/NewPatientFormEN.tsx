/**
 * @fileoverview Enterprise-Grade New Patient Form Component (English)
 * @module components/forms/NewPatientFormEN
 * @description Production-ready patient registration form with React Hook Form + Zod validation
 * @version 1.0.0
 */

'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useState } from 'react'
import {
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  AlertTriangle,
  Stethoscope,
  CheckCircle2,
  Loader2,
  Droplet,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { newPatientFormSchema, type NewPatientFormInput } from '@/lib/validators/patient-validator'
import type { Gender, BloodType, InsuranceProvider, EmergencyContactRelationship } from '@/types/patient.types'
import { PatientStatus } from '@/types/patient.types'

interface NewPatientFormENProps {
  onSuccess?: (data: NewPatientFormInput) => void
  onCancel?: () => void
}

export function NewPatientFormEN({ onSuccess, onCancel }: NewPatientFormENProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    reset,
    watch,
  } = useForm<NewPatientFormInput>({
    resolver: zodResolver(newPatientFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      status: PatientStatus.ACTIVE,
      phone: {
        mobile: '',
      },
    },
  })

  const onSubmit = async (data: NewPatientFormInput) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Success notification
      toast.success('Patient Registration Successful!', {
        description: `${data.firstName} ${data.lastName} has been successfully registered.`,
        duration: 5000,
      })

      // Call success callback
      onSuccess?.(data)

      // Reset form
      reset()
    } catch (error) {
      toast.error('Registration Failed', {
        description: error instanceof Error ? error.message : 'An error occurred. Please try again.',
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInputClassName = (fieldName: keyof NewPatientFormInput | string) => {
    const hasError = fieldName.includes('.')
      ? fieldName.split('.').reduce((obj: any, key) => obj?.[key], errors)
      : errors[fieldName as keyof NewPatientFormInput]

    const isDirty = fieldName.includes('.')
      ? fieldName.split('.').reduce((obj: any, key) => obj?.[key], dirtyFields)
      : dirtyFields[fieldName as keyof NewPatientFormInput]

    return `w-full px-4 py-3 border-2 rounded-xl transition-all ${
      hasError
        ? 'border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-500/20'
        : isDirty
        ? 'border-green-500 focus:border-green-600 focus:ring-4 focus:ring-green-500/20'
        : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
    } focus:outline-none`
  }

  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null
    return (
      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        {message}
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              First Name <span className="text-red-600">*</span>
            </label>
            <input
              {...register('firstName')}
              type="text"
              placeholder="e.g., John"
              className={getInputClassName('firstName')}
            />
            <ErrorMessage message={errors.firstName?.message} />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Last Name <span className="text-red-600">*</span>
            </label>
            <input
              {...register('lastName')}
              type="text"
              placeholder="e.g., Doe"
              className={getInputClassName('lastName')}
            />
            <ErrorMessage message={errors.lastName?.message} />
          </div>

          {/* National ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              National ID <span className="text-red-600">*</span>
            </label>
            <input
              {...register('nationalId')}
              type="text"
              maxLength={11}
              placeholder="12345678901"
              className={`${getInputClassName('nationalId')} font-mono`}
            />
            <ErrorMessage message={errors.nationalId?.message} />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date of Birth <span className="text-red-600">*</span>
            </label>
            <input
              {...register('dateOfBirth')}
              type="date"
              className={getInputClassName('dateOfBirth')}
            />
            <ErrorMessage message={errors.dateOfBirth?.message} />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gender <span className="text-red-600">*</span>
            </label>
            <select
              {...register('gender')}
              className={getInputClassName('gender')}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <ErrorMessage message={errors.gender?.message} />
          </div>

          {/* Blood Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Droplet className="h-4 w-4 text-red-600" />
              Blood Type
            </label>
            <select
              {...register('bloodType')}
              className={getInputClassName('bloodType')}
            >
              <option value="">Select</option>
              <option value="A_POSITIVE">A Rh+</option>
              <option value="A_NEGATIVE">A Rh-</option>
              <option value="B_POSITIVE">B Rh+</option>
              <option value="B_NEGATIVE">B Rh-</option>
              <option value="AB_POSITIVE">AB Rh+</option>
              <option value="AB_NEGATIVE">AB Rh-</option>
              <option value="O_POSITIVE">O Rh+</option>
              <option value="O_NEGATIVE">O Rh-</option>
            </select>
            <ErrorMessage message={errors.bloodType?.message} />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Phone className="h-5 w-5 text-blue-600" />
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mobile Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mobile Phone <span className="text-red-600">*</span>
            </label>
            <input
              {...register('phone.mobile')}
              type="tel"
              placeholder="0532 123 45 67"
              className={getInputClassName('phone.mobile')}
            />
            <ErrorMessage message={errors.phone?.mobile?.message} />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-600" />
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="example@email.com"
              className={getInputClassName('email')}
            />
            <ErrorMessage message={errors.email?.message} />
          </div>

          {/* Address - Street */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              Address
            </label>
            <input
              {...register('address.street')}
              type="text"
              placeholder="Street, number, etc."
              className={getInputClassName('address.street')}
            />
            <ErrorMessage message={errors.address?.street?.message} />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City
            </label>
            <input
              {...register('address.city')}
              type="text"
              placeholder="e.g., Istanbul"
              className={getInputClassName('address.city')}
            />
            <ErrorMessage message={errors.address?.city?.message} />
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              District
            </label>
            <input
              {...register('address.district')}
              type="text"
              placeholder="e.g., Kadıköy"
              className={getInputClassName('address.district')}
            />
            <ErrorMessage message={errors.address?.district?.message} />
          </div>
        </div>
      </div>

      {/* Insurance Information */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-blue-600" />
          Insurance Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Insurance Provider */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Insurance Provider <span className="text-red-600">*</span>
            </label>
            <select
              {...register('insurance.provider')}
              className={getInputClassName('insurance.provider')}
            >
              <option value="">Select</option>
              <option value="SGK">SGK</option>
              <option value="PRIVATE">Private Insurance</option>
              <option value="NONE">No Insurance</option>
            </select>
            <ErrorMessage message={errors.insurance?.provider?.message} />
          </div>

          {/* Policy Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Policy Number <span className="text-red-600">*</span>
            </label>
            <input
              {...register('insurance.policyNumber')}
              type="text"
              placeholder="Insurance policy number"
              className={`${getInputClassName('insurance.policyNumber')} font-mono`}
            />
            <ErrorMessage message={errors.insurance?.policyNumber?.message} />
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-blue-600" />
          Emergency Contact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Emergency Contact Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              {...register('emergencyContact.fullName')}
              type="text"
              placeholder="Emergency contact person"
              className={getInputClassName('emergencyContact.fullName')}
            />
            <ErrorMessage message={errors.emergencyContact?.fullName?.message} />
          </div>

          {/* Relationship */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Relationship
            </label>
            <select
              {...register('emergencyContact.relationship')}
              className={getInputClassName('emergencyContact.relationship')}
            >
              <option value="">Select</option>
              <option value="SPOUSE">Spouse</option>
              <option value="PARENT">Parent</option>
              <option value="SIBLING">Sibling</option>
              <option value="CHILD">Child</option>
              <option value="OTHER">Other</option>
            </select>
            <ErrorMessage message={errors.emergencyContact?.relationship?.message} />
          </div>

          {/* Emergency Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Emergency Phone
            </label>
            <input
              {...register('emergencyContact.phone')}
              type="tel"
              placeholder="0532 123 45 67"
              className={getInputClassName('emergencyContact.phone')}
            />
            <ErrorMessage message={errors.emergencyContact?.phone?.message} />
          </div>
        </div>
      </div>

      {/* Medical Notes */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-blue-600" />
          Medical Notes
        </h3>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Allergies / Chronic Conditions
          </label>
          <textarea
            {...register('medicalNotes.additionalNotes')}
            rows={3}
            placeholder="Please specify any known allergies or chronic conditions"
            className={`${getInputClassName('medicalNotes.additionalNotes')} resize-none`}
          />
          <ErrorMessage message={errors.medicalNotes?.additionalNotes?.message} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t-2 border-gray-100">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-3 border-2"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Complete Registration
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
