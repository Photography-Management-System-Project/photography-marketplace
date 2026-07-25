import { useEffect, useState } from 'react'
import { refundService } from '../../services/refundService'
import DataTable from '../../components/tables/DataTable'
import Badge from '../../components/common/Badge'
import Loader from '../../components/common/Loader'
import { formatCurrency, formatDateTime } from '../../utils/helpers'
import { useToast } from '../../context/ToastContext'
import { useAuth } from '../../context/AuthContext'

export default function AdminRefunds() {
  const { addToast } = useToast()
  const { user } = useAuth()
  const [refunds, setRefunds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    refundService.getAll().then((data) => { setRefunds(data); setLoading(false) })
  }, [])

  async function approve(r) {
    await refundService.approve(r.refund_id, user.user_id)
    setRefunds((prev) => prev.map((x) => (x.refund_id === r.refund_id ? { ...x, refund_status: 'processed' } : x)))
    addToast('Refund approved and processed.', 'success')
  }

  async function reject(r) {
    await refundService.reject(r.refund_id)
    setRefunds((prev) => prev.map((x) => (x.refund_id === r.refund_id ? { ...x, refund_status: 'rejected' } : x)))
    addToast('Refund rejected.', 'success')
  }

  if (loading) return <Loader />

  const columns = [
    { key: 'refund_id', header: 'ID' },
    { key: 'booking_id', header: 'Booking' },
    { key: 'refund_amount', header: 'Amount', render: (r) => formatCurrency(r.refund_amount) },
    { key: 'refund_reason', header: 'Reason' },
    { key: 'refund_status', header: 'Status', render: (r) => <Badge status={r.refund_status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) =>
        r.refund_status === 'pending' ? (
          <div className="flex gap-3">
            <button className="text-xs font-medium text-teal hover:underline" onClick={() => approve(r)}>Approve</button>
            <button className="text-xs font-medium text-rose-600 hover:underline" onClick={() => reject(r)}>Reject</button>
          </div>
        ) : (
          <span className="text-xs text-ink/40">—</span>
        ),
    },
  ]

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-6">Refunds</h2>
      <div className="card p-5">
        <DataTable columns={columns} rows={refunds} />
      </div>
    </div>
  )
}
