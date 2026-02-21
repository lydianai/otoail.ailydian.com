// ============================================
// TÜRK OTO AI - TypeScript Type Definitions
// ============================================

// ==================== User Types ====================
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  subscription: SubscriptionTier;
  vehicles: Vehicle[];
}

export enum SubscriptionTier {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE'
}

// ==================== Vehicle Types ====================
export interface Vehicle {
  id: string;
  userId: string;
  make: string;          // Marka (TOGG, Renault, Ford, etc.)
  model: string;         // Model (T10X, Clio, Focus, etc.)
  year: number;
  vin?: string;          // Vehicle Identification Number
  licensePlate: string;  // Plaka
  fuelType: FuelType;
  transmission: TransmissionType;
  engineSize?: number;   // Motor hacmi (cc)
  color?: string;        // Renk
  purchaseDate?: Date;   // Satın alma tarihi
  mileage?: number;      // Kilometre
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;     // Aktif araç
  obdDevice?: OBDDevice;
  obdData?: OBDData[];   // OBD veri geçmişi
}

export type FuelType = 'gasoline' | 'diesel' | 'electric' | 'hybrid' | 'lpg';

export type TransmissionType = 'manual' | 'automatic' | 'cvt';

// ==================== OBD-II Types ====================
export interface OBDDevice {
  id: string;
  vehicleId: string;
  deviceName: string;
  macAddress: string;
  protocol: OBDProtocol;
  connected: boolean;
  lastConnected?: Date;
  samplingRate: number;  // Hz (default: 100)
}

export enum OBDProtocol {
  AUTO = 'AUTO',
  ISO_15765_4_CAN = 'ISO_15765_4_CAN',  // CAN (11 bit ID, 500 kbaud)
  ISO_15765_4_CAN_B = 'ISO_15765_4_CAN_B',  // CAN (29 bit ID, 500 kbaud)
  ISO_14230_4_KWP = 'ISO_14230_4_KWP',  // KWP (5 baud init)
  ISO_9141_2 = 'ISO_9141_2',            // ISO 9141-2
  SAE_J1850_PWM = 'SAE_J1850_PWM',      // J1850 PWM (41.6 kbaud)
  SAE_J1850_VPW = 'SAE_J1850_VPW'       // J1850 VPW (10.4 kbaud)
}

export interface OBDData {
  timestamp: Date | string;
  vehicleId?: string;

  // Engine metrics
  rpm?: number;                    // Motor devri (RPM)
  speed?: number;                  // Hız (km/h)
  engineLoad?: number;             // Motor yükü (%)
  throttlePosition?: number;       // Gaz pedalı (%)

  // Temperature metrics
  coolantTemp?: number;            // Soğutma suyu sıcaklığı (°C)
  intakeTemp?: number;             // Emme havası sıcaklığı (°C)
  oilTemp?: number;                // Yağ sıcaklığı (°C)

  // Fuel metrics
  fuelLevel?: number;              // Yakıt seviyesi (%)
  fuelConsumption?: number;        // Anlık tüketim (L/100km)
  fuelPressure?: number;           // Yakıt basıncı (kPa)

  // Electrical metrics
  batteryVoltage?: number;         // Akü voltajı (V)

  // Performance metrics
  horsepower?: number;             // Anlık güç (HP)
  torque?: number;                 // Tork (Nm)

  // Efficiency metrics
  efficiency?: number;             // Verimlilik (%)
  maf?: number;                    // Hava kütlesi akışı (g/s)

  // Diagnostic codes
  dtcCodes?: string[];             // Arıza kodları (P0420, etc.)
}

// ==================== Voice Assistant Types ====================
export interface VoiceMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  dialect?: TurkishDialect;
  audioUrl?: string;
}

export enum TurkishDialect {
  ISTANBUL = 'ISTANBUL',
  ANKARA = 'ANKARA',
  IZMIR = 'IZMIR',
  KARADENIZ = 'KARADENIZ',
  DOGU = 'DOGU',
  GAP = 'GAP',
  EGE = 'EGE'
}

export interface Conversation {
  id: string;
  userId: string;
  vehicleId?: string;
  messages: VoiceMessage[];
  startedAt: Date;
  endedAt?: Date;
  context: ConversationContext;
}

export interface ConversationContext {
  currentLocation?: Location;
  vehicleStatus?: OBDData;
  userIntent?: UserIntent;
  previousTopics: string[];
}

export enum UserIntent {
  DIAGNOSIS = 'DIAGNOSIS',           // Arıza teşhisi
  NAVIGATION = 'NAVIGATION',         // Navigasyon
  FUEL_INFO = 'FUEL_INFO',          // Yakıt bilgisi
  MAINTENANCE = 'MAINTENANCE',       // Bakım
  TRAFFIC_INFO = 'TRAFFIC_INFO',    // Trafik bilgisi
  GENERAL_QUERY = 'GENERAL_QUERY'   // Genel soru
}

// ==================== Navigation Types ====================
export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  timestamp: Date;
}

export interface Route {
  id: string;
  origin: Location;
  destination: Location;
  waypoints?: Location[];
  distance: number;        // Mesafe (km)
  duration: number;        // Süre (dakika)
  trafficDelay?: number;   // Trafik gecikmesi (dakika)
  source: NavigationSource;
  polyline: string;        // Encoded polyline
}

export enum NavigationSource {
  GOOGLE_MAPS = 'GOOGLE_MAPS',
  YANDEX_MAPS = 'YANDEX_MAPS',
  WAZE = 'WAZE',
  COMBINED = 'COMBINED'
}

export interface TrafficInfo {
  location: Location;
  severity: TrafficSeverity;
  delay: number;           // Gecikme (dakika)
  description: string;
  source: NavigationSource;
  timestamp: Date;
}

export enum TrafficSeverity {
  LOW = 'LOW',             // Düşük
  MODERATE = 'MODERATE',   // Orta
  HIGH = 'HIGH',           // Yüksek
  SEVERE = 'SEVERE'        // Çok yüksek
}

// ==================== Turkey Services Types ====================
export interface HGSInfo {
  userId: string;
  balance: number;         // Bakiye (TL)
  lastUpdate: Date;
  transactions: HGSTransaction[];
}

export interface HGSTransaction {
  id: string;
  timestamp: Date;
  location: string;        // Geçiş noktası
  amount: number;          // Tutar (TL)
  balance: number;         // Kalan bakiye
}

export interface TrafficFine {
  id: string;
  userId: string;
  vehicleId: string;
  date: Date;
  location: string;
  violation: string;       // İhlal türü
  amount: number;          // Ceza tutarı (TL)
  paid: boolean;
  dueDate: Date;
}

export interface FuelPrice {
  city: string;
  fuelType: FuelType;
  price: number;           // Fiyat (TL/L)
  station: string;         // İstasyon adı
  lastUpdate: Date;
}

export interface MTVInfo {
  vehicleId: string;
  year: number;
  amount: number;          // Tutar (TL)
  paid: boolean;
  dueDate: Date;
}

// ==================== Gamification Types ====================
export interface DrivingScore {
  userId: string;
  vehicleId: string;
  date: Date;

  // Scores (0-100)
  overall: number;
  acceleration: number;
  braking: number;
  cornering: number;
  efficiency: number;

  // Metrics
  distance: number;        // Mesafe (km)
  duration: number;        // Süre (dakika)
  fuelSaved: number;       // Tasarruf (%)

  // Badges
  badges: Badge[];
  rank: DriverRank;
}

export enum DriverRank {
  BEGINNER = 'BEGINNER',       // Başlangıç
  INTERMEDIATE = 'INTERMEDIATE', // Orta
  ADVANCED = 'ADVANCED',       // İleri
  EXPERT = 'EXPERT',           // Uzman
  MASTER = 'MASTER'            // Usta
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  rarity: BadgeRarity;
}

export enum BadgeRarity {
  COMMON = 'COMMON',
  RARE = 'RARE',
  EPIC = 'EPIC',
  LEGENDARY = 'LEGENDARY'
}

export interface Leaderboard {
  period: 'daily' | 'weekly' | 'monthly' | 'alltime';
  entries: LeaderboardEntry[];
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  score: number;
  badges: number;
  fuelSaved: number;
}

// ==================== Predictive Maintenance Types ====================
export interface MaintenanceAlert {
  id: string;
  vehicleId: string;
  type: MaintenanceType;
  severity: AlertSeverity;
  prediction: Date;        // Tahmini tarih
  description: string;
  recommendation: string;
  estimatedCost: number;   // Tahmini maliyet (TL)
  createdAt: Date;
}

export enum MaintenanceType {
  OIL_CHANGE = 'OIL_CHANGE',               // Yağ değişimi
  BRAKE_PADS = 'BRAKE_PADS',               // Fren balatası
  AIR_FILTER = 'AIR_FILTER',               // Hava filtresi
  SPARK_PLUGS = 'SPARK_PLUGS',             // Buji
  TIMING_BELT = 'TIMING_BELT',             // Triger kayışı
  BATTERY = 'BATTERY',                     // Akü
  COOLANT = 'COOLANT',                     // Antifriz
  TRANSMISSION_FLUID = 'TRANSMISSION_FLUID', // Şanzıman yağı
  TIRE_ROTATION = 'TIRE_ROTATION',         // Lastik rotasyonu
  GENERAL_INSPECTION = 'GENERAL_INSPECTION' // Genel bakım
}

export enum AlertSeverity {
  INFO = 'INFO',           // Bilgi
  WARNING = 'WARNING',     // Uyarı
  CRITICAL = 'CRITICAL'    // Kritik
}

// ==================== API Response Types ====================
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: Date;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// ==================== WebSocket Types ====================
export interface WebSocketMessage {
  type: WebSocketMessageType;
  payload: any;
  timestamp: Date;
}

export enum WebSocketMessageType {
  OBD_DATA = 'OBD_DATA',
  VOICE_MESSAGE = 'VOICE_MESSAGE',
  NAVIGATION_UPDATE = 'NAVIGATION_UPDATE',
  MAINTENANCE_ALERT = 'MAINTENANCE_ALERT',
  CONNECTION_STATUS = 'CONNECTION_STATUS'
}

// ==================== Configuration Types ====================
export interface AppConfig {
  aiApiKey: string;
  aiEndpoint?: string;
  aiModel?: string;
  mapsApiKey: string;
  secondaryMapsApiKey?: string;
  alternativeMapsApiKey?: string;
  databaseUrl: string;
  cacheUrl?: string;
  maxConversationHistory: number;
  obdSamplingRate: number;
  enableVoiceAssistant: boolean;
  enableOBD: boolean;
  enableNavigation: boolean;
}

// ==================== Stats Types ====================
export interface UserStats {
  userId: string;
  totalDistance: number;           // Toplam mesafe (km)
  totalDuration: number;           // Toplam süre (saat)
  totalFuelConsumed: number;       // Toplam yakıt (L)
  totalFuelSaved: number;          // Toplam tasarruf (L)
  totalCO2Reduced: number;         // CO2 azaltımı (kg)
  averageScore: number;            // Ortalama skor
  badgesEarned: number;            // Kazanılan rozet
  rank: DriverRank;
  period: StatsPeriod;
}

export enum StatsPeriod {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
  ALLTIME = 'ALLTIME'
}
