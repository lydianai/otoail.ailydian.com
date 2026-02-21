// Kapsamlı OBD-II PID (Parameter ID) Yöneticisi
// Tüm standart ve genişletilmiş PID'leri destekler

export interface PIDDefinition {
  pid: string;
  name: string;
  description: string;
  unit: string;
  min: number;
  max: number;
  formula: (bytes: number[]) => number;
  category: 'engine' | 'fuel' | 'temperature' | 'pressure' | 'speed' | 'emissions' | 'misc';
}

// Mode 01 - Gerçek zamanlı veri PID'leri
export const MODE_01_PIDS: { [key: string]: PIDDefinition } = {
  '00': {
    pid: '00',
    name: 'PIDs supported [01-20]',
    description: 'Desteklenen PID\'leri gösterir',
    unit: 'bitmap',
    min: 0,
    max: 0xFFFFFFFF,
    formula: (bytes) => bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3],
    category: 'misc'
  },
  '01': {
    pid: '01',
    name: 'Monitor status',
    description: 'Arıza lambası durumu ve hazır testler',
    unit: 'encoded',
    min: 0,
    max: 0xFFFFFFFF,
    formula: (bytes) => bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3],
    category: 'misc'
  },
  '03': {
    pid: '03',
    name: 'Fuel system status',
    description: 'Yakıt sistemi durumu',
    unit: 'encoded',
    min: 0,
    max: 255,
    formula: (bytes) => bytes[0],
    category: 'fuel'
  },
  '04': {
    pid: '04',
    name: 'Calculated engine load',
    description: 'Hesaplanmış motor yükü',
    unit: '%',
    min: 0,
    max: 100,
    formula: (bytes) => (bytes[0] * 100) / 255,
    category: 'engine'
  },
  '05': {
    pid: '05',
    name: 'Engine coolant temperature',
    description: 'Motor soğutma suyu sıcaklığı',
    unit: '°C',
    min: -40,
    max: 215,
    formula: (bytes) => bytes[0] - 40,
    category: 'temperature'
  },
  '06': {
    pid: '06',
    name: 'Short term fuel trim—Bank 1',
    description: 'Kısa süreli yakıt düzeltmesi',
    unit: '%',
    min: -100,
    max: 99.2,
    formula: (bytes) => ((bytes[0] - 128) * 100) / 128,
    category: 'fuel'
  },
  '07': {
    pid: '07',
    name: 'Long term fuel trim—Bank 1',
    description: 'Uzun süreli yakıt düzeltmesi',
    unit: '%',
    min: -100,
    max: 99.2,
    formula: (bytes) => ((bytes[0] - 128) * 100) / 128,
    category: 'fuel'
  },
  '0A': {
    pid: '0A',
    name: 'Fuel pressure',
    description: 'Yakıt basıncı',
    unit: 'kPa',
    min: 0,
    max: 765,
    formula: (bytes) => bytes[0] * 3,
    category: 'pressure'
  },
  '0B': {
    pid: '0B',
    name: 'Intake manifold absolute pressure',
    description: 'Emme manifoldu basıncı',
    unit: 'kPa',
    min: 0,
    max: 255,
    formula: (bytes) => bytes[0],
    category: 'pressure'
  },
  '0C': {
    pid: '0C',
    name: 'Engine RPM',
    description: 'Motor devri',
    unit: 'RPM',
    min: 0,
    max: 16383.75,
    formula: (bytes) => ((bytes[0] * 256) + bytes[1]) / 4,
    category: 'engine'
  },
  '0D': {
    pid: '0D',
    name: 'Vehicle speed',
    description: 'Araç hızı',
    unit: 'km/h',
    min: 0,
    max: 255,
    formula: (bytes) => bytes[0],
    category: 'speed'
  },
  '0E': {
    pid: '0E',
    name: 'Timing advance',
    description: 'Ateşleme avansı',
    unit: '° before TDC',
    min: -64,
    max: 63.5,
    formula: (bytes) => (bytes[0] / 2) - 64,
    category: 'engine'
  },
  '0F': {
    pid: '0F',
    name: 'Intake air temperature',
    description: 'Emme havası sıcaklığı',
    unit: '°C',
    min: -40,
    max: 215,
    formula: (bytes) => bytes[0] - 40,
    category: 'temperature'
  },
  '10': {
    pid: '10',
    name: 'MAF air flow rate',
    description: 'Hava kütlesi akış hızı',
    unit: 'g/s',
    min: 0,
    max: 655.35,
    formula: (bytes) => ((bytes[0] * 256) + bytes[1]) / 100,
    category: 'engine'
  },
  '11': {
    pid: '11',
    name: 'Throttle position',
    description: 'Gaz kelebeği konumu',
    unit: '%',
    min: 0,
    max: 100,
    formula: (bytes) => (bytes[0] * 100) / 255,
    category: 'engine'
  },
  '1C': {
    pid: '1C',
    name: 'OBD standards',
    description: 'OBD standardı',
    unit: 'encoded',
    min: 0,
    max: 255,
    formula: (bytes) => bytes[0],
    category: 'misc'
  },
  '1F': {
    pid: '1F',
    name: 'Run time since engine start',
    description: 'Motor çalışma süresi',
    unit: 'seconds',
    min: 0,
    max: 65535,
    formula: (bytes) => (bytes[0] * 256) + bytes[1],
    category: 'engine'
  },
  '21': {
    pid: '21',
    name: 'Distance traveled with MIL on',
    description: 'Arıza lambası yanarken gidilen mesafe',
    unit: 'km',
    min: 0,
    max: 65535,
    formula: (bytes) => (bytes[0] * 256) + bytes[1],
    category: 'misc'
  },
  '2F': {
    pid: '2F',
    name: 'Fuel Tank Level Input',
    description: 'Yakıt deposu seviyesi',
    unit: '%',
    min: 0,
    max: 100,
    formula: (bytes) => (bytes[0] * 100) / 255,
    category: 'fuel'
  },
  '31': {
    pid: '31',
    name: 'Distance traveled since codes cleared',
    description: 'Kodlar silindiğinden beri mesafe',
    unit: 'km',
    min: 0,
    max: 65535,
    formula: (bytes) => (bytes[0] * 256) + bytes[1],
    category: 'misc'
  },
  '33': {
    pid: '33',
    name: 'Absolute Barometric Pressure',
    description: 'Mutlak barometrik basınç',
    unit: 'kPa',
    min: 0,
    max: 255,
    formula: (bytes) => bytes[0],
    category: 'pressure'
  },
  '42': {
    pid: '42',
    name: 'Control module voltage',
    description: 'Kontrol modülü voltajı',
    unit: 'V',
    min: 0,
    max: 65.535,
    formula: (bytes) => ((bytes[0] * 256) + bytes[1]) / 1000,
    category: 'misc'
  },
  '43': {
    pid: '43',
    name: 'Absolute load value',
    description: 'Mutlak yük değeri',
    unit: '%',
    min: 0,
    max: 25700,
    formula: (bytes) => ((bytes[0] * 256) + bytes[1]) * 100 / 255,
    category: 'engine'
  },
  '44': {
    pid: '44',
    name: 'Fuel–Air commanded equivalence ratio',
    description: 'Yakıt-hava oranı',
    unit: 'ratio',
    min: 0,
    max: 2,
    formula: (bytes) => ((bytes[0] * 256) + bytes[1]) / 32768,
    category: 'fuel'
  },
  '45': {
    pid: '45',
    name: 'Relative throttle position',
    description: 'Göreceli gaz kelebeği konumu',
    unit: '%',
    min: 0,
    max: 100,
    formula: (bytes) => (bytes[0] * 100) / 255,
    category: 'engine'
  },
  '46': {
    pid: '46',
    name: 'Ambient air temperature',
    description: 'Ortam sıcaklığı',
    unit: '°C',
    min: -40,
    max: 215,
    formula: (bytes) => bytes[0] - 40,
    category: 'temperature'
  },
  '47': {
    pid: '47',
    name: 'Absolute throttle position B',
    description: 'Mutlak gaz kelebeği konumu B',
    unit: '%',
    min: 0,
    max: 100,
    formula: (bytes) => (bytes[0] * 100) / 255,
    category: 'engine'
  },
  '49': {
    pid: '49',
    name: 'Accelerator pedal position D',
    description: 'Gaz pedalı konumu D',
    unit: '%',
    min: 0,
    max: 100,
    formula: (bytes) => (bytes[0] * 100) / 255,
    category: 'engine'
  },
  '4C': {
    pid: '4C',
    name: 'Commanded throttle actuator',
    description: 'Komut edilen gaz kelebeği aktüatörü',
    unit: '%',
    min: 0,
    max: 100,
    formula: (bytes) => (bytes[0] * 100) / 255,
    category: 'engine'
  },
  '4D': {
    pid: '4D',
    name: 'Time run with MIL on',
    description: 'Arıza lambası yanma süresi',
    unit: 'minutes',
    min: 0,
    max: 65535,
    formula: (bytes) => (bytes[0] * 256) + bytes[1],
    category: 'misc'
  },
  '4E': {
    pid: '4E',
    name: 'Time since trouble codes cleared',
    description: 'Arıza kodları silindiğinden beri süre',
    unit: 'minutes',
    min: 0,
    max: 65535,
    formula: (bytes) => (bytes[0] * 256) + bytes[1],
    category: 'misc'
  },
  '51': {
    pid: '51',
    name: 'Fuel Type',
    description: 'Yakıt tipi',
    unit: 'encoded',
    min: 0,
    max: 255,
    formula: (bytes) => bytes[0],
    category: 'fuel'
  },
  '52': {
    pid: '52',
    name: 'Ethanol fuel %',
    description: 'Etanol yakıt yüzdesi',
    unit: '%',
    min: 0,
    max: 100,
    formula: (bytes) => (bytes[0] * 100) / 255,
    category: 'fuel'
  },
  '5C': {
    pid: '5C',
    name: 'Engine oil temperature',
    description: 'Motor yağı sıcaklığı',
    unit: '°C',
    min: -40,
    max: 210,
    formula: (bytes) => bytes[0] - 40,
    category: 'temperature'
  },
  '5E': {
    pid: '5E',
    name: 'Engine fuel rate',
    description: 'Motor yakıt tüketim oranı',
    unit: 'L/h',
    min: 0,
    max: 3212.75,
    formula: (bytes) => ((bytes[0] * 256) + bytes[1]) * 0.05,
    category: 'fuel'
  }
};

// Mode 03 - DTC (Diagnostic Trouble Codes)
export interface DTCCode {
  code: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  possibleCauses: string[];
  solutions: string[];
}

// Yaygın DTC kodları ve çözümleri
export const DTC_DATABASE: { [key: string]: DTCCode } = {
  'P0101': {
    code: 'P0101',
    description: 'Hava Kütlesi Akış Sensörü (MAF) Aralık/Performans Problemi',
    severity: 'medium',
    category: 'Hava/Yakıt Sistemi',
    possibleCauses: [
      'Kirli veya hasarlı MAF sensörü',
      'Hava filtresi tıkanıklığı',
      'Emme sisteminde vakum kaçağı',
      'MAF sensör kablolaması arızası'
    ],
    solutions: [
      'MAF sensörünü temizleyin',
      'Hava filtresini değiştirin',
      'Emme sistemini vakum kaçağı için kontrol edin',
      'MAF sensör kablolarını kontrol edin'
    ]
  },
  'P0171': {
    code: 'P0171',
    description: 'Sistem Çok Zayıf (Banka 1)',
    severity: 'medium',
    category: 'Yakıt Sistemi',
    possibleCauses: [
      'Vakum kaçağı',
      'Hasarlı MAF sensörü',
      'Yakıt basıncı düşük',
      'Enjektör tıkanıklığı'
    ],
    solutions: [
      'Vakum hortumlarını kontrol edin',
      'MAF sensörünü test edin',
      'Yakıt basıncını kontrol edin',
      'Enjektörleri temizleyin'
    ]
  },
  'P0300': {
    code: 'P0300',
    description: 'Rastgele/Çoklu Silindir Ateşleme Hatası',
    severity: 'high',
    category: 'Motor',
    possibleCauses: [
      'Bozuk buji',
      'Arızalı ateşleme bobini',
      'Yakıt enjektörü sorunu',
      'Düşük sıkıştırma',
      'Vakum kaçağı'
    ],
    solutions: [
      'Bujileri kontrol edin ve gerekirse değiştirin',
      'Ateşleme bobinlerini test edin',
      'Yakıt enjektörlerini kontrol edin',
      'Motor sıkıştırma testi yapın',
      'Vakum sistemini kontrol edin'
    ]
  },
  'P0420': {
    code: 'P0420',
    description: 'Katalitik Konvertör Sistem Verimliliği Düşük (Banka 1)',
    severity: 'medium',
    category: 'Emisyon Kontrolü',
    possibleCauses: [
      'Katalitik konvertör arızası',
      'Oksijen sensörü arızası',
      'Motor ateşleme hataları',
      'Egzoz kaçağı'
    ],
    solutions: [
      'Katalitik konvertörü değiştirin',
      'Oksijen sensörlerini test edin',
      'Ateşleme sistemini kontrol edin',
      'Egzoz sistemini kaçak için kontrol edin'
    ]
  },
  'P0505': {
    code: 'P0505',
    description: 'Rölanti Hava Kontrol Sistemi Arızası',
    severity: 'low',
    category: 'Motor Kontrolü',
    possibleCauses: [
      'Kirli gaz kelebeği gövdesi',
      'IAC valfi arızası',
      'Vakum kaçağı',
      'PCV valfi problemi'
    ],
    solutions: [
      'Gaz kelebeği gövdesini temizleyin',
      'IAC valfini kontrol edin',
      'Vakum hortumlarını inceleyin',
      'PCV valfini değiştirin'
    ]
  },
  'P0128': {
    code: 'P0128',
    description: 'Motor Soğutma Suyu Termostat Sıcaklığı Düşük',
    severity: 'medium',
    category: 'Soğutma Sistemi',
    possibleCauses: [
      'Arızalı termostat',
      'Düşük soğutma suyu seviyesi',
      'Soğutma suyu sıcaklık sensörü arızası'
    ],
    solutions: [
      'Termostatı değiştirin',
      'Soğutma suyu seviyesini kontrol edin',
      'Sıcaklık sensörünü test edin'
    ]
  }
};

export class PIDManager {
  // PID'den veri oku ve hesapla
  static parseResponse(pid: string, data: number[]): number | null {
    const pidDef = MODE_01_PIDS[pid];
    if (!pidDef) {
      console.warn(`Unknown PID: ${pid}`);
      return null;
    }

    try {
      return pidDef.formula(data);
    } catch (error) {
      console.error(`Error parsing PID ${pid}:`, error);
      return null;
    }
  }

  // Tüm desteklenen PID'leri al
  static getAllPIDs(): PIDDefinition[] {
    return Object.values(MODE_01_PIDS);
  }

  // Kategoriye göre PID'leri al
  static getPIDsByCategory(category: PIDDefinition['category']): PIDDefinition[] {
    return Object.values(MODE_01_PIDS).filter(pid => pid.category === category);
  }

  // DTC kodunu decode et
  static decodeDTC(rawCode: number): string {
    const prefix = ['P', 'C', 'B', 'U'][rawCode >> 14];
    const code = (rawCode & 0x3FFF).toString(16).toUpperCase().padStart(4, '0');
    return `${prefix}${code}`;
  }

  // DTC bilgisini al
  static getDTCInfo(code: string): DTCCode | null {
    return DTC_DATABASE[code] || null;
  }

  // Tüm DTC kodlarını al
  static getAllDTCs(): DTCCode[] {
    return Object.values(DTC_DATABASE);
  }
}

export default PIDManager;
