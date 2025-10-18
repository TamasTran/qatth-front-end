
import { useEffect, useRef, useState } from 'react'

type Msg = { role: 'user' | 'assistant', content: string }

export default function Chatbot() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: 'Xin chào! Mình là QATTH bot. Hãy gửi CV (dán đoạn text) hoặc đặt câu hỏi về việc tối ưu CV/định hướng nghề.' }
  ])
  const [input, setInput] = useState('')
  const cvText = localStorage.getItem('qatth_cv_text') || ''
  const skills: string[] = JSON.parse(localStorage.getItem('qatth_cv_skills') || '[]')
  const roles: any[] = JSON.parse(localStorage.getItem('qatth_cv_roles') || '[]')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const reply = (userText: string): string => {
    const t = userText.toLowerCase()
    if (/kỹ năng|skill/.test(t)) {
      if (!skills.length) return 'Bạn hãy quét CV ở mục Quét CV trước để mình phân tích kỹ năng nhé.'
      return `Mình thấy trong CV có các kỹ năng nổi bật: ${skills.join(', ')}.`
    }
    if (/nghề|role|vị trí|phù hợp/.test(t)) {
      if (!roles.length) return 'Sau khi quét CV, mình sẽ gợi ý nghề nghiệp dựa trên kỹ năng của bạn.'
      const top = roles.slice(0,3).map(r=>`${r.title} (${Math.round(r.score*100)}%)`).join('; ')
      return `Top gợi ý nghề nghiệp của bạn: ${top}. Bạn có thể mở trang Tuyển dụng để xem mô tả chi tiết và ứng tuyển.`
    }
    if (/cv|resume|tối ưu|improve|chỉnh/.test(t)) {
      return 'Gợi ý nhanh: dùng 4-6 bullet mô tả mỗi kinh nghiệm, bắt đầu bằng động từ mạnh (Tối ưu, Xây dựng...). Thêm số liệu (%/time) để tăng tính thuyết phục. Đừng quên liên kết GitHub/Portfolio.'
    }
    if (/xin chào|hello|chào/.test(t)) {
      return 'Chào bạn! Hôm nay bạn muốn mình hỗ trợ điều gì về CV hay phỏng vấn?'
    }
    // default generic
    return 'Bạn có thể hỏi: "Kỹ năng mình nổi bật là gì?", "Gợi ý nghề nghiệp phù hợp?", "Làm sao tối ưu CV phần dự án?".'
  }

  const onSend = () => {
    if (!input.trim()) return
    const userMsg: Msg = { role:'user', content: input.trim() }
    setMessages(m=>[...m, userMsg])
    const res = reply(input.trim())
    setTimeout(()=>{
      setMessages(m=>[...m, { role:'assistant', content: res }])
    }, 250)
    setInput('')
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="card md:col-span-2">
        <h2 className="font-semibold mb-3">Chatbot tư vấn CV</h2>
        <div className="h-[420px] overflow-y-auto rounded-xl bg-slate-900/40 p-4 border border-white/10">
          {messages.map((m,i)=>(
            <div key={i} className={`mb-3 ${m.role==='user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block px-3 py-2 rounded-xl ${m.role==='user' ? 'bg-brand-600 text-white' : 'bg-white/10'}`}>
                {m.content}
              </div>
            </div>
          ))}
          <div ref={bottomRef}/>
        </div>
        <div className="mt-3 flex gap-2">
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Nhập câu hỏi..." className="flex-1 rounded-xl bg-slate-900 border border-white/10 p-3 ring-focus"/>
          <button onClick={onSend} className="btn btn-primary">Gửi</button>
        </div>
      </div>
      <div className="card">
        <h3 className="font-semibold mb-2">Thông tin đã quét</h3>
        <p className="text-sm text-slate-400">CV: {cvText ? 'Đã có dữ liệu' : 'Chưa có dữ liệu'}</p>
        <p className="text-sm text-slate-400 mb-2">Kỹ năng: {skills.length ? skills.join(', ') : '—'}</p>
        <a href="/cv-scanner" className="btn btn-ghost">Quét CV ngay</a>
      </div>
    </div>
  )
}
