import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { userService } from '../../services/userService'
import Input from '../../components/forms/Input'

export default function EditProfile() {
  const { user } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: user.name, phone: user.phone || '', email: user.email })
  const [saving, setSaving] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setSaving(true)
    await userService.update(user.user_id, form)
    addToast('Profile updated.', 'success')
    setSaving(false)
    navigate('/customer/profile')
  }

  return (
    <div className="max-w-xl">
      <h2 className="font-display text-xl font-semibold mb-6">Edit profile</h2>
      <form onSubmit={submit} className="card p-6 space-y-4">
        <Input label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <button className="btn-primary w-full" disabled={saving}>{saving ? 'Saving...' : 'Save changes'}</button>
      </form>
    </div>
  )
}
