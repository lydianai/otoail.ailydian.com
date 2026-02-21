// ============================================
// TÜRK OTO AI - Navigation Service SDK
// Google Maps + Yandex Maps + Traffic Integration
// ============================================

import type { Route, TrafficInfo } from '@/types';

// ==================== Types ====================
interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface RouteOptions {
  origin: Location;
  destination: Location;
  waypoints?: Location[];
  avoidTolls?: boolean;
  avoidHighways?: boolean;
  optimizeWaypoints?: boolean;
  mode?: 'driving' | 'walking' | 'transit';
}

interface RouteResult {
  distance: number; // meters
  duration: number; // seconds
  polyline: string;
  steps: RouteStep[];
  trafficDelay?: number; // seconds
  source: 'google' | 'yandex' | 'combined';
}

interface RouteStep {
  instruction: string;
  distance: number;
  duration: number;
  location: Location;
}

interface TrafficData {
  level: 'free' | 'light' | 'moderate' | 'heavy' | 'severe';
  delayMinutes: number;
  incidents: TrafficIncident[];
}

interface TrafficIncident {
  type: 'accident' | 'construction' | 'closure' | 'congestion';
  location: Location;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

interface NavigationConfig {
  googleMapsApiKey?: string;
  yandexMapsApiKey?: string;
  preferredProvider?: 'google' | 'yandex' | 'auto';
  trafficEnabled?: boolean;
  debug?: boolean;
}

// ==================== Navigation Service ====================
export class NavigationService {
  private config: Required<NavigationConfig>;
  private currentRoute: RouteResult | null = null;
  private isNavigating: boolean = false;
  private currentLocation: Location | null = null;
  private watchId: number | null = null;

  constructor(config: NavigationConfig = {}) {
    this.config = {
      googleMapsApiKey: config.googleMapsApiKey || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      yandexMapsApiKey: config.yandexMapsApiKey || process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY || '',
      preferredProvider: config.preferredProvider || 'auto',
      trafficEnabled: config.trafficEnabled ?? true,
      debug: config.debug ?? false,
    };
  }

  // ==================== Route Calculation ====================

  /**
   * Calculate route using Google Maps API
   */
  private async calculateRouteGoogle(options: RouteOptions): Promise<RouteResult> {
    this.log('Calculating route with Google Maps...');

    const params = new URLSearchParams({
      origin: `${options.origin.lat},${options.origin.lng}`,
      destination: `${options.destination.lat},${options.destination.lng}`,
      key: this.config.googleMapsApiKey,
      mode: options.mode || 'driving',
      avoid: [
        options.avoidTolls ? 'tolls' : '',
        options.avoidHighways ? 'highways' : '',
      ].filter(Boolean).join('|'),
      departure_time: 'now', // For traffic data
    });

    if (options.waypoints && options.waypoints.length > 0) {
      params.append('waypoints', options.waypoints.map(w => `${w.lat},${w.lng}`).join('|'));
      if (options.optimizeWaypoints) {
        params.append('optimize', 'true');
      }
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?${params}`
    );

    const data = await response.json();

    if (data.status !== 'OK' || !data.routes || data.routes.length === 0) {
      throw new Error(`Google Maps API error: ${data.status}`);
    }

    const route = data.routes[0];
    const leg = route.legs[0];

    return {
      distance: leg.distance.value,
      duration: leg.duration.value,
      polyline: route.overview_polyline.points,
      steps: leg.steps.map((step: any) => ({
        instruction: step.html_instructions.replace(/<[^>]*>/g, ''),
        distance: step.distance.value,
        duration: step.duration.value,
        location: {
          lat: step.start_location.lat,
          lng: step.start_location.lng,
        },
      })),
      trafficDelay: leg.duration_in_traffic ? leg.duration_in_traffic.value - leg.duration.value : 0,
      source: 'google',
    };
  }

  /**
   * Calculate route using Yandex Maps API
   */
  private async calculateRouteYandex(options: RouteOptions): Promise<RouteResult> {
    this.log('Calculating route with Yandex Maps...');

    const waypoints = [
      options.origin,
      ...(options.waypoints || []),
      options.destination,
    ];

    const params = new URLSearchParams({
      apikey: this.config.yandexMapsApiKey,
      rll: waypoints.map(w => `${w.lng},${w.lat}`).join('~'),
      mode: options.mode === 'walking' ? 'pedestrian' : options.mode === 'transit' ? 'masstransit' : 'auto',
    });

    if (options.avoidTolls) {
      params.append('avoid', 'tolls');
    }

    const response = await fetch(
      `https://api.routing.yandex.net/v2/route?${params}`
    );

    const data = await response.json();

    if (!data.route || data.route.length === 0) {
      throw new Error('Yandex Maps API error: No route found');
    }

    const route = data.route[0];

    return {
      distance: route.distance.value,
      duration: route.duration.value,
      polyline: route.polyline.points,
      steps: route.legs[0].steps.map((step: any) => ({
        instruction: step.instruction.text,
        distance: step.distance.value,
        duration: step.duration.value,
        location: {
          lat: step.location[1],
          lng: step.location[0],
        },
      })),
      trafficDelay: route.jams_delay || 0,
      source: 'yandex',
    };
  }

  /**
   * Calculate best route using multiple providers
   */
  async calculateRoute(options: RouteOptions): Promise<RouteResult> {
    const provider = this.config.preferredProvider;

    try {
      if (provider === 'google' && this.config.googleMapsApiKey) {
        return await this.calculateRouteGoogle(options);
      } else if (provider === 'yandex' && this.config.yandexMapsApiKey) {
        return await this.calculateRouteYandex(options);
      } else if (provider === 'auto') {
        // Try both and pick the fastest
        const results = await Promise.allSettled([
          this.config.googleMapsApiKey ? this.calculateRouteGoogle(options) : Promise.reject('No Google API key'),
          this.config.yandexMapsApiKey ? this.calculateRouteYandex(options) : Promise.reject('No Yandex API key'),
        ]);

        const successfulResults = results
          .filter((r): r is PromiseFulfilledResult<RouteResult> => r.status === 'fulfilled')
          .map(r => r.value);

        if (successfulResults.length === 0) {
          throw new Error('No navigation provider available');
        }

        // Pick route with shortest duration (including traffic)
        const bestRoute = successfulResults.reduce((best, current) => {
          const bestTotal = best.duration + (best.trafficDelay || 0);
          const currentTotal = current.duration + (current.trafficDelay || 0);
          return currentTotal < bestTotal ? current : best;
        });

        this.log(`Best route from ${bestRoute.source}: ${(bestRoute.duration / 60).toFixed(1)} min`);
        return { ...bestRoute, source: 'combined' };
      }

      throw new Error('No navigation provider configured');
    } catch (error) {
      this.log('Route calculation error:', error);
      throw error;
    }
  }

  // ==================== Traffic Information ====================

  /**
   * Get real-time traffic data for a route
   */
  async getTrafficInfo(route: RouteResult): Promise<TrafficData> {
    // Simplified traffic data based on delay
    const delayMinutes = Math.round((route.trafficDelay || 0) / 60);

    let level: TrafficData['level'];
    if (delayMinutes === 0) level = 'free';
    else if (delayMinutes < 5) level = 'light';
    else if (delayMinutes < 15) level = 'moderate';
    else if (delayMinutes < 30) level = 'heavy';
    else level = 'severe';

    return {
      level,
      delayMinutes,
      incidents: [], // Would be populated from traffic API
    };
  }

  // ==================== Location Tracking ====================

  /**
   * Get current location using Geolocation API
   */
  async getCurrentLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.currentLocation = location;
          resolve(location);
        },
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  }

  /**
   * Start watching location for turn-by-turn navigation
   */
  startLocationTracking(callback: (location: Location) => void): void {
    if (!navigator.geolocation) {
      throw new Error('Geolocation not supported');
    }

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.currentLocation = location;
        callback(location);
      },
      (error) => {
        this.log('Location tracking error:', error);
      },
      { enableHighAccuracy: true, maximumAge: 1000 }
    );

    this.isNavigating = true;
    this.log('Location tracking started');
  }

  /**
   * Stop location tracking
   */
  stopLocationTracking(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
      this.isNavigating = false;
      this.log('Location tracking stopped');
    }
  }

  // ==================== Geocoding ====================

  /**
   * Convert address to coordinates (Geocoding)
   */
  async geocode(address: string): Promise<Location> {
    if (this.config.googleMapsApiKey) {
      const params = new URLSearchParams({
        address,
        key: this.config.googleMapsApiKey,
      });

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?${params}`
      );

      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return {
          lat: location.lat,
          lng: location.lng,
          address: data.results[0].formatted_address,
        };
      }
    }

    throw new Error('Geocoding failed');
  }

  /**
   * Convert coordinates to address (Reverse Geocoding)
   */
  async reverseGeocode(lat: number, lng: number): Promise<string> {
    if (this.config.googleMapsApiKey) {
      const params = new URLSearchParams({
        latlng: `${lat},${lng}`,
        key: this.config.googleMapsApiKey,
      });

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?${params}`
      );

      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
    }

    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  }

  // ==================== Distance & ETA Calculation ====================

  /**
   * Calculate distance between two points (Haversine formula)
   */
  calculateDistance(from: Location, to: Location): number {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (from.lat * Math.PI) / 180;
    const φ2 = (to.lat * Math.PI) / 180;
    const Δφ = ((to.lat - from.lat) * Math.PI) / 180;
    const Δλ = ((to.lng - from.lng) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }

  /**
   * Calculate ETA based on current location and route
   */
  calculateETA(currentLocation: Location, destination: Location, averageSpeed: number = 60): number {
    const distance = this.calculateDistance(currentLocation, destination);
    const speedMs = (averageSpeed * 1000) / 3600; // km/h to m/s
    return distance / speedMs; // seconds
  }

  // ==================== Utility Methods ====================

  private log(...args: any[]): void {
    if (this.config.debug) {
      console.log('[Navigation Service]', ...args);
    }
  }

  // ==================== Public Getters/Setters ====================

  getCurrentRoute(): RouteResult | null {
    return this.currentRoute;
  }

  setCurrentRoute(route: RouteResult): void {
    this.currentRoute = route;
  }

  isCurrentlyNavigating(): boolean {
    return this.isNavigating;
  }

  getCurrentPosition(): Location | null {
    return this.currentLocation;
  }
}

// ==================== Singleton Instance ====================
let navigationServiceInstance: NavigationService | null = null;

export function getNavigationService(config?: NavigationConfig): NavigationService {
  if (!navigationServiceInstance) {
    navigationServiceInstance = new NavigationService(config);
  }
  return navigationServiceInstance;
}

// ==================== Helper Functions ====================

/**
 * Format distance for display
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

/**
 * Format duration for display
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours} saat ${minutes} dk`;
  }
  return `${minutes} dk`;
}

/**
 * Get traffic color based on level
 */
export function getTrafficColor(level: TrafficData['level']): string {
  const colors = {
    free: '#10b981',      // green
    light: '#84cc16',     // lime
    moderate: '#f59e0b',  // amber
    heavy: '#f97316',     // orange
    severe: '#ef4444',    // red
  };
  return colors[level];
}
