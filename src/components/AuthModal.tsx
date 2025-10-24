import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useAuth } from '../store/auth'

type AuthModalProps = {
  isOpen: boolean
  mode: 'login' | 'register'
  onClose: () => void
  onSwitchMode: (mode: 'login' | 'register') => void
}

export function AuthModal({ isOpen, mode, onClose, onSwitchMode }: AuthModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [err, setErr] = useState<string | null>(null)
  const { login, register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr(null)

    if (mode === 'login') {
      const eMsg = await login(email, password)
      if (eMsg) {
        setErr(eMsg)
      } else {
        onClose()
      }
    } else {
      const eMsg = await register(email, password, fullName)
      if (eMsg) {
        setErr(eMsg)
      } else {
        onClose()
      }
    }
  }

  const handleClose = () => {
    setEmail('')
    setPassword('')
    setFullName('')
    setErr(null)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="card relative w-full max-w-md">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <X size={20} className="text-slate-900" />
              </button>

              {/* Title */}
              <h2 className="text-2xl font-semibold mb-6 text-slate-900 pr-10">
                {mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
              </h2>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-900">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="Nguyễn Văn A"
                      className="w-full rounded-xl bg-brand-50 border border-brand-300/60 p-3 ring-focus text-slate-900 placeholder-slate-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-900">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@email.com"
                    className="w-full rounded-xl bg-brand-50 border border-brand-300/60 p-3 ring-focus text-slate-900 placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-900">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder={mode === 'login' ? '••••••••' : 'Ít nhất 6 ký tự'}
                    className="w-full rounded-xl bg-brand-50 border border-brand-300/60 p-3 ring-focus text-slate-900 placeholder-slate-500"
                  />
                </div>

                {err && <p className="text-red-600 text-sm font-medium">{err}</p>}

                <button type="submit" className="btn btn-primary w-full mt-6">
                  {mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                </button>
              </form>

              {/* Switch mode */}
              <p className="text-sm text-center mt-4 text-slate-700">
                {mode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
                <button
                  onClick={() => {
                    setEmail('')
                    setPassword('')
                    setFullName('')
                    setErr(null)
                    onSwitchMode(mode === 'login' ? 'register' : 'login')
                  }}
                  className="text-brand-600 font-semibold hover:text-brand-700 transition-colors"
                >
                  {mode === 'login' ? 'Đăng ký' : 'Đăng nhập'}
                </button>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
