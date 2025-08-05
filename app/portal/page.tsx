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
    <div className="min-h-screen bg-gray-50" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, backgroundColor: '#f9fafb'}}>
      {/* Header */}
        <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-pop-black">PopCycle Portal</h1>
            <Badge variant="outline" className="bg-pop-green/10 text-pop-green border-pop-green">
              Admin Access
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
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

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white border-r border-gray-200 min-h-screen">
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
        <main className="flex-1 p-6">
          {renderDashboard()}
        </main>
      </div>
    </div>
  )
}

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-pop-black">Admin Dashboard</h2>
        <p className="text-gray-600 mt-2">User management, system settings, and permissions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-gray-600">+12 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            <Settings className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-600">4 operations, 4 CRM</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage user roles and permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-pop-green hover:bg-pop-green/90">
              Add New User
            </Button>
            <Button variant="outline" className="w-full">
              Manage Roles
            </Button>
            <Button variant="outline" className="w-full">
              View Audit Log
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>Configure system-wide settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              QR Code Settings
            </Button>
            <Button variant="outline" className="w-full">
              Integration Settings
            </Button>
            <Button variant="outline" className="w-full">
              Backup Configuration
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
        <p className="text-gray-600 mt-2">Bins, batches, pickups, and logistics workflow</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bins</CardTitle>
            <Package className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-gray-600">12 need pickup</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Batches Today</CardTitle>
            <Truck className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-gray-600">+5 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Produced</CardTitle>
            <Settings className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-gray-600">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Station Status</CardTitle>
            <AlertCircle className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2/2</div>
            <p className="text-xs text-gray-600">Stations online</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Production Workflow</CardTitle>
            <CardDescription>Monitor manufacturing stations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-pop-green/5 rounded-lg">
              <span className="font-medium">Weighing/Photo Station</span>
              <Badge className="bg-pop-green text-white">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-pop-blue/5 rounded-lg">
              <span className="font-medium">Laser Station</span>
              <Badge className="bg-pop-blue text-white">Processing</Badge>
            </div>
            <Button className="w-full bg-pop-green hover:bg-pop-green/90">
              View Station Details
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pickup Schedule</CardTitle>
            <CardDescription>Today's collection routes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Pickup
            </Button>
            <Button variant="outline" className="w-full">
              View Routes
            </Button>
            <Button variant="outline" className="w-full">
              Generate Reports
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
        <p className="text-gray-600 mt-2">Sales pipeline, relationship management, and events</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
            <Phone className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-gray-600">8 hot leads</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Partner Orgs</CardTitle>
            <Building2 className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-gray-600">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events This Month</CardTitle>
            <Calendar className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-600">4 upcoming</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <p className="text-xs text-gray-600">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
            <CardDescription>Track leads through the sales process</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-pop-blue hover:bg-pop-blue/90">
              Add New Lead
            </Button>
            <Button variant="outline" className="w-full">
              View Pipeline
            </Button>
            <Button variant="outline" className="w-full">
              Generate Reports
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Management</CardTitle>
            <CardDescription>Workshops and community events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Create Event
            </Button>
            <Button variant="outline" className="w-full">
              Manage Registrations
            </Button>
            <Button variant="outline" className="w-full">
              Event Analytics
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
        <p className="text-gray-600 mt-2">Client self-service portal with bins and impact reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Bins</CardTitle>
            <Package className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-600">2 ready for pickup</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Created</CardTitle>
            <Settings className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847</div>
            <p className="text-xs text-gray-600">From our waste</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plastic Diverted</CardTitle>
            <TrendingUp className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3T</div>
            <p className="text-xs text-gray-600">Total to date</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bin Status</CardTitle>
            <CardDescription>Current status of your collection bins</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {['Lobby Bin', 'Cafeteria Bin', 'Floor 3 Bin'].map((bin) => (
                <div key={bin} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{bin}</span>
                  <Badge variant="outline">75% Full</Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              View All Bins
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Impact Reports</CardTitle>
            <CardDescription>Your sustainability metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Monthly Report
            </Button>
            <Button variant="outline" className="w-full">
              <BarChart3 className="h-4 w-4 mr-2" />
              Impact Dashboard
            </Button>
            <Button variant="outline" className="w-full">
              Download Certificate
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
        <p className="text-gray-600 mt-2">Revenue tracking, cost analysis, and QuickBooks integration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,789</div>
            <p className="text-xs text-gray-600">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Production Costs</CardTitle>
            <BarChart3 className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,450</div>
            <p className="text-xs text-gray-600">Materials & labor</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$16,339</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <FileText className="h-4 w-4 text-pop-gray" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,210</div>
            <p className="text-xs text-gray-600">5 invoices</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Analytics</CardTitle>
            <CardDescription>Track income streams and trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              <BarChart3 className="h-4 w-4 mr-2" />
              Revenue Dashboard
            </Button>
            <Button variant="outline" className="w-full">
              Monthly P&L
            </Button>
            <Button variant="outline" className="w-full">
              Forecast Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>QuickBooks Integration</CardTitle>
            <CardDescription>Sync with accounting system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-pop-green/5 rounded-lg">
              <span className="font-medium">Sync Status</span>
              <Badge className="bg-pop-green text-white">Connected</Badge>
            </div>
            <Button variant="outline" className="w-full">
              Sync Now
            </Button>
            <Button variant="outline" className="w-full">
              View QB Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}