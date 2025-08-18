import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-config"
import { hasPermission, getUserByEmail } from "./auth-helpers"
import { User } from "./schemas"

export function getSession() {
  return getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}

export async function getCurrentUserFromDb(): Promise<User | null> {
  const session = await getSession()
  if (!session?.user?.email) return null
  
  return await getUserByEmail(session.user.email)
}

export async function requireAuth() {
  const session = await getSession()
  if (!session?.user) {
    throw new Error('Authentication required')
  }
  return session.user
}

export async function requireSuperAdmin() {
  const session = await getSession()
  if (!session?.user || session.user.userType !== 'super_admin') {
    throw new Error('Super admin access required')
  }
  return session.user
}

export async function requirePermission(permission: string) {
  const session = await getSession()
  if (!session?.user) {
    throw new Error('Authentication required')
  }
  
  const permissions = session.user.permissions || []
  if (!permissions.includes(permission)) {
    throw new Error(`Permission '${permission}' required`)
  }
  
  return session.user
}

export async function requireStaffAccess() {
  const session = await getSession()
  if (!session?.user) {
    throw new Error('Authentication required')
  }
  
  const isStaff = ['super_admin', 'admin', 'staff'].includes(session.user.userType || '')
  if (!isStaff) {
    throw new Error('Staff access required')
  }
  
  return session.user
}

export async function requirePartnerAccess() {
  const session = await getSession()
  if (!session?.user) {
    throw new Error('Authentication required')
  }
  
  const hasPartnerAccess = session.user.userType === 'partner_owner' || 
                          (session.user.permissions || []).includes('partner')
  if (!hasPartnerAccess) {
    throw new Error('Partner access required')
  }
  
  return session.user
}

export function hasPortalAccess(user: any): boolean {
  if (!user) return false
  return user.userType === 'super_admin' || (user.permissions && user.permissions.length > 0)
}