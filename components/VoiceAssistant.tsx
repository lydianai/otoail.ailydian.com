'use client';

// ============================================
// TÜRK OTO AI - Self-Learning Voice Assistant
// Based on voice.ailydian.com architecture
// ============================================

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, Radio, Loader2, Brain } from 'lucide-react';

// ==================== Types ====================
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
}

interface UserPreferences {
  dialect?: string;
  responseStyle?: 'formal' | 'casual' | 'technical';
  topics?: string[];
}

interface LearningInsights {
  detectedIntent: string;
  preferredTopics: string[];
  responseStyle: string;
}

// ==================== Component ====================
export default function VoiceAssistant() {
  // ==================== State ====================
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecognitionActive, setIsRecognitionActive] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    responseStyle: 'casual',
    topics: [],
  });
  const [learningInsights, setLearningInsights] = useState<LearningInsights | null>(null);

  // Voice settings (optimized for Turkish)
  const [voiceSettings] = useState<VoiceSettings>({
    rate: 0.95,
    pitch: 1.05,
    volume: 1.0,
  });

  // ==================== Refs ====================
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const recognitionRestartTimeout = useRef<NodeJS.Timeout | null>(null);

  // ==================== Initialize Speech APIs ====================
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Speech Synthesis
    synthesisRef.current = window.speechSynthesis;
    loadVoices();

    // Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Tarayıcınız ses tanımayı desteklemiyor');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'tr-TR';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    // Recognition event handlers
    recognition.onstart = () => {
      setIsRecognitionActive(true);
      setError(null);
      console.log('🎤 Dinleme başladı');
    };

    recognition.onend = () => {
      setIsRecognitionActive(false);
      console.log('🔴 Dinleme durdu');

      // Auto-restart if still in listening mode and not speaking/processing
      if (isListening && !isProcessing && !isSpeaking) {
        setTimeout(() => {
          if (isListening && !isRecognitionActive && !isProcessing && !isSpeaking) {
            try {
              recognition.start();
              console.log('🔄 Otomatik yeniden başlatıldı');
            } catch (e) {
              console.warn('Yeniden başlatma hatası:', e);
            }
          }
        }, 300);
      }
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setCurrentTranscript(interimTranscript || finalTranscript);

      if (finalTranscript) {
        console.log('✅ Final transcript:', finalTranscript);
        handleVoiceInput(finalTranscript);
        setCurrentTranscript('');
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Recognition error:', event.error);

      if (event.error === 'no-speech') {
        // Ignore no-speech errors
        return;
      }

      if (event.error !== 'aborted') {
        setError(`Ses tanıma hatası: ${event.error}`);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (recognitionRestartTimeout.current) {
        clearTimeout(recognitionRestartTimeout.current);
      }
    };
  }, []); // Empty dependency array - only run once on mount

  // ==================== Load Voices ====================
  const loadVoices = () => {
    if (!synthesisRef.current) return;

    const voices = synthesisRef.current.getVoices();
    if (voices.length > 0) {
      setVoicesLoaded(true);
      console.log('✅ Sesler yüklendi:', voices.length);
    } else {
      synthesisRef.current.onvoiceschanged = () => {
        setVoicesLoaded(true);
        console.log('✅ Sesler yüklendi (async)');
      };
    }
  };

  // ==================== Select Best Turkish Voice ====================
  const selectTurkishVoice = (): SpeechSynthesisVoice | null => {
    if (!synthesisRef.current) return null;

    const voices = synthesisRef.current.getVoices();

    // Priority order: Microsoft Yelda > Google Turkish Female > any tr-TR
    const priorities = [
      'Microsoft Yelda',
      'Google Türkçe',
      'tr-TR',
    ];

    for (const priority of priorities) {
      const voice = voices.find(v =>
        v.name.includes(priority) || v.lang.includes('tr-TR')
      );
      if (voice) {
        console.log('🗣️ Selected voice:', voice.name);
        return voice;
      }
    }

    return voices[0] || null;
  };

  // ==================== Handle Voice Input ====================
  const handleVoiceInput = async (text: string) => {
    if (isProcessing) {
      console.warn('⚠️ Zaten işleniyor, yok sayıldı');
      return;
    }

    setIsProcessing(true);
    setIsListening(false);

    // Stop recognition during processing
    if (recognitionRef.current && isRecognitionActive) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn('Stop error:', e);
      }
    }

    // Add user message to conversation
    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setConversation(prev => [...prev, userMessage]);

    try {
      // Call API with self-learning
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory: conversation.map(m => ({
            role: m.role,
            content: m.content,
          })),
          userPreferences,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'API yanıt hatası');
      }

      // Update learning insights
      if (data.learningInsights) {
        setLearningInsights(data.learningInsights);

        // Update user preferences based on learning
        setUserPreferences(prev => ({
          ...prev,
          responseStyle: data.learningInsights.responseStyle,
          topics: Array.from(new Set([
            ...(prev.topics || []),
            ...data.learningInsights.preferredTopics,
          ])),
        }));

        console.log('🧠 Learning updated:', data.learningInsights);
      }

      // Add assistant response to conversation
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };
      setConversation(prev => [...prev, assistantMessage]);

      // Speak response
      speak(data.response);

    } catch (error: any) {
      console.error('❌ API Error:', error);
      setError(error.message);

      const errorMessage = 'Üzgünüm, şu anda bağlantı sorunu yaşıyorum.';
      speak(errorMessage);

      setConversation(prev => [...prev, {
        role: 'assistant',
        content: errorMessage,
        timestamp: new Date(),
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  // ==================== Speak Function ====================
  const speak = (text: string) => {
    if (!synthesisRef.current || !voicesLoaded) {
      console.warn('Synthesis not ready');
      setTimeout(() => setIsListening(true), 1000);
      return;
    }

    // Cancel any ongoing speech
    synthesisRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = selectTurkishVoice();

    if (voice) {
      utterance.voice = voice;
    }

    utterance.rate = voiceSettings.rate;
    utterance.pitch = voiceSettings.pitch;
    utterance.volume = voiceSettings.volume;
    utterance.lang = 'tr-TR';

    utterance.onstart = () => {
      setIsSpeaking(true);
      console.log('🗣️ Konuşma başladı');
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      console.log('✅ Konuşma bitti');

      // Resume listening after speech
      setTimeout(() => {
        setIsListening(true);
      }, 1000);
    };

    utterance.onerror = (event) => {
      console.error('Speech error:', event);
      setIsSpeaking(false);
      setTimeout(() => setIsListening(true), 1000);
    };

    synthesisRef.current.speak(utterance);
  };

  // ==================== Toggle Listening ====================
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      if (recognitionRef.current && isRecognitionActive) {
        recognitionRef.current.stop();
      }
    } else {
      setIsListening(true);
      setError(null);
      if (recognitionRef.current && !isRecognitionActive && !isProcessing && !isSpeaking) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.error('Start error:', e);
        }
      }
    }
  };

  // ==================== Auto-start recognition when listening ====================
  useEffect(() => {
    if (isListening && !isRecognitionActive && !isProcessing && !isSpeaking && recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Start error:', e);
      }
    }
  }, [isListening, isRecognitionActive, isProcessing, isSpeaking]);

  // ==================== Clear Conversation ====================
  const clearConversation = () => {
    setConversation([]);
    setUserPreferences({ responseStyle: 'casual', topics: [] });
    setLearningInsights(null);
  };

  // ==================== Render ====================
  return (
    <div className="relative w-full max-w-4xl mx-auto p-6">
      {/* Voice Button */}
      <div className="relative flex flex-col items-center">
        {/* Learning Indicator */}
        {learningInsights && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[#E30A17]/10 border border-[#E30A17]/20 flex items-center gap-2"
          >
            <Brain className="w-4 h-4 text-[#E30A17]" />
            <span className="text-xs text-[#E30A17] font-semibold">
              Öğreniyor: {learningInsights.detectedIntent}
            </span>
          </motion.div>
        )}

        {/* Main Voice Button */}
        <motion.button
          onClick={toggleListening}
          disabled={isProcessing}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          {/* Pulse Animation */}
          <AnimatePresence>
            {isListening && (
              <>
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-[#E30A17]"
                />
                <motion.div
                  initial={{ scale: 1, opacity: 0.3 }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute inset-0 rounded-full bg-[#E30A17]"
                />
              </>
            )}
          </AnimatePresence>

          {/* Button Content */}
          <div className={`relative w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all ${
            isListening
              ? 'bg-[#E30A17] shadow-[0_0_30px_rgba(227,10,23,0.6)]'
              : isProcessing
              ? 'bg-gray-400'
              : 'bg-white border-2 border-[#E30A17]'
          }`}>
            {isProcessing ? (
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            ) : isListening ? (
              <Mic className="w-10 h-10 text-white" />
            ) : (
              <MicOff className="w-10 h-10 text-[#E30A17]" />
            )}
          </div>
        </motion.button>

        {/* Status Text */}
        <div className="mt-4 text-center">
          <p className="text-sm font-semibold text-gray-900">
            {isProcessing ? 'İşleniyor...' : isListening ? 'Dinliyorum...' : isSpeaking ? 'Konuşuyorum...' : 'Dinlemeye başla'}
          </p>
          {currentTranscript && (
            <p className="text-xs text-gray-500 mt-1">{currentTranscript}</p>
          )}
          {error && (
            <p className="text-xs text-red-600 mt-1">{error}</p>
          )}
        </div>
      </div>

      {/* Conversation History */}
      {conversation.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 space-y-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Konuşma Geçmişi</h3>
            <button
              onClick={clearConversation}
              className="text-sm text-[#E30A17] hover:underline"
            >
              Temizle
            </button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {conversation.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-[#E30A17] text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* User Preferences Display */}
      {userPreferences.topics && userPreferences.topics.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-[#E30A17]" />
            <span className="text-sm font-semibold text-gray-900">Öğrenilen Tercihler</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {userPreferences.topics.map((topic, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-[#E30A17]/10 text-xs text-[#E30A17] font-medium">
                {topic}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
