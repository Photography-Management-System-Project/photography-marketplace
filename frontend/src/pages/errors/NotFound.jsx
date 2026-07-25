import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-page py-32 text-center">
      <p className="font-display text-7xl font-bold text-brass mb-4">404</p>
      <h1 className="font-display text-2xl font-bold mb-2">Page not found</h1>
      <p className="text-ink/60 mb-8">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn-primary">Back to home</Link>
    </div>
  )
}
