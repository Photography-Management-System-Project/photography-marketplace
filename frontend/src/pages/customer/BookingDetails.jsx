import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { bookingService } from '../../services/bookingService'
import { paymentService } from '../../services/paymentService'
import { getPhotographerById } from '../../data/mockData'
import Badge from '../../components/common/Badge'
import Loader from '../../components/common/Loader'
import { formatCurrency, formatDate, formatDateTime } from '../../utils/helpers'

export default function BookingDetails() {
  const { id } = useParams()
  const [booking, setBooking] = useState(undefined)
  const [payments, setPayments] = useState([])

  useEffect(() => {
    bookingService.getById(id).then((b) => {
      setBooking(b || null)
      if (b) paymentService.getByBooking(b.booking_id).then(setPayments)
    })
  }, [id])

  if (booking === undefined) return <Loader />
  if (booking === null) return <p>Booking not found.</p>

  const photographer = getPhotographerById(booking.photographer_id)

  return (
    <div className="max-w-2xl space-y-6">
      <Link to="/customer/bookings" className="text-sm text-brass hover:underline">← Back to bookings</Link>
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold">Booking #{booking.booking_id}</h2>
          <Badge status={booking.booking_status} />
        </div>
        <dl className="grid sm:grid-cols-2 gap-4 text-sm">
          <div><dt className="text-ink/50">Photographer</dt><dd className="font-medium">{photographer?.name}</dd></div>
          <div><dt className="text-ink/50">Event date</dt><dd className="font-medium">{formatDate(booking.event_date)}</dd></div>
          <div><dt className="text-ink/50">Time</dt><dd className="font-medium">{booking.booking_time}</dd></div>
          <div><dt className="text-ink/50">Location</dt><dd className="font-medium">{booking.location}</dd></div>
          <div><dt className="text-ink/50">Total price</dt><dd className="font-medium text-brass">{formatCurrency(booking.total_price)}</dd></div>
          <div><dt className="text-ink/50">Refund status</dt><dd className="font-medium capitalize">{booking.refund_status}</dd></div>
        </dl>
        {booking.special_requirements && (
          <div className="mt-4 pt-4 border-t border-black/5">
            <p className="text-ink/50 text-sm mb-1">Special requirements</p>
            <p className="text-sm">{booking.special_requirements}</p>
          </div>
        )}
      </div>

      <div className="card p-6">
        <h3 className="font-display font-semibold mb-4">Payments</h3>
        {payments.length === 0 ? (
          <p className="text-sm text-ink/50">No payments recorded yet.</p>
        ) : (
          <div className="space-y-3">
            {payments.map((p) => (
              <div key={p.payment_id} className="flex items-center justify-between text-sm border-b border-black/5 last:border-0 pb-3 last:pb-0">
                <div>
                  <p className="font-medium">{formatCurrency(p.amount)} · {p.payment_method.toUpperCase()}</p>
                  <p className="text-xs text-ink/50">{p.transaction_id} · {formatDateTime(p.paid_at)}</p>
                </div>
                <Badge status={p.payment_status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
