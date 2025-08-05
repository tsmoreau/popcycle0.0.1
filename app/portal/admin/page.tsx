'use client'

import { Users, Settings, AlertCircle, Package, Truck } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-pop-black">Admin Dashboard</h2>
        <p className="text-gray-600 mt-2">User management, system settings, and permissions control</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-gray-600">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            <Settings className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-600">8 operations, 4 CRM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Partner Access</CardTitle>
            <Users className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">54</div>
            <p className="text-xs text-gray-600">Organization affiliates</p>
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
                <span className="text-sm">Operations Staff: 8</span>
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