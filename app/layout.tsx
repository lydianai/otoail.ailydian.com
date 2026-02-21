import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientErrorBoundary from "@/components/ClientErrorBoundary";
import { Providers } from "./providers";
// import AilydianEcosystemFooter from "@/components/AilydianEcosystemFooter"; // Moved to Footer.tsx

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LyDian Oto AI - Yollarda Zeka, Yolculukta Güç",
  description: "Türkiye'nin yollarına özel geliştirilmiş yapay zeka destekli akıllı araç asistanı. OBD-II entegrasyonu, sesli AI asistan, akıllı navigasyon ve daha fazlası. Her yolculukta yanınızda, her anlamda akıllı.",
  keywords: [
    // Turkish Keywords
    "türk oto ai", "yapay zeka araç asistanı", "akıllı araç sistemi", "obd-ii türkiye",
    "sesli araç asistanı", "akıllı navigasyon", "elektrikli araç yönetimi", "ev şarj istasyonu",
    "hız limiti uyarısı", "geofence alarm", "araç teşhis sistemi", "araç bakım takibi",
    "adas türkiye", "tesla entegrasyon", "otomotiv yapay zeka", "araç veri analizi",
    // English Keywords
    "ai vehicle assistant", "smart car system", "obd-ii integration", "voice car assistant",
    "ev battery management", "charging station finder", "speed limit alerts", "geofence alarms",
    "vehicle diagnostics ai", "adas system", "tesla integration turkey",
    // German Keywords
    "ki fahrzeugassistent", "intelligentes autosystem", "elektroauto verwaltung",
    // French Keywords
    "assistant véhicule ia", "système voiture intelligent", "gestion véhicule électrique",
    // Arabic Keywords
    "مساعد سيارة ذكي", "نظام سيارة ذكي", "إدارة السيارات الكهربائية"
  ].join(", "),

  // Open Graph metadata
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: ["en_US", "de_DE", "fr_FR", "ar_SA"],
    url: "https://otoai.ailydian.com",
    siteName: "TÜRK OTO AI",
    title: "TÜRK OTO AI - Yapay Zeka Destekli Akıllı Araç Asistanı",
    description: "Türkiye'nin yollarına özel geliştirilmiş yapay zeka destekli akıllı araç asistanı. OBD-II entegrasyonu, sesli AI asistan, elektrikli araç yönetimi, hız uyarıları ve geofence alarm sistemleri.",
    images: [
      {
        url: "https://otoai.ailydian.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TÜRK OTO AI - Akıllı Araç Asistanı",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    site: "@turkotoai",
    creator: "@turkotoai",
    title: "TÜRK OTO AI - Yapay Zeka Destekli Akıllı Araç Asistanı",
    description: "Türkiye'nin yollarına özel geliştirilmiş yapay zeka destekli akıllı araç asistanı. OBD-II entegrasyonu, sesli AI asistan ve daha fazlası.",
    images: ["https://otoai.ailydian.com/twitter-image.jpg"],
  },

  // Canonical URL
  metadataBase: new URL("https://otoai.ailydian.com"),
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/",
      "en-US": "/en",
      "de-DE": "/de",
      "fr-FR": "/fr",
      "ar-SA": "/ar",
    },
  },

  // Additional SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    other: {
      "msvalidate.01": "bing-verification-code",
    },
  },

  // App metadata
  applicationName: "TÜRK OTO AI",
  authors: [{ name: "Ailydian Technologies" }],
  generator: "Next.js",
  category: "Automotive Technology",

  // Favicon - Ailydian Unified Branding (with cache-busting)
  icons: {
    icon: [
      { url: `/favicon.ico?v=${Date.now()}` },
      { url: `/favicon-16x16.png?v=${Date.now()}`, sizes: '16x16', type: 'image/png' },
      { url: `/favicon-32x32.png?v=${Date.now()}`, sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: `/apple-touch-icon.png?v=${Date.now()}`, sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "TÜRK OTO AI",
    "applicationCategory": "AutomotiveApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "TRY"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    },
    "description": "Türkiye'nin yollarına özel geliştirilmiş yapay zeka destekli akıllı araç asistanı. OBD-II entegrasyonu, sesli AI asistan, elektrikli araç yönetimi, akıllı navigasyon ve daha fazlası.",
    "featureList": [
      "OBD-II Araç Teşhisi",
      "Sesli AI Asistan",
      "Elektrikli Araç Batarya Yönetimi",
      "Şarj İstasyonu Bulucu",
      "Hız Limiti Uyarıları",
      "Geofence Alarm Sistemleri",
      "Akıllı Navigasyon",
      "ADAS Entegrasyonu",
      "Tesla Araç Kontrolü",
      "Gerçek Zamanlı Veri Analizi"
    ],
    "inLanguage": ["tr-TR", "en-US", "de-DE", "fr-FR", "ar-SA"],
    "url": "https://otoai.ailydian.com",
    "provider": {
      "@type": "Organization",
      "name": "Ailydian Technologies",
      "url": "https://ailydian.com"
    }
  };

  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientErrorBoundary>
          <Providers>
            {children}
          </Providers>
        </ClientErrorBoundary>

        {/* Ailydian Ecosystem Cross-Links - Now embedded in Footer.tsx for better visibility */}
      </body>
    </html>
  );
}
