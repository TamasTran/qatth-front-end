
import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { jobs } from '../../data/jobs'

export default function JobDetail() {
  const { id } = useParams()
  const job = useMemo(()=> jobs.find(j=>j.id===id), [id])
  const skills: string[] = JSON.parse(localStorage.getItem('qatth_cv_skills') || '[]')
  const set = new Set(skills.map(s=>s.toLowerCase()))
  const missing = (job?.tags || []).filter(t=> !set.has(t.toLowerCase()))

  if (!job) return <div className="card text-slate-900 font-semibold">Không tìm thấy công việc.</div>

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="card md:col-span-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-slate-900">{job.title}</h2>
          <span className="text-sm text-slate-700 font-medium">{job.company} • {job.location}</span>
        </div>
        <p className="text-sm text-brand-600 font-semibold mt-1">{job.salary}</p>
        <div className="mt-4">
          <h3 className="font-bold text-lg mb-2 text-slate-900">Mô tả</h3>
          <p className="text-slate-700 text-sm">{job.description}</p>
        </div>
        <div className="mt-4">
          <h3 className="font-bold text-lg mb-2 text-slate-900">Trách nhiệm</h3>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            {job.responsibilities.map((r,i)=>(<li key={i}>{r}</li>))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="font-bold text-lg mb-2 text-slate-900">Yêu cầu</h3>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            {job.requirements.map((r,i)=>(<li key={i}>{r}</li>))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="font-bold text-lg mb-2 text-slate-900">Quyền lợi</h3>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            {job.benefits.map((r,i)=>(<li key={i}>{r}</li>))}
          </ul>
        </div>
        <div className="mt-6 flex gap-3">
          <button className="btn btn-primary">Ứng tuyển ngay</button>
          <Link to="/jobs" className="btn btn-ghost">Quay lại</Link>
        </div>
      </div>
      <div className="card">
        <h3 className="font-bold text-lg mb-2 text-slate-900">Kỹ năng liên quan</h3>
        <div className="flex flex-wrap gap-2">
          {job.tags.map(t=> <span key={t} className="text-xs px-2 py-1 rounded-full bg-brand-50 text-brand-700 font-medium border border-brand-200/50">{t}</span>)}
        </div>
        <div className="mt-4">
          <h4 className="font-bold text-slate-900 mb-2">Thiếu kỹ năng</h4>
          {missing.length ? (
            <div className="flex flex-wrap gap-2">
              {missing.map(t=> <span key={t} className="text-xs px-2 py-1 rounded-full bg-accent-100 text-accent-700 font-medium">{t}</span>)}
            </div>
          ) : <p className="text-sm text-green-600 font-semibold">✓ Bạn đã có đủ kỹ năng chính!</p>}
        </div>
        <div className="mt-4">
          <h4 className="font-bold text-slate-900 mb-2">Gợi ý tiếp theo</h4>
          <p className="text-sm text-slate-700">Thực hiện mô phỏng phỏng vấn cho vị trí này để luyện tập.</p>
          <Link to="/interview" className="btn btn-ghost mt-2">Bắt đầu phỏng vấn</Link>
        </div>
      </div>
    </div>
  )
}
