// ============================================
// TÜRK OTO AI - HGS/OGS API
// Highway toll balance and transactions
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { getHGSService } from '@/lib/services/turkey';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cardNumber = searchParams.get('cardNumber');
    const action = searchParams.get('action') || 'balance';

    if (!cardNumber) {
      return NextResponse.json(
        { error: 'Kart numarası gereklidir' },
        { status: 400 }
      );
    }

    const hgsService = getHGSService({ debug: true });

    switch (action) {
      case 'balance': {
        const balance = await hgsService.getBalance(cardNumber);
        return NextResponse.json({
          success: true,
          data: balance,
        });
      }

      case 'transactions': {
        const startDate = searchParams.get('startDate')
          ? new Date(searchParams.get('startDate')!)
          : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
        const endDate = searchParams.get('endDate')
          ? new Date(searchParams.get('endDate')!)
          : new Date();

        const transactions = await hgsService.getTransactions(
          cardNumber,
          startDate,
          endDate
        );

        return NextResponse.json({
          success: true,
          data: transactions,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Geçersiz işlem' },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error('[HGS API] Error:', error);
    return NextResponse.json(
      { error: error.message || 'HGS sorgulaması başarısız' },
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
