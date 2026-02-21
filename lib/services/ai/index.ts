// ============================================
// TÜRK OTO AI - AI Services Index
// Centralized exports for AI-powered features
// ============================================

// Predictive Maintenance
export {
  PredictiveMaintenanceService,
  getPredictiveMaintenanceService,
  ComponentType,
  SeverityLevel,
  MaintenanceType,
  getSeverityColor,
  getSeverityIcon,
  formatCostRange,
} from './predictive-maintenance';
export type {
  VehicleHealthData,
  MaintenancePrediction,
  HealthReport,
  PredictionConfig,
} from './predictive-maintenance';
