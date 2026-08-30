import { Route, Routes } from 'react-router-dom'
import { StaffProvider } from './context/StaffContext'
import Dashboard from './pages/Dashboard'
import EditStaff from './pages/EditStaff'
import PersonalInfo from './pages/PersonalInfo'

export default function App() {
  return (
    <StaffProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit" element={<EditStaff />} />
        <Route path="/edit/:id" element={<EditStaff />} />
        <Route path="/staff/:id" element={<PersonalInfo />} />
      </Routes>
    </StaffProvider>
  )
}
