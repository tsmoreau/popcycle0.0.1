'use client'

import { SessionProvider } from 'next-auth/react'
import { createContext, useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

// Extended user context for organization-specific state
interface UserContextType {
  isStaff: boolean
  hasPortalAccess: boolean
  orgId: string | null
  refreshUserData: () => Promise<void>
}

const UserContext = createContext<UserContextType | null>(null)

function UserContextProvider({ children }: { children: React.ReactNode }) {
  const { data: session, update } = useSession()
  const [contextData, setContextData] = useState<UserContextType>({
    isStaff: false,
    hasPortalAccess: false,
    orgId: null,
    refreshUserData: async () => {}
  })

  const refreshUserData = async () => {
    // Force session refresh to get latest database data
    await update()
  }

  useEffect(() => {
    if (session?.user) {
      const userType = session.user.userType
      const permissions = session.user.permissions || []
      
      const isStaff = ['super_admin', 'admin', 'staff', 'partner_owner'].includes(userType || '')
      const hasPortalAccess = isStaff || permissions.length > 0
      const orgId = session.user.orgId || null

      setContextData({
        isStaff,
        hasPortalAccess,
        orgId,
        refreshUserData
      })
    } else {
      setContextData({
        isStaff: false,
        hasPortalAccess: false,
        orgId: null,
        refreshUserData
      })
    }
  }, [session])

  return (
    <UserContext.Provider value={contextData}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within AuthSessionProvider')
  }
  return context
}

export default function AuthSessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <UserContextProvider>
        {children}
      </UserContextProvider>
    </SessionProvider>
  )
}