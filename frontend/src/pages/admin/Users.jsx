import { useEffect, useState } from 'react'
import { userService } from '../../services/userService'
import DataTable from '../../components/tables/DataTable'
import Badge from '../../components/common/Badge'
import Loader from '../../components/common/Loader'
import Select from '../../components/forms/Select'
import { useToast } from '../../context/ToastContext'

export default function AdminUsers() {
  const { addToast } = useToast()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [roleFilter, setRoleFilter] = useState('')

  useEffect(() => {
    userService.getAll().then((data) => { setUsers(data); setLoading(false) })
  }, [])

  async function toggleStatus(u) {
    const next = u.status === 'blocked' ? 'active' : 'blocked'
    await userService.updateStatus(u.user_id, next)
    setUsers((prev) => prev.map((x) => (x.user_id === u.user_id ? { ...x, status: next } : x)))
    addToast(`User ${next === 'blocked' ? 'blocked' : 'unblocked'}.`, 'success')
  }

  if (loading) return <Loader />

  const filtered = roleFilter ? users.filter((u) => u.role === roleFilter) : users

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role', render: (r) => <span className="capitalize">{r.role}</span> },
    { key: 'status', header: 'Status', render: (r) => <Badge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => (
        <button className="text-xs font-medium text-brass hover:underline" onClick={() => toggleStatus(r)}>
          {r.status === 'blocked' ? 'Unblock' : 'Block'}
        </button>
      ),
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold">Users</h2>
        <Select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          options={[{ value: '', label: 'All roles' }, { value: 'client', label: 'Clients' }, { value: 'photographer', label: 'Photographers' }, { value: 'admin', label: 'Admins' }]}
          className="w-48"
        />
      </div>
      <div className="card p-5">
        <DataTable columns={columns} rows={filtered} />
      </div>
    </div>
  )
}
