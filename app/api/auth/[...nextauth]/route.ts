import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoClient } from "mongodb"
import type { AuthOptions } from 'next-auth'

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!.trim(),
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!.trim(),
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      allowDangerousEmailAccountLinking: true
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Allow all Google OAuth users for now
      return !!user?.email
    },
    
    async session({ session }) {
      // For terrencestasse@gmail.com, add super admin privileges
      if (session?.user?.email === 'terrencestasse@gmail.com') {
        session.user.userType = 'super_admin'
        session.user.permissions = ['admin', 'operations', 'crm', 'financial', 'partner']
      } else {
        session.user.userType = 'maker'
        session.user.permissions = []
      }
      return session
    }
  },
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }