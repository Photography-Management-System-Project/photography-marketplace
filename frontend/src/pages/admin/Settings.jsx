import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Input from '../../components/forms/Input'
import { useToast } from '../../context/ToastContext'

export default function AdminSettings() {
  const { user } = useAuth()
  const { addToast } = useToast()
  const [form, setForm] = useState({ name: user.name, email: user.email })
  const [commissionRate, setCommissionRate] = useState(10)

  function save(e) {
    e.preventDefault()
    addToast('Settings saved.', 'success')
  }

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="font-display text-xl font-semibold">Settings</h2>
      <form onSubmit={save} className="card p-6 space-y-4">
        <h3 className="font-semibold text-sm text-ink/60 uppercase tracking-wide">Admin profile</h3>
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <h3 className="font-semibold text-sm text-ink/60 uppercase tracking-wide pt-2">Platform</h3>
        <Input label="Commission rate (%)" type="number" value={commissionRate} onChange={(e) => setCommissionRate(e.target.value)} />
        <button className="btn-primary w-full">Save settings</button>
      </form>
    </div>
  )
}
