
export default function Profile() {
  const user = JSON.parse(localStorage.getItem('qatth_session') || 'null')
  const skills: string[] = JSON.parse(localStorage.getItem('qatth_cv_skills') || '[]')
  const roles: any[] = JSON.parse(localStorage.getItem('qatth_cv_roles') || '[]')

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="card">
        <h2 className="font-semibold mb-2 text-slate-900">Tài khoản</h2>
        {user ? (
          <div className="text-sm text-slate-700">
            <div>Họ tên: {user.fullName}</div>
            <div>Email: {user.email}</div>
          </div>
        ) : <div className="text-slate-700">Chưa đăng nhập</div>}
      </div>
      <div className="card">
        <h3 className="font-semibold mb-2 text-slate-900">Kỹ năng từ CV</h3>
        <div className="flex flex-wrap gap-2">
          {skills.length ? skills.map(s=>(<span key={s} className="px-2 py-1 rounded-full bg-brand-200 text-brand-800 text-sm font-medium">{s}</span>)) : <p className="text-sm text-slate-700">Chưa quét CV.</p>}
        </div>
      </div>
      <div className="card">
        <h3 className="font-semibold mb-2 text-slate-900">Top nghề phù hợp</h3>
        <ol className="text-sm text-slate-700 list-decimal pl-4">
          {roles.slice(0,5).map((r,i)=>(<li key={i}>{r.title} — <span className="text-brand-700 font-bold">{Math.round(r.score*100)}%</span></li>))}
        </ol>
      </div>
    </div>
  )
}
