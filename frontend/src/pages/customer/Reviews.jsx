import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { reviewService } from '../../services/reviewService'
import { bookingService } from '../../services/bookingService'
import { getPhotographerById } from '../../data/mockData'
import RatingStars from '../../components/common/RatingStars'
import Loader from '../../components/common/Loader'
import EmptyState from '../../components/common/EmptyState'
import Modal from '../../components/ui/Modal'
import Textarea from '../../components/forms/Textarea'
import { useToast } from '../../context/ToastContext'

export default function CustomerReviews() {
  const { user } = useAuth()
  const { addToast } = useToast()
  const [reviews, setReviews] = useState([])
  const [completedBookings, setCompletedBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [reviewing, setReviewing] = useState(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  useEffect(() => {
    Promise.all([reviewService.getByUser(user.user_id), bookingService.getByUser(user.user_id)]).then(([rev, bookings]) => {
      setReviews(rev)
      setCompletedBookings(bookings.filter((b) => b.booking_status === 'completed'))
      setLoading(false)
    })
  }, [user.user_id])

  async function submitReview() {
    const created = await reviewService.create({
      user_id: user.user_id,
      photographer_id: reviewing.photographer_id,
      booking_id: reviewing.booking_id,
      rating,
      comment,
    })
    setReviews((prev) => [...prev, created])
    addToast('Review submitted!', 'success')
    setReviewing(null)
    setComment('')
    setRating(5)
  }

  if (loading) return <Loader />

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-semibold mb-4">Completed bookings to review</h2>
        {completedBookings.length === 0 ? (
          <p className="text-sm text-ink/50">No completed bookings yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {completedBookings.map((b) => {
              const photographer = getPhotographerById(b.photographer_id)
              const alreadyReviewed = reviews.some((r) => r.booking_id === b.booking_id)
              return (
                <div key={b.booking_id} className="card p-4 flex items-center justify-between">
                  <p className="font-medium text-sm">{photographer?.name}</p>
                  <button
                    className="btn-outline !px-3 !py-1.5 text-xs"
                    disabled={alreadyReviewed}
                    onClick={() => setReviewing(b)}
                  >
                    {alreadyReviewed ? 'Reviewed' : 'Write review'}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div>
        <h2 className="font-display text-xl font-semibold mb-4">My reviews</h2>
        {reviews.length === 0 ? (
          <EmptyState title="No reviews yet" message="Reviews you write will show up here." />
        ) : (
          <div className="space-y-3">
            {reviews.map((r) => (
              <div key={r.review_id} className="card p-4">
                <RatingStars value={r.rating} />
                <p className="text-sm text-ink/70 mt-2">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        open={!!reviewing}
        onClose={() => setReviewing(null)}
        title="Write a review"
        footer={
          <>
            <button className="btn-ghost" onClick={() => setReviewing(null)}>Cancel</button>
            <button className="btn-primary" onClick={submitReview}>Submit review</button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <p className="label">Rating</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setRating(n)} type="button">
                  <RatingStars value={n <= rating ? 5 : 0} size={20} />
                </button>
              ))}
            </div>
          </div>
          <Textarea label="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
      </Modal>
    </div>
  )
}
