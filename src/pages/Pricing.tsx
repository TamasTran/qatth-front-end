import { motion } from 'framer-motion'
import { Check, X, Zap, Shield, Users } from 'lucide-react'
import { useNavigate, useOutletContext } from 'react-router-dom'

type OutletContext = {
  openAuthModal?: (mode: 'login' | 'register') => void
}

export default function Pricing() {
  const navigate = useNavigate()
  const context = useOutletContext<OutletContext>()
  const openAuthModal = context?.openAuthModal

  const pricingPlans = [
    {
      id: 'free',
      name: 'Free',
      price: '0',
      description: 'Hoàn toàn miễn phí',
      features: [
        'Quét CV 1 lần/tháng',
        'Gợi ý nghề cơ bản',
        'Chatbot hỗ trợ cơ bản',
        'Không giới hạn xem việc làm'
      ],
      highlighted: false,
      badgeColor: 'bg-slate-500',
      bgGradient: 'from-slate-50 to-slate-100',
      borderColor: 'border-slate-200',
      textColor: 'text-slate-900',
      textColorDark: 'text-slate-800',
      buttonColor: 'bg-slate-600 hover:bg-slate-700'
    },
    {
      id: 'Premium',
      name: 'Premium',
      price: '59,000',
      description: 'Cho những người tìm việc nghiêm túc',
      features: [
        'Quét CV 10 lần/tháng',
        'Gợi ý nghề nâng cao',
        'Chatbot AI thông minh',
        'Mô phỏng phỏng vấn 5 lần',
        'Ưu tiên hỗ trợ',
        'Báo cáo chi tiết'
      ],
      highlighted: true,
      badgeColor: 'bg-amber-500',
      bgGradient: 'from-teal-100 via-emerald-100 to-teal-200',
      borderColor: 'border-amber-500',
      textColor: 'text-teal-950',
      textColorDark: 'text-teal-800',
      buttonColor: 'bg-teal-600 hover:bg-teal-700'
    },
    {
      id: 'Agent Pro',
      name: 'Agent Pro',
      price: '139,000',
      description: 'Cho những người muốn thành công',
      features: [
        'Quét CV không giới hạn',
        'Gợi ý nghề cá nhân hóa',
        'Chatbot AI 24/7',
        'Mô phỏng phỏng vấn không giới hạn',
        'Hỗ trợ ưu tiên cao',
        'Báo cáo chi tiết + phân tích',
        'Tư vấn 1-1 hàng tháng'
      ],
      highlighted: false,
      badgeColor: 'bg-purple-500',
      bgGradient: 'from-indigo-50 to-indigo-100',
      borderColor: 'border-indigo-200',
      textColor: 'text-indigo-900',
      textColorDark: 'text-indigo-800',
      buttonColor: 'bg-indigo-600 hover:bg-indigo-700'
    }
  ]

  const handleCTA = (planId: string) => {
    if (planId === 'free') {
      if (openAuthModal) {
        openAuthModal('register')
      } else {
        navigate('/register')
      }
    } else {
      navigate('/recharge')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 py-20"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Bảng Giá Dịch Vụ
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-brand-100 max-w-2xl mx-auto"
          >
            Từ gói miễn phí đến Agent Pro, tất cả các gói đều được thiết kế để giúp bạn thành công
          </motion.p>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className={`relative rounded-2xl p-5 transition-all ${
                plan.highlighted
                  ? `bg-gradient-to-br ${plan.bgGradient} border-2 ${plan.borderColor} shadow-lg shadow-teal-400/40 scale-105`
                  : `bg-gradient-to-br ${plan.bgGradient} border ${plan.borderColor} hover:shadow-md`
              }`}
            >
              {plan.highlighted && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-2 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 text-sm font-bold rounded-full shadow-xl`}>
                  Phổ biến nhất
                </div>
              )}
              
              <div className="space-y-1.5 mb-3">
                <h3 className={`text-xl font-bold ${plan.highlighted ? plan.textColor : plan.textColor}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs ${plan.highlighted ? plan.textColorDark : 'text-slate-600'}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-3xl font-bold ${plan.highlighted ? plan.textColor : 'text-brand-600'}`}>
                    {plan.price === '0' ? 'Miễn phí' : `${plan.price}đ`}
                  </span>
                  {plan.price !== '0' && (
                    <span className={`text-xs ${plan.highlighted ? plan.textColorDark : 'text-slate-600'}`}>
                      /tháng
                    </span>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCTA(plan.id)}
                className={`w-full py-2.5 rounded-lg font-semibold transition-all mb-3 text-sm text-white shadow-sm ${plan.buttonColor}`}
              >
                {plan.price === '0' ? 'Bắt đầu miễn phí' : 'Nâng cấp ngay'}
              </motion.button>

              <ul className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={`flex items-start gap-3 text-sm ${plan.highlighted ? plan.textColorDark : 'text-slate-700'}`}>
                    <span className={`text-lg mt-0.5 ${plan.highlighted ? plan.textColorDark : 'text-brand-500'}`}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl border border-brand-200 p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Câu hỏi thường gặp</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-slate-900 mb-2">Có thể nâng cấp hoặc hạ cấp bất cứ lúc nào không?</p>
              <p className="text-slate-600">Có, bạn có thể thay đổi gói của mình bất cứ lúc nào. Nếu nâng cấp, bạn sẽ được tính phí theo tỷ lệ.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-2">Có hoàn tiền không?</p>
              <p className="text-slate-600">Có, bạn có thể hoàn tiền trong 7 ngày nếu chưa sử dụng bất kỳ tính năng nào.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-2">Gói Pro và Premium khác nhau như thế nào?</p>
              <p className="text-slate-600">Gói Premium bao gồm tất cả tính năng của Pro cộng với hỗ trợ ưu tiên 24/7 từ đội ngũ của chúng tôi.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
