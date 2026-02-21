// ============================================
// TÜRK OTO AI - MTV & Traffic Fines API
// Motor Vehicles Tax and Traffic Violations
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { getMTVService } from '@/lib/services/turkey';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const vehiclePlate = searchParams.get('vehiclePlate');
    const action = searchParams.get('action') || 'mtv';

    if (!vehiclePlate) {
      return NextResponse.json(
        { error: 'Araç plakası gereklidir' },
        { status: 400 }
      );
    }

    const mtvService = getMTVService({ debug: true });

    switch (action) {
      case 'mtv': {
        const year = searchParams.get('year')
          ? parseInt(searchParams.get('year')!)
          : undefined;

        const mtvInfo = await mtvService.getMTVInfo(vehiclePlate, year);

        return NextResponse.json({
          success: true,
          data: mtvInfo,
          isOverdue: mtvService.isMTVOverdue(mtvInfo.dueDate),
        });
      }

      case 'fines': {
        const fines = await mtvService.getTrafficFines(vehiclePlate);

        return NextResponse.json({
          success: true,
          data: fines,
          totalFines: fines.length,
          unpaidCount: fines.filter((f) => !f.paid).length,
        });
      }

      case 'unpaid-fines': {
        const unpaidFines = await mtvService.getUnpaidFines(vehiclePlate);
        const totalAmount = await mtvService.getTotalUnpaidAmount(vehiclePlate);

        return NextResponse.json({
          success: true,
          data: unpaidFines,
          totalAmount,
          count: unpaidFines.length,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Geçersiz işlem' },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error('[MTV API] Error:', error);
    return NextResponse.json(
      { error: error.message || 'MTV sorgulaması başarısız' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
