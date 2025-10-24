
import { useEffect, useRef } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'

type OutletContextType = {
  openAuthModal: (mode: 'login' | 'register') => void
  setAuthModalOnClose: (callback: () => void) => void
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const { openAuthModal, setAuthModalOnClose } = useOutletContext<OutletContextType>()
  const navigate = useNavigate()
  const hasCalledModal = useRef(false)

  useEffect(() => {
    if (!user && !hasCalledModal.current) {
      hasCalledModal.current = true
      // Set callback to navigate home when modal closes
      setAuthModalOnClose(() => {
        navigate('/')
      })
      openAuthModal('login')
    }
  }, [user, openAuthModal, setAuthModalOnClose, navigate])

  if (!user) {
    return null
  }
  return <>{children}</>
}
