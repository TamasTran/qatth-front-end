
import { motion } from 'framer-motion'
import { Link, useOutletContext } from 'react-router-dom'
import { Briefcase, FileSearch, MessageSquare, Mic } from 'lucide-react'
import { useAuth } from '../store/auth'

type OutletContextType = {
  openAuthModal: (mode: 'login' | 'register') => void
}

export default function Home() {
  const { user } = useAuth()
  const { openAuthModal } = useOutletContext<OutletContextType>()

  return (
    <div className="space-y-16">
      {!user && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white rounded-3xl p-8 md:p-12 border border-brand-200/40 shadow-sm"
        >
          <h2 className="text-3xl md:text-4xl text-slate-900 font-bold mb-3">Sẵn sàng bắt đầu?</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto text-lg">Đăng nhập để trải nghiệm đầy đủ tính năng của QATTH - AI hiểu bạn, Doanh nghiệp chọn bạn.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button onClick={() => openAuthModal('register')} className="btn btn-primary ring-focus px-6 py-3 text-base">Tạo tài khoản</button>
            <button onClick={() => openAuthModal('login')} className="btn btn-ghost ring-focus px-6 py-3 text-base">Đăng nhập</button>
          </div>
        </motion.section>
      )}
      <section className="relative overflow-hidden rounded-3xl p-10 md:p-16 bg-white shadow-lg border border-brand-200/40">
        <div className="absolute -top-32 -left-32 size-96 rounded-full bg-brand-600/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-brand-400/4 blur-3xl" />
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: .6 }}
            className="space-y-6"
          >
          <img src="/logo.png" alt="QATTH" className="h-[80px] w-[120px] object-contain drop-shadow-lg" />

            <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-brand-700 to-brand-600 bg-clip-text text-transparent">
              QATTH
            </h1>
            <p className="text-xl font-semibold text-slate-900">AI hiểu bạn, Doanh nghiệp chọn bạn</p>
            <p className="text-slate-700 max-w-xl text-lg leading-relaxed">
              Quét CV thông minh, gợi ý nghề phù hợp, chatbot tư vấn và mô phỏng phỏng vấn bằng giọng nói.
              Tất cả trên một giao diện hiện đại, mượt mà.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/cv-scanner" className="btn btn-primary ring-focus px-6 py-3 text-base">Bắt đầu quét CV</Link>
              <Link to="/jobs" className="btn btn-ghost ring-focus px-6 py-3 text-base">Khám phá việc làm</Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: .95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: .6, delay: .1 }}
            className="grid grid-cols-2 gap-5"
          >
            {[
              {icon: <FileSearch/>, title:'Quét CV & gợi ý nghề'},
              {icon: <MessageSquare/>, title:'Chatbot tư vấn CV'},
              {icon: <Briefcase/>, title:'Danh mục việc làm'},
              {icon: <Mic/>, title:'Phỏng vấn bằng giọng nói'},
            ].map((it,i)=>(
              <motion.div key={i} whileHover={{ y: -6, scale: 1.02 }} className="card h-40 flex flex-col items-center justify-center text-center gap-3 bg-white border-brand-200/40 shadow-sm hover:shadow-lg">
                <div className="text-brand-600 text-4xl">{it.icon}</div>
                <div className="text-sm font-semibold text-slate-900">{it.title}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        {[
          {title:'Tối giản & đẹp mắt', desc:'Thiết kế hiện đại với hiệu ứng chuyển động mượt. Tập trung vào nội dung, không phiền toái.'},
          {title:'Cập nhật xu hướng', desc:'UI theo chuẩn 2025: gradient, card, motion subtle, accessibility tốt, responsive.'},
          {title:'Dễ tích hợp AI', desc:'Sẵn sàng nối backend hoặc OpenAI API cho đánh giá CV nâng cao và tư vấn thông minh.'},
        ].map((it, i) => (
          <motion.div key={i} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} whileHover={{y:-4}} className="card">
            <h3 className="font-bold text-lg mb-3 text-brand-600">{it.title}</h3>
            <p className="text-slate-700 text-sm leading-relaxed">{it.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  )
}
