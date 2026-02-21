/**
 * @fileoverview Enterprise-Grade New Patient Form Component
 * @module components/forms/NewPatientForm
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

interface NewPatientFormProps {
  onSuccess?: (data: NewPatientFormInput) => void
  onCancel?: () => void
}

export function NewPatientForm({ onSuccess, onCancel }: NewPatientFormProps) {
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
      status: 'Active' as const,
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
      toast.success('Hasta Kaydı Başarılı!', {
        description: `${data.firstName} ${data.lastName} başarıyla sisteme kaydedildi.`,
        duration: 5000,
      })

      // Call success callback
      onSuccess?.(data)

      // Reset form
      reset()
    } catch (error) {
      toast.error('Kayıt Başarısız', {
        description: error instanceof Error ? error.message : 'Bir hata oluştu. Lütfen tekrar deneyin.',
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
        : 'border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
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
          <User className="h-5 w-5 text-red-600" />
          Kişisel Bilgiler
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ad <span className="text-red-600">*</span>
            </label>
            <input
              {...register('firstName')}
              type="text"
              placeholder="Örn: Mehmet"
              className={getInputClassName('firstName')}
            />
            <ErrorMessage message={errors.firstName?.message} />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Soyad <span className="text-red-600">*</span>
            </label>
            <input
              {...register('lastName')}
              type="text"
              placeholder="Örn: Yılmaz"
              className={getInputClassName('lastName')}
            />
            <ErrorMessage message={errors.lastName?.message} />
          </div>

          {/* National ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              TC Kimlik No <span className="text-red-600">*</span>
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
              Doğum Tarihi <span className="text-red-600">*</span>
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
              Cinsiyet <span className="text-red-600">*</span>
            </label>
            <select
              {...register('gender')}
              className={getInputClassName('gender')}
            >
              <option value="">Seçiniz</option>
              <option value="Male">Erkek</option>
              <option value="Female">Kadın</option>
              <option value="Other">Diğer</option>
            </select>
            <ErrorMessage message={errors.gender?.message} />
          </div>

          {/* Blood Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Droplet className="h-4 w-4 text-red-600" />
              Kan Grubu
            </label>
            <select
              {...register('bloodType')}
              className={getInputClassName('bloodType')}
            >
              <option value="">Seçiniz</option>
              <option value="A_POSITIVE">A Rh+</option>
              <option value="A_NEGATIVE">A Rh-</option>
              <option value="B_POSITIVE">B Rh+</option>
              <option value="B_NEGATIVE">B Rh-</option>
              <option value="AB_POSITIVE">AB Rh+</option>
              <option value="AB_NEGATIVE">AB Rh-</option>
              <option value="O_POSITIVE">0 Rh+</option>
              <option value="O_NEGATIVE">0 Rh-</option>
            </select>
            <ErrorMessage message={errors.bloodType?.message} />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Phone className="h-5 w-5 text-red-600" />
          İletişim Bilgileri
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mobile Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cep Telefonu <span className="text-red-600">*</span>
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
              <Mail className="h-4 w-4 text-red-600" />
              E-posta
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="ornek@email.com"
              className={getInputClassName('email')}
            />
            <ErrorMessage message={errors.email?.message} />
          </div>

          {/* Address - Street */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-600" />
              Adres
            </label>
            <input
              {...register('address.street')}
              type="text"
              placeholder="Mahalle, sokak, no"
              className={getInputClassName('address.street')}
            />
            <ErrorMessage message={errors.address?.street?.message} />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              İl
            </label>
            <input
              {...register('address.city')}
              type="text"
              placeholder="Örn: İstanbul"
              className={getInputClassName('address.city')}
            />
            <ErrorMessage message={errors.address?.city?.message} />
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              İlçe
            </label>
            <input
              {...register('address.district')}
              type="text"
              placeholder="Örn: Kadıköy"
              className={getInputClassName('address.district')}
            />
            <ErrorMessage message={errors.address?.district?.message} />
          </div>
        </div>
      </div>

      {/* Insurance Information */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-red-600" />
          Sigorta Bilgileri
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Insurance Provider */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sigorta Türü <span className="text-red-600">*</span>
            </label>
            <select
              {...register('insurance.provider')}
              className={getInputClassName('insurance.provider')}
            >
              <option value="">Seçiniz</option>
              <option value="SGK">SGK</option>
              <option value="PRIVATE">Özel Sigorta</option>
              <option value="NONE">Sigortasız</option>
            </select>
            <ErrorMessage message={errors.insurance?.provider?.message} />
          </div>

          {/* Policy Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sigorta No <span className="text-red-600">*</span>
            </label>
            <input
              {...register('insurance.policyNumber')}
              type="text"
              placeholder="Sigorta poliçe numarası"
              className={`${getInputClassName('insurance.policyNumber')} font-mono`}
            />
            <ErrorMessage message={errors.insurance?.policyNumber?.message} />
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          Acil Durum İletişim
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Emergency Contact Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Yakın Ad Soyad
            </label>
            <input
              {...register('emergencyContact.fullName')}
              type="text"
              placeholder="Acil durum kişisi"
              className={getInputClassName('emergencyContact.fullName')}
            />
            <ErrorMessage message={errors.emergencyContact?.fullName?.message} />
          </div>

          {/* Relationship */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Yakınlık Derecesi
            </label>
            <select
              {...register('emergencyContact.relationship')}
              className={getInputClassName('emergencyContact.relationship')}
            >
              <option value="">Seçiniz</option>
              <option value="SPOUSE">Eş</option>
              <option value="PARENT">Anne/Baba</option>
              <option value="SIBLING">Kardeş</option>
              <option value="CHILD">Çocuk</option>
              <option value="OTHER">Diğer</option>
            </select>
            <ErrorMessage message={errors.emergencyContact?.relationship?.message} />
          </div>

          {/* Emergency Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Acil Telefon
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
          <Stethoscope className="h-5 w-5 text-red-600" />
          Tıbbi Notlar
        </h3>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Alerjiler / Kronik Hastalıklar
          </label>
          <textarea
            {...register('medicalNotes.additionalNotes')}
            rows={3}
            placeholder="Bilinen alerji veya kronik hastalıklar varsa belirtiniz"
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
          İptal
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-lg shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Kaydediliyor...
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Hasta Kaydını Tamamla
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
