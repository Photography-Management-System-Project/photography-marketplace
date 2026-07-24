import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { bookingService } from '../../services/bookingService'
import StatCard from '../../components/dashboard/StatCard'
import Badge from '../../components/common/Badge'
import { formatCurrency, formatDate } from '../../utils/helpers'
import Loader from '../../components/common/Loader'
import { getPhotographerById } from '../../data/mockData'

export default function CustomerDashboard() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    bookingService.getByUser(user.user_id).then((data) => { setBookings(data); setLoading(false) })
  }, [user.user_id])

  if (loading) return <Loader />

  const upcoming = bookings.filter((b) => ['pending', 'confirmed'].includes(b.booking_status))
  const totalSpent = bookings.filter((b) => b.booking_status === 'completed').reduce((s, b) => s + b.total_price, 0)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-semibold mb-1">Welcome back, {user.name.split(' ')[0]} 👋</h2>
        <p className="text-sm text-ink/60">Here's a snapshot of your PhotoHub activity.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard label="Total bookings" value={bookings.length} tone="ink" />
        <StatCard label="Upcoming" value={upcoming.length} tone="brass" />
        <StatCard label="Total spent" value={formatCurrency(totalSpent)} tone="teal" />
      </div>

      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold">Recent bookings</h3>
          <Link to="/customer/bookings" className="text-sm text-brass hover:underline">View all →</Link>
        </div>
        <div className="space-y-3">
          {bookings.slice(0, 4).map((b) => {
            const photographer = getPhotographerById(b.photographer_id)
            return (
              <div key={b.booking_id} className="flex items-center justify-between border-b border-black/5 last:border-0 pb-3 last:pb-0">
                <div>
                  <p className="font-medium">{photographer?.name}</p>
                  <p className="text-xs text-ink/50">{formatDate(b.event_date)} · {b.location}</p>
                </div>
                <Badge status={b.booking_status} />
              </div>
            )
          })}
          {bookings.length === 0 && <p className="text-sm text-ink/50">No bookings yet — go find a photographer!</p>}
        </div>
      </div>
    </div>
  )
}
