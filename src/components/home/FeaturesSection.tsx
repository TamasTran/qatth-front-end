import { motion } from 'framer-motion'
import { memo } from 'react'
import { FileSearch, Brain, MessageSquare, Mic, Target, Zap, Star, Sparkles } from 'lucide-react'

const features = [
  {
    icon: <FileSearch className="w-10 h-10" />,
    title: 'Quét CV thông minh',
    desc: 'AI phân tích CV của bạn chi tiết, chỉ ra điểm mạnh, điểm yếu và đưa ra gợi ý cải thiện cụ thể để tăng khả năng được nhà tuyển dụng chú ý.',
    highlighted: false,
    iconColor: 'text-emerald-500'
  },
  {
    icon: <Brain className="w-10 h-10" />,
    title: 'Gợi ý nghề phù hợp',
    desc: 'Dựa trên kỹ năng và kinh nghiệm của bạn, hệ thống AI sẽ gợi ý các vị trí công việc phù hợp nhất với tiềm năng của bạn.',
    highlighted: true,
    iconColor: 'text-blue-600'
  },
  {
    icon: <MessageSquare className="w-10 h-10" />,
    title: 'Chatbot tư vấn 24/7',
    desc: 'Trò chuyện với AI chatbot để nhận tư vấn về CV, kỹ năng, xu hướng thị trường việc làm bất cứ lúc nào bạn cần.',
    highlighted: false,
    iconColor: 'text-purple-500'
  },
  {
    icon: <Mic className="w-10 h-10" />,
    title: 'Phỏng vấn bằng giọng nói',
    desc: 'Luyện tập phỏng vấn thực tế với AI, nhận phản hồi về cách nói, nội dung trả lời và cách cải thiện kỹ năng giao tiếp.',
    highlighted: true,
    iconColor: 'text-pink-600'
  },
  {
    icon: <Target className="w-10 h-10" />,
    title: 'Danh mục việc làm',
    desc: 'Khám phá hàng nghìn vị trí công việc từ các công ty hàng đầu, lọc theo ngành, kỹ năng và mức lương mong muốn.',
    highlighted: false,
    iconColor: 'text-orange-500'
  },
  {
    icon: <Zap className="w-10 h-10" />,
    title: 'Ứng tuyển nhanh chóng',
    desc: 'Ứng tuyển vào các vị trí phù hợp chỉ với một cú click, với CV đã được tối ưu hóa bởi AI.',
    highlighted: false,
    iconColor: 'text-yellow-500'
  }
]

function FeaturesSection() {
  return (
    <section id="keyfeatures" className=" relative -mt-16 pt-16 mx-[calc(50%-50vw)] w-screen max-w-[100vw] overflow-hidden space-y-12 py-20 mt-20 bg-gradient-to-b from-brand-100 to-blue-50 border-brand-400/50 shadow-lg">
      <div className="text-center space-y-3">
        <div className="inline-block px-4 py-2 bg-gradient-to-r from-amber-300 to-orange-300 rounded-full shadow-md">
          <span className="text-sm font-semibold text-amber-950">Web chúng tôi có gì?</span>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-slate-800 leading-[1.2] mb-4">Tính năng nổi bật</h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">Những công cụ mạnh mẽ được thiết kế để giúp bạn thành công</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 px-6 md:px-12 max-w-6xl mx-auto">
        {features.map((feature, i) => {
          const isJobRecommendation = i === 1
          const isInterviewPractice = i === 3
          const isHighlighted = feature.highlighted
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -3 }}
              className={`card flex gap-6 items-start hover:shadow-lg transition-all duration-300 relative ${
                isHighlighted
                  ? isJobRecommendation
                    ? 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 border border-blue-200 shadow-lg shadow-blue-200/40'
                    : 'bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 border border-pink-200 shadow-lg shadow-pink-200/40'
                  : 'bg-white border border-brand-200/50 hover:border-brand-300 hover:bg-brand-50/50'
              }`}
            >
              {isHighlighted && (
                <div className={`absolute -top-3 -right-3 px-2 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1 ${isJobRecommendation ? 'bg-blue-500' : 'bg-pink-500'}`}>
                  {isJobRecommendation ? (
                    <>
                      <Star className="w-3 h-3" />
                      Special
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3" />
                      Special
                    </>
                  )}
                </div>
              )}
              <div className={`flex-shrink-0 mt-1 ${isHighlighted ? (isJobRecommendation ? 'text-blue-600' : 'text-pink-600') : feature.iconColor}`}>
                {feature.icon}
              </div>
              <div className="flex-grow">
                <h3 className={`font-bold text-lg ${isHighlighted ? (isJobRecommendation ? 'text-blue-700' : 'text-pink-700') : 'text-slate-900'}`}>{feature.title}</h3>
                <p className={`text-sm leading-relaxed ${isHighlighted ? (isJobRecommendation ? 'text-blue-600' : 'text-pink-600') : 'text-slate-600'}`}>{feature.desc}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default memo(FeaturesSection)
