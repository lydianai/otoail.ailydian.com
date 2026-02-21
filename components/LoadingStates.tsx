'use client';

// ============================================
// TÜRK OTO AI - Loading States & Skeleton Components
// Premium loading animations and skeleton screens
// ============================================

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// ====================
// Skeleton Components
// ====================

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded-xl w-1/3 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded-lg w-full"></div>
        <div className="h-4 bg-gray-200 rounded-lg w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded-lg w-4/6"></div>
      </div>
    </div>
  );
}

export function SkeletonGauge() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gray-200"></div>
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded-xl w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded-lg w-1/3"></div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded-xl w-1/4 mb-6"></div>
      <div className="space-y-2">
        {[40, 60, 80, 70, 90, 50, 75].map((height, i) => (
          <div key={i} className="flex items-end gap-2">
            <div className="flex-1 bg-gray-200 rounded-t-lg" style={{ height: `${height}px` }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonList() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded-xl w-1/3 mb-4"></div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded-lg w-2/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded-lg w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ====================
// Full Page Loader
// ====================

export function FullPageLoader({ message = 'Yükleniyor...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        {/* Animated Logo/Spinner */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="w-24 h-24 mx-auto mb-6"
        >
          <div className="w-full h-full rounded-full border-4 border-gray-700 border-t-[#E30A17] border-r-[#E30A17]"></div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-black text-white mb-2"
        >
          TÜRK OTO AI
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 font-semibold"
        >
          {message}
        </motion.p>

        {/* Progress Dots */}
        <div className="flex gap-2 justify-center mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 rounded-full bg-[#E30A17]"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ====================
// Inline Loader
// ====================

export function InlineLoader({
  size = 'medium',
  color = '#E30A17',
  message,
}: {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  message?: string;
}) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };

  return (
    <div className="flex items-center gap-3">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className={sizeClasses[size]} style={{ color }} />
      </motion.div>
      {message && <span className="text-sm font-semibold text-gray-600">{message}</span>}
    </div>
  );
}

// ====================
// Progress Bar
// ====================

export function ProgressBar({
  progress,
  showPercentage = true,
  color = '#E30A17',
  height = 8,
}: {
  progress: number;
  showPercentage?: boolean;
  color?: string;
  height?: number;
}) {
  return (
    <div className="w-full">
      {showPercentage && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-600">İlerleme</span>
          <span className="text-sm font-bold" style={{ color }}>
            {Math.round(progress)}%
          </span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full overflow-hidden" style={{ height: `${height}px` }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// ====================
// Shimmer Effect
// ====================

export function Shimmer({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
      <motion.div
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
      />
    </div>
  );
}

// ====================
// Pulse Loader
// ====================

export function PulseLoader({ color = '#E30A17' }: { color?: string }) {
  return (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

// ====================
// Connecting Animation
// ====================

export function ConnectingAnimation() {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        className="w-3 h-3 rounded-full bg-blue-500"
      />
      <motion.div
        animate={{
          scaleX: [0, 1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        className="h-0.5 w-8 bg-blue-500 origin-left"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 0.75,
        }}
        className="w-3 h-3 rounded-full bg-green-500"
      />
    </div>
  );
}

// ====================
// Dashboard Loading State
// ====================

export function DashboardLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="bg-white rounded-3xl shadow-xl p-6 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200"></div>
              <div>
                <div className="h-8 bg-gray-200 rounded-xl w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-32"></div>
              </div>
            </div>
            <div className="w-32 h-12 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonGauge />
          <SkeletonGauge />
          <SkeletonGauge />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>

        {/* Chart Section */}
        <SkeletonChart />
      </div>
    </div>
  );
}
