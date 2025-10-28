import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
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
        { name: 'Quét CV 1 lần/tháng', included: true },
        { name: 'Gợi ý nghề cơ bản', included: true },
        { name: 'Chatbot hỗ trợ cơ bản', included: true },
        { name: 'Không giới hạn xem việc làm', included: true },
        { name: 'Mô phỏng phỏng vấn', included: false },
        { name: 'Ưu tiên hỗ trợ', included: false },
        { name: 'Báo cáo chi tiết', included: false },
      ],
      cta: 'Bắt đầu',
      highlight: false,
    },
    {
      id: 'medium',
      name: 'Medium',
      price: '59,000',
      period: '/tháng',
      description: 'Cho những người tìm việc nghiêm túc',
      features: [
        { name: 'Quét CV 10 lần/tháng', included: true },
        { name: 'Gợi ý nghề nâng cao', included: true },
        { name: 'Chatbot AI thông minh', included: true },
        { name: 'Mô phỏng phỏng vấn 5 lần', included: true },
        { name: 'Ưu tiên hỗ trợ', included: true },
        { name: 'Báo cáo chi tiết', included: true },
        { name: 'Tư vấn 1-1', included: false },
      ],
      cta: 'Nâng cấp',
      highlight: true,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '139,000',
      period: '/tháng',
      description: 'Cho những người muốn thành công',
      features: [
        { name: 'Quét CV không giới hạn', included: true },
        { name: 'Gợi ý nghề cá nhân hóa', included: true },
        { name: 'Chatbot AI 24/7', included: true },
        { name: 'Mô phỏng phỏng vấn không giới hạn', included: true },
        { name: 'Hỗ trợ ưu tiên cao', included: true },
        { name: 'Báo cáo chi tiết + phân tích', included: true },
        { name: 'Tư vấn 1-1 hàng tháng', included: true },
      ],
      cta: 'Nâng cấp',
      highlight: false,
    },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            Chọn gói phù hợp với bạn
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Từ miễn phí đến premium, tất cả các gói đều được thiết kế để giúp bạn thành công
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-2xl p-8 transition-all ${
                plan.highlight
                  ? 'bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-2xl shadow-brand-500/30 scale-105'
                  : 'bg-white border border-brand-200/50 hover:border-brand-300 hover:shadow-lg'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-slate-900 text-sm font-bold rounded-full">
                  Phổ biến nhất
                </div>
              )}
              
              <div className="space-y-4 mb-6">
                <h3 className={`text-2xl font-bold ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.highlight ? 'text-white/80' : 'text-slate-600'}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-brand-600'}`}>
                    {plan.price === '0' ? 'Miễn phí' : `${plan.price}đ`}
                  </span>
                  {plan.period && (
                    <span className={`text-sm ${plan.highlight ? 'text-white/70' : 'text-slate-600'}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCTA(plan.id)}
                className={`w-full py-3 rounded-lg font-semibold transition-all mb-6 ${
                  plan.highlight
                    ? 'bg-white text-brand-600 hover:bg-slate-100'
                    : 'bg-brand-500 text-white hover:bg-brand-600'
                }`}
              >
                {plan.cta}
              </motion.button>

              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={`flex items-start gap-3 text-sm ${plan.highlight ? 'text-white/90' : 'text-slate-700'}`}>
                    <span className={`text-lg mt-0.5 ${plan.highlight ? 'text-yellow-300' : 'text-brand-500'}`}>✓</span>
                    {feature.name}
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
