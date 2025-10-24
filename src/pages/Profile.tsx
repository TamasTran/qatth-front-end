
export default function Profile() {
  const user = JSON.parse(localStorage.getItem('qatth_session') || 'null')
  const skills: string[] = JSON.parse(localStorage.getItem('qatth_cv_skills') || '[]')
  const roles: any[] = JSON.parse(localStorage.getItem('qatth_cv_roles') || '[]')

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="card">
        <h2 className="font-bold text-lg mb-2 text-brand-600">Tài khoản</h2>
        {user ? (
          <div className="text-sm text-slate-700">
            <div className="font-medium text-slate-900">Họ tên: {user.fullName}</div>
            <div>Email: {user.email}</div>
          </div>
        ) : <div className="text-slate-600">Chưa đăng nhập</div>}
      </div>
      <div className="card">
        <h3 className="font-bold text-lg mb-2 text-brand-600">Kỹ năng từ CV</h3>
        <div className="flex flex-wrap gap-2">
          {skills.length ? skills.map(s=>(<span key={s} className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-sm font-medium border border-brand-200/50">{s}</span>)) : <p className="text-sm text-slate-600">Chưa quét CV.</p>}
        </div>
      </div>
      <div className="card">
        <h3 className="font-bold text-lg mb-2 text-brand-600">Top nghề phù hợp</h3>
        <ol className="text-sm text-slate-700 list-decimal pl-4">
          {roles.slice(0,5).map((r,i)=>(<li key={i}>{r.title} — <span className="text-brand-600 font-bold">{Math.round(r.score*100)}%</span></li>))}
        </ol>
      </div>
    </div>
  )
}
