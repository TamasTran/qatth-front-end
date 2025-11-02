import { useState, useEffect, useCallback, useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {SiX, SiGmail, SiFacebook, SiLinkedin, SiYoutube, SiInstagram} from "react-icons/si"
import { Header } from '../components/Header'
import { AuthModal } from '../components/AuthModal'

export function AppLayout() {
  // ========== STATE MANAGEMENT ==========
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login'
  })
  const [authModalOnClose, setAuthModalOnClose] = useState<(() => void) | null>(null)
  const [showContactBubble, setShowContactBubble] = useState(true)
  const [showContactMenu, setShowContactMenu] = useState(false)
  const [currentIconIndex, setCurrentIconIndex] = useState(0)

  // ========== MEMOIZED DATA ==========
  const contactOptions = useMemo(() => [
    {icon: SiX, label: "X (Twitter)", link: "https://www.facebook.com/tamas7504/", bgColor: "bg-black"},
    {icon: SiGmail, label: "Email", link: "https://www.facebook.com/tamas7504/", bgColor: "bg-red-400"},
    {icon: SiFacebook, label: "Facebook", link: "https://www.facebook.com/tamas7504/", bgColor: "bg-blue-600"},
    {icon: SiLinkedin, label: "LinkedIn", link: "https://www.facebook.com/tamas7504/", bgColor: "bg-blue-500"},
    {icon: SiYoutube, label: "YouTube", link: "https://www.facebook.com/tamas7504/", bgColor: "bg-red-500"},
    {icon: SiInstagram, label: "Instagram", link: "https://www.facebook.com/tamas7504/", bgColor: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400"}
  ], [])

  // ========== MEMOIZED ANIMATION VARIANTS ==========
  const bubbleVariants = useMemo(() => ({
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  }), [])

  const iconVariants = useMemo(() => ({
    initial: { opacity: 0, scale: 0, x: 0, y: 0 },
    exit: { opacity: 0, scale: 0, x: 0, y: 0 }
  }), [])

  // ========== MEMOIZED TRANSITIONS ==========
  const springTransition = useMemo(() => ({
    type: "spring" as const,
    stiffness: 100,
    duration: 0.5
  }), [])

  const iconSpringTransition = useMemo(() => ({
    type: "spring" as const,
    stiffness: 260,
    damping: 20,
    duration: 0.4
  }), [])

  // ========== CURRENT ICON ==========
  const CurrentIcon = useMemo(
    () => contactOptions[currentIconIndex].icon,
    [contactOptions, currentIconIndex]
  )

  // ========== EFFECTS ==========
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % contactOptions.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [contactOptions.length])

  // ========== CALLBACKS ==========
  const openAuthModal = useCallback((mode: 'login' | 'register') => {
    setAuthModal({ isOpen: true, mode })
  }, [])

  const closeAuthModal = useCallback(() => {
    setAuthModal({ isOpen: false, mode: 'login' })
    if (authModalOnClose) {
      authModalOnClose()
      setAuthModalOnClose(null)
    }
  }, [authModalOnClose])

  const switchAuthMode = useCallback((mode: 'login' | 'register') => {
    setAuthModal({ isOpen: true, mode })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setShowContactMenu(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setShowContactMenu(false)
  }, [])

  const handleContactClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setTimeout(() => setShowContactMenu(false), 200)
  }, [])

  // ========== RENDER ==========
  return (
    <div className="flex flex-col min-h-screen bg-[linear-gradient(60deg,#E0F2FE_0%,#F0F9FF_40%,#F8FAFC_100%)] overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-radial-fade pointer-events-none" />
      <Header onAuthClick={openAuthModal} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
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

      {/* ========== FLOATING CONTACT BUBBLE - OPTIMIZED ========== */}
      <AnimatePresence>
        {showContactBubble && (
          <motion.div
            variants={bubbleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={springTransition}
            className="fixed bottom-0 right-0 z-40 pointer-events-none"
          >
            <div 
              className="absolute bottom-0 right-0 w-28 h-28 flex items-center justify-end pr-16 pb-12 pointer-events-auto"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Social Icons - Circular Layout */}
              <AnimatePresence>
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
                      onClick={handleContactClick}
                      variants={iconVariants}
                      initial="initial"
                      animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        x, 
                        y 
                      }}
                      exit="exit"
                      transition={{ 
                        ...iconSpringTransition,
                        delay: idx * 0.04
                      }}
                      className={`absolute flex items-center justify-center w-10 h-10 ${option.bgColor} rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 text-white group border-2 border-white pointer-events-auto cursor-pointer will-change-transform`}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      title={option.label}
                      aria-label={option.label}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  )
                })}
              </AnimatePresence>

              {/* Main Contact Button - NO ANIMATION (Optimized) */}
              <button
                className={`relative flex items-center justify-center w-12 h-12 ${contactOptions[currentIconIndex].bgColor} rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-white border-2 border-white z-10 pointer-events-auto cursor-pointer`}
                aria-label="Contact options"
              >
                <CurrentIcon className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}