'use client';

/**
 * Real-Time GPS Tracking Hook
 * Tesla-style gerçek zamanlı GPS takibi
 */

import { useState, useEffect, useCallback } from 'react';

export interface GPSCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number;
}

export interface UseGPSTrackingReturn {
  position: GPSCoordinates | null;
  isTracking: boolean;
  error: string | null;
  startTracking: () => void;
  stopTracking: () => void;
  isSupported: boolean;
}

export function useGPSTracking(autoStart: boolean = false): UseGPSTrackingReturn {
  const [position, setPosition] = useState<GPSCoordinates | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [isSupported] = useState(() => {
    if (typeof window === 'undefined') return false;
    return 'geolocation' in navigator;
  });

  // Start GPS tracking
  const startTracking = useCallback(() => {
    if (!isSupported) {
      setError('GPS desteklenmiyor');
      return;
    }

    if (isTracking) return;

    const options: PositionOptions = {
      enableHighAccuracy: true, // Tesla-grade accuracy
      timeout: 5000,
      maximumAge: 0,
    };

    const successCallback = (pos: GeolocationPosition) => {
      setPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        altitude: pos.coords.altitude,
        heading: pos.coords.heading,
        speed: pos.coords.speed ? pos.coords.speed * 3.6 : null, // Convert m/s to km/h
        timestamp: pos.timestamp,
      });
      setError(null);
    };

    const errorCallback = (err: GeolocationPositionError) => {
      let message = 'GPS hatası';
      switch (err.code) {
        case err.PERMISSION_DENIED:
          message = 'GPS izni reddedildi';
          break;
        case err.POSITION_UNAVAILABLE:
          message = 'GPS konumu alınamadı';
          break;
        case err.TIMEOUT:
          message = 'GPS zaman aşımı';
          break;
      }
      setError(message);
      console.error('GPS error:', err);
    };

    const id = navigator.geolocation.watchPosition(
      successCallback,
      errorCallback,
      options
    );

    setWatchId(id);
    setIsTracking(true);
  }, [isSupported, isTracking]);

  // Stop GPS tracking
  const stopTracking = useCallback(() => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setIsTracking(false);
  }, [watchId]);

  // Auto-start tracking
  useEffect(() => {
    if (autoStart && isSupported) {
      startTracking();
    }

    // Cleanup on unmount
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [autoStart, isSupported]);

  return {
    position,
    isTracking,
    error,
    startTracking,
    stopTracking,
    isSupported,
  };
}
