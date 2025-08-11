'use client'

import { useState, useEffect } from 'react'
import { Users, Settings, Shield, ChevronDown, Database, Cog, Eye, Zap, QrCode, Plug, Package } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { DataTable, Column, EditableField } from '../../components/ui/data-table'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion'
import { 
  StationCard, 
  StationFullscreen, 
  RoughWashStation,
  StationBase,
  StationType,
  StationStatus,
  WashStationData
} from '../../components/operations/stations'

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

  // Fetch MongoDB status and products on component mount
  useEffect(() => {
    fetchMongoStatus()
  }, [])

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
              <DataTable
                title="User Management"
                description="Manage user roles, permissions, and partner affiliations"
                data={usersData}
                columns={userColumns}
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