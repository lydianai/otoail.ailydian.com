'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Camera,
  Edit3,
  Save,
  Award,
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Car,
  Star,
  Crown,
  Zap,
  Shield,
  Heart,
  Clock,
  BarChart3,
  Settings,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Upload,
  Check,
  X,
  ChevronRight,
  Flame,
  Medal,
  Gift
} from 'lucide-react';

// ==================== TYPES ====================

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  joinDate: Date;
  bio: string;
  subscription: 'FREE' | 'PREMIUM' | 'ENTERPRISE';
  verified: boolean;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  progress: number;
  maxProgress: number;
  earned: boolean;
  earnedDate?: Date;
  points: number;
}

interface DrivingStats {
  totalDistance: number;
  totalDuration: number;
  totalTrips: number;
  avgScore: number;
  rank: string;
  level: number;
  xp: number;
  nextLevelXP: number;
  streak: number;
  bestScore: number;
  fuelSaved: number;
  co2Reduced: number;
}

interface Vehicle {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  image: string;
  isPrimary: boolean;
}

// ==================== MOCK DATA ====================

const mockProfile: UserProfile = {
  id: '1',
  name: 'Ahmet Yılmaz',
  email: 'ahmet.yilmaz@example.com',
  phone: '+90 532 123 4567',
  avatar: 'https://i.pravatar.cc/300?img=12',
  location: 'İstanbul, Türkiye',
  joinDate: new Date('2024-01-15'),
  bio: 'Güvenli sürüş tutkunuyum. Her gün daha iyi bir sürücü olmak için çalışıyorum.',
  subscription: 'PREMIUM',
  verified: true
};

const mockStats: DrivingStats = {
  totalDistance: 12450,
  totalDuration: 245,
  totalTrips: 342,
  avgScore: 87,
  rank: 'EXPERT',
  level: 24,
  xp: 8450,
  nextLevelXP: 10000,
  streak: 15,
  bestScore: 98,
  fuelSaved: 145.8,
  co2Reduced: 342.5
};

const mockAchievements: Achievement[] = [
  {
    id: '1',
    name: 'İlk Sürüş',
    description: 'İlk sürüşünüzü tamamladınız',
    icon: '🚗',
    rarity: 'COMMON',
    progress: 1,
    maxProgress: 1,
    earned: true,
    earnedDate: new Date('2024-01-15'),
    points: 100
  },
  {
    id: '2',
    name: 'Yakıt Tasarruf Ustası',
    description: '100 litre yakıt tasarrufu yapın',
    icon: '⛽',
    rarity: 'RARE',
    progress: 145,
    maxProgress: 100,
    earned: true,
    earnedDate: new Date('2024-03-20'),
    points: 500
  },
  {
    id: '3',
    name: 'Güvenli Sürüş Şampiyonu',
    description: '30 gün üst üste 90+ puan alın',
    icon: '🏆',
    rarity: 'EPIC',
    progress: 15,
    maxProgress: 30,
    earned: false,
    points: 1000
  },
  {
    id: '4',
    name: 'Efsane Sürücü',
    description: '100.000 km güvenle sürün',
    icon: '👑',
    rarity: 'LEGENDARY',
    progress: 12450,
    maxProgress: 100000,
    earned: false,
    points: 5000
  },
  {
    id: '5',
    name: 'Yeşil Sürücü',
    description: '500 kg CO2 salınımını önleyin',
    icon: '🌱',
    rarity: 'EPIC',
    progress: 342,
    maxProgress: 500,
    earned: false,
    points: 1000
  },
  {
    id: '6',
    name: 'Ateş Çizgisi',
    description: '7 gün üst üste sürüş yapın',
    icon: '🔥',
    rarity: 'RARE',
    progress: 7,
    maxProgress: 7,
    earned: true,
    earnedDate: new Date('2024-02-10'),
    points: 300
  }
];

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Benim Arabam',
    make: 'BMW',
    model: '320i',
    year: 2021,
    licensePlate: '34 ABC 123',
    image: '🚗',
    isPrimary: true
  },
  {
    id: '2',
    name: 'İş Aracı',
    make: 'Mercedes',
    model: 'Sprinter',
    year: 2022,
    licensePlate: '34 XYZ 789',
    image: '🚐',
    isPrimary: false
  }
];

// ==================== COMPONENT ====================

export default function ProfilePanel() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [stats, setStats] = useState<DrivingStats>(mockStats);
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'stats' | 'achievements' | 'vehicles'>('overview');
  const [editedProfile, setEditedProfile] = useState<UserProfile>(mockProfile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile({ ...editedProfile, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'COMMON': return 'from-gray-500 to-gray-600';
      case 'RARE': return 'from-blue-500 to-blue-600';
      case 'EPIC': return 'from-purple-500 to-purple-600';
      case 'LEGENDARY': return 'from-yellow-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'BEGINNER': return 'text-gray-400';
      case 'INTERMEDIATE': return 'text-green-400';
      case 'ADVANCED': return 'text-blue-400';
      case 'EXPERT': return 'text-purple-400';
      case 'MASTER': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getRankIcon = (rank: string) => {
    switch (rank) {
      case 'BEGINNER': return <Shield className="w-6 h-6" />;
      case 'INTERMEDIATE': return <Star className="w-6 h-6" />;
      case 'ADVANCED': return <Award className="w-6 h-6" />;
      case 'EXPERT': return <Trophy className="w-6 h-6" />;
      case 'MASTER': return <Crown className="w-6 h-6" />;
      default: return <Shield className="w-6 h-6" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"
          >
            <User className="w-6 h-6" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Profilim
            </h1>
            <p className="text-sm text-gray-400">Kişisel bilgileriniz ve istatistikleriniz</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
            isEditing
              ? 'bg-green-500/20 text-green-400'
              : 'bg-blue-500/20 text-blue-400'
          }`}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4" />
              Kaydet
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4" />
              Düzenle
            </>
          )}
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'overview' as const, name: 'Genel Bakış', icon: User },
          { id: 'stats' as const, name: 'İstatistikler', icon: BarChart3 },
          { id: 'achievements' as const, name: 'Başarılar', icon: Trophy },
          { id: 'vehicles' as const, name: 'Araçlarım', icon: Car }
        ].map(tab => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-3 rounded-xl font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
              selectedTab === tab.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.name}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          {selectedTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Profile Card */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/30">
                <div className="flex items-start gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-purple-500/50 cursor-pointer"
                      onClick={() => isEditing && fileInputRef.current?.click()}
                    >
                      <img
                        src={isEditing ? editedProfile.avatar : profile.avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                      {isEditing && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Camera className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </motion.div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    {profile.verified && (
                      <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-2">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editedProfile.name}
                          onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white"
                          placeholder="İsim"
                        />
                        <input
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white"
                          placeholder="E-posta"
                        />
                        <input
                          type="tel"
                          value={editedProfile.phone}
                          onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white"
                          placeholder="Telefon"
                        />
                        <input
                          type="text"
                          value={editedProfile.location}
                          onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white"
                          placeholder="Konum"
                        />
                        <textarea
                          value={editedProfile.bio}
                          onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white resize-none"
                          placeholder="Hakkımda"
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCancelEdit}
                            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg font-medium flex items-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            İptal
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-3xl font-bold">{profile.name}</h2>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            profile.subscription === 'ENTERPRISE' ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                            profile.subscription === 'PREMIUM' ? 'bg-gradient-to-r from-purple-500 to-blue-600' :
                            'bg-gray-700'
                          }`}>
                            {profile.subscription}
                          </span>
                        </div>
                        <p className="text-gray-400 mb-4">{profile.bio}</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span>{profile.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{profile.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{profile.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>Katılım: {profile.joinDate.toLocaleDateString('tr-TR')}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Toplam Mesafe', value: `${stats.totalDistance.toLocaleString('tr-TR')} km`, icon: Target, color: 'blue' },
                  { label: 'Sürüş Sayısı', value: stats.totalTrips.toString(), icon: Car, color: 'purple' },
                  { label: 'Ortalama Puan', value: stats.avgScore.toString(), icon: Star, color: 'yellow' },
                  { label: 'Seri', value: `${stats.streak} gün`, icon: Flame, color: 'orange' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl bg-gradient-to-br from-${stat.color}-500/10 to-${stat.color}-600/10 border border-${stat.color}-500/30`}
                  >
                    <stat.icon className={`w-8 h-8 text-${stat.color}-400 mb-2`} />
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Level Progress */}
              <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl p-6 border border-purple-500/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl ${getRankColor(stats.rank)}`}>
                      {getRankIcon(stats.rank)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Seviye {stats.level}</h3>
                      <p className="text-sm text-gray-400">{stats.rank} Sürücü</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{stats.xp.toLocaleString('tr-TR')}</div>
                    <div className="text-sm text-gray-400">/ {stats.nextLevelXP.toLocaleString('tr-TR')} XP</div>
                  </div>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(stats.xp / stats.nextLevelXP) * 100}%` }}
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-600"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Toplam Mesafe', value: `${stats.totalDistance.toLocaleString('tr-TR')} km`, icon: Target, color: 'blue' },
                  { label: 'Toplam Süre', value: `${stats.totalDuration} saat`, icon: Clock, color: 'purple' },
                  { label: 'Toplam Sürüş', value: stats.totalTrips.toString(), icon: Car, color: 'green' },
                  { label: 'En İyi Puan', value: stats.bestScore.toString(), icon: Star, color: 'yellow' },
                  { label: 'Yakıt Tasarrufu', value: `${stats.fuelSaved.toFixed(1)} L`, icon: Zap, color: 'orange' },
                  { label: 'CO2 Azaltımı', value: `${stats.co2Reduced.toFixed(1)} kg`, icon: Heart, color: 'red' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-gray-800/50 border border-gray-700/30"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold mb-2">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </div>
                      <stat.icon className={`w-12 h-12 text-${stat.color}-400`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {selectedTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl border ${
                    achievement.earned
                      ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)}/10 border-${achievement.rarity.toLowerCase()}-500/30`
                      : 'bg-gray-800/30 border-gray-700/30 grayscale opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold">{achievement.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getRarityColor(achievement.rarity)}`}>
                          {achievement.rarity}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-3">{achievement.description}</p>

                      {!achievement.earned && (
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">İlerleme</span>
                            <span className="font-semibold">{achievement.progress} / {achievement.maxProgress}</span>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${getRarityColor(achievement.rarity)}`}
                              style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Gift className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 font-bold">+{achievement.points} XP</span>
                        </div>
                        {achievement.earned && achievement.earnedDate && (
                          <div className="text-sm text-gray-400">
                            {achievement.earnedDate.toLocaleDateString('tr-TR')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {selectedTab === 'vehicles' && (
            <motion.div
              key="vehicles"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {vehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl border ${
                    vehicle.isPrimary
                      ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30'
                      : 'bg-gray-800/50 border-gray-700/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-6xl">{vehicle.image}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold">{vehicle.name}</h3>
                        {vehicle.isPrimary && (
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full font-bold">
                            Birincil
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 mb-2">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-3 py-1 bg-gray-700 rounded-lg font-mono">{vehicle.licensePlate}</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg font-medium"
                    >
                      Düzenle
                    </motion.button>
                  </div>
                </motion.div>
              ))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-6 rounded-xl border-2 border-dashed border-gray-700 text-gray-400 hover:border-blue-500 hover:text-blue-400 transition-all flex items-center justify-center gap-2"
              >
                <Car className="w-6 h-6" />
                Yeni Araç Ekle
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
