import { useEffect, useState } from 'react'
import { photographerService } from '../../services/photographerService'
import EmptyState from '../../components/common/EmptyState'
import Loader from '../../components/common/Loader'
import { useToast } from '../../context/ToastContext'
import { formatCurrency } from '../../utils/helpers'

export default function Approvals() {
  const { addToast } = useToast()
  const [pending, setPending] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    photographerService.getAll().then((data) => {
      setPending(data.filter((p) => !p.is_verified))
      setLoading(false)
    })
  }, [])

  async function approve(p) {
    await photographerService.verify(p.photographer_id)
    setPending((prev) => prev.filter((x) => x.photographer_id !== p.photographer_id))
    addToast(`${p.name} approved and verified.`, 'success')
  }

  if (loading) return <Loader />

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-6">Pending Photographer Approvals</h2>
      {pending.length === 0 ? (
        <EmptyState title="All caught up" message="No pending photographer approvals right now." />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {pending.map((p) => (
            <div key={p.photographer_id} className="card p-5">
              <h3 className="font-semibold mb-1">{p.name}</h3>
              <p className="text-xs text-ink/50 mb-2">{p.location} · {p.experience} yrs exp.</p>
              <p className="text-sm text-ink/70 mb-3">{p.bio}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-brass">{formatCurrency(p.price_per_hour)}/hr</p>
                <button className="btn-primary !px-4 !py-2 text-sm" onClick={() => approve(p)}>Approve & Verify</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
