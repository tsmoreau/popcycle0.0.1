'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Package, TrendingUp, Recycle, QrCode, FileText, Building2, Trash2, Palette } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion'
import { DataTable, Column } from '../../components/ui/data-table'
import { Product, Bin } from '../../../lib/schemas-v3'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Label } from '../../components/ui/label'

interface Organization {
  _id: string
  name: string
  slug: string
  orgType: string
  description?: string
  branding?: {
    primaryColor?: string
    secondaryColor?: string
    logoUrl?: string
    logoS3Key?: string
    customDomain?: string
    trackingPageMessage?: string
  }
  communityPartner?: {
    mission: string
    storyContent: string
    communityPartnerType: string
  }
}

export default function PartnerPage() {
  const { data: session } = useSession()
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null)
  const [loadingOrgs, setLoadingOrgs] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [bins, setBins] = useState<Bin[]>([])
  const [loadingBins, setLoadingBins] = useState(false)
  const [savingBrand, setSavingBrand] = useState(false)
  
  // Brand editing state
  const [brandForm, setBrandForm] = useState({
    description: '',
    primaryColor: '',
    secondaryColor: '',
    logoUrl: '',
    customDomain: '',
    trackingPageMessage: '',
    mission: '',
    storyContent: ''
  })

  // Fetch organizations on mount
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoadingOrgs(true)
        const response = await fetch('/api/crm/organizations')
        const data = await response.json()
        
        if (response.ok && Array.isArray(data)) {
          setOrganizations(data)
        } else {
          console.error('Error fetching organizations:', data.error || 'Invalid response')
          setOrganizations([])
        }
      } catch (error) {
        console.error('Error fetching organizations:', error)
        setOrganizations([])
      } finally {
        setLoadingOrgs(false)
      }
    }

    fetchOrganizations()
  }, [])

  // Auto-set selectedOrgId based on user role
  useEffect(() => {
    if (!session?.user) return

    const userType = (session.user as any).userType
    const userOrgId = (session.user as any).orgId

    // If user is NOT super_admin and has an orgId, auto-select it
    if (userType !== 'super_admin' && userOrgId) {
      setSelectedOrgId(userOrgId)
    }
    // If super_admin and orgs are loaded, default to first org (only if null, not empty string)
    else if (userType === 'super_admin' && organizations.length > 0 && selectedOrgId === null) {
      setSelectedOrgId(organizations[0]._id)
    }
  }, [session, organizations, selectedOrgId])

  // Fetch products filtered by selectedOrgId
  useEffect(() => {
    if (!selectedOrgId) return

    const fetchProducts = async () => {
      try {
        setLoadingProducts(true)
        const response = await fetch('/api/admin/products')
        const data = await response.json()
        
        if (response.ok && Array.isArray(data)) {
          // Filter products by selectedOrgId
          const filteredProducts = data.filter((p: Product) => String(p.org) === String(selectedOrgId))
          setProducts(filteredProducts)
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

    fetchProducts()
  }, [selectedOrgId])

  // Fetch bins filtered by selectedOrgId
  useEffect(() => {
    if (!selectedOrgId) return

    const fetchBins = async () => {
      try {
        setLoadingBins(true)
        const response = await fetch('/api/operations/bins')
        const data = await response.json()
        
        if (response.ok && Array.isArray(data)) {
          // Filter bins by selectedOrgId
          const filteredBins = data.filter((b: Bin) => String(b.orgId) === String(selectedOrgId))
          setBins(filteredBins)
        } else {
          console.error('Error fetching bins:', data.error || 'Invalid response')
          setBins([])
        }
      } catch (error) {
        console.error('Error fetching bins:', error)
        setBins([])
      } finally {
        setLoadingBins(false)
      }
    }

    fetchBins()
  }, [selectedOrgId])

  // Populate brand form when selectedOrgId changes
  useEffect(() => {
    const org = organizations.find(o => o._id === selectedOrgId)
    if (!org) return

    setBrandForm({
      description: org.description || '',
      primaryColor: org.branding?.primaryColor || '',
      secondaryColor: org.branding?.secondaryColor || '',
      logoUrl: org.branding?.logoUrl || '',
      customDomain: org.branding?.customDomain || '',
      trackingPageMessage: org.branding?.trackingPageMessage || '',
      mission: org.communityPartner?.mission || '',
      storyContent: org.communityPartner?.storyContent || ''
    })
  }, [selectedOrgId, organizations])

  const handleBrandSave = async () => {
    if (!selectedOrgId) return

    try {
      setSavingBrand(true)
      
      // Build update payload
      const updatePayload: any = {
        description: brandForm.description,
        branding: {
          primaryColor: brandForm.primaryColor,
          secondaryColor: brandForm.secondaryColor,
          logoUrl: brandForm.logoUrl,
          customDomain: brandForm.customDomain,
          trackingPageMessage: brandForm.trackingPageMessage
        }
      }

      // Add community partner fields if org is community_partner
      if (selectedOrg?.orgType === 'community_partner') {
        updatePayload.communityPartner = {
          ...(selectedOrg.communityPartner || {}),
          mission: brandForm.mission,
          storyContent: brandForm.storyContent
        }
      }

      const response = await fetch(`/api/crm/organizations/${selectedOrgId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload)
      })

      if (!response.ok) {
        throw new Error('Failed to update organization branding')
      }

      // Refresh organizations list
      const orgsResponse = await fetch('/api/crm/organizations')
      const orgsData = await orgsResponse.json()
      if (orgsResponse.ok && Array.isArray(orgsData)) {
        setOrganizations(orgsData)
      }

      alert('Brand settings updated successfully')
    } catch (error) {
      console.error('Error updating brand:', error)
      alert('Failed to update brand settings')
    } finally {
      setSavingBrand(false)
    }
  }

  const binColumns: Column<Bin>[] = [
    { key: '_id', header: 'Bin ID' },
    { key: 'name', header: 'Name' },
    { key: 'location', header: 'Location' },
    { 
      key: 'type', 
      header: 'Type',
      render: (bin) => (
        <Badge variant={bin.type === 'permanent' ? 'default' : 'outline'}>
          {bin.type === 'permanent' ? 'Permanent' : 'Temporary'}
        </Badge>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (bin) => {
        const statusMap = {
          'bin_on_vehicle': { label: 'On Vehicle', variant: 'default' as const },
          'bin_on_site': { label: 'On Site', variant: 'outline' as const },
          'ready_for_processing': { label: 'Ready for Processing', variant: 'secondary' as const }
        }
        const statusInfo = statusMap[bin.status] || { label: bin.status, variant: 'outline' as const }
        return (
          <Badge variant={statusInfo.variant}>
            {statusInfo.label}
          </Badge>
        )
      }
    },
    { 
      key: 'capacity', 
      header: 'Capacity',
      render: (bin) => bin.capacity ? `${bin.capacity} lbs` : 'N/A'
    },
    { 
      key: 'isActive', 
      header: 'Active',
      render: (bin) => (
        <Badge variant={bin.isActive ? 'default' : 'outline'}>
          {bin.isActive ? 'Active' : 'Inactive'}
        </Badge>
      )
    }
  ]

  const isSuperAdmin = (session?.user as any)?.userType === 'super_admin'
  const selectedOrg = organizations.find(org => org._id === selectedOrgId)

  const productColumns: Column<Product>[] = [
    { key: '_id', header: 'Product ID' },
    { key: 'name', header: 'Name' },
    { key: 'category', header: 'Category' },
    { 
      key: 'productType', 
      header: 'Type',
      render: (product) => product.productType || 'Standard'
    },
    { 
      key: 'price', 
      header: 'Price',
      render: (product) => `$${product.price?.toFixed(2) || '0.00'}`
    },
    { 
      key: 'editions', 
      header: 'Editions',
      render: (product) => Array.isArray(product.editions) ? product.editions.length : 0
    },
    { 
      key: 'rating', 
      header: 'Rating',
      render: (product) => `${product.rating || 0}/5`
    },
    { 
      key: 'inStock', 
      header: 'Stock',
      render: (product) => (
        <Badge variant={product.inStock ? 'default' : 'outline'}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </Badge>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header with Org Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-pop-black">
            {selectedOrg ? `${selectedOrg.name} ` : 'Partner'}
            Dashboard</h2>
          
        </div>
        
        {/* Org Selector - Only visible for super_admin */}
        {isSuperAdmin && (
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-gray-500" />
            <select
              value={selectedOrgId || ''}
              onChange={(e) => setSelectedOrgId(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pop-blue"
              data-testid="select-org-filter"
            >
              {organizations.map((org) => (
                <option key={org._id} value={org._id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Metrics Cards - TODO: Filter by selectedOrgId when API supports org-specific metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Bins</CardTitle>
            <Package className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-600">3 ready for pickup</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plastic Collected</CardTitle>
            <Recycle className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847 lbs</div>
            <p className="text-xs text-gray-600">This quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Created</CardTitle>
            <QrCode className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-gray-600">From your waste</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-gray-600">Circular efficiency</p>
          </CardContent>
        </Card>
      </div>

      {/* Bins - Filtered by selectedOrgId */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="bins" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Trash2 className="h-5 w-5 text-pop-red" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-pop-black">{selectedOrg?.name || 'Partner'} Bins</h3>
                <p className="text-sm text-gray-600 font-normal">
                  {loadingBins ? 'Loading bins...' : `${bins.length} collection bin${bins.length !== 1 ? 's' : ''} at your location(s)`}
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-2 pb-4">
              {loadingBins ? (
                <div className="flex items-center justify-center p-8">
                  <div className="text-sm text-gray-600">Loading bins...</div>
                </div>
              ) : !selectedOrgId ? (
                <div className="flex items-center justify-center p-8">
                  <div className="text-sm text-gray-600">Select an organization to view bins</div>
                </div>
              ) : bins.length === 0 ? (
                <div className="flex items-center justify-center p-8">
                  <div className="text-sm text-gray-600">No bins found for this organization</div>
                </div>
              ) : (
                <DataTable
                  title=""
                  description=""
                  data={bins}
                  columns={binColumns}
                  enableColumnSelection={true}
                  enableFiltering={true}
                  availableColumns={binColumns}
                  defaultVisibleColumns={['_id', 'name', 'location', 'type', 'status', 'capacity', 'isActive']}
                />
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Products - Filtered by selectedOrgId */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="products" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-pop-green" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-pop-black">{selectedOrg?.name || 'Partner'} Products</h3>
                <p className="text-sm text-gray-600 font-normal">
                  {loadingProducts ? 'Loading products...' : `${products.length} product${products.length !== 1 ? 's' : ''} made for you`}
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-2 pb-4">
              {loadingProducts ? (
                <div className="flex items-center justify-center p-8">
                  <div className="text-sm text-gray-600">Loading products...</div>
                </div>
              ) : !selectedOrgId ? (
                <div className="flex items-center justify-center p-8">
                  <div className="text-sm text-gray-600">Select an organization to view products</div>
                </div>
              ) : products.length === 0 ? (
                <div className="flex items-center justify-center p-8">
                  <div className="text-sm text-gray-600">No products found for this organization</div>
                </div>
              ) : (
                <DataTable
                  title=""
                  description=""
                  data={products}
                  columns={productColumns}
                  enableColumnSelection={true}
                  enableFiltering={true}
                  availableColumns={productColumns}
                  defaultVisibleColumns={['name', 'category', 'productType', 'price', 'editions', 'rating', 'inStock']}
                />
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Bin Network and Activity - TODO: Filter by selectedOrgId when API supports org-specific data */}
      <div className="hidden grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Bin Network</CardTitle>
            <CardDescription>Track your collection points and capacity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-pop-green/5 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Main Office - Floor 3</span>
                  <p className="text-xs text-gray-600">Bin ID: BI-7829</p>
                </div>
                <Badge className="bg-pop-green text-white">85% Full</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-pop-blue/5 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Kitchen Area</span>
                  <p className="text-xs text-gray-600">Bin ID: BI-7830</p>
                </div>
                <Badge className="bg-pop-blue text-white">Ready</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Conference Room A</span>
                  <p className="text-xs text-gray-600">Bin ID: BI-7831</p>
                </div>
                <Badge variant="outline">45% Full</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View All Bin Locations
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest pickups and transformations from your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-medium text-sm">Batch BA-8472 Collected</span>
                  <p className="text-xs text-gray-600">45 lbs from Main Office</p>
                </div>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-medium text-sm">12 Phone Stands Completed</span>
                  <p className="text-xs text-gray-600">Made from your Q3 collection</p>
                </div>
                <span className="text-xs text-gray-500">5 days ago</span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-medium text-sm">Bin BI-7829 Pickup Scheduled</span>
                  <p className="text-xs text-gray-600">Tomorrow at 10:00 AM</p>
                </div>
                <span className="text-xs text-gray-500">1 week ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Partner Documentation - Wrapped in Accordion */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="partner-docs" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-pop-blue" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-pop-black">{selectedOrg?.name || 'Partner'} Documents</h3>
                <p className="text-sm text-gray-600 font-normal">Essential documents and agreements</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2 pb-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <h4 className="font-medium text-sm">Partnership Agreement</h4>
                      <p className="text-xs text-gray-500">Signed Jan 15, 2024 • 2.4 MB PDF</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-700 text-xs">Active</Badge>
                    <Button variant="ghost" size="sm" className="text-xs px-2">Download</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <h4 className="font-medium text-sm">Initial Waste Assessment</h4>
                      <p className="text-xs text-gray-500">Completed Dec 10, 2023 • 1.8 MB PDF</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">Complete</Badge>
                    <Button variant="ghost" size="sm" className="text-xs px-2">Download</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div>
                      <h4 className="font-medium text-sm">Service Level Agreement</h4>
                      <p className="text-xs text-gray-500">Updated Mar 8, 2024 • 1.2 MB PDF</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-orange-100 text-orange-700 text-xs">Current</Badge>
                    <Button variant="ghost" size="sm" className="text-xs px-2">Download</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div>
                      <h4 className="font-medium text-sm">Compliance Certification</h4>
                      <p className="text-xs text-gray-500">Issued Nov 20, 2023 • 950 KB PDF</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-700 text-xs">Valid</Badge>
                    <Button variant="ghost" size="sm" className="text-xs px-2">Download</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3 px-4 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-500">Insurance Certificate</h4>
                      <p className="text-xs text-gray-400">Pending upload</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs px-3">Upload</Button>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2 border-t">
                <Button variant="outline" className="flex-1 text-sm">
                  Download All
                </Button>
                <Button className="flex-1 bg-pop-blue hover:bg-pop-blue/90 text-sm">
                  Request Document
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Brand Settings */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="brand" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Palette className="h-5 w-5 text-pop-green" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-pop-black">{selectedOrg?.name || 'Partner'} Brand</h3>
                <p className="text-sm text-gray-600 font-normal">Edit branding and description</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6 pt-2 pb-4">
              <div className="space-y-4">
                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter organization description..."
                    value={brandForm.description}
                    onChange={(e) => setBrandForm({ ...brandForm, description: e.target.value })}
                    rows={3}
                    data-testid="input-brand-description"
                  />
                </div>

                {/* Branding Colors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <Input
                      id="primaryColor"
                      type="text"
                      placeholder="#000000"
                      value={brandForm.primaryColor}
                      onChange={(e) => setBrandForm({ ...brandForm, primaryColor: e.target.value })}
                      data-testid="input-brand-primarycolor"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <Input
                      id="secondaryColor"
                      type="text"
                      placeholder="#000000"
                      value={brandForm.secondaryColor}
                      onChange={(e) => setBrandForm({ ...brandForm, secondaryColor: e.target.value })}
                      data-testid="input-brand-secondarycolor"
                    />
                  </div>
                </div>

                {/* Logo URL */}
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <Input
                    id="logoUrl"
                    type="text"
                    placeholder="https://example.com/logo.png"
                    value={brandForm.logoUrl}
                    onChange={(e) => setBrandForm({ ...brandForm, logoUrl: e.target.value })}
                    data-testid="input-brand-logourl"
                  />
                </div>

                {/* Custom Domain */}
                <div className="space-y-2">
                  <Label htmlFor="customDomain">Custom Domain</Label>
                  <Input
                    id="customDomain"
                    type="text"
                    placeholder="track.yourcompany.com"
                    value={brandForm.customDomain}
                    onChange={(e) => setBrandForm({ ...brandForm, customDomain: e.target.value })}
                    data-testid="input-brand-customdomain"
                  />
                </div>

                {/* Tracking Page Message */}
                <div className="space-y-2">
                  <Label htmlFor="trackingPageMessage">Tracking Page Message</Label>
                  <Textarea
                    id="trackingPageMessage"
                    placeholder="Custom message for tracking page..."
                    value={brandForm.trackingPageMessage}
                    onChange={(e) => setBrandForm({ ...brandForm, trackingPageMessage: e.target.value })}
                    rows={2}
                    data-testid="input-brand-trackingmessage"
                  />
                </div>

                {/* Community Partner Fields */}
                {selectedOrg?.orgType === 'community_partner' && (
                  <>
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-sm mb-4 text-pop-black">Community Partner Information</h4>
                      
                      <div className="space-y-4">
                        {/* Mission */}
                        <div className="space-y-2">
                          <Label htmlFor="mission">Mission</Label>
                          <Textarea
                            id="mission"
                            placeholder="Enter mission statement..."
                            value={brandForm.mission}
                            onChange={(e) => setBrandForm({ ...brandForm, mission: e.target.value })}
                            rows={3}
                            data-testid="input-brand-mission"
                          />
                        </div>

                        {/* Story Content */}
                        <div className="space-y-2">
                          <Label htmlFor="storyContent">Story Content</Label>
                          <Textarea
                            id="storyContent"
                            placeholder="Enter your story..."
                            value={brandForm.storyContent}
                            onChange={(e) => setBrandForm({ ...brandForm, storyContent: e.target.value })}
                            rows={4}
                            data-testid="input-brand-storycontent"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Save Button */}
              <div className="flex gap-2 pt-2 border-t">
                <Button 
                  onClick={handleBrandSave}
                  disabled={savingBrand}
                  className="bg-pop-green hover:bg-pop-green/90"
                  data-testid="button-save-brand"
                >
                  {savingBrand ? 'Saving...' : 'Save Brand Settings'}
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

     
    </div>
  )
}