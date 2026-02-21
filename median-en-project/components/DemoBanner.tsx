'use client'

import { AlertCircle, Code, Sparkles, X } from 'lucide-react'
import { useState } from 'react'

interface DemoBannerProps {
  language?: 'en' | 'tr'
}

export default function DemoBanner({ language = 'en' }: DemoBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const content = {
    en: {
      badge: 'Demo Version',
      message: 'Development in Progress',
      description: 'This is a preview of our next-generation hospital management system. Some features are still under active development.',
      cta: 'Full Release Coming Soon',
    },
    tr: {
      badge: 'Demo Sürüm',
      message: 'Geliştirme Devam Ediyor',
      description: 'Yeni nesil hastane yönetim sistemimizin önizlemesidir. Bazı özellikler aktif olarak geliştirilmektedir.',
      cta: 'Tam Sürüm Yakında',
    },
  }

  const t = content[language]
  const gradientClass = language === 'en'
    ? 'from-blue-600 via-purple-600 to-blue-600'
    : 'from-red-500 via-rose-600 to-red-500'

  return (
    <div className={`relative w-full bg-gradient-to-r ${gradientClass} animate-gradient bg-[length:200%_auto]`}>
      {/* Animated gradient background */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 gap-4">
          {/* Left side - Badge & Message */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            {/* Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 shrink-0">
              <Code className="h-4 w-4 text-white animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-wide hidden sm:inline">
                {t.badge}
              </span>
            </div>

            {/* Message - Desktop */}
            <div className="hidden lg:flex items-center gap-2 flex-1 min-w-0">
              <Sparkles className="h-5 w-5 text-white animate-pulse shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-white truncate">
                  {t.message}
                </span>
                <span className="text-xs text-white/90 truncate">
                  {t.description}
                </span>
              </div>
            </div>

            {/* Message - Mobile/Tablet */}
            <div className="lg:hidden flex items-center gap-2 flex-1 min-w-0">
              <Sparkles className="h-4 w-4 text-white shrink-0" />
              <span className="text-sm font-bold text-white truncate">
                {t.message}
              </span>
            </div>
          </div>

          {/* Right side - CTA & Close */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* CTA Badge - Hidden on mobile */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <AlertCircle className="h-3.5 w-3.5 text-white" />
              <span className="text-xs font-semibold text-white whitespace-nowrap">
                {t.cta}
              </span>
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors group"
              aria-label="Close banner"
            >
              <X className="h-4 w-4 text-white group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
