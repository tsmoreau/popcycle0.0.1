"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog"
import { Button } from "./button"
import { Input } from "./input"
import { Textarea } from "./textarea"
import { Label } from "./label"
import { Edit2, Save, X } from "lucide-react"
import { EditableField } from "./data-table"

export interface EditItemModalProps<T> {
  item: T | null
  editableFields: EditableField<T>[]
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSave: (item: T) => Promise<void>
  title: string
  isLoading?: boolean
}

export function EditItemModal<T extends Record<string, any>>({
  item,
  editableFields,
  isOpen,
  onOpenChange,
  onSave,
  title,
  isLoading = false
}: EditItemModalProps<T>) {
  const [editFormData, setEditFormData] = useState<Record<string, any>>({})
  const [isSaving, setIsSaving] = useState(false)

  // Initialize form data when item changes
  useEffect(() => {
    if (item) {
      // Ensure _id is set from id if needed
      const formData = { ...item };
      if ((item as any).id && !(item as any)._id) {
        (formData as any)._id = (item as any).id;
      }
      setEditFormData(formData);
    }
  }, [item])

  const handleFieldChange = (fieldKey: string, value: any) => {
    setEditFormData(prev => ({
      ...prev,
      [fieldKey]: value
    }))
  }

  const handleNestedFieldChange = (parentKey: string, nestedKey: string, value: any) => {
    setEditFormData(prev => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [nestedKey]: value
      }
    }))
  }

  const handleSave = async () => {
    if (!item) return
    
    try {
      setIsSaving(true)
      await onSave(editFormData as T)
      onOpenChange(false)
    } catch (error) {
      console.error('Error saving:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    // Reset form data to original item data
    if (item) {
      setEditFormData({ ...item })
    }
    onOpenChange(false)
  }

  const renderField = (field: EditableField<T>, value: any, onChange: (value: any) => void) => {
    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className={field.className}
            rows={3}
          />
        )
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`border rounded px-3 py-2 w-full ${field.className || ''}`}
          >
            <option value="">Select...</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            placeholder={field.placeholder}
            className={field.className}
          />
        )
      case 'email':
        return (
          <Input
            type="email"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className={field.className}
          />
        )
      case 'readonly':
        return (
          <div className="px-3 py-2 bg-gray-50 border rounded text-gray-600">
            {field.render ? field.render(editFormData as T) : value}
          </div>
        )
      case 'nested':
        return (
          <div className="space-y-3 p-3 border rounded bg-gray-50">
            {field.nested?.map(nestedField => (
              <div key={String(nestedField.key)}>
                <Label className="text-sm font-medium">{nestedField.label}</Label>
                {renderField(
                  nestedField,
                  value?.[nestedField.key as string],
                  (newValue) => handleNestedFieldChange(String(field.key), String(nestedField.key), newValue)
                )}
              </div>
            ))}
          </div>
        )
      default:
        return (
          <Input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className={field.className}
          />
        )
    }
  }

  if (!item) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[90vh] overflow-hidden flex flex-col border-0 sm:border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit2 className="h-5 w-5" />
            Edit {title}
          </DialogTitle>
          <DialogDescription>
            Make changes to this item. All fields are shown below.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4 overflow-y-auto flex-1">
          {editableFields?.map(field => {
            const value = editFormData[field.key as string]
            return (
              <div key={String(field.key)}>
                <Label className="text-sm font-medium">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                <div className="mt-1">
                  {renderField(
                    field,
                    value,
                    (newValue) => handleFieldChange(String(field.key), newValue)
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex gap-2 mt-6 pt-4 border-t">
          <Button
            onClick={handleSave}
            disabled={isSaving || isLoading}
            className="flex-1 bg-pop-green hover:bg-pop-green/90"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSaving || isLoading}
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}