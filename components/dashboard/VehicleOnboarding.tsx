'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car, Upload, CheckCircle, AlertCircle, Bluetooth, Wifi, Radio,
  FileText, Camera, Gauge, Wrench, Calendar, MapPin, CreditCard,
  Shield, ChevronRight, ChevronLeft, X, Search, Filter, Info
} from 'lucide-react';

// Türkiye'deki tüm araç markaları ve popüler modelleri
const VEHICLE_BRANDS = {
  'Abarth': ['500', '595', '695'],
  'Alfa Romeo': ['Giulia', 'Giulietta', 'Stelvio', 'Tonale'],
  'Audi': ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron', 'TT', 'R8'],
  'BMW': ['1 Serisi', '2 Serisi', '3 Serisi', '4 Serisi', '5 Serisi', '6 Serisi', '7 Serisi', '8 Serisi', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'iX', 'i4', 'Z4', 'M2', 'M3', 'M4', 'M5'],
  'Chery': ['Tiggo 7', 'Tiggo 8', 'Omoda 5'],
  'Chevrolet': ['Aveo', 'Cruze', 'Captiva', 'Trax', 'Camaro'],
  'Citroën': ['C3', 'C3 Aircross', 'C4', 'C5 Aircross', 'Berlingo'],
  'Cupra': ['Formentor', 'Leon', 'Ateca'],
  'Dacia': ['Duster', 'Sandero', 'Logan', 'Jogger', 'Spring'],
  'DS': ['DS 3', 'DS 4', 'DS 7'],
  'Fiat': ['500', 'Egea', 'Tipo', 'Panda', '500X', '500L', 'Doblo'],
  'Ford': ['Fiesta', 'Focus', 'Mondeo', 'Kuga', 'Puma', 'Mustang', 'Ranger', 'Transit', 'Tourneo'],
  'Honda': ['Civic', 'CR-V', 'HR-V', 'Jazz', 'Accord'],
  'Hyundai': ['i10', 'i20', 'Bayon', 'Tucson', 'Kona', 'Santa Fe', 'Ioniq 5', 'Ioniq 6', 'Elantra'],
  'Isuzu': ['D-Max', 'MU-X'],
  'Jaguar': ['E-Pace', 'F-Pace', 'I-Pace', 'XE', 'XF', 'F-Type'],
  'Jeep': ['Renegade', 'Compass', 'Cherokee', 'Grand Cherokee', 'Wrangler', 'Gladiator'],
  'Kia': ['Picanto', 'Rio', 'Stonic', 'XCeed', 'Ceed', 'Sportage', 'Sorento', 'EV6', 'EV9', 'Niro'],
  'Land Rover': ['Defender', 'Discovery', 'Discovery Sport', 'Range Rover', 'Range Rover Sport', 'Range Rover Evoque', 'Range Rover Velar'],
  'Lexus': ['UX', 'NX', 'RX', 'ES', 'IS', 'LS', 'LC'],
  'Mazda': ['2', '3', '6', 'CX-3', 'CX-5', 'CX-30', 'CX-60', 'MX-5'],
  'Mercedes-Benz': ['A Serisi', 'B Serisi', 'C Serisi', 'E Serisi', 'S Serisi', 'CLA', 'CLS', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'EQA', 'EQB', 'EQC', 'EQE', 'EQS', 'G Serisi', 'AMG GT'],
  'MG': ['ZS', 'HS', 'Marvel R', 'MG4', 'MG5'],
  'Mini': ['Cooper', 'Countryman', 'Clubman'],
  'Mitsubishi': ['ASX', 'Eclipse Cross', 'Outlander', 'L200'],
  'Nissan': ['Micra', 'Juke', 'Qashqai', 'X-Trail', 'Leaf', 'Ariya', 'Navara'],
  'Opel': ['Corsa', 'Astra', 'Insignia', 'Crossland', 'Grandland', 'Mokka', 'Combo'],
  'Peugeot': ['208', '2008', '308', '3008', '5008', 'Rifter', 'Partner', 'Boxer'],
  'Porsche': ['718', '911', 'Taycan', 'Panamera', 'Macan', 'Cayenne'],
  'Renault': ['Clio', 'Megane', 'Taliant', 'Captur', 'Kadjar', 'Austral', 'Arkana', 'Koleos', 'Kangoo', 'Trafic'],
  'Seat': ['Ibiza', 'Arona', 'Leon', 'Ateca', 'Tarraco'],
  'Skoda': ['Fabia', 'Scala', 'Kamiq', 'Karoq', 'Kodiaq', 'Octavia', 'Superb', 'Enyaq'],
  'SsangYong': ['Tivoli', 'Korando', 'Rexton'],
  'Subaru': ['Impreza', 'XV', 'Forester', 'Outback'],
  'Suzuki': ['Swift', 'Vitara', 'S-Cross', 'Jimny'],
  'Tesla': ['Model 3', 'Model Y', 'Model S', 'Model X'],
  'TOGG': ['T10X', 'T10F'],
  'Toyota': ['Aygo X', 'Yaris', 'Corolla', 'Camry', 'C-HR', 'RAV4', 'Highlander', 'Land Cruiser', 'Hilux', 'Proace'],
  'Volkswagen': ['Polo', 'T-Cross', 'Taigo', 'T-Roc', 'Golf', 'Passat', 'Tiguan', 'Touareg', 'ID.3', 'ID.4', 'ID.5', 'Caddy', 'Transporter'],
  'Volvo': ['XC40', 'XC60', 'XC90', 'S60', 'S90', 'V60', 'V90', 'C40', 'EX30', 'EX90']
};

const FUEL_TYPES = [
  { value: 'gasoline', label: 'Benzin', icon: '⛽' },
  { value: 'diesel', label: 'Dizel', icon: '🛢️' },
  { value: 'hybrid', label: 'Hibrit', icon: '🔋⛽' },
  { value: 'electric', label: 'Elektrik', icon: '⚡' },
  { value: 'lpg', label: 'LPG', icon: '💨' },
  { value: 'cng', label: 'CNG', icon: '🌿' }
];

const TRANSMISSION_TYPES = [
  { value: 'manual', label: 'Manuel', icon: '🎮' },
  { value: 'automatic', label: 'Otomatik', icon: '⚙️' },
  { value: 'semi-automatic', label: 'Yarı Otomatik', icon: '🔄' },
  { value: 'cvt', label: 'CVT', icon: '∞' }
];

const ENGINE_SIZES = [
  '1.0', '1.2', '1.3', '1.4', '1.5', '1.6', '1.8', '2.0', '2.2', '2.4', '2.5',
  '2.7', '3.0', '3.2', '3.5', '3.6', '4.0', '4.4', '5.0', '5.5', '6.0', '6.2'
];

const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

interface VehicleOnboardingProps {
  onComplete: () => void;
  onClose: () => void;
}

export default function VehicleOnboarding({ onComplete, onClose }: VehicleOnboardingProps) {
  const [step, setStep] = useState(1);
  const [searchBrand, setSearchBrand] = useState('');
  const [searchModel, setSearchModel] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const [vehicleData, setVehicleData] = useState({
    // Temel Bilgiler
    make: '',
    model: '',
    year: new Date().getFullYear(),
    licensePlate: '',

    // Motor Özellikleri
    fuelType: '',
    transmission: '',
    engineSize: '',
    horsepower: '',
    torque: '',
    cylinders: '',

    // Görünüm & Renk
    color: '',
    bodyType: '',

    // Kilometre & Durum
    mileage: '',
    condition: 'used',

    // OBD & Donanım
    hasOBD: false,
    obdProtocol: '',
    obdDeviceSerial: '',

    // Dokümanlar
    registrationDoc: null as File | null,
    insuranceDoc: null as File | null,
    inspectionDoc: null as File | null,

    // Ek Bilgiler
    vin: '',
    previousOwners: '1',
    serviceHistory: false,
    modifications: '',
    notes: ''
  });

  const filteredBrands = Object.keys(VEHICLE_BRANDS).filter(brand =>
    brand.toLowerCase().includes(searchBrand.toLowerCase())
  );

  const filteredModels = vehicleData.make
    ? VEHICLE_BRANDS[vehicleData.make as keyof typeof VEHICLE_BRANDS]?.filter(model =>
        model.toLowerCase().includes(searchModel.toLowerCase())
      ) || []
    : [];

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  // Smooth scroll to top when step changes
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Auto advance functions with smooth transitions
  const autoAdvanceToStep = (targetStep: number) => {
    setTimeout(() => {
      setStep(targetStep);
    }, 600); // Smooth delay for better UX
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/vehicles/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log('Vehicle added successfully:', result.vehicle);
        onComplete();
      } else {
        console.error('Failed to add vehicle:', result.error);
        alert(result.error || 'Araç eklenirken bir hata oluştu');
      }
    } catch (error) {
      console.error('Error submitting vehicle:', error);
      alert('Araç eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-gradient-to-br from-gray-900 to-black border-2 border-[#E30A17]/30 rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col backdrop-blur-xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#E30A17] to-red-700 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Araç Entegrasyonu</h2>
                <p className="text-sm text-white/80">Aracınızı sisteme kaydedin ve tüm özelliklere erişin</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-white rounded-full"
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-white/60">
              <span>Adım {step}/{totalSteps}</span>
              <span>%{Math.round(progress)} Tamamlandı</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-transparent to-black/20 scroll-smooth">
          <AnimatePresence mode="wait">
            {/* Step 1: Marka ve Model */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#E30A17] to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-red-500/50">
                    <Car className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3 tracking-tight">Araç Markası ve Modeli</h3>
                  <p className="text-gray-300 text-lg">Aracınızın markasını ve modelini seçin</p>
                </div>

                {/* Marka Seçimi */}
                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                    Marka *
                  </label>
                  <div className="relative mb-4">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Marka ara..."
                      value={searchBrand}
                      onChange={(e) => setSearchBrand(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-[#E30A17] focus:outline-none text-white placeholder-gray-500 backdrop-blur-sm transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                    {filteredBrands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => {
                          setVehicleData({ ...vehicleData, make: brand, model: '' });
                          setSearchBrand('');
                        }}
                        className={`p-5 rounded-xl border-2 transition-all font-bold text-sm hover:scale-105 ${
                          vehicleData.make === brand
                            ? 'border-[#E30A17] bg-gradient-to-br from-[#E30A17] to-red-700 text-white shadow-lg shadow-red-500/50 scale-105'
                            : 'border-gray-700 bg-gray-800/30 text-gray-300 hover:border-[#E30A17] hover:bg-gray-800/50 hover:text-white'
                        }`}
                      >
                        <p className="font-semibold text-sm">{brand}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Model Seçimi */}
                {vehicleData.make && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                      Model *
                    </label>
                    <div className="relative mb-4">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Model ara..."
                        value={searchModel}
                        onChange={(e) => setSearchModel(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-[#E30A17] focus:outline-none text-white placeholder-gray-500 backdrop-blur-sm transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                      {filteredModels.map((model) => (
                        <button
                          key={model}
                          onClick={() => setVehicleData({ ...vehicleData, model })}
                          className={`p-4 rounded-xl border-2 transition-all font-bold text-sm hover:scale-105 ${
                            vehicleData.model === model
                              ? 'border-[#E30A17] bg-gradient-to-br from-[#E30A17] to-red-700 text-white shadow-lg shadow-red-500/50 scale-105'
                              : 'border-gray-700 bg-gray-800/30 text-gray-300 hover:border-[#E30A17] hover:bg-gray-800/50 hover:text-white'
                          }`}
                        >
                          <p className="font-semibold">{model}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Yıl ve Plaka */}
                {vehicleData.model && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                        Model Yılı *
                      </label>
                      <select
                        value={vehicleData.year}
                        onChange={(e) => setVehicleData({ ...vehicleData, year: parseInt(e.target.value) })}
                        className="w-full px-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-[#E30A17] focus:outline-none text-white backdrop-blur-sm transition-all"
                      >
                        {YEARS.map((year) => (
                          <option key={year} value={year} className="bg-gray-800">{year}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                        Plaka *
                      </label>
                      <input
                        type="text"
                        placeholder="34 ABC 1234"
                        value={vehicleData.licensePlate}
                        onChange={(e) => {
                          const newPlate = e.target.value.toUpperCase();
                          setVehicleData({ ...vehicleData, licensePlate: newPlate });
                          // Auto-advance when plate is complete (min 7 chars)
                          if (newPlate.length >= 7 && vehicleData.make && vehicleData.model) {
                            autoAdvanceToStep(2);
                          }
                        }}
                        onBlur={(e) => {
                          // Also auto-advance on blur if conditions met
                          if (e.target.value.length >= 7 && vehicleData.make && vehicleData.model && step === 1) {
                            autoAdvanceToStep(2);
                          }
                        }}
                        className="w-full px-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-[#E30A17] focus:outline-none text-white placeholder-gray-500 uppercase backdrop-blur-sm transition-all"
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 2: Motor Özellikleri */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-orange-500/50">
                    <Gauge className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3 tracking-tight">Motor Özellikleri</h3>
                  <p className="text-gray-300 text-lg">Aracınızın teknik özelliklerini girin</p>
                </div>

                {/* Yakıt Tipi */}
                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                    Yakıt Tipi *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {FUEL_TYPES.map((fuel) => (
                      <button
                        key={fuel.value}
                        onClick={() => {
                          setVehicleData({ ...vehicleData, fuelType: fuel.value });
                        }}
                        className={`p-5 rounded-xl border-2 transition-all hover:scale-105 ${
                          vehicleData.fuelType === fuel.value
                            ? 'border-orange-500 bg-gradient-to-br from-orange-500 to-orange-700 text-white shadow-lg shadow-orange-500/50 scale-105'
                            : 'border-gray-700 bg-gray-800/30 text-gray-300 hover:border-orange-500 hover:bg-gray-800/50 hover:text-white'
                        }`}
                      >
                        <div className="text-2xl mb-2">{fuel.icon}</div>
                        <p className="font-bold text-sm">{fuel.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Şanzıman */}
                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                    Şanzıman Tipi *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {TRANSMISSION_TYPES.map((trans) => (
                      <button
                        key={trans.value}
                        onClick={() => {
                          const newData = { ...vehicleData, transmission: trans.value };
                          setVehicleData(newData);
                          // Auto-advance when both fuel and transmission are selected
                          if (newData.fuelType && trans.value && step === 2) {
                            autoAdvanceToStep(3);
                          }
                        }}
                        className={`p-5 rounded-xl border-2 transition-all hover:scale-105 ${
                          vehicleData.transmission === trans.value
                            ? 'border-orange-500 bg-gradient-to-br from-orange-500 to-orange-700 text-white shadow-lg shadow-orange-500/50 scale-105'
                            : 'border-gray-700 bg-gray-800/30 text-gray-300 hover:border-orange-500 hover:bg-gray-800/50 hover:text-white'
                        }`}
                      >
                        <div className="text-2xl mb-2">{trans.icon}</div>
                        <p className="font-bold text-sm">{trans.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Motor Hacmi ve Güç */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                      Motor Hacmi (L)
                    </label>
                    <select
                      value={vehicleData.engineSize}
                      onChange={(e) => setVehicleData({ ...vehicleData, engineSize: e.target.value })}
                      className="w-full px-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-orange-500 focus:outline-none text-white backdrop-blur-sm transition-all"
                    >
                      <option value="" className="bg-gray-800">Seçiniz</option>
                      {ENGINE_SIZES.map((size) => (
                        <option key={size} value={size} className="bg-gray-800">{size}L</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                      Beygir Gücü (HP)
                    </label>
                    <input
                      type="number"
                      placeholder="150"
                      value={vehicleData.horsepower}
                      onChange={(e) => setVehicleData({ ...vehicleData, horsepower: e.target.value })}
                      className="w-full px-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-orange-500 focus:outline-none text-white placeholder-gray-500 backdrop-blur-sm transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                      Tork (Nm)
                    </label>
                    <input
                      type="number"
                      placeholder="250"
                      value={vehicleData.torque}
                      onChange={(e) => setVehicleData({ ...vehicleData, torque: e.target.value })}
                      className="w-full px-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-orange-500 focus:outline-none text-white placeholder-gray-500 backdrop-blur-sm transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                      Silindir Sayısı
                    </label>
                    <select
                      value={vehicleData.cylinders}
                      onChange={(e) => setVehicleData({ ...vehicleData, cylinders: e.target.value })}
                      className="w-full px-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-orange-500 focus:outline-none text-white backdrop-blur-sm transition-all"
                    >
                      <option value="" className="bg-gray-800">Seçiniz</option>
                      <option value="2" className="bg-gray-800">2 Silindir</option>
                      <option value="3" className="bg-gray-800">3 Silindir</option>
                      <option value="4" className="bg-gray-800">4 Silindir</option>
                      <option value="5" className="bg-gray-800">5 Silindir</option>
                      <option value="6" className="bg-gray-800">6 Silindir</option>
                      <option value="8" className="bg-gray-800">8 Silindir</option>
                      <option value="10" className="bg-gray-800">10 Silindir</option>
                      <option value="12" className="bg-gray-800">12 Silindir</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Görünüm & Kilometre */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/50">
                    <Camera className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3 tracking-tight">Görünüm ve Durum</h3>
                  <p className="text-gray-300 text-lg">Aracınızın fiziksel özelliklerini belirtin</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                      Renk
                    </label>
                    <input
                      type="text"
                      placeholder="Beyaz, Siyah, Gri..."
                      value={vehicleData.color}
                      onChange={(e) => setVehicleData({ ...vehicleData, color: e.target.value })}
                      className="w-full px-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 backdrop-blur-sm transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                      Kasa Tipi
                    </label>
                    <select
                      value={vehicleData.bodyType}
                      onChange={(e) => setVehicleData({ ...vehicleData, bodyType: e.target.value })}
                      className="w-full px-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white backdrop-blur-sm transition-all"
                    >
                      <option value="" className="bg-gray-800">Seçiniz</option>
                      <option value="sedan" className="bg-gray-800">Sedan</option>
                      <option value="hatchback" className="bg-gray-800">Hatchback</option>
                      <option value="suv" className="bg-gray-800">SUV</option>
                      <option value="coupe" className="bg-gray-800">Coupe</option>
                      <option value="wagon" className="bg-gray-800">Station Wagon</option>
                      <option value="pickup" className="bg-gray-800">Pick-up</option>
                      <option value="van" className="bg-gray-800">Minivan</option>
                      <option value="convertible" className="bg-gray-800">Cabrio</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                    Kilometre *
                  </label>
                  <input
                    type="number"
                    placeholder="50000"
                    value={vehicleData.mileage}
                    onChange={(e) => {
                      setVehicleData({ ...vehicleData, mileage: e.target.value });
                    }}
                    onBlur={(e) => {
                      // Auto-advance when mileage is entered and valid
                      if (e.target.value && parseInt(e.target.value) > 0 && step === 3) {
                        autoAdvanceToStep(4);
                      }
                    }}
                    className="w-full px-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 backdrop-blur-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                    Araç Durumu
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setVehicleData({ ...vehicleData, condition: 'new' })}
                      className={`p-5 rounded-xl border-2 transition-all hover:scale-105 ${
                        vehicleData.condition === 'new'
                          ? 'border-purple-500 bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-lg shadow-purple-500/50 scale-105'
                          : 'border-gray-700 bg-gray-800/30 text-gray-300 hover:border-purple-500 hover:bg-gray-800/50 hover:text-white'
                      }`}
                    >
                      <p className="font-bold">Sıfır Araç</p>
                    </button>
                    <button
                      onClick={() => setVehicleData({ ...vehicleData, condition: 'used' })}
                      className={`p-5 rounded-xl border-2 transition-all hover:scale-105 ${
                        vehicleData.condition === 'used'
                          ? 'border-purple-500 bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-lg shadow-purple-500/50 scale-105'
                          : 'border-gray-700 bg-gray-800/30 text-gray-300 hover:border-purple-500 hover:bg-gray-800/50 hover:text-white'
                      }`}
                    >
                      <p className="font-bold">İkinci El</p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                    Önceki Sahip Sayısı
                  </label>
                  <select
                    value={vehicleData.previousOwners}
                    onChange={(e) => setVehicleData({ ...vehicleData, previousOwners: e.target.value })}
                    className="w-full px-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white backdrop-blur-sm transition-all"
                  >
                    <option value="1" className="bg-gray-800">1. Sahibinden</option>
                    <option value="2" className="bg-gray-800">2. Sahibinden</option>
                    <option value="3" className="bg-gray-800">3. Sahibinden</option>
                    <option value="4" className="bg-gray-800">4+ Sahibinden</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Step 4: OBD Entegrasyonu */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/50">
                    <Bluetooth className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3 tracking-tight">OBD-II Cihazı</h3>
                  <p className="text-gray-300 text-lg">Araç telemetri sisteminizi bağlayın</p>
                </div>

                <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-100">
                      <p className="font-bold mb-1 text-white">OBD-II Cihazı Nedir?</p>
                      <p className="text-gray-300">
                        OBD-II cihazı, aracınızın performansını gerçek zamanlı izlemenizi sağlar.
                        Motor devri, yakıt tüketimi, hız ve daha fazlasını anlık olarak takip edebilirsiniz.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-3 cursor-pointer p-4 bg-gray-800/30 rounded-xl border-2 border-gray-700 hover:border-green-500 transition-all">
                    <input
                      type="checkbox"
                      checked={vehicleData.hasOBD}
                      onChange={(e) => setVehicleData({ ...vehicleData, hasOBD: e.target.checked })}
                      className="w-5 h-5 text-green-600 rounded"
                    />
                    <span className="font-bold text-white">OBD-II cihazım var</span>
                  </label>
                </div>

                {vehicleData.hasOBD && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                        OBD Protokolü
                      </label>
                      <select
                        value={vehicleData.obdProtocol}
                        onChange={(e) => setVehicleData({ ...vehicleData, obdProtocol: e.target.value })}
                        className="w-full px-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-green-500 focus:outline-none text-white backdrop-blur-sm transition-all"
                      >
                        <option value="" className="bg-gray-800">Otomatik Algıla</option>
                        <option value="ISO 15765-4 (CAN)" className="bg-gray-800">ISO 15765-4 (CAN)</option>
                        <option value="ISO 14230-4 (KWP2000)" className="bg-gray-800">ISO 14230-4 (KWP2000)</option>
                        <option value="ISO 9141-2" className="bg-gray-800">ISO 9141-2</option>
                        <option value="J1850 PWM" className="bg-gray-800">J1850 PWM</option>
                        <option value="J1850 VPW" className="bg-gray-800">J1850 VPW</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                        Cihaz Seri Numarası
                      </label>
                      <input
                        type="text"
                        placeholder="OBDII-XXXX-XXXX"
                        value={vehicleData.obdDeviceSerial}
                        onChange={(e) => setVehicleData({ ...vehicleData, obdDeviceSerial: e.target.value })}
                        className="w-full px-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-green-500 focus:outline-none text-white placeholder-gray-500 backdrop-blur-sm transition-all"
                      />
                    </div>

                    <div className="bg-green-500/10 border-2 border-green-500/30 rounded-xl p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-bold text-white">Bağlantı Hazır</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">
                        OBD cihazınız otomatik olarak algılanacak ve bağlanacaktır.
                      </p>
                    </div>

                    {/* Auto Continue Button for OBD users */}
                    <div className="text-center pt-4">
                      <button
                        onClick={() => autoAdvanceToStep(5)}
                        className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-green-500 to-green-700 text-white hover:shadow-lg hover:shadow-green-500/50 hover:scale-105 transition-all flex items-center gap-2 mx-auto"
                      >
                        Devam Et
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Continue Button for non-OBD users */}
                {!vehicleData.hasOBD && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center pt-6"
                  >
                    <button
                      onClick={() => autoAdvanceToStep(5)}
                      className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-green-500 to-green-700 text-white hover:shadow-lg hover:shadow-green-500/50 hover:scale-105 transition-all flex items-center gap-2 mx-auto"
                    >
                      Devam Et
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <p className="text-xs text-gray-400 mt-2">OBD cihazınızı daha sonra da ekleyebilirsiniz</p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 5: Dokümanlar */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-yellow-500/50">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3 tracking-tight">Dokümanlar</h3>
                  <p className="text-gray-300 text-lg">Araç belgelerinizi yükleyin (isteğe bağlı)</p>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'registrationDoc', label: 'Ruhsat Fotokopisi', icon: FileText },
                    { key: 'insuranceDoc', label: 'Sigorta Poliçesi', icon: Shield },
                    { key: 'inspectionDoc', label: 'Muayene Belgesi', icon: CheckCircle }
                  ].map((doc) => (
                    <div key={doc.key} className="border-2 border-dashed border-gray-700 bg-gray-800/30 rounded-xl p-6 hover:border-yellow-500 hover:bg-gray-800/50 transition-all backdrop-blur-sm">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setVehicleData({ ...vehicleData, [doc.key]: file });
                            }
                          }}
                          className="hidden"
                        />
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-lg flex items-center justify-center shadow-lg">
                            <doc.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-white">{doc.label}</p>
                            <p className="text-sm text-gray-400">
                              {vehicleData[doc.key as keyof typeof vehicleData] instanceof File
                                ? (vehicleData[doc.key as keyof typeof vehicleData] as File).name
                                : 'Tıklayarak dosya yükleyin'}
                            </p>
                          </div>
                          <Upload className="w-5 h-5 text-gray-400" />
                        </div>
                      </label>
                    </div>
                  ))}
                </div>

                {/* Continue Button for Documents Step */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center pt-6"
                >
                  <button
                    onClick={() => autoAdvanceToStep(6)}
                    className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-700 text-white hover:shadow-lg hover:shadow-yellow-500/50 hover:scale-105 transition-all flex items-center gap-2 mx-auto"
                  >
                    Son Adım
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <p className="text-xs text-gray-400 mt-2">Belgeleri daha sonra da yükleyebilirsiniz</p>
                </motion.div>
              </motion.div>
            )}

            {/* Step 6: Ek Bilgiler */}
            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/50">
                    <Wrench className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3 tracking-tight">Ek Bilgiler</h3>
                  <p className="text-gray-300 text-lg">Son kontroller ve ek detaylar</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                    Şasi Numarası (VIN)
                  </label>
                  <input
                    type="text"
                    placeholder="17 haneli VIN numarası"
                    maxLength={17}
                    value={vehicleData.vin}
                    onChange={(e) => setVehicleData({ ...vehicleData, vin: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-indigo-500 focus:outline-none text-white placeholder-gray-500 uppercase font-mono backdrop-blur-sm transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-3 cursor-pointer p-4 bg-gray-800/30 rounded-xl border-2 border-gray-700 hover:border-indigo-500 transition-all">
                    <input
                      type="checkbox"
                      checked={vehicleData.serviceHistory}
                      onChange={(e) => setVehicleData({ ...vehicleData, serviceHistory: e.target.checked })}
                      className="w-5 h-5 text-indigo-600 rounded"
                    />
                    <span className="font-bold text-white">Bakım geçmişi mevcut</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                    Modifikasyonlar
                  </label>
                  <textarea
                    placeholder="Araçta yapılan değişiklikler veya eklemeler..."
                    value={vehicleData.modifications}
                    onChange={(e) => setVehicleData({ ...vehicleData, modifications: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-indigo-500 focus:outline-none text-white placeholder-gray-500 resize-none backdrop-blur-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                    Notlar
                  </label>
                  <textarea
                    placeholder="Ek notlar veya özel durumlar..."
                    value={vehicleData.notes}
                    onChange={(e) => setVehicleData({ ...vehicleData, notes: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-indigo-500 focus:outline-none text-white placeholder-gray-500 resize-none backdrop-blur-sm transition-all"
                  />
                </div>

                {/* Özet */}
                <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-2 border-indigo-500/30 rounded-xl p-6 backdrop-blur-sm">
                  <h4 className="font-black text-lg text-white mb-4">Araç Özeti</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-400">Marka & Model</p>
                      <p className="font-bold text-white">{vehicleData.make} {vehicleData.model}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Yıl & Plaka</p>
                      <p className="font-bold text-white">{vehicleData.year} • {vehicleData.licensePlate}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Yakıt & Şanzıman</p>
                      <p className="font-bold text-white">{vehicleData.fuelType} • {vehicleData.transmission}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">OBD Cihazı</p>
                      <p className="font-bold text-white">{vehicleData.hasOBD ? 'Aktif' : 'Yok'}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 p-6 bg-gradient-to-r from-gray-900 to-black">
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                step === 1
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-800 border-2 border-gray-700 text-white hover:border-[#E30A17] hover:bg-gray-700'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Geri
            </button>

            {step < totalSteps ? (
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && (!vehicleData.make || !vehicleData.model || !vehicleData.licensePlate)) ||
                  (step === 2 && (!vehicleData.fuelType || !vehicleData.transmission)) ||
                  (step === 3 && !vehicleData.mileage)
                }
                className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                  (step === 1 && (!vehicleData.make || !vehicleData.model || !vehicleData.licensePlate)) ||
                  (step === 2 && (!vehicleData.fuelType || !vehicleData.transmission)) ||
                  (step === 3 && !vehicleData.mileage)
                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#E30A17] to-red-700 text-white hover:shadow-lg hover:shadow-red-500/50 hover:scale-105'
                }`}
              >
                İleri
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                  isSubmitting
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-green-700 hover:shadow-lg hover:shadow-green-500/50 hover:scale-105'
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Tamamla ve Kaydet
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
