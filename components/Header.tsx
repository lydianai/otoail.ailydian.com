'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car, Menu, X, ChevronDown, Home, Zap, TestTube, LayoutDashboard,
  Info, Mail, FileText, Shield, Scale, Sparkles, Activity, Radio,
  BatteryCharging, Bell
} from 'lucide-react';
import Link from 'next/link';
import Logo from './Logo';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems = [
    {
      label: 'Ana Sayfa',
      href: '/',
      icon: Home,
    },
    {
      label: 'Demolar',
      icon: Zap,
      dropdown: [
        { label: 'Demo Ana Sayfa', href: '/demo', icon: Sparkles },
        { label: 'Tesla Demo', href: '/tesla-demo', icon: Zap },
        { label: 'ADAS Demo', href: '/adas-demo', icon: Activity },
        { label: 'Sesli Demo', href: '/sesli-demo', icon: Radio },
        { label: 'Tesla Pro', href: '/tesla-pro', icon: BatteryCharging },
        { label: 'EV Alarmlar Demo', href: '/ev-alarms-demo', icon: Bell },
      ],
    },
    {
      label: 'Beta',
      href: '/beta',
      icon: TestTube,
    },
    {
      label: 'Hakkımızda',
      icon: Info,
      dropdown: [
        { label: 'Hakkımızda', href: '/hakkimizda', icon: Info },
        { label: 'İletişim', href: '/iletisim', icon: Mail },
      ],
    },
    {
      label: 'Yasal',
      icon: Scale,
      dropdown: [
        { label: 'Gizlilik Politikası', href: '/gizlilik', icon: Shield },
        { label: 'KVKK', href: '/kvkk', icon: Shield },
        { label: 'Kullanım Şartları', href: '/kullanim-sartlari', icon: FileText },
      ],
    },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="group transition-transform hover:scale-105">
              <Logo size="sm" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuItems.map((item, idx) => (
                <div
                  key={idx}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:text-[#E30A17] hover:bg-gray-50 transition-all font-medium"
                    >
                      {item.icon && <item.icon className="w-4 h-4" />}
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:text-[#E30A17] hover:bg-gray-50 transition-all font-medium"
                    >
                      {item.icon && <item.icon className="w-4 h-4" />}
                      {item.label}
                      {item.dropdown && <ChevronDown className="w-4 h-4" />}
                    </button>
                  )}

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 overflow-hidden"
                    >
                      {item.dropdown.map((dropItem, dropIdx) => {
                        const DropIcon = dropItem.icon;
                        return (
                          <Link
                            key={dropIdx}
                            href={dropItem.href}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:text-[#E30A17] hover:bg-gray-50 transition-all font-medium"
                          >
                            {DropIcon && <DropIcon className="w-4 h-4" />}
                            {dropItem.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <Link
              href="/dashboard"
              className="hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E30A17] to-red-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-red-500/50 transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard Aç
            </Link>

            {/* Mobile Menu Button - Premium Automotive Toggle */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative p-3 rounded-xl bg-gradient-to-br from-[#E30A17] to-red-700 shadow-lg hover:shadow-xl hover:shadow-red-500/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? (
                <motion.div
                  initial={{ rotate: 0, scale: 0 }}
                  animate={{ rotate: 90, scale: 1 }}
                  exit={{ rotate: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <X className="w-6 h-6 text-white" strokeWidth={3} />
                </motion.div>
              ) : (
                <motion.svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  initial={{ rotate: 0 }}
                  animate={{
                    rotate: [0, -5, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Steering Wheel Design */}
                  <motion.circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="2.5"
                    fill="none"
                    animate={{
                      strokeDasharray: ["0, 100", "63, 100"],
                      rotate: [0, 360]
                    }}
                    transition={{
                      strokeDasharray: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                    }}
                  />
                  <motion.circle
                    cx="12"
                    cy="12"
                    r="4"
                    fill="white"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  {/* Steering Wheel Spokes */}
                  <motion.line
                    x1="12"
                    y1="8"
                    x2="12"
                    y2="2"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.line
                    x1="12"
                    y1="16"
                    x2="12"
                    y2="22"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.line
                    x1="8"
                    y1="12"
                    x2="2"
                    y2="12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                  <motion.line
                    x1="16"
                    y1="12"
                    x2="22"
                    y2="12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  />
                </motion.svg>
              )}

              {/* Pulsing Ring Effect */}
              {!mobileMenuOpen && (
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-white/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              style={{ top: '64px' }}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-16 right-0 bottom-0 w-full sm:w-80 bg-white shadow-2xl z-50 overflow-y-auto lg:hidden"
            >
              <div className="p-6 space-y-2">
                {menuItems.map((item, idx) => (
                  <div key={idx}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:text-[#E30A17] hover:bg-gray-50 transition-all font-medium"
                      >
                        {item.icon && <item.icon className="w-5 h-5" />}
                        {item.label}
                      </Link>
                    ) : (
                      <div>
                        <button
                          onClick={() =>
                            setActiveDropdown(activeDropdown === item.label ? null : item.label)
                          }
                          className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-gray-700 hover:text-[#E30A17] hover:bg-gray-50 transition-all font-medium"
                        >
                          <div className="flex items-center gap-3">
                            {item.icon && <item.icon className="w-5 h-5" />}
                            {item.label}
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              activeDropdown === item.label ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {/* Mobile Dropdown */}
                        <AnimatePresence>
                          {item.dropdown && activeDropdown === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-8 pr-4 py-2 space-y-1">
                                {item.dropdown.map((dropItem, dropIdx) => {
                                  const DropIcon = dropItem.icon;
                                  return (
                                    <Link
                                      key={dropIdx}
                                      href={dropItem.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:text-[#E30A17] hover:bg-gray-50 transition-all"
                                    >
                                      {DropIcon && <DropIcon className="w-4 h-4" />}
                                      {dropItem.label}
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile CTA */}
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#E30A17] to-red-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-red-500/50 transition-all mt-4"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard Aç
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16" />
    </>
  );
}
