import { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      userType?: string
      permissions?: string[]
      orgId?: string
      skillLevel?: string
      itemsAssembled?: number
      location?: string
      isActive?: boolean
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    userType?: string
    permissions?: string[]
    orgId?: string
    skillLevel?: string
    itemsAssembled?: number
    location?: string
    isActive?: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId?: string
    userType?: string
    permissions?: string[]
    orgId?: string
  }
}