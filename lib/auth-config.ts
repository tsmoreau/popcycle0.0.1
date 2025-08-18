import GoogleProvider from 'next-auth/providers/google'
import type { AuthOptions } from 'next-auth'
import { createOrUpdateUser, getUserByEmail, getUserPermissions } from './auth-helpers'

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
        token.name = user.name
      }
      
      // Get or create user in database and add permissions to token
      if (token?.email) {
        try {
          // Create or update user in database
          const dbUser = await createOrUpdateUser({
            name: token.name as string,
            email: token.email as string,
            image: token.picture as string
          });
          
          // Add database user info to token for middleware access
          token.userId = dbUser._id.toString()
          token.userType = dbUser.userType
          token.permissions = getUserPermissions(dbUser)
          token.orgId = dbUser.orgId?.toString()
        } catch (error) {
          console.error('Error syncing user with database:', error)
          // Fallback for database errors
          token.userType = 'user'
          token.permissions = []
        }
      }
      
      return token
    },
    
    async session({ session, token }) {
      // Transfer token data to session
      if (token) {
        session.user.id = token.userId as string
        session.user.userType = token.userType as string
        session.user.permissions = token.permissions as string[]
        session.user.orgId = token.orgId as string
        
        // Get fresh user data from database for session
        try {
          const dbUser = await getUserByEmail(token.email as string);
          if (dbUser) {
            session.user.skillLevel = dbUser.skillLevel
            session.user.itemsAssembled = dbUser.itemsAssembled
            session.user.location = dbUser.location
            session.user.isActive = dbUser.isActive
          }
        } catch (error) {
          console.error('Error fetching user data for session:', error)
        }
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