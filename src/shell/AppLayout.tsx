
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FloatingNav } from '../components/FloatingNav'
import { AuthModal } from '../components/AuthModal'

export function AppLayout() {
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login'
  })
  const [authModalOnClose, setAuthModalOnClose] = useState<(() => void) | null>(null)

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50">
      <FloatingNav onAuthClick={openAuthModal} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: .4 }}
        className="mx-auto max-w-7xl px-4 py-8"
      >
        <Outlet context={{ openAuthModal, setAuthModalOnClose }} />
      </motion.main>
      <footer className="border-t border-transparent py-8 text-center text-sm text-brand-700 bg-transparent">
        © {new Date().getFullYear()} QATTH - AI hiểu bạn Doanh nghiệp chọn bạn.
      </footer>

      <AuthModal
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={closeAuthModal}
        onSwitchMode={switchAuthMode}
      />
    </div>
  )
}

