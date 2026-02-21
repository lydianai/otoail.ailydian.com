import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { generatePageSEO, getStructuredData } from "@/lib/seo-config";

// Premium typography - Median brand
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

// Generate SEO metadata using enterprise SEO system
const seoData = generatePageSEO('home', 'en');

export const metadata: Metadata = {
  metadataBase: new URL('https://medi.ailydian.com'),
  title: {
    default: seoData.title,
    template: '%s | Median',
  },
  description: seoData.description,
  keywords: seoData.keywords,
  authors: [{ name: "Median Healthcare Solutions" }],
  creator: "Median",
  publisher: "Median Healthcare Solutions",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['tr_TR'],
    url: 'https://medi.ailydian.com',
    title: seoData.openGraph.title,
    description: seoData.openGraph.description,
    siteName: 'Median',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Median - Hospital Management System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoData.twitter.title,
    description: seoData.twitter.description,
    images: ['/twitter-image.png'],
    creator: '@Median',
  },
  alternates: {
    canonical: 'https://medi.ailydian.com',
    languages: {
      'en-US': 'https://medi.ailydian.com',
      'tr-TR': 'https://medi.ailydian.com/tr',
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code', // For Turkey
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get structured data for rich snippets
  const structuredData = getStructuredData('en');

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Premium Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />

        {/* Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {/* Preconnect to optimize font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
