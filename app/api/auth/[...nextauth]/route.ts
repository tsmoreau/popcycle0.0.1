import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { MongoClient } from "mongodb"
import type { AuthOptions } from 'next-auth'

const client = new MongoClient(process.env.MONGODB_URI!)
const clientPromise = Promise.resolve(client)

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  trustHost: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false
      
      // Connect to MongoDB to check/create user
      const client = new MongoClient(process.env.MONGODB_URI!)
      await client.connect()
      const db = client.db('PopCycle')
      
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
        const db = client.db('PopCycle')
        
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