import { useEffect, useState } from 'react'
import { adminService } from '../../services/adminService'
import { bookings, payments, photographers } from '../../data/mockData'
import StatCard from '../../components/dashboard/StatCard'
import Loader from '../../components/common/Loader'
import { formatCurrency } from '../../utils/helpers'
import { CATEGORIES } from '../../constants'

export default function Reports() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    adminService.getDashboardStats().then(setStats)
  }, [])

  if (!stats) return <Loader />

  const byStatus = ['pending', 'confirmed', 'completed', 'cancelled', 'rejected'].map((s) => ({
    status: s,
    count: bookings.filter((b) => b.booking_status === s).length,
  }))

  const byCategory = CATEGORIES.map((c) => ({
    category: c,
    count: photographers.filter((p) => p.category === c).length,
  })).filter((c) => c.count > 0)

  return (
    <div className="space-y-8">
      <h2 className="font-display text-xl font-semibold">Reports</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard label="Total revenue" value={formatCurrency(stats.totalRevenue)} tone="brass" />
        <StatCard label="Avg. booking value" value={formatCurrency(stats.totalRevenue / (bookings.length || 1))} tone="teal" />
        <StatCard label="Success payments" value={payments.filter((p) => p.payment_status === 'success').length} tone="ink" />
      </div>

      <div className="card p-5">
        <h3 className="font-display font-semibold mb-4">Bookings by status</h3>
        <div className="space-y-2">
          {byStatus.map((s) => (
            <div key={s.status} className="flex items-center gap-3">
              <span className="w-24 text-xs capitalize text-ink/60">{s.status}</span>
              <div className="flex-1 h-2 bg-black/5 rounded-full overflow-hidden">
                <div className="h-full bg-brass" style={{ width: `${(s.count / (bookings.length || 1)) * 100}%` }} />
              </div>
              <span className="text-xs text-ink/50 w-6 text-right">{s.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-display font-semibold mb-4">Photographers by category</h3>
        <div className="space-y-2">
          {byCategory.map((c) => (
            <div key={c.category} className="flex items-center gap-3">
              <span className="w-24 text-xs text-ink/60">{c.category}</span>
              <div className="flex-1 h-2 bg-black/5 rounded-full overflow-hidden">
                <div className="h-full bg-teal" style={{ width: `${(c.count / (photographers.length || 1)) * 100}%` }} />
              </div>
              <span className="text-xs text-ink/50 w-6 text-right">{c.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
