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
      // Always redirect to the callback URL or base URL, never to sign-in pages
      const urlObj = new URL(url)
      
      // If there's a callback URL in the query params, use it
      const callbackUrl = urlObj.searchParams.get('callbackUrl')
      if (callbackUrl) {
        try {
          const parsedCallback = new URL(callbackUrl)
          // Ensure it's on the same origin
          if (parsedCallback.origin === baseUrl) {
            return callbackUrl
          }
        } catch (e) {
          // Invalid URL, fall back to base
        }
      }
      
      // If url is on the same origin, allow it
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // If url is to the same host, allow it  
      else if (new URL(url).origin === baseUrl) return url
      // Otherwise redirect to home
      return baseUrl
    }
  },
  session: {
    strategy: 'jwt'
  },

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }