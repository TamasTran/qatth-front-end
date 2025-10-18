
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/auth'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [err, setErr] = useState<string|null>(null)
  const { register } = useAuth()
  const nav = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const eMsg = await register(email, password, fullName)
    if (eMsg) setErr(eMsg)
    else nav('/', { replace: true })
  }

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-xl font-semibold mb-4">Tạo tài khoản</h2>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Họ và tên</label>
          <input className="w-full rounded-xl bg-slate-900 border border-white/10 p-3 ring-focus" value={fullName} onChange={e=>setFullName(e.target.value)} required placeholder="Nguyễn Văn A"/>
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input className="w-full rounded-xl bg-slate-900 border border-white/10 p-3 ring-focus" value={email} onChange={e=>setEmail(e.target.value)} required type="email" placeholder="you@email.com"/>
        </div>
        <div>
          <label className="block text-sm mb-1">Mật khẩu</label>
          <input className="w-full rounded-xl bg-slate-900 border border-white/10 p-3 ring-focus" value={password} onChange={e=>setPassword(e.target.value)} required type="password" placeholder="Ít nhất 6 ký tự"/>
        </div>
        {err && <p className="text-red-300 text-sm">{err}</p>}
        <button className="btn btn-primary w-full">Đăng ký</button>
      </form>
      <p className="text-sm mt-4 text-slate-400">Đã có tài khoản? <Link className="text-brand-400" to="/login">Đăng nhập</Link></p>
    </div>
  )
}
