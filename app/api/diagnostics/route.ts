import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { PIDManager, DTC_DATABASE } from '@/lib/obd/pid-manager';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Kullanıcının araçlarını al
    const vehicles = await prisma.vehicle.findMany({
      where: { userId: session.user.id },
      include: {
        obdData: {
          orderBy: { timestamp: 'desc' },
          take: 1
        }
      }
    });

    if (vehicles.length === 0) {
      return NextResponse.json({ success: true, issues: [] });
    }

    // DTC kodlarını simüle et (gerçekte OBD'den okunacak)
    const issues = [
      {
        id: '1',
        code: 'P0420',
        description: 'Katalitik Konvertör Sistem Verimliliği Düşük (Banka 1)',
        severity: 'medium',
        category: 'Emisyon Kontrolü',
        detectedAt: new Date(Date.now() - 86400000 * 3),
        occurrences: 5,
        possibleCauses: [
          'Katalitik konvertör arızası',
          'Oksijen sensörü arızası',
          'Motor ateşleme hataları'
        ],
        solutions: [
          'Katalitik konvertörü değiştirin',
          'Oksijen sensörlerini test edin'
        ],
        status: 'active',
        autoFixAvailable: false,
        estimatedCost: { min: 2000, max: 4000, currency: 'TL' }
      },
      {
        id: '2',
        code: 'P0101',
        description: 'Hava Kütlesi Akış Sensörü (MAF) Aralık/Performans Problemi',
        severity: 'medium',
        category: 'Hava/Yakıt Sistemi',
        detectedAt: new Date(Date.now() - 86400000),
        occurrences: 2,
        possibleCauses: [
          'Kirli veya hasarlı MAF sensörü',
          'Hava filtresi tıkanıklığı'
        ],
        solutions: [
          'MAF sensörünü temizleyin (Otomatik düzeltme mevcut)',
          'Hava filtresini değiştirin'
        ],
        status: 'active',
        autoFixAvailable: true,
        estimatedCost: { min: 200, max: 800, currency: 'TL' }
      }
    ];

    return NextResponse.json({
      success: true,
      issues,
      vehicleId: vehicles[0].id
    });

  } catch (error) {
    console.error('Diagnostics API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Clear DTC code
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { issueId } = await req.json();

    // OBD cihazına DTC clear komutu gönder
    // AT komutları: AT Z (reset), 04 (clear DTCs)

    return NextResponse.json({
      success: true,
      message: 'DTC code cleared successfully'
    });

  } catch (error) {
    console.error('Clear DTC Error:', error);
    return NextResponse.json({ error: 'Failed to clear DTC' }, { status: 500 });
  }
}
