import { useEffect, useState } from 'react'
import { adminService } from '../../services/adminService'
import DataTable from '../../components/tables/DataTable'
import Loader from '../../components/common/Loader'
import { formatDateTime } from '../../utils/helpers'

export default function Logs() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminService.getLogs().then((data) => { setLogs(data); setLoading(false) })
  }, [])

  if (loading) return <Loader />

  const columns = [
    { key: 'log_id', header: 'ID' },
    { key: 'admin_id', header: 'Admin' },
    { key: 'action', header: 'Action' },
    { key: 'table_name', header: 'Table' },
    { key: 'record_id', header: 'Record' },
    { key: 'created_at', header: 'When', render: (r) => formatDateTime(r.created_at) },
  ]

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-6">System Logs</h2>
      <div className="card p-5">
        <DataTable columns={columns} rows={logs} />
      </div>
    </div>
  )
}
