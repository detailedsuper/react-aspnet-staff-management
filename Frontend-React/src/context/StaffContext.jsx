import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { getUsers } from '../api/users'

const StaffContext = createContext(null)

export function StaffProvider({ children }) {
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  const refreshStaff = useCallback(async () => {
    setLoading(true)
    try {
      const users = await getUsers()
      setStaff(users)
      setLoadError('')
    } catch {
      setLoadError('Could not load staff from the server.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshStaff()
  }, [refreshStaff])

  return (
    <StaffContext.Provider value={{ staff, loading, loadError, refreshStaff }}>
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
