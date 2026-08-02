import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { initials } from '../../utils/helpers'

export default function CustomerProfile() {
  const { user } = useAuth()
  return (
    <div className="max-w-xl space-y-6">
      <div className="card p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-ink text-paper flex items-center justify-center font-display text-xl font-bold">
          {initials(user.name)}
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-ink/60">{user.email}</p>
        </div>
      </div>
      <div className="card p-6 space-y-3 text-sm">
        <div className="flex justify-between"><span className="text-ink/50">Phone</span><span>{user.phone || '—'}</span></div>
        <div className="flex justify-between"><span className="text-ink/50">Role</span><span className="capitalize">{user.role}</span></div>
        <div className="flex justify-between"><span className="text-ink/50">Status</span><span className="capitalize">{user.status}</span></div>
      </div>
      <Link to="/customer/profile/edit" className="btn-primary inline-block">Edit profile</Link>
    </div>
  )
}
