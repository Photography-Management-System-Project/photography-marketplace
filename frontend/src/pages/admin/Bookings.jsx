import { useEffect, useState } from 'react'
import { bookingService } from '../../services/bookingService'
import { getUserById, getPhotographerById } from '../../data/mockData'
import DataTable from '../../components/tables/DataTable'
import Badge from '../../components/common/Badge'
import Loader from '../../components/common/Loader'
import { formatCurrency, formatDate } from '../../utils/helpers'

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    bookingService.getAll().then((data) => { setBookings(data); setLoading(false) })
  }, [])

  if (loading) return <Loader />

  const columns = [
    { key: 'booking_id', header: 'ID' },
    { key: 'client', header: 'Client', render: (r) => getUserById(r.user_id)?.name },
    { key: 'photographer', header: 'Photographer', render: (r) => getPhotographerById(r.photographer_id)?.name },
    { key: 'event_date', header: 'Date', render: (r) => formatDate(r.event_date) },
    { key: 'total_price', header: 'Amount', render: (r) => formatCurrency(r.total_price) },
    { key: 'booking_status', header: 'Status', render: (r) => <Badge status={r.booking_status} /> },
  ]

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-6">All Bookings</h2>
      <div className="card p-5">
        <DataTable columns={columns} rows={bookings} />
      </div>
    </div>
  )
}
