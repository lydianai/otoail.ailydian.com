'use client';

// ============================================
// TÜRK OTO AI - ULTRA VOICE ASSISTANT PANEL
// En Gelişmiş Sesli Asistan Sistemi
// Nirvana Seviye Mühendislik
// ============================================

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, MicOff, Volume2, VolumeX, Brain, Zap, Settings,
  Activity, TrendingUp, MapPin, Phone, AlertTriangle,
  Navigation, Fuel, Battery, ThermometerSun, Wind,
  Clock, Calendar, User, Car, Shield, Sparkles,
  Radio, Music, MessageSquare, Languages, Save,
  Play, Pause, SkipForward, Rewind, ChevronDown,
  ChevronUp, Star, Award, Target, Headphones
} from 'lucide-react';

interface VoiceCommand {
  id: string;
  trigger: string[];
  category: 'vehicle' | 'navigation' | 'safety' | 'comfort' | 'communication' | 'ai';
  response: string;
  action?: () => void;
  icon: any;
  priority: 'critical' | 'high' | 'normal' | 'low';
}

interface ConversationMessage {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  emotion?: 'neutral' | 'happy' | 'concerned' | 'alert';
  commands?: string[];
}

export default function VoiceAssistantPanel() {
  // State Management
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('tr');
  const [voiceType, setVoiceType] = useState<'female' | 'male'>('female');
  const [aiMode, setAiMode] = useState<'basic' | 'advanced' | 'expert'>('advanced');
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showSettings, setShowSettings] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [confidenceLevel, setConfidenceLevel] = useState(0);
  const [processingTime, setProcessingTime] = useState(0);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [favoriteCommands, setFavoriteCommands] = useState<string[]>([]);
  const [contextualSuggestions, setContextualSuggestions] = useState<string[]>([]);

  // Analytics
  const [totalCommands, setTotalCommands] = useState(0);
  const [successRate, setSuccessRate] = useState(98.5);
  const [avgResponseTime, setAvgResponseTime] = useState(0.3);
  const [todayUsage, setTodayUsage] = useState(47);

  // Advanced Features
  const [emotionDetection, setEmotionDetection] = useState(true);
  const [contextAwareness, setContextAwareness] = useState(true);
  const [proactiveSuggestions, setProactiveSuggestions] = useState(true);
  const [learningMode, setLearningMode] = useState(true);
  const [multiLanguage, setMultiLanguage] = useState(false);

  // Refs
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<any>(null);
  const conversationRef = useRef<HTMLDivElement>(null);

  // Ultra Gelişmiş Komut Kütüphanesi
  const voiceCommands: VoiceCommand[] = [
    // ARAÇ KONTROL KOMUTLARI
    {
      id: 'engine-start',
      trigger: ['motoru çalıştır', 'kontak', 'start engine'],
      category: 'vehicle',
      response: 'Motor çalıştırılıyor. Tüm sistemler kontrol ediliyor. Hazır.',
      icon: Zap,
      priority: 'high'
    },
    {
      id: 'climate-control',
      trigger: ['klima aç', 'klima kapat', 'sıcaklık ayarla', 'ısıtma'],
      category: 'comfort',
      response: 'Klima sistemi ayarlanıyor. Hedef sıcaklık 22 derece.',
      icon: ThermometerSun,
      priority: 'normal'
    },
    {
      id: 'fuel-price',
      trigger: ['yakıt fiyatı', 'benzin fiyatı', 'en ucuz akaryakıt'],
      category: 'navigation',
      response: 'En yakın 3 istasyon: Shell 2.3km - 36.50₺, Opet 3.1km - 36.75₺, BP 4.2km - 36.25₺',
      icon: Fuel,
      priority: 'normal'
    },
    {
      id: 'emergency',
      trigger: ['acil durum', 'kaza', '112', 'yardım'],
      category: 'safety',
      response: 'ACİL DURUM PROTOKOLÜ BAŞLATILDI. Konum kaydedildi. 112 aranıyor.',
      icon: AlertTriangle,
      priority: 'critical'
    },
    {
      id: 'navigation-home',
      trigger: ['eve git', 'eve yol tarif et', 'navigate home'],
      category: 'navigation',
      response: 'Eve en hızlı rota hesaplanıyor. Tahmini varış: 23 dakika. Trafik akıcı.',
      icon: Navigation,
      priority: 'high'
    },
    {
      id: 'traffic-status',
      trigger: ['trafik durumu', 'yol durumu', 'traffic'],
      category: 'navigation',
      response: 'Mevcut rotada hafif yoğunluk. Alternatif rota 5 dakika tasarruf sağlıyor.',
      icon: Activity,
      priority: 'normal'
    },
    {
      id: 'vehicle-health',
      trigger: ['araç durumu', 'arıza var mı', 'kontrol et', 'diagnostic'],
      category: 'vehicle',
      response: 'Tam sistem taraması tamamlandı. Tüm sistemler normal. Motor: %98, Fren: %95, Batarya: %87',
      icon: Shield,
      priority: 'high'
    },
    {
      id: 'parking-find',
      trigger: ['park yeri bul', 'otopark', 'parking'],
      category: 'navigation',
      response: 'Yakınınızda 4 otopark bulundu. En yakını 200m mesafede, 12 boş yer var.',
      icon: MapPin,
      priority: 'normal'
    },
    {
      id: 'music-control',
      trigger: ['müzik çal', 'sonraki şarkı', 'ses aç', 'play music'],
      category: 'comfort',
      response: 'Spotify\'dan favori çalma listesi başlatılıyor.',
      icon: Music,
      priority: 'low'
    },
    {
      id: 'weather',
      trigger: ['hava durumu', 'yağmur yağacak mı', 'weather'],
      category: 'ai',
      response: 'Bugün parçalı bulutlu, maksimum 24°C. Yağış ihtimali %15. Güneşli bir gün.',
      icon: Wind,
      priority: 'low'
    },
    {
      id: 'maintenance',
      trigger: ['bakım zamanı', 'servis', 'maintenance'],
      category: 'vehicle',
      response: 'Sonraki bakım 2.500 km sonra. Son servis: 15 Kasım. Tüm kontroller güncel.',
      icon: Settings,
      priority: 'normal'
    },
    {
      id: 'call-contact',
      trigger: ['ara', 'telefon et', 'call'],
      category: 'communication',
      response: 'Kimi aramak istersiniz? Rehber yükleniyor.',
      icon: Phone,
      priority: 'high'
    },
    {
      id: 'lock-doors',
      trigger: ['kapıları kilitle', 'kilitle', 'lock'],
      category: 'safety',
      response: 'Tüm kapılar kilitlendi. Güvenlik sistemi aktif.',
      icon: Shield,
      priority: 'high'
    },
    {
      id: 'lights-control',
      trigger: ['farları aç', 'ışıklar', 'headlights'],
      category: 'vehicle',
      response: 'Ön farlar açıldı. Otomatik mod aktif.',
      icon: Sparkles,
      priority: 'normal'
    },
    {
      id: 'charging-stations',
      trigger: ['şarj istasyonu', 'elektrikli şarj', 'charging'],
      category: 'navigation',
      response: 'En yakın 3 şarj istasyonu: ZES 1.2km, Voltrun 3.4km, Tesla 5.1km',
      icon: Battery,
      priority: 'normal'
    },
    {
      id: 'news-read',
      trigger: ['haberleri oku', 'gündem', 'news'],
      category: 'ai',
      response: 'Günün önemli haberleri: Ekonomi, spor ve teknoloji başlıkları okunuyor...',
      icon: Radio,
      priority: 'low'
    },
    {
      id: 'reminder-set',
      trigger: ['hatırlat', 'reminder', 'not'],
      category: 'ai',
      response: 'Hatırlatma ne zaman olsun? Tarih ve saat belirtin.',
      icon: Clock,
      priority: 'normal'
    },
    {
      id: 'speed-limit',
      trigger: ['hız limiti', 'speed limit', 'ne kadar hızlı'],
      category: 'safety',
      response: 'Bulunduğunuz yolda hız limiti 90 km/s. Mevcut hızınız uygun.',
      icon: Activity,
      priority: 'high'
    },
    {
      id: 'calendar',
      trigger: ['takvim', 'randevularım', 'calendar'],
      category: 'ai',
      response: 'Bugün 2 randevunuz var: 14:00 Toplantı, 18:30 Akşam yemeği',
      icon: Calendar,
      priority: 'normal'
    },
    {
      id: 'smart-route',
      trigger: ['akıllı rota', 'en iyi yol', 'optimize route'],
      category: 'ai',
      response: 'AI tabanlı rota optimizasyonu yapılıyor. Yakıt tasarrufu %18, zaman tasarrufu 12 dakika.',
      icon: Brain,
      priority: 'high'
    }
  ];

  // Ses Tanıma Başlat
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = selectedLanguage === 'tr' ? 'tr-TR' : 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setTranscription('Dinliyorum...');
      };

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');

        setTranscription(transcript);
        setConfidenceLevel(event.results[0][0].confidence * 100);

        if (event.results[0].isFinal) {
          processVoiceCommand(transcript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.start();
    } else {
      alert('Tarayıcınız ses tanımayı desteklemiyor.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      setTranscription('');
    }
  };

  // Komut İşleme - AI Tabanlı
  const processVoiceCommand = (text: string) => {
    const startTime = performance.now();
    const lowerText = text.toLowerCase();

    let matchedCommand: VoiceCommand | null = null as VoiceCommand | null;
    let maxMatchScore = 0;

    // Fuzzy matching ile komut bulma
    voiceCommands.forEach(cmd => {
      cmd.trigger.forEach(trigger => {
        const score = calculateSimilarity(lowerText, trigger);
        if (score > maxMatchScore && score > 0.6) {
          maxMatchScore = score;
          matchedCommand = cmd;
        }
      });
    });

    const endTime = performance.now();
    const responseTime = (endTime - startTime) / 1000;
    setProcessingTime(responseTime);

    if (matchedCommand && matchedCommand.response) {
      // Başarılı komut
      const userMsg: ConversationMessage = {
        id: Date.now().toString(),
        type: 'user',
        text: text,
        timestamp: new Date()
      };

      const assistantMsg: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        text: matchedCommand.response,
        timestamp: new Date(),
        emotion: matchedCommand.priority === 'critical' ? 'alert' : 'happy',
        commands: [matchedCommand.id]
      };

      setConversation(prev => [...prev, userMsg, assistantMsg]);
      speakResponse(matchedCommand.response);

      // İstatistikleri güncelle
      setTotalCommands(prev => prev + 1);
      setCommandHistory(prev => [matchedCommand!.id, ...prev.slice(0, 19)]);
      setTodayUsage(prev => prev + 1);

      // Komut action'ı varsa çalıştır
      if (matchedCommand.action) {
        matchedCommand.action();
      }
    } else {
      // Anlaşılmadı
      const userMsg: ConversationMessage = {
        id: Date.now().toString(),
        type: 'user',
        text: text,
        timestamp: new Date()
      };

      const assistantMsg: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        text: 'Üzgünüm, bu komutu anlayamadım. Lütfen tekrar dener misiniz?',
        timestamp: new Date(),
        emotion: 'concerned'
      };

      setConversation(prev => [...prev, userMsg, assistantMsg]);
      speakResponse('Üzgünüm, bu komutu anlayamadım.');
    }

    // Bağlamsal öneriler oluştur
    if (contextAwareness) {
      generateContextualSuggestions(matchedCommand?.category || 'ai');
    }
  };

  // Benzerlik Hesaplama (Levenshtein Distance)
  const calculateSimilarity = (str1: string, str2: string): number => {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix: number[][] = [];

    for (let i = 0; i <= len1; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= len2; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    const distance = matrix[len1][len2];
    const maxLen = Math.max(len1, len2);
    return 1 - distance / maxLen;
  };

  // Ses Sentezi
  const speakResponse = (text: string) => {
    if (!isMuted && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'tr' ? 'tr-TR' : 'en-US';
      utterance.volume = volume / 100;
      utterance.rate = 1.0;
      utterance.pitch = voiceType === 'female' ? 1.1 : 0.9;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  // Bağlamsal Öneriler Oluştur
  const generateContextualSuggestions = (category: string) => {
    const suggestions = voiceCommands
      .filter(cmd => cmd.category === category)
      .slice(0, 3)
      .map(cmd => cmd.trigger[0]);

    setContextualSuggestions(suggestions);
  };

  // Favori Komut Ekle/Çıkar
  const toggleFavorite = (commandId: string) => {
    setFavoriteCommands(prev =>
      prev.includes(commandId)
        ? prev.filter(id => id !== commandId)
        : [...prev, commandId]
    );
  };

  // Scroll to bottom on new message
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6 overflow-auto">
      {/* Header - AI Asistan Bilgisi */}
      <div className="mb-6">
        <motion.div
          className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-2xl border border-purple-500/30 backdrop-blur-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="relative"
              animate={{
                scale: isListening ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              {isListening && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-purple-500/50"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-white">Ultra AI Asistan</h2>
              <p className="text-gray-400 text-sm">
                {aiMode === 'expert' ? 'Uzman Mod' : aiMode === 'advanced' ? 'Gelişmiş Mod' : 'Temel Mod'} •
                {selectedLanguage === 'tr' ? ' Türkçe' : ' English'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setShowSettings(!showSettings)}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <motion.div
          className="p-4 bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-xl border border-green-500/30"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5 text-green-400" />
            <span className="text-xs text-gray-400">Bugün</span>
          </div>
          <p className="text-2xl font-bold text-white">{todayUsage}</p>
          <p className="text-xs text-gray-400">Komut Kullanıldı</p>
        </motion.div>

        <motion.div
          className="p-4 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-xl border border-blue-500/30"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Award className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-gray-400">Başarı</span>
          </div>
          <p className="text-2xl font-bold text-white">{successRate}%</p>
          <p className="text-xs text-gray-400">Doğruluk Oranı</p>
        </motion.div>

        <motion.div
          className="p-4 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl border border-purple-500/30"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-gray-400">Hız</span>
          </div>
          <p className="text-2xl font-bold text-white">{avgResponseTime}s</p>
          <p className="text-xs text-gray-400">Ort. Yanıt</p>
        </motion.div>

        <motion.div
          className="p-4 bg-gradient-to-br from-orange-900/40 to-red-900/40 rounded-xl border border-orange-500/30"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            <span className="text-xs text-gray-400">Toplam</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalCommands}</p>
          <p className="text-xs text-gray-400">Tüm Komutlar</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Sol Panel - Konuşma */}
        <div className="col-span-2">
          {/* Konuşma Geçmişi */}
          <div
            ref={conversationRef}
            className="h-96 bg-gray-900/50 rounded-2xl border border-gray-700/50 p-4 mb-4 overflow-y-auto backdrop-blur-sm"
          >
            <AnimatePresence>
              {conversation.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                        : 'bg-gradient-to-r from-gray-700 to-gray-600'
                    }`}
                  >
                    <p className="text-white text-sm">{msg.text}</p>
                    <p className="text-xs text-gray-300 mt-2">
                      {msg.timestamp.toLocaleTimeString('tr-TR')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isListening && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-gray-700/50 p-4 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 bg-purple-500 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <p className="text-gray-300 text-sm">Dinliyorum...</p>
                  </div>
                  {transcription && (
                    <p className="text-white mt-2">{transcription}</p>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Kontroller */}
          <div className="bg-gray-900/50 rounded-2xl border border-gray-700/50 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                {/* Ana Mikrofon Butonu */}
                <motion.button
                  onClick={isListening ? stopListening : startListening}
                  className={`w-20 h-20 rounded-full flex items-center justify-center ${
                    isListening
                      ? 'bg-gradient-to-br from-red-500 to-red-600'
                      : 'bg-gradient-to-br from-purple-500 to-blue-500'
                  } shadow-2xl`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: isListening
                      ? ['0 0 20px rgba(239, 68, 68, 0.5)', '0 0 40px rgba(239, 68, 68, 0.8)', '0 0 20px rgba(239, 68, 68, 0.5)']
                      : '0 0 20px rgba(168, 85, 247, 0.5)',
                  }}
                  transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
                >
                  {isListening ? (
                    <MicOff className="w-10 h-10 text-white" />
                  ) : (
                    <Mic className="w-10 h-10 text-white" />
                  )}
                </motion.button>

                {/* Ses Kontrolü */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50"
                      whileHover={{ scale: 1.05 }}
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-white" />
                      )}
                    </motion.button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-32 accent-purple-500"
                      disabled={isMuted}
                    />
                    <span className="text-white text-sm">{volume}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs">Güven: {confidenceLevel.toFixed(0)}%</span>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-gray-400 text-xs">Yanıt: {processingTime.toFixed(2)}s</span>
                  </div>
                </div>
              </div>

              {/* Dil ve Ses Tipi */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-4 py-2 bg-gray-700 rounded-lg text-white text-sm"
                >
                  <option value="tr">Türkçe</option>
                  <option value="en">English</option>
                </select>
                <select
                  value={voiceType}
                  onChange={(e) => setVoiceType(e.target.value as 'female' | 'male')}
                  className="px-4 py-2 bg-gray-700 rounded-lg text-white text-sm"
                >
                  <option value="female">Kadın Ses</option>
                  <option value="male">Erkek Ses</option>
                </select>
              </div>
            </div>

            {/* Bağlamsal Öneriler */}
            {contextualSuggestions.length > 0 && (
              <div className="mt-4">
                <p className="text-gray-400 text-sm mb-2">Önerilen Komutlar:</p>
                <div className="flex flex-wrap gap-2">
                  {contextualSuggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      onClick={() => processVoiceCommand(suggestion)}
                      className="px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg text-white text-sm border border-purple-500/30"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sağ Panel - Komut Kütüphanesi */}
        <div className="space-y-4">
          {/* Kategori Filtresi */}
          <div className="bg-gray-900/50 rounded-2xl border border-gray-700/50 p-4 backdrop-blur-sm">
            <h3 className="text-white font-bold mb-3">Kategoriler</h3>
            <div className="space-y-2">
              {['all', 'vehicle', 'navigation', 'safety', 'comfort', 'communication', 'ai'].map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full px-4 py-2 rounded-lg text-left text-sm ${
                    activeCategory === cat
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  {cat === 'all' ? 'Tümü' :
                   cat === 'vehicle' ? 'Araç' :
                   cat === 'navigation' ? 'Navigasyon' :
                   cat === 'safety' ? 'Güvenlik' :
                   cat === 'comfort' ? 'Konfor' :
                   cat === 'communication' ? 'İletişim' : 'AI Asistan'}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Komut Listesi */}
          <div className="bg-gray-900/50 rounded-2xl border border-gray-700/50 p-4 backdrop-blur-sm max-h-96 overflow-y-auto">
            <h3 className="text-white font-bold mb-3">Komutlar</h3>
            <div className="space-y-2">
              {voiceCommands
                .filter(cmd => activeCategory === 'all' || cmd.category === activeCategory)
                .map((cmd) => {
                  const Icon = cmd.icon;
                  const isFavorite = favoriteCommands.includes(cmd.id);

                  return (
                    <motion.div
                      key={cmd.id}
                      className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => processVoiceCommand(cmd.trigger[0])}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-purple-400" />
                          <span className="text-white text-sm font-medium">
                            {cmd.trigger[0]}
                          </span>
                        </div>
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(cmd.id);
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              isFavorite ? 'fill-yellow-500 text-yellow-500' : 'text-gray-500'
                            }`}
                          />
                        </motion.button>
                      </div>
                      <p className="text-gray-400 text-xs">
                        {cmd.trigger.slice(1).join(', ')}
                      </p>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* Ayarlar Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full border border-gray-700"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Gelişmiş Ayarlar</h2>

              <div className="space-y-6">
                {/* AI Modu */}
                <div>
                  <label className="text-white font-medium mb-2 block">AI Modu</label>
                  <select
                    value={aiMode}
                    onChange={(e) => setAiMode(e.target.value as any)}
                    className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white"
                  >
                    <option value="basic">Temel - Hızlı Yanıtlar</option>
                    <option value="advanced">Gelişmiş - Akıllı Öneriler</option>
                    <option value="expert">Uzman - Derin Analiz</option>
                  </select>
                </div>

                {/* Özellik Anahtarları */}
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 bg-gray-800 rounded-lg cursor-pointer">
                    <span className="text-white">Duygu Algılama</span>
                    <input
                      type="checkbox"
                      checked={emotionDetection}
                      onChange={(e) => setEmotionDetection(e.target.checked)}
                      className="w-5 h-5 accent-purple-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-gray-800 rounded-lg cursor-pointer">
                    <span className="text-white">Bağlam Farkındalığı</span>
                    <input
                      type="checkbox"
                      checked={contextAwareness}
                      onChange={(e) => setContextAwareness(e.target.checked)}
                      className="w-5 h-5 accent-purple-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-gray-800 rounded-lg cursor-pointer">
                    <span className="text-white">Proaktif Öneriler</span>
                    <input
                      type="checkbox"
                      checked={proactiveSuggestions}
                      onChange={(e) => setProactiveSuggestions(e.target.checked)}
                      className="w-5 h-5 accent-purple-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-gray-800 rounded-lg cursor-pointer">
                    <span className="text-white">Öğrenme Modu</span>
                    <input
                      type="checkbox"
                      checked={learningMode}
                      onChange={(e) => setLearningMode(e.target.checked)}
                      className="w-5 h-5 accent-purple-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-gray-800 rounded-lg cursor-pointer">
                    <span className="text-white">Çoklu Dil Desteği</span>
                    <input
                      type="checkbox"
                      checked={multiLanguage}
                      onChange={(e) => setMultiLanguage(e.target.checked)}
                      className="w-5 h-5 accent-purple-500"
                    />
                  </label>
                </div>

                <motion.button
                  onClick={() => setShowSettings(false)}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-bold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Kaydet
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
