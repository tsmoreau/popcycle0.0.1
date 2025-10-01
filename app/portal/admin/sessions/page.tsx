'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface SessionStats {
  totalActiveSessions: number
  uniqueActiveUsers: number
  sessionsLast24Hours: number
  averageSessionDuration: number
}

interface OnlineUser {
  userId: string
  lastActivity: string
  sessionExpires?: string
  sessionToken?: string
}

export default function SessionsPage() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<SessionStats | null>(null)
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user) {
      fetchSessionData()
    }
  }, [session])

  const fetchSessionData = async () => {
    try {
      const response = await fetch('/api/admin/sessions')
      const data = await response.json()
      setStats(data.stats)
      setOnlineUsers(data.onlineUsers)
    } catch (error) {
      console.error('Error fetching session data:', error)
    } finally {
      setLoading(false)
    }
  }

  const forceLogoutUser = async (userEmail: string) => {
    try {
      const response = await fetch('/api/admin/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'force-logout-user', userEmail })
      })
      
      if (response.ok) {
        alert('User sessions logged out successfully')
        fetchSessionData() // Refresh data
      }
    } catch (error) {
      console.error('Error logging out user:', error)
    }
  }

  const cleanupExpiredSessions = async () => {
    try {
      const response = await fetch('/api/admin/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cleanup-expired' })
      })
      
      if (response.ok) {
        const result = await response.json()
        alert(`Cleaned up ${result.sessionsCleanedUp} expired sessions`)
        fetchSessionData() // Refresh data
      }
    } catch (error) {
      console.error('Error cleaning up sessions:', error)
    }
  }

  if (!session?.user || !session.user.userType || !['admin', 'super_admin'].includes(session.user.userType)) {
    return <div className="p-8">Access denied. Admin permissions required.</div>
  }

  if (loading) {
    return <div className="p-8">Loading session data...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Session Management</h1>

      {/* Session Statistics */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Active Sessions</h3>
            <p className="text-3xl font-bold text-pop-green">{stats.totalActiveSessions}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Online Users</h3>
            <p className="text-3xl font-bold text-pop-blue">{stats.uniqueActiveUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Sessions (24h)</h3>
            <p className="text-3xl font-bold text-pop-red">{stats.sessionsLast24Hours}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Avg Duration</h3>
            <p className="text-3xl font-bold text-pop-black">{stats.averageSessionDuration}m</p>
          </div>
        </div>
      )}

      {/* Online Users */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Currently Online Users</h2>
          <p className="text-gray-600">Users active in the last 5 minutes</p>
        </div>
        <div className="p-6">
          {onlineUsers.length === 0 ? (
            <p className="text-gray-500">No users currently online</p>
          ) : (
            <div className="space-y-3">
              {onlineUsers.map((user, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium">User: {user.userId}</span>
                    <p className="text-sm text-gray-600">
                      Last active: {new Date(user.lastActivity).toLocaleString()}
                    </p>
                    {user.sessionExpires && (
                      <p className="text-xs text-gray-500">
                        Session expires: {new Date(user.sessionExpires).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => forceLogoutUser(user.userId)}
                    className="px-4 py-2 bg-pop-red text-white rounded hover:bg-red-600"
                  >
                    Force Logout
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Admin Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Session Management Actions</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <button
              onClick={cleanupExpiredSessions}
              className="px-6 py-3 bg-pop-blue text-white rounded hover:bg-blue-600"
            >
              Cleanup Expired Sessions
            </button>
            <button
              onClick={fetchSessionData}
              className="px-6 py-3 bg-pop-green text-white rounded hover:bg-green-600 ml-4"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}