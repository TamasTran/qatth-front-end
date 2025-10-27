
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Header } from '../components/Header'
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
    <div className="min-h-screen bg-[linear-gradient(60deg,#E0F2FE_0%,#F0F9FF_40%,#F8FAFC_100%)]">
      <div className="fixed inset-0 -z-10 bg-radial-fade pointer-events-none" />
      <Header onAuthClick={openAuthModal} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: .4 }}
        className="mx-auto max-w-7xl px-4 py-8"
      >
        <Outlet context={{ openAuthModal, setAuthModalOnClose }} />
      </motion.main>
      <footer className="border-t border-brand-200/30 py-8 text-center text-sm text-slate-700 bg-white backdrop-blur-sm">
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

