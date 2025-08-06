'use client'

import { useState } from 'react'
import { Phone, Users, TrendingUp, AlertCircle, Calendar, MessageCircle, Building2 } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { DataTable, Column } from '../../components/ui/data-table'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion'

interface Organization {
  id: string
  name: string
  contact: string
  stage: string
  status: 'Active' | 'Pending' | 'Renewal' | 'Closed'
  bins: number
  lastContact: string
  value: string
}

export default function CRMPage() {
  // Sample organization data
  const organizationsData: Organization[] = [
    { id: 'O-001', name: 'TechCorp Industries', contact: 'Sarah Miller', stage: 'Active Partnership', status: 'Active', bins: 12, lastContact: '2 days ago', value: '$45,000' },
    { id: 'O-002', name: 'GreenOffice Solutions', contact: 'Mike Chen', stage: 'Contract Renewal', status: 'Renewal', bins: 8, lastContact: '1 week ago', value: '$28,000' },
    { id: 'O-003', name: 'Metro Facilities', contact: 'Jessica Brown', stage: 'Follow-up Required', status: 'Pending', bins: 0, lastContact: '3 weeks ago', value: '$15,000' },
    { id: 'O-004', name: 'Urban Dynamics', contact: 'David Rodriguez', stage: 'Proposal Sent', status: 'Pending', bins: 0, lastContact: '5 days ago', value: '$22,000' },
    { id: 'O-005', name: 'EcoSystems Ltd', contact: 'Lisa Thompson', stage: 'Negotiation', status: 'Active', bins: 15, lastContact: '1 day ago', value: '$67,000' }
  ]

  const organizationColumns: Column<Organization>[] = [
    { key: 'id', header: 'Org ID' },
    { key: 'name', header: 'Organization' },
    { key: 'contact', header: 'Primary Contact' },
    { key: 'stage', header: 'Stage' },
    {
      key: 'status',
      header: 'Status',
      render: (org) => (
        <Badge className={
          org.status === 'Active' ? 'bg-pop-green text-white' :
          org.status === 'Renewal' ? 'bg-pop-blue text-white' :
          org.status === 'Pending' ? 'bg-orange-500 text-white' :
          'bg-gray-100 text-gray-800'
        }>
          {org.status}
        </Badge>
      )
    },
    { key: 'bins', header: 'Active Bins' },
    { key: 'lastContact', header: 'Last Contact' },
    { key: 'value', header: 'Contract Value' }
  ]

  const renderOrganizationModal = (org: Organization) => (
    <div>
      <h3 className="text-lg font-semibold mb-4">{org.name}</h3>
      <div className="space-y-3">
        <div><strong>Contact:</strong> {org.contact}</div>
        <div><strong>Stage:</strong> {org.stage}</div>
        <div><strong>Status:</strong> {org.status}</div>
        <div><strong>Active Bins:</strong> {org.bins}</div>
        <div><strong>Contract Value:</strong> {org.value}</div>
        <div><strong>Last Contact:</strong> {org.lastContact}</div>
        <div className="pt-4 space-y-2">
          <Button className="w-full bg-pop-green hover:bg-pop-green/90">Edit Organization</Button>
          <Button variant="outline" className="w-full">Schedule Follow-up</Button>
          <Button variant="outline" className="w-full">Generate Report</Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-pop-black">CRM Dashboard</h2>
      </div>

      {/* CRM Overview - Mobile-Ready Collapsible */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="crm-overview" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-pop-green" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-pop-black">CRM Overview</h3>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {/* Mobile-First Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 pb-4">
              {/* Active Leads */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Phone className="h-5 w-5 text-gray-600" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Leads</span>
                </div>
                <div className="text-2xl font-bold text-pop-black mb-1">24</div>
                <div className="text-sm text-gray-600 mb-2">Active Leads</div>
                <div className="flex gap-2 text-xs">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">8 New</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">16 Follow-up</span>
                </div>
              </div>

              {/* Active Partners */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-5 w-5 text-gray-600" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Partners</span>
                </div>
                <div className="text-2xl font-bold text-pop-black mb-1">42</div>
                <div className="text-sm text-gray-600 mb-2">Active Partners</div>
                <div className="flex gap-2 text-xs">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">35 Active</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">7 Renewal</span>
                </div>
              </div>

              {/* Conversion Rate */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-5 w-5 text-gray-600" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Conversion</span>
                </div>
                <div className="text-2xl font-bold text-pop-black mb-1">32%</div>
                <div className="text-sm text-gray-600 mb-2">Conversion Rate</div>
                <div className="flex gap-2 text-xs">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">+5% Month</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">8 Closed</span>
                </div>
              </div>

              {/* Follow-ups Due */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <AlertCircle className="h-5 w-5 text-gray-600" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Follow-ups</span>
                </div>
                <div className="text-2xl font-bold text-pop-black mb-1">7</div>
                <div className="text-sm text-gray-600 mb-2">Due Today</div>
                <div className="flex gap-2 text-xs">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">3 Urgent</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">4 Routine</span>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Organization Management Table */}
      <DataTable
        title="Organization Management"
        description="Sales pipeline, partner relationships, and contract management"
        icon={<Building2 className="h-5 w-5 text-pop-green" />}
        data={organizationsData}
        columns={organizationColumns}
        renderModal={renderOrganizationModal}
      />

      {/* Communication Hub Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-pop-green" />
            Communication Hub
          </CardTitle>
          <CardDescription>Google Workspace integration and partner communications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
            <Button variant="outline" className="justify-start">
              <MessageCircle className="h-4 w-4 mr-2" />
              Send Email Campaign
            </Button>
            <Button variant="outline" className="justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              Generate Impact Report
            </Button>
            <Button variant="outline" className="justify-start">
              <Users className="h-4 w-4 mr-2" />
              Export Partner Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}