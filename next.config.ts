import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use Turbopack explicitly (Next.js 16 default)
  turbopack: {},

  // Disable static page generation for dashboard
  // This prevents hydration mismatches and refresh loops
  generateBuildId: async () => {
    return 'turk-oto-ai-build-' + Date.now();
  },

  // Headers for SSE streams - prevent caching and buffering
  async headers() {
    return [
      {
        source: '/api/obd/stream',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate, no-transform',
          },
          {
            key: 'Connection',
            value: 'keep-alive',
          },
          {
            key: 'X-Accel-Buffering',
            value: 'no',
          },
        ],
      },
      {
        // Force no-cache on dashboard to prevent refresh issues
        source: '/dashboard',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },

  // Experimental features for better performance
  experimental: {
    // Enable optimistic client cache (Next.js 16+)
    optimisticClientCache: true,
  },
};

export default nextConfig;
