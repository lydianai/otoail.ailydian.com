'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { Calendar, User, ArrowRight, TrendingUp, Shield, Brain, Zap } from 'lucide-react';

export default function TurkishBlogPage() {
  const posts = [
    {
      title: 'Türkiye Sağlık Sisteminde Yapay Zeka: 2025 Trendleri',
      excerpt: 'Yapay zeka ve makine öğrenimi Türkiye sağlık hizmetlerini nasıl dönüştürüyor. e-Nabız entegrasyonundan klinik karar desteğine kadar bilmeniz gerekenler.',
      category: 'Yapay Zeka',
      date: '15 Aralık 2025',
      author: 'Dr. Ayşe Demir',
      icon: Brain,
      color: 'red'
    },
    {
      title: 'KVKK Uyumluluğu: Sağlık Tesisleri için Rehber',
      excerpt: 'Türkiye Kişisel Verilerin Korunması Kanunu (KVKK) ve sağlık tesislerinin hasta verilerini korumak için bilmesi gereken tüm gereklilikler.',
      category: 'Uyumluluk',
      date: '10 Aralık 2025',
      author: 'Av. Mehmet Kaya',
      icon: Shield,
      color: 'rose'
    },
    {
      title: 'e-Nabız Entegrasyonu: En İyi Uygulamalar',
      excerpt: 'T.C. Sağlık Bakanlığı e-Nabız sistemi ile entegrasyon için kapsamlı kılavuz. HL7 v2.x mesajlaşma ve otomatik raporlama.',
      category: 'Entegrasyon',
      date: '5 Aralık 2025',
      author: 'Mühendis Zeynep Yılmaz',
      icon: Zap,
      color: 'red'
    },
    {
      title: 'SGK Medula ile Otomatik Faturalandırma',
      excerpt: 'Sosyal Güvenlik Kurumu Medula provizyon ve fatura sistemleri ile entegrasyonu optimize edin. Faturalandırma döngüsünü %40 hızlandırın.',
      category: 'Gelir Döngüsü',
      date: '1 Aralık 2025',
      author: 'Ahmet Özkan',
      icon: TrendingUp,
      color: 'rose'
    },
    {
      title: 'Telesağlık Hizmetlerinde Yükseliş',
      excerpt: 'COVID-19 sonrası telesağlık benimsenmesi. Türkiye\'de uzaktan hasta izleme ve sanal konsültasyonların geleceği.',
      category: 'Telesağlık',
      date: '25 Kasım 2025',
      author: 'Dr. Can Arslan',
      icon: Brain,
      color: 'red'
    },
    {
      title: 'Hastane Verimliliğini Artırmanın 10 Yolu',
      excerpt: 'Operasyonel verimliliği artırmak, maliyetleri azaltmak ve hasta memnuniyetini artırmak için kanıtlanmış stratejiler.',
      category: 'Operasyonlar',
      date: '20 Kasım 2025',
      author: 'Sağlık Yönetim Ekibi',
      icon: TrendingUp,
      color: 'rose'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Median <span className="bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
            Sağlık BT, uyumluluk, yapay zeka ve Türkiye sağlık sistemine özgü içgörüler. Sağlık teknolojisinde en son trendler ve en iyi uygulamalar.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => {
              const Icon = post.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-red-500 hover:shadow-2xl transition-all cursor-pointer"
                >
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br from-${post.color}-500 to-${post.color}-600 flex items-center justify-center mb-6`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  <div className="mb-4">
                    <span className={`px-3 py-1 bg-${post.color}-100 text-${post.color}-700 text-xs font-bold rounded-full`}>
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-red-500 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 font-semibold mb-6">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 font-semibold">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t-2 border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-red-500 font-bold group-hover:gap-3 transition-all inline-flex items-center gap-2">
                        Devamını Oku
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-rose-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Blog Güncellemelerini Kaçırmayın
          </h2>
          <p className="text-xl text-white/90 font-semibold mb-8">
            Sağlık BT trendleri, uyumluluk güncellemeleri ve ürün haberleri için bültenimize abone olun.
          </p>
          <div className="flex gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-6 py-4 rounded-xl font-semibold focus:outline-none focus:ring-4 focus:ring-white/50"
            />
            <button className="px-8 py-4 bg-white text-red-500 rounded-xl font-black hover:shadow-2xl transition-all">
              Abone Ol
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
