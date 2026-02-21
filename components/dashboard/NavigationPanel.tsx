'use client';

// ============================================
// TÜRK OTO AI - QUANTUM NAVIGATION PANEL
// Yapay Zeka Tabanlı Akıllı Rota Sistemi
// ============================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Navigation, MapPin, Clock, Fuel, TrendingDown, AlertTriangle,
  Zap, Map, Route, Target, RefreshCw, Star, Save, Share2,
  Phone, MessageSquare, Coffee, Utensils, ShoppingCart,
  Camera, Battery, Wifi, CloudRain, Sun, Navigation2,
  Compass, ChevronRight, ArrowRight, XCircle, CheckCircle
} from 'lucide-react';

interface RouteOption {
  id: string;
  name: string;
  distance: number;
  duration: number;
  fuelCost: number;
  trafficLevel: 'low' | 'medium' | 'high';
  savings: number;
  eco: boolean;
  toll: boolean;
  waypoints: Waypoint[];
}

interface Waypoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'poi' | 'fuel' | 'rest' | 'charging' | 'food';
  distance: number;
}

interface SavedLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  category: 'home' | 'work' | 'favorite' | 'recent';
  visits: number;
}

export default function NavigationPanel() {
  const [destination, setDestination] = useState('');
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ lat: 41.0082, lng: 28.9784 });
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showPOI, setShowPOI] = useState(true);
  const [avoidTolls, setAvoidTolls] = useState(false);
  const [avoidHighways, setAvoidHighways] = useState(false);
  const [ecoMode, setEcoMode] = useState(true);
  const [trafficData, setTrafficData] = useState<any[]>([]);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [eta, setETA] = useState<Date | null>(null);
  const [remainingDistance, setRemainingDistance] = useState(0);
  const [nextTurn, setNextTurn] = useState<string>('');

  // Quantum AI Rota Hesaplama
  const calculateRoutes = (dest: string) => {
    setDestination(dest);

    // Demo rotalar - Gerçek uygulamada API'den gelecek
    const mockRoutes: RouteOption[] = [
      {
        id: 'fastest',
        name: 'En Hızlı Rota',
        distance: 15.4,
        duration: 22,
        fuelCost: 45.80,
        trafficLevel: 'low',
        savings: 12,
        eco: false,
        toll: true,
        waypoints: [
          { id: '1', name: 'TEM Otoyolu', lat: 41.01, lng: 28.98, type: 'poi', distance: 3.2 },
          { id: '2', name: 'Shell Benzinlik', lat: 41.02, lng: 29.00, type: 'fuel', distance: 7.8 },
          { id: '3', name: 'Kavacık', lat: 41.03, lng: 29.05, type: 'poi', distance: 12.1 }
        ]
      },
      {
        id: 'economic',
        name: 'Ekonomik Rota',
        distance: 17.2,
        duration: 28,
        fuelCost: 32.50,
        trafficLevel: 'medium',
        savings: 28,
        eco: true,
        toll: false,
        waypoints: [
          { id: '1', name: 'Bağdat Caddesi', lat: 40.99, lng: 29.01, type: 'poi', distance: 4.5 },
          { id: '2', name: 'Opet', lat: 41.00, lng: 29.03, type: 'fuel', distance: 9.2 }
        ]
      },
      {
        id: 'balanced',
        name: 'Dengeli Rota (AI Önerisi)',
        distance: 16.1,
        duration: 25,
        fuelCost: 38.20,
        trafficLevel: 'low',
        savings: 18,
        eco: true,
        toll: false,
        waypoints: [
          { id: '1', name: 'E-5', lat: 41.00, lng: 28.99, type: 'poi', distance: 5.1 },
          { id: '2', name: 'Kahve Molası', lat: 41.01, lng: 29.02, type: 'rest', distance: 10.3 }
        ]
      }
    ];

    setRoutes(mockRoutes);
    setSelectedRoute('balanced');

    // Son aramalar
    setRecentSearches(prev => [dest, ...prev.slice(0, 4)]);
  };

  // Navigasyonu Başlat
  const startNavigation = () => {
    if (!selectedRoute) return;

    setIsNavigating(true);
    const route = routes.find(r => r.id === selectedRoute);
    if (route) {
      const arrivalTime = new Date();
      arrivalTime.setMinutes(arrivalTime.getMinutes() + route.duration);
      setETA(arrivalTime);
      setRemainingDistance(route.distance);
      setNextTurn('500m sonra sağa dönün - TEM Otoyolu');
    }
  };

  // Demo kayıtlı konumlar
  useEffect(() => {
    setSavedLocations([
      { id: '1', name: 'Ev', address: 'Kadıköy, İstanbul', lat: 40.99, lng: 29.03, category: 'home', visits: 147 },
      { id: '2', name: 'İş', address: 'Maslak, İstanbul', lat: 41.11, lng: 29.02, category: 'work', visits: 89 },
      { id: '3', name: 'Alışveriş Merkezi', address: 'Zorlu Center', lat: 41.07, lng: 29.01, category: 'favorite', visits: 23 }
    ]);

    // Demo hava durumu
    setWeatherData({
      temp: 24,
      condition: 'sunny',
      humidity: 65,
      wind: 12
    });
  }, []);

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6 overflow-auto">
      {/* Header */}
      <motion.div
        className="mb-6 p-6 bg-gradient-to-r from-blue-900/40 to-cyan-900/40 rounded-2xl border border-blue-500/30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Navigation className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Quantum Navigasyon</h2>
              <p className="text-gray-400 text-sm">AI Destekli Rota Optimizasyonu</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-xs text-gray-400">Hava Durumu</p>
              <p className="text-white font-bold">{weatherData?.temp}°C</p>
            </div>
            <Sun className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </motion.div>

      {/* Arama ve Hızlı Erişim */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2">
          {/* Arama Çubuğu */}
          <div className="bg-gray-900/50 rounded-2xl border border-gray-700/50 p-6">
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Nereye gitmek istiyorsunuz?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && calculateRoutes(destination)}
                  className="w-full px-6 py-4 bg-gray-800 rounded-xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {recentSearches.length > 0 && destination === '' && (
                  <div className="mt-3">
                    <p className="text-gray-400 text-xs mb-2">Son Aramalar:</p>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, i) => (
                        <motion.button
                          key={i}
                          onClick={() => calculateRoutes(search)}
                          className="px-3 py-1 bg-gray-700 rounded-lg text-white text-sm hover:bg-gray-600"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Clock className="w-3 h-3 inline mr-1" />
                          {search}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <motion.button
                onClick={() => calculateRoutes(destination)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Navigation2 className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Filtreler */}
            <div className="flex gap-3 mt-4">
              <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={ecoMode}
                  onChange={(e) => setEcoMode(e.target.checked)}
                  className="w-4 h-4 accent-green-500"
                />
                Eko Mod
              </label>
              <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={avoidTolls}
                  onChange={(e) => setAvoidTolls(e.target.checked)}
                  className="w-4 h-4 accent-blue-500"
                />
                Ücretli yollardan kaçın
              </label>
              <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={avoidHighways}
                  onChange={(e) => setAvoidHighways(e.target.checked)}
                  className="w-4 h-4 accent-blue-500"
                />
                Otoyollardan kaçın
              </label>
              <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPOI}
                  onChange={(e) => setShowPOI(e.target.checked)}
                  className="w-4 h-4 accent-purple-500"
                />
                İlgi Noktaları
              </label>
            </div>
          </div>
        </div>

        {/* Kayıtlı Konumlar */}
        <div className="bg-gray-900/50 rounded-2xl border border-gray-700/50 p-6">
          <h3 className="text-white font-bold mb-4">Hızlı Erişim</h3>
          <div className="space-y-2">
            {savedLocations.slice(0, 3).map(loc => (
              <motion.button
                key={loc.id}
                onClick={() => calculateRoutes(loc.address)}
                className="w-full p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 text-left"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    loc.category === 'home' ? 'bg-blue-600' :
                    loc.category === 'work' ? 'bg-purple-600' : 'bg-green-600'
                  }`}>
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{loc.name}</p>
                    <p className="text-gray-400 text-xs">{loc.address}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Rota Seçenekleri */}
      {routes.length > 0 && (
        <div className="mb-6">
          <h3 className="text-white font-bold text-lg mb-4">Rota Seçenekleri</h3>
          <div className="grid grid-cols-3 gap-4">
            {routes.map(route => (
              <motion.div
                key={route.id}
                onClick={() => setSelectedRoute(route.id)}
                className={`p-6 rounded-2xl border-2 cursor-pointer ${
                  selectedRoute === route.id
                    ? 'bg-gradient-to-br from-blue-600/30 to-cyan-600/30 border-blue-500'
                    : 'bg-gray-900/50 border-gray-700/50 hover:border-gray-600'
                }`}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-white font-bold">{route.name}</h4>
                    {route.eco && (
                      <span className="inline-block mt-1 px-2 py-1 bg-green-600/30 rounded text-green-400 text-xs">
                        Eko
                      </span>
                    )}
                  </div>
                  {route.id === 'balanced' && (
                    <Zap className="w-6 h-6 text-yellow-500" />
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Navigation className="w-4 h-4" />
                      Mesafe
                    </span>
                    <span className="text-white font-bold">{route.distance} km</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Süre
                    </span>
                    <span className="text-white font-bold">{route.duration} dk</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Fuel className="w-4 h-4" />
                      Yakıt
                    </span>
                    <span className="text-white font-bold">{route.fuelCost.toFixed(2)} ₺</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <TrendingDown className="w-4 h-4" />
                      Tasarruf
                    </span>
                    <span className="text-green-400 font-bold">%{route.savings}</span>
                  </div>

                  <div className="pt-3 border-t border-gray-700">
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded text-xs ${
                        route.trafficLevel === 'low' ? 'bg-green-600/30 text-green-400' :
                        route.trafficLevel === 'medium' ? 'bg-yellow-600/30 text-yellow-400' :
                        'bg-red-600/30 text-red-400'
                      }`}>
                        {route.trafficLevel === 'low' ? 'Akıcı' :
                         route.trafficLevel === 'medium' ? 'Orta' : 'Yoğun'}
                      </div>
                      {route.toll && (
                        <div className="px-2 py-1 bg-orange-600/30 rounded text-orange-400 text-xs">
                          Ücretli
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigasyon Başlat */}
          {selectedRoute && !isNavigating && (
            <motion.button
              onClick={startNavigation}
              className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Navigation className="w-6 h-6" />
              Navigasyonu Başlat
            </motion.button>
          )}
        </div>
      )}

      {/* Aktif Navigasyon */}
      {isNavigating && (
        <motion.div
          className="fixed bottom-6 left-6 right-6 p-8 bg-gradient-to-r from-blue-900 to-cyan-900 rounded-2xl border-2 border-blue-500 shadow-2xl z-50"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-3">
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Navigation2 className="w-12 h-12 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-white font-bold text-2xl">{nextTurn}</h3>
                  <p className="text-gray-300">Hedefinize yaklaşıyorsunuz</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <p className="text-gray-300 text-sm">Kalan Mesafe</p>
                  <p className="text-white font-bold text-xl">{remainingDistance.toFixed(1)} km</p>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <p className="text-gray-300 text-sm">Tahmini Varış</p>
                  <p className="text-white font-bold text-xl">
                    {eta?.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <p className="text-gray-300 text-sm">Ortalama Hız</p>
                  <p className="text-white font-bold text-xl">65 km/s</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <motion.button
                onClick={() => setIsNavigating(false)}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white font-bold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <XCircle className="w-5 h-5" />
                Durdur
              </motion.button>
              <motion.button
                className="flex-1 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <RefreshCw className="w-5 h-5" />
                Yeniden Hesapla
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
