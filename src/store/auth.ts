
import { create } from 'zustand'

type User = { id: string; email: string; fullName: string }
type AuthState = {
  user: User | null
  register: (email: string, password: string, fullName: string) => Promise<string | null>
  login: (email: string, password: string) => Promise<string | null>
  logout: () => void
}

type StoredUser = User & { password: string }

function loadUsers(): StoredUser[] {
  const raw = localStorage.getItem('qatth_users') || '[]'
  try { return JSON.parse(raw) } catch { return [] }
}
function saveUsers(users: StoredUser[]) {
  localStorage.setItem('qatth_users', JSON.stringify(users))
}
function uid() { return Math.random().toString(36).slice(2) }

export const useAuth = create<AuthState>((set, get) => ({
  user: (()=>{
    const raw = localStorage.getItem('qatth_session')
    return raw ? JSON.parse(raw) as User : null
  })(),
  async register(email, password, fullName) {
    const users = loadUsers()
    if (users.find(u=>u.email.toLowerCase()===email.toLowerCase())) {
      return 'Email đã được đăng ký'
    }
    const nu: StoredUser = { id: uid(), email, fullName, password }
    users.push(nu); saveUsers(users)
    const { password: _p, ...safe } = nu
    localStorage.setItem('qatth_session', JSON.stringify(safe))
    set({ user: safe })
    return null
  },
  async login(email, password) {
    const users = loadUsers()
    const found = users.find(u=>u.email.toLowerCase()===email.toLowerCase() && u.password===password)
    if (!found) return 'Email hoặc mật khẩu không đúng'
    const { password: _p, ...safe } = found
    localStorage.setItem('qatth_session', JSON.stringify(safe))
    set({ user: safe })
    return null
  },
  logout() {
    localStorage.removeItem('qatth_session')
    set({ user: null })
  }
}))
