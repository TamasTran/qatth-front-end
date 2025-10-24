
import { useEffect, useState } from 'react'
import { analyzeCV, extractTextFromPDF } from '../utils/cv'
import { Link } from 'react-router-dom'

export default function CVScanner() {
  const [text, setText] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [roles, setRoles] = useState<{id:string; title:string; score:number; overlap:number}[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|null>(null)

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
      } else {
        const t = await f.text()
        setText(t)
      }
    } catch (e:any) {
      console.error(e)
      setError('Không đọc được tệp. Hãy dán nội dung CV hoặc thử file khác.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h2 className="font-semibold mb-2 text-slate-900">Tải lên hoặc dán CV của bạn</h2>
        <p className="text-sm text-slate-700 mb-4">Hỗ trợ PDF/TXT. Phân tích diễn ra trên trình duyệt — dữ liệu của bạn an toàn.</p>
        <label className="btn btn-ghost">
          <input type="file" className="hidden" accept=".pdf,.txt" onChange={(e)=>{ const f=e.target.files?.[0]; if(f) onFile(f) }} />
          Chọn tệp CV
        </label>
        <div className="mt-4">
          <textarea
            value={text}
            onChange={e=>setText(e.target.value)}
            className="w-full min-h-[220px] rounded-xl bg-slate-900 border border-white/10 p-3 ring-focus"
            placeholder="Dán nội dung CV vào đây..."
          />
        </div>
        {loading && <p className="text-sm text-slate-700 mt-2">Đang đọc tệp...</p>}
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      </div>
      <div className="space-y-6">
        <div className="card">
          <h3 className="font-semibold mb-2 text-slate-900">Kỹ năng phát hiện</h3>
          <div className="flex flex-wrap gap-2">
            {skills.length ? skills.map(s=>(<span key={s} className="px-2 py-1 rounded-full bg-brand-200 text-brand-800 text-sm font-medium">{s}</span>)) : <p className="text-slate-700 text-sm">Chưa có dữ liệu.</p>}
          </div>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-3 text-slate-900">Gợi ý nghề nghiệp phù hợp</h3>
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
            {!roles.length && <p className="text-slate-700 text-sm">Hãy tải lên hoặc dán CV để xem gợi ý.</p>}
          </div>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2 text-slate-900">Tiếp theo</h3>
          <div className="flex gap-3">
            <Link to="/chatbot" className="btn btn-ghost">Hỏi chatbot về CV</Link>
            <Link to="/interview" className="btn btn-primary">Mô phỏng phỏng vấn</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
