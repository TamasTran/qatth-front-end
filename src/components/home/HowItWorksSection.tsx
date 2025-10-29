import { motion } from 'framer-motion'
import { memo } from 'react'
import { User, Upload, Sparkles, Rocket, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: <User className="w-8 h-8" />,
    title: 'Tạo tài khoản',
    desc: 'Đăng ký tài khoản miễn phí chỉ trong vài giây để bắt đầu hành trình phát triển sự nghiệp của bạn',
    iconColor: 'text-blue-500'
  },
  {
    icon: <Upload className="w-8 h-8" />,
    title: 'Tải CV của bạn',
    desc: 'Upload CV hiện tại hoặc tạo CV mới với hệ thống hỗ trợ AI của chúng tôi',
    iconColor: 'text-green-500'
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'AI phân tích',
    desc: 'Hệ thống AI sẽ phân tích chi tiết CV của bạn và đưa ra gợi ý cải thiện',
    iconColor: 'text-yellow-500'
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: 'Bắt đầu ứng tuyển',
    desc: 'Nhận các gợi ý việc làm phù hợp và bắt đầu ứng tuyển với sự tự tin',
    iconColor: 'text-red-500'
  }
]

function HowItWorksSection() {
  return (
    <section id="howitwork" className="relative -mt-16 pt-16 mx-[calc(50%-50vw)] w-screen max-w-[100vw] overflow-hidden space-y-12 py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="text-center space-y-3">
        <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full">
          <span className="text-sm font-semibold text-blue-700">Quy trình</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800">Cách thức hoạt động</h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">Chỉ với 4 bước đơn giản, bạn đã có thể bắt đầu sử dụng QATTH</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 relative px-6 md:px-12 max-w-6xl mx-auto">
        {/* Connecting arrows */}
        <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-brand-200 via-brand-300 to-brand-200 -z-10" />
        
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="card h-full flex flex-col items-center text-center gap-4 bg-white hover:shadow-lg transition-shadow">
              {/* Step number badge */}
              <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/30">
                {i + 1}
              </div>
              
              {/* Icon */}
              <div className={`${step.iconColor} mt-2`}>
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
  )
}

export default memo(HowItWorksSection)
