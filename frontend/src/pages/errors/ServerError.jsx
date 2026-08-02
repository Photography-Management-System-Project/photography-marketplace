import { Link } from 'react-router-dom'

export default function ServerError() {
  return (
    <div className="container-page py-32 text-center">
      <p className="font-display text-7xl font-bold text-ink/20 mb-4">500</p>
      <h1 className="font-display text-2xl font-bold mb-2">Something went wrong</h1>
      <p className="text-ink/60 mb-8">Our team has been notified. Please try again shortly.</p>
      <Link to="/" className="btn-primary">Back to home</Link>
    </div>
  )
}
