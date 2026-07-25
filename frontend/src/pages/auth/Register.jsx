import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/forms/Input'
import Select from '../../components/forms/Select'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { ROLES } from '../../constants'

export default function Register() {
  const { register } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: ROLES.CLIENT })
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const user = await register(form)
      addToast('Account created! Welcome to PhotoHub.', 'success')
      const dest = user.role === 'photographer' ? '/photographer/dashboard' : '/customer/dashboard'
      navigate(dest)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-1">Create your account</h1>
      <p className="text-sm text-ink/60 mb-8">Join as a client or list your photography services.</p>
      <form onSubmit={submit} className="space-y-4">
        <Input label="Full name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input label="Phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <Input label="Password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Select
          label="I am a..."
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          options={[{ value: ROLES.CLIENT, label: 'Client — booking a photographer' }, { value: ROLES.PHOTOGRAPHER, label: 'Photographer — offering services' }]}
        />
        <button className="btn-primary w-full" disabled={loading}>{loading ? 'Creating account...' : 'Create account'}</button>
      </form>
      <p className="text-sm text-ink/60 mt-6">
        Already have an account? <Link to="/login" className="text-brass font-medium hover:underline">Log in</Link>
      </p>
    </div>
  )
}
