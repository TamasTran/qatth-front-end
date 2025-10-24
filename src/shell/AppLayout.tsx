
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FloatingNav } from '../components/FloatingNav'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-white to-sky-100">
      <FloatingNav />
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

