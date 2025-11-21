import { useState, useEffect } from 'react'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

const AdminPage = () => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  const handleLogin = (newToken) => {
    setToken(newToken)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setToken(null)
  }

  if (!token) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return <AdminDashboard token={token} onLogout={handleLogout} />
}

export default AdminPage
