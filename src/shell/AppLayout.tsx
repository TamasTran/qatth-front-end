
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageCircle, X, Phone, Mail, MessageSquare, Facebook } from 'lucide-react'
import { Header } from '../components/Header'
import { AuthModal } from '../components/AuthModal'

export function AppLayout() {
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login'
  })
  const [authModalOnClose, setAuthModalOnClose] = useState<(() => void) | null>(null)
  const [showContactBubble, setShowContactBubble] = useState(true)
  const [showContactMenu, setShowContactMenu] = useState(false)
  const [currentContactIcon, setCurrentContactIcon] = useState(0)
  
  const contactOptions = [
    { icon: Phone, label: 'Phone', link: 'tel:+84912345678', color: 'from-blue-400 to-blue-600' },
    { icon: Mail, label: 'Email', link: 'mailto:contact@qatth.com', color: 'from-red-400 to-red-600' },
    { icon: MessageSquare, label: 'Zalo', link: 'https://zalo.me/your-id', color: 'from-cyan-400 to-cyan-600' },
    { icon: Facebook, label: 'Facebook', link: 'https://facebook.com/your-page', color: 'from-blue-500 to-blue-700' }
  ]

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthModal({ isOpen: true, mode })
  }

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'login' })
    // Call the callback if it exists
    if (authModalOnClose) {
      authModalOnClose()
      setAuthModalOnClose(null)
    }
  }

  const switchAuthMode = (mode: 'login' | 'register') => {
    setAuthModal({ isOpen: true, mode })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentContactIcon((prev) => (prev + 1) % contactOptions.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [contactOptions.length])

  return (
    <div className="flex flex-col min-h-screen bg-[linear-gradient(60deg,#E0F2FE_0%,#F0F9FF_40%,#F8FAFC_100%)]">
      <div className="fixed inset-0 -z-10 bg-radial-fade pointer-events-none" />
      <Header onAuthClick={openAuthModal} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: .4 }}
        className="flex-1 mx-auto max-w-7xl w-full px-4 py-8"
      >
        <Outlet context={{ openAuthModal, setAuthModalOnClose }} />
      </motion.main>
      <footer className="border-t border-brand-200/30 py-8 text-center text-sm text-slate-700 bg-white backdrop-blur-sm mt-auto">
        © {new Date().getFullYear()} QATTH - AI hiểu bạn Doanh nghiệp chọn bạn.
      </footer>

      <AuthModal
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={closeAuthModal}
        onSwitchMode={switchAuthMode}
      />

      {/* Floating Contact Bubble */}
      {showContactBubble && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-8 right-8 z-40"
        >
          {/* Contact Menu */}
          {showContactMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-20 right-0 flex flex-col gap-3"
            >
              {contactOptions.map((option, idx) => {
                const Icon = option.icon
                return (
                  <motion.a
                    key={idx}
                    href={option.link}
                    target={option.label !== 'Phone' && option.label !== 'Email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center w-14 h-14 bg-gradient-to-br ${option.color} rounded-full shadow-lg hover:shadow-xl transition-all text-white group`}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    title={option.label}
                  >
                    <Icon className="w-6 h-6 group-hover:scale-125 transition-transform" />
                  </motion.a>
                )
              })}
            </motion.div>
          )}

          {/* Main Contact Button - Icon Only */}
          <motion.button
            onClick={() => setShowContactMenu(!showContactMenu)}
            className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600 rounded-full shadow-2xl shadow-slate-400/40 hover:shadow-slate-400/60 transition-all text-white group`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              key={currentContactIcon}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.4 }}
            >
              {(() => {
                const CurrentIcon = contactOptions[currentContactIcon].icon
                return <CurrentIcon className="w-7 h-7 group-hover:scale-125 transition-transform" />
              })()}
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

