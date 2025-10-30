'use client'

import { Button } from '../components/ui/button'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Organization {
  _id: string
  name: string
  orgType: string
  description?: string
  status?: string
}

export default function ProfilePage() {
  const { data: session } = useSession()
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loadingOrg, setLoadingOrg] = useState(false)

  useEffect(() => {
    if (session?.user?.orgId) {
      fetchOrganization(session.user.orgId)
    }
  }, [session])

  const fetchOrganization = async (orgId: string) => {
    try {
      setLoadingOrg(true)
      const response = await fetch(`/api/crm/organizations?id=${orgId}`)
      const data = await response.json()
      
      if (response.ok) {
        setOrganization(data)
      } else {
        console.error('Failed to fetch organization:', data.error)
      }
    } catch (error) {
      console.error('Error fetching organization:', error)
    } finally {
      setLoadingOrg(false)
    }
  }

  const getOrgTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'community_partner': 'Community Partner',
      'limited_client': 'Limited Client',
      'retainer_client': 'Retainer Client',
      'wholesaler': 'Wholesaler'
    }
    return labels[type] || type
  }

  const getUserTypeLabel = (type?: string) => {
    const labels: Record<string, string> = {
      'super_admin': 'Super Administrator',
      'admin': 'Administrator',
      'staff': 'Staff Member',
      'partner_owner': 'Partner Owner',
      'user': 'User'
    }
    return labels[type || 'user'] || 'User'
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-jost">
        <div className="max-w-md mx-auto text-center px-6 py-16">
          <h1 className="text-4xl font-light text-black mb-6">Sign In Required</h1>
          <p className="text-gray-600 mb-8 font-light leading-relaxed">You need to be signed in to view your profile.</p>
          <Link href="/auth/signin">
            <Button className="bg-black text-white hover:bg-gray-800 font-light px-8 h-12" data-testid="button-signin">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const hasStaffAccess = session?.user?.userType === 'super_admin' || 
    session?.user?.userType === 'admin' ||
    session?.user?.userType === 'staff' ||
    (session?.user?.permissions && session.user.permissions.length > 0)

  return (
    <div className="min-h-screen bg-white font-jost">
      {/* Hero Section */}
      <section className="relative py-40 lg:py-48 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl mb-4 tracking-tight leading-tight text-black font-light">
            {session.user?.name || 'User'}
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 font-light">
            {session.user?.email}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        
        {/* Account Information */}
        <section className="mb-20 pb-20 border-b border-gray-200">
          <h2 className="text-3xl font-light mb-12 text-black">Account Information</h2>
          
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="text-sm text-gray-500 font-light">Role</div>
              <div className="md:col-span-2 text-base text-black font-light">
                {getUserTypeLabel(session.user?.userType)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="text-sm text-gray-500 font-light">Email</div>
              <div className="md:col-span-2 text-base text-black font-light">
                {session.user?.email}
              </div>
            </div>

            {session.user?.location && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="text-sm text-gray-500 font-light">Location</div>
                <div className="md:col-span-2 text-base text-black font-light">
                  {session.user.location}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Organization Affiliation */}
        {session.user?.orgId && (
          <section className="mb-20 pb-20 border-b border-gray-200">
            <h2 className="text-3xl font-light mb-12 text-black">Organization</h2>
            
            {loadingOrg ? (
              <div className="text-gray-500 font-light">Loading organization details...</div>
            ) : organization ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="text-sm text-gray-500 font-light">Name</div>
                  <div className="md:col-span-2 text-base text-black font-light">
                    {organization.name}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="text-sm text-gray-500 font-light">Type</div>
                  <div className="md:col-span-2 text-base text-black font-light">
                    {getOrgTypeLabel(organization.orgType)}
                  </div>
                </div>

                {organization.description && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="text-sm text-gray-500 font-light">About</div>
                    <div className="md:col-span-2 text-base text-gray-700 font-light leading-relaxed">
                      {organization.description}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-500 font-light">Organization details not available</div>
            )}
          </section>
        )}

        {/* Staff Access */}
        {hasStaffAccess && (
          <section className="mb-20 pb-20 border-b border-gray-200">
            <h2 className="text-3xl font-light mb-12 text-black">Staff Access</h2>
            
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="text-sm text-gray-500 font-light">Access Level</div>
                <div className="md:col-span-2 text-base text-black font-light">
                  {getUserTypeLabel(session.user?.userType)}
                </div>
              </div>

              {session.user?.permissions && session.user.permissions.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="text-sm text-gray-500 font-light">Permissions</div>
                  <div className="md:col-span-2 text-base text-black font-light">
                    {session.user.permissions.join(', ')}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="text-sm text-gray-500 font-light">Portal</div>
                <div className="md:col-span-2">
                  <Link href="/portal">
                    <Button 
                      variant="outline" 
                      className="bg-black text-white hover:bg-gray-800 font-light px-8"
                      data-testid="button-portal-access"
                    >
                      Access Portal
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Actions */}
        {!hasStaffAccess && (
          <section className="mb-20">
            <h2 className="text-3xl font-light mb-12 text-black">Quick Links</h2>
            
            <div className="space-y-4">
              <Link href="/track">
                <Button 
                  variant="outline" 
                  className="w-full md:w-auto bg-white border-gray-300 text-black hover:bg-gray-50 font-light px-8 justify-start"
                  data-testid="button-track-items"
                >
                  Track Items
                </Button>
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
