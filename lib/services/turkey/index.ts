// ============================================
// TÜRK OTO AI - Turkey Services Index
// Centralized exports for all Turkey-specific services
// ============================================

// HGS/OGS Service
export {
  HGSService,
  getHGSService,
  formatTRY,
  getLocationDisplayName,
} from './hgs';
export type {
  HGSBalance,
  HGSTransaction,
  HGSServiceConfig,
} from './hgs';

// Fuel Prices Service
export {
  FuelPricesService,
  getFuelPricesService,
  getFuelTypeDisplayName,
  formatFuelPrice,
  getPriceTrend,
  estimateMonthlyFuelCost,
} from './fuel-prices';
export type {
  FuelPrice,
  FuelPriceComparison,
  FuelPriceServiceConfig,
} from './fuel-prices';

// MTV & Traffic Fines Service
export {
  MTVService,
  getMTVService,
  ViolationType,
  getViolationDisplayName,
  getViolationSeverity,
  formatDate,
  getDaysUntilDue,
} from './mtv';
export type {
  MTVInfo,
  TrafficFine,
  MTVServiceConfig,
} from './mtv';
