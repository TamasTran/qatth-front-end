
import { motion } from 'framer-motion'
import { Link, useOutletContext } from 'react-router-dom'
import { Briefcase, FileSearch, MessageSquare, Mic, User, Upload, Sparkles, Rocket, ArrowRight, Zap, Brain, Target, Clock, Users, TrendingUp, Lightbulb } from 'lucide-react'
import { useAuth } from '../store/auth'

type OutletContextType = {
  openAuthModal: (mode: 'login' | 'register') => void
}

export default function Home() {
  const { user } = useAuth()
  const { openAuthModal } = useOutletContext<OutletContextType>()

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl p-12 md:p-20 bg-gradient-to-br from-brand-50 via-brand-50/50 to-brand-100/30">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-200/10 rounded-full blur-3xl" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center space-y-8 max-w-3xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-brand-200/50 rounded-full">
            <Lightbulb className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-semibold text-brand-600">Nền tảng AI tuyên dụng thông minh</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
              Sẵn sàng <span className="text-brand-600">bắt đầu?</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              Đăng nhập để trải nghiệm đầy đủ tính năng của QATTH
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => openAuthModal('register')} 
              className="btn btn-primary ring-focus px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Tạo tài khoản →
            </button>
            <button 
              onClick={() => openAuthModal('login')} 
              className="btn btn-ghost ring-focus px-8 py-3 text-base font-semibold hover:bg-brand-50"
            >
              Đăng nhập
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 border-t border-brand-200/30">
            {[
              { icon: <Users className="w-5 h-5" />, label: '10,000+ ứng viên' },
              { icon: <TrendingUp className="w-5 h-5" />, label: '1,000+ doanh nghiệp' },
              { icon: <Lightbulb className="w-5 h-5" />, label: 'AI phân tích thông minh' }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-600">
                <span className="text-brand-600">{stat.icon}</span>
                <span className="text-sm font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
      {/* Featured Features Section */}
      <section className="space-y-12">
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
              className="card flex gap-6 items-start hover:shadow-lg transition-shadow"
            >
              <div className="text-brand-600 flex-shrink-0 mt-1">
                {feature.icon}
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-block px-4 py-2 bg-brand-100 rounded-full">
            <span className="text-sm font-semibold text-brand-600">Quy trình</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Cách thức hoạt động</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Chỉ với 4 bước đơn giản, bạn đã có thể bắt đầu sử dụng QATTH</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Connecting arrows */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200 -z-10" />
          
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
                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
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
                <div className="hidden md:flex absolute -right-3 top-24 text-brand-400">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
