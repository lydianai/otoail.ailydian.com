import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// OpenAI veya başka bir AI servisi için
// import OpenAI from 'openai';
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { query, vehicleId, context } = await req.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Kullanıcının araç bilgilerini al
    const vehicle = vehicleId ? await prisma.vehicle.findUnique({
      where: { id: vehicleId },
      include: {
        obdData: {
          orderBy: { timestamp: 'desc' },
          take: 1
        },
        maintenanceAlerts: {
          where: { resolved: false },
          orderBy: { createdAt: 'desc' }
        }
      }
    }) : null;

    // Son sürüş verilerini al
    const latestOBD = vehicle?.obdData?.[0];

    // Sorgu türünü analiz et
    const intent = analyzeIntent(query);

    let response = '';
    let data: any = null;

    switch (intent) {
      case 'vehicle_status':
        if (vehicle && latestOBD) {
          response = `${vehicle.make} ${vehicle.model} aracınızın durumu: Motor ${latestOBD.rpm.toFixed(0)} RPM'de çalışıyor, hız ${latestOBD.speed.toFixed(0)} km/s, yakıt seviyesi %${latestOBD.fuelLevel.toFixed(0)}. Tüm sistemler normal.`;
          data = {
            rpm: latestOBD.rpm,
            speed: latestOBD.speed,
            fuelLevel: latestOBD.fuelLevel,
            coolantTemp: latestOBD.coolantTemp,
            batteryVoltage: latestOBD.batteryVoltage
          };
        } else {
          response = 'Araç bilgisi bulunamadı. Lütfen bir araç seçin.';
        }
        break;

      case 'fuel_level':
        if (latestOBD) {
          const fuelLevel = latestOBD.fuelLevel;
          const estimatedRange = (fuelLevel / 100) * 500; // Örnek hesaplama
          response = `Yakıt seviyeniz %${fuelLevel.toFixed(0)}. Tahmini menzil ${estimatedRange.toFixed(0)} kilometre.`;
          data = { fuelLevel, estimatedRange };
        } else {
          response = 'Yakıt seviyesi bilgisi alınamadı.';
        }
        break;

      case 'maintenance':
        if (vehicle?.maintenanceAlerts && vehicle.maintenanceAlerts.length > 0) {
          const alerts = vehicle.maintenanceAlerts.slice(0, 3);
          response = `${alerts.length} bakım uyarınız var: ${alerts.map((a: typeof alerts[0]) => a.description).join(', ')}`;
          data = alerts;
        } else {
          response = 'Bekleyen bakım işleminiz bulunmuyor.';
        }
        break;

      case 'navigation':
        response = 'Navigasyon için nereye gitmek istersiniz? Hedef adresinizi söyleyebilirsiniz.';
        break;

      case 'traffic':
        // Gerçek trafik API entegrasyonu buraya gelecek
        response = 'Mevcut konumunuzda trafik akıcı görünüyor.';
        break;

      case 'fuel_price':
        // Gerçek yakıt fiyat API'si
        const fuelPrices = await prisma.fuelPrice.findMany({
          where: { city: 'İstanbul' },
          orderBy: { lastUpdate: 'desc' },
          take: 3
        });

        if (fuelPrices.length > 0) {
          response = `İstanbul'da yakıt fiyatları: ${fuelPrices.map((fp: typeof fuelPrices[0]) =>
            `${fp.fuelType} ${fp.price.toFixed(2)} TL`
          ).join(', ')}`;
          data = fuelPrices;
        } else {
          response = 'Yakıt fiyat bilgisi bulunamadı.';
        }
        break;

      case 'hgs_balance':
        const hgsInfo = await prisma.hGSInfo.findUnique({
          where: { userId: session.user.id }
        });

        if (hgsInfo) {
          response = `HGS bakiyeniz ${hgsInfo.balance.toFixed(2)} TL`;
          data = { balance: hgsInfo.balance };
        } else {
          response = 'HGS bilgisi bulunamadı.';
        }
        break;

      case 'traffic_fine':
        const fines = await prisma.trafficFine.findMany({
          where: {
            userId: session.user.id,
            paid: false
          }
        });

        if (fines.length > 0) {
          const totalAmount = fines.reduce((sum: number, f: typeof fines[0]) => sum + f.amount, 0);
          response = `${fines.length} ödenmemiş trafik cezanız var. Toplam ${totalAmount.toFixed(2)} TL`;
          data = fines;
        } else {
          response = 'Ödenmemiş trafik cezanız bulunmuyor.';
        }
        break;

      case 'charging_station':
        // Şarj istasyonu sorgusu
        const chargingQuery = extractChargingQuery(query);

        try {
          // Kullanıcı lokasyonunu al (buradan ya da başka bir yerden)
          let chargingUrl = '/api/ev/charging-stations?maxResults=5';

          if (chargingQuery.brand) {
            chargingUrl += `&vehicleBrand=${chargingQuery.brand}`;
          }

          if (chargingQuery.fastCharge) {
            chargingUrl += `&fastCharge=true`;
          }

          // İç API çağrısı
          const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
          const chargingResponse = await fetch(`${baseUrl}${chargingUrl}`);
          const chargingData = await chargingResponse.json();

          if (chargingData.success && chargingData.stations.length > 0) {
            const nearest = chargingData.stations.slice(0, 3);
            const stationList = nearest.map((s: any, i: number) =>
              `${i + 1}. ${s.name}, ${s.address.town} - ${s.connections.length} bağlantı`
            ).join('; ');

            response = `Türkiye genelinde ${chargingData.count} şarj istasyonu bulundu. En yakınlar: ${stationList}. Detaylar için Şarj İstasyonları menüsünü kullanabilirsiniz.`;
            data = {
              totalCount: chargingData.count,
              stations: nearest
            };
          } else {
            response = 'Şarj istasyonu bulunamadı. Lütfen farklı kriterler deneyin.';
          }
        } catch (error) {
          console.error('Charging station query error:', error);
          response = 'Şarj istasyonu bilgisi alınırken bir hata oluştu. Lütfen Şarj İstasyonları menüsünü kullanın.';
        }
        break;

      case 'general':
      default:
        // AI ile genel soru-cevap
        // OpenAI API entegrasyonu buraya gelecek
        response = await generateAIResponse(query, {
          vehicle,
          latestOBD,
          context
        });
        break;
    }

    // Konuşma geçmişini kaydet
    const conversation = await prisma.conversation.create({
      data: {
        userId: session.user.id,
        vehicleId: vehicleId || null,
        userIntent: intent.toUpperCase() as any,
        messages: {
          create: [
            {
              role: 'USER',
              content: query
            },
            {
              role: 'ASSISTANT',
              content: response
            }
          ]
        }
      }
    });

    return NextResponse.json({
      success: true,
      response,
      data,
      intent,
      conversationId: conversation.id
    });

  } catch (error) {
    console.error('Voice API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Sorgu niyetini analiz et
function analyzeIntent(query: string): string {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('durum') || lowerQuery.includes('nasıl')) {
    return 'vehicle_status';
  }
  if (lowerQuery.includes('yakıt') || lowerQuery.includes('benzin')) {
    if (lowerQuery.includes('fiyat')) return 'fuel_price';
    return 'fuel_level';
  }
  if (lowerQuery.includes('bakım') || lowerQuery.includes('servis')) {
    return 'maintenance';
  }
  if (lowerQuery.includes('navigasyon') || lowerQuery.includes('yol') || lowerQuery.includes('git')) {
    return 'navigation';
  }
  if (lowerQuery.includes('trafik')) {
    return 'traffic';
  }
  if (lowerQuery.includes('hgs') || lowerQuery.includes('köprü')) {
    return 'hgs_balance';
  }
  if (lowerQuery.includes('ceza')) {
    return 'traffic_fine';
  }
  if (lowerQuery.includes('şarj') || lowerQuery.includes('sarj') || lowerQuery.includes('elektrik') ||
      lowerQuery.includes('ev istasyon') || lowerQuery.includes('charging')) {
    return 'charging_station';
  }

  return 'general';
}

// Şarj istasyonu sorgu parametrelerini çıkart
function extractChargingQuery(query: string): { brand?: string; fastCharge?: boolean } {
  const lowerQuery = query.toLowerCase();
  const result: { brand?: string; fastCharge?: boolean } = {};

  // Marka tespiti
  const brands = ['tesla', 'bmw', 'mercedes', 'audi', 'volkswagen', 'nissan', 'renault',
                  'hyundai', 'kia', 'mg', 'byd', 'togg', 'porsche'];

  for (const brand of brands) {
    if (lowerQuery.includes(brand)) {
      result.brand = brand;
      break;
    }
  }

  // Hızlı şarj tespiti
  if (lowerQuery.includes('hızlı') || lowerQuery.includes('fast') || lowerQuery.includes('süper')) {
    result.fastCharge = true;
  }

  return result;
}

// AI yanıt oluştur (OpenAI entegrasyonu için)
async function generateAIResponse(query: string, context: any): Promise<string> {
  // TODO: OpenAI API entegrasyonu
  // const completion = await openai.chat.completions.create({
  //   model: "gpt-4",
  //   messages: [
  //     {
  //       role: "system",
  //       content: "Sen Türkçe konuşan bir araç asistanısın. Kullanıcının araç ve sürüş ile ilgili sorularına yardımcı ol."
  //     },
  //     {
  //       role: "user",
  //       content: query
  //     }
  //   ]
  // });
  // return completion.choices[0].message.content || '';

  return 'Size nasıl yardımcı olabilirim? Araç durumu, navigasyon, yakıt, bakım veya trafik hakkında sorularınız varsa yanıtlayabilirim.';
}
