'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, MicOff, Volume2, VolumeX, Brain, Zap, Settings,
  Activity, MessageSquare, Send, Loader
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  intent?: string;
  data?: any;
}

export default function VoiceAssistantPanelReal() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [vehicleId, setVehicleId] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Web Speech API başlat
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'tr-TR';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          handleVoiceInput(transcript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }

      synthRef.current = window.speechSynthesis;
    }

    // Kullanıcının varsayılan aracını al
    fetchUserVehicle();
  }, []);

  // Mesajlar güncellendiğinde scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchUserVehicle = async () => {
    try {
      const response = await fetch('/api/dashboard/stats');
      const data = await response.json();

      if (data.success && data.vehicle) {
        setVehicleId(data.vehicle.id);
      }
    } catch (error) {
      console.error('Error fetching vehicle:', error);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleVoiceInput = async (text: string) => {
    setInputText(text);
    await sendMessage(text);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Kullanıcı mesajını ekle
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsProcessing(true);

    try {
      // API'ye sorgu gönder
      const response = await fetch('/api/voice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: text,
          vehicleId,
          context: messages.slice(-5) // Son 5 mesaj için context
        })
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: data.response,
          timestamp: new Date(),
          intent: data.intent,
          data: data.data
        };

        setMessages(prev => [...prev, assistantMessage]);

        // Sesli yanıt ver
        if (!isMuted && synthRef.current) {
          speak(data.response);
        }
      } else {
        throw new Error(data.error || 'API Error');
      }
    } catch (error) {
      console.error('Error sending message:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const speak = (text: string) => {
    if (!synthRef.current) return;

    // Önceki konuşmayı durdur
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = volume / 100;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  // Önerilen sorular
  const suggestedQuestions = [
    'Araç durumu nasıl?',
    'Yakıt seviyem ne kadar?',
    'Bakım zamanı geldi mi?',
    'HGS bakiyem ne kadar?',
    'Trafik cezam var mı?',
    'En yakın şarj istasyonu nerede?',
    'Tesla için hızlı şarj istasyonları'
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{
              scale: isListening ? [1, 1.2, 1] : 1,
              rotate: isListening ? [0, 360] : 0
            }}
            transition={{ duration: 2, repeat: isListening ? Infinity : 0 }}
            className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"
          >
            <Brain className="w-6 h-6" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Sesli Asistan
            </h1>
            <p className="text-sm text-gray-400">
              {isListening ? 'Dinliyorum...' : isProcessing ? 'İşleniyor...' : 'Gerçek AI Destekli'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {!isMuted && (
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="w-24"
            />
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gray-900/50 rounded-2xl p-6 mb-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <Brain className="w-16 h-16 text-blue-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Size nasıl yardımcı olabilirim?</h2>
            <p className="text-gray-400 mb-6">
              Araç durumu, navigasyon, yakıt, bakım veya trafik hakkında sorabilirsiniz
            </p>

            {/* Önerilen Sorular */}
            <div className="grid grid-cols-2 gap-3 max-w-2xl">
              {suggestedQuestions.map((question, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => sendMessage(question)}
                  className="px-4 py-3 bg-gray-800 rounded-xl text-sm text-left hover:bg-gray-700 transition-colors"
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] px-6 py-4 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                    : 'bg-gray-800'
                }`}
              >
                <p className="text-sm mb-1">{message.content}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{message.timestamp.toLocaleTimeString('tr-TR')}</span>
                  {message.intent && (
                    <span className="px-2 py-0.5 bg-blue-500/20 rounded-full">{message.intent}</span>
                  )}
                </div>

                {/* Ekstra veri gösterimi */}
                {message.data && (
                  <div className="mt-3 p-3 bg-black/30 rounded-lg text-xs">
                    {message.intent === 'fuel_level' && (
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Yakıt Seviyesi:</span>
                          <span className="font-bold">%{message.data.fuelLevel.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tahmini Menzil:</span>
                          <span className="font-bold">{message.data.estimatedRange.toFixed(0)} km</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-gray-400"
          >
            <Loader className="w-4 h-4 animate-spin" />
            <span className="text-sm">Düşünüyorum...</span>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleListening}
          className={`p-4 rounded-xl transition-all ${
            isListening
              ? 'bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/50'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50'
          }`}
        >
          {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </motion.button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Bir şey sorun..."
          disabled={isProcessing}
          className="flex-1 px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 disabled:opacity-50"
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!inputText.trim() || isProcessing}
          className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-6 h-6" />
        </motion.button>
      </form>
    </div>
  );
}
