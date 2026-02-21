'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Activity, Lock, Mail, ArrowRight, Shield, Heart, Users } from 'lucide-react'

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
          name: 'Dr. John Smith',
          role: 'PHYSICIAN'
        }))
        router.push('/dashboard')
      } else {
        setError('Please enter both email and password')
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
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
                <p className="text-xs text-gray-600 font-semibold"></p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="bg-blue-100 rounded-xl p-3">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Enterprise Security</h3>
                <p className="text-sm text-gray-600">HIPAA & KVKK compliant with end-to-end encryption</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="bg-purple-100 rounded-xl p-3">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Patient-Centric Care</h3>
                <p className="text-sm text-gray-600">Comprehensive EHR system with real-time collaboration</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="bg-green-100 rounded-xl p-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Multi-Region Support</h3>
                <p className="text-sm text-gray-600">US & Turkey healthcare standards built-in</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 italic">"Healthcare Deserves Better Software"</p>
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
                    GHP
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Welcome back
                </h2>
                <p className="text-gray-600">
                  Sign in to access your healthcare platform
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-semibold">
                    Email address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="doctor@hospital.com"
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
                      Password
                    </Label>
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Forgot password?
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
                    Keep me signed in for 30 days
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
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Sign in to Dashboard
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Footer */}
              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  Don't have an account?{' '}
                  <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                    Contact your administrator
                  </button>
                </p>
              </div>

              {/* Demo credentials */}
              <div className="bg-blue-50 border-2 border-blue-100 rounded-xl p-4">
                <p className="text-xs font-semibold text-blue-900 mb-2">Demo Credentials:</p>
                <div className="space-y-1 text-xs text-blue-700 font-mono">
                  <p>Email: admin@ghp.health</p>
                  <p>Password: Admin@123!GHP</p>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Shield className="h-3 w-3" />
              <span className="font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-1 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Shield className="h-3 w-3" />
              <span className="font-medium">KVKK Compliant</span>
            </div>
            <div className="flex items-center gap-1 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Shield className="h-3 w-3" />
              <span className="font-medium">SOC 2 Type II</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
