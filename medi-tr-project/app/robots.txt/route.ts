import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || '';

  let robotsFile = 'robots-en.txt'; // default

  // medi.ailydian.com = Turkish
  if (host.includes('medi.ailydian.com')) {
    robotsFile = 'robots-tr.txt';
  }
  // median.ailydian.com = English
  else if (host.includes('median.ailydian.com')) {
    robotsFile = 'robots-en.txt';
  }

  try {
    const robotsPath = join(process.cwd(), 'public', robotsFile);
    let robots = await readFile(robotsPath, 'utf-8');

    // Replace sitemap URL with correct domain
    const sitemapUrl = `https://${host}/sitemap.xml`;
    robots = robots.replace(/Sitemap: .*/g, `Sitemap: ${sitemapUrl}`);

    return new NextResponse(robots, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    return new NextResponse('User-agent: *\nAllow: /', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
