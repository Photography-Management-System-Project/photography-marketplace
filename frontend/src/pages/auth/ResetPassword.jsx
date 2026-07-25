import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/forms/Input'
import { authService } from '../../services/authService'
import { useToast } from '../../context/ToastContext'

export default function ResetPassword() {
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    await authService.resetPassword('demo-token', password)
    addToast('Password reset. Please log in.', 'success')
    navigate('/login')
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-1">Set a new password</h1>
      <p className="text-sm text-ink/60 mb-8">Choose a strong password for your account.</p>
      <form onSubmit={submit} className="space-y-4">
        <Input label="New password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input label="Confirm password" type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button className="btn-primary w-full">Reset password</button>
      </form>
    </div>
  )
}
