import GoogleProvider from 'next-auth/providers/google'
import type { AuthOptions } from 'next-auth'

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Allow all Google OAuth users for now
      return !!user?.email
    },
    
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email
      }
      
      // Add user type and permissions to token for middleware access
      if (token?.email === 'terrencestasse@gmail.com') {
        token.userType = 'super_admin'
        token.permissions = ['admin', 'operations', 'crm', 'financial', 'partner']
      } else {
        token.userType = 'maker'
        token.permissions = []
      }
      
      return token
    },
    
    async session({ session, token }) {
      // Transfer token data to session
      if (token) {
        session.user.userType = token.userType
        session.user.permissions = token.permissions
      }
      return session
    },
  },
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/',
  },
}