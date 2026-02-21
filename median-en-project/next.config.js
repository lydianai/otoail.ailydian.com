/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production-ready configuration
  reactStrictMode: true,
  poweredByHeader: false, // Remove X-Powered-By header for security

  // Type checking - ENABLED for production-grade code quality
  typescript: {
    ignoreBuildErrors: false,
  },

  // Linting - ENABLED for code quality
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Deployment type - TR or EN
  env: {
    NEXT_PUBLIC_DEPLOYMENT_TYPE: process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE || 'local',
  },

  // Image optimization
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year
  },

  // Compression
  compress: true,

  // Production optimizations
  swcMinify: true,

  // Generate ETag for caching
  generateEtags: true,

  // HTTP headers for additional security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ]
  },

  async redirects() {
    const deploymentType = process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE

    // TR deployment - redirect EN to median.ailydian.com
    if (deploymentType === 'tr-only') {
      return [
        {
          source: '/en/:path*',
          destination: 'https://median.ailydian.com/en/:path*',
          permanent: false,
        },
      ]
    }

    // EN deployment - redirect TR to medi.ailydian.com
    if (deploymentType === 'en-only') {
      return [
        {
          source: '/tr/:path*',
          destination: 'https://medi.ailydian.com/tr/:path*',
          permanent: false,
        },
      ]
    }

    // Local development - no redirects
    return []
  },

  async rewrites() {
    const deploymentType = process.env.NEXT_PUBLIC_DEPLOYMENT_TYPE

    // TR deployment - rewrite root to /tr
    if (deploymentType === 'tr-only') {
      return [
        {
          source: '/',
          destination: '/tr',
        },
        {
          source: '/patients',
          destination: '/tr/patients',
        },
        {
          source: '/medula',
          destination: '/tr/medula',
        },
        {
          source: '/enabiz',
          destination: '/tr/enabiz',
        },
      ]
    }

    // EN deployment - rewrite root to /en
    if (deploymentType === 'en-only') {
      return [
        {
          source: '/',
          destination: '/en',
        },
        {
          source: '/patients',
          destination: '/en/patients',
        },
        {
          source: '/compliance/:path*',
          destination: '/en/compliance/:path*',
        },
      ]
    }

    // Local development - no rewrites
    return []
  },
}

module.exports = nextConfig
