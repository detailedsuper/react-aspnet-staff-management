import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../components/Alert'
import { createUser, getUserById, toStaffPayload, updateUser } from '../api/users'
import { useStaff } from '../context/StaffContext'

const emptyForm = {
  name: '',
  age: '',
  title: '',
}

export default function EditStaff() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { refreshStaff } = useStaff()
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(Boolean(id))
  const [submitting, setSubmitting] = useState(false)

  const isEditing = Boolean(id)

  useEffect(() => {
    if (!id) {
      setForm(emptyForm)
      setLoading(false)
      return
    }

    let cancelled = false

    async function load() {
      setLoading(true)
      setError('')
      try {
        const user = await getUserById(id)
        if (cancelled) return
        if (!user) {
          setError('Staff member not found.')
          return
        }
        setForm({
          name: user.name ?? '',
          age: user.age === undefined || user.age === null ? '' : String(user.age),
          title: user.title ?? '',
        })
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

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const name = form.name.trim()
    const ageValue = Number(form.age)
    const title = form.title.trim()

    if (!name) {
      setError('Name is required.')
      return
    }

    if (form.age === '' || Number.isNaN(ageValue) || ageValue < 0 || !Number.isInteger(ageValue)) {
      setError('Age is required and must be a whole number.')
      return
    }

    const payload = toStaffPayload({ name, age: ageValue, title })
    setSubmitting(true)

    try {
      if (isEditing) {
        await updateUser(id, payload)
        await refreshStaff()
        navigate('/', {
          state: { alert: { type: 'success', message: 'Staff info successfully upadated!' } },
        })
      } else {
        await createUser(payload)
        await refreshStaff()
        navigate('/', {
          state: { alert: { type: 'success', message: 'New staff successfully registered!' } },
        })
      }
    } catch {
      setError(
        isEditing
          ? 'Update failed, maybe due to a backend error.'
          : 'Add failed, maybe due to a backend error.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page page-narrow">
      <header className="brand brand-compact">
        <h1>{isEditing ? 'Edit staff' : 'Add staff'}</h1>
        <p>Name and age are required. Title is optional.</p>
      </header>

      <section className="panel">
        {error ? <Alert type="error">{error}</Alert> : null}
        {loading ? <p className="empty">Loading…</p> : null}

        {!loading ? (
          <form className="staff-form" onSubmit={handleSubmit}>
            <label>
              Name <span aria-hidden="true">*</span>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </label>

            <label>
              Age <span aria-hidden="true">*</span>
              <input
                name="age"
                type="number"
                min="0"
                step="1"
                value={form.age}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Title
              <input
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                autoComplete="organization-title"
              />
            </label>

            <div className="form-actions">
              <button className="btn btn-primary" type="submit" disabled={submitting}>
                Submit
              </button>
              <button className="btn btn-secondary" type="button" onClick={() => navigate('/')}>
                Back
              </button>
            </div>
          </form>
        ) : null}
      </section>
    </div>
  )
}
