'use client'

import { useState } from 'react'
import { Phone, Users, TrendingUp, AlertCircle, Calendar, MessageCircle, Building2, UserPlus, GitBranch, ChevronDown, ArrowRight, CheckCircle, Clock, FileText, Handshake, Download, Upload } from 'lucide-react'
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
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showSalesWorkflow, setShowSalesWorkflow] = useState(false)
  const [showCommunications, setShowCommunications] = useState(false)

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

      {/* Sales & Partnership Management Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-pop-green" />
            Sales & Partnership Management
          </CardTitle>
          <CardDescription>Lead conversion workflows, partner onboarding, and documentation management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Sales Workflow Dropdown */}
          <div className="w-full border rounded-lg">
            <div className="px-4 py-4 cursor-pointer hover:bg-gray-50" onClick={() => setShowSalesWorkflow(!showSalesWorkflow)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-pop-green" />
                  <span className="font-medium">Sales Workflow</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showSalesWorkflow ? 'rotate-180' : ''}`} />
              </div>
            </div>
            {showSalesWorkflow && (
              <div className="px-4 pb-4 border-t bg-gray-50">
                <div className="mt-4">
                  {/* Sales Workflow Diagram */}
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 py-4">
                    {/* Step 1: Lead */}
                    <div className="flex flex-col items-center">
                      <Badge className="bg-pop-blue text-white px-4 py-2 text-sm whitespace-nowrap">
                        <Phone className="h-4 w-4 mr-2" />
                        Initial Lead
                      </Badge>
                    </div>
                    
                    <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                    <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
                    
                    {/* Step 2: Contact */}
                    <div className="flex flex-col items-center">
                      <Badge className="bg-orange-500 text-white px-4 py-2 text-sm whitespace-nowrap">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        First Contact
                      </Badge>
                    </div>
                    
                    <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                    <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
                    
                    {/* Step 3: Proposal */}
                    <div className="flex flex-col items-center">
                      <Badge className="bg-pop-red text-white px-4 py-2 text-sm whitespace-nowrap">
                        <FileText className="h-4 w-4 mr-2" />
                        Proposal Sent
                      </Badge>
                    </div>
                    
                    <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                    <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
                    
                    {/* Step 4: Negotiation */}
                    <div className="flex flex-col items-center">
                      <Badge className="bg-purple-600 text-white px-4 py-2 text-sm whitespace-nowrap">
                        <Users className="h-4 w-4 mr-2" />
                        Negotiation
                      </Badge>
                    </div>
                    
                    <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                    <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
                    
                    {/* Step 5: Contract */}
                    <div className="flex flex-col items-center">
                      <Badge className="bg-pop-green text-white px-4 py-2 text-sm whitespace-nowrap">
                        <Handshake className="h-4 w-4 mr-2" />
                        Contract Signed
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Current Pipeline Status */}
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="text-sm">Initial Leads: 24</span>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="text-sm">First Contact: 18</span>
                    <Badge className="bg-orange-500 text-white">In Progress</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="text-sm">Proposals Sent: 12</span>
                    <Badge className="bg-pop-red text-white">Pending</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="text-sm">Negotiation: 8</span>
                    <Badge className="bg-purple-600 text-white">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="text-sm">Contracts: 3</span>
                    <Badge className="bg-pop-green text-white">Closing</Badge>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <Button variant="outline" className="w-full">Add New Lead</Button>
                  <Button variant="outline" className="w-full">Update Pipeline Status</Button>
                </div>
              </div>
            )}
          </div>

          {/* Partner Onboarding Dropdown */}
          <div className="w-full border rounded-lg">
            <div className="px-4 py-4 cursor-pointer hover:bg-gray-50" onClick={() => setShowOnboarding(!showOnboarding)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserPlus className="h-5 w-5 text-pop-green" />
                  <span className="font-medium">Partner Onboarding</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showOnboarding ? 'rotate-180' : ''}`} />
              </div>
            </div>
            {showOnboarding && (
              <div className="px-4 pb-4 border-t bg-gray-50">
                <div className="space-y-2 mt-4">
                  {/* Active Onboarding Cases */}
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <span className="font-medium text-sm">Metro Facilities</span>
                      <p className="text-xs text-gray-600">Step 3/7: Bin delivery scheduled</p>
                    </div>
                    <Badge className="bg-pop-blue text-white">In Progress</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <span className="font-medium text-sm">Urban Dynamics</span>
                      <p className="text-xs text-gray-600">Step 1/7: Contract signed</p>
                    </div>
                    <Badge className="bg-orange-500 text-white">Started</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <span className="font-medium text-sm">EcoSystems Ltd</span>
                      <p className="text-xs text-gray-600">Step 6/7: Training completed</p>
                    </div>
                    <Badge className="bg-pop-green text-white">Almost Done</Badge>
                  </div>
                </div>
                
                {/* Onboarding Checklist Template */}
                <div className="mt-4 p-3 bg-white rounded-lg border">
                  <h4 className="font-medium text-sm mb-3">Standard Onboarding Steps</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-pop-green" />
                      <span>Contract signed & welcome packet sent</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-pop-green" />
                      <span>Site assessment & bin placement planning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-orange-500" />
                      <span>Bin delivery & installation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span>Staff training & QR code education</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span>First pickup scheduled</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span>30-day check-in & optimization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span>Partnership fully active</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <Button variant="outline" className="w-full">Start New Onboarding</Button>
                  <Button variant="outline" className="w-full">View All Active Cases</Button>
                </div>
              </div>
            )}
          </div>

          {/* Partner Documentation Dropdown */}
          <div className="w-full border rounded-lg">
            <div className="px-4 py-4 cursor-pointer hover:bg-gray-50" onClick={() => setShowCommunications(!showCommunications)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-pop-green" />
                  <span className="font-medium">Partner Documentation</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showCommunications ? 'rotate-180' : ''}`} />
              </div>
            </div>
            {showCommunications && (
              <div className="px-4 pb-4 border-t bg-gray-50">
                <div className="mt-4">
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
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Export Partner Data
                    </Button>
                  </div>
                </div>
                
                {/* Partner Documents */}
                <div className="mt-4 space-y-2">
                  <h4 className="font-medium text-sm">Partner Documents</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div>
                        <span className="font-medium text-sm">TechCorp - Signed Contract</span>
                        <p className="text-xs text-gray-600">Contract_TechCorp_2024.pdf • 2.4 MB</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-pop-green text-white">Active</Badge>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div>
                        <span className="font-medium text-sm">Metro Facilities - Initial Waste Assessment</span>
                        <p className="text-xs text-gray-600">Waste_Assessment_Metro_Jan2024.pdf • 1.8 MB</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-pop-blue text-white">Complete</Badge>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div>
                        <span className="font-medium text-sm">EcoSystems - Training Documentation</span>
                        <p className="text-xs text-gray-600">Training_Manual_EcoSystems.pdf • 3.2 MB</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-orange-500 text-white">In Review</Badge>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div>
                        <span className="font-medium text-sm">Urban Dynamics - Site Layout Plans</span>
                        <p className="text-xs text-gray-600">Site_Plans_Urban_Dynamics.dwg • 5.1 MB</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-pop-green text-white">Approved</Badge>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}