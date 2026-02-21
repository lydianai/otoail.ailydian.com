import { NextRequest, NextResponse } from 'next/server';

const MEDI_SITEMAP = `https://raw.githubusercontent.com/yourusername/seo-packages/main/medi/sitemap.xml`;
const MEDIAN_SITEMAP = `https://raw.githubusercontent.com/yourusername/seo-packages/main/median/sitemap.xml`;

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || '';

  // Simple static sitemap for now - will be replaced with dynamic version
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://${host}/</loc>
    <lastmod>2025-12-25</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://${host}/features</loc>
    <lastmod>2025-12-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://${host}/pricing</loc>
    <lastmod>2025-12-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://${host}/about</loc>
    <lastmod>2025-12-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://${host}/contact</loc>
    <lastmod>2025-12-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
