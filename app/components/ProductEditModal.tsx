"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Badge } from "./ui/badge"
import { DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { 
  Save, X, Plus, Trash2, Upload, File, Image as ImageIcon,
  FileText, Edit2, Star
} from "lucide-react"
import { AssetLightbox } from "./AssetLightbox"

interface Product {
  _id: string
  name: string
  description: string
  slug?: string
  category: 'workshop' | 'studio_edition' | 'client_edition'
  productType: 'coasters' | 'keychains' | 'bookmarks' | 'magnets' | 'earrings' | 'lighting' | 'cutting_boards'
  designFiles?: {
    cncVectors?: string[]
    laserVectors?: string[]
    instructionsPdfs?: string[]
    photos?: string[]
  }
  _signedUrls?: Record<string, string>
  _photoUrls?: string[]
  assets?: Array<{
    id: string
    type: 'image' | 'video' | 'document' | 'model'
    url: string
    thumbnail?: string
    alt?: string
    description?: string
    isPrimary?: boolean
    order?: number
    category?: 'hero' | 'product_info' | 'lifestyle' | 'detail' | 'shop_listing'
  }>
  price: number
  inStock: boolean
  rating: number
  reviewCount: number
}

interface ProductEditModalProps {
  item: Product | null
  isAdding: boolean
  onSave: (productData: any) => Promise<void>
  onCancel: () => void
  onDelete?: () => Promise<void>
  isSaving: boolean
}

export function ProductEditModal({
  item,
  isAdding,
  onSave,
  onCancel,
  onDelete,
  isSaving
}: ProductEditModalProps) {
  const [formData, setFormData] = useState<any>({
    _id: '',
    name: '',
    description: '',
    slug: '',
    category: 'workshop',
    productType: 'coasters',
    price: 0,
    inStock: true,
    rating: 0,
    reviewCount: 0,
    designFiles: {
      cncVectors: [],
      laserVectors: [],
      instructionsPdfs: [],
      photos: []
    },
    assets: []
  })

  // Function to generate slug from name
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
  }

  useEffect(() => {
    if (item) {
      setFormData({
        _id: item._id || '',
        name: item.name || '',
        description: item.description || '',
        slug: item.slug || generateSlug(item.name || ''),
        category: item.category || 'workshop',
        productType: item.productType || 'coasters',
        price: item.price || 0,
        inStock: item.inStock ?? true,
        rating: item.rating || 0,
        reviewCount: item.reviewCount || 0,
        designFiles: {
          cncVectors: item.designFiles?.cncVectors || [],
          laserVectors: item.designFiles?.laserVectors || [],
          instructionsPdfs: item.designFiles?.instructionsPdfs || [],
          photos: item.designFiles?.photos || []
        },
        assets: item.assets || []
      })
    } else {
      setFormData({
        _id: '',
        name: '',
        description: '',
        slug: '',
        category: 'workshop',
        productType: 'coasters',
        price: 0,
        inStock: true,
        rating: 0,
        reviewCount: 0,
        designFiles: {
          cncVectors: [],
          laserVectors: [],
          instructionsPdfs: [],
          photos: []
        },
        assets: []
      })
    }
  }, [item])

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev: any) => {
      const updates: any = { [field]: value }
      
      // Auto-generate slug when name changes (only if slug hasn't been manually set)
      if (field === 'name' && (!prev.slug || prev.slug === generateSlug(prev.name))) {
        updates.slug = generateSlug(value)
      }
      
      return { ...prev, ...updates }
    })
  }

  const [uploadingFiles, setUploadingFiles] = useState<Record<string, boolean>>({})
  const [selectedAssetIndex, setSelectedAssetIndex] = useState<number | null>(null)

  // Lightbox state
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    assets: [] as string[],
    currentIndex: 0
  })

  const openLightbox = (assets: string[], startIndex: number) => {
    setLightbox({
      isOpen: true,
      assets,
      currentIndex: startIndex
    })
  }

  const closeLightbox = () => {
    setLightbox(prev => ({ ...prev, isOpen: false }))
  }

  const navigateLightbox = (index: number) => {
    setLightbox(prev => ({ ...prev, currentIndex: index }))
  }

  const handleFileUpload = async (
    file: File,
    category: 'cnc' | 'laser' | 'instructions' | 'photos' | 'assets'
  ) => {
    if (!formData._id) {
      alert('Please save the product first before uploading files')
      return
    }

    const uploadKey = `${category}-${Date.now()}`
    setUploadingFiles(prev => ({ ...prev, [uploadKey]: true }))

    try {
      const formDataObj = new FormData()
      formDataObj.append('file', file)
      formDataObj.append('category', category)

      const response = await fetch(`/api/admin/products/${formData._id}/files`, {
        method: 'POST',
        body: formDataObj
      })

      if (!response.ok) throw new Error('Upload failed')

      const result = await response.json()
      
      if (category === 'assets') {
        // For assets, add the returned asset object to assets array
        setFormData((prev: any) => ({
          ...prev,
          assets: [...prev.assets, result.asset]
        }))
      } else {
        // For design files, update the appropriate designFiles field
        const field = getCategoryField(category)
        setFormData((prev: any) => ({
          ...prev,
          designFiles: {
            ...prev.designFiles,
            [field]: [...prev.designFiles[field], result.filePath]
          }
        }))
      }
    } catch (error) {
      console.error('File upload error:', error)
      alert('Failed to upload file')
    } finally {
      setUploadingFiles(prev => {
        const newState = { ...prev }
        delete newState[uploadKey]
        return newState
      })
    }
  }

  const handleDesignFileRemove = async (
    field: keyof typeof formData.designFiles,
    index: number
  ) => {
    const filePath = formData.designFiles[field][index]
    
    if (!formData._id || !filePath) return

    try {
      const category = getFieldCategory(field)
      const response = await fetch(`/api/admin/products/${formData._id}/files`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath, category })
      })

      if (!response.ok) throw new Error('Delete failed')

      // Update local state
      setFormData((prev: any) => ({
        ...prev,
        designFiles: {
          ...prev.designFiles,
          [field]: prev.designFiles[field].filter((_: any, i: number) => i !== index)
        }
      }))
    } catch (error) {
      console.error('File delete error:', error)
      alert('Failed to delete file')
    }
  }

  const getCategoryField = (category: string): keyof typeof formData.designFiles => {
    switch (category) {
      case 'cnc': return 'cncVectors'
      case 'laser': return 'laserVectors'
      case 'instructions': return 'instructionsPdfs'
      case 'photos': return 'photos'
      default: return 'photos'
    }
  }

  const getFieldCategory = (field: keyof typeof formData.designFiles): 'cnc' | 'laser' | 'instructions' | 'photos' => {
    switch (field) {
      case 'cncVectors': return 'cnc'
      case 'laserVectors': return 'laser'
      case 'instructionsPdfs': return 'instructions'
      case 'photos': return 'photos'
      default: return 'photos'
    }
  }

  const handleAssetAdd = () => {
    setFormData((prev: any) => ({
      ...prev,
      assets: [
        ...prev.assets,
        {
          id: `asset-${Date.now()}`,
          type: 'image',
          url: '',
          order: prev.assets.length
        }
      ]
    }))
  }

  const handleAssetRemove = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      assets: prev.assets.filter((_: any, i: number) => i !== index)
    }))
  }

  const handleAssetFileRemove = async (index: number) => {
    const asset = formData.assets[index]
    
    if (!formData._id || !asset) return

    // Determine filePath - use stored filePath or extract from URL for legacy assets
    let filePath = asset.filePath
    
    if (!filePath && asset.url && asset.url.includes('storage.googleapis.com')) {
      // Legacy asset without filePath - extract from URL
      // URL format: https://storage.googleapis.com/{bucket}/{filePath}
      const urlParts = asset.url.split('storage.googleapis.com/')[1]
      if (urlParts) {
        filePath = urlParts.split('/').slice(1).join('/')
      }
    }

    // Check if this is a GCS-uploaded file
    if (filePath) {
      try {
        const response = await fetch(`/api/admin/products/${formData._id}/files`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filePath, category: 'assets', assetId: asset.id })
        })

        if (!response.ok) throw new Error('Delete failed')

        // Update local state
        setFormData((prev: any) => ({
          ...prev,
          assets: prev.assets.filter((_: any, i: number) => i !== index)
        }))
      } catch (error) {
        console.error('Asset file delete error:', error)
        alert('Failed to delete asset file')
      }
    } else {
      // For non-GCS assets (external URLs or manual entries), just remove from local state
      handleAssetRemove(index)
    }
  }

  const handleAssetChange = (index: number, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      assets: prev.assets.map((asset: any, i: number) =>
        i === index ? { ...asset, [field]: value } : asset
      )
    }))
  }

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          {isAdding ? <Plus className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
          {isAdding ? 'Add New Product' : `Edit Product: ${item?.name || 'Product'}`}
        </DialogTitle>
        <DialogDescription>
          {isAdding 
            ? 'Add a new product to the catalog with design files and assets'
            : 'Edit product information, design files, and assets'}
        </DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="design">Design Files</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 max-h-96 overflow-y-auto">
          <div>
            <Label>Product ID</Label>
            <Input value={formData._id || 'Auto-generated'} disabled />
          </div>
          <div>
            <Label>Name *</Label>
            <Input
              value={formData.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              placeholder="Enter product name"
            />
          </div>
          <div>
            <Label>Description *</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder="Describe the product"
              rows={3}
            />
          </div>
          <div>
            <Label>URL Slug *</Label>
            <Input
              value={formData.slug}
              onChange={(e) => handleFieldChange('slug', e.target.value)}
              placeholder="product-url-slug"
              data-testid="input-slug"
            />
            <p className="text-xs text-gray-500 mt-1">
              Auto-generated from product name. Edit to customize the URL.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Category *</Label>
              <select
                value={formData.category}
                onChange={(e) => handleFieldChange('category', e.target.value)}
                className="border rounded px-3 py-2 w-full"
              >
                <option value="workshop">Workshop</option>
                <option value="studio_edition">Studio Edition</option>
                <option value="client_edition">Client Edition</option>
              </select>
            </div>
            <div>
              <Label>Product Type *</Label>
              <select
                value={formData.productType}
                onChange={(e) => handleFieldChange('productType', e.target.value)}
                className="border rounded px-3 py-2 w-full"
              >
                <option value="coasters">Coasters</option>
                <option value="keychains">Keychains</option>
                <option value="bookmarks">Bookmarks</option>
                <option value="magnets">Magnets</option>
                <option value="earrings">Earrings</option>
                <option value="lighting">Lighting</option>
                <option value="cutting_boards">Cutting Boards</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Price ($) *</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => handleFieldChange('price', parseFloat(e.target.value) || 0)}
                step="0.01"
              />
            </div>
            <div>
              <Label>In Stock</Label>
              <select
                value={formData.inStock ? 'true' : 'false'}
                onChange={(e) => handleFieldChange('inStock', e.target.value === 'true')}
                className="border rounded px-3 py-2 w-full"
              >
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Rating (1-5)</Label>
              <Input
                type="number"
                value={formData.rating}
                disabled
                className="bg-gray-50 cursor-not-allowed"
              />
            </div>
            <div>
              <Label>Review Count</Label>
              <Input
                type="number"
                value={formData.reviewCount}
                disabled
                className="bg-gray-50 cursor-not-allowed"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="design" className="space-y-6 max-h-96 overflow-y-auto">
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <File className="h-4 w-4" />
              CNC Vectors
            </Label>
            <div className="space-y-2">
              {formData.designFiles.cncVectors.map((file: string, index: number) => {
                const signedUrl = item?._signedUrls?.[file]
                return (
                  <div key={index} className="flex items-center gap-2 p-2 border rounded bg-gray-50">
                    {signedUrl ? (
                      <img 
                        src={signedUrl} 
                        alt={file.split('/').pop()} 
                        className="h-12 w-12 object-contain border rounded cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => {
                          const urls = formData.designFiles.cncVectors
                            .map((f: string) => item?._signedUrls?.[f])
                            .filter((url: string | undefined): url is string => !!url)
                          if (urls.length === 0) return
                          const actualIndex = urls.indexOf(signedUrl)
                          if (actualIndex !== -1) {
                            openLightbox(urls, actualIndex)
                          }
                        }}
                        data-testid={`thumbnail-cnc-${index}`}
                      />
                    ) : (
                      <File className="h-12 w-12 text-gray-500" />
                    )}
                    <span className="flex-1 text-sm truncate">{file.split('/').pop()}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDesignFileRemove('cncVectors', index)}
                      data-testid={`button-delete-cnc-${index}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )
              })}
              <label className="block">
                <input
                  type="file"
                  accept=".dxf,.ai,.eps,.svg"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file, 'cnc')
                    e.target.value = ''
                  }}
                  data-testid="input-upload-cnc"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault()
                    e.currentTarget.previousElementSibling?.dispatchEvent(new MouseEvent('click'))
                  }}
                  disabled={!formData._id || Object.keys(uploadingFiles).some(k => k.startsWith('cnc-'))}
                  data-testid="button-upload-cnc"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {Object.keys(uploadingFiles).some(k => k.startsWith('cnc-')) ? 'Uploading...' : 'Upload CNC Vector'}
                </Button>
              </label>
            </div>
          </div>

          <div>
            <Label className="flex items-center gap-2 mb-2">
              <File className="h-4 w-4" />
              Laser Vectors
            </Label>
            <div className="space-y-2">
              {formData.designFiles.laserVectors.map((file: string, index: number) => {
                const signedUrl = item?._signedUrls?.[file]
                return (
                  <div key={index} className="flex items-center gap-2 p-2 border rounded bg-gray-50">
                    {signedUrl ? (
                      <img 
                        src={signedUrl} 
                        alt={file.split('/').pop()} 
                        className="h-12 w-12 object-contain border rounded cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => {
                          const urls = formData.designFiles.laserVectors
                            .map((f: string) => item?._signedUrls?.[f])
                            .filter((url: string | undefined): url is string => !!url)
                          if (urls.length === 0) return
                          const actualIndex = urls.indexOf(signedUrl)
                          if (actualIndex !== -1) {
                            openLightbox(urls, actualIndex)
                          }
                        }}
                        data-testid={`thumbnail-laser-${index}`}
                      />
                    ) : (
                      <File className="h-12 w-12 text-gray-500" />
                    )}
                    <span className="flex-1 text-sm truncate">{file.split('/').pop()}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDesignFileRemove('laserVectors', index)}
                      data-testid={`button-delete-laser-${index}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )
              })}
              <label className="block">
                <input
                  type="file"
                  accept=".dxf,.ai,.eps,.svg"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file, 'laser')
                    e.target.value = ''
                  }}
                  data-testid="input-upload-laser"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault()
                    e.currentTarget.previousElementSibling?.dispatchEvent(new MouseEvent('click'))
                  }}
                  disabled={!formData._id || Object.keys(uploadingFiles).some(k => k.startsWith('laser-'))}
                  data-testid="button-upload-laser"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {Object.keys(uploadingFiles).some(k => k.startsWith('laser-')) ? 'Uploading...' : 'Upload Laser Vector'}
                </Button>
              </label>
            </div>
          </div>

          <div>
            <Label className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4" />
              Instructions PDFs
            </Label>
            <div className="space-y-2">
              {formData.designFiles.instructionsPdfs.map((file: string, index: number) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded bg-gray-50">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="flex-1 text-sm truncate">{file.split('/').pop()}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDesignFileRemove('instructionsPdfs', index)}
                    data-testid={`button-delete-instructions-${index}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <label className="block">
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file, 'instructions')
                    e.target.value = ''
                  }}
                  data-testid="input-upload-instructions"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault()
                    e.currentTarget.previousElementSibling?.dispatchEvent(new MouseEvent('click'))
                  }}
                  disabled={!formData._id || Object.keys(uploadingFiles).some(k => k.startsWith('instructions-'))}
                  data-testid="button-upload-instructions"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {Object.keys(uploadingFiles).some(k => k.startsWith('instructions-')) ? 'Uploading...' : 'Upload PDF'}
                </Button>
              </label>
            </div>
          </div>

          <div>
            <Label className="flex items-center gap-2 mb-2">
              <ImageIcon className="h-4 w-4" />
              Photos
            </Label>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2 mb-2">
                {formData.designFiles.photos.map((file: string, index: number) => (
                  <div key={index} className="relative aspect-square border rounded overflow-hidden bg-gray-50">
                    <ImageIcon className="absolute inset-0 m-auto h-8 w-8 text-gray-400" />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-1 right-1 h-6 w-6 p-0"
                      onClick={() => handleDesignFileRemove('photos', index)}
                      data-testid={`button-delete-photo-${index}`}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file, 'photos')
                    e.target.value = ''
                  }}
                  data-testid="input-upload-photos"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault()
                    e.currentTarget.previousElementSibling?.dispatchEvent(new MouseEvent('click'))
                  }}
                  disabled={!formData._id || Object.keys(uploadingFiles).some(k => k.startsWith('photos-'))}
                  data-testid="button-upload-photos"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {Object.keys(uploadingFiles).some(k => k.startsWith('photos-')) ? 'Uploading...' : 'Upload Photo'}
                </Button>
              </label>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="assets" className="space-y-4 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {formData.assets.map((asset: any, index: number) => (
              <div 
                key={asset.id} 
                className={`relative cursor-pointer border-2 rounded overflow-hidden transition-all ${
                  selectedAssetIndex === index ? 'border-pop-green ring-2 ring-pop-green/20' : 'border-transparent hover:border-gray-300'
                }`}
                onClick={() => setSelectedAssetIndex(selectedAssetIndex === index ? null : index)}
                data-testid={`thumbnail-asset-${index}`}
              >
                <div className="aspect-square bg-gray-50 relative">
                  {asset.type === 'image' && asset.url ? (
                    <img
                      src={asset.url}
                      alt={asset.alt || 'Asset'}
                      className="w-full h-full object-cover"
                      data-testid={`img-asset-${index}`}
                    />
                  ) : asset.type === 'video' ? (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <FileText className="w-12 h-12 text-gray-400" />
                      <span className="mt-2 text-xs text-gray-500">Video</span>
                    </div>
                  ) : asset.type === 'document' ? (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <FileText className="w-12 h-12 text-gray-400" />
                      <span className="mt-2 text-xs text-gray-500">Document</span>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <File className="w-12 h-12 text-gray-400" />
                      <span className="mt-2 text-xs text-gray-500">3D Model</span>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  {asset.category && (
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="text-xs">
                        {asset.category === 'hero' && 'Hero'}
                        {asset.category === 'product_info' && 'Info'}
                        {asset.category === 'lifestyle' && 'Lifestyle'}
                        {asset.category === 'detail' && 'Detail'}
                        {asset.category === 'shop_listing' && 'Shop'}
                      </Badge>
                    </div>
                  )}
                  
                  {/* Primary Star */}
                  {asset.isPrimary && (
                    <div className="absolute top-2 right-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Selected Asset Editor */}
          {selectedAssetIndex !== null && formData.assets[selectedAssetIndex] && (
            <div className="p-4 border rounded bg-gray-50 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">Editing Asset {selectedAssetIndex + 1}</h4>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedAssetIndex(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      handleAssetFileRemove(selectedAssetIndex)
                      setSelectedAssetIndex(null)
                    }}
                    data-testid={`button-delete-asset-${selectedAssetIndex}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Asset ID</Label>
                  <Input
                    value={formData.assets[selectedAssetIndex].id}
                    onChange={(e) => handleAssetChange(selectedAssetIndex, 'id', e.target.value)}
                    className="h-8 text-sm mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Type</Label>
                  <select
                    value={formData.assets[selectedAssetIndex].type}
                    onChange={(e) => handleAssetChange(selectedAssetIndex, 'type', e.target.value)}
                    className="border rounded px-2 py-1 w-full h-8 text-sm mt-1"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                    <option value="model">3D Model</option>
                  </select>
                </div>
              </div>

              <div>
                <Label className="text-xs">Category</Label>
                <select
                  value={formData.assets[selectedAssetIndex].category || ''}
                  onChange={(e) => handleAssetChange(selectedAssetIndex, 'category', e.target.value || undefined)}
                  className="border rounded px-2 py-1 w-full h-8 text-sm mt-1"
                >
                  <option value="">No category</option>
                  <option value="hero">Hero</option>
                  <option value="product_info">Product Info</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="detail">Detail</option>
                  <option value="shop_listing">Shop Listing</option>
                </select>
              </div>

              <div>
                <Label className="text-xs">URL</Label>
                <Input
                  value={formData.assets[selectedAssetIndex].url}
                  onChange={(e) => handleAssetChange(selectedAssetIndex, 'url', e.target.value)}
                  placeholder="https://..."
                  className="h-8 text-sm mt-1"
                />
              </div>

              <div>
                <Label className="text-xs">Thumbnail URL</Label>
                <Input
                  value={formData.assets[selectedAssetIndex].thumbnail || ''}
                  onChange={(e) => handleAssetChange(selectedAssetIndex, 'thumbnail', e.target.value)}
                  placeholder="https://..."
                  className="h-8 text-sm mt-1"
                />
              </div>

              <div>
                <Label className="text-xs">Alt Text</Label>
                <Input
                  value={formData.assets[selectedAssetIndex].alt || ''}
                  onChange={(e) => handleAssetChange(selectedAssetIndex, 'alt', e.target.value)}
                  className="h-8 text-sm mt-1"
                />
              </div>

              <div>
                <Label className="text-xs">Description</Label>
                <Textarea
                  value={formData.assets[selectedAssetIndex].description || ''}
                  onChange={(e) => handleAssetChange(selectedAssetIndex, 'description', e.target.value)}
                  rows={2}
                  className="text-sm mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.assets[selectedAssetIndex].isPrimary || false}
                    onChange={(e) => handleAssetChange(selectedAssetIndex, 'isPrimary', e.target.checked)}
                    className="h-4 w-4"
                    id={`asset-primary-${selectedAssetIndex}`}
                  />
                  <Label htmlFor={`asset-primary-${selectedAssetIndex}`} className="text-xs">Primary Asset</Label>
                </div>
                <div>
                  <Label className="text-xs">Display Order</Label>
                  <Input
                    type="number"
                    value={formData.assets[selectedAssetIndex].order || 0}
                    onChange={(e) => handleAssetChange(selectedAssetIndex, 'order', parseInt(e.target.value) || 0)}
                    className="h-8 text-sm mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <label className="block">
              <input
                type="file"
                accept="image/*,video/*,.pdf,.doc,.docx,.obj,.stl,.fbx,.gltf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileUpload(file, 'assets')
                  e.target.value = ''
                }}
                data-testid="input-upload-asset"
              />
              <Button
                variant="outline"
                className="w-full"
                onClick={(e) => {
                  e.preventDefault()
                  e.currentTarget.previousElementSibling?.dispatchEvent(new MouseEvent('click'))
                }}
                disabled={!formData._id || Object.keys(uploadingFiles).some(k => k.startsWith('assets-'))}
                data-testid="button-upload-asset"
              >
                <Upload className="h-4 w-4 mr-2" />
                {Object.keys(uploadingFiles).some(k => k.startsWith('assets-')) ? 'Uploading...' : 'Upload Asset'}
              </Button>
            </label>
            <Button
              variant="outline"
              onClick={handleAssetAdd}
              className="w-full"
              data-testid="button-add-asset"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Asset (Manual)
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-2 mt-6 pt-4 border-t">
        <Button
          onClick={() => onSave(formData)}
          disabled={isSaving}
          className="flex-1 bg-pop-green hover:bg-pop-green/90"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? (isAdding ? 'Adding...' : 'Saving...') : (isAdding ? 'Add Product' : 'Save Changes')}
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isSaving}
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        {!isAdding && onDelete && (
          <Button
            variant="destructive"
            onClick={() => onDelete()}
            disabled={isSaving}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        )}
      </div>

      <AssetLightbox
        isOpen={lightbox.isOpen}
        onClose={closeLightbox}
        assets={lightbox.assets}
        currentIndex={lightbox.currentIndex}
        onNavigate={navigateLightbox}
      />
    </div>
  )
}
