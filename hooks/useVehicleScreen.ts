// ============================================
// TÜRK OTO AI - Vehicle Screen Hook
// Auto-detect and apply vehicle-specific screen configuration
// ============================================

import { useState, useEffect } from 'react';

export interface ScreenConfig {
  screenSize: number | null;
  screenWidth: number | null;
  screenHeight: number | null;
  screenRatio: string | null;
  isPortrait: boolean;
  dashboardScale: number;
}

export interface DashboardConfig {
  scale: number;
  fontSizeMultiplier: number;
  layout: 'portrait' | 'landscape';
  columns: number;
  rows: number;
  gridGap: number;
}

export interface FontSizes {
  xs: number;
  sm: number;
  base: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
}

export interface VehicleScreenData {
  vehicle: {
    id: string;
    make: string;
    model: string;
    year: number;
  };
  screenConfig: ScreenConfig | null;
  dashboardConfig: DashboardConfig;
  fontSizes: FontSizes;
  source: 'database' | 'auto-detected' | 'default';
  autoDetected?: boolean;
  recommendation?: string;
  message?: string;
}

export function useVehicleScreen(vehicleId: string | null) {
  const [data, setData] = useState<VehicleScreenData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!vehicleId) {
      setLoading(false);
      return;
    }

    const fetchScreenConfig = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/vehicles/screen-config?vehicleId=${vehicleId}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch screen config');
        }

        setData(result);
      } catch (err: any) {
        console.error('useVehicleScreen error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScreenConfig();
  }, [vehicleId]);

  const autoConfigureScreen = async () => {
    if (!vehicleId) return { success: false, error: 'No vehicle ID' };

    try {
      setLoading(true);
      const response = await fetch('/api/vehicles/screen-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleId })
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.error || result.message };
      }

      setData(result);
      return { success: true, data: result };
    } catch (err: any) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const saveManualConfig = async (config: Partial<ScreenConfig>) => {
    if (!vehicleId) return { success: false, error: 'No vehicle ID' };

    try {
      setLoading(true);
      const response = await fetch('/api/vehicles/screen-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleId, ...config })
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.error };
      }

      setData(result);
      return { success: true, data: result };
    } catch (err: any) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    autoConfigureScreen,
    saveManualConfig,
    // Helper getters
    scale: data?.dashboardConfig.scale || 1.0,
    fontSizes: data?.fontSizes,
    layout: data?.dashboardConfig.layout || 'landscape',
    isPortrait: data?.screenConfig?.isPortrait || false,
    isAutoDetected: data?.autoDetected || false,
    screenInfo: data?.screenConfig
      ? `${data.screenConfig.screenSize}" (${data.screenConfig.screenWidth}x${data.screenConfig.screenHeight})`
      : null
  };
}
