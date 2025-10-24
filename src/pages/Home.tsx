
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Briefcase, FileSearch, MessageSquare, Mic } from 'lucide-react'
import { useAuth } from '../store/auth'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="space-y-14">
      {!user && (
        <section className="text-center">
          <h2 className="text-2xl text-slate-900 font-semibold mb-3">Sẵn sàng bắt đầu?</h2>
          <p className="text-slate-900 mb-6">Đăng nhập để trải nghiệm đầy đủ tính năng của QATTH.</p>
          <div className="flex items-center [&>a]:text-slate-900 justify-center gap-3">
            <Link to="/register" className="btn btn-primary ring-focus">Tạo tài khoản</Link>
            <Link to="/login" className="btn btn-ghost ring-focus">Đăng nhập</Link>
          </div>
        </section>
      )}
      <section className="relative overflow-hidden rounded-3xl border border-transparent p-10 md:p-16 bg-[linear-gradient(-30deg,#1A1F2B_0%,#2C3E50_50%,#5C6E75_100%)] shadow-lg">
        <div className="absolute -top-10 -left-10 size-64 rounded-full bg-brand-600/20 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 size-64 rounded-full bg-brand-400/20 blur-3xl" />
        <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: .6 }}
            className="space-y-5"
          >
          <img src="/logo.png" alt="QATTH" className="h-[80px] w-[120px] object-contain drop-shadow-lg" />

            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              QATTH — AI hiểu bạn <span className="text-brand-400">Doanh nghiệp</span> chọn bạn
            </h1>
            <p className="text-slate-300 max-w-xl">
              Quét CV thông minh, gợi ý nghề phù hợp, chatbot tư vấn và mô phỏng phỏng vấn bằng giọng nói.
              Tất cả trên một giao diện hiện đại, mượt mà.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/cv-scanner" className="btn btn-primary ring-focus">Bắt đầu quét CV</Link>
              <Link to="/jobs" className="btn btn-ghost ring-focus">Khám phá việc làm</Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: .95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: .6, delay: .1 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              {icon: <FileSearch/>, title:'Quét CV & gợi ý nghề'},
              {icon: <MessageSquare/>, title:'Chatbot tư vấn CV'},
              {icon: <Briefcase/>, title:'Danh mục việc làm'},
              {icon: <Mic/>, title:'Phỏng vấn bằng giọng nói'},
            ].map((it,i)=>(
              <motion.div key={i} whileHover={{ y: -4 }} className="card h-36 flex items-center justify-center text-center gap-3">
                <div className="opacity-80">{it.icon}</div>
                <div className="text-sm">{it.title}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        {[
          {title:'Tối giản & đẹp mắt', desc:'Thiết kế glassmorphism với hiệu ứng chuyển động mượt. Tập trung vào nội dung.'},
          {title:'Cập nhật xu hướng', desc:'UI theo chuẩn 2025: dark theme, card, motion subtle, a11y tốt.'},
          {title:'Dễ tích hợp AI', desc:'Sẵn sàng nối backend hoặc OpenAI API cho đánh giá CV nâng cao.'},
        ].map((it, i) => (
          <motion.div key={i} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.05}} className="card">
            <h3 className="font-semibold mb-2">{it.title}</h3>
            <p className="text-slate-300 text-sm">{it.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  )
}
