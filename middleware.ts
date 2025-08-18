import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname
    
    // Portal route protection with granular permissions
    if (pathname.startsWith("/portal")) {
      const userType = token?.userType
      const permissions = token?.permissions || []
      
      // Super admin has access to everything
      if (userType === 'super_admin') {
        return
      }
      
      // Check specific portal routes
      if (pathname.startsWith("/portal/admin")) {
        const hasAdminAccess = ['admin'].some(role => userType === role) || 
                               permissions.includes('admin')
        if (!hasAdminAccess) {
          return new Response("Admin access required", { status: 403 })
        }
      }
      
      if (pathname.startsWith("/portal/operations")) {
        const hasOpsAccess = ['admin', 'staff'].some(role => userType === role) || 
                            permissions.includes('operations')
        if (!hasOpsAccess) {
          return new Response("Operations access required", { status: 403 })
        }
      }
      
      if (pathname.startsWith("/portal/crm")) {
        const hasCrmAccess = ['admin', 'staff'].some(role => userType === role) || 
                            permissions.includes('crm')
        if (!hasCrmAccess) {
          return new Response("CRM access required", { status: 403 })
        }
      }
      
      if (pathname.startsWith("/portal/financial")) {
        const hasFinancialAccess = ['admin'].some(role => userType === role) || 
                                   permissions.includes('financial')
        if (!hasFinancialAccess) {
          return new Response("Financial access required", { status: 403 })
        }
      }
      
      if (pathname.startsWith("/portal/partner")) {
        const hasPartnerAccess = ['partner_owner'].some(role => userType === role) || 
                                permissions.includes('partner')
        if (!hasPartnerAccess) {
          return new Response("Partner access required", { status: 403 })
        }
      }
      
      // General portal access - must have some role or permissions
      const hasGeneralPortalAccess = (userType && ['super_admin', 'admin', 'staff', 'partner_owner'].includes(userType)) || 
                                     permissions.length > 0
      
      if (!hasGeneralPortalAccess) {
        return new Response("Portal access requires staff privileges", { status: 403 })
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