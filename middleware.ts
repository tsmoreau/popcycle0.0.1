import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Allow access if user is super_admin or has permissions
    const token = req.nextauth.token
    if (req.nextUrl.pathname.startsWith("/portal")) {
      const hasPortalAccess = token?.userType === 'super_admin' || 
        (token?.permissions && token.permissions.length > 0)
      
      if (!hasPortalAccess) {
        return new Response("Access Denied", { status: 403 })
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Require authentication for portal routes
        if (req.nextUrl.pathname.startsWith("/portal")) {
          return !!token
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/portal/:path*"]
}