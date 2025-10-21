"use client"

import { useState } from "react"
import { Product } from "@/lib/schemas-v3"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Badge } from "./ui/badge"
import { 
  Save, X, Plus, Trash2, Upload, File, Image as ImageIcon,
  Video, FileText, Box
} from "lucide-react"

interface ProductEditModalProps {
  product: Product | null
  isAdding: boolean
  onSave: (productData: any) => Promise<void>
  onCancel: () => void
  onDelete?: () => Promise<void>
  isSaving: boolean
}

export function ProductEditModal({
  product,
  isAdding,
  onSave,
  onCancel,
  onDelete,
  isSaving
}: ProductEditModalProps) {
  // Basic Info State
  const [name, setName] = useState(product?.name || "")
  const [description, setDescription] = useState(product?.description || "")
  const [category, setCategory] = useState(product?.category || "workshop")
  const [productType, setProductType] = useState(product?.productType || "coasters")
  const [price, setPrice] = useState(product?.price || 0)
  const [inStock, setInStock] = useState(product?.inStock ?? true)
  const [rating, setRating] = useState(product?.rating || 0)
  const [reviewCount, setReviewCount] = useState(product?.reviewCount || 0)

  // Design Files State
  const [cncVectors, setCncVectors] = useState<string[]>(
    product?.designFiles?.cncVectors || []
  )
  const [laserVectors, setLaserVectors] = useState<string[]>(
    product?.designFiles?.laserVectors || []
  )
  const [instructionsPdfs, setInstructionsPdfs] = useState<string[]>(
    product?.designFiles?.instructionsPdfs || []
  )
  const [photos, setPhotos] = useState<string[]>(
    product?.designFiles?.photos || []
  )

  // Assets State
  const [assets, setAssets] = useState<Array<{
    id: string
    type: "image" | "video" | "document" | "model"
    url: string
    thumbnail?: string
    alt?: string
    description?: string
    isPrimary?: boolean
    order?: number
  }>>(product?.assets || [])

  const handleSave = async () => {
    const productData = {
      ...(product || {}),
      name,
      description,
      category,
      productType,
      price,
      inStock,
      rating,
      reviewCount,
      designFiles: {
        cncVectors,
        laserVectors,
        instructionsPdfs,
        photos
      },
      assets
    }
    await onSave(productData)
  }

  // Mock file upload handler - generates placeholder URL
  const handleFileUpload = (
    fileList: string[],
    setFileList: (files: string[]) => void
  ) => {
    // In real implementation, this would upload to S3
    const mockUrl = `https://s3.example.com/files/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.pdf`
    setFileList([...fileList, mockUrl])
  }

  const removeFile = (
    fileList: string[],
    setFileList: (files: string[]) => void,
    index: number
  ) => {
    setFileList(fileList.filter((_, i) => i !== index))
  }

  const addAsset = () => {
    setAssets([
      ...assets,
      {
        id: `asset-${Date.now()}`,
        type: "image",
        url: "",
        order: assets.length
      }
    ])
  }

  const removeAsset = (index: number) => {
    setAssets(assets.filter((_, i) => i !== index))
  }

  const updateAsset = (index: number, field: string, value: any) => {
    const updated = [...assets]
    updated[index] = { ...updated[index], [field]: value }
    setAssets(updated)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {isAdding ? "Add New Product" : "Edit Product"}
        </h2>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="design">Design Files</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic" className="space-y-4 max-h-96 overflow-y-auto">
          <div>
            <Label>Product ID</Label>
            <Input value={product?._id?.toString() || "Auto-generated"} disabled />
          </div>

          <div>
            <Label>Name *</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
            />
          </div>

          <div>
            <Label>Description *</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the product"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Category *</Label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
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
                value={productType}
                onChange={(e) => setProductType(e.target.value as any)}
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
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                step="0.01"
              />
            </div>

            <div>
              <Label>In Stock</Label>
              <select
                value={inStock ? "true" : "false"}
                onChange={(e) => setInStock(e.target.value === "true")}
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
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value) || 0)}
                min="0"
                max="5"
                step="0.1"
              />
            </div>

            <div>
              <Label>Review Count</Label>
              <Input
                type="number"
                value={reviewCount}
                onChange={(e) => setReviewCount(parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
          </div>
        </TabsContent>

        {/* Design Files Tab */}
        <TabsContent value="design" className="space-y-6 max-h-96 overflow-y-auto">
          {/* CNC Vectors */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <File className="h-4 w-4" />
              CNC Vectors
            </Label>
            <div className="space-y-2">
              {cncVectors.map((file, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <span className="flex-1 text-sm truncate">{file}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFile(cncVectors, setCncVectors, index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFileUpload(cncVectors, setCncVectors)}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload CNC Vector
              </Button>
            </div>
          </div>

          {/* Laser Vectors */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <File className="h-4 w-4" />
              Laser Vectors
            </Label>
            <div className="space-y-2">
              {laserVectors.map((file, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <span className="flex-1 text-sm truncate">{file}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFile(laserVectors, setLaserVectors, index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFileUpload(laserVectors, setLaserVectors)}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Laser Vector
              </Button>
            </div>
          </div>

          {/* Instructions PDFs */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4" />
              Instructions PDFs
            </Label>
            <div className="space-y-2">
              {instructionsPdfs.map((file, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <span className="flex-1 text-sm truncate">{file}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFile(instructionsPdfs, setInstructionsPdfs, index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFileUpload(instructionsPdfs, setInstructionsPdfs)}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload PDF
              </Button>
            </div>
          </div>

          {/* Photos */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <ImageIcon className="h-4 w-4" />
              Photos
            </Label>
            <div className="space-y-2">
              {photos.map((file, index) => (
                <div key={index} className="flex items-center gap-2 p-2 border rounded">
                  <span className="flex-1 text-sm truncate">{file}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFile(photos, setPhotos, index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFileUpload(photos, setPhotos)}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Assets Tab */}
        <TabsContent value="assets" className="space-y-4 max-h-96 overflow-y-auto">
          {assets.map((asset, index) => (
            <div key={asset.id} className="p-4 border rounded space-y-3">
              <div className="flex items-center justify-between">
                <Badge>{asset.type}</Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeAsset(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Asset ID</Label>
                  <Input
                    value={asset.id}
                    onChange={(e) => updateAsset(index, "id", e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>

                <div>
                  <Label className="text-xs">Type</Label>
                  <select
                    value={asset.type}
                    onChange={(e) => updateAsset(index, "type", e.target.value)}
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
                  onChange={(e) => updateAsset(index, "url", e.target.value)}
                  placeholder="https://..."
                  className="h-8 text-sm"
                />
              </div>

              <div>
                <Label className="text-xs">Thumbnail URL</Label>
                <Input
                  value={asset.thumbnail || ""}
                  onChange={(e) => updateAsset(index, "thumbnail", e.target.value)}
                  placeholder="https://..."
                  className="h-8 text-sm"
                />
              </div>

              <div>
                <Label className="text-xs">Alt Text</Label>
                <Input
                  value={asset.alt || ""}
                  onChange={(e) => updateAsset(index, "alt", e.target.value)}
                  className="h-8 text-sm"
                />
              </div>

              <div>
                <Label className="text-xs">Description</Label>
                <Textarea
                  value={asset.description || ""}
                  onChange={(e) => updateAsset(index, "description", e.target.value)}
                  rows={2}
                  className="text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={asset.isPrimary || false}
                    onChange={(e) => updateAsset(index, "isPrimary", e.target.checked)}
                    className="h-4 w-4"
                  />
                  <Label className="text-xs">Primary Asset</Label>
                </div>

                <div>
                  <Label className="text-xs">Display Order</Label>
                  <Input
                    type="number"
                    value={asset.order || 0}
                    onChange={(e) => updateAsset(index, "order", parseInt(e.target.value) || 0)}
                    className="h-8 text-sm"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={addAsset}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Asset
          </Button>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-6 pt-4 border-t">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="flex-1 bg-pop-green hover:bg-pop-green/90"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? (isAdding ? "Adding..." : "Saving...") : (isAdding ? "Add Product" : "Save Changes")}
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
            onClick={onDelete}
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
