
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../store/auth'
import { LogIn, LogOut, User, LayoutDashboard, MessageSquare, FileSearch, Mic, Briefcase } from 'lucide-react'

export function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-950 bg-radial-fade">
      <header className="sticky top-0 z-40 border-b border-transparent bg-[linear-gradient(90deg,#8DB1B4_0%,#014248_100%)] shadow-md backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="QATTH" className="h-10 w-15" />
          </Link>
          <nav className="ml-auto hidden md:flex items-center gap-1 text-slate-800 [&>a:hover]:text-amber-500 transition-colors duration-200">
            <TopLink to="/" label="Trang chủ" />
            <TopLink to="/cv-scanner" label="Quét CV" icon={<FileSearch size={16} />} />
            <TopLink to="/chatbot" label="Chatbot CV" icon={<MessageSquare size={16} />} />
            <TopLink to="/jobs" label="Tuyển dụng" icon={<Briefcase size={16} />} />
            <TopLink to="/interview" label="Phỏng vấn giọng nói" icon={<Mic size={16} />} />
          </nav>
          <div className="ml-2 flex items-center gap-2">
            {!user ? (
              <>
                <Link to="/login" className="btn btn-ghost ring-focus"><LogIn size={16}/>Đăng nhập</Link>
                <Link to="/register" className="btn btn-primary ring-focus">Tạo tài khoản</Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="btn btn-ghost ring-focus"><User size={16}/> {user.fullName}</Link>
                <button onClick={()=>{logout(); navigate('/')}} className="btn btn-ghost ring-focus"><LogOut size={16}/>Thoát</button>
              </>
            )}
          </div>
        </div>
      </header>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: .4 }}
        className="mx-auto max-w-7xl px-4 py-8"
      >
        <Outlet />
      </motion.main>
      <footer className="border-t border-transparent py-8 text-center text-sm text-blue-300 bg-transparent">
        © {new Date().getFullYear()} QATTH - AI hiểu bạn Doanh nghiệp chọn bạn.
      </footer>
    </div>
  )
}

function TopLink({ to, label, icon }: {to:string, label:string, icon?:React.ReactNode}) {
  return (
    <NavLink
      to={to}
      className={({isActive}) => `px-3 py-2 rounded-xl transition ${isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
    >
      <span className="inline-flex items-center gap-2">{icon}{label}</span>
    </NavLink>
  )
}
