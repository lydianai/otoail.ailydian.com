'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Navigation,
  Calendar,
  TrendingUp,
  Clock,
  MapPin,
  AlertTriangle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Trip {
  id: string;
  startTime: Date;
  endTime: Date | null;
  distance: number;
  duration: number;
  overallScore: number;
  hardAccelerations: number;
  hardBrakes: number;
  vehicle: {
    make: string;
    model: string;
    licensePlate: string;
  };
}

interface TripStats {
  totalTrips: number;
  totalDistance: number;
  totalDuration: number;
  avgScore: number;
  hardAccelerations: number;
  hardBrakes: number;
}

interface TripHistoryViewProps {
  vehicleId?: string;
}

export default function TripHistoryView({ vehicleId }: TripHistoryViewProps) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [stats, setStats] = useState<TripStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedTrip, setExpandedTrip] = useState<string | null>(null);

  useEffect(() => {
    fetchTrips();
  }, [vehicleId]);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const url = vehicleId
        ? `/api/trips?vehicleId=${vehicleId}`
        : `/api/trips`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setTrips(data.trips.map((trip: any) => ({
          ...trip,
          startTime: new Date(trip.startTime),
          endTime: trip.endTime ? new Date(trip.endTime) : null
        })));
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return hours > 0 ? `${hours}s ${mins}dk` : `${mins}dk`;
  };

  const formatDistance = (km: number) => {
    return km >= 1 ? `${km.toFixed(1)} km` : `${Math.round(km * 1000)} m`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400 bg-green-500/20 border-green-500';
    if (score >= 60) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500';
    return 'text-red-400 bg-red-500/20 border-red-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/70">Seyahat verileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Navigation className="w-5 h-5 text-blue-400" />
              <span className="text-xs text-white/70">Toplam Seyahat</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.totalTrips}</p>
          </div>

          <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-green-400" />
              <span className="text-xs text-white/70">Toplam Mesafe</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {formatDistance(stats.totalDistance)}
            </p>
          </div>

          <div className="bg-purple-500/20 border border-purple-500/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span className="text-xs text-white/70">Ort. Puan</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {Math.round(stats.avgScore)}
            </p>
          </div>
        </div>
      )}

      {/* Trip List */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white mb-3">
          Son Seyahatler
        </h3>

        {trips.length === 0 ? (
          <div className="text-center py-12">
            <Navigation className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-white/50">Henüz seyahat kaydı yok</p>
          </div>
        ) : (
          <AnimatePresence>
            {trips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedTrip(expandedTrip === trip.id ? null : trip.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-800/70 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${getScoreColor(trip.overallScore)}`}>
                      <span className="text-lg font-bold">{Math.round(trip.overallScore)}</span>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold">
                        {trip.vehicle.make} {trip.vehicle.model}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-white/70 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {trip.startTime.toLocaleDateString('tr-TR')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {trip.startTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-white font-semibold">
                        {formatDistance(trip.distance)}
                      </p>
                      <p className="text-xs text-white/70">
                        {formatDuration(trip.duration)}
                      </p>
                    </div>
                    {expandedTrip === trip.id ? (
                      <ChevronUp className="w-5 h-5 text-white/70" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/70" />
                    )}
                  </div>
                </button>

                {expandedTrip === trip.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-700 p-4"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="w-4 h-4 text-yellow-400" />
                          <span className="text-xs text-white/70">Sert Hızlanma</span>
                        </div>
                        <p className="text-lg font-bold text-white">
                          {trip.hardAccelerations}
                        </p>
                      </div>
                      <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <span className="text-xs text-white/70">Sert Frenleme</span>
                        </div>
                        <p className="text-lg font-bold text-white">
                          {trip.hardBrakes}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
