'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car, Upload, CheckCircle, AlertCircle, Bluetooth, Wifi, Radio,
  FileText, Camera, Gauge, Wrench, Calendar, MapPin, CreditCard,
  Shield, ChevronRight, ChevronLeft, X, Search, Filter, Info,
  Zap, Loader, Settings, Cpu
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

interface VehicleOnboardingProps {
  onComplete: () => void;
  onClose: () => void;
}

export default function VehicleOnboardingNew({ onComplete, onClose }: VehicleOnboardingProps) {
  const [step, setStep] = useState(0); // 0 = OBD scan choice
  const [searchBrand, setSearchBrand] = useState('');
  const [searchModel, setSearchModel] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // OBD Scanning states
  const [useOBDScan, setUseOBDScan] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState('');
  const [obdDetected, setObdDetected] = useState(false);

  const [vehicleData, setVehicleData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    licensePlate: '',
    fuelType: '',
    transmission: '',
    engineSize: '',
    horsepower: '',
    color: '',
    mileage: '',
    hasOBD: false,
    obdProtocol: '',
    obdDeviceSerial: '',
    vin: ''
  });

  const filteredBrands = Object.keys(VEHICLE_BRANDS).filter(brand =>
    brand.toLowerCase().includes(searchBrand.toLowerCase())
  );

  const filteredModels = vehicleData.make
    ? VEHICLE_BRANDS[vehicleData.make as keyof typeof VEHICLE_BRANDS]?.filter(model =>
        model.toLowerCase().includes(searchModel.toLowerCase())
      ) || []
    : [];

  const totalSteps = 4; // Reduced to essential steps
  const progress = step === 0 ? 0 : ((step) / totalSteps) * 100;

  // OBD scanning simulation
  const startOBDScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanStatus('OBD-II cihazı aranıyor...');

    // Simulate scanning process
    const steps = [
      { progress: 20, status: 'Bluetooth bağlantısı kuruluyor...', delay: 800 },
      { progress: 40, status: 'OBD-II protokolü algılanıyor...', delay: 1000 },
      { progress: 60, status: 'Araç ECU\'su ile iletişim kuruluyor...', delay: 1200 },
      { progress: 80, status: 'VIN numarası okunuyor...', delay: 1000 },
      { progress: 100, status: 'Araç bilgileri alınıyor...', delay: 800 }
    ];

    for (const stepData of steps) {
      await new Promise(resolve => setTimeout(resolve, stepData.delay));
      setScanProgress(stepData.progress);
      setScanStatus(stepData.status);
    }

    // Simulate successful detection
    try {
      const response = await fetch('/api/obd/detect-vehicle');
      const data = await response.json();

      if (data.success) {
        setObdDetected(true);
        setVehicleData({
          ...vehicleData,
          make: data.vehicle.make,
          model: data.vehicle.model,
          year: data.vehicle.year,
          vin: data.vehicle.vin,
          engineSize: data.vehicle.engineSize,
          horsepower: data.vehicle.horsepower,
          fuelType: data.vehicle.fuelType,
          transmission: data.vehicle.transmission,
          hasOBD: true,
          obdProtocol: data.vehicle.obdProtocol,
          obdDeviceSerial: data.device.serial
        });
        setScanStatus('Araç başarıyla tanındı!');

        // Auto advance to license plate step
        setTimeout(() => {
          setStep(2);
          setIsScanning(false);
        }, 1500);
      } else {
        throw new Error('OBD detection failed');
      }
    } catch (error) {
      // Fallback to manual entry
      setScanStatus('OBD cihazı bulunamadı. Manuel giriş yapabilirsiniz.');
      setObdDetected(false);
      setTimeout(() => {
        setIsScanning(false);
        setStep(1); // Go to manual entry
      }, 2000);
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
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
        onComplete();
      } else {
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-gradient-to-br from-gray-900 to-black border-2 border-[#E30A17]/30 rounded-3xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col backdrop-blur-xl overflow-hidden"
      >
        {/* Header - Fixed */}
        <div className="bg-gradient-to-r from-[#E30A17] to-red-700 text-white p-5 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Araç Entegrasyonu</h2>
                <p className="text-xs text-white/80">Hızlı ve kolay araç kaydı</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          {step > 0 && (
            <div className="relative">
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-white rounded-full"
                />
              </div>
              <div className="flex justify-between mt-1.5 text-xs text-white/60">
                <span>Adım {step}/{totalSteps}</span>
                <span>%{Math.round(progress)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Content - Scrollable with fixed height */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <AnimatePresence mode="wait">
            {/* Step 0: OBD Scan Choice */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full flex flex-col items-center justify-center space-y-6"
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-blue-500/50">
                    <Bluetooth className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-2">Araç Tanıma Yöntemi</h3>
                  <p className="text-gray-300">OBD-II cihazınız ile otomatik tanıma veya manuel giriş</p>
                </div>

                {isScanning ? (
                  <div className="w-full max-w-md">
                    <div className="bg-gray-800/50 border-2 border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
                      <div className="flex items-center justify-center mb-4">
                        <div className="relative">
                          <Loader className="w-12 h-12 text-blue-400 animate-spin" />
                          <Bluetooth className="w-6 h-6 text-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                      <p className="text-center text-white font-bold mb-2">{scanStatus}</p>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${scanProgress}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                        />
                      </div>
                      <p className="text-center text-gray-400 text-sm mt-2">%{scanProgress}</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startOBDScan}
                      className="p-8 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all border-2 border-blue-400"
                    >
                      <Zap className="w-12 h-12 mx-auto mb-4" />
                      <h4 className="font-bold text-lg mb-2">Otomatik Tanıma</h4>
                      <p className="text-sm text-blue-100">OBD-II cihazı ile hızlı tarama</p>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setStep(1)}
                      className="p-8 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 text-white shadow-xl hover:shadow-2xl transition-all border-2 border-gray-600 hover:border-[#E30A17]"
                    >
                      <Settings className="w-12 h-12 mx-auto mb-4" />
                      <h4 className="font-bold text-lg mb-2">Manuel Giriş</h4>
                      <p className="text-sm text-gray-300">Bilgileri kendiniz girin</p>
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 1: Marka ve Model */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#E30A17] to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-2xl">
                    <Car className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-1">Marka ve Model</h3>
                  <p className="text-gray-300 text-sm">Aracınızı seçin</p>
                </div>

                {/* Marka */}
                <div>
                  <label className="block text-xs font-bold text-white mb-2 uppercase tracking-wider">Marka *</label>
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Marka ara..."
                      value={searchBrand}
                      onChange={(e) => setSearchBrand(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-[#E30A17] focus:outline-none text-white placeholder-gray-500"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-2">
                    {filteredBrands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => {
                          setVehicleData({ ...vehicleData, make: brand, model: '' });
                          setSearchBrand('');
                        }}
                        className={`p-3 rounded-lg border-2 transition-all text-xs font-bold ${
                          vehicleData.make === brand
                            ? 'border-[#E30A17] bg-[#E30A17] text-white scale-105'
                            : 'border-gray-700 bg-gray-800/30 text-gray-300 hover:border-[#E30A17]'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Model */}
                {vehicleData.make && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <label className="block text-xs font-bold text-white mb-2 uppercase tracking-wider">Model *</label>
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Model ara..."
                        value={searchModel}
                        onChange={(e) => setSearchModel(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-[#E30A17] focus:outline-none text-white placeholder-gray-500"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto pr-2">
                      {filteredModels.map((model) => (
                        <button
                          key={model}
                          onClick={() => {
                            setVehicleData({ ...vehicleData, model });
                            setTimeout(() => setStep(2), 400);
                          }}
                          className={`p-3 rounded-lg border-2 transition-all text-xs font-bold ${
                            vehicleData.model === model
                              ? 'border-[#E30A17] bg-[#E30A17] text-white scale-105'
                              : 'border-gray-700 bg-gray-800/30 text-gray-300 hover:border-[#E30A17]'
                          }`}
                        >
                          {model}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 2: Plaka ve Yıl */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-1">Plaka ve Yıl</h3>
                  <p className="text-gray-300 text-sm">Kayıt bilgilerini girin</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-white mb-2 uppercase">Plaka *</label>
                    <input
                      type="text"
                      placeholder="34 ABC 1234"
                      value={vehicleData.licensePlate}
                      onChange={(e) => setVehicleData({ ...vehicleData, licensePlate: e.target.value.toUpperCase() })}
                      className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white mb-2 uppercase">Yıl *</label>
                    <input
                      type="number"
                      value={vehicleData.year}
                      onChange={(e) => setVehicleData({ ...vehicleData, year: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Motor Özellikleri */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Gauge className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-1">Motor Özellikleri</h3>
                  <p className="text-gray-300 text-sm">Teknik detaylar</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-2 uppercase">Yakıt Tipi *</label>
                  <div className="grid grid-cols-3 gap-2">
                    {FUEL_TYPES.map((fuel) => (
                      <button
                        key={fuel.value}
                        onClick={() => setVehicleData({ ...vehicleData, fuelType: fuel.value })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          vehicleData.fuelType === fuel.value
                            ? 'border-orange-500 bg-orange-500 text-white'
                            : 'border-gray-700 bg-gray-800/30 text-gray-300 hover:border-orange-500'
                        }`}
                      >
                        <div className="text-2xl mb-1">{fuel.icon}</div>
                        <p className="text-xs font-bold">{fuel.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-2 uppercase">Şanzıman *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {TRANSMISSION_TYPES.map((trans) => (
                      <button
                        key={trans.value}
                        onClick={() => setVehicleData({ ...vehicleData, transmission: trans.value })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          vehicleData.transmission === trans.value
                            ? 'border-orange-500 bg-orange-500 text-white'
                            : 'border-gray-700 bg-gray-800/30 text-gray-300 hover:border-orange-500'
                        }`}
                      >
                        <div className="text-2xl mb-1">{trans.icon}</div>
                        <p className="text-xs font-bold">{trans.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Kilometre */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Gauge className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-1">Son Adım</h3>
                  <p className="text-gray-300 text-sm">Kilometre ve renk bilgisi</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-2 uppercase">Kilometre *</label>
                  <input
                    type="number"
                    placeholder="50000"
                    value={vehicleData.mileage}
                    onChange={(e) => setVehicleData({ ...vehicleData, mileage: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-green-500 focus:outline-none text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-2 uppercase">Renk</label>
                  <input
                    type="text"
                    placeholder="Beyaz, Siyah, Gri..."
                    value={vehicleData.color}
                    onChange={(e) => setVehicleData({ ...vehicleData, color: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-green-500 focus:outline-none text-white"
                  />
                </div>

                {/* Summary */}
                <div className="bg-green-500/10 border-2 border-green-500/30 rounded-xl p-4">
                  <h4 className="font-bold text-white mb-3 text-sm">Araç Özeti</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-gray-400">Marka & Model</p>
                      <p className="font-bold text-white">{vehicleData.make} {vehicleData.model}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Yıl & Plaka</p>
                      <p className="font-bold text-white">{vehicleData.year} • {vehicleData.licensePlate}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer - Fixed */}
        <div className="border-t border-gray-800 p-4 bg-gray-900/90 flex-shrink-0">
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={step === 0 || isScanning}
              className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 text-sm transition-all ${
                step === 0 || isScanning
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-800 border-2 border-gray-700 text-white hover:border-[#E30A17]'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Geri
            </button>

            {step < totalSteps && step > 0 ? (
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && (!vehicleData.make || !vehicleData.model)) ||
                  (step === 2 && !vehicleData.licensePlate) ||
                  (step === 3 && (!vehicleData.fuelType || !vehicleData.transmission))
                }
                className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 text-sm transition-all ${
                  (step === 1 && (!vehicleData.make || !vehicleData.model)) ||
                  (step === 2 && !vehicleData.licensePlate) ||
                  (step === 3 && (!vehicleData.fuelType || !vehicleData.transmission))
                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#E30A17] to-red-700 text-white hover:scale-105'
                }`}
              >
                İleri
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : step === totalSteps ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !vehicleData.mileage}
                className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 text-sm transition-all ${
                  isSubmitting || !vehicleData.mileage
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-green-700 hover:scale-105'
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Kaydet
                  </>
                )}
              </button>
            ) : null}
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .scroll-smooth {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        div::-webkit-scrollbar {
          width: 6px;
        }

        div::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }

        div::-webkit-scrollbar-thumb {
          background: rgba(227, 10, 23, 0.5);
          border-radius: 10px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: rgba(227, 10, 23, 0.7);
        }
      `}</style>
    </div>
  );
}
