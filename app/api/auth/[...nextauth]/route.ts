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
    async signIn({ user, account, profile }) {
      if (!user.email) return false
      
      // Connect to MongoDB to check/create user
      const client = new MongoClient(process.env.MONGODB_URI!)
      await client.connect()
      const db = client.db()
      
      // Check if user exists in our users collection
      let existingUser = await db.collection('users').findOne({ email: user.email })
      
      if (!existingUser) {
        // Create new user with default "maker" role
        const newUser = {
          name: user.name || profile?.name || '',
          email: user.email,
          userType: 'maker',
          skillLevel: 'beginner',
          itemsAssembled: 0,
          totalHoursLogged: 0,
          favoriteProducts: [],
          assemblyStories: [],
          permissions: [], // No portal access for regular users
          assignedRoutes: [],
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        
        await db.collection('users').insertOne(newUser)
        existingUser = newUser
      }
      
      await client.close()
      return true
    },
    
    async session({ session, token }) {
      if (session?.user?.email) {
        // Fetch current user data from MongoDB
        const client = new MongoClient(process.env.MONGODB_URI!)
        await client.connect()
        const db = client.db()
        
        const user = await db.collection('users').findOne({ email: session.user.email })
        
        if (user) {
          session.user.userType = user.userType
          session.user.permissions = user.permissions || []
          session.user.id = user._id.toString()
        }
        
        await client.close()
      }
      return session
    },
    
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email
      }
      return token
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