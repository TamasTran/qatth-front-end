import { motion } from 'framer-motion'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { memo } from 'react'
import { Rocket, Users, TrendingUp, Clock, Handshake, Lightbulb, Workflow, DollarSign } from 'lucide-react'
import { useAuth } from '../../store/auth'

type OutletContextType = {
  openAuthModal: (mode: 'login' | 'register') => void
}

const STARS = [...Array(10)].map((_, i) => {
  return {
    id: i,
    posX: Math.random() * 100,
    posY: Math.random() * 100,
    duration: 2.5 + Math.random() * 1,
    delay: Math.random() * 2,
    size: 2.5 + Math.random() * 2.5
  }
})

function HeroSectionContent() {
  const { user } = useAuth()
  const { openAuthModal } = useOutletContext<OutletContextType>()

  return (
    <section className="
        relative -mt-16 pt-16 
        mx-[calc(50%-50vw)]
        w-screen max-w-[100vw]
        overflow-hidden
        min-h-[clamp(260px,55dvh,520px)]
        bg-gradient-to-br from-cyan-50 via-white to-violet-200
        pt-[clamp(56px,6svh,80px)] pb-[clamp(28px,5svh,60px)]
        shadow-xl
      ">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute top-20 left-10 w-72 h-72 bg-brand-200/20 rounded-full blur-2xl" animate={{ y: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-100/15 rounded-full blur-2xl" animate={{ y: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity }} />
        <motion.div className="absolute top-1/2 left-1/2 w-80 h-80 bg-brand-200/10 rounded-full blur-2xl" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 9, repeat: Infinity }} />
      </div>

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {STARS.map((star) => (
          <motion.div
            key={`star-${star.id}`}
            className="absolute bg-yellow-300 rounded-full pointer-events-none"
            style={{
              left: `${star.posX}%`,
              top: `${star.posY}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: `0 0 ${star.size * 3}px rgba(253, 224, 71, 0.8)`,
              transform: 'translate(-50%, -50%)'
            }}
            animate={{ 
              opacity: [0.4, 0.9, 0.4]
            }}
            transition={{ 
              duration: star.duration, 
              repeat: Infinity, 
              delay: star.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full py-6 md:py-10">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center px-6 md:px-12 max-w-7xl mx-auto">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="space-y-4"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-brand-100 to-white backdrop-blur-sm border-2 border-brand-400 rounded-full w-fit shadow-lg shadow-brand-400/30"
            >
              <span className="text-base">✨</span>
              <span className="text-xs font-bold bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent">Nền tảng AI tuyển dụng thông minh</span>
            </motion.div>
            {/* Main Heading */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.2] tracking-tight drop-shadow-lg">
                <motion.span
                  key={user ? 'logged-in' : 'logged-out'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {user ? 'Chào mừng bạn' : 'Sẵn sàng'} <br />
                  <span className="bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent block py-2">
                    {user ? 'quay lại!' : 'bắt đầu?'}
                  </span>
                </motion.span>
              </h1>
              <motion.p 
                key={user ? 'desc-logged-in' : 'desc-logged-out'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                className="text-base text-slate-700 font-semibold leading-relaxed max-w-xl drop-shadow-md"
                style={{ fontSize: '14px', lineHeight: '1.6' }}
              >
                {user ? 'Khám phá các tính năng mạnh mẽ của QATTH để phát triển sự nghiệp' : 'Quét CV thông minh, gợi ý nghề phù hợp, chatbot tư vấn và mô phỏng phỏng vấn bằng giọng nói. Tất cả trên một giao diện hiện đại và dễ sử dụng.'}
              </motion.p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="grid grid-cols-2 gap-3 pt-4"
            >
              {[
                { icon: Users, number: '10.000+', label: 'Người dùng', color: 'text-blue-600' },
                { icon: TrendingUp, number: '95%', label: 'Thành công', color: 'text-green-600' },
                { icon: Clock, number: '24/7', label: 'Hỗ trợ', color: 'text-purple-600' },
                { icon: Handshake, number: '200+', label: 'Đôi tác', color: 'text-yellow-600' }
              ].map((stat, i) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="p-4 bg-white/50 backdrop-blur-sm border-2 border-brand-300 rounded-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                      <div className="text-xl md:text-2xl font-bold text-brand-600">{stat.number}</div>
                    </div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right Side - Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative h-96 md:h-full flex items-center justify-center ml-552"
          >
            {/* Orbiting planets */}
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Center glow */}
              <motion.div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full blur-2xl opacity-30" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity }} />
              
              {/* Orbit 1 */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-teal-300/20 rounded-full"
              />
              
              {/* Orbit 2 */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-12 border border-cyan-300/15 rounded-full"
              />

              {/* Planet 1*/}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 pointer-events-none"
              >
                {/* Label for Planet 1 - Rotates with planet */}
                <div className="absolute inset-0 flex items-start justify-center pointer-events-none z-50 pt-0">
                  <span className="text-xs font-semibold text-teal-700 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full whitespace-nowrap shadow-md -translate-y-10">Tính năng nổi bật</span>
                </div>
                <motion.button
                  onClick={() => {
                    const element = document.getElementById('keyfeatures')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-teal-300 via-teal-500 to-cyan-700 rounded-full shadow-lg shadow-teal-500/50 flex items-center justify-center hover:shadow-teal-500/70 transition-all duration-300 cursor-pointer group z-20 pointer-events-auto border border-teal-300/50"
                  title="Tính năng nổi bật"
                >
                  {/* Planet surface */}
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 to-teal-400/10 rounded-full" />
                  {/* Planet shine */}
                  <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full opacity-60" />
                  <Lightbulb className="w-5 h-5 text-white group-hover:scale-125 transition-transform relative z-10" />
                </motion.button>
              </motion.div>

              {/* Planet 2*/}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-16 pointer-events-none"
              >
                {/* Label for Planet 2 - Rotates with planet */}
                <div className="absolute inset-0 flex items-start justify-center pointer-events-none z-50 pt-0">
                  <span className="text-xs font-semibold text-cyan-700 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full whitespace-nowrap shadow-md -translate-y-9 translate-x-1">Cách thức hoạt động</span>
                </div>
                <motion.button
                  onClick={() => {
                    const element = document.getElementById('howitwork')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-9 h-9 bg-gradient-to-br from-cyan-300 via-cyan-500 to-teal-600 rounded-full shadow-lg shadow-cyan-500/50 flex items-center justify-center hover:shadow-cyan-500/70 transition-all duration-300 cursor-pointer group z-50 pointer-events-auto border border-cyan-300/50"
                  title="Cách thức hoạt động"
                >
                  {/* Planet surface */}
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 to-cyan-400/10 rounded-full" />
                  {/* Planet shine */}
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-60" />
                  <Workflow className="w-6 h-6 text-white group-hover:scale-125 transition-transform relative z-10" />
                </motion.button>
              </motion.div>

              {/* Planet 3 - Pricing */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 pointer-events-none"
              >
                {/* Label for Planet 3 - Rotates with planet */}
                <div className="absolute inset-0 flex items-start justify-center pointer-events-none z-50 pt-0">
                  <span className="text-xs font-semibold text-amber-700 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full whitespace-nowrap shadow-md -translate-y-8">Bảng giá</span>
                </div>
                <motion.button
                  onClick={() => {
                    const element = document.getElementById('pricing')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-amber-300 via-orange-500 to-orange-700 rounded-full shadow-lg shadow-orange-500/50 flex items-center justify-center hover:shadow-orange-500/70 transition-all duration-300 cursor-pointer group z-30 pointer-events-auto border border-amber-300/50"
                  title="Bảng giá"
                >
                  {/* Planet surface */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 to-amber-400/10 rounded-full" />
                  {/* Planet shine */}
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-60" />
                  <DollarSign className="w-4 h-4 text-white group-hover:scale-125 transition-transform relative z-10" />
                </motion.button>
              </motion.div>

              {/* Center circle - Rocket */}
              <motion.button
                onClick={() => openAuthModal('register')}
                className="absolute inset-1/3 bg-gradient-to-br from-cyan-400 via-teal-500 to-teal-700 rounded-full shadow-lg shadow-teal-500/60 flex items-center justify-center hover:shadow-teal-500/80 transition-all duration-300 cursor-pointer group z-10 border border-cyan-300/50"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Tạo tài khoản"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 to-cyan-400/10 rounded-full" />
                <div className="flex flex-col items-center gap-1 relative z-10">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.15, 1],
                      y: [0, -10, 0],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Rocket className="w-9 h-9 text-white group-hover:scale-125 transition-transform drop-shadow-lg" />
                  </motion.div>
                  <span className="text-sm font-bold text-white whitespace-nowrap drop-shadow-md">Start</span>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default memo(HeroSectionContent)
