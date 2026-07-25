import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { bookingService } from '../../services/bookingService'
import { getPhotographerById } from '../../data/mockData'
import Badge from '../../components/common/Badge'
import Loader from '../../components/common/Loader'
import EmptyState from '../../components/common/EmptyState'
import ConfirmModal from '../../components/modals/ConfirmModal'
import { formatCurrency, formatDate } from '../../utils/helpers'
import { useToast } from '../../context/ToastContext'

export default function MyBookings() {
  const { user } = useAuth()
  const { addToast } = useToast()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [toCancel, setToCancel] = useState(null)

  function load() {
    bookingService.getByUser(user.user_id).then((data) => { setBookings(data); setLoading(false) })
  }

  useEffect(load, [user.user_id])

  async function confirmCancel() {
    await bookingService.cancel(toCancel.booking_id, 'Cancelled by client')
    addToast('Booking cancelled.', 'success')
    setBookings((prev) => prev.map((b) => (b.booking_id === toCancel.booking_id ? { ...b, booking_status: 'cancelled' } : b)))
    setToCancel(null)
  }

  if (loading) return <Loader />

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-6">My Bookings</h2>
      {bookings.length === 0 ? (
        <EmptyState title="No bookings yet" message="Find a photographer and book your first session." action={<Link to="/photographers" className="btn-primary">Find Photographers</Link>} />
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => {
            const photographer = getPhotographerById(b.photographer_id)
            return (
              <div key={b.booking_id} className="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold">{photographer?.name}</p>
                    <Badge status={b.booking_status} />
                  </div>
                  <p className="text-sm text-ink/60">{formatDate(b.event_date)} · {b.booking_time} · {b.location}</p>
                  <p className="text-sm font-medium text-brass mt-1">{formatCurrency(b.total_price)}</p>
                </div>
                <div className="flex gap-2">
                  <Link to={`/customer/bookings/${b.booking_id}`} className="btn-outline !px-4 !py-2 text-sm">Details</Link>
                  {['pending', 'confirmed'].includes(b.booking_status) && (
                    <button className="btn-ghost !text-rose-600 text-sm" onClick={() => setToCancel(b)}>Cancel</button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
      <ConfirmModal
        open={!!toCancel}
        onClose={() => setToCancel(null)}
        onConfirm={confirmCancel}
        title="Cancel booking?"
        message="This will cancel your booking request. Depending on timing, a refund may be issued."
        confirmLabel="Yes, cancel"
        danger
      />
    </div>
  )
}
