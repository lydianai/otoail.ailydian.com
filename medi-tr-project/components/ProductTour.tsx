'use client'

import { useState, useEffect } from 'react'
import { X, ChevronRight, ChevronLeft, Sparkles, CheckCircle2, Zap, Shield, Clock, Users, Heart, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export interface TourStep {
  title: string
  description: string
  highlight?: string
  icon?: React.ReactNode
  competitiveAdvantage?: string
}

interface ProductTourProps {
  steps: TourStep[]
  onComplete?: () => void
  storageKey: string
  title: string
  subtitle: string
  completionMessage: string
}

export function ProductTour({
  steps,
  onComplete,
  storageKey,
  title,
  subtitle,
  completionMessage
}: ProductTourProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [hasCompleted, setHasCompleted] = useState(false)

  useEffect(() => {
    // Always show tour after 1 second delay
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSkip = () => {
    localStorage.setItem(storageKey, 'completed')
    setIsOpen(false)
    setHasCompleted(true)
    onComplete?.()
  }

  const handleComplete = () => {
    localStorage.setItem(storageKey, 'completed')
    setIsOpen(false)
    setHasCompleted(true)
    onComplete?.()
  }

  const handleRestart = () => {
    localStorage.removeItem(storageKey)
    setCurrentStep(0)
    setIsOpen(true)
    setHasCompleted(false)
  }

  if (!isOpen && hasCompleted) {
    return (
      <button
        onClick={handleRestart}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-full shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-110 group"
        title="Turu Yeniden Başlat"
      >
        <Sparkles className="h-6 w-6 group-hover:rotate-12 transition-transform" />
      </button>
    )
  }

  if (!isOpen) return null

  const step = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in slide-in-from-bottom-4 duration-500 max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 p-4 sm:p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/50 to-rose-600/50 animate-pulse" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-xs sm:text-sm font-bold opacity-90">{title}</span>
              </div>
              <button
                onClick={handleSkip}
                className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
            <h2 className="text-xl sm:text-2xl font-black mb-1">{subtitle}</h2>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Badge className="bg-white/20 border-white/30 text-white font-semibold text-xs">
                {currentStep + 1} / {steps.length}
              </Badge>
              <span className="opacity-90">Adım</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-100 relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 to-rose-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8">
          {/* Icon & Title */}
          <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-red-100 to-rose-100 rounded-xl sm:rounded-2xl flex-shrink-0">
              {step.icon || <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />}
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-2xl font-black text-gray-900 mb-2">{step.title}</h3>
              {step.highlight && (
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 font-bold mb-3 text-xs">
                  <Zap className="h-3 w-3 mr-1" />
                  {step.highlight}
                </Badge>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-sm sm:prose-lg max-w-none mb-4 sm:mb-6">
            <p className="text-gray-700 leading-relaxed text-sm sm:text-lg">
              {step.description}
            </p>
          </div>

          {/* Competitive Advantage */}
          {step.competitiveAdvantage && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl sm:rounded-2xl p-3 sm:p-6 mb-4 sm:mb-6">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg flex-shrink-0">
                  <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-black text-green-900 mb-1 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide">
                    🏆 Rekabet Avantajımız
                  </h4>
                  <p className="text-green-800 font-semibold text-xs sm:text-sm leading-relaxed">
                    {step.competitiveAdvantage}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
            <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-red-50 text-red-700 rounded-full text-xs sm:text-sm font-semibold">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>KVKK Uyumlu</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-rose-50 text-rose-700 rounded-full text-xs sm:text-sm font-semibold">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>7/24 Destek</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-pink-50 text-pink-700 rounded-full text-xs sm:text-sm font-semibold">
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>500+ Hastane</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="outline"
              className="border-2 disabled:opacity-50 text-xs sm:text-sm px-3 sm:px-4"
            >
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Geri
            </Button>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={handleSkip}
                className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 font-semibold px-2 sm:px-4 py-1.5 sm:py-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                Atla
              </button>
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-lg text-xs sm:text-sm px-3 sm:px-4"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Tamamla
                  </>
                ) : (
                  <>
                    İleri
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 sm:px-8 py-3 sm:py-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-600 gap-2">
            <span className="font-semibold truncate">💡 {completionMessage}</span>
            <span className="font-mono whitespace-nowrap">{Math.round(progress)}% tamamlandı</span>
          </div>
        </div>
      </div>
    </div>
  )
}
