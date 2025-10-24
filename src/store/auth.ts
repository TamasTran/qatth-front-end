
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
    const nu: StoredUser = { id: uid(), email: trimmedEmail, fullName: trimmedName, password: trimmedPassword }
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
  }
}))
