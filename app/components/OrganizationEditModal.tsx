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
  orgType: 'community_partner' | 'venue' | 'retailer'
  description: string
  contactInfo?: {
    email?: string
    phone?: string
    address?: string
    website?: string
  }
  status?: 'prospect' | 'contacted' | 'in_talks' | 'proposal_sent' | 'negotiation' | 'active_partner' | 'onboarding' | 'closed_lost'
  internalNotes?: string
  activities?: Activity[]
  lastContactDate?: Date
  nextActionDate?: Date
  assignedTo?: string
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
    assignedTo: ''
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
        nextActionDate: item.nextActionDate || null
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
        assignedTo: ''
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
                <option value="venue">Venue</option>
                <option value="retailer">Retailer</option>
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
                <option value="prospect">Prospect</option>
                <option value="contacted">Contacted</option>
                <option value="in_talks">In Talks</option>
                <option value="proposal_sent">Proposal Sent</option>
                <option value="negotiation">Negotiation</option>
                <option value="active_partner">Active Partner</option>
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
