import { motion } from 'framer-motion'
import { memo } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/auth'

type OutletContextType = {
  openAuthModal: (mode: 'login' | 'register') => void
}

const pricingPlans = [
  {
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
    name: 'Medium',
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
    name: 'Pro',
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

function PricingSection() {
  const { user } = useAuth()
  const { openAuthModal } = useOutletContext<OutletContextType>()
  const navigate = useNavigate()

  return (
    <section id="pricing" className=" relative -mt-16 pt-16 mx-[calc(50%-50vw)] w-screen max-w-[100vw] overflow-hidden space-y-12 py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="text-center space-y-3">
        <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full">
          <span className="text-sm font-semibold text-purple-700">Bảng giá</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800">Chọn gói phù hợp với bạn</h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">Bắt đầu miễn phí, nâng cấp khi bạn cần thêm tính năng</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 px-6 md:px-12 max-w-6xl mx-auto">
        {pricingPlans.map((plan, i) => (
          <motion.div
            key={i}
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
              onClick={() => {
                if (plan.price === '0') {
                  openAuthModal('register')
                } else {
                  if (!user) {
                    openAuthModal('login')
                  } else {
                    navigate('/pricing')
                  }
                }
              }}
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
    </section>
  )
}

export default memo(PricingSection)
