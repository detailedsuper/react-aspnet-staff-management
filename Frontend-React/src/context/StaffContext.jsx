import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'staff-management-data'

const seedStaff = [
  { id: 1, name: 'Ava Chen', age: 32, title: 'Engineering Manager' },
  { id: 2, name: 'Marcus Hale', age: 28, title: 'Frontend Developer' },
  { id: 3, name: 'Priya Nair', age: 41, title: 'HR Specialist' },
]

const StaffContext = createContext(null)

function loadStaff() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedStaff
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : seedStaff
  } catch {
    return seedStaff
  }
}

export function StaffProvider({ children }) {
  const [staff, setStaff] = useState(loadStaff)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(staff))
  }, [staff])

  function getStaffById(id) {
    return staff.find((member) => String(member.id) === String(id))
  }

  function saveStaff(payload) {
    if (payload.id) {
      setStaff((current) =>
        current.map((member) =>
          member.id === payload.id ? { ...member, ...payload } : member,
        ),
      )
      return payload.id
    }

    const nextId = staff.reduce((max, member) => Math.max(max, member.id), 0) + 1
    setStaff((current) => [...current, { ...payload, id: nextId }])
    return nextId
  }

  function deleteStaff(id) {
    setStaff((current) => current.filter((member) => member.id !== id))
  }

  return (
    <StaffContext.Provider value={{ staff, getStaffById, saveStaff, deleteStaff }}>
      {children}
    </StaffContext.Provider>
  )
}

export function useStaff() {
  const context = useContext(StaffContext)
  if (!context) {
    throw new Error('useStaff must be used within a StaffProvider')
  }
  return context
}
