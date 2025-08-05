'use client'

import { Phone, Users, TrendingUp, AlertCircle, Calendar, MessageCircle } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'

export default function CRMPage() {
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
            <p className="text-xs text-gray-600">+5% this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Follow-ups Due</CardTitle>
            <AlertCircle className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-gray-600">Due today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
            <CardDescription>Track prospects through conversion funnel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Initial Contact: 24</span>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Proposal Sent: 12</span>
                <Badge variant="outline">Pending</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Negotiation: 8</span>
                <Badge className="bg-pop-blue text-white">In Progress</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Contracts: 3</span>
                <Badge className="bg-pop-green text-white">Closing</Badge>
              </div>
            </div>
            <Button className="w-full bg-pop-green hover:bg-pop-green/90">
              Add New Lead
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Partner Management</CardTitle>
            <CardDescription>Active partnerships and contract renewals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-pop-green/5 rounded-lg">
                <div>
                  <span className="font-medium text-sm">TechCorp Industries</span>
                  <p className="text-xs text-gray-600">Contract until 2026</p>
                </div>
                <Badge className="bg-pop-green text-white">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-pop-blue/5 rounded-lg">
                <div>
                  <span className="font-medium text-sm">GreenOffice Solutions</span>
                  <p className="text-xs text-gray-600">Renewal due Q2</p>
                </div>
                <Badge className="bg-pop-blue text-white">Renewal</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-pop-red/5 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Metro Facilities</span>
                  <p className="text-xs text-gray-600">Follow-up needed</p>
                </div>
                <Badge className="bg-pop-red text-white">Action</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View All Partners
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Communication Hub</CardTitle>
            <CardDescription>Google Workspace integration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
            <Button variant="outline" className="w-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              Send Email Campaign
            </Button>
            <Button variant="outline" className="w-full">
              Generate Impact Report
            </Button>
            <Button variant="outline" className="w-full">
              Export Partner Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}