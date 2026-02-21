'use client';

/**
 * Geofence Manager - Advanced Location-Based Alerts
 * Create virtual boundaries and get notified when vehicle enters/exits
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Plus, Trash2, Bell, Edit2, Circle, Square, AlertCircle, Check } from 'lucide-react';

interface Geofence {
  id: string;
  name: string;
  type: 'circle' | 'polygon';
  center: { lat: number; lng: number };
  radius?: number; // meters for circle
  polygon?: { lat: number; lng: number }[]; // points for polygon
  alerts: {
    onEnter: boolean;
    onExit: boolean;
    notifyEmail: boolean;
    notifyPush: boolean;
  };
  active: boolean;
  createdAt: Date;
  lastTriggered?: Date;
  triggerCount: number;
}

interface GeofenceManagerProps {
  currentLocation?: { lat: number; lng: number };
  className?: string;
  onGeofenceTriggered?: (geofence: Geofence, type: 'enter' | 'exit') => void;
}

export default function GeofenceManager({
  currentLocation = { lat: 41.0082, lng: 28.9784 },
  className = '',
  onGeofenceTriggered
}: GeofenceManagerProps) {
  const [geofences, setGeofences] = useState<Geofence[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newGeofence, setNewGeofence] = useState<Partial<Geofence>>({
    type: 'circle',
    radius: 500,
    alerts: {
      onEnter: true,
      onExit: true,
      notifyEmail: false,
      notifyPush: true,
    },
  });

  // Predefined zones in Turkey
  const predefinedZones = [
    { name: 'Ev', lat: 41.0082, lng: 28.9784, radius: 200 },
    { name: 'İş Yeri', lat: 41.0425, lng: 29.0078, radius: 300 },
    { name: 'Okul', lat: 40.9895, lng: 29.0234, radius: 250 },
    { name: 'Alışveriş Merkezi', lat: 41.0656, lng: 29.0045, radius: 400 },
  ];

  // Check if current location is inside any geofence
  useEffect(() => {
    geofences.forEach(geofence => {
      if (!geofence.active) return;

      const isInside = checkIfInside(currentLocation, geofence);
      const wasInside = localStorage.getItem(`geofence_${geofence.id}_inside`) === 'true';

      if (isInside && !wasInside) {
        // Entered geofence
        if (geofence.alerts.onEnter) {
          handleGeofenceTrigger(geofence, 'enter');
        }
        localStorage.setItem(`geofence_${geofence.id}_inside`, 'true');
      } else if (!isInside && wasInside) {
        // Exited geofence
        if (geofence.alerts.onExit) {
          handleGeofenceTrigger(geofence, 'exit');
        }
        localStorage.setItem(`geofence_${geofence.id}_inside`, 'false');
      }
    });
  }, [currentLocation, geofences]);

  function checkIfInside(location: { lat: number; lng: number }, geofence: Geofence): boolean {
    if (geofence.type === 'circle' && geofence.radius) {
      const distance = calculateDistance(
        location.lat,
        location.lng,
        geofence.center.lat,
        geofence.center.lng
      );
      return distance * 1000 <= geofence.radius; // Convert km to meters
    }
    return false;
  }

  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  function handleGeofenceTrigger(geofence: Geofence, type: 'enter' | 'exit') {
    // Update trigger count and last triggered
    setGeofences(prev => prev.map(g =>
      g.id === geofence.id
        ? { ...g, triggerCount: g.triggerCount + 1, lastTriggered: new Date() }
        : g
    ));

    // Notify
    if (geofence.alerts.notifyPush) {
      showNotification(geofence, type);
    }

    onGeofenceTriggered?.(geofence, type);
  }

  function showNotification(geofence: Geofence, type: 'enter' | 'exit') {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`Geofence Uyarısı: ${geofence.name}`, {
        body: type === 'enter'
          ? `Araç ${geofence.name} bölgesine girdi`
          : `Araç ${geofence.name} bölgesinden çıktı`,
        icon: '/icon.png',
      });
    }
  }

  function createGeofence() {
    if (!newGeofence.name) return;

    const geofence: Geofence = {
      id: `geo_${Date.now()}`,
      name: newGeofence.name,
      type: newGeofence.type || 'circle',
      center: newGeofence.center || currentLocation,
      radius: newGeofence.radius,
      alerts: newGeofence.alerts || {
        onEnter: true,
        onExit: true,
        notifyEmail: false,
        notifyPush: true,
      },
      active: true,
      createdAt: new Date(),
      triggerCount: 0,
    };

    setGeofences(prev => [...prev, geofence]);
    setIsCreating(false);
    setNewGeofence({
      type: 'circle',
      radius: 500,
      alerts: {
        onEnter: true,
        onExit: true,
        notifyEmail: false,
        notifyPush: true,
      },
    });
  }

  function deleteGeofence(id: string) {
    setGeofences(prev => prev.filter(g => g.id !== id));
    localStorage.removeItem(`geofence_${id}_inside`);
  }

  function toggleActive(id: string) {
    setGeofences(prev => prev.map(g =>
      g.id === id ? { ...g, active: !g.active } : g
    ));
  }

  function usePredefinedZone(zone: typeof predefinedZones[0]) {
    setNewGeofence(prev => ({
      ...prev,
      name: zone.name,
      center: { lat: zone.lat, lng: zone.lng },
      radius: zone.radius,
    }));
  }

  return (
    <div className={`bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <MapPin className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Geofence Yönetimi</h2>
            <p className="text-sm text-gray-400">{geofences.length} bölge tanımlı</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCreating(!isCreating)}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold transition-all"
        >
          <Plus className="w-5 h-5" />
          Yeni Bölge
        </motion.button>
      </div>

      {/* Create New Geofence */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-6 bg-black/40 border border-purple-500/50 rounded-2xl p-4 overflow-hidden"
          >
            <h3 className="text-lg font-bold text-white mb-4">Yeni Geofence Oluştur</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Bölge Adı</label>
                <input
                  type="text"
                  placeholder="Örn: Ev, İş, Okul"
                  value={newGeofence.name || ''}
                  onChange={e => setNewGeofence(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Hızlı Seçim</label>
                <div className="grid grid-cols-2 gap-2">
                  {predefinedZones.map(zone => (
                    <motion.button
                      key={zone.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => usePredefinedZone(zone)}
                      className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white transition-all"
                    >
                      {zone.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Yarıçap (metre)</label>
                <input
                  type="number"
                  value={newGeofence.radius || 500}
                  onChange={e => setNewGeofence(prev => ({ ...prev, radius: parseInt(e.target.value) }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Uyarılar</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newGeofence.alerts?.onEnter}
                      onChange={e => setNewGeofence(prev => ({
                        ...prev,
                        alerts: { ...prev.alerts!, onEnter: e.target.checked }
                      }))}
                      className="w-4 h-4 rounded border-gray-700 text-purple-500 focus:ring-purple-500"
                    />
                    <span className="text-sm text-white">Bölgeye girildiğinde bildir</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newGeofence.alerts?.onExit}
                      onChange={e => setNewGeofence(prev => ({
                        ...prev,
                        alerts: { ...prev.alerts!, onExit: e.target.checked }
                      }))}
                      className="w-4 h-4 rounded border-gray-700 text-purple-500 focus:ring-purple-500"
                    />
                    <span className="text-sm text-white">Bölgeden çıkıldığında bildir</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newGeofence.alerts?.notifyPush}
                      onChange={e => setNewGeofence(prev => ({
                        ...prev,
                        alerts: { ...prev.alerts!, notifyPush: e.target.checked }
                      }))}
                      className="w-4 h-4 rounded border-gray-700 text-purple-500 focus:ring-purple-500"
                    />
                    <span className="text-sm text-white">Push bildirimi gönder</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={createGeofence}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-bold transition-all"
                >
                  Oluştur
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCreating(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg font-bold transition-all"
                >
                  İptal
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Geofences List */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
        {geofences.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400">Henüz geofence bölgesi oluşturulmamış</p>
            <p className="text-sm text-gray-500 mt-2">Yeni bölge eklemek için yukarıdaki butona tıklayın</p>
          </div>
        ) : (
          geofences.map((geofence, index) => (
            <motion.div
              key={geofence.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-black/40 border rounded-2xl p-4 transition-all ${
                geofence.active ? 'border-purple-500/50' : 'border-white/10'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Circle className={`w-5 h-5 ${geofence.active ? 'text-purple-400' : 'text-gray-500'}`} />
                    <h3 className="text-lg font-bold text-white">{geofence.name}</h3>
                    {geofence.active && (
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
                    <div>Yarıçap: <span className="text-white font-bold">{geofence.radius}m</span></div>
                    <div>Tetikleme: <span className="text-white font-bold">{geofence.triggerCount}</span></div>
                  </div>

                  {geofence.lastTriggered && (
                    <div className="text-xs text-gray-500 mt-2">
                      Son tetikleme: {new Date(geofence.lastTriggered).toLocaleString('tr-TR')}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleActive(geofence.id)}
                    className={`p-2 rounded-lg transition-all ${
                      geofence.active
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {geofence.active ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteGeofence(geofence.id)}
                    className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {geofence.alerts.onEnter && (
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                    Giriş Bildirimi
                  </span>
                )}
                {geofence.alerts.onExit && (
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs">
                    Çıkış Bildirimi
                  </span>
                )}
                {geofence.alerts.notifyPush && (
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs flex items-center gap-1">
                    <Bell className="w-3 h-3" />
                    Push
                  </span>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
