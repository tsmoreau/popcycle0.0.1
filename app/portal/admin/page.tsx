'use client'

import { useState } from 'react'
import { Users, Settings, Shield, ChevronDown, Database, Cog, Eye, Zap, QrCode, Plug } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { DataTable, Column } from '../../components/ui/data-table'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion'

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

      {/* Admin Dashboard - All Sections in One Accordion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-pop-green" />
            Admin Dashboard
          </CardTitle>
          <CardDescription>System overview and administration tools</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {/* Admin Overview */}
            <AccordionItem value="admin-overview">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-pop-green" />
                  <div className="text-left">
                    <span className="font-medium">Admin Overview</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {/* Mobile-First Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 pb-4">
                  {/* Total Users */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="h-5 w-5 text-gray-600" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Users</span>
                    </div>
                    <div className="text-2xl font-bold text-pop-black mb-1">2,847</div>
                    <div className="text-sm text-gray-600 mb-2">Total Users</div>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">2,793 Active</span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">54 Inactive</span>
                    </div>
                  </div>

                  {/* Active Staff */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Settings className="h-5 w-5 text-gray-600" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Staff</span>
                    </div>
                    <div className="text-2xl font-bold text-pop-black mb-1">12</div>
                    <div className="text-sm text-gray-600 mb-2">Active Staff</div>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">8 Operations</span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">4 CRM</span>
                    </div>
                  </div>

                  {/* Partner Access */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="h-5 w-5 text-gray-600" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Partners</span>
                    </div>
                    <div className="text-2xl font-bold text-pop-black mb-1">54</div>
                    <div className="text-sm text-gray-600 mb-2">Partner Access</div>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">18 Orgs</span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">36 Affiliates</span>
                    </div>
                  </div>

                  {/* System Health */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Zap className="h-5 w-5 text-gray-600" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">System</span>
                    </div>
                    <div className="text-2xl font-bold text-pop-black mb-1">99.9%</div>
                    <div className="text-sm text-gray-600 mb-2">System Health</div>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">All Services</span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">0 Issues</span>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* User Management */}
            <AccordionItem value="user-management">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-pop-green" />
                  <div className="text-left">
                    <span className="font-medium">User Management</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-2">
                  <DataTable
                    title=""
                    description="Manage user roles, permissions, and partner affiliations"
                    data={usersData}
                    columns={userColumns}
                    renderModal={renderUserModal}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Production Stations */}
            <AccordionItem value="production-stations">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-pop-green" />
                  <div className="text-left">
                    <span className="font-medium">Production Stations</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  {stationsData.map((station) => (
                    <div key={station.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
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
                  <div className="mt-4 space-y-2">
                    <Button variant="outline" className="w-full">Add New Station</Button>
                    <Button variant="outline" className="w-full">Configure Access Permissions</Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* QR Code Settings */}
            <AccordionItem value="qr-settings">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <QrCode className="h-5 w-5 text-pop-green" />
                  <div className="text-left">
                    <span className="font-medium">QR Code Generation Settings</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <span className="text-sm">QR Code Size</span>
                    <select className="border rounded px-2 py-1 text-sm" defaultValue="Medium (256px)">
                      <option>Small (128px)</option>
                      <option>Medium (256px)</option>
                      <option>Large (512px)</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <span className="text-sm">Error Correction Level</span>
                    <select className="border rounded px-2 py-1 text-sm" defaultValue="Medium (15%)">
                      <option>Low (7%)</option>
                      <option>Medium (15%)</option>
                      <option>High (25%)</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <span className="text-sm">Logo Embedding</span>
                    <Button size="sm" variant="outline">Upload Logo</Button>
                  </div>
                  <Button variant="outline" className="w-full mt-4">Save QR Settings</Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* External Integrations */}
            <AccordionItem value="external-integrations">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Plug className="h-5 w-5 text-pop-green" />
                  <div className="text-left">
                    <span className="font-medium">External Integrations</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div>
                      <span className="font-medium text-sm">Google Workspace</span>
                      <p className="text-xs text-gray-600">Email automation & calendar sync</p>
                    </div>
                    <Badge className="bg-pop-green text-white">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div>
                      <span className="font-medium text-sm">QuickBooks</span>
                      <p className="text-xs text-gray-600">Financial management & invoicing</p>
                    </div>
                    <Badge className="bg-pop-green text-white">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div>
                      <span className="font-medium text-sm">Stripe</span>
                      <p className="text-xs text-gray-600">Payment processing</p>
                    </div>
                    <Badge className="bg-pop-green text-white">Connected</Badge>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Button variant="outline" className="w-full">Add New Integration</Button>
                    <Button variant="outline" className="w-full">Test All Connections</Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Backup & Recovery */}
            <AccordionItem value="backup-recovery">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-pop-green" />
                  <div className="text-left">
                    <span className="font-medium">Backup & Recovery</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div>
                      <span className="font-medium text-sm">Last Backup</span>
                      <p className="text-xs text-gray-600">Daily automated backup completed</p>
                    </div>
                    <span className="text-xs text-gray-500">2:30 AM PST</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div>
                      <span className="font-medium text-sm">Backup Schedule</span>
                      <p className="text-xs text-gray-600">Every day at 2:00 AM PST</p>
                    </div>
                    <Badge className="bg-pop-green text-white">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div>
                      <span className="font-medium text-sm">Storage Used</span>
                      <p className="text-xs text-gray-600">Database backups for last 30 days</p>
                    </div>
                    <span className="text-xs text-gray-500">4.2 GB</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Button variant="outline" className="w-full">Create Manual Backup</Button>
                    <Button variant="outline" className="w-full">Restore from Backup</Button>
                    <Button variant="outline" className="w-full">Configure Schedule</Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Audit Trail */}
            <AccordionItem value="audit-trail">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-pop-green" />
                  <div className="text-left">
                    <span className="font-medium">Audit Trail</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium">User Login</span>
                      <span className="text-xs text-gray-500">2 min ago</span>
                    </div>
                    <p className="text-xs text-gray-600">Sarah Chen logged into admin portal</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium">System Configuration</span>
                      <span className="text-xs text-gray-500">1 hour ago</span>
                    </div>
                    <p className="text-xs text-gray-600">QR code settings updated by Mike Rodriguez</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium">Data Export</span>
                      <span className="text-xs text-gray-500">3 hours ago</span>
                    </div>
                    <p className="text-xs text-gray-600">User data exported for partner report</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Button variant="outline" className="w-full">Export Full Audit Log</Button>
                    <Button variant="outline" className="w-full">Configure Audit Settings</Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}