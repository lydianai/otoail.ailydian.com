'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Globe, Check } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config'

interface LanguageSwitcherProps {
  currentLocale: Locale
  className?: string
}

export function LanguageSwitcher({ currentLocale, className }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const switchLanguage = (newLocale: Locale) => {
    // Remove current locale from path and add new locale
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '')
    const newPath = `/${newLocale}${pathWithoutLocale}`

    router.push(newPath)
    setIsOpen(false)
  }

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all border border-white/20 hover:border-white/40"
      >
        <Globe className="h-4 w-4" />
        <span className="font-black text-sm">{currentLocale.toUpperCase()}</span>
        <div className="h-4 w-px bg-white/30" />
        <span className="text-xs font-semibold opacity-90">
          {localeNames[currentLocale]}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border-2 border-gray-100 overflow-hidden z-50">
            {locales.map((locale) => {
              const isActive = locale === currentLocale

              return (
                <button
                  key={locale}
                  onClick={() => switchLanguage(locale)}
                  className={cn(
                    'w-full flex items-center justify-between px-4 py-3 transition-all',
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50 text-gray-700'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{localeFlags[locale]}</span>
                    <div className="text-left">
                      <div className="font-bold text-sm">{localeNames[locale]}</div>
                      <div className="text-xs opacity-60">{locale.toUpperCase()}</div>
                    </div>
                  </div>
                  {isActive && (
                    <Check className="h-4 w-4 text-blue-600" />
                  )}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
