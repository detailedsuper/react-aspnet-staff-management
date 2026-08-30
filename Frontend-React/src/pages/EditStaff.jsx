import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStaff } from '../context/StaffContext'

const emptyForm = {
  name: '',
  age: '',
  title: '',
}

export default function EditStaff() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getStaffById, saveStaff } = useStaff()
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  const existing = id ? getStaffById(id) : null
  const isEditing = Boolean(existing)

  useEffect(() => {
    if (id && !existing) {
      setError('Staff member not found.')
      return
    }

    if (existing) {
      setForm({
        name: existing.name,
        age: String(existing.age),
        title: existing.title ?? '',
      })
    }
  }, [id, existing])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
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

    saveStaff({
      id: existing?.id,
      name,
      age: ageValue,
      title,
    })

    navigate('/')
  }

  return (
    <div className="page page-narrow">
      <header className="brand brand-compact">
        <h1>{isEditing ? 'Edit staff' : 'Add staff'}</h1>
        <p>Name and age are required. Title is optional.</p>
      </header>

      <section className="panel">
        {error ? <p className="form-error">{error}</p> : null}

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
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => navigate('/')}>
              Back
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
