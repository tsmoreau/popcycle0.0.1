'use client'

import { 
  Users, 
  Truck, 
  Phone, 
  Building2, 
  DollarSign,
  Settings,
  Home,
  LogOut,
  ArrowRight
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import Link from 'next/link'

export default function PortalPage() {
  const dashboardSections = [
    { 
      id: 'admin', 
      label: 'Admin Dashboard', 
      icon: Settings, 
      color: 'text-pop-black',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      description: 'User management, role assignment, system configuration',
      href: '/portal/admin'
    },
    { 
      id: 'operations', 
      label: 'Operations', 
      icon: Truck, 
      color: 'text-pop-green',
      bgColor: 'bg-pop-green/5',
      borderColor: 'border-pop-green/20',
      description: 'Collections, processing, inventory, and fulfillment',
      href: '/portal/operations'
    },
    { 
      id: 'crm', 
      label: 'CRM & Sales', 
      icon: Phone, 
      color: 'text-pop-blue',
      bgColor: 'bg-pop-blue/5',
      borderColor: 'border-pop-blue/20',
      description: 'Partner pipeline, event management, relationship tracking',
      href: '/portal/crm'
    },
    { 
      id: 'partner', 
      label: 'Partner Portal', 
      icon: Building2, 
      color: 'text-pop-red',
      bgColor: 'bg-pop-red/5',
      borderColor: 'border-pop-red/20',
      description: 'Client reporting dashboard and impact analytics',
      href: '/portal/partner'
    },
    { 
      id: 'financial', 
      label: 'Financial', 
      icon: DollarSign, 
      color: 'text-pop-gray',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      description: 'Revenue tracking, cost analysis, QuickBooks integration',
      href: '/portal/financial'
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-pop-black">Business Management Portal</h2>
            <p className="text-gray-600 mt-2">Unified operations dashboard for the complete PopCycle circular economy platform</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Partners</CardTitle>
                <Building2 className="h-4 w-4 text-pop-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48</div>
                <p className="text-xs text-gray-600">12 in pipeline</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Operations</CardTitle>
                <Truck className="h-4 w-4 text-pop-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-gray-600">Bins + 23 batches</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-pop-red" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$32.4k</div>
                <p className="text-xs text-gray-600">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-pop-gray" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">247</div>
                <p className="text-xs text-gray-600">89 active makers</p>
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dashboardSections.map((section) => {
              const Icon = section.icon
              return (
                <Card key={section.id} className={`${section.bgColor} border ${section.borderColor}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-6 w-6 ${section.color}`} />
                        <div>
                          <CardTitle className="text-lg">{section.label}</CardTitle>
                          <CardDescription>{section.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Link href={section.href}>
                      <Button variant="outline" className="w-full group">
                        <span>Open {section.label}</span>
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* System Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Core platform status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="text-sm">Database</span>
                  <Badge className="bg-green-500 text-white">Operational</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="text-sm">Production Stations</span>
                  <Badge className="bg-green-500 text-white">Online</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-sm">External APIs</span>
                  <Badge className="bg-blue-500 text-white">Connected</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm p-2 bg-gray-50 rounded">
                  <div className="font-medium">New Partner: TechCorp</div>
                  <div className="text-xs text-gray-600">2 hours ago</div>
                </div>
                <div className="text-sm p-2 bg-gray-50 rounded">
                  <div className="font-medium">Batch BA-2024-003 Complete</div>
                  <div className="text-xs text-gray-600">4 hours ago</div>
                </div>
                <div className="text-sm p-2 bg-gray-50 rounded">
                  <div className="font-medium">47 Items Processed</div>
                  <div className="text-xs text-gray-600">6 hours ago</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/portal/operations">
                  <Button variant="outline" className="w-full justify-start">
                    <Truck className="h-4 w-4 mr-2" />
                    Schedule Pickup
                  </Button>
                </Link>
                <Link href="/portal/crm">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Add New Partner
                  </Button>
                </Link>
                <Link href="/portal/admin">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    User Management
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}