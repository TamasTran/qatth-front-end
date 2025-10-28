
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'
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
  const [currentIconIndex, setCurrentIconIndex] = useState(0)

  const contactOptions = [
    { icon: Twitter, label: 'Twitter', link: 'https://www.facebook.com/tamas7504/', bgColor: 'bg-blue-400' },
    { icon: Mail, label: 'Email', link: 'https://www.facebook.com/tamas7504/', bgColor: 'bg-red-400' },
    { icon: Facebook, label: 'Facebook', link: 'https://www.facebook.com/tamas7504/', bgColor: 'bg-blue-600' },
    { icon: Linkedin, label: 'LinkedIn', link: 'https://www.facebook.com/tamas7504/', bgColor: 'bg-blue-500' },
    { icon: Youtube, label: 'YouTube', link: 'https://www.facebook.com/tamas7504/', bgColor: 'bg-red-500' },
    { icon: Instagram, label: 'Instagram', link: 'https://www.facebook.com/tamas7504/', bgColor: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400'}
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % contactOptions.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

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

  return (
    <div className="flex flex-col min-h-screen bg-[linear-gradient(60deg,#E0F2FE_0%,#F0F9FF_40%,#F8FAFC_100%)] overflow-x-hidden">
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

      {/* Floating Contact Bubble - Bottom Right */}
      {showContactBubble && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1 }}
          className="fixed bottom-0 right-0 z-40 pointer-events-none"
        >
          {/* Contact Menu - Circular Layout */}
          <div 
            className="absolute bottom-0 right-0 w-40 h-40 flex items-center justify-end pr-16 pb-12 pointer-events-auto"
            onMouseEnter={() => setShowContactMenu(true)}
            onMouseLeave={() => setShowContactMenu(false)}
          >
            {/* Social Icons arranged in circle */}
            {showContactMenu && contactOptions.map((option, idx) => {
              const Icon = option.icon
              const angle = (idx / contactOptions.length) * 360
              const radius = 55
              const x = radius * Math.cos((angle - 90) * (Math.PI / 180))
              const y = radius * Math.sin((angle - 90) * (Math.PI / 180))
              
              return (
                <motion.a
                  key={idx}
                  href={option.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation()
                    setTimeout(() => setShowContactMenu(false), 200)
                  }}
                  initial={{ opacity: 0, scale: 0.3, x: 0, y: 0 }}
                  animate={{ opacity: 1, scale: 1, x, y }}
                  exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  className={`absolute flex items-center justify-center w-10 h-10 ${option.bgColor} rounded-full shadow-sm hover:shadow-md transition-all text-white group border-2 border-white pointer-events-auto cursor-pointer`}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  title={option.label}
                >
                  <Icon className="w-4 h-4 group-hover:scale-125 transition-transform" />
                </motion.a>
              )
            })}

            {/* Main Contact Button - Changing Icon & Color (Center) */}
            <motion.button
              className={`relative flex items-center justify-center w-12 h-12 ${contactOptions[currentIconIndex].bgColor} rounded-full shadow-sm hover:shadow-md transition-all text-white group border-2 border-white z-10 pointer-events-auto`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                key={currentIconIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {(() => {
                  const CurrentIcon = contactOptions[currentIconIndex].icon
                  return <CurrentIcon className="w-5 h-5 group-hover:scale-125 transition-transform" />
                })()}
              </motion.div>
            </motion.button>
          </div>

        </motion.div>
      )}
    </div>
  )
}

