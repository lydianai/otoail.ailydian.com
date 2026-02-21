// ============================================
// TÜRK OTO AI - Fuel Prices API
// EPDK real-time fuel prices
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { getFuelPricesService } from '@/lib/services/turkey';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') || 'İstanbul';
    const fuelType = searchParams.get('fuelType');
    const action = searchParams.get('action') || 'prices';

    const fuelPricesService = getFuelPricesService({ debug: true, defaultCity: city });

    switch (action) {
      case 'prices': {
        const prices = await fuelPricesService.getPricesForCity(city);
        return NextResponse.json({
          success: true,
          data: prices,
          city,
          totalStations: prices.length,
        });
      }

      case 'cheapest': {
        if (!fuelType) {
          return NextResponse.json(
            { error: 'Yakıt tipi gereklidir' },
            { status: 400 }
          );
        }

        const cheapest = await fuelPricesService.getCheapestPrices(
          city,
          fuelType as any
        );

        return NextResponse.json({
          success: true,
          data: cheapest,
          city,
          fuelType,
        });
      }

      case 'compare': {
        if (!fuelType) {
          return NextResponse.json(
            { error: 'Yakıt tipi gereklidir' },
            { status: 400 }
          );
        }

        const comparison = await fuelPricesService.comparePrices(city, fuelType);

        return NextResponse.json({
          success: true,
          data: comparison,
          city,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Geçersiz işlem' },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error('[Fuel Prices API] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Yakıt fiyatları sorgulaması başarısız' },
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
