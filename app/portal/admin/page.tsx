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
  const [showOverview, setShowOverview] = useState(false)
  const [showProductionStations, setShowProductionStations] = useState(false)
  const [showQRSettings, setShowQRSettings] = useState(false)
  const [showIntegrations, setShowIntegrations] = useState(false)
  const [showBackupRecovery, setShowBackupRecovery] = useState(false)
  const [showAuditTrail, setShowAuditTrail] = useState(false)
  const [showDatabaseOperations, setDatabaseOperations] = useState(false)

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

      {/* Admin Overview - Mobile-Ready Collapsible */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="admin-overview" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-pop-green" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-pop-black">Admin Overview</h3>
                 <p className="text-sm text-gray-600">User stats, data, and integration overviews</p>
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
      </Accordion>

      {/* User Management - Accordion */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="user-management" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-pop-green" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-pop-black">User Management</h3>
                <p className="text-sm text-gray-600">Manage user roles, permissions, and partner affiliations</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-2 pb-4">
              <DataTable
                data={usersData}
                columns={userColumns}
                renderModal={renderUserModal}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* System Administration Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 ">
            <Cog className="h-5 w-5 text-pop-green" />
            System Administration
          </CardTitle>
          <CardDescription className="text-sm text-gray-60">Core system configuration and settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Production Stations Dropdown */}
          <div className="w-full border rounded-lg">
            <div className="px-4 py-4 cursor-pointer hover:bg-gray-50" onClick={() => setShowProductionStations(!showProductionStations)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-pop-green" />
                  <span className="font-medium">Production Stations</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showProductionStations ? 'rotate-180' : ''}`} />
              </div>
            </div>
            {showProductionStations && (
              <div className="px-4 pb-4 border-t bg-gray-50">
                <div className="space-y-2 mt-4">
                  {stationsData.map((station) => (
                    <div key={station.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
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
                <div className="mt-4 space-y-2">
                  <Button variant="outline" className="w-full">Add New Station</Button>
                  <Button variant="outline" className="w-full">Configure Access Permissions</Button>
                </div>
              </div>
            )}
          </div>

          {/* QR Code Generation Settings Dropdown */}
          <div className="w-full border rounded-lg">
            <div className="px-4 py-4 cursor-pointer hover:bg-gray-50" onClick={() => setShowQRSettings(!showQRSettings)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <QrCode className="h-5 w-5 text-pop-green" />
                  <span className="font-medium">QR Code Generation Settings</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showQRSettings ? 'rotate-180' : ''}`} />
              </div>
            </div>
            {showQRSettings && (
              <div className="px-4 pb-4 border-t bg-gray-50">
                <div className="space-y-3 mt-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="text-sm">QR Code Size</span>
                    <select className="border rounded px-2 py-1 text-sm">
                      <option>Small (128px)</option>
                      <option selected>Medium (256px)</option>
                      <option>Large (512px)</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="text-sm">Error Correction Level</span>
                    <select className="border rounded px-2 py-1 text-sm">
                      <option>Low (7%)</option>
                      <option selected>Medium (15%)</option>
                      <option>High (25%)</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="text-sm">Logo Embedding</span>
                    <Button size="sm" variant="outline">Upload Logo</Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">Save QR Settings</Button>
              </div>
            )}
          </div>

          {/* External Integrations Dropdown */}
          <div className="w-full border rounded-lg">
            <div className="px-4 py-4 cursor-pointer hover:bg-gray-50" onClick={() => setShowIntegrations(!showIntegrations)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Plug className="h-5 w-5 text-pop-green" />
                  <span className="font-medium">External Integrations</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showIntegrations ? 'rotate-180' : ''}`} />
              </div>
            </div>
            {showIntegrations && (
              <div className="px-4 pb-4 border-t bg-gray-50">
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <span className="font-medium text-sm">Google Workspace</span>
                      <p className="text-xs text-gray-600">Email automation & calendar sync</p>
                    </div>
                    <Badge className="bg-pop-green text-white">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <span className="font-medium text-sm">QuickBooks</span>
                      <p className="text-xs text-gray-600">Financial data synchronization</p>
                    </div>
                    <Badge className="bg-pop-green text-white">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <span className="font-medium text-sm">Stripe</span>
                      <p className="text-xs text-gray-600">Payment processing</p>
                    </div>
                    <Badge className="bg-pop-green text-white">Connected</Badge>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Button variant="outline" className="w-full">Configure API Keys</Button>
                  <Button variant="outline" className="w-full">Test Connections</Button>
                </div>
              </div>
            )}
          </div>

          {/* Data Backup & Recovery Dropdown */}
          <div className="w-full border rounded-lg">
            <div className="px-4 py-4 cursor-pointer hover:bg-gray-50" onClick={() => setShowBackupRecovery(!showBackupRecovery)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-pop-green" />
                  <span className="font-medium">Data Backup & Recovery</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showBackupRecovery ? 'rotate-180' : ''}`} />
              </div>
            </div>
            {showBackupRecovery && (
              <div className="px-4 pb-4 border-t bg-gray-50">
                <div className="space-y-3 mt-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="text-sm">Automatic Backups</span>
                    <Badge className="bg-pop-green text-white">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="text-sm">Last Backup</span>
                    <span className="text-sm text-gray-600">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="text-sm">Backup Frequency</span>
                    <select className="border rounded px-2 py-1 text-sm">
                      <option>Every hour</option>
                      <option selected>Every 6 hours</option>
                      <option>Daily</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Button variant="outline" className="w-full">Create Manual Backup</Button>
                  <Button variant="outline" className="w-full">Restore from Backup</Button>
                </div>
              </div>
            )}
          </div>

          {/* System Audit Trail Dropdown */}
          <div className="w-full border rounded-lg">
            <div className="px-4 py-4 cursor-pointer hover:bg-gray-50" onClick={() => setShowAuditTrail(!showAuditTrail)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-pop-green" />
                  <span className="font-medium">System Audit Trail</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showAuditTrail ? 'rotate-180' : ''}`} />
              </div>
            </div>
            {showAuditTrail && (
              <div className="px-4 pb-4 border-t bg-gray-50">
                <div className="space-y-2 mt-4">
                  <div className="p-3 bg-white rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium">User Login</span>
                      <span className="text-xs text-gray-500">2 min ago</span>
                    </div>
                    <p className="text-xs text-gray-600">Sarah Chen logged into admin portal</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium">System Configuration</span>
                      <span className="text-xs text-gray-500">1 hour ago</span>
                    </div>
                    <p className="text-xs text-gray-600">QR code settings updated by Mike Rodriguez</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium">Data Export</span>
                      <span className="text-xs text-gray-500">3 hours ago</span>
                    </div>
                    <p className="text-xs text-gray-600">User data exported for partner report</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Button variant="outline" className="w-full">Export Full Audit Log</Button>
                  <Button variant="outline" className="w-full">Configure Audit Settings</Button>
                </div>
              </div>
            )}
          </div>

          {/* Database Operations Dropdown */}
          <div className="w-full border rounded-lg">
            <div className="px-4 py-4 cursor-pointer hover:bg-gray-50" onClick={() => setDatabaseOperations(!showDatabaseOperations)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-pop-green" />
                  <span className="font-medium">Manual Data Operations</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showDatabaseOperations ? 'rotate-180' : ''}`} />
              </div>
            </div>
            {showDatabaseOperations && (
              <div className="px-4 pb-4 border-t bg-gray-50">
                <div className="space-y-3 mt-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="text-sm">Database Status</span>
                    <Badge className="bg-pop-green text-white">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="text-sm">Total Records</span>
                    <span className="text-sm font-medium text-gray-900">47,293</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="text-sm">Storage Used</span>
                    <span className="text-sm font-medium text-gray-900">2.4 GB</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <span className="text-sm">Last Maintenance</span>
                    <span className="text-sm text-gray-600">Jan 12, 2025</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Button variant="outline" className="w-full">Run Database Query</Button>
                  <Button variant="outline" className="w-full">Export Database Records</Button>
                  <Button variant="outline" className="w-full">Database Maintenance Tools</Button>
                  <Button variant="outline" className="w-full text-pop-red">Reset Development Data</Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}