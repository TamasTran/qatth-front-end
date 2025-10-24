
import { Link } from 'react-router-dom'
import { jobs } from '../../data/jobs'

export default function Jobs() {
  const roles: any[] = JSON.parse(localStorage.getItem('qatth_cv_roles') || '[]')
  const topTag = roles?.[0]?.id || ''

  const matchScore = (tags: string[]) => {
    const skills: string[] = JSON.parse(localStorage.getItem('qatth_cv_skills') || '[]')
    const set = new Set(skills.map(s=>s.toLowerCase()))
    const hit = tags.filter(t=>set.has(t.toLowerCase())).length
    return Math.round( (hit / Math.max(1, tags.length)) * 100 )
  }

  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-3xl font-bold text-brand-800">Tuyển dụng</h2>
        <p className="text-sm text-slate-600">Gợi ý dựa trên kỹ năng từ CV (nếu có).</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {jobs.map(j => (
          <Link key={j.id} to={`/jobs/${j.id}`} className="card hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold text-slate-900">{j.title}</div>
              <div className="text-xs px-2 py-1 bg-brand-100 text-brand-700 font-bold rounded-full">{matchScore(j.tags)}% match</div>
            </div>
            <div className="text-sm text-slate-700 font-medium">{j.company} • {j.location}</div>
            <div className="text-xs text-brand-600 mt-1 font-semibold">{j.salary}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {j.tags.map(t => <span key={t} className="text-xs px-2 py-1 rounded-full bg-brand-50 text-brand-700 font-medium border border-brand-200/50">{t}</span>)}
            </div>
            <p className="text-sm text-slate-700 mt-3 line-clamp-3">{j.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
