import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../store/auth'
import { 
  Home, FileSearch, MessageSquare, Briefcase, Mic, 
  LogIn, LogOut, User, UserPlus, FileText
} from 'lucide-react'

type FloatingNavProps = {
  onAuthClick?: (mode: 'login' | 'register') => void
}

export function FloatingNav({ onAuthClick }: FloatingNavProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const mainNavItems = [
    { to: '/', label: 'Trang chủ', icon: <Home size={20} /> },
    { to: '/cv-scanner', label: 'Quét CV', icon: <FileSearch size={20} /> },
    { to: '/cv-builder', label: 'Tạo CV', icon: <FileText size={20} /> },
    { to: '/chatbot', label: 'Chatbot CV', icon: <MessageSquare size={20} /> },
    { to: '/jobs', label: 'Tuyển dụng', icon: <Briefcase size={20} /> },
    { to: '/interview', label: 'Phỏng vấn', icon: <Mic size={20} /> },
  ]

  const handleAuthClick = (mode: 'login' | 'register') => {
    if (onAuthClick) {
      onAuthClick(mode)
    } else {
      navigate(`/${mode}`)
    }
  }

  const authItems = !user ? [
    { mode: 'login' as const, label: 'Đăng nhập', icon: <LogIn size={20} /> },
    { mode: 'register' as const, label: 'Tạo tài khoản', icon: <UserPlus size={20} /> },
  ] : [
    { to: '/profile', label: user.fullName, icon: <User size={20} /> },
  ]

  return (
    <div 
      className="fixed left-0 top-1/2 -translate-y-1/2 z-50 pl-4"
    >
      {/* Hover trigger area */}
      <div className="w-16 h-96 absolute left-0 top-1/2 -translate-y-1/2"></div>
      
      <AnimatePresence>
        <motion.div
          className="flex flex-col gap-3"
        >
          {/* Navigation Items */}
          {mainNavItems.map((item, index) => (
            <motion.div
              key={item.to}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `group relative flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'w-14 h-14 bg-brand-600 text-white shadow-lg shadow-brand-600/40 scale-110 rounded-full'
                      : 'w-12 h-12 bg-white/80 backdrop-blur-sm text-brand-700 hover:bg-brand-50 shadow-md rounded-full hover:scale-105'
                  }`
                }
              >
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  className="flex items-center justify-center"
                >
                  {item.icon}
                </motion.div>
                {/* Tooltip */}
                <div className="absolute left-16 bg-brand-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                  {item.label}
                </div>
              </NavLink>
            </motion.div>
          ))}

          {/* Separator */}
          <div className="w-8 h-px bg-brand-300 mx-auto my-2"></div>

          {/* Auth Items */}
          {authItems.map((item, index) => (
            <motion.div
              key={'to' in item ? item.to : item.mode}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: (mainNavItems.length + index) * 0.1 }}
            >
              {'to' in item ? (
                <Link
                  to={item.to}
                  className="group relative w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm text-brand-700 hover:bg-brand-50 shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105"
                >
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="flex items-center justify-center"
                  >
                    {item.icon}
                  </motion.div>
                  {/* Tooltip */}
                  <div className="absolute left-16 bg-brand-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                    {item.label}
                  </div>
                </Link>
              ) : (
                <button
                  onClick={() => handleAuthClick(item.mode)}
                  className="group relative w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm text-brand-700 hover:bg-brand-50 shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105"
                >
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="flex items-center justify-center"
                  >
                    {item.icon}
                  </motion.div>
                  {/* Tooltip */}
                  <div className="absolute left-16 bg-brand-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                    {item.label}
                  </div>
                </button>
              )}
            </motion.div>
          ))}

          {/* Logout button for logged in users */}
          {user && (
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: (mainNavItems.length + authItems.length) * 0.1 }}
            >
              <button
                onClick={() => {
                  logout()
                  navigate('/')
                }}
                className="group relative w-12 h-12 rounded-full bg-accent-100 text-accent-600 hover:bg-accent-200 shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  className="flex items-center justify-center"
                >
                  <LogOut size={20} />
                </motion.div>
                {/* Tooltip */}
                <div className="absolute left-16 bg-brand-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                  Thoát
                </div>
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
