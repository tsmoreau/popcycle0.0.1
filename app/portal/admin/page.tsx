'use client'

import { useState } from 'react'
import { Users, Settings, Shield, ChevronDown, Database, Cog, Eye, Zap } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { DataTable, Column } from '../../components/ui/data-table'

interface User {
  id: string
  name: string
  email: string
  role: string
  orgId?: string
  lastActive: string
  status: 'Active' | 'Inactive'
}

interface Station {
  id: string
  name: string
  type: string
  status: 'Online' | 'Offline' | 'Active'
  description: string
}

export default function AdminPage() {
  const [showOverview, setShowOverview] = useState(false)

  // Sample user data
  const usersData: User[] = [
    { id: 'U-001', name: 'Sarah Chen', email: 'sarah@popcycle.io', role: 'Admin', lastActive: '2 min ago', status: 'Active' },
    { id: 'U-002', name: 'Mike Rodriguez', email: 'mike@popcycle.io', role: 'Operations Staff', lastActive: '1 hour ago', status: 'Active' },
    { id: 'U-003', name: 'Alex Kim', email: 'alex@acmecorp.com', role: 'Maker', orgId: 'O-001', lastActive: '3 hours ago', status: 'Active' },
    { id: 'U-004', name: 'Jamie Foster', email: 'jamie@popcycle.io', role: 'CRM Staff', lastActive: '5 hours ago', status: 'Active' },
    { id: 'U-005', name: 'Taylor Swift', email: 'taylor@greentech.com', role: 'Maker', orgId: 'O-002', lastActive: '2 days ago', status: 'Inactive' }
  ]

  // Sample station data
  const stationsData: Station[] = [
    { id: 'ST-001', name: 'Station 1', type: 'Weighing/Photo', status: 'Online', description: 'HID Scale + Camera Ready' },
    { id: 'ST-002', name: 'Station 2', type: 'Laser Processing', status: 'Active', description: 'Lightburn Integration' }
  ]

  const userColumns: Column<User>[] = [
    { key: 'id', header: 'User ID' },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    {
      key: 'role',
      header: 'Role',
      render: (user) => (
        <Badge className={
          user.role === 'Admin' ? 'bg-pop-red text-white' :
          user.role.includes('Staff') ? 'bg-pop-blue text-white' :
          'bg-gray-100 text-gray-800'
        }>
          {user.role}
        </Badge>
      )
    },
    {
      key: 'orgId',
      header: 'Partner Org',
      render: (user) => user.orgId ? <Badge variant="outline">{user.orgId}</Badge> : '-'
    },
    { key: 'lastActive', header: 'Last Active' },
    {
      key: 'status',
      header: 'Status',
      render: (user) => (
        <Badge className={user.status === 'Active' ? 'bg-pop-green text-white' : 'bg-gray-100 text-gray-800'}>
          {user.status}
        </Badge>
      )
    }
  ]

  const renderUserModal = (user: User) => (
    <div>
      <h3 className="text-lg font-semibold mb-4">{user.name}</h3>
      <div className="space-y-3">
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Role:</strong> {user.role}</div>
        <div><strong>Partner Org:</strong> {user.orgId || 'None'}</div>
        <div><strong>Status:</strong> {user.status}</div>
        <div><strong>Last Active:</strong> {user.lastActive}</div>
        <div className="pt-4 space-y-2">
          <Button className="w-full bg-pop-green hover:bg-pop-green/90">Edit User</Button>
          <Button variant="outline" className="w-full">Reset Password</Button>
          <Button variant="outline" className="w-full text-pop-red">Deactivate User</Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-pop-black">Admin Dashboard</h2>
      </div>

      {/* Admin Overview Dropdown */}
      <div className="w-full border rounded-lg px-4 cursor-pointer hover:bg-gray-50" onClick={() => setShowOverview(!showOverview)}>
        <div className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-pop-green" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-pop-black">Admin Overview</h3>
              </div>
            </div>
            <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showOverview ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </div>

      {showOverview && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-pop-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
              <Settings className="h-4 w-4 text-pop-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Partner Access</CardTitle>
              <Users className="h-4 w-4 text-pop-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">54</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Zap className="h-4 w-4 text-pop-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.9%</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Users Table */}
      <DataTable
        title="User Management"
        description="Manage user roles, permissions, and partner affiliations"
        icon={<Users className="h-5 w-5 text-pop-green" />}
        data={usersData}
        columns={userColumns}
        renderModal={renderUserModal}
      />

      {/* System Administration Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cog className="h-5 w-5 text-pop-green" />
            System Administration
          </CardTitle>
          <CardDescription>Production stations and core system configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Production Stations */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Database className="h-4 w-4 text-pop-green" />
              Production Stations
            </h4>
            <div className="space-y-2">
              {stationsData.map((station) => (
                <div key={station.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-sm">{station.name}: {station.type}</span>
                    <p className="text-xs text-gray-600">{station.description}</p>
                  </div>
                  <Badge className={
                    station.status === 'Online' ? 'bg-pop-green text-white' :
                    station.status === 'Active' ? 'bg-pop-blue text-white' :
                    'bg-gray-100 text-gray-800'
                  }>
                    {station.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-3">
              Configure Production Stations
            </Button>
          </div>

          {/* System Settings */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Settings className="h-4 w-4 text-pop-green" />
              System Configuration
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button variant="outline" className="justify-start">
                <Database className="h-4 w-4 mr-2" />
                QR Code Generation Settings
              </Button>
              <Button variant="outline" className="justify-start">
                <Cog className="h-4 w-4 mr-2" />
                External Integrations
              </Button>
              <Button variant="outline" className="justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Data Backup & Recovery
              </Button>
              <Button variant="outline" className="justify-start">
                <Eye className="h-4 w-4 mr-2" />
                View System Audit Trail
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}