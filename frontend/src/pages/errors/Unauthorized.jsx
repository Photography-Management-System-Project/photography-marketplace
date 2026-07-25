import { Link } from 'react-router-dom'

export default function Unauthorized() {
  return (
    <div className="container-page py-32 text-center">
      <p className="font-display text-7xl font-bold text-rose-500 mb-4">403</p>
      <h1 className="font-display text-2xl font-bold mb-2">Access denied</h1>
      <p className="text-ink/60 mb-8">You don't have permission to view this page.</p>
      <Link to="/" className="btn-primary">Back to home</Link>
    </div>
  )
}
