// ============================================
// TÜRK OTO AI - Vehicle Screen Specifications Database
// Comprehensive database of vehicle screen sizes by make/model/year
// ============================================

export interface VehicleScreenData {
  make: string;
  model: string;
  yearStart: number;
  yearEnd?: number;
  trim?: string;
  screenSize: number; // inches
  screenWidth: number; // pixels
  screenHeight: number; // pixels
  screenRatio: string;
  isPortrait: boolean;
  isTouchscreen: boolean;
  recommendedScale: number;
  fontSizeMultiplier: number;
  screenType?: string;
  resolution?: string;
  notes?: string;
}

// ==================== Tesla Models ====================
const teslaScreens: VehicleScreenData[] = [
  {
    make: 'Tesla',
    model: 'Model 3',
    yearStart: 2017,
    screenSize: 15.0,
    screenWidth: 1920,
    screenHeight: 1200,
    screenRatio: '16:10',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 1.2,
    fontSizeMultiplier: 1.1,
    screenType: 'LCD',
    resolution: 'WUXGA',
    notes: 'Landscape center touchscreen'
  },
  {
    make: 'Tesla',
    model: 'Model S',
    yearStart: 2021,
    screenSize: 17.0,
    screenWidth: 2200,
    screenHeight: 1300,
    screenRatio: '16.9:10',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 1.3,
    fontSizeMultiplier: 1.2,
    screenType: 'LCD',
    resolution: '2200x1300',
    notes: 'New horizontal design (2021+)'
  },
  {
    make: 'Tesla',
    model: 'Model S',
    yearStart: 2012,
    yearEnd: 2020,
    screenSize: 17.0,
    screenWidth: 1920,
    screenHeight: 1200,
    screenRatio: '16:10',
    isPortrait: true,
    isTouchscreen: true,
    recommendedScale: 1.4,
    fontSizeMultiplier: 1.3,
    screenType: 'LCD',
    resolution: 'WUXGA',
    notes: 'Vertical orientation (pre-2021)'
  },
  {
    make: 'Tesla',
    model: 'Model X',
    yearStart: 2021,
    screenSize: 17.0,
    screenWidth: 2200,
    screenHeight: 1300,
    screenRatio: '16.9:10',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 1.3,
    fontSizeMultiplier: 1.2,
    screenType: 'LCD',
    resolution: '2200x1300'
  },
  {
    make: 'Tesla',
    model: 'Model Y',
    yearStart: 2020,
    screenSize: 15.0,
    screenWidth: 1920,
    screenHeight: 1200,
    screenRatio: '16:10',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 1.2,
    fontSizeMultiplier: 1.1,
    screenType: 'LCD',
    resolution: 'WUXGA'
  }
];

// ==================== TOGG Models ====================
const toggScreens: VehicleScreenData[] = [
  {
    make: 'TOGG',
    model: 'T10X',
    yearStart: 2023,
    screenSize: 12.3,
    screenWidth: 1920,
    screenHeight: 720,
    screenRatio: '8:3',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 1.0,
    fontSizeMultiplier: 1.0,
    screenType: 'OLED',
    resolution: 'FHD+',
    notes: 'Turkish first EV, ultra-wide display'
  },
  {
    make: 'TOGG',
    model: 'T10F',
    yearStart: 2024,
    screenSize: 12.3,
    screenWidth: 1920,
    screenHeight: 720,
    screenRatio: '8:3',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 1.0,
    fontSizeMultiplier: 1.0,
    screenType: 'OLED',
    resolution: 'FHD+'
  }
];

// ==================== BMW Models ====================
const bmwScreens: VehicleScreenData[] = [
  {
    make: 'BMW',
    model: '3 Series',
    yearStart: 2019,
    screenSize: 10.25,
    screenWidth: 1920,
    screenHeight: 720,
    screenRatio: '8:3',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 0.95,
    fontSizeMultiplier: 0.9,
    screenType: 'LCD',
    resolution: 'FHD+',
    notes: 'iDrive 7.0'
  },
  {
    make: 'BMW',
    model: '5 Series',
    yearStart: 2021,
    screenSize: 12.3,
    screenWidth: 1920,
    screenHeight: 720,
    screenRatio: '8:3',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 1.0,
    fontSizeMultiplier: 1.0,
    screenType: 'LCD',
    resolution: 'FHD+',
    notes: 'iDrive 8.0'
  },
  {
    make: 'BMW',
    model: 'iX',
    yearStart: 2021,
    screenSize: 14.9,
    screenWidth: 1920,
    screenHeight: 1080,
    screenRatio: '16:9',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 1.15,
    fontSizeMultiplier: 1.1,
    screenType: 'LCD',
    resolution: 'FHD',
    notes: 'Curved display, iDrive 8.0'
  },
  {
    make: 'BMW',
    model: 'i4',
    yearStart: 2021,
    screenSize: 14.9,
    screenWidth: 1920,
    screenHeight: 1080,
    screenRatio: '16:9',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 1.15,
    fontSizeMultiplier: 1.1,
    screenType: 'LCD',
    resolution: 'FHD'
  }
];

// ==================== Mercedes-Benz Models ====================
const mercedesScreens: VehicleScreenData[] = [
  {
    make: 'Mercedes-Benz',
    model: 'C-Class',
    yearStart: 2021,
    screenSize: 11.9,
    screenWidth: 1888,
    screenHeight: 1728,
    screenRatio: '1.09:1',
    isPortrait: true,
    isTouchscreen: true,
    recommendedScale: 1.1,
    fontSizeMultiplier: 1.05,
    screenType: 'OLED',
    resolution: '1888x1728',
    notes: 'MBUX, vertical orientation'
  },
  {
    make: 'Mercedes-Benz',
    model: 'S-Class',
    yearStart: 2021,
    screenSize: 12.8,
    screenWidth: 1888,
    screenHeight: 1728,
    screenRatio: '1.09:1',
    isPortrait: true,
    isTouchscreen: true,
    recommendedScale: 1.2,
    fontSizeMultiplier: 1.15,
    screenType: 'OLED',
    resolution: '1888x1728',
    notes: 'MBUX Hyperscreen compatible'
  },
  {
    make: 'Mercedes-Benz',
    model: 'EQS',
    yearStart: 2021,
    screenSize: 17.7,
    screenWidth: 3840,
    screenHeight: 1080,
    screenRatio: '32:9',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 1.5,
    fontSizeMultiplier: 1.4,
    screenType: 'OLED',
    resolution: '3840x1080',
    notes: 'MBUX Hyperscreen - ultra-wide'
  }
];

// ==================== Audi Models ====================
const audiScreens: VehicleScreenData[] = [
  {
    make: 'Audi',
    model: 'A4',
    yearStart: 2020,
    screenSize: 10.1,
    screenWidth: 1540,
    screenHeight: 720,
    screenRatio: '21.4:10',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 0.9,
    fontSizeMultiplier: 0.85,
    screenType: 'LCD',
    resolution: '1540x720',
    notes: 'MMI touch response'
  },
  {
    make: 'Audi',
    model: 'e-tron',
    yearStart: 2019,
    screenSize: 10.1,
    screenWidth: 1540,
    screenHeight: 720,
    screenRatio: '21.4:10',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 0.9,
    fontSizeMultiplier: 0.85,
    screenType: 'LCD',
    resolution: '1540x720'
  },
  {
    make: 'Audi',
    model: 'Q4 e-tron',
    yearStart: 2021,
    screenSize: 11.6,
    screenWidth: 1764,
    screenHeight: 824,
    screenRatio: '21.4:10',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 1.0,
    fontSizeMultiplier: 0.95,
    screenType: 'LCD',
    resolution: '1764x824'
  }
];

// ==================== Volkswagen Models ====================
const volkswagenScreens: VehicleScreenData[] = [
  {
    make: 'Volkswagen',
    model: 'ID.3',
    yearStart: 2020,
    screenSize: 10.0,
    screenWidth: 1280,
    screenHeight: 800,
    screenRatio: '16:10',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 0.85,
    fontSizeMultiplier: 0.8,
    screenType: 'LCD',
    resolution: 'WXGA'
  },
  {
    make: 'Volkswagen',
    model: 'ID.4',
    yearStart: 2021,
    screenSize: 12.0,
    screenWidth: 1280,
    screenHeight: 800,
    screenRatio: '16:10',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 1.0,
    fontSizeMultiplier: 0.95,
    screenType: 'LCD',
    resolution: 'WXGA'
  }
];

// ==================== Ford Models ====================
const fordScreens: VehicleScreenData[] = [
  {
    make: 'Ford',
    model: 'Mustang Mach-E',
    yearStart: 2021,
    screenSize: 15.5,
    screenWidth: 1900,
    screenHeight: 1200,
    screenRatio: '16:10',
    isPortrait: true,
    isTouchscreen: true,
    recommendedScale: 1.25,
    fontSizeMultiplier: 1.2,
    screenType: 'LCD',
    resolution: '1900x1200',
    notes: 'SYNC 4A, vertical'
  },
  {
    make: 'Ford',
    model: 'F-150 Lightning',
    yearStart: 2022,
    screenSize: 15.5,
    screenWidth: 1900,
    screenHeight: 1200,
    screenRatio: '16:10',
    isPortrait: true,
    isTouchscreen: true,
    recommendedScale: 1.25,
    fontSizeMultiplier: 1.2,
    screenType: 'LCD',
    resolution: '1900x1200'
  }
];

// ==================== Renault Models ====================
const renaultScreens: VehicleScreenData[] = [
  {
    make: 'Renault',
    model: 'Megane E-Tech',
    yearStart: 2022,
    screenSize: 12.3,
    screenWidth: 1920,
    screenHeight: 720,
    screenRatio: '8:3',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 1.0,
    fontSizeMultiplier: 1.0,
    screenType: 'LCD',
    resolution: 'FHD+',
    notes: 'OpenR Link with Google built-in'
  },
  {
    make: 'Renault',
    model: 'Zoe',
    yearStart: 2020,
    screenSize: 10.0,
    screenWidth: 1280,
    screenHeight: 720,
    screenRatio: '16:9',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 0.85,
    fontSizeMultiplier: 0.8,
    screenType: 'LCD',
    resolution: 'HD'
  }
];

// ==================== Peugeot Models ====================
const peugeotScreens: VehicleScreenData[] = [
  {
    make: 'Peugeot',
    model: '3008',
    yearStart: 2021,
    screenSize: 10.0,
    screenWidth: 1280,
    screenHeight: 720,
    screenRatio: '16:9',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 0.85,
    fontSizeMultiplier: 0.8,
    screenType: 'LCD',
    resolution: 'HD'
  },
  {
    make: 'Peugeot',
    model: 'e-2008',
    yearStart: 2020,
    screenSize: 10.0,
    screenWidth: 1280,
    screenHeight: 720,
    screenRatio: '16:9',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 0.85,
    fontSizeMultiplier: 0.8,
    screenType: 'LCD',
    resolution: 'HD'
  }
];

// ==================== Hyundai Models ====================
const hyundaiScreens: VehicleScreenData[] = [
  {
    make: 'Hyundai',
    model: 'Ioniq 5',
    yearStart: 2021,
    screenSize: 12.3,
    screenWidth: 1920,
    screenHeight: 720,
    screenRatio: '8:3',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 1.0,
    fontSizeMultiplier: 1.0,
    screenType: 'LCD',
    resolution: 'FHD+'
  },
  {
    make: 'Hyundai',
    model: 'Kona Electric',
    yearStart: 2021,
    screenSize: 10.25,
    screenWidth: 1920,
    screenHeight: 720,
    screenRatio: '8:3',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 0.95,
    fontSizeMultiplier: 0.9,
    screenType: 'LCD',
    resolution: 'FHD+'
  }
];

// ==================== Kia Models ====================
const kiaScreens: VehicleScreenData[] = [
  {
    make: 'Kia',
    model: 'EV6',
    yearStart: 2021,
    screenSize: 12.3,
    screenWidth: 1920,
    screenHeight: 720,
    screenRatio: '8:3',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 1.0,
    fontSizeMultiplier: 1.0,
    screenType: 'LCD',
    resolution: 'FHD+'
  },
  {
    make: 'Kia',
    model: 'Niro EV',
    yearStart: 2022,
    screenSize: 10.25,
    screenWidth: 1920,
    screenHeight: 720,
    screenRatio: '8:3',
    isPortrait: false,
    isTouchscreen: true,
    recommendedScale: 0.95,
    fontSizeMultiplier: 0.9,
    screenType: 'LCD',
    resolution: 'FHD+'
  }
];

// ==================== Consolidated Database ====================
export const VEHICLE_SCREEN_DATABASE: VehicleScreenData[] = [
  ...teslaScreens,
  ...toggScreens,
  ...bmwScreens,
  ...mercedesScreens,
  ...audiScreens,
  ...volkswagenScreens,
  ...fordScreens,
  ...renaultScreens,
  ...peugeotScreens,
  ...hyundaiScreens,
  ...kiaScreens
];

// ==================== Helper Functions ====================

/**
 * Find screen spec for a specific vehicle
 */
export function findVehicleScreen(
  make: string,
  model: string,
  year: number
): VehicleScreenData | null {
  const normalizedMake = make.trim().toLowerCase();
  const normalizedModel = model.trim().toLowerCase();

  const match = VEHICLE_SCREEN_DATABASE.find(spec => {
    const matchesMake = spec.make.toLowerCase() === normalizedMake;
    const matchesModel = spec.model.toLowerCase() === normalizedModel;
    const matchesYear =
      year >= spec.yearStart &&
      (!spec.yearEnd || year <= spec.yearEnd);

    return matchesMake && matchesModel && matchesYear;
  });

  return match || null;
}

/**
 * Get recommended dashboard configuration
 */
export function getDashboardConfig(screenData: VehicleScreenData | null) {
  if (!screenData) {
    // Default fallback configuration
    return {
      scale: 1.0,
      fontSizeMultiplier: 1.0,
      layout: 'landscape' as const,
      columns: 3,
      rows: 2,
      gridGap: 16
    };
  }

  return {
    scale: screenData.recommendedScale,
    fontSizeMultiplier: screenData.fontSizeMultiplier,
    layout: screenData.isPortrait ? ('portrait' as const) : ('landscape' as const),
    columns: screenData.isPortrait ? 2 : 3,
    rows: screenData.isPortrait ? 4 : 2,
    gridGap: screenData.screenSize > 14 ? 20 : 16
  };
}

/**
 * Calculate optimal font sizes
 */
export function getOptimalFontSizes(screenData: VehicleScreenData | null) {
  const baseFontSize = 16;
  const multiplier = screenData?.fontSizeMultiplier || 1.0;

  return {
    xs: Math.round(12 * multiplier),
    sm: Math.round(14 * multiplier),
    base: Math.round(baseFontSize * multiplier),
    lg: Math.round(18 * multiplier),
    xl: Math.round(20 * multiplier),
    '2xl': Math.round(24 * multiplier),
    '3xl': Math.round(30 * multiplier),
    '4xl': Math.round(36 * multiplier)
  };
}

/**
 * Get all supported makes
 */
export function getSupportedMakes(): string[] {
  const makes = new Set(VEHICLE_SCREEN_DATABASE.map(spec => spec.make));
  return Array.from(makes).sort();
}

/**
 * Get models for a specific make
 */
export function getModelsForMake(make: string): string[] {
  const normalizedMake = make.trim().toLowerCase();
  const models = new Set(
    VEHICLE_SCREEN_DATABASE
      .filter(spec => spec.make.toLowerCase() === normalizedMake)
      .map(spec => spec.model)
  );
  return Array.from(models).sort();
}
