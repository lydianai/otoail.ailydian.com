'use client';

/**
 * Turkey-Specific POIs Hook
 * Loads and manages HGS, Radar, Gas Stations, and EV Charging locations
 */

import { useState, useEffect } from 'react';

export interface HGSPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'bridge' | 'tunnel' | 'highway';
  price: number;
}

export interface RadarPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  limit: number;
  direction: 'both' | 'east' | 'west';
}

export interface GasStation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  brand: string;
  diesel: number;
  gasoline: number;
  lpg: number;
}

export interface EVCharging {
  id: string;
  name: string;
  lat: number;
  lng: number;
  provider: string;
  power: number;
  plugs: string[];
  price: number;
  available: boolean;
}

export interface TurkeyPOIsData {
  hgs_points: HGSPoint[];
  radar_points: RadarPoint[];
  gas_stations: GasStation[];
  ev_charging: EVCharging[];
}

export interface POIFilters {
  showHGS: boolean;
  showRadar: boolean;
  showGas: boolean;
  showEV: boolean;
}

export function useTurkeyPOIs() {
  const [data, setData] = useState<TurkeyPOIsData | null>(null);
  const [filters, setFilters] = useState<POIFilters>({
    showHGS: true,
    showRadar: true,
    showGas: false,
    showEV: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load POI data
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const response = await fetch('/data/turkey-pois.json');

        if (!response.ok) {
          throw new Error('Failed to load POI data');
        }

        const jsonData: TurkeyPOIsData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        console.error('Error loading Turkey POIs:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Toggle filters
  const toggleFilter = (filter: keyof POIFilters) => {
    setFilters(prev => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  // Get filtered POIs
  const getFilteredPOIs = () => {
    if (!data) return null;

    return {
      hgs: filters.showHGS ? data.hgs_points : [],
      radar: filters.showRadar ? data.radar_points : [],
      gas: filters.showGas ? data.gas_stations : [],
      ev: filters.showEV ? data.ev_charging : [],
    };
  };

  return {
    data,
    filters,
    loading,
    error,
    toggleFilter,
    getFilteredPOIs,
  };
}
