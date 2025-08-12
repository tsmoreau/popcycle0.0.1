import { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      userType?: string
      permissions?: string[]
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    userType?: string
    permissions?: string[]
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userType?: string
    permissions?: string[]
  }
}