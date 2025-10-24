import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../store/auth'
import { 
  Home, FileSearch, MessageSquare, Briefcase, Mic, 
  LogIn, LogOut, User, UserPlus 
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
      className="fixed left-0 top-1/2 -translate-y-1/2 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover trigger area */}
      <div className="w-16 h-96 absolute left-0 top-1/2 -translate-y-1/2"></div>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-3 pl-4"
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
                    `group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isActive
                        ? 'bg-slate-800 text-white shadow-lg'
                        : 'bg-white/80 backdrop-blur-sm text-slate-600 hover:bg-slate-100 shadow-md'
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
                  <div className="absolute left-16 bg-slate-800 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {item.label}
                  </div>
                </NavLink>
              </motion.div>
            ))}

            {/* Separator */}
            <div className="w-8 h-px bg-slate-300 mx-auto my-2"></div>

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
                    className="group relative w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm text-slate-600 hover:bg-slate-100 shadow-md flex items-center justify-center transition-all duration-200"
                  >
                    <motion.div
                      whileHover={{ scale: 1.3 }}
                      className="flex items-center justify-center"
                    >
                      {item.icon}
                    </motion.div>
                    {/* Tooltip */}
                    <div className="absolute left-16 bg-slate-800 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {item.label}
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={() => handleAuthClick(item.mode)}
                    className="group relative w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm text-slate-600 hover:bg-slate-100 shadow-md flex items-center justify-center transition-all duration-200"
                  >
                    <motion.div
                      whileHover={{ scale: 1.3 }}
                      className="flex items-center justify-center"
                    >
                      {item.icon}
                    </motion.div>
                    {/* Tooltip */}
                    <div className="absolute left-16 bg-slate-800 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
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
                  className="group relative w-12 h-12 rounded-full bg-red-100 text-red-600 hover:bg-red-200 shadow-md flex items-center justify-center transition-all duration-200"
                >
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="flex items-center justify-center"
                  >
                    <LogOut size={20} />
                  </motion.div>
                  {/* Tooltip */}
                  <div className="absolute left-16 bg-slate-800 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    Thoát
                  </div>
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
