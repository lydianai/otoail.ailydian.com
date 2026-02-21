export const locales = ['tr', 'en'] as const
export const defaultLocale = 'en' as const

export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
}

export const localeFlags: Record<Locale, string> = {
  tr: '🇹🇷',
  en: '🇬🇧',
}

// Route translations
export const routeTranslations: Record<string, Record<Locale, string>> = {
  // Marketing
  'features': { tr: 'ozellikler', en: 'features' },
  'solutions': { tr: 'cozumler', en: 'solutions' },
  'pricing': { tr: 'fiyatlandirma', en: 'pricing' },
  'contact': { tr: 'iletisim', en: 'contact' },
  'about': { tr: 'hakkimizda', en: 'about' },

  // Auth
  'login': { tr: 'giris', en: 'login' },
  'register': { tr: 'kayit', en: 'register' },

  // Dashboard
  'dashboard': { tr: 'panel', en: 'dashboard' },
  'patients': { tr: 'hastalar', en: 'patients' },
  'appointments': { tr: 'randevular', en: 'appointments' },
  'clinical': { tr: 'klinik', en: 'clinical' },
  'emergency': { tr: 'acil', en: 'emergency' },
  'inpatient': { tr: 'yatan-hastalar', en: 'inpatient' },
  'laboratory': { tr: 'laboratu var', en: 'laboratory' },
  'pharmacy': { tr: 'eczane', en: 'pharmacy' },
  'radiology': { tr: 'radyoloji', en: 'radiology' },
  'operating-room': { tr: 'ameliyathane', en: 'operating-room' },
  'billing': { tr: 'faturalama', en: 'billing' },
  'staff': { tr: 'personel', en: 'staff' },
  'inventory': { tr: 'envanter', en: 'inventory' },
  'analytics': { tr: 'analizler', en: 'analytics' },
  'quality': { tr: 'kalite', en: 'quality' },
  'administration': { tr: 'yonetim', en: 'administration' },
  'settings': { tr: 'ayarlar', en: 'settings' },
}

// Get translated route
export function getTranslatedRoute(route: string, locale: Locale): string {
  return routeTranslations[route]?.[locale] || route
}

// Get route key from translated route
export function getRouteKey(translatedRoute: string, locale: Locale): string {
  for (const [key, translations] of Object.entries(routeTranslations)) {
    if (translations[locale] === translatedRoute) {
      return key
    }
  }
  return translatedRoute
}
