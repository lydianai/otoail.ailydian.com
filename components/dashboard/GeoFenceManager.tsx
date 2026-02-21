'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Plus,
  Trash2,
  Circle,
  AlertCircle,
  X,
  Save
} from 'lucide-react';

interface GeoFence {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
  shape: 'CIRCLE' | 'POLYGON';
  notifyOnExit: boolean;
  vehicle: {
    make: string;
    model: string;
    licensePlate: string;
  };
}

interface GeoFenceManagerProps {
  vehicleId?: string;
}

export default function GeoFenceManager({ vehicleId }: GeoFenceManagerProps) {
  const [geofences, setGeofences] = useState<GeoFence[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGeoFence, setNewGeoFence] = useState({
    name: '',
    latitude: 41.0082,
    longitude: 28.9784,
    radius: 500,
    notifyOnExit: true
  });

  useEffect(() => {
    fetchGeoFences();
  }, [vehicleId]);

  const fetchGeoFences = async () => {
    try {
      setLoading(true);
      const url = vehicleId
        ? `/api/geofences?vehicleId=${vehicleId}`
        : `/api/geofences`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setGeofences(data.geofences);
      }
    } catch (error) {
      console.error('Error fetching geofences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!vehicleId) {
      alert('Lütfen önce bir araç seçin');
      return;
    }

    try {
      const response = await fetch('/api/geofences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId,
          ...newGeoFence
        })
      });

      const data = await response.json();

      if (data.success) {
        setGeofences([data.geofence, ...geofences]);
        setShowCreateForm(false);
        setNewGeoFence({
          name: '',
          latitude: 41.0082,
          longitude: 28.9784,
          radius: 500,
          notifyOnExit: true
        });
      }
    } catch (error) {
      console.error('Error creating geofence:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu bölgeyi silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/geofences?id=${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        setGeofences(geofences.filter(g => g.id !== id));
      }
    } catch (error) {
      console.error('Error deleting geofence:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/70">Geo-fence verileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Geo-Fence Bölgeleri</h3>
        {vehicleId && (
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            {showCreateForm ? (
              <>
                <X className="w-4 h-4" />
                İptal
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Yeni Bölge
              </>
            )}
          </button>
        )}
      </div>

      {/* Create Form */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 space-y-3"
          >
            <div>
              <label className="block text-sm text-white/70 mb-1">Bölge Adı</label>
              <input
                type="text"
                value={newGeoFence.name}
                onChange={(e) => setNewGeoFence({ ...newGeoFence, name: e.target.value })}
                placeholder="Örn: Ev, İşyeri"
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-white/70 mb-1">Enlem</label>
                <input
                  type="number"
                  step="0.0001"
                  value={newGeoFence.latitude}
                  onChange={(e) => setNewGeoFence({ ...newGeoFence, latitude: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-1">Boylam</label>
                <input
                  type="number"
                  step="0.0001"
                  value={newGeoFence.longitude}
                  onChange={(e) => setNewGeoFence({ ...newGeoFence, longitude: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-1">Yarıçap (metre)</label>
              <input
                type="number"
                step="50"
                value={newGeoFence.radius}
                onChange={(e) => setNewGeoFence({ ...newGeoFence, radius: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="notifyOnExit"
                checked={newGeoFence.notifyOnExit}
                onChange={(e) => setNewGeoFence({ ...newGeoFence, notifyOnExit: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="notifyOnExit" className="text-sm text-white/70">
                Bölgeden çıkınca bildirim gönder
              </label>
            </div>

            <button
              onClick={handleCreate}
              disabled={!newGeoFence.name}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              Kaydet
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GeoFence List */}
      <div className="space-y-2">
        {geofences.length === 0 ? (
          <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700">
            <MapPin className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-white/50">Henüz geo-fence bölgesi yok</p>
            {!vehicleId && (
              <p className="text-white/30 text-sm mt-2">
                Bölge eklemek için önce bir araç seçin
              </p>
            )}
          </div>
        ) : (
          geofences.map((fence, index) => (
            <motion.div
              key={fence.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 border border-blue-500 rounded-lg flex items-center justify-center">
                    <Circle className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{fence.name}</h4>
                    <p className="text-xs text-white/50 mt-1">
                      {fence.vehicle.make} {fence.vehicle.model} - {fence.vehicle.licensePlate}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-white/70">
                      <span>📍 {fence.latitude.toFixed(4)}, {fence.longitude.toFixed(4)}</span>
                      <span>🔵 {fence.radius}m</span>
                    </div>
                    {fence.notifyOnExit && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-yellow-400">
                        <AlertCircle className="w-3 h-3" />
                        Çıkış bildirimi aktif
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(fence.id)}
                  className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
