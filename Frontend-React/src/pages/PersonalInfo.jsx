import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../components/Alert'
import { deleteUser, getUserById } from '../api/users'
import { useStaff } from '../context/StaffContext'

function Avatar() {
  return (
    <div className="avatar" aria-hidden="true">
      <svg viewBox="0 0 80 80" className="avatar-shape">
        <circle cx="40" cy="40" r="40" fill="#c5d4e3" />
        <circle cx="40" cy="30" r="12" fill="#6d8499" />
        <path d="M16 68c4-16 14-24 24-24s20 8 24 24" fill="#6d8499" />
      </svg>
    </div>
  )
}

export default function PersonalInfo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { refreshStaff } = useStaff()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [alert, setAlert] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError('')
      try {
        const data = await getUserById(id)
        if (cancelled) return
        if (!data) {
          setError('Staff member not found.')
          setUser(null)
          return
        }
        setUser(data)
      } catch {
        if (!cancelled) {
          setError('Could not load this staff member.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [id])

  async function handleDelete() {
    const confirmed = window.confirm(`Delete ${user?.name ?? 'this staff member'}?`)
    if (!confirmed) return

    setDeleting(true)
    setAlert(null)

    try {
      const deleted = await deleteUser(id)
      if (!deleted) {
        setAlert({ type: 'error', message: 'Deletion failed!' })
        return
      }

      await refreshStaff()
      navigate('/', {
        state: { alert: { type: 'success', message: 'Deletion succeeded!' } },
      })
    } catch {
      setAlert({ type: 'error', message: 'Deletion failed!' })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="page page-narrow">
      <header className="brand brand-compact">
        <h1>Personal Info</h1>
      </header>

      <section className="panel profile-panel">
        {alert ? <Alert type={alert.type}>{alert.message}</Alert> : null}
        {error ? <Alert type="error">{error}</Alert> : null}
        {loading ? <p className="empty">Loading…</p> : null}

        {!loading && user ? (
          <>
            <Avatar />
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-field">
              <span>Age:</span> {user.age}
            </p>
            <p className="profile-field">
              <span>Title:</span> {user.title || '—'}
            </p>

            <div className="form-actions profile-actions">
              <button className="btn btn-secondary" type="button" onClick={() => navigate('/')}>
                Back
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => navigate(`/edit/${user.id}`)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={handleDelete}
                disabled={deleting}
              >
                Delete
              </button>
            </div>
          </>
        ) : null}
      </section>
    </div>
  )
}
