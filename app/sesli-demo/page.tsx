'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Mic, Volume2, VolumeX, Zap, Car, Navigation,
  Thermometer, Gauge, Fuel, MapPin, Phone, Music, Settings,
  Radio, Wind, Sun, Moon, Circle, CheckCircle, Sparkles, AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/Logo';

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
  timestamp: Date;
  action?: string;
}

// Declare SpeechRecognition types
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function SesliDemoPage() {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Voice commands and responses
  const voiceCommands = [
    {
      triggers: ['motor', 'motor durumu', 'motor sıcaklığı', 'motor kontrol'],
      response: 'Motor sıcaklığınız 92 derece, normal çalışma aralığında. Motor devri 2500 RPM, motor yükü yüzde 45. Tüm motor değerleri optimal seviyede.',
      action: 'Motor kontrolü yapıldı'
    },
    {
      triggers: ['yakıt', 'benzin', 'yakıt seviyesi', 'depo'],
      response: 'Yakıt seviyeniz yüzde 78. Yaklaşık 520 kilometre menzile sahipsiniz. Ortalama tüketiminiz 6.2 litre. En yakın benzin istasyonu 2.3 kilometre uzaklıkta, fiyatı litresi 36.50 lira.',
      action: 'Yakıt bilgisi gösterildi'
    },
    {
      triggers: ['yakıt fiyatı', 'benzin fiyatı', 'en ucuz benzin', 'akaryakıt fiyatı'],
      response: 'En yakın 3 benzin istasyonu: Shell 2.3 kilometre - 36.50 lira, Opet 3.1 kilometre - 36.75 lira, BP 4.2 kilometre - 36.25 lira. En uygun fiyat BP istasyonunda.',
      action: 'Yakıt fiyatları gösterildi'
    },
    {
      triggers: ['eve git', 'eve dön', 'navigasyon', 'yol tarifi', 'rota'],
      response: 'Eve giden rota hesaplandı. Tahmini varış süresi 24 dakika. Yolunuzda trafik akıcı.',
      action: 'Navigasyon başlatıldı'
    },
    {
      triggers: ['klima', 'ısıtma', 'soğutma', 'sıcaklık', 'iklimlendirme'],
      response: 'Klima 22 derece olarak ayarlandı. İç sıcaklık şu anda 24 derece.',
      action: 'Klima kontrol edildi'
    },
    {
      triggers: ['müzik', 'şarkı', 'radyo', 'müzik aç', 'radyo aç'],
      response: 'Radyo açıldı. Kral FM çalıyor. Ses seviyesi 12.',
      action: 'Müzik başlatıldı'
    },
    {
      triggers: ['hız', 'ne kadar hızlı', 'hızım', 'hız limiti'],
      response: 'Şu anki hızınız 65 kilometre saat. Hız limiti 90 kilometre saat.',
      action: 'Hız bilgisi gösterildi'
    },
    {
      triggers: ['park', 'park yeri', 'park et', 'otopark', 'park bul'],
      response: 'Size en yakın 3 otopark bulundu. En yakını 450 metre uzaklıkta, 15 boş yer mevcut.',
      action: 'Park yerleri gösterildi'
    },
    {
      triggers: ['lastik', 'lastik basıncı', 'hava basıncı', 'basınç'],
      response: 'Tüm lastiklerinizin basıncı normal seviyede. Ön sol 2.3 bar, Ön sağ 2.2 bar, Arka sol 2.4 bar, Arka sağ 2.3 bar.',
      action: 'Lastik basıncı kontrol edildi'
    },
    {
      triggers: ['arama', 'telefon', 'ara', 'telefon aç'],
      response: 'Telefon sistemi hazır. Kimi aramak istersiniz?',
      action: 'Telefon hazır'
    },
    {
      triggers: ['mesaj', 'sms', 'sms gönder', 'whatsapp', 'mesaj gönder'],
      response: 'Mesaj göndermek için kişi adını söyleyin.',
      action: 'Mesaj sistemi hazır'
    },
    {
      triggers: ['merhaba', 'selam', 'hey', 'hello'],
      response: 'Merhaba! Size nasıl yardımcı olabilirim? Motor durumu, yakıt seviyesi veya navigasyon gibi konularda yardımcı olabilirim.',
      action: 'Selamlaşma'
    },
    {
      triggers: ['teşekkürler', 'teşekkür', 'sağol', 'eyvallah'],
      response: 'Rica ederim! Başka bir isteğiniz olursa her zaman buradayım.',
      action: 'Teşekkür edildi'
    },
    {
      triggers: ['yardım', 'ne yapabilirsin', 'komutlar', 'özellikler'],
      response: 'Motor kontrolü, yakıt bilgisi, navigasyon, klima ayarı, müzik çalma, park yeri bulma, lastik basıncı, telefon ve mesaj gönderme, trafik durumu, hava durumu, servis randevusu, arıza tespiti gibi işlemler yapabilirim. Nasıl yardımcı olabilirim?',
      action: 'Yardım gösterildi'
    },
    {
      triggers: ['trafik', 'trafik durumu', 'yoğunluk', 'trafik yoğunluğu'],
      response: 'Bulunduğunuz bölgede trafik akıcı. Yolunuzda herhangi bir trafik sıkışıklığı bulunmuyor. Alternatif rotada 5 dakika daha hızlı ulaşabilirsiniz.',
      action: 'Trafik bilgisi gösterildi'
    },
    {
      triggers: ['hava durumu', 'hava', 'yağmur', 'kar', 'sıcaklık dışarıda'],
      response: 'Hava durumu az bulutlu, sıcaklık 18 derece. Rüzgar hızı 15 kilometre saat. Yağış beklenmiyor. Yol koşulları ideal.',
      action: 'Hava durumu gösterildi'
    },
    {
      triggers: ['servis', 'bakım', 'randevu', 'servis randevusu', 'bakım zamanı'],
      response: 'Son bakımınızdan bu yana 8 bin 500 kilometre yol katettiniz. Bir sonraki bakıma 1500 kilometre kaldı. Servis randevusu almak ister misiniz?',
      action: 'Servis bilgisi gösterildi'
    },
    {
      triggers: ['arıza', 'sorun', 'hata', 'check engine', 'ikaz lambası'],
      response: 'Sistemde herhangi bir arıza kodu tespit edilmedi. Tüm sensörler normal çalışıyor. Motor, şanzıman ve fren sistemleri optimal durumda.',
      action: 'Arıza kontrolü yapıldı'
    },
    {
      triggers: ['şarj', 'şarj istasyonu', 'elektrik', 'şarj noktası'],
      response: 'Size en yakın elektrik şarj istasyonu 3.2 kilometre uzaklıkta. Tesla Supercharger, 8 boş noktası var. Hızlı şarj mevcut, 30 dakikada yüzde 80 doluluğa ulaşabilirsiniz.',
      action: 'Şarj istasyonları gösterildi'
    },
    {
      triggers: ['fren', 'fren balataları', 'fren sistemi', 'abs'],
      response: 'Fren sistemi normal çalışıyor. Fren balatalarınızın aşınma oranı yüzde 35. ABS ve ESP sistemleri aktif. Fren sıvısı seviyesi yeterli.',
      action: 'Fren sistemi kontrol edildi'
    },
    {
      triggers: ['far', 'farlar', 'ışık', 'kısa far', 'uzun far'],
      response: 'Otomatik farlar aktif. Gündüz farları yanıyor. Tüm far sistemleri çalışıyor. Uzun far asistanı hazır.',
      action: 'Far kontrolü yapıldı'
    },
    {
      triggers: ['kaput aç', 'bagaj aç', 'cam aç', 'kapı kilidi'],
      response: 'Güvenlik nedeniyle araç hareket halindeyken bu işlemi yapamam. Lütfen aracı durdurun ve el frenini çekin.',
      action: 'Güvenlik uyarısı'
    },
    {
      triggers: ['yakın servis', 'tamirci', 'oto servis', 'yedek parça'],
      response: 'Size en yakın yetkili servis 4.5 kilometre uzaklıkta. Bosch Car Service, çalışma saatleri 09:00 - 18:00. Randevu alınabilir.',
      action: 'Servis noktaları gösterildi'
    },
    {
      triggers: ['kaza', 'acil durum', 'acil', 'ambulans', '112'],
      response: 'Acil durum tespit edildi. Konumunuz kaydedildi: Enlem 41.0082, Boylam 28.9784. 112 Acil Servisi aranıyor. Sakin olun, yardım yolda.',
      action: 'Acil durum protokolü başlatıldı'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'tr-TR';
        recognitionRef.current.maxAlternatives = 1;

        recognitionRef.current.onstart = () => {
          setIsListening(true);
          setCurrentTranscript('');
          setPermissionDenied(false);
        };

        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result) => result.transcript)
            .join('');

          setCurrentTranscript(transcript);

          // Check if this is the final result
          if (event.results[0].isFinal) {
            handleVoiceCommand(transcript);
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);

          if (event.error === 'not-allowed' || event.error === 'permission-denied') {
            setPermissionDenied(true);
          }
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };

        synthRef.current = window.speechSynthesis;
      } else {
        setIsSpeechSupported(false);
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Simulated audio level animation
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setAudioLevel(0);
    }
  }, [isListening]);

  const speak = (text: string) => {
    if (!synthRef.current || isMuted) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Try to find Turkish voice
    const voices = synthRef.current.getVoices();
    const turkishVoice = voices.find(voice => voice.lang.startsWith('tr'));
    if (turkishVoice) {
      utterance.voice = turkishVoice;
    }

    synthRef.current.speak(utterance);
  };

  const handleVoiceCommand = (transcript: string) => {
    setCurrentTranscript('');
    setIsProcessing(true);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: transcript,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Find matching command
    const lowerTranscript = transcript.toLowerCase();
    const matchedCommand = voiceCommands.find(cmd =>
      cmd.triggers.some(trigger => lowerTranscript.includes(trigger))
    );

    setTimeout(() => {
      const responseText = matchedCommand?.response ||
        'Anlayamadım. Motor durumu, yakıt seviyesi, navigasyon veya yardım diyerek komutları öğrenebilirsiniz.';

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        text: responseText,
        timestamp: new Date(),
        action: matchedCommand?.action
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);

      // Speak the response
      speak(responseText);
    }, 800);
  };

  const handleMicClick = () => {
    if (!isSpeechSupported) {
      alert('Tarayıcınız ses tanıma özelliğini desteklemiyor. Lütfen Chrome, Edge veya Safari kullanın.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else if (!isProcessing) {
      try {
        recognitionRef.current?.start();
      } catch (error) {
        console.error('Failed to start recognition:', error);
      }
    }
  };

  const quickCommands = [
    { icon: Thermometer, text: 'Motor durumunu göster', color: 'from-red-500 to-orange-500' },
    { icon: Fuel, text: 'Yakıt seviyesi nedir?', color: 'from-blue-500 to-cyan-500' },
    { icon: Navigation, text: 'Eve git', color: 'from-green-500 to-emerald-500' },
    { icon: Wind, text: 'Klima aç', color: 'from-purple-500 to-pink-500' },
    { icon: Music, text: 'Müzik çal', color: 'from-yellow-500 to-orange-500' },
    { icon: MapPin, text: 'Park yeri bul', color: 'from-indigo-500 to-blue-500' }
  ];

  const executeQuickCommand = (commandText: string) => {
    if (isListening || isProcessing) return;

    handleVoiceCommand(commandText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-gray-800 backdrop-blur-xl bg-black/30 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 md:gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10">
                <Logo size="sm" />
                <Radio className="w-5 h-5 text-[#E30A17]" />
              </div>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 sm:p-2.5 md:p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </motion.button>
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#E30A17] to-red-400 bg-clip-text text-transparent flex items-center gap-2">
                  Sesli Asistan
                  <Circle className={`w-2 h-2 sm:w-3 sm:h-3 ${isListening ? 'animate-pulse fill-red-500 text-red-500' : 'fill-gray-500 text-gray-500'}`} />
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-1">
                  {isListening ? 'Dinliyorum...' : isProcessing ? 'İşleniyor...' : 'Gerçek ses tanıma aktif'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />}
              <span className="text-sm sm:text-base md:text-lg">{isMuted ? 'Sessiz' : 'Sesli Yanıt'}</span>
            </button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
        {/* Permission Denied Warning */}
        {permissionDenied && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 sm:mb-6 p-4 sm:p-5 md:p-6 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 sm:gap-4"
          >
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-bold text-red-400 mb-1 text-sm sm:text-base md:text-lg">Mikrofon İzni Gerekli</h4>
              <p className="text-xs sm:text-sm md:text-base text-gray-300">
                Sesli asistan özelliğini kullanabilmek için tarayıcı ayarlarından mikrofon erişimi vermeniz gerekmektedir.
                Chrome: Adres çubuğundaki kilit ikonuna tıklayın ve mikrofon izni verin.
              </p>
            </div>
          </motion.div>
        )}

        {/* Browser Support Warning */}
        {!isSpeechSupported && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 sm:mb-6 p-4 sm:p-5 md:p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-start gap-3 sm:gap-4"
          >
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-bold text-yellow-400 mb-1 text-sm sm:text-base md:text-lg">Tarayıcı Desteği Yok</h4>
              <p className="text-xs sm:text-sm md:text-base text-gray-300">
                Tarayıcınız ses tanıma özelliğini desteklemiyor. Lütfen Chrome, Edge veya Safari kullanın.
              </p>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Left Sidebar - Quick Commands */}
          <div className="lg:col-span-1 space-y-3 sm:space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-700"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#E30A17]" />
                Hızlı Komutlar
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {quickCommands.map((cmd, index) => (
                  <motion.button
                    key={index}
                    onClick={() => executeQuickCommand(cmd.text)}
                    disabled={isListening || isProcessing}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full min-h-[48px] p-3 sm:p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-[#E30A17] transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${cmd.color} flex items-center justify-center flex-shrink-0`}>
                        <cmd.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <span className="text-xs sm:text-sm md:text-base group-hover:text-[#E30A17] transition-colors">{cmd.text}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-2xl p-4 sm:p-6 md:p-8 border border-blue-500/30"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-400" />
                Nasıl Çalışır?
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Mikrofon butonuna basın</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Türkçe komutunuzu söyleyin</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>AI anında yanıt verecek</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Yanıt otomatik seslendirilir</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Veya hızlı komutları kullanın</span>
                </li>
              </ul>
            </motion.div>

            {/* Example Commands */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 rounded-2xl p-4 sm:p-6 md:p-8 border border-purple-500/30"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 flex items-center gap-2">
                <Mic className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-400" />
                Örnek Komutlar
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>"Motor durumu nedir?"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>"Yakıt seviyesi göster"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>"Eve git"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>"Klima aç"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>"Park yeri bul"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>"Yardım"</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
            {/* Voice Visualizer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-gray-700"
            >
              <div className="text-center">
                {/* Microphone Button */}
                <div className="relative inline-block mb-4 sm:mb-6 md:mb-8">
                  {/* Pulsing rings when listening */}
                  {isListening && (
                    <>
                      <motion.div
                        animate={{ scale: [1, 2, 2], opacity: [0.5, 0, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 rounded-full bg-red-500"
                      />
                      <motion.div
                        animate={{ scale: [1, 2.5, 2.5], opacity: [0.3, 0, 0] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                        className="absolute inset-0 rounded-full bg-red-500"
                      />
                    </>
                  )}

                  <motion.button
                    onClick={handleMicClick}
                    disabled={isProcessing}
                    whileHover={{ scale: isProcessing ? 1 : 1.05 }}
                    whileTap={{ scale: isProcessing ? 1 : 0.95 }}
                    className={`relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full flex items-center justify-center shadow-2xl transition-all ${
                      isListening
                        ? 'bg-gradient-to-br from-red-500 to-orange-500 shadow-red-500/50'
                        : isProcessing
                        ? 'bg-gradient-to-br from-blue-500 to-purple-500 shadow-blue-500/50'
                        : 'bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isProcessing ? (
                      <Settings className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 animate-spin" />
                    ) : (
                      <Mic className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20" />
                    )}
                  </motion.button>
                </div>

                {/* Audio Visualizer */}
                {isListening && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-end justify-center gap-0.5 sm:gap-1 h-12 sm:h-14 md:h-16 mb-3 sm:mb-4"
                  >
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: isListening
                            ? `${Math.random() * audioLevel}%`
                            : '10%'
                        }}
                        transition={{ duration: 0.1 }}
                        className="w-2 bg-gradient-to-t from-[#E30A17] to-orange-500 rounded-full"
                        style={{ minHeight: '10%' }}
                      />
                    ))}
                  </motion.div>
                )}

                {/* Current Transcript */}
                {currentTranscript && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 sm:mt-4 p-3 sm:p-4 md:p-5 bg-red-500/10 border border-red-500/30 rounded-xl"
                  >
                    <p className="text-red-400 font-medium text-sm sm:text-base md:text-lg">{currentTranscript}</p>
                  </motion.div>
                )}

                {!isListening && !isProcessing && messages.length === 0 && (
                  <div className="space-y-2">
                    <p className="text-gray-400 text-base sm:text-lg md:text-xl">
                      Mikrofona dokunun ve Türkçe konuşun
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm md:text-base">
                      Web Speech API ile gerçek ses tanıma
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Messages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700 overflow-hidden"
            >
              <div className="p-4 sm:p-6 border-b border-gray-700">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Konuşma Geçmişi</h3>
              </div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 max-h-64 sm:max-h-80 md:max-h-96 overflow-y-auto">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 md:p-5 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-[#E30A17] to-red-600 text-white'
                            : 'bg-gray-700 text-white'
                        }`}
                      >
                        <p className="text-xs sm:text-sm md:text-base mb-1">{message.text}</p>
                        {message.action && (
                          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/20">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                            <span className="text-xs sm:text-sm text-gray-300">{message.action}</span>
                          </div>
                        )}
                        <p className="text-xs opacity-60 mt-2">
                          {message.timestamp.toLocaleTimeString('tr-TR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {messages.length === 0 && (
                  <div className="text-center py-8 sm:py-12 text-gray-500">
                    <Mic className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto mb-3 sm:mb-4 opacity-50" />
                    <p className="text-sm sm:text-base md:text-lg">Henüz konuşma yok. Mikrofonu kullanarak başlayın!</p>
                    <p className="text-xs sm:text-sm mt-2">Örnek: "Merhaba" veya "Motor durumu nedir?"</p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 sm:mt-12 md:mt-16 p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl bg-gradient-to-r from-[#E30A17] to-red-600 text-center"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-3 sm:mb-4">Gerçek Deneyimi Yaşayın</h3>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 opacity-90">
            Araçınızda tam özellikli sesli asistan ile tanışın
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto min-h-[48px] px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-full bg-white text-[#E30A17] font-bold text-base sm:text-lg md:text-xl hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2 sm:gap-3"
              >
                <Car className="w-5 h-5 sm:w-6 sm:h-6" />
                Dashboard Başlat
              </motion.button>
            </Link>
            <Link href="/beta" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto min-h-[48px] px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-full bg-black/30 border-2 border-white text-white font-bold text-base sm:text-lg md:text-xl hover:bg-black/50 transition-colors inline-flex items-center justify-center gap-2 sm:gap-3"
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                Beta Programı
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
