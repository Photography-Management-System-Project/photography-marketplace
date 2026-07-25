import { useEffect, useState } from 'react'
import { adminService } from '../../services/adminService'
import DataTable from '../../components/tables/DataTable'
import Badge from '../../components/common/Badge'
import Loader from '../../components/common/Loader'
import { useToast } from '../../context/ToastContext'

export default function PaymentIssues() {
  const { addToast } = useToast()
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminService.getPaymentIssues().then((data) => { setIssues(data); setLoading(false) })
  }, [])

  async function resolve(issue) {
    await adminService.resolveIssue(issue.issue_id)
    setIssues((prev) => prev.map((i) => (i.issue_id === issue.issue_id ? { ...i, status: 'resolved' } : i)))
    addToast('Issue marked as resolved.', 'success')
  }

  if (loading) return <Loader />

  const columns = [
    { key: 'issue_id', header: 'ID' },
    { key: 'payment_id', header: 'Payment' },
    { key: 'issue_type', header: 'Type' },
    { key: 'description', header: 'Description' },
    { key: 'status', header: 'Status', render: (r) => <Badge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) =>
        r.status !== 'resolved' ? (
          <button className="text-xs font-medium text-brass hover:underline" onClick={() => resolve(r)}>Mark resolved</button>
        ) : (
          <span className="text-xs text-ink/40">—</span>
        ),
    },
  ]

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-6">Payment Issues</h2>
      <div className="card p-5">
        <DataTable columns={columns} rows={issues} />
      </div>
    </div>
  )
}
