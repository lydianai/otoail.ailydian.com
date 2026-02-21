'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  MapPin,
  Navigation,
  Filter,
  Search,
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  Loader,
  ChevronDown,
  ExternalLink,
  Battery,
  BatteryCharging,
  Gauge
} from 'lucide-react';

interface ChargingStation {
  id: number;
  uuid: string;
  name: string;
  address: {
    line1: string;
    town: string;
    province: string;
    postcode: string;
    latitude: number;
    longitude: number;
    distance?: number;
  };
  connections: Array<{
    id: number;
    type: string;
    formalName?: string;
    powerKW?: number;
    isFastCharge: boolean;
    level?: string;
    quantity: number;
  }>;
  numberOfPoints: number;
  isOperational: boolean;
  status: string;
  operator: {
    name: string;
    website?: string;
  };
  usageType: string;
  lastUpdate?: string;
}

const EV_BRANDS = [
  { label: 'Tümü', value: '' },
  { label: 'Tesla', value: 'tesla' },
  { label: 'BMW', value: 'bmw' },
  { label: 'Mercedes', value: 'mercedes' },
  { label: 'Audi', value: 'audi' },
  { label: 'Volkswagen', value: 'volkswagen' },
  { label: 'Nissan', value: 'nissan' },
  { label: 'Renault', value: 'renault' },
  { label: 'Hyundai', value: 'hyundai' },
  { label: 'Kia', value: 'kia' },
  { label: 'MG', value: 'mg' },
  { label: 'BYD', value: 'byd' },
  { label: 'TOGG', value: 'togg' },
  { label: 'Porsche', value: 'porsche' },
];

export default function EVChargingStations() {
  const [stations, setStations] = useState<ChargingStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [fastChargeOnly, setFastChargeOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null);

  // Get user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied, showing all Turkey stations');
        }
      );
    }
  }, []);

  // Fetch charging stations
  useEffect(() => {
    fetchChargingStations();
  }, [selectedBrand, fastChargeOnly, userLocation]);

  const fetchChargingStations = async () => {
    setLoading(true);
    setError(null);

    try {
      let url = '/api/ev/charging-stations?maxResults=200';

      if (userLocation) {
        url += `&lat=${userLocation.lat}&lon=${userLocation.lon}&distance=100`;
      }

      if (selectedBrand) {
        url += `&vehicleBrand=${selectedBrand}`;
      }

      if (fastChargeOnly) {
        url += `&fastCharge=true`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setStations(data.stations);
      } else {
        setError(data.error || 'Şarj istasyonları yüklenemedi');
      }
    } catch (err) {
      console.error('Charging stations fetch error:', err);
      setError('Bağlantı hatası oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Filter stations by search query
  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.address.town.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.address.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.operator.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/50">
              <BatteryCharging className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">Şarj İstasyonları</h1>
              <p className="text-sm text-gray-400">Türkiye geneli {stations.length} istasyon</p>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all flex items-center gap-2"
          >
            <Filter className="w-5 h-5" />
            Filtrele
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 p-4 rounded-xl bg-white/5 border border-white/10">
                {/* Brand Filter */}
                <div>
                  <label className="text-sm font-semibold text-white mb-2 block">Araç Markası</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-2">
                    {EV_BRANDS.map((brand) => (
                      <button
                        key={brand.value}
                        onClick={() => setSelectedBrand(brand.value)}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                          selectedBrand === brand.value
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/50'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                      >
                        {brand.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fast Charge Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">Sadece Hızlı Şarj</p>
                    <p className="text-xs text-gray-400">DC fast charging istasyonları</p>
                  </div>
                  <button
                    onClick={() => setFastChargeOnly(!fastChargeOnly)}
                    className={`relative w-16 h-8 rounded-full transition-all ${
                      fastChargeOnly ? 'bg-green-500' : 'bg-gray-700'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform ${
                        fastChargeOnly ? 'translate-x-9' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="İstasyon, şehir veya operatör ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader className="w-12 h-12 text-green-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Şarj istasyonları yükleniyor...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <p className="text-xl text-white mb-2">{error}</p>
              <button
                onClick={fetchChargingStations}
                className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
              >
                Tekrar Dene
              </button>
            </div>
          </div>
        ) : filteredStations.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-xl text-white mb-2">Şarj istasyonu bulunamadı</p>
              <p className="text-sm text-gray-400">Farklı filtreler deneyin</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredStations.map((station, index) => (
              <motion.div
                key={station.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedStation(station)}
                className="group cursor-pointer"
              >
                <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-green-500 transition-all hover:shadow-lg hover:shadow-green-500/20">
                  {/* Station Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-green-400 transition-colors">
                        {station.name}
                      </h3>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {station.address.town}, {station.address.province}
                      </p>
                    </div>
                    <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      station.isOperational
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {station.isOperational ? '✓ Açık' : '✕ Kapalı'}
                    </div>
                  </div>

                  {/* Connections */}
                  <div className="space-y-2 mb-3">
                    {station.connections.slice(0, 2).map((conn) => (
                      <div key={conn.id} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                        <div className="flex items-center gap-2">
                          <Zap className={`w-4 h-4 ${conn.isFastCharge ? 'text-yellow-400' : 'text-gray-400'}`} />
                          <span className="text-xs font-semibold text-white">{conn.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {conn.powerKW && (
                            <span className="text-xs text-green-400 font-bold">{conn.powerKW} kW</span>
                          )}
                          <span className="text-xs text-gray-400">×{conn.quantity}</span>
                        </div>
                      </div>
                    ))}
                    {station.connections.length > 2 && (
                      <p className="text-xs text-gray-400 text-center">
                        +{station.connections.length - 2} bağlantı daha
                      </p>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                    <div className="text-xs text-gray-400">
                      {station.operator.name}
                    </div>
                    {station.address.distance && (
                      <div className="flex items-center gap-1 text-xs text-green-400 font-semibold">
                        <Navigation className="w-3 h-3" />
                        {station.address.distance.toFixed(1)} km
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Station Detail Modal */}
      <AnimatePresence>
        {selectedStation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStation(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-white mb-2">{selectedStation.name}</h2>
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {selectedStation.address.line1 && `${selectedStation.address.line1}, `}
                    {selectedStation.address.town}, {selectedStation.address.province}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedStation(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {/* All Connections */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3">Bağlantı Tipleri</h3>
                <div className="space-y-2">
                  {selectedStation.connections.map((conn) => (
                    <div key={conn.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Zap className={`w-5 h-5 ${conn.isFastCharge ? 'text-yellow-400' : 'text-gray-400'}`} />
                          <div>
                            <p className="text-sm font-bold text-white">{conn.type}</p>
                            {conn.formalName && (
                              <p className="text-xs text-gray-400">{conn.formalName}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          {conn.powerKW && (
                            <p className="text-lg font-bold text-green-400">{conn.powerKW} kW</p>
                          )}
                          <p className="text-xs text-gray-400">{conn.quantity} adet</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Station Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Operatör</p>
                  <p className="text-sm font-bold text-white">{selectedStation.operator.name}</p>
                  {selectedStation.operator.website && (
                    <a
                      href={selectedStation.operator.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1 mt-1"
                    >
                      Website <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Kullanım</p>
                  <p className="text-sm font-bold text-white">{selectedStation.usageType}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Durum</p>
                  <p className={`text-sm font-bold ${
                    selectedStation.isOperational ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {selectedStation.status}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Şarj Noktası</p>
                  <p className="text-sm font-bold text-white">{selectedStation.numberOfPoints} adet</p>
                </div>
              </div>

              {/* Navigation Button */}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedStation.address.latitude},${selectedStation.address.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold hover:shadow-lg hover:shadow-green-500/50 transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-5 h-5" />
                Yol Tarifi Al
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
