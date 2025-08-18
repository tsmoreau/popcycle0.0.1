import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  


  // Only protect portal routes
  if (pathname.startsWith('/portal')) {
    // Check for NextAuth session cookie - simple presence check
    const sessionCookie = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token')
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/api/auth/signin?callbackUrl=' + encodeURIComponent(pathname), req.url))
    }
    // Let the page components handle detailed role checking with server-side session data
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/portal/:path*']
}