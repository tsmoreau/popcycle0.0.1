'use client'

import { useState } from 'react'
import { 
  Users, 
  Truck, 
  Phone, 
  Building2, 
  DollarSign,
  Settings,
  Home,
  LogOut,
  Package,
  Calendar,
  TrendingUp,
  TrendingDown,
  CreditCard,
  BarChart3,
  FileText,
  AlertCircle
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

type DashboardSection = 'admin' | 'operations' | 'crm' | 'partner' | 'financial'

export default function PortalPage() {
  const [activeSection, setActiveSection] = useState<DashboardSection>('admin')

  const sidebarItems = [
    { id: 'admin' as const, label: 'Admin', icon: Settings, color: 'text-pop-black' },
    { id: 'operations' as const, label: 'Operations', icon: Truck, color: 'text-pop-green' },
    { id: 'crm' as const, label: 'CRM', icon: Phone, color: 'text-pop-blue' },
    { id: 'partner' as const, label: 'Partners', icon: Building2, color: 'text-pop-red' },
    { id: 'financial' as const, label: 'Financial', icon: DollarSign, color: 'text-pop-gray' },
  ]

  const renderDashboard = () => {
    switch (activeSection) {
      case 'admin':
        return <AdminDashboard />
      case 'operations':
        return <OperationsDashboard />
      case 'crm':
        return <CRMDashboard />
      case 'partner':
        return <PartnerDashboard />
      case 'financial':
        return <FinancialDashboard />
    }
  }

  return (
    <div className="h-screen bg-gray-50">
      {/* Header - Fixed */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 h-20 z-50">
        <div className="px-6 py-4 flex items-center justify-between h-full">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-pop-black">PopCycle Portal</h1>
            <Badge variant="outline" className="bg-pop-green/10 text-pop-green border-pop-green">
              Admin Access
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => window.location.href = '/'}>
              <Home className="h-4 w-4 mr-2" />
              Public Site
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar - Fixed */}
      <nav className="fixed top-20 left-0 w-64 h-[calc(100vh-5rem)] bg-white border-r border-gray-200 overflow-y-auto z-40">
        <div className="p-6">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-pop-green/10 text-pop-green border border-pop-green/20'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-3 ${activeSection === item.id ? 'text-pop-green' : item.color}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="ml-64 mt-20 min-h-[calc(100vh-5rem)] overflow-y-auto">
        <div className="p-6 pb-12">
          {renderDashboard()}
        </div>
      </main>
    </div>
  )
}

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-pop-black">Admin Dashboard</h2>
        <p className="text-gray-600 mt-2">User management, role assignment, and system configuration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-gray-600">185 makers, 8 staff, 54 partners</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Partner Orgs</CardTitle>
            <Building2 className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-gray-600">54 affiliated users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Role Changes</CardTitle>
            <Settings className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <AlertCircle className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-gray-600">Uptime this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Role Management</CardTitle>
            <CardDescription>Assign staff roles and partner affiliations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Operations Staff: 4</span>
                <Button size="sm" variant="outline">Manage</Button>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">CRM Staff: 4</span>
                <Button size="sm" variant="outline">Manage</Button>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Partner Affiliations: 54</span>
                <Button size="sm" variant="outline">Manage</Button>
              </div>
            </div>
            <Button className="w-full bg-pop-green hover:bg-pop-green/90">
              Assign Roles
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Production Stations</CardTitle>
            <CardDescription>Configure manufacturing station access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-pop-green/5 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Station 1: Weighing/Photo</span>
                  <p className="text-xs text-gray-600">HID Scale + Camera Ready</p>
                </div>
                <Badge className="bg-pop-green text-white">Online</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-pop-blue/5 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Station 2: Laser</span>
                  <p className="text-xs text-gray-600">Lightburn Integration</p>
                </div>
                <Badge className="bg-pop-blue text-white">Active</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Configure Stations
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Administration</CardTitle>
            <CardDescription>Core system configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full">
              QR Code Generation Settings
            </Button>
            <Button variant="outline" className="w-full">
              External Integrations
            </Button>
            <Button variant="outline" className="w-full">
              Data Backup & Recovery
            </Button>
            <Button variant="outline" className="w-full">
              View System Audit Trail
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function OperationsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-pop-black">Operations Dashboard</h2>
        <p className="text-gray-600 mt-2">Bins, batches, production workflow, and logistics coordination</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bins</CardTitle>
            <Package className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-gray-600">12 ready for pickup</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Batches Today</CardTitle>
            <Truck className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-gray-600">8 processing, 15 complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items in Queue</CardTitle>
            <Settings className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-gray-600">Station 1: 12, Station 2: 35</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">HID Scale Status</CardTitle>
            <AlertCircle className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Online</div>
            <p className="text-xs text-gray-600">Last reading: 2.3kg</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Camera Feed</CardTitle>
            <AlertCircle className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-gray-600">USB Camera detected</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Production Station 1</CardTitle>
            <CardDescription>Weighing, photo capture, item creation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-pop-green/5 border border-pop-green/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Station Status</span>
                <Badge className="bg-pop-green text-white">Ready</Badge>
              </div>
              <div className="space-y-1 text-xs text-gray-600">
                <div>HID Scale: Connected (2.3kg)</div>
                <div>Camera: USB Feed Active</div>
                <div>Last Item: IT-ABC123 (14:32)</div>
              </div>
            </div>
            <Button className="w-full bg-pop-green hover:bg-pop-green/90">
              Open Station Interface
            </Button>
            <Button variant="outline" className="w-full">
              View Processing Queue
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Production Station 2</CardTitle>
            <CardDescription>QR laser processing, completion tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-pop-blue/5 border border-pop-blue/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Laser Queue</span>
                <Badge className="bg-pop-blue text-white">Processing</Badge>
              </div>
              <div className="space-y-1 text-xs text-gray-600">
                <div>Current: IT-XYZ789</div>
                <div>Queue: 35 items</div>
                <div>Est. Completion: 16:45</div>
              </div>
            </div>
            <Button className="w-full bg-pop-blue hover:bg-pop-blue/90">
              Lightburn Integration
            </Button>
            <Button variant="outline" className="w-full">
              Mark Batch Complete
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mobile Staff & Routes</CardTitle>
            <CardDescription>Pickup scheduling and field operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Route A: Downtown</span>
                <Badge variant="outline">In Progress</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Route B: Industrial</span>
                <Badge variant="outline">Scheduled 15:00</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Route C: University</span>
                <Badge variant="outline">Complete</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule New Pickup
            </Button>
            <Button variant="outline" className="w-full">
              Mobile Staff Check-in
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bin Management</CardTitle>
            <CardDescription>Capacity monitoring and pickup coordination</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-red-50 rounded border border-red-200">
                <span className="text-sm">BI-CORP001: TechCorp Lobby</span>
                <Badge className="bg-red-500 text-white">95% Full</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded border border-yellow-200">
                <span className="text-sm">BI-UNI045: Library Floor 3</span>
                <Badge className="bg-yellow-500 text-white">75% Full</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded border border-green-200">
                <span className="text-sm">BI-OFF892: StartupHub</span>
                <Badge className="bg-green-500 text-white">45% Full</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View All Bins (156)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Real-Time Operations</CardTitle>
            <CardDescription>Live status and coordination</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full">
              Batch Processing Status
            </Button>
            <Button variant="outline" className="w-full">
              QR Code Generation Queue
            </Button>
            <Button variant="outline" className="w-full">
              Hardware Diagnostics
            </Button>
            <Button variant="outline" className="w-full">
              Operations Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CRMDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-pop-black">CRM Dashboard</h2>
        <p className="text-gray-600 mt-2">Sales pipeline, partner relationships, and community event management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Leads</CardTitle>
            <Phone className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-gray-600">8 discovery, 12 proposal, 4 closing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Partners</CardTitle>
            <Building2 className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-gray-600">156 bins deployed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Events</CardTitle>
            <Calendar className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-600">4 workshops, 8 community</p>
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
              <Calendar className="h-4 w-4 mr-2" />
              Create Event
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
            <CardTitle>Communication Workflows</CardTitle>
            <CardDescription>Google Workspace integration and automation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full">
              Email Campaign Manager
            </Button>
            <Button variant="outline" className="w-full">
              Calendar Integration
            </Button>
            <Button variant="outline" className="w-full">
              Automated Follow-ups
            </Button>
            <Button variant="outline" className="w-full">
              Communication Log
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Development</CardTitle>
            <CardDescription>Growth analytics and relationship insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full">
              Lead Source Analytics
            </Button>
            <Button variant="outline" className="w-full">
              Partner Growth Metrics
            </Button>
            <Button variant="outline" className="w-full">
              Event ROI Analysis
            </Button>
            <Button variant="outline" className="w-full">
              Monthly CRM Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PartnerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-pop-black">Partner Dashboard</h2>
        <p className="text-gray-600 mt-2">Read-only reporting portal for your circular economy impact</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bins</CardTitle>
            <Package className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-600">Across 3 locations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waste Collected</CardTitle>
            <TrendingUp className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-gray-600">kg this quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Created</CardTitle>
            <Settings className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-gray-600">From your materials</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CO2 Prevented</CardTitle>
            <AlertCircle className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2t</div>
            <p className="text-xs text-gray-600">Equivalent saved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94/100</div>
            <p className="text-xs text-gray-600">Sustainability rating</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bin Status Monitor</CardTitle>
            <CardDescription>Real-time capacity across your locations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <span className="font-medium text-sm">BI-CORP001: Main Lobby</span>
                  <p className="text-xs text-gray-600">Last pickup: 2 days ago</p>
                </div>
                <Badge className="bg-green-500 text-white">45% Full</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div>
                  <span className="font-medium text-sm">BI-CORP002: Cafeteria L2</span>
                  <p className="text-xs text-gray-600">Last pickup: 1 day ago</p>
                </div>
                <Badge className="bg-yellow-500 text-white">78% Full</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <span className="font-medium text-sm">BI-CORP003: Research Lab</span>
                  <p className="text-xs text-gray-600">Last pickup: 4 days ago</p>
                </div>
                <Badge className="bg-red-500 text-white">92% Full</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full" disabled>
              View Historical Data
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Provenance Tracking</CardTitle>
            <CardDescription>Follow your waste transformation journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">Recent Transformations</span>
                <div className="mt-1 space-y-1 text-xs text-gray-600">
                  <div>BA-CORP001 → 12 desk organizers</div>
                  <div>BA-CORP002 → 8 phone stands</div>
                  <div>BA-CORP003 → 15 pen holders</div>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full" disabled>
              Track Specific Item
            </Button>
            <Button variant="outline" className="w-full" disabled>
              QR Code Scanner
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sustainability Analytics</CardTitle>
            <CardDescription>Circular economy impact metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 bg-pop-green/5 rounded">
                <div className="text-lg font-bold text-pop-green">94%</div>
                <div className="text-xs text-gray-600">Diversion Rate</div>
              </div>
              <div className="p-2 bg-pop-blue/5 rounded">
                <div className="text-lg font-bold text-pop-blue">1.2t</div>
                <div className="text-xs text-gray-600">CO2 Saved</div>
              </div>
              <div className="p-2 bg-pop-red/5 rounded">
                <div className="text-lg font-bold text-pop-red">247</div>
                <div className="text-xs text-gray-600">Items Made</div>
              </div>
              <div className="p-2 bg-gray-100 rounded">
                <div className="text-lg font-bold text-gray-700">+15%</div>
                <div className="text-xs text-gray-600">vs Last Qtr</div>
              </div>
            </div>
            <Button variant="outline" className="w-full" disabled>
              Download Impact Report
            </Button>
            <Button variant="outline" className="w-full" disabled>
              Quarterly Storytelling
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Collection Analytics</CardTitle>
            <CardDescription>Waste stream patterns and trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium mb-2">Monthly Collection Trends</div>
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>June 2024:</span>
                  <span>847 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>July 2024:</span>
                  <span>923 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>August 2024:</span>
                  <span>1,077 kg</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full" disabled>
              Historical Trends
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Partner Support</CardTitle>
            <CardDescription>Resources and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full" disabled>
              Contact Account Manager
            </Button>
            <Button variant="outline" className="w-full" disabled>
              Request Additional Bins
            </Button>
            <Button variant="outline" className="w-full" disabled>
              Educational Resources
            </Button>
            <Button variant="outline" className="w-full" disabled>
              Community Events
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function FinancialDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-pop-black">Financial Dashboard</h2>
        <p className="text-gray-600 mt-2">Revenue tracking, cost analysis, QuickBooks and Stripe integration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$47,284</div>
            <p className="text-xs text-gray-600">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operations Cost</CardTitle>
            <TrendingDown className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$18,952</div>
            <p className="text-xs text-gray-600">Production + logistics</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Partner Payouts</CardTitle>
            <CreditCard className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,340</div>
            <p className="text-xs text-gray-600">23 partners this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maker Payments</CardTitle>
            <Users className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,640</div>
            <p className="text-xs text-gray-600">Assembly & community</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42%</div>
            <p className="text-xs text-gray-600">Above target (35%)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>QuickBooks Integration</CardTitle>
            <CardDescription>Real-time accounting and financial reporting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Sync Status</span>
                <Badge className="bg-green-500 text-white">Connected</Badge>
              </div>
              <div className="space-y-1 text-xs text-gray-600">
                <div>Last sync: 14:47 today</div>
                <div>Auto-sync: Every 4 hours</div>
                <div>Next sync: 18:00</div>
              </div>
            </div>
            <Button className="w-full bg-pop-blue hover:bg-pop-blue/90">
              Generate Invoices
            </Button>
            <Button variant="outline" className="w-full">
              Export to QuickBooks
            </Button>
            <Button variant="outline" className="w-full">
              Financial Reports
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stripe Payment Processing</CardTitle>
            <CardDescription>Transaction monitoring and subscription management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Payment Status</span>
                <Badge className="bg-blue-500 text-white">Active</Badge>
              </div>
              <div className="space-y-1 text-xs text-gray-600">
                <div>Transactions today: 23</div>
                <div>Failed payments: 0</div>
                <div>Subscription revenue: $28k</div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <CreditCard className="h-4 w-4 mr-2" />
              Payment Analytics
            </Button>
            <Button variant="outline" className="w-full">
              Subscription Dashboard
            </Button>
            <Button variant="outline" className="w-full">
              Transaction History
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Analysis by Area</CardTitle>
            <CardDescription>Operational cost breakdown and efficiency</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Logistics & Pickup</span>
                <span className="text-sm font-medium">$4,580</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Production Stations</span>
                <span className="text-sm font-medium">$8,920</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Material Processing</span>
                <span className="text-sm font-medium">$5,452</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Detailed Cost Analysis
            </Button>
            <Button variant="outline" className="w-full">
              Efficiency Metrics
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Streams</CardTitle>
            <CardDescription>Income sources and growth tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-pop-green/5 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Product Sales</span>
                  <p className="text-xs text-gray-600">E-commerce platform</p>
                </div>
                <span className="font-bold text-pop-green">$28,450</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-pop-blue/5 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Partner Contracts</span>
                  <p className="text-xs text-gray-600">Collection services</p>
                </div>
                <span className="font-bold text-pop-blue">$12,340</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-pop-red/5 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Workshop Events</span>
                  <p className="text-xs text-gray-600">Community programs</p>
                </div>
                <span className="font-bold text-pop-red">$6,494</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Revenue Trend Analysis
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Health Metrics</CardTitle>
            <CardDescription>Key performance indicators and targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 bg-green-50 rounded border border-green-200">
                <div className="text-lg font-bold text-green-600">42%</div>
                <div className="text-xs text-gray-600">Profit Margin</div>
              </div>
              <div className="p-2 bg-blue-50 rounded border border-blue-200">
                <div className="text-lg font-bold text-blue-600">$23k</div>
                <div className="text-xs text-gray-600">Cash Flow</div>
              </div>
              <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
                <div className="text-lg font-bold text-yellow-600">1.8x</div>
                <div className="text-xs text-gray-600">Revenue Growth</div>
              </div>
              <div className="p-2 bg-purple-50 rounded border border-purple-200">
                <div className="text-lg font-bold text-purple-600">$156k</div>
                <div className="text-xs text-gray-600">Annual Run Rate</div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Monthly Financial Summary
            </Button>
            <Button variant="outline" className="w-full">
              Budget vs Actual Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}