'use client';

import { Flag, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from './Logo';
import AilydianEcosystemFooter from './AilydianEcosystemFooter';

export default function Footer() {
  const quickLinks = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Demolar', href: '/demo' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Beta', href: '/beta' },
    { label: 'Hakkımızda', href: '/hakkimizda' },
    { label: 'İletişim', href: '/iletisim' },
  ];

  const legalLinks = [
    { label: 'Gizlilik Politikası', href: '/gizlilik' },
    { label: 'KVKK', href: '/kvkk' },
    { label: 'Kullanım Şartları', href: '/kullanim-sartlari' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="relative bg-gray-900 text-white border-t border-gray-800">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Logo & About */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
              <Logo size="lg" />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Türkiye'nin yollarına özel geliştirilmiş yapay zeka destekli araç asistanı.
              Her yolculukta yanınızda, her anlamda akıllı.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Flag className="w-4 h-4 text-[#E30A17]" />
              <span>100% Yerli Teknoloji</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 text-[#E30A17]">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#E30A17] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 text-[#E30A17]">Yasal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#E30A17] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 text-[#E30A17]">İletişim</h3>
            <div className="space-y-3 mb-6">
              <a
                href="mailto:destek@turkotoai.com"
                className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 mt-0.5 text-[#E30A17] group-hover:scale-110 transition-transform" />
                <span className="break-all">destek@turkotoai.com</span>
              </a>
              <a
                href="tel:+908501234567"
                className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 mt-0.5 text-[#E30A17] group-hover:scale-110 transition-transform" />
                <span>0850 123 45 67</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 text-[#E30A17] flex-shrink-0" />
                <span>Maslak, İstanbul</span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-xs text-gray-500 mb-3 font-semibold">Sosyal Medya</p>
              <div className="flex items-center gap-2">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#E30A17] flex items-center justify-center transition-colors group"
                  >
                    <social.icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ailydian Ecosystem Cross-Links */}
      <div className="border-t border-gray-800">
        <AilydianEcosystemFooter
          currentDomain="otoai.ailydian.com"
          theme="dark"
          position="above-footer"
        />
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Flag className="w-4 h-4 text-[#E30A17]" />
              <span>© 2025 Ailydian Teknoloji A.Ş. Tüm hakları saklıdır.</span>
            </div>

            {/* Made with Love */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Türkiye'de</span>
              <span className="text-[#E30A17] text-base">❤️</span>
              <span>ile geliştirildi</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
