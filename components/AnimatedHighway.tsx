'use client';

import { motion } from 'framer-motion';

export default function AnimatedHighway() {
  return (
    <div className="absolute top-0 left-0 right-0 h-32 sm:h-40 md:h-32 lg:h-28 overflow-hidden pointer-events-none z-20 bg-gradient-to-b from-gray-900 via-gray-800 to-transparent">
      {/* 3-Lane Highway with Perspective */}
      <div className="absolute top-0 left-0 right-0 h-full">
        {/* Road Surface - Realistic Asphalt */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 opacity-50" />

        {/* Road Texture Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, #fff 2px, #fff 3px)',
        }} />

        {/* Lane Dividers - Animated Dashes (3 lanes) */}
        {/* Lane 1-2 divider */}
        <div className="absolute top-8 sm:top-12 md:top-10 lg:top-8 left-0 right-0 h-1 flex gap-8">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`lane1-${i}`}
              className="w-12 sm:w-16 h-1 bg-yellow-300/70 rounded-full shadow-lg"
              initial={{ x: '100vw' }}
              animate={{ x: '-200px' }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5
              }}
            />
          ))}
        </div>

        {/* Lane 2-3 divider */}
        <div className="absolute top-20 sm:top-28 md:top-20 lg:top-18 left-0 right-0 h-1 flex gap-8">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`lane2-${i}`}
              className="w-12 sm:w-16 h-1 bg-yellow-300/70 rounded-full shadow-lg"
              initial={{ x: '100vw' }}
              animate={{ x: '-200px' }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5
              }}
            />
          ))}
        </div>
      </div>

      {/* Car 1: Modern Sedan (Red) - Lane 1 */}
      <motion.div
        className="absolute top-1 sm:top-2 md:top-1 lg:top-0"
        initial={{ x: '-20%' }}
        animate={{ x: '120%' }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 0
        }}
      >
        <svg className="w-24 h-12 sm:w-32 sm:h-16 md:w-40 md:h-20 drop-shadow-2xl" viewBox="0 0 200 100">
          <defs>
            <linearGradient id="carBody1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C00000" />
              <stop offset="50%" stopColor="#E30A17" />
              <stop offset="100%" stopColor="#C00000" />
            </linearGradient>
            <radialGradient id="headlight">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="50%" stopColor="#FFE66D" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
            </radialGradient>
            <filter id="carShadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
              <feOffset dx="0" dy="4" result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.4"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Shadow */}
          <ellipse cx="100" cy="95" rx="70" ry="8" fill="#000" opacity="0.3" />

          {/* Car Body - Modern Sedan */}
          <g filter="url(#carShadow)">
            {/* Main Body */}
            <path d="M 30,75 Q 25,70 30,60 L 40,45 Q 50,35 70,35 L 130,35 Q 150,35 160,45 L 170,60 Q 175,70 170,75 Z"
                  fill="url(#carBody1)" stroke="#8B0000" strokeWidth="1.5"/>

            {/* Roof/Cabin */}
            <path d="M 60,45 Q 65,38 80,37 L 120,37 Q 135,38 140,45 L 145,55 Q 148,60 140,60 L 60,60 Q 52,60 55,55 Z"
                  fill="#B00000" stroke="#8B0000" strokeWidth="1"/>

            {/* Windshield - Front */}
            <path d="M 70,35 L 75,42 L 90,42 L 88,35 Z" fill="#4A9FE2" opacity="0.7" />

            {/* Windshield - Rear */}
            <path d="M 112,35 L 125,42 L 130,35 Z" fill="#4A9FE2" opacity="0.7" />

            {/* Side Windows */}
            <path d="M 62,48 L 68,52 L 82,52 L 85,58 L 62,58 Z" fill="#87CEEB" opacity="0.6" />
            <path d="M 115,52 L 130,52 L 138,48 L 138,58 L 115,58 Z" fill="#87CEEB" opacity="0.6" />

            {/* Door Lines */}
            <line x1="90" y1="45" x2="88" y2="70" stroke="#8B0000" strokeWidth="1.5" opacity="0.8"/>
            <line x1="110" y1="45" x2="112" y2="70" stroke="#8B0000" strokeWidth="1.5" opacity="0.8"/>

            {/* Wheels - Detailed */}
            <g>
              {/* Front Wheel */}
              <circle cx="55" cy="78" r="12" fill="#1a1a1a" stroke="#E30A17" strokeWidth="2.5" />
              <circle cx="55" cy="78" r="8" fill="#2a2a2a" />
              <circle cx="55" cy="78" r="4" fill="#444" />
              <path d="M 55,70 L 55,86 M 47,78 L 63,78 M 51,72 L 59,84 M 51,84 L 59,72" stroke="#666" strokeWidth="1.2" />

              {/* Rear Wheel */}
              <circle cx="145" cy="78" r="12" fill="#1a1a1a" stroke="#E30A17" strokeWidth="2.5" />
              <circle cx="145" cy="78" r="8" fill="#2a2a2a" />
              <circle cx="145" cy="78" r="4" fill="#444" />
              <path d="M 145,70 L 145,86 M 137,78 L 153,78 M 141,72 L 149,84 M 141,84 L 149,72" stroke="#666" strokeWidth="1.2" />
            </g>

            {/* Headlights - Glowing */}
            <circle cx="175" cy="62" r="6" fill="url(#headlight)" opacity="0.95"/>
            <circle cx="175" cy="68" r="5" fill="#FFD700" opacity="0.9"/>

            {/* Taillights */}
            <rect x="26" y="62" width="4" height="8" rx="2" fill="#FF0000" opacity="0.9"/>
            <rect x="26" y="70" width="4" height="4" rx="1" fill="#FFA500" opacity="0.8"/>

            {/* Side Mirror */}
            <ellipse cx="145" cy="52" rx="5" ry="3" fill="#8B0000" stroke="#6B0000" strokeWidth="0.8"/>
          </g>
        </svg>
      </motion.div>

      {/* Car 2: SUV (Blue) - Lane 2 */}
      <motion.div
        className="absolute top-8 sm:top-12 md:top-9 lg:top-7"
        initial={{ x: '-20%' }}
        animate={{ x: '120%' }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          delay: 8
        }}
      >
        <svg className="w-28 h-14 sm:w-36 sm:h-18 md:w-44 md:h-22 drop-shadow-2xl" viewBox="0 0 220 110">
          <defs>
            <linearGradient id="suvBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0A3D62" />
              <stop offset="50%" stopColor="#1565C0" />
              <stop offset="100%" stopColor="#0A3D62" />
            </linearGradient>
          </defs>

          {/* Shadow */}
          <ellipse cx="110" cy="102" rx="80" ry="8" fill="#000" opacity="0.3" />

          {/* SUV Body */}
          <g filter="url(#carShadow)">
            {/* Main Body - Taller SUV Profile */}
            <path d="M 30,80 Q 25,75 30,55 L 45,35 Q 55,25 80,25 L 140,25 Q 165,25 175,35 L 190,55 Q 195,75 190,80 Z"
                  fill="url(#suvBody)" stroke="#062847" strokeWidth="2"/>

            {/* Roof/Cabin - Higher */}
            <path d="M 65,35 Q 70,28 90,27 L 130,27 Q 150,28 155,35 L 162,50 Q 165,55 155,55 L 65,55 Q 57,55 60,50 Z"
                  fill="#0D47A1" stroke="#062847" strokeWidth="1.2"/>

            {/* Large Windshield */}
            <path d="M 80,25 L 88,32 L 135,32 L 140,25 Z" fill="#4A9FE2" opacity="0.65" />

            {/* Side Windows - Larger */}
            <path d="M 68,38 L 75,45 L 95,45 L 98,52 L 68,52 Z" fill="#6BB6FF" opacity="0.55" />
            <path d="M 125,45 L 148,45 L 158,38 L 158,52 L 125,52 Z" fill="#6BB6FF" opacity="0.55" />

            {/* SUV Character Line */}
            <path d="M 35,60 Q 65,58 110,58 Q 155,58 185,60" stroke="#1976D2" strokeWidth="1.5" fill="none"/>

            {/* Larger SUV Wheels */}
            <g>
              {/* Front Wheel */}
              <circle cx="60" cy="83" r="14" fill="#1a1a1a" stroke="#0D47A1" strokeWidth="3" />
              <circle cx="60" cy="83" r="10" fill="#2a2a2a" />
              <circle cx="60" cy="83" r="5" fill="#444" />
              <path d="M 60,71 L 60,95 M 48,83 L 72,83" stroke="#555" strokeWidth="1.5" />

              {/* Rear Wheel */}
              <circle cx="160" cy="83" r="14" fill="#1a1a1a" stroke="#0D47A1" strokeWidth="3" />
              <circle cx="160" cy="83" r="10" fill="#2a2a2a" />
              <circle cx="160" cy="83" r="5" fill="#444" />
              <path d="M 160,71 L 160,95 M 148,83 L 172,83" stroke="#555" strokeWidth="1.5" />
            </g>

            {/* LED Headlights */}
            <rect x="192" y="58" width="6" height="10" rx="2" fill="#FFFFFF" opacity="0.95"/>
            <circle cx="195" cy="72" r="4" fill="#FFE66D" opacity="0.9"/>

            {/* Roof Rails */}
            <rect x="70" y="29" width="80" height="2" rx="1" fill="#8B8B8B" opacity="0.7"/>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
