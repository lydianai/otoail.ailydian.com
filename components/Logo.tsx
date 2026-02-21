'use client';

import { Car, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'lg';
}

export default function Logo({ size = 'sm' }: LogoProps) {
  const isLarge = size === 'lg';

  return (
    <div className={`flex items-center ${isLarge ? 'gap-4' : 'gap-3'}`}>
      <div className="relative">
        <Car className={`${isLarge ? 'w-14 h-14' : 'w-11 h-11'} text-[#E30A17] stroke-[2.5]`} />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Zap className={`${isLarge ? 'w-6 h-6' : 'w-5 h-5'} text-yellow-400 absolute -top-1 -right-1`} />
        </motion.div>
      </div>
      <div className={`${isLarge ? 'text-4xl' : 'text-3xl'} font-black tracking-tight`}
           style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontWeight: 900 }}>
        <span className="bg-gradient-to-r from-[#E30A17] via-red-600 to-[#E30A17] bg-clip-text text-transparent drop-shadow-sm">
          LyDian
        </span>
      </div>
    </div>
  );
}
