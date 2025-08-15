import GoogleProvider from 'next-auth/providers/google'
import type { AuthOptions } from 'next-auth'

export const authOptions: AuthOptions = {
  url: process.env.NEXTAUTH_URL,
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
      // Extract the origin from the URL being redirected to (this contains the actual request domain)
      let actualBaseUrl = baseUrl
      try {
        const urlObj = new URL(url)
        // If the URL has a different origin than baseUrl, use that origin
        if (urlObj.origin !== baseUrl) {
          actualBaseUrl = urlObj.origin
        }
      } catch (e) {
        // If URL parsing fails, fall back to baseUrl
      }
      
      console.log('NextAuth redirect called with url:', url, 'baseUrl:', baseUrl, 'using:', actualBaseUrl)
      
      // Handle OAuth cancellation/access_denied - always redirect to home page
      if (url.includes('error=access_denied') || url.includes('error=Callback') || url.includes('/api/auth/signin')) {
        console.log('Redirecting to home page due to OAuth cancellation')
        return actualBaseUrl
      }
      
      // For successful auth, allow the redirect
      if (url.startsWith("/")) return `${actualBaseUrl}${url}`
      else if (new URL(url).origin === actualBaseUrl) return url
      
      // Default to home page
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