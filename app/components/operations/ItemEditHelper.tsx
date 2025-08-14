import { EditableField } from "../ui/data-table"
import { binEditableFields, batchEditableFields, blankEditableFields } from "./TableConfigurations"
import { Bin, Batch, Blank } from "../../../lib/schemas"

// Helper to determine item type and return appropriate editable fields
export function getEditableFieldsForItem(item: any): { fields: EditableField<any>[], itemType: string } | null {
  if (!item || !item.type) return null

  switch (item.type) {
    case 'bin':
      return {
        fields: binEditableFields,
        itemType: 'Bin'
      }
    case 'batch':
      return {
        fields: batchEditableFields,
        itemType: 'Batch'
      }
    case 'blank':
      return {
        fields: blankEditableFields,
        itemType: 'Blank'
      }
    default:
      return null
  }
}

// Helper to determine API endpoint for saving
export function getApiEndpointForItem(item: any): string | null {
  if (!item || !item.type) return null

  switch (item.type) {
    case 'bin':
      return '/api/operations/bins'
    case 'batch':
      return '/api/operations/batches'
    case 'blank':
      return '/api/operations/blanks'
    default:
      return null
  }
}

// Helper to create save function
export async function saveItemData(item: any, updatedData: any): Promise<void> {
  const endpoint = getApiEndpointForItem(item)
  if (!endpoint) {
    throw new Error('Unable to determine API endpoint for this item type')
  }

  // Follow the same pattern as the working data table - merge updated data with original item
  const dataToSend = {
    ...item,
    ...updatedData
  }

  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to save item: ${response.status} ${errorText}`)
  }

  return response.json()
}