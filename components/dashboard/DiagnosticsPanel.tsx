'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, CheckCircle, XCircle, Wrench, Zap, TrendingUp,
  Activity, Settings, RefreshCw, Download, Upload, Search,
  Filter, Calendar, MapPin, Phone, MessageSquare, Play, Pause,
  RotateCcw, Trash2, Eye, EyeOff, ChevronDown, ChevronUp, Info
} from 'lucide-react';
import { PIDManager, DTCCode } from '@/lib/obd/pid-manager';

interface DiagnosticIssue {
  id: string;
  code: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  detectedAt: Date;
  occurrences: number;
  possibleCauses: string[];
  solutions: string[];
  status: 'active' | 'pending' | 'resolved' | 'ignored';
  autoFixAvailable: boolean;
  estimatedCost?: {
    min: number;
    max: number;
    currency: string;
  };
}

export default function DiagnosticsPanel() {
  const [issues, setIssues] = useState<DiagnosticIssue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<DiagnosticIssue | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [autoFixing, setAutoFixing] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchDiagnostics();
    // Otomatik yenileme her 30 saniyede
    const interval = setInterval(fetchDiagnostics, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDiagnostics = async () => {
    try {
      const response = await fetch('/api/diagnostics');
      const data = await response.json();

      if (data.success) {
        setIssues(data.issues);
      }
    } catch (error) {
      console.error('Error fetching diagnostics:', error);
      // Demo data
      loadDemoData();
    }
  };

  const loadDemoData = () => {
    const demoIssues: DiagnosticIssue[] = [
      {
        id: '1',
        code: 'P0420',
        description: 'Katalitik Konvertör Sistem Verimliliği Düşük (Banka 1)',
        severity: 'medium',
        category: 'Emisyon Kontrolü',
        detectedAt: new Date(Date.now() - 86400000 * 3),
        occurrences: 5,
        possibleCauses: [
          'Katalitik konvertör arızası',
          'Oksijen sensörü arızası',
          'Motor ateşleme hataları',
          'Egzoz kaçağı'
        ],
        solutions: [
          'Katalitik konvertörü değiştirin (2000-4000 TL)',
          'Oksijen sensörlerini test edin ve değiştirin (500-1000 TL)',
          'Ateşleme sistemini kontrol edin',
          'Egzoz sistemini kaçak için kontrol edin'
        ],
        status: 'active',
        autoFixAvailable: false,
        estimatedCost: { min: 2000, max: 4000, currency: 'TL' }
      },
      {
        id: '2',
        code: 'P0101',
        description: 'Hava Kütlesi Akış Sensörü (MAF) Aralık/Performans Problemi',
        severity: 'medium',
        category: 'Hava/Yakıt Sistemi',
        detectedAt: new Date(Date.now() - 86400000),
        occurrences: 2,
        possibleCauses: [
          'Kirli veya hasarlı MAF sensörü',
          'Hava filtresi tıkanıklığı',
          'Emme sisteminde vakum kaçağı'
        ],
        solutions: [
          'MAF sensörünü temizleyin (Otomatik düzeltme mevcut)',
          'Hava filtresini değiştirin (200-400 TL)',
          'Emme sistemini vakum kaçağı için kontrol edin'
        ],
        status: 'active',
        autoFixAvailable: true,
        estimatedCost: { min: 200, max: 800, currency: 'TL' }
      },
      {
        id: '3',
        code: 'P0128',
        description: 'Motor Soğutma Suyu Termostat Sıcaklığı Düşük',
        severity: 'low',
        category: 'Soğutma Sistemi',
        detectedAt: new Date(Date.now() - 3600000),
        occurrences: 1,
        possibleCauses: [
          'Arızalı termostat',
          'Düşük soğutma suyu seviyesi'
        ],
        solutions: [
          'Termostatı değiştirin (400-800 TL)',
          'Soğutma suyu seviyesini kontrol edin (Otomatik kontrol mevcut)'
        ],
        status: 'active',
        autoFixAvailable: true,
        estimatedCost: { min: 400, max: 800, currency: 'TL' }
      }
    ];

    setIssues(demoIssues);
  };

  const runDiagnosticScan = async () => {
    setIsScanning(true);
    setScanProgress(0);

    const steps = [
      { progress: 20, message: 'Motor ECU bağlantısı kuruluyor...' },
      { progress: 40, message: 'DTC kodları okunuyor...' },
      { progress: 60, message: 'Sensör verileri analiz ediliyor...' },
      { progress: 80, message: 'Arıza geçmişi kontrol ediliyor...' },
      { progress: 100, message: 'Tarama tamamlandı!' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setScanProgress(step.progress);
    }

    await fetchDiagnostics();
    setIsScanning(false);
  };

  const clearDTC = async (issueId: string) => {
    try {
      const response = await fetch(`/api/diagnostics/${issueId}/clear`, {
        method: 'POST'
      });

      if (response.ok) {
        setIssues(issues.map(issue =>
          issue.id === issueId ? { ...issue, status: 'resolved' } : issue
        ));
      }
    } catch (error) {
      console.error('Error clearing DTC:', error);
    }
  };

  const autoFix = async (issueId: string) => {
    const issue = issues.find(i => i.id === issueId);
    if (!issue || !issue.autoFixAvailable) return;

    setAutoFixing(issueId);

    try {
      // Otomatik düzeltme prosedürü
      const response = await fetch(`/api/diagnostics/${issueId}/auto-fix`, {
        method: 'POST'
      });

      const data = await response.json();

      if (data.success) {
        // Başarılı düzeltme
        setIssues(issues.map(i =>
          i.id === issueId
            ? {
                ...i,
                status: 'resolved',
                solutions: [...i.solutions, `✓ Otomatik düzeltme uygulandı: ${data.action}`]
              }
            : i
        ));
      } else {
        alert(`Otomatik düzeltme başarısız: ${data.error}`);
      }
    } catch (error) {
      console.error('Auto-fix error:', error);
      alert('Otomatik düzeltme sırasında bir hata oluştu');
    } finally {
      setAutoFixing(null);
    }
  };

  const filteredIssues = issues.filter(issue => {
    if (filterSeverity !== 'all' && issue.severity !== filterSeverity) return false;
    if (filterStatus !== 'all' && issue.status !== filterStatus) return false;
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500';
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500';
      case 'low': return 'text-blue-500 bg-blue-500/10 border-blue-500';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="w-5 h-5" />;
      case 'medium':
        return <Info className="w-5 h-5" />;
      case 'low':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-black text-white p-6 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black mb-2">Arıza Teşhis ve Onarım</h1>
          <p className="text-gray-400">Otomatik arıza tespiti ve akıllı çözümler</p>
        </div>
        <button
          onClick={runDiagnosticScan}
          disabled={isScanning}
          className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
        >
          <RefreshCw className={`w-5 h-5 ${isScanning ? 'animate-spin' : ''}`} />
          {isScanning ? 'Taranıyor...' : 'Yeni Tarama'}
        </button>
      </div>

      {/* Scan Progress */}
      {isScanning && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl bg-blue-500/10 border-2 border-blue-500/30"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-blue-400">Teşhis Taraması</span>
            <span className="text-sm text-blue-400">%{scanProgress}</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${scanProgress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
            />
          </div>
        </motion.div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 border-2 border-gray-700 focus:border-blue-500 focus:outline-none"
        >
          <option value="all">Tüm Öncelikler</option>
          <option value="critical">Kritik</option>
          <option value="high">Yüksek</option>
          <option value="medium">Orta</option>
          <option value="low">Düşük</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 border-2 border-gray-700 focus:border-blue-500 focus:outline-none"
        >
          <option value="all">Tüm Durumlar</option>
          <option value="active">Aktif</option>
          <option value="pending">Beklemede</option>
          <option value="resolved">Çözüldü</option>
          <option value="ignored">Yok Sayıldı</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Toplam Arıza', value: issues.length, color: 'blue' },
          { label: 'Aktif', value: issues.filter(i => i.status === 'active').length, color: 'red' },
          { label: 'Çözüldü', value: issues.filter(i => i.status === 'resolved').length, color: 'green' },
          { label: 'Oto-Düzeltme', value: issues.filter(i => i.autoFixAvailable).length, color: 'purple' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-xl bg-${stat.color}-500/10 border-2 border-${stat.color}-500/30`}
          >
            <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold text-${stat.color}-400`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Issues List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredIssues.map((issue, index) => (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-5 hover:border-blue-500 transition-all cursor-pointer"
              onClick={() => setSelectedIssue(selectedIssue?.id === issue.id ? null : issue)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-xl ${getSeverityColor(issue.severity)}`}>
                    {getSeverityIcon(issue.severity)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-blue-400">{issue.code}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getSeverityColor(issue.severity)}`}>
                        {issue.severity.toUpperCase()}
                      </span>
                      {issue.autoFixAvailable && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500">
                          <Zap className="w-3 h-3 inline mr-1" />
                          Oto-Düzeltme
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-white mb-1">{issue.description}</h3>
                    <p className="text-sm text-gray-400">
                      {issue.category} • {issue.occurrences} kez tespit edildi •
                      {new Date(issue.detectedAt).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {issue.autoFixAvailable && issue.status === 'active' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        autoFix(issue.id);
                      }}
                      disabled={autoFixing === issue.id}
                      className="px-4 py-2 rounded-lg font-bold bg-gradient-to-r from-green-500 to-green-700 hover:shadow-lg hover:shadow-green-500/50 disabled:opacity-50 flex items-center gap-2 text-sm"
                    >
                      {autoFixing === issue.id ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Düzeltiliyor...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          Oto-Düzelt
                        </>
                      )}
                    </button>
                  )}

                  {selectedIssue?.id === issue.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {selectedIssue?.id === issue.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-700"
                  >
                    {/* Possible Causes */}
                    <div className="mb-4">
                      <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-400" />
                        Olası Nedenler
                      </h4>
                      <ul className="space-y-1">
                        {issue.possibleCauses.map((cause, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-orange-400 mt-1">•</span>
                            {cause}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Solutions */}
                    <div className="mb-4">
                      <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-green-400" />
                        Çözüm Önerileri
                      </h4>
                      <ul className="space-y-1">
                        {issue.solutions.map((solution, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Estimated Cost */}
                    {issue.estimatedCost && (
                      <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                        <h4 className="font-bold text-white mb-1 text-sm flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-blue-400" />
                          Tahmini Onarım Maliyeti
                        </h4>
                        <p className="text-lg font-bold text-blue-400">
                          {issue.estimatedCost.min.toLocaleString('tr-TR')} - {issue.estimatedCost.max.toLocaleString('tr-TR')} {issue.estimatedCost.currency}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          clearDTC(issue.id);
                        }}
                        className="px-4 py-2 rounded-lg font-bold bg-gray-700 hover:bg-gray-600 text-sm flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Kodu Sil
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Navigate to service centers
                        }}
                        className="px-4 py-2 rounded-lg font-bold bg-purple-600 hover:bg-purple-700 text-sm flex items-center gap-2"
                      >
                        <MapPin className="w-4 h-4" />
                        Yakın Servisler
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredIssues.length === 0 && !isScanning && (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Arıza Bulunamadı!</h3>
            <p className="text-gray-400">Aracınız şu anda sorunsuz çalışıyor.</p>
          </div>
        )}
      </div>
    </div>
  );
}
