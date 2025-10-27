
import { motion } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'
import { FileSearch, MessageSquare, Mic, User, Upload, Sparkles, Rocket, ArrowRight, Zap, Brain, Target, Workflow, Lightbulb } from 'lucide-react'
import { useAuth } from '../store/auth'

type OutletContextType = {
  openAuthModal: (mode: 'login' | 'register') => void
}

export default function Home() {
  const { user } = useAuth()
  const { openAuthModal } = useOutletContext<OutletContextType>()

  return (
    <div className="space-y-0">
      {/* Hero Section - Light Theme */}
      <section className="relative h-screen md:h-auto md:min-h-[600px] overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-violet-200 flex items-center justify-center border border-gray-200 shadow-lg rounded-2xl">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div className="absolute top-20 left-10 w-72 h-72 bg-brand-200/20 rounded-full blur-3xl" animate={{ y: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity }} />
          <motion.div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-100/15 rounded-full blur-3xl" animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity }} />
          <motion.div className="absolute top-1/2 left-1/2 w-80 h-80 bg-brand-200/10 rounded-full blur-3xl" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 7, repeat: Infinity }} />
        </div>

        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-brand-400 rounded-full shadow-lg shadow-brand-400/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0.15, 0.6, 0.15], scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 py-12 md:py-0 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-100 to-white backdrop-blur-sm border-2 border-brand-300 rounded-full w-fit shadow-lg shadow-brand-400/20"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>
                <Sparkles className="w-4 h-4 text-brand-600" />
              </motion.div>
              <span className="text-sm font-bold bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent">Nền tảng AI tuyên dụng thông minh</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-[1.4]">
                <motion.span
                  key={user ? 'logged-in' : 'logged-out'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {user ? 'Chào mừng bạn!' : 'Sẵn sàng'} <br />
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
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-lg text-slate-600 leading-relaxed max-w-lg"
              >
                {user ? 'Khám phá các tính năng mạnh mẽ của QATTH để phát triển sự nghiệp' : 'Quét CV thông minh, gợi ý nghề phù hợp, chatbot tư vấn và mô phỏng phỏng vấn bằng giọng nói. Tất cả trên một giao diện hiện đại và dễ sử dụng.'}
              </motion.p>
            </motion.div>

            {/* CTA Buttons - Only show if not logged in */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: !user ? 1 : 0, y: !user ? 0 : 20 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className={!user ? "flex flex-col sm:flex-row items-start gap-4 pt-4" : "hidden"}
            >
              <motion.button 
                onClick={() => openAuthModal('login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white backdrop-blur-sm text-brand-700 font-bold rounded-lg border-2 border-brand-400 hover:border-brand-500 shadow-lg shadow-brand-400/20 transition-all duration-300"
              >
                Đăng nhập
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-96 md:h-full flex items-center justify-center"
          >
            {/* Orbiting planets */}
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Center glow */}
              <motion.div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full blur-3xl opacity-40" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 5, repeat: Infinity }} />
              
              {/* Orbit 1 */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-teal-300/30 rounded-full"
              />
              
              {/* Orbit 2 */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-12 border-2 border-cyan-300/25 rounded-full"
              />

              {/* Planet 1*/}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <motion.button
                  onClick={() => {
                    const element = document.getElementById('keyfeatures')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-teal-300 via-teal-500 to-cyan-700 rounded-full shadow-2xl shadow-teal-500/70 flex items-center justify-center hover:shadow-teal-500/90 transition-all duration-300 cursor-pointer group z-20 pointer-events-auto border-2 border-teal-300/50"
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
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute inset-12"
              >
                <motion.button
                  onClick={() => {
                    const element = document.getElementById('howitwork')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-9 h-9 bg-gradient-to-br from-cyan-300 via-cyan-500 to-teal-600 rounded-full shadow-2xl shadow-cyan-500/70 flex items-center justify-center hover:shadow-cyan-500/90 transition-all duration-300 cursor-pointer group z-20 pointer-events-auto border-2 border-cyan-300/50"
                  title="Cách thức hoạt động"
                >
                  {/* Planet surface */}
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 to-cyan-400/10 rounded-full" />
                  {/* Planet shine */}
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-60" />
                  <Workflow className="w-5 h-5 text-white group-hover:scale-125 transition-transform relative z-10" />
                </motion.button>
              </motion.div>

              {/* Center circle - Rocket */}
              <motion.button
                onClick={() => openAuthModal('register')}
                className="absolute inset-1/3 bg-gradient-to-br from-cyan-400 via-teal-500 to-teal-700 rounded-full shadow-2xl shadow-teal-500/80 flex items-center justify-center hover:shadow-teal-500/100 transition-all duration-300 cursor-pointer group z-10 border-2 border-cyan-300/50"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                title="Tạo tài khoản"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 to-cyan-400/10 rounded-full" />
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-1 relative z-10">
                  <Rocket className="w-9 h-9 text-white group-hover:scale-125 transition-transform drop-shadow-lg" />
                  <span className="text-xs font-bold text-white whitespace-nowrap drop-shadow-md">Start</span>
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Featured Features Section */}
      <section id="keyfeatures" className="space-y-12 py-20">
        <div className="text-center space-y-3">
          <div className="inline-block px-4 py-2 bg-brand-100 rounded-full">
            <span className="text-sm font-semibold text-brand-600">Tính năng</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Tính năng nổi bật</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Những công cụ mạnh mẽ được thiết kế để giúp bạn thành công</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: <FileSearch className="w-10 h-10" />,
              title: 'Quét CV thông minh',
              desc: 'AI phân tích CV của bạn chi tiết, chỉ ra điểm mạnh, điểm yếu và đưa ra gợi ý cải thiện cụ thể để tăng khả năng được nhà tuyển dụng chú ý.'
            },
            {
              icon: <Brain className="w-10 h-10" />,
              title: 'Gợi ý nghề phù hợp',
              desc: 'Dựa trên kỹ năng và kinh nghiệm của bạn, hệ thống AI sẽ gợi ý các vị trí công việc phù hợp nhất với tiềm năng của bạn.'
            },
            {
              icon: <MessageSquare className="w-10 h-10" />,
              title: 'Chatbot tư vấn 24/7',
              desc: 'Trò chuyện với AI chatbot để nhận tư vấn về CV, kỹ năng, xu hướng thị trường việc làm bất cứ lúc nào bạn cần.'
            },
            {
              icon: <Mic className="w-10 h-10" />,
              title: 'Phỏng vấn bằng giọng nói',
              desc: 'Luyện tập phỏng vấn thực tế với AI, nhận phản hồi về cách nói, nội dung trả lời và cách cải thiện kỹ năng giao tiếp.'
            },
            {
              icon: <Target className="w-10 h-10" />,
              title: 'Danh mục việc làm',
              desc: 'Khám phá hàng nghìn vị trí công việc từ các công ty hàng đầu, lọc theo ngành, kỹ năng và mức lương mong muốn.'
            },
            {
              icon: <Zap className="w-10 h-10" />,
              title: 'Ứng tuyển nhanh chóng',
              desc: 'Ứng tuyển vào các vị trí phù hợp chỉ với một cú click, với CV đã được tối ưu hóa bởi AI.'
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(147, 51, 234, 0.15)' }}
              className="card flex gap-6 items-start hover:shadow-lg transition-all duration-300 bg-white border border-brand-200/50 hover:border-brand-300"
            >
              <motion.div className="text-brand-600 flex-shrink-0 mt-1" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}>
                {feature.icon}
              </motion.div>
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section id="howitwork" className="space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-block px-4 py-2 bg-brand-100 rounded-full">
            <span className="text-sm font-semibold text-brand-600">Quy trình</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Cách thức hoạt động</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Chỉ với 4 bước đơn giản, bạn đã có thể bắt đầu sử dụng QATTH</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Connecting arrows */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-brand-200 via-brand-300 to-brand-200 -z-10" />
          
          {[
            {
              icon: <User className="w-8 h-8" />,
              title: 'Tạo tài khoản',
              desc: 'Đăng ký tài khoản miễn phí chỉ trong vài giây để bắt đầu hành trình phát triển sự nghiệp của bạn'
            },
            {
              icon: <Upload className="w-8 h-8" />,
              title: 'Tải CV của bạn',
              desc: 'Upload CV hiện tại hoặc tạo CV mới với hệ thống hỗ trợ AI của chúng tôi'
            },
            {
              icon: <Sparkles className="w-8 h-8" />,
              title: 'AI phân tích',
              desc: 'Hệ thống AI sẽ phân tích chi tiết CV của bạn và đưa ra gợi ý cải thiện'
            },
            {
              icon: <Rocket className="w-8 h-8" />,
              title: 'Bắt đầu ứng tuyển',
              desc: 'Nhận các gợi ý việc làm phù hợp và bắt đầu ứng tuyển với sự tự tin'
            }
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="card h-full flex flex-col items-center text-center gap-4 bg-white hover:shadow-lg transition-shadow">
                {/* Step number badge */}
                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-brand-500/30">
                  {i + 1}
                </div>
                
                {/* Icon */}
                <div className="text-brand-600 mt-2">
                  {step.icon}
                </div>
                
                {/* Title */}
                <h3 className="font-bold text-lg text-slate-900">{step.title}</h3>
                
                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed flex-grow">{step.desc}</p>
              </div>

              {/* Arrow between steps */}
              {i < 3 && (
                <div className="hidden md:flex absolute -right-3 top-24 text-brand-300">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Chatbot Section Anchor */}
      <section id="chatbot" className="h-0" />

    </div>
  )
}
