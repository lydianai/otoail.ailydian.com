import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || '';

  const robots = `# robots.txt for ${host}
User-agent: *
Allow: /

# Sitemap
Sitemap: https://${host}/api/sitemap.xml

# Block admin areas
Disallow: /api/private/
Disallow: /admin/
Disallow: /dashboard/
Disallow: /_next/

# Block search results
Disallow: /search?
Disallow: /*?search=

# Block common scanners
User-agent: MJ12bot
Disallow: /

User-agent: SemrushBot
Crawl-delay: 2

User-agent: AhrefsBot
Crawl-delay: 2
`;

  return new NextResponse(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
