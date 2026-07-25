import { useEffect, useState } from 'react'
import { adminService } from '../../services/adminService'
import StatCard from '../../components/dashboard/StatCard'
import Loader from '../../components/common/Loader'
import { formatCurrency } from '../../utils/helpers'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    adminService.getDashboardStats().then(setStats)
  }, [])

  if (!stats) return <Loader />

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-semibold mb-1">Platform overview</h2>
        <p className="text-sm text-ink/60">Key metrics across PhotoHub.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Total users" value={stats.totalUsers} tone="ink" />
        <StatCard label="Photographers" value={stats.totalPhotographers} tone="brass" />
        <StatCard label="Total bookings" value={stats.totalBookings} tone="teal" />
        <StatCard label="Total revenue" value={formatCurrency(stats.totalRevenue)} tone="brass" />
        <StatCard label="Pending approvals" value={stats.pendingApprovals} tone="rose" />
        <StatCard label="Open payment issues" value={stats.openIssues} tone="rose" />
      </div>
    </div>
  )
}
