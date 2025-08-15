import GoogleProvider from 'next-auth/providers/google'
import type { AuthOptions } from 'next-auth'

// Get the proper base URL for this environment
const getBaseUrl = () => {
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.RAILWAY_PUBLIC_DOMAIN) return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;
  if (process.env.RENDER_EXTERNAL_URL) return process.env.RENDER_EXTERNAL_URL;
  if (process.env.REPLIT_DEPLOYMENT_URL) return process.env.REPLIT_DEPLOYMENT_URL;
  if (process.env.REPL_SLUG && process.env.REPL_OWNER) {
    return `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
  }
  return 'http://localhost:3000';
};

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
      const actualBaseUrl = getBaseUrl();
      
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