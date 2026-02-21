'use client';

// ============================================
// FAZ 10: Social Features & Community
// ============================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Trophy, MessageCircle, Share2, Heart, TrendingUp,
  Award, Star, MapPin, Zap, ThumbsUp, Send
} from 'lucide-react';

interface Post {
  id: string;
  user: { name: string; avatar: string; rank: number };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  badges: number;
}

export default function SocialCommunity() {
  const [activeTab, setActiveTab] = useState<'feed' | 'leaderboard' | 'achievements'>('feed');

  const posts: Post[] = [
    {
      id: '1',
      user: { name: 'Mehmet Y.', avatar: '👨‍💼', rank: 1 },
      content: 'Bugün 250km yol yaptım ve sadece 4.2L/100km tüketim! TÜRK OTO AI sayesinde eco driving master oldum! 🚗💚',
      likes: 42,
      comments: 8,
      timestamp: '2 saat önce'
    },
    {
      id: '2',
      user: { name: 'Ayşe D.', avatar: '👩‍💼', rank: 3 },
      content: 'İstanbul-Ankara arası 450km yolculukta AI asistan harika navigasyon önerileri verdi. 30 dakika kazandım!',
      likes: 28,
      comments: 5,
      timestamp: '5 saat önce'
    },
  ];

  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Mehmet Yılmaz', avatar: '👨‍💼', score: 9850, badges: 28 },
    { rank: 2, name: 'Can Öz', avatar: '👨‍🔧', score: 8720, badges: 24 },
    { rank: 3, name: 'Ayşe Demir', avatar: '👩‍💼', score: 8100, badges: 22 },
    { rank: 4, name: 'Zeynep K.', avatar: '👩‍🎨', score: 7550, badges: 20 },
    { rank: 5, name: 'Ali Veli', avatar: '👨‍💻', score: 7200, badges: 19 },
  ];

  return (
    <div className="h-full flex flex-col gap-6 p-6 bg-gray-50">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900">Topluluk</h2>
            <p className="text-gray-500">Sürücülerle bağlan, yarış, öğren</p>
          </div>
        </div>

        <div className="flex gap-2">
          {[
            { id: 'feed', label: 'Akış', icon: MessageCircle },
            { id: 'leaderboard', label: 'Liderlik', icon: Trophy },
            { id: 'achievements', label: 'Başarımlar', icon: Award },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Feed */}
      {activeTab === 'feed' && (
        <div className="space-y-4">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{post.user.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-900">{post.user.name}</h4>
                    <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                      #{post.user.rank}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{post.timestamp}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{post.content}</p>

              <div className="flex items-center gap-6 text-gray-500">
                <motion.button whileHover={{ scale: 1.1 }} className="flex items-center gap-2 hover:text-red-600 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="font-semibold">{post.likes}</span>
                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">{post.comments}</span>
                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }} className="flex items-center gap-2 hover:text-green-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h3 className="text-2xl font-black text-gray-900 mb-6">Bu Ayın Liderleri</h3>
          <div className="space-y-4">
            {leaderboard.map((entry, i) => (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  entry.rank === 1
                    ? 'bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300'
                    : entry.rank === 2
                    ? 'bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300'
                    : entry.rank === 3
                    ? 'bg-gradient-to-r from-orange-100 to-orange-200 border-2 border-orange-300'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className={`text-3xl font-black ${
                  entry.rank === 1 ? 'text-amber-600' :
                  entry.rank === 2 ? 'text-gray-600' :
                  entry.rank === 3 ? 'text-orange-600' :
                  'text-gray-400'
                }`}>
                  #{entry.rank}
                </div>
                <div className="text-4xl">{entry.avatar}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{entry.name}</h4>
                  <p className="text-sm text-gray-500">{entry.badges} Başarım</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-purple-600">{entry.score.toLocaleString()}</div>
                  <p className="text-xs text-gray-500">Puan</p>
                </div>
                {entry.rank <= 3 && (
                  <Trophy className={`w-8 h-8 ${
                    entry.rank === 1 ? 'text-amber-500' :
                    entry.rank === 2 ? 'text-gray-500' :
                    'text-orange-500'
                  }`} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { name: 'İlk Yolculuk', icon: '🚗', unlocked: true },
            { name: 'Eco Warrior', icon: '🌱', unlocked: true },
            { name: '1000 KM', icon: '🏁', unlocked: true },
            { name: 'Hız Şampiyonu', icon: '⚡', unlocked: false },
            { name: 'Topluluk Lideri', icon: '👑', unlocked: false },
            { name: 'Bakım Ustası', icon: '🔧', unlocked: true },
          ].map((achievement, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-2xl text-center transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-xl'
                  : 'bg-gray-200 text-gray-400 opacity-50'
              }`}
            >
              <div className="text-5xl mb-3">{achievement.icon}</div>
              <h4 className="font-bold">{achievement.name}</h4>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
