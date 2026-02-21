import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || '';

  let sitemapFile = 'sitemap-en.xml'; // default

  // medi.ailydian.com = Turkish
  if (host.includes('medi.ailydian.com')) {
    sitemapFile = 'sitemap-tr.xml';
  }
  // median.ailydian.com = English
  else if (host.includes('median.ailydian.com')) {
    sitemapFile = 'sitemap-en.xml';
  }

  try {
    const sitemapPath = join(process.cwd(), 'public', sitemapFile);
    const sitemap = await readFile(sitemapPath, 'utf-8');

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    return new NextResponse('Sitemap not found', { status: 404 });
  }
}
