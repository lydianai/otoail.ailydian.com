'use client'

import { AlertTriangle, X } from 'lucide-react'
import { useState } from 'react'

interface DevelopmentBannerProps {
  lang: 'en' | 'tr'
}

export function DevelopmentBanner({ lang }: DevelopmentBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const content = {
    en: {
      title: 'Development & Demo Preview',
      description: 'This system is currently under development. For demo and preview purposes only.',
    },
    tr: {
      title: 'Geliştirme & Demo Önizleme',
      description: 'Bu sistem şu anda geliştirme aşamasındadır. Sadece demo ve inceleme amaçlıdır.',
    },
  }

  const t = content[lang]

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 animate-pulse" />
            <div>
              <div className="font-bold text-sm">{t.title}</div>
              <div className="text-xs opacity-90">{t.description}</div>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close banner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
