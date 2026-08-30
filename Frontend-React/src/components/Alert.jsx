export default function Alert({ type, children }) {
  if (!children) return null

  return (
    <p className={`alert alert-${type}`} role={type === 'error' ? 'alert' : 'status'}>
      {children}
    </p>
  )
}
