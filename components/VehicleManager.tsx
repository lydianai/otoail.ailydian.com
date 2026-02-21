'use client';

// ============================================
// TÜRK OTO AI - Vehicle Manager Component
// Multi-Vehicle CRUD Interface
// ============================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car, Plus, Edit, Trash2, Check, X, Search, Settings,
  Calendar, Gauge, Fuel, Activity, TrendingUp, AlertCircle
} from 'lucide-react';
import {
  getVehicleService,
  formatLicensePlate,
  getVehicleAge,
  getFuelTypeDisplay,
  getTransmissionDisplay,
  formatMileage,
} from '@/lib/services/vehicle';
import type { Vehicle } from '@/types';

interface VehicleManagerProps {
  onVehicleChange?: (vehicle: Vehicle) => void;
}

export default function VehicleManager({ onVehicleChange }: VehicleManagerProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(null);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    licensePlate: '',
    vin: '',
    fuelType: 'gasoline' as Vehicle['fuelType'],
    transmission: 'manual' as Vehicle['transmission'],
    engineSize: 0,
    color: '',
    mileage: 0,
  });

  const vehicleService = getVehicleService({ debug: true });

  // Load vehicles on mount
  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const allVehicles = await vehicleService.getAllVehicles();
      setVehicles(allVehicles);

      const active = await vehicleService.getActiveVehicle();
      setActiveVehicle(active);

      if (active && onVehicleChange) {
        onVehicleChange(active);
      }
    } catch (err: any) {
      console.error('Error loading vehicles:', err);
    }
  };

  // Handle create vehicle
  const handleCreateVehicle = async () => {
    try {
      setError(null);

      const vehicle = await vehicleService.createVehicle({
        ...formData,
        engineSize: formData.engineSize || undefined,
        vin: formData.vin || undefined,
        color: formData.color || undefined,
      });

      await loadVehicles();
      setIsAddingVehicle(false);
      resetForm();
    } catch (err: any) {
      setError(err.message || 'Araç eklenemedi');
    }
  };

  // Handle update vehicle
  const handleUpdateVehicle = async () => {
    if (!editingVehicle) return;

    try {
      setError(null);

      await vehicleService.updateVehicle(editingVehicle.id, {
        ...formData,
        engineSize: formData.engineSize || undefined,
        vin: formData.vin || undefined,
        color: formData.color || undefined,
      });

      await loadVehicles();
      setEditingVehicle(null);
      resetForm();
    } catch (err: any) {
      setError(err.message || 'Araç güncellenemedi');
    }
  };

  // Handle delete vehicle
  const handleDeleteVehicle = async (id: string) => {
    if (!confirm('Bu aracı silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await vehicleService.deleteVehicle(id);
      await loadVehicles();
    } catch (err: any) {
      setError(err.message || 'Araç silinemedi');
    }
  };

  // Handle set active vehicle
  const handleSetActiveVehicle = async (vehicle: Vehicle) => {
    try {
      await vehicleService.setActiveVehicle(vehicle.id);
      await loadVehicles();

      if (onVehicleChange) {
        onVehicleChange(vehicle);
      }
    } catch (err: any) {
      setError(err.message || 'Aktif araç değiştirilemedi');
    }
  };

  // Start editing vehicle
  const startEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      licensePlate: vehicle.licensePlate,
      vin: vehicle.vin || '',
      fuelType: vehicle.fuelType,
      transmission: vehicle.transmission,
      engineSize: vehicle.engineSize || 0,
      color: vehicle.color || '',
      mileage: vehicle.mileage || 0,
    });
    setIsAddingVehicle(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      make: '',
      model: '',
      year: new Date().getFullYear(),
      licensePlate: '',
      vin: '',
      fuelType: 'gasoline',
      transmission: 'manual',
      engineSize: 0,
      color: '',
      mileage: 0,
    });
    setEditingVehicle(null);
  };

  // Filter vehicles by search query
  const filteredVehicles = vehicles.filter(v =>
    v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.licensePlate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col gap-4 p-6 bg-gray-50 overflow-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900">Araçlarım</h2>
              <p className="text-sm text-gray-500">{vehicles.length} araç kayıtlı</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAddingVehicle(true)}
            className="px-6 py-3 rounded-full bg-purple-600 text-white font-bold shadow-lg hover:bg-purple-700 transition-all"
          >
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              <span>Yeni Araç Ekle</span>
            </div>
          </motion.button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Marka, model veya plaka ara..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-gray-900"
          />
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
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-900 font-semibold">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-600 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Vehicle Modal */}
      <AnimatePresence>
        {isAddingVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setIsAddingVehicle(false);
              resetForm();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-gray-900">
                  {editingVehicle ? 'Araç Düzenle' : 'Yeni Araç Ekle'}
                </h3>
                <button
                  onClick={() => {
                    setIsAddingVehicle(false);
                    resetForm();
                  }}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Make & Model */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Marka *</label>
                    <input
                      type="text"
                      value={formData.make}
                      onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                      placeholder="TOGG, Renault, Ford..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Model *</label>
                    <input
                      type="text"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      placeholder="T10X, Clio, Focus..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Year & License Plate */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Yıl *</label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Plaka *</label>
                    <input
                      type="text"
                      value={formData.licensePlate}
                      onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value.toUpperCase() })}
                      placeholder="34 ABC 123"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Fuel Type & Transmission */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Yakıt Tipi *</label>
                    <select
                      value={formData.fuelType}
                      onChange={(e) => setFormData({ ...formData, fuelType: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    >
                      <option value="gasoline">Benzin</option>
                      <option value="diesel">Dizel</option>
                      <option value="electric">Elektrik</option>
                      <option value="hybrid">Hibrit</option>
                      <option value="lpg">LPG</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Vites *</label>
                    <select
                      value={formData.transmission}
                      onChange={(e) => setFormData({ ...formData, transmission: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    >
                      <option value="manual">Manuel</option>
                      <option value="automatic">Otomatik</option>
                      <option value="cvt">CVT</option>
                    </select>
                  </div>
                </div>

                {/* Engine Size & Mileage */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Motor Hacmi (L)</label>
                    <input
                      type="number"
                      value={formData.engineSize}
                      onChange={(e) => setFormData({ ...formData, engineSize: parseFloat(e.target.value) })}
                      step="0.1"
                      min="0"
                      max="10"
                      placeholder="1.6"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Kilometre</label>
                    <input
                      type="number"
                      value={formData.mileage}
                      onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
                      min="0"
                      placeholder="0"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* VIN & Color */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Şasi No (VIN)</label>
                    <input
                      type="text"
                      value={formData.vin}
                      onChange={(e) => setFormData({ ...formData, vin: e.target.value.toUpperCase() })}
                      placeholder="1HGBH41JXMN109186"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Renk</label>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      placeholder="Beyaz, Siyah..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={editingVehicle ? handleUpdateVehicle : handleCreateVehicle}
                    className="flex-1 py-4 rounded-2xl bg-purple-600 text-white font-bold shadow-lg hover:bg-purple-700 transition-all"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      <span>{editingVehicle ? 'Güncelle' : 'Kaydet'}</span>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsAddingVehicle(false);
                      resetForm();
                    }}
                    className="px-8 py-4 rounded-2xl bg-gray-600 text-white font-bold shadow-lg hover:bg-gray-700 transition-all"
                  >
                    İptal
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVehicles.map((vehicle) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => !vehicle.isActive && handleSetActiveVehicle(vehicle)}
            className={`
              relative p-6 rounded-3xl shadow-xl transition-all cursor-pointer
              ${vehicle.isActive
                ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white ring-4 ring-purple-300'
                : 'bg-white hover:shadow-2xl'
              }
            `}
          >
            {/* Active Badge */}
            {vehicle.isActive && (
              <div className="absolute -top-2 -right-2 px-4 py-1 rounded-full bg-green-500 text-white text-xs font-bold shadow-lg">
                Aktif
              </div>
            )}

            {/* Vehicle Icon */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${vehicle.isActive ? 'bg-white/20' : 'bg-purple-500'}`}>
              <Car className={`w-6 h-6 ${vehicle.isActive ? 'text-white' : 'text-white'}`} />
            </div>

            {/* Vehicle Info */}
            <h3 className={`text-2xl font-black mb-1 ${vehicle.isActive ? 'text-white' : 'text-gray-900'}`}>
              {vehicle.make} {vehicle.model}
            </h3>
            <p className={`text-sm mb-4 ${vehicle.isActive ? 'text-purple-100' : 'text-gray-500'}`}>
              {vehicle.year} • {formatLicensePlate(vehicle.licensePlate)}
            </p>

            {/* Vehicle Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className={`p-3 rounded-xl ${vehicle.isActive ? 'bg-white/20' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Fuel className={`w-3 h-3 ${vehicle.isActive ? 'text-white' : 'text-purple-600'}`} />
                  <span className={`text-xs font-semibold ${vehicle.isActive ? 'text-purple-100' : 'text-gray-600'}`}>Yakıt</span>
                </div>
                <p className={`text-sm font-bold ${vehicle.isActive ? 'text-white' : 'text-gray-900'}`}>
                  {getFuelTypeDisplay(vehicle.fuelType)}
                </p>
              </div>

              <div className={`p-3 rounded-xl ${vehicle.isActive ? 'bg-white/20' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Settings className={`w-3 h-3 ${vehicle.isActive ? 'text-white' : 'text-purple-600'}`} />
                  <span className={`text-xs font-semibold ${vehicle.isActive ? 'text-purple-100' : 'text-gray-600'}`}>Vites</span>
                </div>
                <p className={`text-sm font-bold ${vehicle.isActive ? 'text-white' : 'text-gray-900'}`}>
                  {getTransmissionDisplay(vehicle.transmission)}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  startEditVehicle(vehicle);
                }}
                className={`flex-1 py-2 px-4 rounded-xl font-semibold text-sm transition-all ${
                  vehicle.isActive
                    ? 'bg-white/20 hover:bg-white/30 text-white'
                    : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
                }`}
              >
                <Edit className="w-4 h-4 mx-auto" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteVehicle(vehicle.id);
                }}
                className={`flex-1 py-2 px-4 rounded-xl font-semibold text-sm transition-all ${
                  vehicle.isActive
                    ? 'bg-white/20 hover:bg-white/30 text-white'
                    : 'bg-red-100 hover:bg-red-200 text-red-700'
                }`}
              >
                <Trash2 className="w-4 h-4 mx-auto" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredVehicles.length === 0 && !isAddingVehicle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-6">
            <Car className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {searchQuery ? 'Araç bulunamadı' : 'Henüz araç eklenmemiş'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchQuery
              ? 'Farklı bir arama terimi deneyin'
              : 'İlk aracınızı ekleyerek başlayın'
            }
          </p>
          {!searchQuery && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAddingVehicle(true)}
              className="px-8 py-4 rounded-full bg-purple-600 text-white font-bold shadow-lg hover:bg-purple-700 transition-all"
            >
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                <span>İlk Aracı Ekle</span>
              </div>
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  );
}
