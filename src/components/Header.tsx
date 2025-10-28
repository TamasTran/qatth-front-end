import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../store/auth'
import {  
 LogOut, User, Menu, X, Wallet, Plus, Crown, CircleStop
} from 'lucide-react'

type HeaderProps = {
  onAuthClick?: (mode: 'login' | 'register') => void
}

export function Header({ onAuthClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleRecharge = () => {
    navigate('/recharge')
  }

  const mainNavItems = [
    { to: '/', label: 'Trang chủ' },
    { to: '/cv-builder', label: 'Tạo CV' },
    { to: '/jobs', label: 'Tuyển dụng' },
    { to: '/cv-scanner', label: 'Quét CV' },
    { to: '/chatbot', label: 'Chatbot CV' },
    { to: '/interview', label: 'Phỏng vấn' },
  ]

  const handleAuthClick = (mode: 'login' | 'register') => {
    if (onAuthClick) {
      onAuthClick(mode)
    } else {
      navigate(`/${mode}`)
    }
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-200/30 shadow-xl">
      <div className="w-full px-6 md:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src="/logo.png" alt="QATTH" className="h-14 w-22 object-contain" />
          </Link>

          {/* Desktop Navigation + Auth Section */}
          <div className="hidden lg:flex items-center gap-8 ml-12">
            {/* Desktop Navigation */}
            <nav className="flex items-center gap-1">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-brand-100 text-brand-600'
                        : 'text-slate-700 hover:bg-brand-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Divider */}
            <div className="w-px h-6 bg-brand-300"></div>

            {/* Auth Section */}
            <div className="flex items-center gap-3">
            {!user ? (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => handleAuthClick('login')}
                  className="px-4 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => handleAuthClick('register')}
                  className="px-4 py-2 text-sm font-medium bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
                >
                  Tạo tài khoản
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                {/* Balance Section */}
                <div className="flex items-center gap-2 px-3 py-2 bg-brand-50 rounded-lg border border-brand-200">
                  <Wallet size={18} className="text-brand-600" />
                  <span className="text-sm font-semibold text-brand-600">{user.balance?.toLocaleString()}đ</span>
                  <button
                    onClick={handleRecharge}
                    className="p-1 hover:bg-brand-100 rounded transition-colors"
                    title="Nạp tiền"
                  >
                    <Plus size={16} className="text-brand-600" />
                  </button>
                </div>

                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-50 rounded-lg transition-colors"
                >
                  <User size={18} />
                  <span className="hidden md:inline">{user.fullName}</span>
                  {user.plan === 'pro' && (
                    <div title="Pro Plan">
                      <Crown size={16} className="text-yellow-500" />
                    </div>
                  )}
                  {user.plan === 'medium' && (
                    <div title="Medium Plan">
                      <CircleStop size={16} className="text-blue-500" />
                    </div>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-accent-600 hover:bg-accent-100 rounded-lg transition-colors"
                  title="Thoát"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}

            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-brand-50 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-brand-200/30 mt-4 pt-4 space-y-2"
            >
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-brand-100 text-brand-600'
                        : 'text-slate-700 hover:bg-brand-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {/* Mobile Auth Section */}
              <div className="border-t border-brand-200/30 pt-4 mt-4 space-y-2">
                {!user ? (
                  <>
                    <button
                      onClick={() => handleAuthClick('login')}
                      className="w-full px-4 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50 rounded-lg transition-colors text-left"
                    >
                      Đăng nhập
                    </button>
                    <button
                      onClick={() => handleAuthClick('register')}
                      className="w-full px-4 py-2 text-sm font-medium bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
                    >
                      Tạo tài khoản
                    </button>
                  </>
                ) : (
                  <>
                    {/* Mobile Balance Section */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-brand-50 rounded-lg border border-brand-200">
                      <Wallet size={18} className="text-brand-600" />
                      <span className="text-sm font-semibold text-brand-600">0đ</span>
                      <button
                        onClick={handleRecharge}
                        className="p-1 hover:bg-brand-100 rounded transition-colors ml-auto"
                        title="Nạp tiền"
                      >
                        <Plus size={16} className="text-brand-600" />
                      </button>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-brand-50 rounded-lg transition-colors"
                    >
                      Hồ sơ ({user.fullName})
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm font-medium text-accent-600 hover:bg-accent-100 rounded-lg transition-colors"
                    >
                      Thoát
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
