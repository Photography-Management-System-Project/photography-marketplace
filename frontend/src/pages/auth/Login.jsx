import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/forms/Input'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

export default function Login() {
  const { login } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(form.email, form.password)
      addToast(`Welcome back, ${user.name.split(' ')[0]}!`, 'success')
      const dest = user.role === 'admin' ? '/admin/dashboard' : user.role === 'photographer' ? '/photographer/dashboard' : '/customer/dashboard'
      navigate(dest)
    } catch (err) {
      setError(err.message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-1">Welcome back</h1>
      <p className="text-sm text-ink/60 mb-8">Log in to manage your bookings.</p>
      <form onSubmit={submit} className="space-y-4">
        <Input label="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input label="Password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-brass hover:underline">Forgot password?</Link>
        </div>
        <button className="btn-primary w-full" disabled={loading}>{loading ? 'Logging in...' : 'Log in'}</button>
      </form>
      <p className="text-sm text-ink/60 mt-6">
        Don't have an account? <Link to="/register" className="text-brass font-medium hover:underline">Sign up</Link>
      </p>
      <p className="text-xs text-ink/40 mt-6 border-t border-black/5 pt-4">
        Demo tip: use <strong>riya.sharma@example.com</strong> (client), <strong>devansh.rao@example.com</strong> (photographer)
        or <strong>anita.desai@example.com</strong> (admin) with any password.
      </p>
    </div>
  )
}
