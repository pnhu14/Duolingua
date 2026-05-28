import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline'
import type { LoginRequest, RegisterRequest } from '../types'

function readOAuthLoginError() {
  const prefix = '#/login?'
  if (!window.location.hash.startsWith(prefix)) {
    return null
  }

  const params = new URLSearchParams(window.location.hash.slice(prefix.length))
  const oauthError = params.get('oauthError')
  return oauthError ? `Đăng nhập Google không thành công: ${oauthError}` : null
}

interface LoginViewProps {
  onLogin: (credentials: LoginRequest) => Promise<{ success: boolean; error?: string }>
  onRegister: (details: RegisterRequest) => Promise<{ success: boolean; error?: string }>
  onGoogleLogin: () => void
  isLoading: boolean
  onNavigate: (view: { name: 'home' }) => void
}

export default function LoginView({ onLogin, onRegister, onGoogleLogin, isLoading, onNavigate }: LoginViewProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(() => readOAuthLoginError())
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  // Form states
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const prefix = '#/login?'
    if (!window.location.hash.startsWith(prefix)) {
      return
    }

    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#/login`)
  }, [])

  const handleModeChange = (newMode: 'signin' | 'signup' | 'forgot') => {
    setMode(newMode)
    setError(null)
    setSuccessMsg(null)
    setPassword('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMsg(null)

    if (mode === 'signin') {
      if (!email.trim() || !password.trim()) {
        setError('Vui lòng điền đầy đủ email và mật khẩu')
        return
      }
      const res = await onLogin({ email, password })
      if (!res.success) {
        setError(res.error || 'Đăng nhập không thành công')
      }
    } else if (mode === 'signup') {
      if (!username.trim() || !email.trim() || !password.trim()) {
        setError('Vui lòng điền đầy đủ tất cả các trường')
        return
      }
      if (password.length < 8) {
        setError('Mật khẩu phải dài ít nhất 8 ký tự')
        return
      }
      const res = await onRegister({ username, email, password })
      if (!res.success) {
        setError(res.error || 'Đăng ký không thành công')
      } else {
        setSuccessMsg('Đăng ký thành công! Đang tự động đăng nhập...')
      }
    } else if (mode === 'forgot') {
      if (!email.trim()) {
        setError('Vui lòng điền địa chỉ email')
        return
      }
      // Mock forgot password behavior
      setSuccessMsg('Một email khôi phục mật khẩu đã được gửi đến bạn nếu tài khoản đó tồn tại.')
    }
  }

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12 md:px-8 overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.18) 0px, transparent 55%),
          radial-gradient(at 100% 0%, rgba(6, 182, 212, 0.18) 0px, transparent 55%),
          radial-gradient(at 50% 50%, rgba(168, 85, 247, 0.12) 0px, transparent 60%),
          radial-gradient(at 0% 100%, rgba(236, 72, 153, 0.1) 0px, transparent 50%)
        `
      }}
    >

      {/* Main container */}
      <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-3xl bg-zinc-900/30 shadow-2xl backdrop-blur-md border border-zinc-800/80 transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left panel: Info & Branding */}
          <div className="flex flex-col justify-between p-8 text-white lg:col-span-7 lg:p-16">
            {/* Header / Logo */}
            <div>
              <button
                type="button"
                onClick={() => onNavigate({ name: 'home' })}
                className="group flex items-center space-x-3 text-left focus:outline-none"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-zinc-800 to-zinc-900 border border-zinc-700 p-2 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <svg
                    className="h-6 w-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                </div>
                <div>
                  <span className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-400">
                    MELODIX
                  </span>
                  <p className="text-xs text-zinc-500">FEEL THE BEAT</p>
                </div>
              </button>
            </div>

            {/* Slogan & Description */}
            <div className="my-16 space-y-6">
              <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-white">
                KHÁM PHÁ
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-450">
                  GIAI ĐIỆU CỦA BẠN
                </span>
              </h2>
              <p className="max-w-md text-base text-zinc-400 leading-relaxed">
                Nơi những giai điệu yêu thích tìm thấy ngôi nhà của họ. Trải nghiệm phát nhạc chất
                lượng cao, cá nhân hóa danh sách phát và kết nối tâm hồn qua từng nốt nhạc.
              </p>

              {/* Animated Equalizer Visualizer */}
              <div className="flex items-end space-x-1.5 pt-4 h-12">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((bar) => {
                  const delay = `${bar * 0.1}s`
                  const barHeightClass = [
                    'h-6',
                    'h-10',
                    'h-4',
                    'h-8',
                    'h-12',
                    'h-5',
                    'h-9',
                    'h-3',
                    'h-7',
                    'h-11',
                  ][bar - 1]
                  return (
                    <div
                      key={bar}
                      className={`w-1 bg-gradient-to-t from-zinc-800 to-zinc-600 rounded-full animate-pulse ${barHeightClass}`}
                      style={{
                        animationDelay: delay,
                        animationDuration: `${0.8 + bar * 0.05}s`,
                      }}
                    />
                  )
                })}
              </div>
            </div>


          </div>

          {/* Right panel: Glassmorphic Login Card */}
          <motion.div
            layout
            transition={{ layout: { duration: 0.28, ease: 'easeInOut' } }}
            className="relative flex flex-col justify-center bg-zinc-900/40 p-8 backdrop-blur-lg lg:col-span-5 lg:p-12 border-t lg:border-t-0 lg:border-l border-zinc-800/80 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: 24, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -24, scale: 0.98 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="w-full flex flex-col justify-center"
              >
            {/* Action Card Header */}
            <div className="mb-8">
              {mode === 'forgot' && (
                <button
                  onClick={() => handleModeChange('signin')}
                  className="mb-4 inline-flex items-center space-x-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                  <span>Quay lại Đăng nhập</span>
                </button>
              )}
              <h3 className="text-3xl font-bold text-white">
                {mode === 'signin' && 'Đăng nhập'}
                {mode === 'signup' && 'Tạo tài khoản'}
                {mode === 'forgot' && 'Khôi phục mật khẩu'}
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                {mode === 'signin' && 'Chào mừng trở lại! Hãy điền thông tin đăng nhập của bạn.'}
                {mode === 'signup' && 'Bắt đầu hành trình trải nghiệm âm nhạc tuyệt vời cùng chúng tôi.'}
                {mode === 'forgot' && 'Nhập email đăng ký của bạn để khôi phục mật khẩu.'}
              </p>
            </div>

            {/* Notifications */}
            {error && (
              <div className="mb-6 rounded-xl bg-red-950/40 border border-red-900/50 p-4 text-sm text-red-200 backdrop-blur-sm animate-fadeIn">
                {error}
              </div>
            )}
            {successMsg && (
              <div className="mb-6 rounded-xl bg-zinc-800/40 border border-zinc-700/50 p-4 text-sm text-zinc-200 backdrop-blur-sm animate-fadeIn">
                {successMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {mode === 'signup' && (
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium text-zinc-400">
                    Tên tài khoản
                  </label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <UserIcon className="h-5 w-5 text-zinc-500" />
                    </div>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full rounded-xl border border-zinc-800 bg-zinc-950/40 py-3 pl-10 pr-3 text-sm text-white placeholder-zinc-700 focus:border-zinc-500 focus:bg-zinc-900/50 focus:ring-1 focus:ring-zinc-500 focus:outline-none transition-all duration-300"
                      placeholder="Nhập tên tài khoản"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-400">
                  Địa chỉ email
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <EnvelopeIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-xl border border-zinc-800 bg-zinc-950/40 py-3 pl-10 pr-3 text-sm text-white placeholder-zinc-700 focus:border-zinc-500 focus:bg-zinc-900/50 focus:ring-1 focus:ring-zinc-500 focus:outline-none transition-all duration-300"
                    placeholder="example@email.com"
                    required
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium text-zinc-400">
                      Mật khẩu
                    </label>
                    {mode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => handleModeChange('forgot')}
                        className="text-sm font-medium text-zinc-400 hover:text-white hover:underline transition-colors duration-200 focus:outline-none"
                      >
                        Quên mật khẩu?
                      </button>
                    )}
                  </div>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-xl border border-zinc-800 bg-zinc-950/40 py-3 pl-10 pr-10 text-sm text-white placeholder-zinc-700 focus:border-zinc-500 focus:bg-zinc-900/50 focus:ring-1 focus:ring-zinc-500 focus:outline-none transition-all duration-300"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-white focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full justify-center rounded-xl bg-gradient-to-r from-white to-zinc-300 py-3.5 px-4 text-sm font-semibold text-zinc-950 shadow-md hover:from-zinc-100 hover:to-zinc-200 focus:ring-2 focus:ring-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                {isLoading ? (
                  <svg
                    className="h-5 w-5 animate-spin text-zinc-950"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <>
                    {mode === 'signin' && 'Đăng nhập'}
                    {mode === 'signup' && 'Đăng ký tài khoản'}
                    {mode === 'forgot' && 'Gửi link khôi phục'}
                  </>
                )}
              </button>
            </form>

            {/* Social Logins */}
            {mode !== 'forgot' && (
              <div className="mt-8 space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-800"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-transparent px-2 text-zinc-500 font-medium">Hoặc</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={onGoogleLogin}
                    className="flex w-full items-center justify-center space-x-3 rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 px-4 text-sm font-medium text-zinc-200 hover:bg-zinc-800 active:scale-98 transition-all duration-200"
                  >
                    {/* Google Logo */}
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Tiếp tục với Google</span>
                  </button>
                </div>
              </div>
            )}

            {/* Mode Switcher */}
            <div className="mt-8 text-center text-sm">
              <span className="text-zinc-500">
                {mode === 'signin' && 'Bạn chưa có tài khoản? '}
                {mode === 'signup' && 'Bạn đã có tài khoản? '}
              </span>
              <button
                type="button"
                onClick={() => handleModeChange(mode === 'signin' ? 'signup' : 'signin')}
                className="font-semibold text-zinc-300 hover:text-white hover:underline transition duration-200 focus:outline-none"
              >
                {mode === 'signin' && 'Đăng ký ngay'}
                {mode === 'signup' && 'Đăng nhập'}
              </button>
            </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
