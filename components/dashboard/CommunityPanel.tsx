'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Trophy,
  TrendingUp,
  Crown,
  Star,
  Award,
  Target,
  MapPin,
  MessageCircle,
  Heart,
  Share2,
  Filter,
  Search,
  Medal,
  Flame,
  Zap,
  ThumbsUp,
  Send,
  Image as ImageIcon,
  Play,
  Calendar,
  Clock,
  Flag,
  UserPlus,
  UserCheck,
  MoreHorizontal
} from 'lucide-react';

// ==================== TYPES ====================

interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  score: number;
  level: number;
  badges: number;
  trend: 'up' | 'down' | 'same';
  rankChange: number;
  location: string;
  isFollowing: boolean;
}

interface CommunityPost {
  id: string;
  user: {
    name: string;
    avatar: string;
    level: number;
    verified: boolean;
  };
  timestamp: Date;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  tags: string[];
}

interface Challenge {
  id: string;
  name: string;
  description: string;
  icon: string;
  reward: number;
  participants: number;
  endsIn: string;
  difficulty: 'easy' | 'medium' | 'hard';
  progress?: number;
  maxProgress?: number;
}

// ==================== MOCK DATA ====================

const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: '1',
    name: 'Mehmet Öztürk',
    avatar: 'https://i.pravatar.cc/300?img=1',
    score: 9850,
    level: 42,
    badges: 28,
    trend: 'same',
    rankChange: 0,
    location: 'İstanbul',
    isFollowing: false
  },
  {
    rank: 2,
    userId: '2',
    name: 'Ayşe Demir',
    avatar: 'https://i.pravatar.cc/300?img=5',
    score: 9720,
    level: 40,
    badges: 25,
    trend: 'up',
    rankChange: 2,
    location: 'Ankara',
    isFollowing: true
  },
  {
    rank: 3,
    userId: '3',
    name: 'Can Yılmaz',
    avatar: 'https://i.pravatar.cc/300?img=3',
    score: 9680,
    level: 39,
    badges: 24,
    trend: 'down',
    rankChange: -1,
    location: 'İzmir',
    isFollowing: false
  },
  {
    rank: 4,
    userId: '4',
    name: 'Zeynep Kaya',
    avatar: 'https://i.pravatar.cc/300?img=9',
    score: 9450,
    level: 38,
    badges: 23,
    trend: 'up',
    rankChange: 1,
    location: 'Antalya',
    isFollowing: true
  },
  {
    rank: 5,
    userId: '5',
    name: 'Ahmet Şahin',
    avatar: 'https://i.pravatar.cc/300?img=12',
    score: 8950,
    level: 35,
    badges: 21,
    trend: 'same',
    rankChange: 0,
    location: 'Bursa',
    isFollowing: false
  },
  {
    rank: 42,
    userId: 'you',
    name: 'Sen',
    avatar: 'https://i.pravatar.cc/300?img=15',
    score: 8200,
    level: 24,
    badges: 15,
    trend: 'up',
    rankChange: 3,
    location: 'İstanbul',
    isFollowing: false
  }
];

const mockPosts: CommunityPost[] = [
  {
    id: '1',
    user: {
      name: 'Mehmet Öztürk',
      avatar: 'https://i.pravatar.cc/300?img=1',
      level: 42,
      verified: true
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    content: 'Bugün 500 km yaptım ve ortalama 95 puan aldım! Yakıt tüketimi de sadece 6.2L/100km oldu. Eco-driving ipuçlarımı paylaşmak isterim 🌱',
    likes: 142,
    comments: 23,
    shares: 8,
    isLiked: false,
    tags: ['eco-driving', 'yakıt-tasarrufu']
  },
  {
    id: '2',
    user: {
      name: 'Ayşe Demir',
      avatar: 'https://i.pravatar.cc/300?img=5',
      level: 40,
      verified: true
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    content: 'Yeni OBD cihazımı taktım, gerçek zamanlı veriler inanılmaz! Motor sıcaklığı ve yakıt basıncını anlık görmek çok faydalı.',
    likes: 89,
    comments: 15,
    shares: 4,
    isLiked: true,
    tags: ['obd', 'teknoloji']
  },
  {
    id: '3',
    user: {
      name: 'Can Yılmaz',
      avatar: 'https://i.pravatar.cc/300?img=3',
      level: 39,
      verified: false
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    content: 'Haftada 7 gün üst üste 90+ puan aldım ve "Güvenli Sürüş Şampiyonu" rozeti kazandım! 🏆',
    likes: 234,
    comments: 45,
    shares: 12,
    isLiked: true,
    tags: ['başarı', 'güvenli-sürüş']
  }
];

const mockChallenges: Challenge[] = [
  {
    id: '1',
    name: 'Yeşil Sürücü',
    description: 'Bu hafta 200 km boyunca 7L/100km altında yakıt tüketin',
    icon: '🌱',
    reward: 500,
    participants: 1247,
    endsIn: '3 gün',
    difficulty: 'medium',
    progress: 85,
    maxProgress: 200
  },
  {
    id: '2',
    name: 'Hız Limiti Kahramanı',
    description: '5 gün üst üste hız limitini aşmadan sürün',
    icon: '🚦',
    reward: 300,
    participants: 892,
    endsIn: '5 gün',
    difficulty: 'easy',
    progress: 3,
    maxProgress: 5
  },
  {
    id: '3',
    name: 'Uzun Yol Ustası',
    description: 'Tek seferde 500 km yol yapın, 8L/100km altı tüketim',
    icon: '🛣️',
    reward: 1000,
    participants: 456,
    endsIn: '7 gün',
    difficulty: 'hard'
  }
];

// ==================== COMPONENT ====================

export default function CommunityPanel() {
  const [selectedTab, setSelectedTab] = useState<'leaderboard' | 'feed' | 'challenges'>('leaderboard');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard);
  const [posts, setPosts] = useState<CommunityPost[]>(mockPosts);
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleFollow = (userId: string) => {
    setLeaderboard(prev => prev.map(entry =>
      entry.userId === userId ? { ...entry, isFollowing: !entry.isFollowing } : entry
    ));
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-400" />;
    return <span className="text-xl font-bold text-gray-400">#{rank}</span>;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'from-green-500 to-emerald-600';
      case 'medium': return 'from-yellow-500 to-orange-600';
      case 'hard': return 'from-red-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
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
            <Users className="w-6 h-6" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Topluluk
            </h1>
            <p className="text-sm text-gray-400">Diğer sürücülerle yarış ve etkileşim</p>
          </div>
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg font-medium flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filtrele
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'leaderboard' as const, name: 'Liderlik Tablosu', icon: Trophy },
          { id: 'feed' as const, name: 'Topluluk Akışı', icon: MessageCircle },
          { id: 'challenges' as const, name: 'Meydan Okumalar', icon: Target }
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
          {selectedTab === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3"
            >
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Sürücü ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Leaderboard */}
              {leaderboard.map((entry, index) => (
                <motion.div
                  key={entry.userId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-xl border transition-all ${
                    entry.userId === 'you'
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/50 shadow-lg shadow-blue-500/20'
                      : entry.rank <= 3
                      ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
                      : 'bg-gray-800/50 border-gray-700/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank Badge */}
                    <div className="w-12 flex justify-center">
                      {getRankBadge(entry.rank)}
                    </div>

                    {/* Avatar */}
                    <div className="relative">
                      <img
                        src={entry.avatar}
                        alt={entry.name}
                        className="w-14 h-14 rounded-xl border-2 border-gray-700"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full px-2 py-0.5 text-xs font-bold">
                        {entry.level}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{entry.name}</h3>
                        {entry.userId === 'you' && (
                          <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full font-bold">
                            SEN
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="font-semibold">{entry.score.toLocaleString('tr-TR')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-purple-400" />
                          <span>{entry.badges} rozet</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-blue-400" />
                          <span>{entry.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Trend */}
                    <div className="flex flex-col items-center gap-1">
                      {entry.trend === 'up' && (
                        <>
                          <TrendingUp className="w-5 h-5 text-green-400" />
                          <span className="text-xs text-green-400 font-bold">+{entry.rankChange}</span>
                        </>
                      )}
                      {entry.trend === 'down' && (
                        <>
                          <TrendingUp className="w-5 h-5 text-red-400 rotate-180" />
                          <span className="text-xs text-red-400 font-bold">{entry.rankChange}</span>
                        </>
                      )}
                      {entry.trend === 'same' && (
                        <div className="w-5 h-1 bg-gray-500 rounded-full" />
                      )}
                    </div>

                    {/* Follow Button */}
                    {entry.userId !== 'you' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleFollow(entry.userId)}
                        className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                          entry.isFollowing
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-blue-500 text-white'
                        }`}
                      >
                        {entry.isFollowing ? (
                          <>
                            <UserCheck className="w-4 h-4" />
                            Takip Ediliyor
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-4 h-4" />
                            Takip Et
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {selectedTab === 'feed' && (
            <motion.div
              key="feed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* New Post */}
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
                <div className="flex gap-3">
                  <img
                    src="https://i.pravatar.cc/300?img=15"
                    alt="You"
                    className="w-10 h-10 rounded-full"
                  />
                  <input
                    type="text"
                    placeholder="Deneyimlerinizi paylaşın..."
                    className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Paylaş
                  </motion.button>
                </div>
              </div>

              {/* Posts */}
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/30"
                >
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={post.user.avatar}
                          alt={post.user.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full px-2 py-0.5 text-xs font-bold">
                          {post.user.level}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{post.user.name}</h3>
                          {post.user.verified && (
                            <div className="bg-blue-500 rounded-full p-0.5">
                              <Star className="w-3 h-3 text-white fill-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{Math.floor((Date.now() - post.timestamp.getTime()) / (1000 * 60))} dakika önce</span>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 hover:bg-gray-700 rounded-lg"
                    >
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </motion.button>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-200 mb-3">{post.content}</p>

                  {/* Tags */}
                  <div className="flex gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center gap-6 pt-3 border-t border-gray-700">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 ${
                        post.isLiked ? 'text-red-400' : 'text-gray-400'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-red-400' : ''}`} />
                      <span className="font-semibold">{post.likes}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-gray-400 hover:text-blue-400"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-semibold">{post.comments}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-gray-400 hover:text-green-400"
                    >
                      <Share2 className="w-5 h-5" />
                      <span className="font-semibold">{post.shares}</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {selectedTab === 'challenges' && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {challenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl border bg-gradient-to-r ${getDifficultyColor(challenge.difficulty)}/10 border-${challenge.difficulty === 'easy' ? 'green' : challenge.difficulty === 'medium' ? 'yellow' : 'red'}-500/30`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{challenge.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold">{challenge.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-3">{challenge.description}</p>

                      {challenge.progress !== undefined && challenge.maxProgress !== undefined && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">İlerleme</span>
                            <span className="font-semibold">{challenge.progress} / {challenge.maxProgress}</span>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${getDifficultyColor(challenge.difficulty)}`}
                              style={{ width: `${(challenge.progress / challenge.maxProgress) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            <span className="font-bold text-yellow-400">+{challenge.reward} XP</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-blue-400" />
                            <span className="text-gray-400">{challenge.participants.toLocaleString('tr-TR')} katılımcı</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-red-400" />
                            <span className="text-red-400">{challenge.endsIn}</span>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-4 py-2 rounded-lg font-medium ${
                            challenge.progress !== undefined
                              ? 'bg-gray-700 text-gray-300'
                              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          }`}
                        >
                          {challenge.progress !== undefined ? 'Devam Ediyor' : 'Katıl'}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
