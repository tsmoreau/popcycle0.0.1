'use client'

import { useState, useEffect } from 'react'
import { Users, Settings, Shield, ChevronDown, Database, Cog, Eye, Zap, QrCode, Plug, Package } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { DataTable, Column, EditableField } from '../../components/ui/data-table'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion'
import { LoadingSquare } from '../../components/ui/loading-square'

interface User {
  _id: string
  name: string
  email: string
  userType: 'admin' | 'super_admin' | 'staff' | 'user' | 'partner_owner'
  orgId?: string
  location?: string
  skillLevel?: 'beginner' | 'intermediate' | 'advanced'
  itemsAssembled?: number
  totalHoursLogged?: number
  favoriteProducts?: string[]
  assemblyStories?: any[]
  permissions?: string[]
  assignedRoutes?: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface Station {
  id: string
  name: string
  type: string
  status: 'Online' | 'Offline' | 'Active'
  description: string
}

interface MongoDBStatus {
  connected: boolean
  status: string
  database?: string
  hostname?: string
  collections?: number
  dataSize?: number
  storageSize?: number
  error?: string
  lastChecked?: string
}

interface Product {
  _id: string
  name: string
  description: string
  category: 'educational_kit' | 'assembly_toy' | 'practical_item' | 'decoration'
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedAssemblyTime: number
  materialRequirements: {
    plasticType: 'HDPE' | 'PET' | 'PP'
    weight: number
  }
  price: number
  inStock: boolean
  rating: number
  reviewCount: number
  createdAt: Date
  updatedAt: Date
}

export default function AdminPage() {
  const [showOverview, setShowOverview] = useState(false)
  const [showProductionStations, setShowProductionStations] = useState(false)
  const [showQRSettings, setShowQRSettings] = useState(false)
  const [showProductConfiguration, setShowProductConfiguration] = useState(false)
  const [showIntegrations, setShowIntegrations] = useState(false)
  const [showMongoDBOperations, setShowMongoDBOperations] = useState(false)
  const [mongoStatus, setMongoStatus] = useState<MongoDBStatus | null>(null)
  const [loadingMongo, setLoadingMongo] = useState(true)
  const [generatingData, setGeneratingData] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [loadingUsers, setLoadingUsers] = useState(false)

  // Fetch MongoDB status, products, and users on component mount
  useEffect(() => {
    fetchMongoStatus()
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true)
      const response = await fetch('/api/admin/users')
      const data = await response.json()
      
      if (response.ok && Array.isArray(data)) {
        setUsers(data)
      } else {
        console.error('Error fetching users:', data.error || 'Invalid response')
        setUsers([])
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      setUsers([])
    } finally {
      setLoadingUsers(false)
    }
  }

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true)
      const response = await fetch('/api/admin/products')
      const data = await response.json()
      
      if (response.ok && Array.isArray(data)) {
        setProducts(data)
      } else {
        console.error('Error fetching products:', data.error || 'Invalid response')
        setProducts([])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } finally {
      setLoadingProducts(false)
    }
  }

  // Fetch products when the dropdown is opened
  useEffect(() => {
    if (showProductConfiguration && products.length === 0) {
      fetchProducts()
    }
  }, [showProductConfiguration])

  const fetchMongoStatus = async () => {
    try {
      setLoadingMongo(true)
      const response = await fetch('/api/admin/mongodb-status')
      const data = await response.json()
      setMongoStatus(data)
    } catch (error) {
      setMongoStatus({
        connected: false,
        status: 'Connection Error',
        error: 'Failed to check MongoDB status'
      })
    } finally {
      setLoadingMongo(false)
    }
  }

  const generateSampleData = async () => {
    try {
      setGeneratingData(true)
      const response = await fetch('/api/admin/generate-sample-data', {
        method: 'POST'
      })
      const data = await response.json()
      
      if (data.success) {
        alert(`Sample data generated successfully!\n\nSummary:\n- ${data.summary.organizations} Organizations\n- ${data.summary.bins} Bins\n- ${data.summary.batches} Batches\n- ${data.summary.items} Items\n- ${data.summary.users} Users\n- ${data.summary.products} Products\n- ${data.summary.orders} Orders`)
        // Refresh MongoDB status to show new collection count
        await fetchMongoStatus()
      } else {
        alert(`Failed to generate sample data: ${data.error}`)
      }
    } catch (error) {
      alert(`Error generating sample data: ${error}`)
    } finally {
      setGeneratingData(false)
    }
  }

  // Helper function to format last active
  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${Math.floor(diffInHours)} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return '1 day ago'
    return `${diffInDays} days ago`
  }

  // Sample station data
  const stationsData: Station[] = [
    { id: 'ST-001', name: 'Station 1', type: 'Weighing/Photo', status: 'Online', description: 'HID Scale + Camera Ready' },
    { id: 'ST-002', name: 'Station 2', type: 'Laser Processing', status: 'Active', description: 'Lightburn Integration' }
  ]

  const userColumns: Column<User>[] = [
    { key: '_id', header: 'User ID' },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    {
      key: 'userType',
      header: 'Role',
      render: (user) => (
        <Badge className={
          user.userType === 'super_admin' || user.userType === 'admin' ? 'bg-pop-red text-white' :
          user.userType === 'staff' ? 'bg-pop-blue text-white' :
          user.userType === 'partner_owner' ? 'bg-purple-500 text-white' :
          'bg-gray-100 text-gray-800'
        }>
          {user.userType.replace('_', ' ').toUpperCase()}
        </Badge>
      )
    },
    {
      key: 'skillLevel',
      header: 'Skill Level',
      render: (user) => user.skillLevel ? (
        <Badge variant="outline" className={
          user.skillLevel === 'advanced' ? 'border-pop-green text-pop-green' :
          user.skillLevel === 'intermediate' ? 'border-pop-blue text-pop-blue' :
          'border-gray-400 text-gray-600'
        }>
          {user.skillLevel.toUpperCase()}
        </Badge>
      ) : '-'
    },
    {
      key: 'itemsAssembled',
      header: 'Items Built',
      render: (user) => user.itemsAssembled || 0
    },
    {
      key: 'totalHoursLogged',
      header: 'Hours Logged',
      render: (user) => user.totalHoursLogged || 0
    },
    {
      key: 'orgId',
      header: 'Partner Org',
      render: (user) => user.orgId ? <Badge variant="outline">{String(user.orgId).slice(-8)}</Badge> : '-'
    },
    {
      key: 'updatedAt',
      header: 'Last Active',
      render: (user) => formatLastActive(user.updatedAt)
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (user) => (
        <Badge className={user.isActive ? 'bg-pop-green text-white' : 'bg-gray-100 text-gray-800'}>
          {user.isActive ? 'Active' : 'Inactive'}
        </Badge>
      )
    }
  ]

  const userEditableFields: EditableField<User>[] = [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'email', label: 'Email', type: 'email', required: true },
    { 
      key: 'userType', 
      label: 'User Type', 
      type: 'select', 
      required: true,
      options: [
        { value: 'user', label: 'User' },
        { value: 'staff', label: 'Staff' },
        { value: 'admin', label: 'Admin' },
        { value: 'super_admin', label: 'Super Admin' },
        { value: 'partner_owner', label: 'Partner Owner' }
      ]
    },
    { key: 'location', label: 'Location', type: 'text' },
    { 
      key: 'skillLevel', 
      label: 'Skill Level', 
      type: 'select',
      options: [
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' }
      ]
    },
    { key: 'itemsAssembled', label: 'Items Assembled', type: 'number' },
    { key: 'totalHoursLogged', label: 'Total Hours Logged', type: 'number' },
    { 
      key: 'isActive', 
      label: 'Active Status', 
      type: 'select',
      options: [
        { value: 'true', label: 'Active' },
        { value: 'false', label: 'Inactive' }
      ]
    }
  ]

  const handleUserSave = async (user: User) => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...user,
          isActive: user.isActive === 'true' || user.isActive === true
        })
      })
      
      if (response.ok) {
        await fetchUsers()
      } else {
        throw new Error('Failed to save user')
      }
    } catch (error) {
      console.error('Error saving user:', error)
      throw error
    }
  }

  const handleUserDelete = async (user: User) => {
    try {
      const response = await fetch(`/api/admin/users?id=${user._id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        await fetchUsers()
      } else {
        throw new Error('Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  }

  const productColumns: Column<Product>[] = [
    { key: '_id', header: 'Product ID' },
    { key: 'name', header: 'Name' },
    {
      key: 'category',
      header: 'Category',
      render: (product) => (
        <Badge className="bg-pop-blue text-white">
          {product.category.replace('_', ' ')}
        </Badge>
      )
    },
    {
      key: 'difficulty',
      header: 'Difficulty',
      render: (product) => (
        <Badge className={
          product.difficulty === 'easy' ? 'bg-pop-green text-white' :
          product.difficulty === 'medium' ? 'bg-yellow-500 text-white' :
          'bg-pop-red text-white'
        }>
          {product.difficulty}
        </Badge>
      )
    },
    { 
      key: 'estimatedAssemblyTime', 
      header: 'Assembly Time',
      render: (product) => `${product.estimatedAssemblyTime} min`
    },
    { 
      key: 'price', 
      header: 'Price',
      render: (product) => `$${product.price.toFixed(2)}`
    },
    {
      key: 'inStock',
      header: 'Status',
      render: (product) => (
        <Badge className={product.inStock ? 'bg-pop-green text-white' : 'bg-gray-100 text-gray-800'}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </Badge>
      )
    }
  ]

  // Product editing configuration
  const productEditableFields: EditableField<Product>[] = [
    { key: '_id', label: 'Product ID', type: 'readonly' },
    { key: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Enter product name' },
    { key: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Describe the product' },
    { 
      key: 'category', 
      label: 'Category', 
      type: 'select', 
      required: true,
      options: [
        { value: 'educational_kit', label: 'Educational Kit' },
        { value: 'assembly_toy', label: 'Assembly Toy' },
        { value: 'practical_item', label: 'Practical Item' },
        { value: 'decoration', label: 'Decoration' }
      ]
    },
    { 
      key: 'difficulty', 
      label: 'Difficulty', 
      type: 'select', 
      required: true,
      options: [
        { value: 'easy', label: 'Easy' },
        { value: 'medium', label: 'Medium' },
        { value: 'hard', label: 'Hard' }
      ]
    },
    { key: 'estimatedAssemblyTime', label: 'Assembly Time (minutes)', type: 'number', required: true },
    { 
      key: 'materialRequirements', 
      label: 'Material Requirements', 
      type: 'nested',
      nested: [
        { 
          key: 'plasticType', 
          label: 'Plastic Type', 
          type: 'select',
          options: [
            { value: 'HDPE', label: 'HDPE' },
            { value: 'PET', label: 'PET' },
            { value: 'PP', label: 'PP' }
          ]
        },
        { key: 'weight', label: 'Weight (kg)', type: 'number' }
      ]
    },
    { key: 'price', label: 'Price ($)', type: 'number', required: true },
    { key: 'rating', label: 'Rating (1-5)', type: 'number' },
    { key: 'reviewCount', label: 'Review Count', type: 'number' },
    { key: 'inStock', label: 'In Stock', type: 'select', options: [
      { value: 'true', label: 'In Stock' },
      { value: 'false', label: 'Out of Stock' }
    ] }
  ]

  const handleProductSave = async (product: Product) => {
    try {
      const response = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      })
      
      if (response.ok) {
        // Refresh products list
        await fetchProducts()
      } else {
        throw new Error('Failed to save product')
      }
    } catch (error) {
      console.error('Error saving product:', error)
      throw error
    }
  }

  const handleProductDelete = async (product: Product) => {
    try {
      const response = await fetch(`/api/admin/products?id=${product._id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        // Refresh products list
        await fetchProducts()
      } else {
        throw new Error('Failed to delete product')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    }
  }

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
              {loadingUsers ? (
                <div className="flex justify-center items-center py-8">
                  <LoadingSquare />
                </div>
              ) : (
                <DataTable
                  title="User Management"
                  description="Manage user roles, permissions, and partner affiliations"
                  icon={<Users className="h-5 w-5 text-pop-green" />}
                  data={users}
                  columns={userColumns}
                  editableFields={userEditableFields}
                  onSave={handleUserSave}
                  onDelete={handleUserDelete}
                  enableColumnSelection={true}
                  enableFiltering={true}
                  availableColumns={userColumns}
                  defaultVisibleColumns={['name', 'email', 'userType', 'skillLevel', 'isActive']}
                />
              )}
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
                  <span className="font-medium">Production Station Configuration</span>
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
                  <span className="font-medium">QR Code Generation Configuration</span>
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

          {/* Product Configuration Dropdown */}
          <div className="w-full border rounded-lg">
            <div className="px-4 py-4 cursor-pointer hover:bg-gray-50" onClick={() => setShowProductConfiguration(!showProductConfiguration)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-pop-green" />
                  <span className="font-medium">Product Configuration</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showProductConfiguration ? 'rotate-180' : ''}`} />
              </div>
            </div>
            {showProductConfiguration && (
              <div className="px-4 pb-4 border-t bg-gray-50">
                <div className="mt-4">
                  {loadingProducts ? (
                    <div className="flex items-center justify-center p-8">
                      <div className="text-sm text-gray-600">Loading products...</div>
                    </div>
                  ) : (
                    <DataTable
                      title="Product Management"
                      description="Configure and manage product catalog"
                      data={products}
                      columns={productColumns}
                      editableFields={productEditableFields}
                      onSave={handleProductSave}
                      onDelete={handleProductDelete}
                    />
                  )}
                </div>
                <div className="mt-4 space-y-2">
                  <Button variant="outline" className="w-full" onClick={fetchProducts}>
                    {loadingProducts ? 'Refreshing...' : 'Refresh Products'}
                  </Button>
                  <Button className="w-full bg-pop-green hover:bg-pop-green/90">Add New Product</Button>
                  <Button variant="outline" className="w-full">Import Products from CSV</Button>
                  <Button variant="outline" className="w-full">Export Product Catalog</Button>
                </div>
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
                    <Badge className="bg-gray-100 text-gray-800">Not Set Up</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <span className="font-medium text-sm">MongoDB Atlas</span>
                      <p className="text-xs text-gray-600">Primary database & document storage</p>
                    </div>
                    {loadingMongo ? (
                      <Badge className="bg-yellow-100 text-yellow-800">Checking...</Badge>
                    ) : (
                      <Badge className={
                        mongoStatus?.connected 
                          ? "bg-pop-green text-white" 
                          : "bg-pop-red text-white"
                      }>
                        {mongoStatus?.status || 'Unknown'}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <span className="font-medium text-sm">QuickBooks</span>
                      <p className="text-xs text-gray-600">Financial data synchronization</p>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800">Not Set Up</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <span className="font-medium text-sm">Stripe</span>
                      <p className="text-xs text-gray-600">Payment processing</p>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800">Not Set Up</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <span className="font-medium text-sm">AWS S3</span>
                      <p className="text-xs text-gray-600">Private file & image storage</p>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800">Not Set Up</Badge>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* MongoDB Database Operations Dropdown */}
          <div className="w-full border rounded-lg">
            <div className="px-4 py-4 cursor-pointer hover:bg-gray-50" onClick={() => setShowMongoDBOperations(!showMongoDBOperations)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-pop-green" />
                  <span className="font-medium">MongoDB Database Operations</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showMongoDBOperations ? 'rotate-180' : ''}`} />
              </div>
            </div>
            {showMongoDBOperations && (
              <div className="px-4 pb-4 border-t bg-gray-50">
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <span className="font-medium text-sm">Database Status</span>
                      <p className="text-xs text-gray-600">
                        {mongoStatus?.hostname || 'popcycle.esldhpo.mongodb.net'}
                      </p>
                    </div>
                    {loadingMongo ? (
                      <Badge className="bg-yellow-100 text-yellow-800">Checking...</Badge>
                    ) : (
                      <Badge className={
                        mongoStatus?.connected 
                          ? "bg-pop-green text-white" 
                          : "bg-pop-red text-white"
                      }>
                        {mongoStatus?.status || 'Unknown'}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <span className="font-medium text-sm">Collection Count</span>
                      <p className="text-xs text-gray-600">Core data collections</p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {loadingMongo ? '...' : (mongoStatus?.collections || 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <span className="font-medium text-sm">Database Size</span>
                      <p className="text-xs text-gray-600">Current storage usage</p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {loadingMongo ? '...' : `${mongoStatus?.dataSize || 0} MB`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <span className="font-medium text-sm">User Permissions</span>
                      <p className="text-xs text-gray-600">popcycleapp user access level</p>
                    </div>
                    <Badge className="bg-pop-blue text-white">dbAdmin</Badge>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={fetchMongoStatus}
                    disabled={loadingMongo}
                  >
                    {loadingMongo ? 'Testing...' : 'Test Connection'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={generateSampleData}
                    disabled={generatingData}
                  >
                    {generatingData ? 'Generating...' : 'Initialize Sample Data'}
                  </Button>
                  <Button variant="outline" className="w-full">View Collection Stats</Button>
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