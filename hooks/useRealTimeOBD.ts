'use client';

/**
 * Real-Time OBD Data Hook
 * Tesla Dashboard için gerçek OBD verilerini sağlar
 */

import { useState, useEffect, useCallback } from 'react';
import { getOBDManager } from '@/lib/obd-bluetooth';
import type { OBDData } from '@/types';

export interface UseRealTimeOBDReturn {
  obdData: Partial<OBDData> | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  getDTCCodes: () => Promise<string[]>;
  clearDTCCodes: () => Promise<boolean>;
}

export function useRealTimeOBD(autoConnect: boolean = false): UseRealTimeOBDReturn {
  const [obdData, setObdData] = useState<Partial<OBDData> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const obdManager = getOBDManager();

  // Connect to OBD device
  const connect = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError(null);

      // Request device pairing
      await obdManager.requestDevice();

      // Connect to device
      await obdManager.connect();

      setIsConnected(true);

      // Start polling data
      obdManager.startPolling((data) => {
        setObdData(data);
      }, 500); // Update every 500ms for Tesla-like responsiveness

    } catch (err: any) {
      setError(err.message || 'OBD bağlantı hatası');
      setIsConnected(false);
      console.error('OBD connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  }, [obdManager]);

  // Disconnect from OBD device
  const disconnect = useCallback(async () => {
    try {
      await obdManager.disconnect();
      setIsConnected(false);
      setObdData(null);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Bağlantı kesme hatası');
    }
  }, [obdManager]);

  // Get DTC codes
  const getDTCCodes = useCallback(async (): Promise<string[]> => {
    try {
      return await obdManager.getDTCCodes();
    } catch (err) {
      console.error('Get DTC codes error:', err);
      return [];
    }
  }, [obdManager]);

  // Clear DTC codes
  const clearDTCCodes = useCallback(async (): Promise<boolean> => {
    try {
      return await obdManager.clearDTCCodes();
    } catch (err) {
      console.error('Clear DTC codes error:', err);
      return false;
    }
  }, [obdManager]);

  // Auto-connect on mount
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    // Cleanup on unmount
    return () => {
      if (isConnected) {
        obdManager.stopPolling();
      }
    };
  }, [autoConnect]);

  return {
    obdData,
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
    getDTCCodes,
    clearDTCCodes,
  };
}
