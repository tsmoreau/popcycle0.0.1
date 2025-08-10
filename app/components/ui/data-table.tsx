"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { Input } from "./input"
import { Textarea } from "./textarea"
import { Label } from "./label"
import { ArrowUpDown, Edit2, Save, X, Columns, Filter, ChevronDown } from "lucide-react"
// Note: We'll implement column selection and filtering with basic HTML elements for now

export interface Column<T> {
  key: keyof T | string
  header: string
  sortable?: boolean
  render?: (item: T) => React.ReactNode
}

export interface EditableField<T> {
  key: keyof T | string
  label: string
  type: 'text' | 'textarea' | 'select' | 'number' | 'email' | 'nested' | 'readonly'
  options?: { value: string; label: string }[]
  nested?: EditableField<any>[]
  required?: boolean
  placeholder?: string
  className?: string
  render?: (item: T) => React.ReactNode
}

export interface DataTableProps<T> {
  title: string
  description: string
  icon?: React.ReactNode
  data: T[]
  columns: Column<T>[]
  editableFields?: EditableField<T>[]
  onSave?: (item: T) => Promise<void>
  onDelete?: (item: T) => Promise<void>
  className?: string
  // External sorting state (optional)
  sortField?: string
  sortDirection?: SortDirection
  onSort?: (field: string, direction: SortDirection) => void
  // Legacy support for custom modals
  renderModal?: (item: T) => React.ReactNode
  // Column selection and filtering (optional)
  availableColumns?: Column<T>[]
  defaultVisibleColumns?: string[]
  enableColumnSelection?: boolean
  enableFiltering?: boolean
}

type SortDirection = "asc" | "desc"

export function DataTable<T extends Record<string, any>>({
  title,
  description,
  icon,
  data,
  columns,
  editableFields,
  onSave,
  onDelete,
  className = "",
  sortField: externalSortField,
  sortDirection: externalSortDirection,
  onSort,
  renderModal,
  availableColumns,
  defaultVisibleColumns,
  enableColumnSelection = false,
  enableFiltering = false
}: DataTableProps<T>) {
  const [internalSortField, setInternalSortField] = useState<string>("")
  const [internalSortDirection, setInternalSortDirection] = useState<SortDirection>("asc")
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState<T | null>(null)
  const [editFormData, setEditFormData] = useState<Record<string, any>>({})
  const [isSaving, setIsSaving] = useState(false)
  
  // Column selection state
  const allColumns = availableColumns || columns
  const [visibleColumnKeys, setVisibleColumnKeys] = useState<string[]>(() => {
    if (defaultVisibleColumns) return defaultVisibleColumns
    return columns.map(col => String(col.key))
  })
  
  // Filtering state
  const [columnFilters, setColumnFilters] = useState<Record<string, any>>({})
  
  // Get visible columns based on selection
  const visibleColumns = allColumns.filter(col => visibleColumnKeys.includes(String(col.key)))
  
  // Use external state if provided, otherwise use internal state
  const sortField = externalSortField !== undefined ? externalSortField : internalSortField
  const sortDirection = externalSortDirection !== undefined ? externalSortDirection : internalSortDirection
  
  // Apply filters to data
  const filteredData = data.filter(item => {
    return Object.entries(columnFilters).every(([columnKey, filterValue]) => {
      if (!filterValue) return true // No filter applied
      
      const itemValue = item[columnKey]
      if (itemValue == null) return false
      
      // Handle different filter types
      if (typeof filterValue === 'string') {
        return String(itemValue).toLowerCase().includes(filterValue.toLowerCase())
      }
      if (typeof filterValue === 'object' && filterValue.min !== undefined) {
        // Number range filter
        const numValue = Number(itemValue)
        return numValue >= (filterValue.min || -Infinity) && numValue <= (filterValue.max || Infinity)
      }
      
      return String(itemValue).toLowerCase() === String(filterValue).toLowerCase()
    })
  })
  
  // Handle column selection toggle
  const toggleColumn = (columnKey: string) => {
    setVisibleColumnKeys(prev => {
      const newKeys = prev.includes(columnKey)
        ? prev.filter(key => key !== columnKey)
        : [...prev, columnKey]
      
      // Persist to localStorage
      if (enableColumnSelection) {
        localStorage.setItem(`datatable-columns-${title}`, JSON.stringify(newKeys))
      }
      return newKeys
    })
  }
  
  // Handle filter change
  const handleFilterChange = (columnKey: string, value: any) => {
    setColumnFilters(prev => ({
      ...prev,
      [columnKey]: value || undefined
    }))
  }
  
  // Clear all filters
  const clearAllFilters = () => {
    setColumnFilters({})
  }

  const handleSort = (field: string) => {
    const newDirection = sortField === field ? (sortDirection === "asc" ? "desc" : "asc") : "asc"
    
    if (onSort) {
      // Use external state handler
      onSort(field, newDirection)
    } else {
      // Use internal state
      if (sortField === field) {
        setInternalSortDirection(sortDirection === "asc" ? "desc" : "asc")
      } else {
        setInternalSortField(field)
        setInternalSortDirection("asc")
      }
    }
  }

  const handleMobileSort = (value: string) => {
    const [field, direction] = value.split('-')
    
    if (onSort) {
      // Use external state handler
      onSort(field, direction as SortDirection)
    } else {
      // Use internal state
      setInternalSortField(field)
      setInternalSortDirection(direction as SortDirection)
    }
  }

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0
    
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const getSortIndicator = (field: string) => {
    if (sortField === field) {
      return sortDirection === "asc" ? " ↑" : " ↓"
    }
    return ""
  }

  const getCellValue = (item: T, column: Column<T>) => {
    if (column.render) {
      return column.render(item)
    }
    return item[column.key as keyof T]
  }

  const handleEdit = (item: T) => {
    setEditingItem(item)
    setEditFormData({ ...item })
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingItem(null)
    setEditFormData({})
  }

  const handleSave = async () => {
    if (!editingItem || !onSave) return
    
    try {
      setIsSaving(true)
      await onSave(editFormData as T)
      setIsEditing(false)
      setEditingItem(null)
      setEditFormData({})
    } catch (error) {
      console.error('Error saving:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!editingItem || !onDelete) return
    
    try {
      setIsSaving(true)
      await onDelete(editingItem)
      setIsEditing(false)
      setEditingItem(null)
      setEditFormData({})
    } catch (error) {
      console.error('Error deleting:', error)
    } finally {
      setIsSaving(false)
    }
  }

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

  const renderEditModal = (item: T) => (
    <div>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Edit2 className="h-5 w-5" />
          Edit {title.replace(' Management', '').replace(' Configuration', '')}
        </DialogTitle>
        <DialogDescription>
          Make changes to this item. All database fields are shown below.
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 mt-4 max-h-96 overflow-y-auto">
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
        
        {/* Show read-only fields that aren't in editableFields */}
        {allColumns.filter(col => !editableFields?.some(field => field.key === col.key)).map(column => {
          const value = item[column.key as string]
          return (
            <div key={`readonly-${String(column.key)}`} className="opacity-75">
              <Label className="text-sm font-medium text-gray-600">
                {column.header} (Read-only)
              </Label>
              <div className="mt-1 p-2 bg-gray-50 rounded text-sm">
                {column.render ? column.render(item) : String(value || 'Not provided')}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex gap-2 mt-6">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="flex-1 bg-pop-green hover:bg-pop-green/90"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
        <Button
          variant="outline"
          onClick={handleCancelEdit}
          disabled={isSaving}
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        {onDelete && (
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isSaving}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  )

  const renderNestedValue = (value: any, nestedFields?: EditableField<any>[]) => {
    if (!value || typeof value !== 'object') return String(value || 'Not provided')
    
    return (
      <div className="ml-4 space-y-1">
        {nestedFields?.map(nestedField => {
          const nestedValue = value[nestedField.key as string]
          return (
            <div key={String(nestedField.key)} className="text-sm">
              <span className="font-medium">{nestedField.label}:</span>{' '}
              {String(nestedValue || 'Not provided')}
            </div>
          )
        }) || Object.entries(value).map(([key, val]) => (
          <div key={key} className="text-sm">
            <span className="font-medium">{key}:</span> {String(val || 'Not provided')}
          </div>
        ))}
      </div>
    )
  }

  const renderViewModal = (item: T) => (
    <div>
      <DialogHeader>
        <DialogTitle>{getCellValue(item, allColumns[0])}</DialogTitle>
        <DialogDescription>
          View complete database record details.
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-3 mt-4 max-h-96 overflow-y-auto">
        {allColumns.map(column => {
          const value = item[column.key as string]
          return (
            <div key={String(column.key)} className="grid grid-cols-3 gap-4 py-2 border-b border-gray-100">
              <div className="font-medium text-sm text-gray-700 truncate">
                {column.header}:
              </div>
              <div className="col-span-2 text-sm text-gray-900">
                {column.render ? column.render(item) : String(value || 'Not provided')}
              </div>
            </div>
          )
        })}
      </div>

      <div className="pt-4 space-y-2">
        {editableFields && (
          <Button
            className="w-full bg-pop-green hover:bg-pop-green/90"
            onClick={() => handleEdit(item)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit {title.replace(' Management', '').replace(' Configuration', '')}
          </Button>
        )}
      </div>
    </div>
  )

  // Column selection UI state
  const [showColumnSelector, setShowColumnSelector] = useState(false)
  
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {icon}
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex gap-2">
            {enableFiltering && Object.keys(columnFilters).length > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Clear Filters
              </Button>
            )}
            {enableColumnSelection && (
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowColumnSelector(!showColumnSelector)}
                  className="text-xs"
                >
                  <Columns className="h-3 w-3 mr-1" />
                  Columns ({visibleColumns.length})
                </Button>
                {showColumnSelector && (
                  <div className="absolute right-0 top-full mt-2 bg-white border rounded-lg shadow-lg p-3 w-64 z-10">
                    <div className="text-sm font-medium mb-2">Select Columns</div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {allColumns.map(column => (
                        <label key={String(column.key)} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={visibleColumnKeys.includes(String(column.key))}
                            onChange={() => toggleColumn(String(column.key))}
                            className="rounded"
                          />
                          <span>{column.header}</span>
                        </label>
                      ))}
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setShowColumnSelector(false)}
                      className="w-full mt-2 text-xs"
                    >
                      Done
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              {/* Filter Row */}
              {enableFiltering && (
                <TableRow>
                  {visibleColumns.map((column) => (
                    <TableHead key={`filter-${String(column.key)}`} className="p-2">
                      <Input
                        placeholder={`Filter ${column.header.toLowerCase()}...`}
                        value={columnFilters[String(column.key)] || ''}
                        onChange={(e) => handleFilterChange(String(column.key), e.target.value)}
                        className="text-xs h-8"
                      />
                    </TableHead>
                  ))}
                </TableRow>
              )}
              {/* Header Row */}
              <TableRow>
                {visibleColumns.map((column) => (
                  <TableHead
                    key={String(column.key)}
                    onClick={column.sortable !== false ? () => handleSort(String(column.key)) : undefined}
                    className={column.sortable !== false ? "cursor-pointer hover:bg-gray-50" : ""}
                  >
                    {column.header}
                    {column.sortable !== false && getSortIndicator(String(column.key))}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((item, index) => {
                const hasModal = renderModal || editableFields
                const RowContent = (
                  <TableRow className={hasModal ? "cursor-pointer hover:bg-gray-50" : ""}>
                    {visibleColumns.map((column) => (
                      <TableCell
                        key={String(column.key)}
                        className={column.key === visibleColumns[0].key ? "font-medium" : ""}
                      >
                        {getCellValue(item, column)}
                      </TableCell>
                    ))}
                  </TableRow>
                )

                if (hasModal) {
                  return (
                    <Dialog key={index} open={isEditing && editingItem === item ? true : undefined}>
                      <DialogTrigger asChild>
                        {RowContent}
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        {isEditing && editingItem === item ? 
                          renderEditModal(item) : 
                          renderModal ? renderModal(item) : renderViewModal(item)
                        }
                      </DialogContent>
                    </Dialog>
                  )
                }

                return <div key={index}>{RowContent}</div>
              })}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          {/* Mobile Sort Controls */}
          <div className="mb-4 flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-pop-green" />
            <select 
              value={sortField ? `${sortField}-${sortDirection}` : ""} 
              onChange={(e) => handleMobileSort(e.target.value)}
              className="border rounded px-3 py-2 text-sm w-48"
            >
              <option value="">Sort by...</option>
              {visibleColumns.filter(col => col.sortable !== false).map((column) => (
                <optgroup key={String(column.key)} label={column.header}>
                  <option value={`${String(column.key)}-asc`}>
                    {column.header} (A-Z)
                  </option>
                  <option value={`${String(column.key)}-desc`}>
                    {column.header} (Z-A)
                  </option>
                </optgroup>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            {sortedData.map((item, index) => {
              const hasModal = renderModal || editableFields
              const CardContent = (
                <div className={`p-4 border rounded-lg bg-white ${hasModal ? "cursor-pointer hover:bg-gray-50" : ""}`}>
                  <div className="space-y-2">
                    {visibleColumns.map((column, colIndex) => (
                      <div key={String(column.key)} className={`flex justify-between items-start ${colIndex === 0 ? "mb-3" : ""}`}>
                        <span className={`text-sm font-medium text-gray-600 ${colIndex === 0 ? "text-base font-semibold text-black" : ""}`}>
                          {colIndex === 0 ? "" : `${column.header}:`}
                        </span>
                        <span className={`text-sm text-right ${colIndex === 0 ? "text-base font-semibold text-black w-full text-left" : "ml-2 flex-shrink-0"}`}>
                          {getCellValue(item, column)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )

              if (hasModal) {
                return (
                  <Dialog key={index} open={isEditing && editingItem === item ? true : undefined}>
                    <DialogTrigger asChild>
                      {CardContent}
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      {isEditing && editingItem === item ? 
                        renderEditModal(item) : 
                        renderModal ? renderModal(item) : renderViewModal(item)
                      }
                    </DialogContent>
                  </Dialog>
                )
              }

              return <div key={index}>{CardContent}</div>
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}