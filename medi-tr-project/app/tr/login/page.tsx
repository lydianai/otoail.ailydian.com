'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import DemoBanner from '@/components/DemoBanner'
import { Activity, Lock, Mail, ArrowRight, Shield, Heart, Users, Wifi } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        // Store mock auth token
        localStorage.setItem('ghp_token', 'mock-jwt-token')
        localStorage.setItem('ghp_user', JSON.stringify({
          id: '1',
          email: email,
          name: 'Dr. Ayşe Yılmaz',
          role: 'PHYSICIAN'
        }))
        router.push('/tr/dashboard')
      } else {
        setError('Lütfen e-posta ve şifrenizi girin')
        setIsLoading(false)
      }
    }, 1000)
  }

  const handleENabizLogin = () => {
    // Simulate e-Nabız login
    setIsLoading(true)
    setTimeout(() => {
      localStorage.setItem('ghp_token', 'mock-enabiz-token')
      localStorage.setItem('ghp_user', JSON.stringify({
        id: '2',
        email: 'enabiz@saglik.gov.tr',
        name: 'Dr. Ayşe Yılmaz',
        role: 'PHYSICIAN',
        loginMethod: 'e-Nabız'
      }))
      router.push('/tr/dashboard')
    }, 1500)
  }

  const handleEDevletLogin = () => {
    // Simulate e-Devlet login
    setIsLoading(true)
    setTimeout(() => {
      localStorage.setItem('ghp_token', 'mock-edevlet-token')
      localStorage.setItem('ghp_user', JSON.stringify({
        id: '3',
        email: 'edevlet@turkiye.gov.tr',
        name: 'Dr. Ayşe Yılmaz',
        role: 'PHYSICIAN',
        loginMethod: 'e-Devlet'
      }))
      router.push('/tr/dashboard')
    }, 1500)
  }

  return (
    <>
      <DemoBanner language="tr" />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-100/30 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-100/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
          {/* Left side - Branding */}
          <div className="hidden lg:flex flex-col space-y-8 p-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <Heart className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">
                    <span className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">
                      Lydian
                    </span>
                    <span className="text-gray-900 ml-1">
                      Medi
                    </span>
                  </h1>
                  <p className="text-xs text-gray-600 font-semibold">Türk Sağlık Sektörüne Özel</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="bg-blue-100 rounded-xl p-3">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Kurumsal Güvenlik</h3>
                  <p className="text-sm text-gray-600">KVKK uyumlu, uçtan uca şifreleme ile korumalı</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="bg-purple-100 rounded-xl p-3">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Hasta Odaklı Bakım</h3>
                  <p className="text-sm text-gray-600">Kapsamlı EHR sistemi ile gerçek zamanlı işbirliği</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="bg-green-100 rounded-xl p-3">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Medula & e-Nabız Entegrasyonu</h3>
                  <p className="text-sm text-gray-600">SBÜ ve SGK sistemleri ile tam uyumlu</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 italic">&quot;Sağlık Sektörü Daha İyi Yazılımı Hak Ediyor&quot;</p>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="w-full">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
              <div className="space-y-8">
                {/* Header */}
                <div className="space-y-3">
                  <div className="inline-flex lg:hidden items-center gap-2 mb-4">
                    <Activity className="h-8 w-8 text-blue-600" strokeWidth={2.5} />
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Lydian Medi
                    </span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                    Hoş Geldiniz
                  </h2>
                  <p className="text-gray-600">
                    Sağlık platformunuza giriş yapın
                  </p>
                </div>

                {/* e-Nabız & e-Devlet Login Buttons */}
                <div className="space-y-3">
                  <Button
                    type="button"
                    onClick={handleENabizLogin}
                    disabled={isLoading}
                    className="w-full h-14 text-base font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white group"
                  >
                    <div className="flex items-center gap-3">
                      <Wifi className="h-5 w-5" />
                      <span>e-Nabız ile Giriş Yap</span>
                      <ArrowRight className="h-5 w-5 ml-auto group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Button>

                  <Button
                    type="button"
                    onClick={handleEDevletLogin}
                    disabled={isLoading}
                    className="w-full h-14 text-base font-semibold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white group"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5" />
                      <span>e-Devlet ile Giriş Yap</span>
                      <ArrowRight className="h-5 w-5 ml-auto group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/80 text-gray-500 font-medium">veya e-posta ile giriş yapın</span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-semibold">
                      E-posta Adresi
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="doktor@hastane.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-12"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-gray-700 font-semibold">
                        Şifre
                      </Label>
                      <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        Şifremi unuttum?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-12"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                      <p className="text-sm text-red-600 font-medium">{error}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                    />
                    <label htmlFor="remember" className="text-sm text-gray-600">
                      30 gün boyunca oturumumu açık tut
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 text-base font-semibold group"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Giriş yapılıyor...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Kontrol Paneline Giriş
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </form>

                {/* Footer */}
                <div className="pt-6">
                  <p className="text-sm text-gray-600 text-center">
                    Hesabınız yok mu?{' '}
                    <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                      Yöneticinizle iletişime geçin
                    </button>
                  </p>
                </div>

                {/* Demo credentials */}
                <div className="bg-blue-50 border-2 border-blue-100 rounded-xl p-4">
                  <p className="text-xs font-semibold text-blue-900 mb-2">Demo Giriş Bilgileri:</p>
                  <div className="space-y-1 text-xs text-blue-700 font-mono">
                    <p>E-posta: admin@medi.health</p>
                    <p>Şifre: Admin@123!Medi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Shield className="h-3 w-3" />
                <span className="font-medium">KVKK Uyumlu</span>
              </div>
              <div className="flex items-center gap-1 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Shield className="h-3 w-3" />
                <span className="font-medium">ISO 27001</span>
              </div>
              <div className="flex items-center gap-1 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Shield className="h-3 w-3" />
                <span className="font-medium">SBÜ Onaylı</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
