import GoogleProvider from 'next-auth/providers/google'
import type { AuthOptions } from 'next-auth'

// Dynamic NEXTAUTH_URL based on environment
const getNextAuthUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS}` : 'http://localhost:5000'
  }
  return process.env.NEXTAUTH_URL
}

// Override NEXTAUTH_URL for NextAuth
process.env.NEXTAUTH_URL = getNextAuthUrl()

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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
    async signIn({ user, account, profile, email, credentials }) {
      console.log('SignIn callback called with:', { user, account })
      
      // If user cancels OAuth (no user object), don't trigger error page
      if (!user) {
        console.log('User cancelled OAuth - redirecting to home')
        return false
      }
      
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

    async redirect({ url, baseUrl }) {
      const actualBaseUrl = getNextAuthUrl() || baseUrl || 'http://localhost:5000'
      
      if (url.startsWith("/")) return `${actualBaseUrl}${url}`
      else if (new URL(url).origin === actualBaseUrl) return url
      return actualBaseUrl
    }
  },
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/',
  },
}