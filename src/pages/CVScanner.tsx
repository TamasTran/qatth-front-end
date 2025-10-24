
import { useEffect, useState } from 'react'
import { analyzeCV, extractTextFromPDF } from '../utils/cv'
import { Link } from 'react-router-dom'

export default function CVScanner() {
  const [text, setText] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [roles, setRoles] = useState<{id:string; title:string; score:number; overlap:number}[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|null>(null)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(()=>{
    if (text.trim().length) {
      const res = analyzeCV(text)
      setSkills(res.skills)
      setRoles(res.roleMatches)
      localStorage.setItem('qatth_cv_text', text)
      localStorage.setItem('qatth_cv_skills', JSON.stringify(res.skills))
      localStorage.setItem('qatth_cv_roles', JSON.stringify(res.roleMatches))
    } else {
      setSkills([]); setRoles([])
    }
  },[text])

  const onFile = async (f: File) => {
    setError(null); setLoading(true)
    try {
      if (f.type === 'application/pdf') {
        const t = await extractTextFromPDF(f)
        setText(t)
      } else if (f.type === 'text/plain' || f.name.endsWith('.txt')) {
        const t = await f.text()
        setText(t)
      } else {
        setError('Chỉ hỗ trợ file PDF và TXT.')
      }
    } catch (e:any) {
      console.error(e)
      setError('Không đọc được tệp. Hãy dán nội dung CV hoặc thử file khác.')
    } finally {
      setLoading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const f = files[0]
      if (f.type === 'application/pdf' || f.type === 'text/plain' || f.name.endsWith('.txt') || f.name.endsWith('.pdf')) {
        onFile(f)
      } else {
        setError('Chỉ hỗ trợ file PDF và TXT.')
      }
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h2 className="font-bold text-lg mb-2 text-slate-900">Tải lên hoặc dán CV của bạn</h2>
        <p className="text-sm text-slate-600 mb-4">Hỗ trợ PDF/TXT. Phân tích diễn ra trên trình duyệt — dữ liệu của bạn an toàn.</p>
        <label className="btn btn-ghost">
          <input type="file" className="hidden" accept=".pdf,.txt" onChange={(e)=>{ const f=e.target.files?.[0]; if(f) onFile(f) }} />
          Chọn tệp CV
        </label>
        <div 
          className={`mt-4 rounded-xl border-2 transition-all ${isDragging ? 'border-brand-600 bg-brand-50/30' : 'border-brand-200/60 bg-white'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <textarea
            value={text}
            onChange={e=>setText(e.target.value)}
            className="w-full min-h-[220px] rounded-xl p-3 ring-focus text-slate-900 placeholder-slate-400 bg-transparent resize-none"
            placeholder="Dán nội dung CV vào đây hoặc thả file PDF/TXT..."
          />
        </div>
        {loading && <p className="text-sm text-slate-600 mt-2">Đang đọc tệp...</p>}
        {error && <p className="text-sm text-accent-600 mt-2">{error}</p>}
      </div>
      <div className="space-y-6">
        <div className="card">
          <h3 className="font-bold text-lg mb-2 text-brand-600">Kỹ năng phát hiện</h3>
          <div className="flex flex-wrap gap-2">
            {skills.length ? skills.map(s=>(<span key={s} className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-sm font-medium border border-brand-200/50">{s}</span>)) : <p className="text-slate-600 text-sm">Chưa có dữ liệu.</p>}
          </div>
        </div>
        <div className="card">
          <h3 className="font-bold text-lg mb-3 text-brand-600">Gợi ý nghề nghiệp phù hợp</h3>
          <div className="space-y-3">
            {roles.slice(0,5).map(r=>(
              <div key={r.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900">{r.title}</div>
                  <div className="text-xs text-slate-600">Độ phù hợp: {(r.score*100).toFixed(0)}% — Trùng {r.overlap} kỹ năng</div>
                </div>
                <Link to="/jobs" className="btn btn-primary">Xem việc phù hợp</Link>
              </div>
            ))}
            {!roles.length && <p className="text-slate-600 text-sm">Hãy tải lên hoặc dán CV để xem gợi ý.</p>}
          </div>
        </div>
        <div className="card">
          <h3 className="font-bold text-lg mb-2 text-brand-600">Tiếp theo</h3>
          <div className="flex gap-3">
            <Link to="/chatbot" className="btn btn-ghost">Hỏi chatbot về CV</Link>
            <Link to="/interview" className="btn btn-primary">Mô phỏng phỏng vấn</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
