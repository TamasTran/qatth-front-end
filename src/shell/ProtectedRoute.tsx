
import { useEffect, useRef } from 'react'
import { useOutletContext, useNavigate, useLocation } from 'react-router-dom'
import { useAuth, canAccessFeature } from '../store/auth'

type OutletContextType = {
  openAuthModal: (mode: 'login' | 'register') => void
  setAuthModalOnClose: (callback: () => void) => void
}

// Map routes to features
const routeToFeature: Record<string, keyof typeof import('../store/auth').featureAccess> = {
  '/cv-scanner': 'cv-scanner',
  '/cv-builder': 'cv-builder',
  '/chatbot': 'chatbot',
  '/interview': 'interview',
  '/jobs': 'jobs',
  '/recharge': 'recharge',
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const { openAuthModal, setAuthModalOnClose } = useOutletContext<OutletContextType>()
  const navigate = useNavigate()
  const location = useLocation()
  const hasCalledModal = useRef(false)

  // Get feature from current route
  const currentFeature = routeToFeature[location.pathname]
  const hasAccess = user && currentFeature ? canAccessFeature(currentFeature, user.plan) : false

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

  // Check feature access
  if (currentFeature && !hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-brand-50 to-white">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">Tính năng không khả dụng</h1>
          <p className="text-xl text-slate-600">Bạn cần nâng cấp gói để sử dụng tính năng này</p>
          <p className="text-slate-600">Gói hiện tại: <span className="font-bold text-brand-600">{user.plan.toUpperCase()}</span></p>
          <button
            onClick={() => navigate('/recharge')}
            className="mt-6 px-8 py-3 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition-colors"
          >
            Nâng cấp gói
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
