
import { useEffect, useRef, useState } from 'react'

type Question = { q: string, keywords: string[] }

const bank: Record<string, Question[]> = {
  generic: [
    { q: 'Hãy giới thiệu ngắn gọn về bản thân và mục tiêu nghề nghiệp của bạn.', keywords: ['mục tiêu','kinh nghiệm','điểm mạnh'] },
    { q: 'Kể về một dự án gần đây mà bạn tự hào nhất.', keywords: ['dự án','kết quả','vai trò'] },
    { q: 'Một lần bạn gặp khó khăn kỹ thuật và cách bạn giải quyết?', keywords: ['vấn đề','giải pháp','bài học'] },
  ],
  frontend: [
    { q: 'Sự khác nhau giữa state và props trong React?', keywords: ['state','props'] },
    { q: 'Bạn tối ưu hiệu năng React như thế nào?', keywords: ['memo','useMemo','useCallback'] },
    { q: 'Giải thích cơ chế CSS specificity.', keywords: ['specificity','ưu tiên css'] },
  ],
  backend: [
    { q: 'So sánh REST và GraphQL.', keywords: ['rest','graphql'] },
    { q: 'Thiết kế khoá ngoại và index trong SQL?', keywords: ['index','foreign key'] },
    { q: 'Triển khai xác thực JWT như thế nào?', keywords: ['jwt','token'] },
  ],
  'data-analyst': [
    { q: 'Quy trình ETL bạn thường sử dụng?', keywords: ['etl','clean','transform'] },
    { q: 'Viết một truy vấn SQL để lấy top 5 sản phẩm bán chạy.', keywords: ['sql','group','order'] },
    { q: 'Khi nào dùng median thay vì mean?', keywords: ['median','mean','ngoại lệ'] },
  ]
}

declare global {
  interface Window { webkitSpeechRecognition: any }
}

export default function Interview() {
  const [running, setRunning] = useState(false)
  const [idx, setIdx] = useState(0)
  const [role, setRole] = useState('generic')
  const [transcript, setTranscript] = useState('')
  const [scores, setScores] = useState<number[]>([])
  const recRef = useRef<any>(null)

  const roles: any[] = JSON.parse(localStorage.getItem('qatth_cv_roles') || '[]')
  useEffect(()=>{
    if (roles?.length) {
      const map: Record<string,string> = { frontend:'frontend', 'data-analyst':'data-analyst', backend:'backend' }
      const first = roles[0].id
      const r = map[first] || 'generic'
      setRole(r)
    }
  }, [])

  const questions = bank[role as keyof typeof bank] || bank.generic

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'vi-VN'
    speechSynthesis.speak(u)
  }

  const startRec = () => {
    // Web Speech API (Chrome)
    const Rec = (window as any).webkitSpeechRecognition
    if (!Rec) {
      alert('Trình duyệt của bạn chưa hỗ trợ Speech Recognition. Hãy dùng Chrome.')
      return
    }
    const rec = new Rec()
    rec.lang = 'vi-VN'
    rec.continuous = false
    rec.interimResults = false
    rec.onresult = (e:any) => {
      const text = Array.from(e.results).map((r:any)=>r[0].transcript).join(' ')
      setTranscript(text)
      score(text)
    }
    rec.onend = () => setRunning(false)
    rec.onerror = () => setRunning(false)
    recRef.current = rec
    rec.start()
    setRunning(true)
  }

  const score = (ans: string) => {
    const kw = questions[idx].keywords.map(k=>k.toLowerCase())
    const lower = ans.toLowerCase()
    const hit = kw.filter(k=> lower.includes(k)).length
    const s = Math.round( (hit/Math.max(1,kw.length)) * 100 )
    setScores(prev => {
      const next = [...prev]; next[idx] = s; return next
    })
  }

  const next = () => {
    setTranscript('')
    setIdx(i => Math.min(i+1, questions.length-1))
  }

  const begin = () => {
    setIdx(0); setScores([]); setTranscript('')
    speak('Chào bạn, chúng ta bắt đầu phỏng vấn mô phỏng. Trả lời sau tiếng bíp.')
    setTimeout(()=> { speak(questions[0].q); startRec() }, 1200)
  }

  const askAgain = () => {
    speak(questions[idx].q)
    startRec()
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="card md:col-span-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-slate-900">Phỏng vấn mô phỏng bằng giọng nói</h2>
          <select value={role} onChange={e=>setRole(e.target.value)} className="bg-brand-50 border border-brand-300/60 rounded-xl p-2 text-slate-900">
            <option value="generic">Chung</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="data-analyst">Data Analyst</option>
          </select>
        </div>
        <div className="rounded-xl border border-brand-300/40 p-4 bg-brand-50/50">
          <div className="text-sm text-slate-700">Câu hỏi {idx+1}/{questions.length}</div>
          <div className="text-lg mt-2 text-slate-900">{questions[idx].q}</div>
          <div className="mt-4 flex gap-2">
            {!running ? (
              <>
                <button className="btn btn-primary" onClick={askAgain}>Nghe lại câu hỏi & trả lời</button>
                <button className="btn btn-ghost" onClick={begin}>Bắt đầu lại</button>
              </>
            ) : (
              <button className="btn btn-ghost" onClick={()=> recRef.current?.stop()}>Dừng ghi âm</button>
            )}
            <button className="btn btn-ghost" onClick={next}>Câu tiếp</button>
          </div>
          <div className="mt-4">
            <div className="text-sm text-slate-700">Bản ghi câu trả lời:</div>
            <div className="min-h-[80px] rounded-xl bg-slate-100 border border-brand-300/40 p-3 text-slate-900">{transcript || '—'}</div>
            <div className="mt-2 text-sm text-slate-900">Điểm từ khoá: <span className="text-brand-700 font-bold">{scores[idx] ?? 0}</span>/100</div>
          </div>
        </div>
      </div>
      <div className="card">
        <h3 className="font-semibold mb-2 text-slate-900">Mẹo trả lời tốt</h3>
        <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
          <li>STAR: Situation - Task - Action - Result</li>
          <li>Đưa số liệu cụ thể (%, thời gian, chi phí)</li>
          <li>Liên hệ vị trí đang ứng tuyển</li>
        </ul>
        <div className="mt-4">
          <h4 className="font-medium mb-1 text-slate-900">Kết quả phiên</h4>
          <div className="text-sm text-slate-700">Điểm trung bình: {Math.round( (scores.reduce((a,b)=>a+(b||0),0) / Math.max(1,scores.length)) || 0 )}/100</div>
        </div>
      </div>
    </div>
  )
}
