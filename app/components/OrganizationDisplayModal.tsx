'use client'

import { DialogHeader, DialogTitle } from '../components/ui/dialog'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'
import { 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Calendar, 
  User, 
  TrendingUp,
  Target,
  Package,
  Clock,
  AlertCircle,
  CheckCircle,
  Palette,
  FileText,
  Activity as ActivityIcon,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react'

interface Organization {
  _id: string
  name: string
  slug: string
  orgType: 'community_partner' | 'limited_client' | 'retainer_client' | 'wholesaler'
  description: string
  contactInfo: {
    email?: string
    phone?: string
    address?: string
    website?: string
  }
  branding: {
    primaryColor?: string
    secondaryColor?: string
    logoUrl?: string
    trackingPageMessage?: string
  }
  communityPartner?: {
    mission: string
    storyContent: string
    communityPartnerType: string
    socialMedia?: {
      instagram?: string
      facebook?: string
      twitter?: string
    }
    directorName?: string
    directorTitle?: string
    pickupSchedule?: string
    metrics?: {
      totalWeightCollected: number
      pickupCount: number
      lastPickupDate?: Date
    }
  }
  limitedClient?: {
    contractStartDate: Date
    contractEndDate: Date
    monthlyDeliveryCap?: number
    integrateOwnWaste?: boolean
  }
  retainerClient?: {
    contractStartDate: Date
    contractEndDate: Date
    monthlyDeliveryCap?: number
    integrateOwnWaste?: boolean
  }
  wholesaler?: {
    buyerContactName?: string
    buyerContactEmail?: string
    buyerContactPhone?: string
    accountsPayableEmail?: string
    paymentTerms?: string
    exclusivityType?: string
  }
  status?: string
  internalNotes?: string
  activities?: any[]
  lastContactDate?: Date
  nextActionDate?: Date
  assignedTo?: string
}

interface OrganizationDisplayModalProps {
  item: Organization | null
  onClose: () => void
}

export default function OrganizationDisplayModal({ item, onClose }: OrganizationDisplayModalProps) {
  if (!item) return null

  const isPipelineFocused = item.status && !['n_a', 'active_partner', 'active_client', 'active_wholesaler'].includes(item.status)

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; className: string; icon: any }> = {
      n_a: { label: 'N/A', className: 'bg-gray-400 text-white', icon: AlertCircle },
      prospect: { label: 'Prospect', className: 'bg-gray-500 text-white', icon: Target },
      contacted: { label: 'Contacted', className: 'bg-blue-500 text-white', icon: Mail },
      in_talks: { label: 'In Talks', className: 'bg-purple-500 text-white', icon: TrendingUp },
      proposal_sent: { label: 'Proposal Sent', className: 'bg-yellow-600 text-white', icon: FileText },
      negotiation: { label: 'Negotiation', className: 'bg-orange-500 text-white', icon: TrendingUp },
      active_partner: { label: 'Active Partner', className: 'bg-pop-green text-white', icon: CheckCircle },
      active_client: { label: 'Active Client', className: 'bg-green-600 text-white', icon: CheckCircle },
      active_wholesaler: { label: 'Active Wholesaler', className: 'bg-green-700 text-white', icon: CheckCircle },
      onboarding: { label: 'Onboarding', className: 'bg-pop-blue text-white', icon: Clock },
      closed_lost: { label: 'Closed Lost', className: 'bg-red-500 text-white', icon: AlertCircle }
    }
    return configs[status] || { label: status, className: 'bg-gray-500 text-white', icon: AlertCircle }
  }

  const getOrgTypeLabel = (orgType: string) => {
    const labels: Record<string, string> = {
      community_partner: 'Community Partner',
      limited_client: 'Limited Client',
      retainer_client: 'Retainer Client',
      wholesaler: 'Wholesaler'
    }
    return labels[orgType] || orgType
  }

  const statusConfig = item.status ? getStatusConfig(item.status) : null
  const StatusIcon = statusConfig?.icon

  const accentColor = item.branding?.primaryColor || '#00D084'

  return (
    <>
        {/* Hero Section */}
        <div 
          className="relative -mt-6 -mx-6 p-6 mb-6 text-white rounded-t-lg"
          style={{ background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)` }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="h-8 w-8" />
                  {item.name}
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {getOrgTypeLabel(item.orgType)}
                  </Badge>
                  {statusConfig && (
                    <Badge className={statusConfig.className}>
                      {StatusIcon && <StatusIcon className="h-3 w-3 mr-1" />}
                      {statusConfig.label}
                    </Badge>
                  )}
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          {isPipelineFocused ? (
            // Pipeline-focused hero
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-white/80 text-sm mb-1">Last Contact</div>
                <div className="text-xl font-bold">
                  {item.lastContactDate ? new Date(item.lastContactDate).toLocaleDateString() : 'Never'}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-white/80 text-sm mb-1">Next Action</div>
                <div className="text-xl font-bold">
                  {item.nextActionDate ? new Date(item.nextActionDate).toLocaleDateString() : 'Not set'}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-white/80 text-sm mb-1">Assigned To</div>
                <div className="text-xl font-bold truncate">
                  {item.assignedTo || 'Unassigned'}
                </div>
              </div>
            </div>
          ) : (
            // Stats-focused hero
            <div className="grid grid-cols-3 gap-4 mt-6">
              {item.orgType === 'community_partner' && item.communityPartner?.metrics && (
                <>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="text-white/80 text-sm mb-1">Total Weight</div>
                    <div className="text-xl font-bold">
                      {item.communityPartner.metrics.totalWeightCollected.toFixed(1)} kg
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="text-white/80 text-sm mb-1">Pickups</div>
                    <div className="text-xl font-bold">
                      {item.communityPartner.metrics.pickupCount}
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="text-white/80 text-sm mb-1">Last Pickup</div>
                    <div className="text-lg font-bold">
                      {item.communityPartner.metrics.lastPickupDate 
                        ? new Date(item.communityPartner.metrics.lastPickupDate).toLocaleDateString()
                        : 'None'}
                    </div>
                  </div>
                </>
              )}
              {(item.orgType === 'limited_client' || item.orgType === 'retainer_client') && (
                <>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="text-white/80 text-sm mb-1">Contract Status</div>
                    <div className="text-xl font-bold">
                      {(() => {
                        const client = item.limitedClient || item.retainerClient
                        if (!client) return 'N/A'
                        const now = new Date()
                        const end = new Date(client.contractEndDate)
                        return end > now ? 'Active' : 'Expired'
                      })()}
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="text-white/80 text-sm mb-1">Monthly Cap</div>
                    <div className="text-xl font-bold">
                      {(item.limitedClient || item.retainerClient)?.monthlyDeliveryCap || 'No limit'}
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="text-white/80 text-sm mb-1">Own Waste</div>
                    <div className="text-xl font-bold">
                      {(item.limitedClient || item.retainerClient)?.integrateOwnWaste ? 'Yes' : 'No'}
                    </div>
                  </div>
                </>
              )}
              {item.orgType === 'wholesaler' && item.wholesaler && (
                <>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="text-white/80 text-sm mb-1">Payment Terms</div>
                    <div className="text-xl font-bold">
                      {item.wholesaler.paymentTerms || 'Not set'}
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="text-white/80 text-sm mb-1">Exclusivity</div>
                    <div className="text-xl font-bold capitalize">
                      {item.wholesaler.exclusivityType || 'None'}
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="text-white/80 text-sm mb-1">Buyer</div>
                    <div className="text-lg font-bold truncate">
                      {item.wholesaler.buyerContactName || 'Not set'}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="space-y-6">
          {/* Description */}
          <div>
            <p className="text-gray-700">{item.description}</p>
          </div>

          <Separator />

          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Mail className="h-5 w-5 text-pop-green" />
              Contact Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {item.contactInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <a href={`mailto:${item.contactInfo.email}`} className="text-blue-600 hover:underline">
                    {item.contactInfo.email}
                  </a>
                </div>
              )}
              {item.contactInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <a href={`tel:${item.contactInfo.phone}`} className="text-blue-600 hover:underline">
                    {item.contactInfo.phone}
                  </a>
                </div>
              )}
              {item.contactInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <a href={item.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">
                    {item.contactInfo.website}
                  </a>
                </div>
              )}
              {item.contactInfo.address && (
                <div className="flex items-start gap-2 col-span-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                  <span className="text-gray-700">{item.contactInfo.address}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Type-Specific Details */}
          {item.orgType === 'community_partner' && item.communityPartner && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-pop-green" />
                Community Partner Details
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-500">Mission</div>
                  <div className="text-gray-700">{item.communityPartner.mission}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Story</div>
                  <div className="text-gray-700">{item.communityPartner.storyContent}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Partner Type</div>
                    <div className="text-gray-700">{item.communityPartner.communityPartnerType}</div>
                  </div>
                  {item.communityPartner.pickupSchedule && (
                    <div>
                      <div className="text-sm font-medium text-gray-500">Pickup Schedule</div>
                      <div className="text-gray-700">{item.communityPartner.pickupSchedule}</div>
                    </div>
                  )}
                </div>
                {item.communityPartner.socialMedia && (
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-2">Social Media</div>
                    <div className="flex gap-4">
                      {item.communityPartner.socialMedia.instagram && (
                        <a href={`https://instagram.com/${item.communityPartner.socialMedia.instagram.replace('@', '')}`} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="flex items-center gap-1 text-pink-600 hover:underline">
                          <Instagram className="h-4 w-4" />
                          {item.communityPartner.socialMedia.instagram}
                        </a>
                      )}
                      {item.communityPartner.socialMedia.facebook && (
                        <a href={`https://facebook.com/${item.communityPartner.socialMedia.facebook}`} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="flex items-center gap-1 text-blue-600 hover:underline">
                          <Facebook className="h-4 w-4" />
                          {item.communityPartner.socialMedia.facebook}
                        </a>
                      )}
                      {item.communityPartner.socialMedia.twitter && (
                        <a href={`https://twitter.com/${item.communityPartner.socialMedia.twitter.replace('@', '')}`} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="flex items-center gap-1 text-blue-400 hover:underline">
                          <Twitter className="h-4 w-4" />
                          {item.communityPartner.socialMedia.twitter}
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {(item.orgType === 'limited_client' || item.orgType === 'retainer_client') && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Package className="h-5 w-5 text-pop-blue" />
                {item.orgType === 'limited_client' ? 'Limited' : 'Retainer'} Client Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Contract Start</div>
                  <div className="text-gray-700">
                    {new Date((item.limitedClient || item.retainerClient)!.contractStartDate).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Contract End</div>
                  <div className="text-gray-700">
                    {new Date((item.limitedClient || item.retainerClient)!.contractEndDate).toLocaleDateString()}
                  </div>
                </div>
                {(item.limitedClient || item.retainerClient)?.monthlyDeliveryCap && (
                  <div>
                    <div className="text-sm font-medium text-gray-500">Monthly Delivery Cap</div>
                    <div className="text-gray-700">{(item.limitedClient || item.retainerClient)?.monthlyDeliveryCap}</div>
                  </div>
                )}
                <div>
                  <div className="text-sm font-medium text-gray-500">Integrate Own Waste</div>
                  <div className="text-gray-700">
                    {(item.limitedClient || item.retainerClient)?.integrateOwnWaste ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {item.orgType === 'wholesaler' && item.wholesaler && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Wholesaler Details
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  {item.wholesaler.buyerContactName && (
                    <div>
                      <div className="text-sm font-medium text-gray-500">Buyer Contact</div>
                      <div className="text-gray-700">{item.wholesaler.buyerContactName}</div>
                    </div>
                  )}
                  {item.wholesaler.buyerContactEmail && (
                    <div>
                      <div className="text-sm font-medium text-gray-500">Buyer Email</div>
                      <a href={`mailto:${item.wholesaler.buyerContactEmail}`} className="text-blue-600 hover:underline">
                        {item.wholesaler.buyerContactEmail}
                      </a>
                    </div>
                  )}
                  {item.wholesaler.buyerContactPhone && (
                    <div>
                      <div className="text-sm font-medium text-gray-500">Buyer Phone</div>
                      <a href={`tel:${item.wholesaler.buyerContactPhone}`} className="text-blue-600 hover:underline">
                        {item.wholesaler.buyerContactPhone}
                      </a>
                    </div>
                  )}
                  {item.wholesaler.accountsPayableEmail && (
                    <div>
                      <div className="text-sm font-medium text-gray-500">Accounts Payable</div>
                      <a href={`mailto:${item.wholesaler.accountsPayableEmail}`} className="text-blue-600 hover:underline">
                        {item.wholesaler.accountsPayableEmail}
                      </a>
                    </div>
                  )}
                  {item.wholesaler.paymentTerms && (
                    <div>
                      <div className="text-sm font-medium text-gray-500">Payment Terms</div>
                      <div className="text-gray-700">{item.wholesaler.paymentTerms}</div>
                    </div>
                  )}
                  {item.wholesaler.exclusivityType && (
                    <div>
                      <div className="text-sm font-medium text-gray-500">Exclusivity Type</div>
                      <div className="text-gray-700 capitalize">{item.wholesaler.exclusivityType}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {(item.branding.primaryColor || item.branding.trackingPageMessage) && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Palette className="h-5 w-5 text-purple-600" />
                  Branding
                </h3>
                <div className="space-y-3">
                  {item.branding.primaryColor && (
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-gray-500 w-32">Primary Color</div>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded border" 
                          style={{ backgroundColor: item.branding.primaryColor }}
                        />
                        <span className="font-mono text-sm">{item.branding.primaryColor}</span>
                      </div>
                    </div>
                  )}
                  {item.branding.trackingPageMessage && (
                    <div>
                      <div className="text-sm font-medium text-gray-500">Tracking Page Message</div>
                      <div className="text-gray-700">{item.branding.trackingPageMessage}</div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {item.activities && item.activities.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <ActivityIcon className="h-5 w-5 text-pop-blue" />
                  Activity Timeline ({item.activities.length})
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {item.activities
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((activity) => (
                    <div key={activity.id} className="border-l-2 border-gray-300 pl-4 pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{activity.subject}</div>
                          <div className="text-sm text-gray-600">{activity.notes}</div>
                          {activity.outcome && (
                            <div className="text-sm text-gray-500 mt-1">
                              <span className="font-medium">Outcome:</span> {activity.outcome}
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 whitespace-nowrap ml-4">
                          {new Date(activity.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {item.internalNotes && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gray-600" />
                  Internal Notes
                </h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-gray-700 whitespace-pre-wrap">
                  {item.internalNotes}
                </div>
              </div>
            </>
          )}
        </div>
    </>
  )
}
