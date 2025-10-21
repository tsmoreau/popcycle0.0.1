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
  FileText, Edit2
} from "lucide-react"

interface Product {
  _id: string
  name: string
  description: string
  category: 'workshop' | 'studio_edition' | 'client_edition'
  productType: 'coasters' | 'keychains' | 'bookmarks' | 'magnets' | 'earrings' | 'lighting' | 'cutting_boards'
  designFiles?: {
    cncVectors?: string[]
    laserVectors?: string[]
    instructionsPdfs?: string[]
    photos?: string[]
  }
  assets?: Array<{
    id: string
    type: 'image' | 'video' | 'document' | 'model'
    url: string
    thumbnail?: string
    alt?: string
    description?: string
    isPrimary?: boolean
    order?: number
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

  useEffect(() => {
    if (item) {
      setFormData({
        _id: item._id || '',
        name: item.name || '',
        description: item.description || '',
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
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleDesignFileAdd = (field: keyof typeof formData.designFiles) => {
    const mockUrl = `https://s3.example.com/files/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.pdf`
    setFormData((prev: any) => ({
      ...prev,
      designFiles: {
        ...prev.designFiles,
        [field]: [...prev.designFiles[field], mockUrl]
      }
    }))
  }

  const handleDesignFileRemove = (field: keyof typeof formData.designFiles, index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      designFiles: {
        ...prev.designFiles,
        [field]: prev.designFiles[field].filter((_: any, i: number) => i !== index)
      }
    }))
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
              {formData.designFiles.cncVectors.map((file: string, index: number) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <span className="flex-1 text-sm truncate">{file}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDesignFileRemove('cncVectors', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDesignFileAdd('cncVectors')}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload CNC Vector
              </Button>
            </div>
          </div>

          <div>
            <Label className="flex items-center gap-2 mb-2">
              <File className="h-4 w-4" />
              Laser Vectors
            </Label>
            <div className="space-y-2">
              {formData.designFiles.laserVectors.map((file: string, index: number) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <span className="flex-1 text-sm truncate">{file}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDesignFileRemove('laserVectors', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDesignFileAdd('laserVectors')}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Laser Vector
              </Button>
            </div>
          </div>

          <div>
            <Label className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4" />
              Instructions PDFs
            </Label>
            <div className="space-y-2">
              {formData.designFiles.instructionsPdfs.map((file: string, index: number) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <span className="flex-1 text-sm truncate">{file}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDesignFileRemove('instructionsPdfs', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDesignFileAdd('instructionsPdfs')}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload PDF
              </Button>
            </div>
          </div>

          <div>
            <Label className="flex items-center gap-2 mb-2">
              <ImageIcon className="h-4 w-4" />
              Photos
            </Label>
            <div className="space-y-2">
              {formData.designFiles.photos.map((file: string, index: number) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <span className="flex-1 text-sm truncate">{file}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDesignFileRemove('photos', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDesignFileAdd('photos')}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="assets" className="space-y-4 max-h-96 overflow-y-auto">
          {formData.assets.map((asset: any, index: number) => (
            <div key={asset.id} className="p-4 border rounded space-y-3">
              <div className="flex items-center justify-between">
                <Badge>{asset.type}</Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleAssetRemove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Asset ID</Label>
                  <Input
                    value={asset.id}
                    onChange={(e) => handleAssetChange(index, 'id', e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs">Type</Label>
                  <select
                    value={asset.type}
                    onChange={(e) => handleAssetChange(index, 'type', e.target.value)}
                    className="border rounded px-2 py-1 w-full h-8 text-sm"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                    <option value="model">3D Model</option>
                  </select>
                </div>
              </div>

              <div>
                <Label className="text-xs">URL</Label>
                <Input
                  value={asset.url}
                  onChange={(e) => handleAssetChange(index, 'url', e.target.value)}
                  placeholder="https://..."
                  className="h-8 text-sm"
                />
              </div>

              <div>
                <Label className="text-xs">Thumbnail URL</Label>
                <Input
                  value={asset.thumbnail || ''}
                  onChange={(e) => handleAssetChange(index, 'thumbnail', e.target.value)}
                  placeholder="https://..."
                  className="h-8 text-sm"
                />
              </div>

              <div>
                <Label className="text-xs">Alt Text</Label>
                <Input
                  value={asset.alt || ''}
                  onChange={(e) => handleAssetChange(index, 'alt', e.target.value)}
                  className="h-8 text-sm"
                />
              </div>

              <div>
                <Label className="text-xs">Description</Label>
                <Textarea
                  value={asset.description || ''}
                  onChange={(e) => handleAssetChange(index, 'description', e.target.value)}
                  rows={2}
                  className="text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={asset.isPrimary || false}
                    onChange={(e) => handleAssetChange(index, 'isPrimary', e.target.checked)}
                    className="h-4 w-4"
                  />
                  <Label className="text-xs">Primary Asset</Label>
                </div>
                <div>
                  <Label className="text-xs">Display Order</Label>
                  <Input
                    type="number"
                    value={asset.order || 0}
                    onChange={(e) => handleAssetChange(index, 'order', parseInt(e.target.value) || 0)}
                    className="h-8 text-sm"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={handleAssetAdd}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Asset
          </Button>
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
    </div>
  )
}
