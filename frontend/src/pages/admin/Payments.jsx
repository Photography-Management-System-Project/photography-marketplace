import { useEffect, useState } from 'react'
import { paymentService } from '../../services/paymentService'
import DataTable from '../../components/tables/DataTable'
import Badge from '../../components/common/Badge'
import Loader from '../../components/common/Loader'
import { formatCurrency, formatDateTime } from '../../utils/helpers'

export default function AdminPayments() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    paymentService.getAll().then((data) => { setPayments(data); setLoading(false) })
  }, [])

  if (loading) return <Loader />

  const columns = [
    { key: 'payment_id', header: 'ID' },
    { key: 'booking_id', header: 'Booking' },
    { key: 'amount', header: 'Amount', render: (r) => formatCurrency(r.amount) },
    { key: 'payment_method', header: 'Method', render: (r) => r.payment_method.toUpperCase() },
    { key: 'transaction_id', header: 'Transaction' },
    { key: 'payment_status', header: 'Status', render: (r) => <Badge status={r.payment_status} /> },
    { key: 'paid_at', header: 'Paid at', render: (r) => formatDateTime(r.paid_at) },
  ]

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-6">Payments</h2>
      <div className="card p-5">
        <DataTable columns={columns} rows={payments} />
      </div>
    </div>
  )
}
