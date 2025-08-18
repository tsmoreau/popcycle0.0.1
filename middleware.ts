import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Session tracking handled via client-side API calls to avoid Edge Runtime limitations

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const { pathname } = req.nextUrl

    // Role-based access control for portal routes
    if (pathname.startsWith('/portal')) {
      if (!token) {
        return NextResponse.redirect(new URL('/', req.url))
      }

      const userType = token.userType as string
      const permissions = token.permissions as string[]

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
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public routes
        if (req.nextUrl.pathname.startsWith('/api/auth') || 
            req.nextUrl.pathname === '/' ||
            req.nextUrl.pathname.startsWith('/shop') ||
            req.nextUrl.pathname.startsWith('/track') ||
            req.nextUrl.pathname.startsWith('/about') ||
            req.nextUrl.pathname.startsWith('/services')) {
          return true
        }
        
        // Require authentication for portal routes
        if (req.nextUrl.pathname.startsWith('/portal') || 
            req.nextUrl.pathname.startsWith('/profile')) {
          return !!token
        }
        
        return true
      },
    },
  }
)

