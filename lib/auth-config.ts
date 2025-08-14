import GoogleProvider from 'next-auth/providers/google'
import type { AuthOptions } from 'next-auth'

// Dynamically set the base URL based on environment
const getBaseUrl = () => {
  if (process.env.REPLIT_DEV_DOMAIN) {
    return `https://${process.env.REPLIT_DEV_DOMAIN}`
  }
  return process.env.NEXTAUTH_URL || 'https://popcycle.replit.app'
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: true,
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
      const dynamicBaseUrl = getBaseUrl()
      console.log('NextAuth redirect called with url:', url, 'baseUrl:', baseUrl, 'dynamicBaseUrl:', dynamicBaseUrl)
      
      // Handle OAuth cancellation/access_denied - always redirect to home page
      if (url.includes('error=access_denied') || url.includes('error=Callback') || url.includes('/api/auth/signin')) {
        console.log('Redirecting to home page due to OAuth cancellation')
        return dynamicBaseUrl
      }
      
      // For successful auth, allow the redirect
      if (url.startsWith("/")) return `${dynamicBaseUrl}${url}`
      else if (new URL(url).origin === dynamicBaseUrl) return url
      
      // Default to home page
      return dynamicBaseUrl
    }
  },
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/',
  },
}