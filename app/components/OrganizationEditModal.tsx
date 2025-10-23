"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { DialogHeader, DialogTitle } from "./ui/dialog"
import { Save, X, Trash2, Building2, Activity as ActivityIcon } from "lucide-react"
import ActivityTimeline from "./ActivityTimeline"

interface Activity {
  id: string
  type: 'email' | 'call' | 'meeting' | 'note' | 'task'
  date: Date
  subject: string
  notes: string
  outcome?: string
  nextAction?: string
  nextActionDate?: Date
  userId?: string
}

interface Organization {
  _id: string
  name: string
  slug: string
  orgType: 'community_partner' | 'limited_client' | 'retainer_client' | 'wholesaler'
  description: string
  contactInfo?: {
    email?: string
    phone?: string
    address?: string
    website?: string
  }
  status?: 'prospect' | 'contacted' | 'in_talks' | 'proposal_sent' | 'negotiation' | 'active_partner' | 'onboarding' | 'closed_lost' | 'n_a'
  internalNotes?: string
  activities?: Activity[]
  lastContactDate?: Date
  nextActionDate?: Date
  assignedTo?: string
  communityPartner?: any
  limitedClient?: any
  retainerClient?: any
  wholesaler?: any
}

interface OrganizationEditModalProps {
  item: Organization | null
  isAdding: boolean
  onSave: (orgData: any) => Promise<void>
  onCancel: () => void
  onDelete?: () => Promise<void>
  isSaving: boolean
}

export function OrganizationEditModal({
  item,
  isAdding,
  onSave,
  onCancel,
  onDelete,
  isSaving
}: OrganizationEditModalProps) {
  const [formData, setFormData] = useState<any>({
    _id: '',
    name: '',
    slug: '',
    orgType: 'community_partner',
    description: '',
    contactInfo: {
      email: '',
      phone: '',
      website: '',
      address: ''
    },
    status: 'prospect',
    internalNotes: '',
    activities: [],
    lastContactDate: null,
    nextActionDate: null,
    assignedTo: '',
    communityPartner: {},
    limitedClient: {},
    retainerClient: {},
    wholesaler: {}
  })

  useEffect(() => {
    if (item) {
      setFormData({
        ...item,
        contactInfo: item.contactInfo || { email: '', phone: '', website: '', address: '' },
        activities: item.activities || [],
        status: item.status || 'prospect',
        internalNotes: item.internalNotes || '',
        assignedTo: item.assignedTo || '',
        lastContactDate: item.lastContactDate || null,
        nextActionDate: item.nextActionDate || null,
        communityPartner: item.communityPartner || {},
        limitedClient: item.limitedClient || {},
        retainerClient: item.retainerClient || {},
        wholesaler: item.wholesaler || {}
      })
    } else {
      setFormData({
        _id: '',
        name: '',
        slug: '',
        orgType: 'community_partner',
        description: '',
        contactInfo: {
          email: '',
          phone: '',
          website: '',
          address: ''
        },
        status: 'prospect',
        internalNotes: '',
        activities: [],
        lastContactDate: null,
        nextActionDate: null,
        assignedTo: '',
        communityPartner: {},
        limitedClient: {},
        retainerClient: {},
        wholesaler: {}
      })
    }
  }, [item])

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }))
  }

  const handleDoubleNestedChange = (parent: string, child: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: {
          ...(prev[parent]?.[child] || {}),
          [field]: value
        }
      }
    }))
  }

  const handleAddActivity = (activity: Omit<Activity, 'id'>) => {
    const newActivity = {
      ...activity,
      id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
    setFormData((prev: any) => ({
      ...prev,
      activities: [...(prev.activities || []), newActivity]
    }))
  }

  const handleUpdateLastContact = (date: Date) => {
    setFormData((prev: any) => ({
      ...prev,
      lastContactDate: date
    }))
  }

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>{isAdding ? 'Add Organization' : 'Edit Organization'}</DialogTitle>
      </DialogHeader>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">
            <Building2 className="h-4 w-4 mr-2" />
            Organization Details
          </TabsTrigger>
          <TabsTrigger value="activities">
            <ActivityIcon className="h-4 w-4 mr-2" />
            Activity Timeline ({formData.activities?.length || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Organization Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter organization name"
                data-testid="input-org-name"
              />
            </div>
            <div>
              <Label>URL Slug *</Label>
              <Input
                value={formData.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                placeholder="organization-slug"
                data-testid="input-org-slug"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Organization Type *</Label>
              <select
                value={formData.orgType}
                onChange={(e) => handleChange('orgType', e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                data-testid="select-org-type"
              >
                <option value="community_partner">Community Partner</option>
                <option value="limited_client">Limited Client</option>
                <option value="retainer_client">Retainer Client</option>
                <option value="wholesaler">Wholesaler</option>
              </select>
            </div>
            <div>
              <Label>Pipeline Status</Label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                data-testid="select-org-status"
              >
                <option value="n_a">N/A</option>
                <option value="prospect">Prospect</option>
                <option value="contacted">Contacted</option>
                <option value="in_talks">In Talks</option>
                <option value="proposal_sent">Proposal Sent</option>
                <option value="negotiation">Negotiation</option>
                <option value="active_partner">Active Partner</option>
                <option value="active_client">Active Client</option>
                <option value="active_wholesaler">Active Wholesaler</option>
                <option value="onboarding">Onboarding</option>
                <option value="closed_lost">Closed Lost</option>
              </select>
            </div>
          </div>

          <div>
            <Label>Description *</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe the organization"
              rows={3}
              data-testid="textarea-org-description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Contact Email</Label>
              <Input
                type="email"
                value={formData.contactInfo?.email || ''}
                onChange={(e) => handleNestedChange('contactInfo', 'email', e.target.value)}
                placeholder="contact@organization.com"
                data-testid="input-org-email"
              />
            </div>
            <div>
              <Label>Contact Phone</Label>
              <Input
                value={formData.contactInfo?.phone || ''}
                onChange={(e) => handleNestedChange('contactInfo', 'phone', e.target.value)}
                placeholder="(555) 123-4567"
                data-testid="input-org-phone"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Website</Label>
              <Input
                value={formData.contactInfo?.website || ''}
                onChange={(e) => handleNestedChange('contactInfo', 'website', e.target.value)}
                placeholder="https://organization.com"
                data-testid="input-org-website"
              />
            </div>
            <div>
              <Label>Assigned To</Label>
              <Input
                value={formData.assignedTo || ''}
                onChange={(e) => handleChange('assignedTo', e.target.value)}
                placeholder="Team member name"
                data-testid="input-org-assigned-to"
              />
            </div>
          </div>

          <div>
            <Label>Address</Label>
            <Textarea
              value={formData.contactInfo?.address || ''}
              onChange={(e) => handleNestedChange('contactInfo', 'address', e.target.value)}
              placeholder="Full address"
              rows={2}
              data-testid="textarea-org-address"
            />
          </div>

          <div>
            <Label>Internal Notes</Label>
            <Textarea
              value={formData.internalNotes || ''}
              onChange={(e) => handleChange('internalNotes', e.target.value)}
              placeholder="Private notes about this organization (not visible to partner)..."
              rows={3}
              data-testid="textarea-org-internal-notes"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Last Contact Date</Label>
              <Input
                type="date"
                value={formData.lastContactDate ? new Date(formData.lastContactDate).toISOString().split('T')[0] : ''}
                onChange={(e) => handleChange('lastContactDate', e.target.value ? new Date(e.target.value) : null)}
                data-testid="input-org-last-contact"
              />
            </div>
            <div>
              <Label>Next Action Date</Label>
              <Input
                type="date"
                value={formData.nextActionDate ? new Date(formData.nextActionDate).toISOString().split('T')[0] : ''}
                onChange={(e) => handleChange('nextActionDate', e.target.value ? new Date(e.target.value) : null)}
                data-testid="input-org-next-action"
              />
            </div>
          </div>

          {/* Type-specific fields */}
          {formData.orgType === 'community_partner' && (
            <div className="space-y-4 pt-4 mt-4 border-t">
              <h3 className="font-semibold text-lg">Community Partner Details</h3>
              <div>
                <Label>Mission</Label>
                <Textarea
                  value={formData.communityPartner?.mission || ''}
                  onChange={(e) => handleNestedChange('communityPartner', 'mission', e.target.value)}
                  placeholder="Organization's mission statement"
                  rows={2}
                />
              </div>
              <div>
                <Label>Story Content</Label>
                <Textarea
                  value={formData.communityPartner?.storyContent || ''}
                  onChange={(e) => handleNestedChange('communityPartner', 'storyContent', e.target.value)}
                  placeholder="Partner story for tracking page"
                  rows={3}
                />
              </div>
              <div>
                <Label>Community Partner Type</Label>
                <Input
                  value={formData.communityPartner?.communityPartnerType || ''}
                  onChange={(e) => handleNestedChange('communityPartner', 'communityPartnerType', e.target.value)}
                  placeholder="e.g., nonprofit, cafe, restaurant"
                />
              </div>
              <div>
                <Label>Pickup Schedule</Label>
                <Input
                  value={formData.communityPartner?.pickupSchedule || ''}
                  onChange={(e) => handleNestedChange('communityPartner', 'pickupSchedule', e.target.value)}
                  placeholder="e.g., Weekly on Tuesdays"
                />
              </div>
            </div>
          )}

          {formData.orgType === 'limited_client' && (
            <div className="space-y-4 pt-4 mt-4 border-t">
              <h3 className="font-semibold text-lg">Limited Client Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Contract Start Date</Label>
                  <Input
                    type="date"
                    value={formData.limitedClient?.contractStartDate ? new Date(formData.limitedClient.contractStartDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => handleNestedChange('limitedClient', 'contractStartDate', e.target.value ? new Date(e.target.value) : null)}
                  />
                </div>
                <div>
                  <Label>Contract End Date</Label>
                  <Input
                    type="date"
                    value={formData.limitedClient?.contractEndDate ? new Date(formData.limitedClient.contractEndDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => handleNestedChange('limitedClient', 'contractEndDate', e.target.value ? new Date(e.target.value) : null)}
                  />
                </div>
              </div>
              <div>
                <Label>Monthly Delivery Cap</Label>
                <Input
                  type="number"
                  value={formData.limitedClient?.monthlyDeliveryCap || ''}
                  onChange={(e) => handleNestedChange('limitedClient', 'monthlyDeliveryCap', e.target.value ? Number(e.target.value) : null)}
                  placeholder="Maximum monthly deliveries"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.limitedClient?.integrateOwnWaste || false}
                  onChange={(e) => handleNestedChange('limitedClient', 'integrateOwnWaste', e.target.checked)}
                  className="h-4 w-4"
                />
                <Label>Integrate Own Waste</Label>
              </div>
            </div>
          )}

          {formData.orgType === 'retainer_client' && (
            <div className="space-y-4 pt-4 mt-4 border-t">
              <h3 className="font-semibold text-lg">Retainer Client Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Contract Start Date</Label>
                  <Input
                    type="date"
                    value={formData.retainerClient?.contractStartDate ? new Date(formData.retainerClient.contractStartDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => handleNestedChange('retainerClient', 'contractStartDate', e.target.value ? new Date(e.target.value) : null)}
                  />
                </div>
                <div>
                  <Label>Contract End Date</Label>
                  <Input
                    type="date"
                    value={formData.retainerClient?.contractEndDate ? new Date(formData.retainerClient.contractEndDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => handleNestedChange('retainerClient', 'contractEndDate', e.target.value ? new Date(e.target.value) : null)}
                  />
                </div>
              </div>
              <div>
                <Label>Monthly Delivery Cap</Label>
                <Input
                  type="number"
                  value={formData.retainerClient?.monthlyDeliveryCap || ''}
                  onChange={(e) => handleNestedChange('retainerClient', 'monthlyDeliveryCap', e.target.value ? Number(e.target.value) : null)}
                  placeholder="Maximum monthly deliveries"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.retainerClient?.integrateOwnWaste || false}
                  onChange={(e) => handleNestedChange('retainerClient', 'integrateOwnWaste', e.target.checked)}
                  className="h-4 w-4"
                />
                <Label>Integrate Own Waste</Label>
              </div>
            </div>
          )}

          {formData.orgType === 'wholesaler' && (
            <div className="space-y-4 pt-4 mt-4 border-t">
              <h3 className="font-semibold text-lg">Wholesaler Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Buyer Contact Name</Label>
                  <Input
                    value={formData.wholesaler?.buyerContactName || ''}
                    onChange={(e) => handleNestedChange('wholesaler', 'buyerContactName', e.target.value)}
                    placeholder="Primary buyer name"
                  />
                </div>
                <div>
                  <Label>Buyer Contact Email</Label>
                  <Input
                    type="email"
                    value={formData.wholesaler?.buyerContactEmail || ''}
                    onChange={(e) => handleNestedChange('wholesaler', 'buyerContactEmail', e.target.value)}
                    placeholder="buyer@wholesaler.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Buyer Contact Phone</Label>
                  <Input
                    value={formData.wholesaler?.buyerContactPhone || ''}
                    onChange={(e) => handleNestedChange('wholesaler', 'buyerContactPhone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <Label>Accounts Payable Email</Label>
                  <Input
                    type="email"
                    value={formData.wholesaler?.accountsPayableEmail || ''}
                    onChange={(e) => handleNestedChange('wholesaler', 'accountsPayableEmail', e.target.value)}
                    placeholder="ap@wholesaler.com"
                  />
                </div>
              </div>
              <div>
                <Label>Payment Terms</Label>
                <Input
                  value={formData.wholesaler?.paymentTerms || ''}
                  onChange={(e) => handleNestedChange('wholesaler', 'paymentTerms', e.target.value)}
                  placeholder="e.g., Net 30"
                />
              </div>
              <div>
                <Label>Exclusivity Type</Label>
                <select
                  value={formData.wholesaler?.exclusivityType || 'none'}
                  onChange={(e) => handleNestedChange('wholesaler', 'exclusivityType', e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="none">None</option>
                  <option value="design">Design</option>
                  <option value="colorway">Colorway</option>
                  <option value="category">Category</option>
                </select>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="activities" className="mt-4">
          <ActivityTimeline
            activities={formData.activities || []}
            onAddActivity={handleAddActivity}
            onUpdateLastContact={handleUpdateLastContact}
            readOnly={isAdding}
          />
          {isAdding && (
            <p className="text-sm text-gray-600 mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              Note: Save the organization first before adding activities.
            </p>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex gap-2 mt-6 pt-4 border-t">
        <Button
          onClick={() => onSave(formData)}
          disabled={isSaving || !formData.name || !formData.slug || !formData.description}
          className="flex-1 bg-pop-green hover:bg-pop-green/90"
          data-testid="button-save-org"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? (isAdding ? 'Adding...' : 'Saving...') : (isAdding ? 'Add Organization' : 'Save Changes')}
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isSaving}
          data-testid="button-cancel-org"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        {!isAdding && onDelete && (
          <Button
            variant="destructive"
            onClick={() => onDelete()}
            disabled={isSaving}
            data-testid="button-delete-org"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        )}
      </div>
    </div>
  )
}
