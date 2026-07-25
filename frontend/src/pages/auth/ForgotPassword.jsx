import { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/forms/Input'
import { authService } from '../../services/authService'
import { useToast } from '../../context/ToastContext'

export default function ForgotPassword() {
  const { addToast } = useToast()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  async function submit(e) {
    e.preventDefault()
    await authService.forgotPassword(email)
    setSent(true)
    addToast('Reset instructions sent.', 'success')
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-1">Reset your password</h1>
      <p className="text-sm text-ink/60 mb-8">We'll email you a link to reset it.</p>
      {sent ? (
        <p className="text-sm text-teal">Check your inbox for a reset link (demo mode — no email actually sent).</p>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn-primary w-full">Send reset link</button>
        </form>
      )}
      <p className="text-sm text-ink/60 mt-6">
        <Link to="/login" className="text-brass font-medium hover:underline">← Back to log in</Link>
      </p>
    </div>
  )
}
