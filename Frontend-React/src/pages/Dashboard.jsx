import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import { useStaff } from '../context/StaffContext'
import { deleteUser } from '../api/users'

export default function Dashboard() {
  const { staff, loading, loadError, refreshStaff } = useStaff()
  const location = useLocation()
  const navigate = useNavigate()
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    const flash = location.state?.alert
    if (flash) {
      setAlert(flash)
      navigate('.', { replace: true, state: {} })
    }
  }, [location.state, navigate])

  async function handleDelete(member) {
    const confirmed = window.confirm(`Delete ${member.name} from the staff list?`)
    if (!confirmed) return

    try {
      const deleted = await deleteUser(member.id)
      if (!deleted) {
        setAlert({ type: 'error', message: 'Deletion failed!' })
        return
      }

      await refreshStaff()
      navigate('/', {
        replace: true,
        state: { alert: { type: 'success', message: 'Deletion succeeded!' } },
      })
    } catch {
      setAlert({ type: 'error', message: 'Deletion failed!' })
    }
  }

  return (
    <div className="page">
      <header className="brand">
        <h1>Staff Management Dashboard</h1>
        <p>View, add, and update your team in one place.</p>
        <p>Current time: {new Date().toLocaleTimeString()}</p>
      </header>

      {alert ? <Alert type={alert.type}>{alert.message}</Alert> : null}

      <section className="panel">
        <div className="panel-header">
          <h2>Staff directory</h2>
          <Link className="btn btn-primary" to="/edit">
            Add staff
          </Link>
        </div>

        {loading ? <p className="empty">Loading staff…</p> : null}
        {loadError ? <Alert type="error">{loadError}</Alert> : null}

        {!loading && !loadError && staff.length === 0 ? (
          <p className="empty">No staff members yet. Add someone to get started.</p>
        ) : null}

        {!loading && staff.length > 0 ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Title</th>
                  <th>Details</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((member, index) => (
                  <tr key={member.id}>
                    <td>{index + 1}</td>
                    <td>{member.name}</td>
                    <td>{member.age}</td>
                    <td>{member.title || '—'}</td>
                    <td>
  <Link
    className="btn btn-success"
    to={`/staff/${member.id}`}
  >
    See Details
  </Link>
</td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => navigate(`/edit/${member.id}`)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => handleDelete(member)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>
    </div>
  )
}
