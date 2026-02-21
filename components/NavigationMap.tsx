'use client';

// ============================================
// TÜRK OTO AI - Navigation Map Component
// Interactive Map with Route Planning
// ============================================

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Navigation, MapPin, Search, Route as RouteIcon, Clock, TrendingUp,
  AlertTriangle, X, Navigation2, Loader2, CheckCircle, Info
} from 'lucide-react';
import {
  getNavigationService,
  formatDistance,
  formatDuration,
  getTrafficColor,
} from '@/lib/services/navigation';

interface NavigationMapProps {
  onRouteCalculated?: (route: any) => void;
}

export default function NavigationMap({ onRouteCalculated }: NavigationMapProps) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<any>(null);
  const [trafficInfo, setTrafficInfo] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigationService = useRef(getNavigationService({ debug: true })).current;

  // Get current location on mount
  useEffect(() => {
    // Only try to get location in browser
    if (typeof window !== 'undefined') {
      handleGetCurrentLocation();
    }
  }, []);

  // Handle get current location
  const handleGetCurrentLocation = async () => {
    try {
      const location = await navigationService.getCurrentLocation();
      setCurrentLocation(location);

      // Reverse geocode to get address
      const address = await navigationService.reverseGeocode(location.lat, location.lng);
      setOrigin(address);
    } catch (err: any) {
      // Silently fail - user can manually enter location
      console.warn('Location not available:', err.message);
      // Don't set error - user can still use the navigation by typing
    }
  };

  // Handle route calculation
  const handleCalculateRoute = async () => {
    if (!origin || !destination) {
      setError('Lütfen başlangıç ve varış noktalarını girin');
      return;
    }

    setIsCalculating(true);
    setError(null);

    try {
      // Geocode addresses
      const [originLoc, destLoc] = await Promise.all([
        origin.includes(',') && !isNaN(parseFloat(origin.split(',')[0]))
          ? { lat: parseFloat(origin.split(',')[0]), lng: parseFloat(origin.split(',')[1]) }
          : navigationService.geocode(origin),
        destination.includes(',') && !isNaN(parseFloat(destination.split(',')[0]))
          ? { lat: parseFloat(destination.split(',')[0]), lng: parseFloat(destination.split(',')[1]) }
          : navigationService.geocode(destination),
      ]);

      // Calculate route
      const route = await navigationService.calculateRoute({
        origin: originLoc,
        destination: destLoc,
        mode: 'driving',
        avoidTolls: false,
        avoidHighways: false,
      });

      setCurrentRoute(route);
      navigationService.setCurrentRoute(route);

      // Get traffic info
      const traffic = await navigationService.getTrafficInfo(route);
      setTrafficInfo(traffic);

      if (onRouteCalculated) {
        onRouteCalculated(route);
      }
    } catch (err: any) {
      console.error('Route calculation error:', err);
      setError(err.message || 'Rota hesaplanamadı');
    } finally {
      setIsCalculating(false);
    }
  };

  // Handle start navigation
  const handleStartNavigation = () => {
    if (!currentRoute) return;

    setIsNavigating(true);
    navigationService.startLocationTracking((location) => {
      setCurrentLocation(location);
      // Update ETA based on current location
      if (currentRoute) {
        const eta = navigationService.calculateETA(
          location,
          currentRoute.steps[currentRoute.steps.length - 1].location
        );
        console.log('ETA:', formatDuration(eta));
      }
    });
  };

  // Handle stop navigation
  const handleStopNavigation = () => {
    setIsNavigating(false);
    navigationService.stopLocationTracking();
  };

  // Handle clear route
  const handleClearRoute = () => {
    setCurrentRoute(null);
    setTrafficInfo(null);
    setError(null);
    if (isNavigating) {
      handleStopNavigation();
    }
  };

  return (
    <div className="h-full flex flex-col gap-4 p-6 bg-gray-50">
      {/* Search Header */}
      <div className="bg-white rounded-3xl shadow-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
            <Navigation className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900">Navigasyon</h2>
            <p className="text-sm text-gray-500">Rota planlama ve canlı yönlendirme</p>
          </div>
        </div>

        {/* Origin Input */}
        <div className="space-y-3">
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Nereden? (Başlangıç noktası)"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:outline-none text-gray-900 font-medium"
            />
            {currentLocation && (
              <button
                onClick={handleGetCurrentLocation}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:text-blue-700 font-semibold"
              >
                Konumum
              </button>
            )}
          </div>

          {/* Destination Input */}
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Nereye? (Varış noktası)"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-red-500 focus:outline-none text-gray-900 font-medium"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCalculateRoute}
              disabled={isCalculating || !origin || !destination}
              className="flex-1 py-4 rounded-2xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isCalculating ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Hesaplanıyor...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" />
                  <span>Rota Hesapla</span>
                </div>
              )}
            </motion.button>

            {currentRoute && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClearRoute}
                className="px-6 py-4 rounded-2xl bg-gray-600 text-white font-bold shadow-lg hover:bg-gray-700 transition-all"
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 border-2 border-red-200 rounded-2xl p-4"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <p className="text-red-900 font-semibold">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Route Information */}
      <AnimatePresence>
        {currentRoute && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-3xl shadow-xl p-6 space-y-4"
          >
            {/* Route Summary */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <RouteIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">Rota Bulundu</h3>
                  <p className="text-sm text-gray-500">Kaynak: {currentRoute.source === 'google' ? 'Google Maps' : currentRoute.source === 'yandex' ? 'Yandex Maps' : 'Kombine'}</p>
                </div>
              </div>

              {!isNavigating ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartNavigation}
                  className="px-6 py-3 rounded-full bg-green-600 text-white font-bold shadow-lg hover:bg-green-700 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Navigation2 className="w-5 h-5" />
                    <span>Navigasyonu Başlat</span>
                  </div>
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStopNavigation}
                  className="px-6 py-3 rounded-full bg-red-600 text-white font-bold shadow-lg hover:bg-red-700 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <X className="w-5 h-5" />
                    <span>Durdur</span>
                  </div>
                </motion.button>
              )}
            </div>

            {/* Route Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <RouteIcon className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-blue-700 font-semibold uppercase">Mesafe</span>
                </div>
                <p className="text-2xl font-black text-blue-900">{formatDistance(currentRoute.distance)}</p>
              </div>

              <div className="p-4 rounded-2xl bg-green-50 border-2 border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-green-700 font-semibold uppercase">Süre</span>
                </div>
                <p className="text-2xl font-black text-green-900">{formatDuration(currentRoute.duration)}</p>
              </div>

              {trafficInfo && (
                <div className="p-4 rounded-2xl bg-orange-50 border-2 border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-orange-600" />
                    <span className="text-xs text-orange-700 font-semibold uppercase">Trafik</span>
                  </div>
                  <p className="text-2xl font-black text-orange-900">
                    {trafficInfo.delayMinutes > 0 ? `+${trafficInfo.delayMinutes} dk` : 'Akıcı'}
                  </p>
                </div>
              )}
            </div>

            {/* Traffic Level Indicator */}
            {trafficInfo && (
              <div className="p-4 rounded-2xl border-2" style={{ backgroundColor: `${getTrafficColor(trafficInfo.level)}20`, borderColor: `${getTrafficColor(trafficInfo.level)}40` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getTrafficColor(trafficInfo.level) }} />
                    <span className="font-bold text-gray-900">
                      {trafficInfo.level === 'free' && 'Trafik Akıcı'}
                      {trafficInfo.level === 'light' && 'Hafif Trafik'}
                      {trafficInfo.level === 'moderate' && 'Orta Yoğunluk'}
                      {trafficInfo.level === 'heavy' && 'Yoğun Trafik'}
                      {trafficInfo.level === 'severe' && 'Çok Yoğun Trafik'}
                    </span>
                  </div>
                  {currentRoute.trafficDelay > 0 && (
                    <span className="text-sm text-gray-600">
                      Normal süreden {formatDuration(currentRoute.trafficDelay)} daha uzun
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Turn-by-Turn Steps */}
            <div>
              <h4 className="text-lg font-black text-gray-900 mb-3">Yol Tarifi</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {currentRoute.steps.map((step: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 font-medium">{step.instruction}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500">{formatDistance(step.distance)}</span>
                        <span className="text-xs text-gray-500">{formatDuration(step.duration)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Location Info */}
      {currentLocation && !currentRoute && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl p-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Konumunuz alındı</p>
              <p className="text-xs text-gray-500">
                {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
