import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  console.log('Middleware - pathname:', pathname)

  // Only protect portal routes
  if (pathname.startsWith('/portal')) {
    // For database sessions, check if user is authenticated via session API
    const sessionResponse = await fetch(`${req.nextUrl.origin}/api/auth/session`, {
      headers: {
        cookie: req.headers.get('cookie') || ''
      }
    })
    
    const session = await sessionResponse.json()
    console.log('Middleware - session:', session)
    
    if (!session?.user) {
      console.log('Middleware - no session, redirecting to home')
      return NextResponse.redirect(new URL('/', req.url))
    }

    const userType = session.user.userType as string
    const permissions = session.user.permissions as string[]
    console.log('Middleware - userType:', userType, 'permissions:', permissions)

    // Admin portal - requires admin or super_admin
    if (pathname.startsWith('/portal/admin')) {
      if (!['admin', 'super_admin'].includes(userType)) {
        return NextResponse.redirect(new URL('/portal', req.url))
      }
    }

    // Operations portal - requires staff level access
    if (pathname.startsWith('/portal/operations')) {
      if (!['staff', 'admin', 'super_admin'].includes(userType)) {
        return NextResponse.redirect(new URL('/portal', req.url))
      }
    }

    // CRM portal - requires staff level access
    if (pathname.startsWith('/portal/crm')) {
      if (!['staff', 'admin', 'super_admin'].includes(userType)) {
        return NextResponse.redirect(new URL('/portal', req.url))
      }
    }

    // Financial portal - requires admin level access
    if (pathname.startsWith('/portal/financial')) {
      if (!['admin', 'super_admin'].includes(userType)) {
        return NextResponse.redirect(new URL('/portal', req.url))
      }
    }

    // Partner portal - requires partner_owner or admin level access
    if (pathname.startsWith('/portal/partner')) {
      if (!['partner_owner', 'admin', 'super_admin'].includes(userType)) {
        return NextResponse.redirect(new URL('/portal', req.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/portal/:path*']
}