'use client'

import { Phone, Users, TrendingUp, AlertCircle } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'

export default function CRMDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-pop-black">CRM Dashboard</h2>
        <p className="text-gray-600 mt-2">Sales pipeline, relationship management, and partner communications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
            <Phone className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-600">8 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Partners</CardTitle>
            <Users className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-gray-600">3 new partnerships</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <p className="text-xs text-gray-600">Lead to partner</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Google Workspace</CardTitle>
            <AlertCircle className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Synced</div>
            <p className="text-xs text-gray-600">Last sync: 14:32</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
            <CardDescription>Lead progression and deal management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                <span className="text-sm">Discovery: 8 leads</span>
                <Badge className="bg-blue-500 text-white">Active</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                <span className="text-sm">Proposal: 12 leads</span>
                <Badge className="bg-yellow-500 text-white">Review</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="text-sm">Closing: 4 leads</span>
                <Badge className="bg-green-500 text-white">Hot</Badge>
              </div>
            </div>
            <Button className="w-full bg-pop-blue hover:bg-pop-blue/90">
              Add New Lead
            </Button>
            <Button variant="outline" className="w-full">
              Pipeline Analytics
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Partner Management</CardTitle>
            <CardDescription>Relationship tracking and communication</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">TechCorp Industries</span>
                <Badge variant="outline">8 bins</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">University Research</span>
                <Badge variant="outline">12 bins</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">StartupHub Co-work</span>
                <Badge variant="outline">6 bins</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Partner Communications
            </Button>
            <Button variant="outline" className="w-full">
              Contract Management
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Management</CardTitle>
            <CardDescription>Workshops, community events, registration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="text-sm">Maker Workshop: Aug 15</span>
                <Badge className="bg-green-500 text-white">45/50</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                <span className="text-sm">Sustainability Fair: Aug 22</span>
                <Badge className="bg-blue-500 text-white">Planning</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                <span className="text-sm">Partner Showcase: Aug 30</span>
                <Badge className="bg-yellow-500 text-white">12/30</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Event Calendar
            </Button>
            <Button variant="outline" className="w-full">
              Registration Management
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Communication Tools</CardTitle>
            <CardDescription>Google Workspace integration and outreach</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full">
              Email Campaign Builder
            </Button>
            <Button variant="outline" className="w-full">
              Calendar Integration
            </Button>
            <Button variant="outline" className="w-full">
              Contact Synchronization
            </Button>
            <Button variant="outline" className="w-full">
              Partnership Templates
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>CRM analytics and relationship insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 bg-blue-50 rounded border border-blue-200">
                <div className="text-lg font-bold text-blue-600">24</div>
                <div className="text-xs text-gray-600">Active Leads</div>
              </div>
              <div className="p-2 bg-green-50 rounded border border-green-200">
                <div className="text-lg font-bold text-green-600">42</div>
                <div className="text-xs text-gray-600">Partners</div>
              </div>
              <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
                <div className="text-lg font-bold text-yellow-600">32%</div>
                <div className="text-xs text-gray-600">Conversion</div>
              </div>
              <div className="p-2 bg-purple-50 rounded border border-purple-200">
                <div className="text-lg font-bold text-purple-600">$156k</div>
                <div className="text-xs text-gray-600">Pipeline Value</div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              CRM Analytics Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}