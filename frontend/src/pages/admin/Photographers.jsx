import { useEffect, useState } from 'react'
import { photographerService } from '../../services/photographerService'
import DataTable from '../../components/tables/DataTable'
import Badge from '../../components/common/Badge'
import RatingStars from '../../components/common/RatingStars'
import Loader from '../../components/common/Loader'
import { formatCurrency } from '../../utils/helpers'

export default function AdminPhotographers() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    photographerService.getAll().then((data) => { setList(data); setLoading(false) })
  }, [])

  if (loading) return <Loader />

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'location', header: 'Location' },
    { key: 'rating', header: 'Rating', render: (r) => <RatingStars value={r.rating} /> },
    { key: 'price_per_hour', header: 'Rate', render: (r) => formatCurrency(r.price_per_hour) + '/hr' },
    { key: 'is_verified', header: 'Status', render: (r) => <Badge status={r.is_verified ? 'active' : 'pending'}>{r.is_verified ? 'Verified' : 'Pending'}</Badge> },
  ]

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-6">Photographers</h2>
      <div className="card p-5">
        <DataTable columns={columns} rows={list} />
      </div>
    </div>
  )
}
