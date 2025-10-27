
import { create } from 'zustand'

type SubscriptionPlan = 'free' | 'medium' | 'pro'

type User = { 
  id: string
  email: string
  fullName: string
  plan: SubscriptionPlan
  balance: number
}

type AuthState = {
  user: User | null
  register: (email: string, password: string, fullName: string) => Promise<string | null>
  login: (email: string, password: string) => Promise<string | null>
  logout: () => void
  updateBalance: (amount: number) => void
  upgradePlan: (plan: SubscriptionPlan) => void
}

type StoredUser = User & { password: string }

// Feature access control based on subscription plan
export const featureAccess = {
  'cv-scanner': { free: true, medium: true, pro: true },
  'cv-builder': { free: true, medium: true, pro: true },
  'chatbot': { free: false, medium: true, pro: true },
  'interview': { free: false, medium: false, pro: true },
  'jobs': { free: true, medium: true, pro: true },
  'recharge': { free: true, medium: true, pro: true },
}

export const canAccessFeature = (feature: keyof typeof featureAccess, plan: SubscriptionPlan): boolean => {
  return featureAccess[feature][plan] ?? false
}

function loadUsers(): StoredUser[] {
  const raw = localStorage.getItem('qatth_users') || '[]'
  try { return JSON.parse(raw) } catch { return [] }
}
function saveUsers(users: StoredUser[]) {
  localStorage.setItem('qatth_users', JSON.stringify(users))
}
function uid() { return Math.random().toString(36).slice(2) }

// Initialize demo accounts on first load
function initializeDemoAccounts() {
  try {
    const raw = localStorage.getItem('qatth_users')
    const users = raw ? JSON.parse(raw) : []
    
    if (users.length > 0) {
      console.log('✓ Demo accounts already exist:', users.length, 'accounts')
      return
    }
    
    const demoAccounts: StoredUser[] = [
      {
        id: uid(),
        email: 'free@qatth.com',
        fullName: 'Free User',
        password: '123456',
        plan: 'free',
        balance: 0
      },
      {
        id: uid(),
        email: 'medium@qatth.com',
        fullName: 'Medium User',
        password: '123456',
        plan: 'medium',
        balance: 100000
      },
      {
        id: uid(),
        email: 'pro@qatth.com',
        fullName: 'Pro User',
        password: '123456',
        plan: 'pro',
        balance: 500000
      }
    ]
    
    localStorage.setItem('qatth_users', JSON.stringify(demoAccounts))
    console.log('✓ Demo accounts created successfully:', demoAccounts)
  } catch (err) {
    console.error('✗ Failed to initialize demo accounts:', err)
  }
}

// Initialize demo accounts when store loads
if (typeof window !== 'undefined') {
  initializeDemoAccounts()
}

export const useAuth = create<AuthState>((set, get) => ({
  user: (()=>{
    try {
      const raw = localStorage.getItem('qatth_session')
      return raw ? JSON.parse(raw) as User : null
    } catch {
      return null
    }
  })(),
  async register(email, password, fullName) {
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()
    const trimmedName = fullName.trim()
    
    if (!trimmedEmail || !trimmedPassword || !trimmedName) {
      return 'Vui lòng điền đầy đủ thông tin'
    }
    if (trimmedPassword.length < 6) {
      return 'Mật khẩu phải có ít nhất 6 ký tự'
    }
    
    const users = loadUsers()
    if (users.find(u=>u.email.toLowerCase()===trimmedEmail.toLowerCase())) {
      return 'Email đã được đăng ký'
    }
    const nu: StoredUser = { 
      id: uid(), 
      email: trimmedEmail, 
      fullName: trimmedName, 
      password: trimmedPassword,
      plan: 'free',
      balance: 0
    }
    users.push(nu); saveUsers(users)
    const { password: _p, ...safe } = nu
    localStorage.setItem('qatth_session', JSON.stringify(safe))
    set({ user: safe })
    return null
  },
  async login(email, password) {
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()
    
    if (!trimmedEmail || !trimmedPassword) {
      return 'Vui lòng điền email và mật khẩu'
    }
    
    const users = loadUsers()
    const found = users.find(u=>u.email.toLowerCase()===trimmedEmail.toLowerCase() && u.password===trimmedPassword)
    if (!found) return 'Email hoặc mật khẩu không đúng'
    const { password: _p, ...safe } = found
    localStorage.setItem('qatth_session', JSON.stringify(safe))
    set({ user: safe })
    return null
  },
  logout() {
    localStorage.removeItem('qatth_session')
    set({ user: null })
  },
  updateBalance(amount: number) {
    const state = get()
    if (!state.user) return
    
    const users = loadUsers()
    const userIndex = users.findIndex(u => u.id === state.user!.id)
    if (userIndex === -1) return
    
    users[userIndex].balance += amount
    saveUsers(users)
    
    const updatedUser = { ...state.user, balance: users[userIndex].balance }
    localStorage.setItem('qatth_session', JSON.stringify(updatedUser))
    set({ user: updatedUser })
  },
  upgradePlan(plan: SubscriptionPlan) {
    const state = get()
    if (!state.user) return
    
    const users = loadUsers()
    const userIndex = users.findIndex(u => u.id === state.user!.id)
    if (userIndex === -1) return
    
    users[userIndex].plan = plan
    saveUsers(users)
    
    const updatedUser = { ...state.user, plan }
    localStorage.setItem('qatth_session', JSON.stringify(updatedUser))
    set({ user: updatedUser })
  }
}))
