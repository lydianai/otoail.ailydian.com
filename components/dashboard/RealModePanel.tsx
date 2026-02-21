'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Navigation,
  Circle,
  ChevronLeft,
  Plus
} from 'lucide-react';
import LiveGPSTracker from './LiveGPSTracker';
import TripHistoryView from './TripHistoryView';
import GeoFenceManager from './GeoFenceManager';
import VehicleOnboardingNew from './VehicleOnboardingNew';

type RealModeTab = 'gps' | 'trips' | 'geofence';

interface RealModePanelProps {
  vehicleId?: string;
  onClose?: () => void;
}

export default function RealModePanel({ vehicleId, onClose }: RealModePanelProps) {
  const [activeTab, setActiveTab] = useState<RealModeTab>('gps');
  const [showOnboarding, setShowOnboarding] = useState(false);

  const tabs = [
    { id: 'gps' as RealModeTab, label: 'Canlı GPS', icon: MapPin, color: 'blue' },
    { id: 'trips' as RealModeTab, label: 'Seyahat Geçmişi', icon: Navigation, color: 'green' },
    { id: 'geofence' as RealModeTab, label: 'Geo-Fence', icon: Circle, color: 'purple' }
  ];

  const getTabColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'border-blue-500 bg-blue-500/20 text-blue-300',
      green: 'border-green-500 bg-green-500/20 text-green-300',
      purple: 'border-purple-500 bg-purple-500/20 text-purple-300'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}
          <div>
            <h2 className="text-2xl font-bold text-white">Real Mode</h2>
            <p className="text-sm text-white/70">
              Canlı araç takibi ve seyahat yönetimi
            </p>
          </div>
        </div>

        {/* Add Vehicle Button */}
        <motion.button
          onClick={() => setShowOnboarding(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E30A17] to-red-600 text-white font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Araç Ekle</span>
        </motion.button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 p-4 border-b border-gray-700 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? getTabColor(tab.color)
                : 'border-gray-700 bg-gray-800/50 text-white/70 hover:bg-gray-800'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="font-semibold">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'gps' && (
            <motion.div
              key="gps"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {vehicleId ? (
                <LiveGPSTracker vehicleId={vehicleId} />
              ) : (
                <div className="text-center py-12">
                  <MapPin className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-white/50">
                    GPS takibi için bir araç seçin
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'trips' && (
            <motion.div
              key="trips"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <TripHistoryView vehicleId={vehicleId} />
            </motion.div>
          )}

          {activeTab === 'geofence' && (
            <motion.div
              key="geofence"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <GeoFenceManager vehicleId={vehicleId} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-gray-700 bg-gray-900/50">
        <div className="flex items-center justify-between text-xs text-white/50">
          <span>Real-time tracking powered by WebSocket</span>
          {vehicleId && (
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Bağlı
            </span>
          )}
        </div>
      </div>

      {/* Vehicle Onboarding Modal */}
      {showOnboarding && (
        <VehicleOnboardingNew
          onComplete={() => {
            setShowOnboarding(false);
            // TODO: Refresh vehicle list after successful onboarding
          }}
          onClose={() => setShowOnboarding(false)}
        />
      )}
    </div>
  );
}
