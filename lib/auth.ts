import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export function getSession() {
  return getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
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

export function hasPortalAccess(user: any): boolean {
  if (!user) return false
  return user.userType === 'super_admin' || (user.permissions && user.permissions.length > 0)
}