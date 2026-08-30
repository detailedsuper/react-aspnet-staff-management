import { Link, useNavigate } from 'react-router-dom'
import { useStaff } from '../context/StaffContext'

export default function Dashboard() {
  const { staff, deleteStaff } = useStaff()
  const navigate = useNavigate()

  function handleDelete(member) {
    const confirmed = window.confirm(`Delete ${member.name} from the staff list?`)
    if (confirmed) {
      deleteStaff(member.id)
    }
  }

  return (
    <div className="page">
      <header className="brand">
        <h1>Staff Management Dashboard</h1>
        <p>View, add, and update your team in one place.</p>
      </header>

      <section className="panel">
        <div className="panel-header">
          <h2>Staff directory</h2>
          <Link className="btn btn-primary" to="/edit">
            Add staff
          </Link>
        </div>

        {staff.length === 0 ? (
          <p className="empty">No staff members yet. Add someone to get started.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Title</th>
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
        )}
      </section>
    </div>
  )
}
