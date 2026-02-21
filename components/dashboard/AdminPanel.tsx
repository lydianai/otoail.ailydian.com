'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Users,
  Activity,
  Database,
  Server,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Settings,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  Ban,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Terminal,
  FileText,
  Bell,
  Mail,
  Zap,
  Clock,
  MapPin,
  Car,
  DollarSign,
  Package,
  Cpu,
  HardDrive,
  Wifi,
  WifiOff,
  Check,
  X,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react';

// ==================== TYPES ====================

interface SystemStat {
  name: string;
  value: string | number;
  change: number;
  icon: typeof Activity;
  status: 'normal' | 'warning' | 'critical';
  color: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  subscription: 'FREE' | 'PREMIUM' | 'ENTERPRISE';
  status: 'active' | 'suspended' | 'banned';
  lastActive: Date;
  vehicles: number;
  createdAt: Date;
}

interface SystemLog {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error';
  message: string;
  source: string;
}

interface ServerMetric {
  name: string;
  value: number;
  max: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
}

// ==================== MOCK DATA ====================

const mockSystemStats: SystemStat[] = [
  {
    name: 'Toplam Kullanıcılar',
    value: '12,847',
    change: 12.5,
    icon: Users,
    status: 'normal',
    color: 'blue'
  },
  {
    name: 'Aktif Sürücüler',
    value: '8,932',
    change: 8.2,
    icon: Activity,
    status: 'normal',
    color: 'green'
  },
  {
    name: 'Günlük Gelir',
    value: '₺45,280',
    change: -3.4,
    icon: DollarSign,
    status: 'warning',
    color: 'yellow'
  },
  {
    name: 'API İstekleri',
    value: '2.4M',
    change: 18.7,
    icon: Server,
    status: 'normal',
    color: 'purple'
  },
  {
    name: 'OBD Cihazları',
    value: '5,432',
    change: 5.3,
    icon: Cpu,
    status: 'normal',
    color: 'orange'
  },
  {
    name: 'Depolama',
    value: '842 GB',
    change: 15.2,
    icon: Database,
    status: 'warning',
    color: 'red'
  }
];

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    avatar: 'https://i.pravatar.cc/300?img=12',
    subscription: 'PREMIUM',
    status: 'active',
    lastActive: new Date(Date.now() - 1000 * 60 * 15),
    vehicles: 2,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Mehmet Demir',
    email: 'mehmet@example.com',
    avatar: 'https://i.pravatar.cc/300?img=1',
    subscription: 'ENTERPRISE',
    status: 'active',
    lastActive: new Date(Date.now() - 1000 * 60 * 60),
    vehicles: 8,
    createdAt: new Date('2023-12-10')
  },
  {
    id: '3',
    name: 'Ayşe Kaya',
    email: 'ayse@example.com',
    avatar: 'https://i.pravatar.cc/300?img=5',
    subscription: 'FREE',
    status: 'suspended',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    vehicles: 1,
    createdAt: new Date('2024-02-20')
  }
];

const mockLogs: SystemLog[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    level: 'error',
    message: 'Database connection timeout on replica server',
    source: 'database'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    level: 'warning',
    message: 'High memory usage detected (85%)',
    source: 'system'
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    level: 'info',
    message: 'Backup completed successfully',
    source: 'backup'
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    level: 'info',
    message: 'New user registration: user_12847',
    source: 'auth'
  }
];

const mockServerMetrics: ServerMetric[] = [
  { name: 'CPU', value: 45, max: 100, unit: '%', status: 'healthy' },
  { name: 'RAM', value: 12.4, max: 16, unit: 'GB', status: 'healthy' },
  { name: 'Disk', value: 842, max: 1000, unit: 'GB', status: 'warning' },
  { name: 'Network', value: 234, max: 1000, unit: 'Mbps', status: 'healthy' }
];

// ==================== COMPONENT ====================

export default function AdminPanel() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'users' | 'system' | 'logs'>('overview');
  const [systemStats, setSystemStats] = useState<SystemStat[]>(mockSystemStats);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [logs, setLogs] = useState<SystemLog[]>(mockLogs);
  const [serverMetrics, setServerMetrics] = useState<ServerMetric[]>(mockServerMetrics);
  const [searchQuery, setSearchQuery] = useState('');

  const handleUserAction = (userId: string, action: 'suspend' | 'activate' | 'ban') => {
    setUsers(prev => prev.map(user =>
      user.id === userId
        ? { ...user, status: action === 'activate' ? 'active' : action === 'suspend' ? 'suspended' : 'banned' }
        : user
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
      case 'healthy':
      case 'active':
      case 'info':
        return 'green';
      case 'warning':
      case 'suspended':
        return 'yellow';
      case 'critical':
      case 'banned':
      case 'error':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getSubscriptionBadge = (subscription: string) => {
    switch (subscription) {
      case 'ENTERPRISE':
        return 'bg-gradient-to-r from-yellow-500 to-orange-600';
      case 'PREMIUM':
        return 'bg-gradient-to-r from-purple-500 to-blue-600';
      case 'FREE':
        return 'bg-gray-700';
      default:
        return 'bg-gray-700';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl"
          >
            <Shield className="w-6 h-6" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Admin Paneli
            </h1>
            <p className="text-sm text-gray-400">Sistem yönetimi ve kontrol merkezi</p>
          </div>
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg font-medium flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Rapor Al
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg font-medium flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Yenile
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'overview' as const, name: 'Genel Bakış', icon: BarChart3 },
          { id: 'users' as const, name: 'Kullanıcılar', icon: Users },
          { id: 'system' as const, name: 'Sistem Durumu', icon: Server },
          { id: 'logs' as const, name: 'Loglar', icon: FileText }
        ].map(tab => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-3 rounded-xl font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
              selectedTab === tab.id
                ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg shadow-red-500/50'
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
              {/* System Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {systemStats.map((stat, index) => (
                  <motion.div
                    key={stat.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-xl border ${
                      stat.status === 'critical' ? 'bg-red-500/10 border-red-500/30' :
                      stat.status === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
                      'bg-gray-800/50 border-gray-700/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon className={`w-10 h-10 text-${stat.color}-400`} />
                      <div className={`flex items-center gap-1 ${
                        stat.change >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {stat.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span className="text-sm font-bold">{Math.abs(stat.change)}%</span>
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.name}</div>
                  </motion.div>
                ))}
              </div>

              {/* Server Health */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Server className="w-6 h-6 text-blue-400" />
                  Sunucu Sağlığı
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {serverMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-900/50 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">{metric.name}</span>
                        <span className={`w-2 h-2 rounded-full bg-${getStatusColor(metric.status)}-400`} />
                      </div>
                      <div className="text-2xl font-bold mb-2">
                        {metric.value.toFixed(1)} {metric.unit}
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${
                            metric.status === 'critical' ? 'from-red-500 to-red-600' :
                            metric.status === 'warning' ? 'from-yellow-500 to-yellow-600' :
                            'from-green-500 to-green-600'
                          }`}
                          style={{ width: `${(metric.value / metric.max) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1 text-right">
                        Limit: {metric.max} {metric.unit}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-green-400" />
                  Son Aktiviteler
                </h2>
                <div className="space-y-3">
                  {logs.slice(0, 5).map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg"
                    >
                      <div className={`w-2 h-2 rounded-full bg-${getStatusColor(log.level)}-400`} />
                      <div className="flex-1">
                        <p className="text-sm text-gray-300">{log.message}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                          <span>{log.source}</span>
                          <span>•</span>
                          <span>{log.timestamp.toLocaleTimeString('tr-TR')}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Search */}
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Kullanıcı ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-400 hover:bg-gray-800"
                >
                  <Filter className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Users List */}
              <div className="space-y-3">
                {users.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/30"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-14 h-14 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg">{user.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getSubscriptionBadge(user.subscription)}`}>
                            {user.subscription}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold bg-${getStatusColor(user.status)}-500/20 text-${getStatusColor(user.status)}-400`}>
                            {user.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{user.email}</span>
                          <span>•</span>
                          <span>{user.vehicles} araç</span>
                          <span>•</span>
                          <span>Son görülme: {Math.floor((Date.now() - user.lastActive.getTime()) / (1000 * 60))} dk önce</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {user.status === 'active' ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleUserAction(user.id, 'suspend')}
                            className="px-3 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg font-medium flex items-center gap-2"
                          >
                            <Lock className="w-4 h-4" />
                            Askıya Al
                          </motion.button>
                        ) : user.status === 'suspended' ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleUserAction(user.id, 'activate')}
                            className="px-3 py-2 bg-green-500/20 text-green-400 rounded-lg font-medium flex items-center gap-2"
                          >
                            <Unlock className="w-4 h-4" />
                            Aktifleştir
                          </motion.button>
                        ) : null}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleUserAction(user.id, 'ban')}
                          className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg font-medium flex items-center gap-2"
                        >
                          <Ban className="w-4 h-4" />
                          Yasakla
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-gray-700 rounded-lg"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-400" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {selectedTab === 'system' && (
            <motion.div
              key="system"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* System Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-green-400" />
                    API Durumu
                  </h3>
                  <div className="space-y-3">
                    {['Authentication', 'OBD Data', 'Navigation', 'Payment'].map((service, index) => (
                      <div key={service} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                        <span className="font-medium">{service}</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-sm text-green-400">Operational</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-blue-400" />
                    Veritabanı Durumu
                  </h3>
                  <div className="space-y-3">
                    {['Primary DB', 'Replica 1', 'Replica 2', 'Cache'].map((db, index) => (
                      <div key={db} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                        <span className="font-medium">{db}</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-sm text-gray-400">24ms</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Server Metrics Detail */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Server className="w-5 h-5 text-purple-400" />
                  Detaylı Sunucu Metrikleri
                </h3>
                <div className="space-y-4">
                  {serverMetrics.map((metric, index) => (
                    <div key={metric.name} className="p-4 bg-gray-900/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{metric.name}</span>
                        <span className="text-sm text-gray-400">
                          {metric.value.toFixed(1)} / {metric.max} {metric.unit}
                        </span>
                      </div>
                      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${
                            metric.status === 'critical' ? 'from-red-500 to-red-600' :
                            metric.status === 'warning' ? 'from-yellow-500 to-yellow-600' :
                            'from-green-500 to-green-600'
                          }`}
                          style={{ width: `${(metric.value / metric.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === 'logs' && (
            <motion.div
              key="logs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {['all', 'error', 'warning', 'info'].map((level) => (
                    <motion.button
                      key={level}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        level === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-800/50 text-gray-400'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </motion.button>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg font-medium flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Logs
                </motion.button>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-4 font-mono text-sm space-y-2">
                {logs.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-3 rounded-lg border ${
                      log.level === 'error' ? 'bg-red-500/10 border-red-500/30' :
                      log.level === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
                      'bg-gray-800/30 border-gray-700/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`text-${getStatusColor(log.level)}-400 font-bold`}>
                        [{log.level.toUpperCase()}]
                      </span>
                      <span className="text-gray-500">{log.timestamp.toLocaleTimeString('tr-TR')}</span>
                      <span className="text-blue-400">[{log.source}]</span>
                      <span className="text-gray-300 flex-1">{log.message}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
