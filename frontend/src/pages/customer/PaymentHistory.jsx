import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { bookingService } from '../../services/bookingService'
import { paymentService } from '../../services/paymentService'
import DataTable from '../../components/tables/DataTable'
import Badge from '../../components/common/Badge'
import Loader from '../../components/common/Loader'
import { formatCurrency, formatDateTime } from '../../utils/helpers'

export default function PaymentHistory() {
  const { user } = useAuth()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    bookingService.getByUser(user.user_id).then(async (bookings) => {
      const list = await paymentService.getByUser(user.user_id, bookings)
      setPayments(list)
      setLoading(false)
    })
  }, [user.user_id])

  if (loading) return <Loader />

  const columns = [
    { key: 'transaction_id', header: 'Transaction' },
    { key: 'amount', header: 'Amount', render: (r) => formatCurrency(r.amount) },
    { key: 'payment_method', header: 'Method', render: (r) => r.payment_method.toUpperCase() },
    { key: 'payment_status', header: 'Status', render: (r) => <Badge status={r.payment_status} /> },
    { key: 'paid_at', header: 'Date', render: (r) => formatDateTime(r.paid_at) },
  ]

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-6">Payment History</h2>
      <div className="card p-5">
        <DataTable columns={columns} rows={payments} emptyMessage="No payments yet." />
      </div>
    </div>
  )
}
