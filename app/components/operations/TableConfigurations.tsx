import { Badge } from "../ui/badge";
import { Column, EditableField } from "../ui/data-table";
import { Bin, Batch, Order, Blank } from "../../../lib/schemas";
import {
  getStatusBadge,
  getProcessingStatusBadge,
  getMaterialTypeBadge,
  getFulfillmentStatusBadge,
} from "./StatusBadges";

// COMPLETE Bin editing configuration - ALL database fields
export const binEditableFields: EditableField<Bin>[] = [
  { key: '_id', label: 'Bin ID', type: 'readonly' },
  { key: 'orgId', label: 'Organization ID', type: 'readonly' },
  { key: 'eventId', label: 'Event ID', type: 'text', placeholder: 'Optional event reference' },
  { key: 'name', label: 'Bin Name', type: 'text', required: true, placeholder: 'Enter bin name' },
  { key: 'location', label: 'Location', type: 'text', required: true, placeholder: 'Physical location' },
  { 
    key: 'type', 
    label: 'Bin Type', 
    type: 'select', 
    required: true,
    options: [
      { value: 'permanent', label: 'Permanent' },
      { value: 'temporary', label: 'Temporary' }
    ]
  },
  { 
    key: 'status', 
    label: 'Status', 
    type: 'select', 
    required: true,
    options: [
      { value: 'bin_on_vehicle', label: 'On Vehicle' },
      { value: 'bin_on_site', label: 'On Site' },
      { value: 'ready_for_processing', label: 'Ready for Processing' }
    ]
  },
  { key: 'capacity', label: 'Capacity (kg)', type: 'number', placeholder: 'Bin capacity in kg' },
  { 
    key: 'isActive', 
    label: 'Active Status', 
    type: 'select', 
    required: true,
    options: [
      { value: 'true', label: 'Active' },
      { value: 'false', label: 'Inactive' }
    ]
  },
  { 
    key: 'canBeAdopted', 
    label: 'Can Be Adopted', 
    type: 'select', 
    required: true,
    options: [
      { value: 'true', label: 'Yes' },
      { value: 'false', label: 'No' }
    ]
  },
  { key: 'adoptedBy', label: 'Adopted By', type: 'text', placeholder: 'Team/department that adopted this bin' },
  { key: 'lastCollectionDate', label: 'Last Collection Date', type: 'text', placeholder: 'YYYY-MM-DD format' },
  { key: 'nextCollectionDate', label: 'Next Collection Date', type: 'text', placeholder: 'YYYY-MM-DD format' },
  { key: 'createdAt', label: 'Created At', type: 'readonly' },
  { key: 'updatedAt', label: 'Updated At', type: 'readonly' }
];

// COMPLETE Batch editing configuration - ALL database fields
export const batchEditableFields: EditableField<Batch>[] = [
  { key: '_id', label: 'Batch ID', type: 'readonly' },
  { key: 'binIds', label: 'Source Bins', type: 'readonly' },
  { key: 'collectionDate', label: 'Collection Date', type: 'text', required: true, placeholder: 'YYYY-MM-DD format' },
  { key: 'weight', label: 'Weight (kg)', type: 'number', required: true, placeholder: 'Weight in kg' },
  { 
    key: 'materialType', 
    label: 'Material Type', 
    type: 'select', 
    required: true,
    options: [
      { value: 'HDPE', label: 'HDPE' },
      { value: 'PET', label: 'PET' },
      { value: 'PP', label: 'PP' },
      { value: 'mixed', label: 'Mixed' }
    ]
  },
  { key: 'collectedBy', label: 'Collected By', type: 'text', required: true, placeholder: 'Collector name' },
  { 
    key: 'status', 
    label: 'Processing Status', 
    type: 'select', 
    required: true,
    options: [
      { value: 'collected', label: 'Collected' },
      { value: 'rough_wash', label: 'Rough Wash' },
      { value: 'sort', label: 'Sort' },
      { value: 'first_dry', label: 'First Dry' },
      { value: 'shred', label: 'Shred' },
      { value: 'fine_wash', label: 'Fine Wash' },
      { value: 'second_dry', label: 'Second Dry' },
      { value: 'press', label: 'Press' },
      { value: 'weigh_photo', label: 'Weigh & Photo' },
      { value: 'laser_marking', label: 'Laser Marking' },
      { value: 'inventory_creation', label: 'Inventory Creation' }
    ]
  },
  { key: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Processing notes' },
  { key: 'createdAt', label: 'Created At', type: 'readonly' },
  { key: 'updatedAt', label: 'Updated At', type: 'readonly' }
];

// COMPLETE Order editing configuration - ALL database fields
export const orderEditableFields: EditableField<Order>[] = [
  { key: '_id', label: 'Order ID', type: 'readonly' },
  { key: 'orderNumber', label: 'Order Number', type: 'text', required: true, placeholder: 'ORD-YYYY-XXX' },
  { key: 'orgId', label: 'Organization ID', type: 'readonly' },
  { 
    key: 'type', 
    label: 'Order Type', 
    type: 'select', 
    required: true,
    options: [
      { value: 'collection_service', label: 'Collection Service' },
      { value: 'product_delivery', label: 'Product Delivery' },
      { value: 'educational_workshop', label: 'Educational Workshop' },
      { value: 'consulting', label: 'Consulting' }
    ]
  },
  { 
    key: 'status', 
    label: 'Status', 
    type: 'select', 
    required: true,
    options: [
      { value: 'pending', label: 'Pending' },
      { value: 'in_progress', label: 'In Progress' },
      { value: 'completed', label: 'Completed' },
      { value: 'invoiced', label: 'Invoiced' },
      { value: 'cancelled', label: 'Cancelled' }
    ]
  },
  { key: 'serviceDescription', label: 'Service Description', type: 'textarea', required: true, placeholder: 'Describe the service or products' },
  { key: 'contractReference', label: 'Contract Reference', type: 'text', placeholder: 'Contract/agreement reference' },
  { key: 'lineItems', label: 'Line Items', type: 'readonly' },
  { key: 'subtotal', label: 'Subtotal', type: 'number', required: true, placeholder: 'Amount before tax' },
  { key: 'tax', label: 'Tax', type: 'number', placeholder: 'Tax amount' },
  { key: 'total', label: 'Total', type: 'number', required: true, placeholder: 'Total amount' },
  { key: 'invoiceId', label: 'Invoice ID', type: 'text', placeholder: 'QuickBooks invoice reference' },
  { key: 'orderDate', label: 'Order Date', type: 'text', required: true, placeholder: 'YYYY-MM-DD format' },
  { key: 'expectedCompletionDate', label: 'Expected Completion Date', type: 'text', placeholder: 'YYYY-MM-DD format' },
  { key: 'completedDate', label: 'Completed Date', type: 'text', placeholder: 'YYYY-MM-DD format' },
  { key: 'invoicedDate', label: 'Invoiced Date', type: 'text', placeholder: 'YYYY-MM-DD format' },
  { key: 'assignedStaff', label: 'Assigned Staff', type: 'readonly' },
  { key: 'createdAt', label: 'Created At', type: 'readonly' },
  { key: 'updatedAt', label: 'Updated At', type: 'readonly' }
];

// COMPLETE Blank editing configuration - ALL database fields
export const blankEditableFields: EditableField<Blank>[] = [
  { key: '_id', label: 'Blank ID', type: 'readonly' },
  { key: 'batchId', label: 'Batch ID', type: 'text', required: true, placeholder: 'Source batch ID' },
  { key: 'productId', label: 'Product ID', type: 'text', placeholder: 'Associated product reference' },
  { key: 'userId', label: 'User ID', type: 'text', placeholder: 'Assigned user reference' },
  { 
    key: 'type', 
    label: 'Type', 
    type: 'select', 
    required: true,
    options: [
      { value: 'blank', label: 'Blank' },
      { value: 'finished', label: 'Finished Product' }
    ]
  },
  { 
    key: 'status', 
    label: 'Status', 
    type: 'select', 
    required: true,
    options: [
      { value: 'blank', label: 'Blank' },
      { value: 'assembled', label: 'Assembled' },
      { value: 'delivered', label: 'Delivered' }
    ]
  },
  { key: 'weight', label: 'Weight (kg)', type: 'number', required: true, placeholder: 'Weight in kg' },
  { key: 'assemblyDate', label: 'Assembly Date', type: 'text', placeholder: 'YYYY-MM-DD format' },
  { key: 'deliveryDate', label: 'Delivery Date', type: 'text', placeholder: 'YYYY-MM-DD format' },
  { key: 'createdAt', label: 'Created At', type: 'readonly' },
  { key: 'updatedAt', label: 'Updated At', type: 'readonly' }
];

// Complete Bin column definitions with ALL database fields
export const allBinColumns: Column<Bin>[] = [
  { key: "_id", header: "Bin ID" },
  { key: "name", header: "Bin Name" },
  { key: "location", header: "Location" },
  { 
    key: "status", 
    header: "Status",
    render: (item) => getStatusBadge(item.status)
  },
  { 
    key: "type", 
    header: "Type",
    render: (item) => (
      <Badge variant={item.type === "permanent" ? "default" : "secondary"}>
        {item.type}
      </Badge>
    )
  },
  { key: "capacity", header: "Capacity (kg)" },
  { key: "orgId", header: "Organization ID" },
  { key: "eventId", header: "Event ID" },
  { 
    key: "isActive", 
    header: "Active",
    render: (item) => (
      <Badge variant={item.isActive ? "default" : "secondary"}>
        {item.isActive ? "Active" : "Inactive"}
      </Badge>
    )
  },
  { 
    key: "canBeAdopted", 
    header: "Adoptable",
    render: (item) => (
      <Badge variant={item.canBeAdopted ? "default" : "secondary"}>
        {item.canBeAdopted ? "Yes" : "No"}
      </Badge>
    )
  },
  { key: "adoptedBy", header: "Adopted By" },
  { 
    key: "lastCollectionDate", 
    header: "Last Collection",
    render: (item) => item.lastCollectionDate ? new Date(item.lastCollectionDate).toLocaleDateString() : 'Never'
  },
  { 
    key: "nextCollectionDate", 
    header: "Next Collection",
    render: (item) => item.nextCollectionDate ? new Date(item.nextCollectionDate).toLocaleDateString() : 'Not scheduled'
  },
  { 
    key: "createdAt", 
    header: "Created",
    render: (item) => new Date(item.createdAt).toLocaleDateString()
  },
  { 
    key: "updatedAt", 
    header: "Updated",
    render: (item) => new Date(item.updatedAt).toLocaleDateString()
  }
];

export const defaultBinColumns = ["_id", "name", "location", "status", "type", "capacity"];

// Complete Batch column definitions with ALL database fields
export const allBatchColumns: Column<Batch>[] = [
  { key: "_id", header: "Batch ID" },
  { 
    key: "binIds", 
    header: "Source Bins",
    render: (item) => Array.isArray(item.binIds) ? `${item.binIds.length} bins` : '0 bins'
  },
  { 
    key: "collectionDate", 
    header: "Collected",
    render: (item) => new Date(item.collectionDate).toLocaleDateString()
  },
  { 
    key: "weight", 
    header: "Weight",
    render: (item) => `${item.weight} kg`
  },
  { 
    key: "materialType", 
    header: "Material",
    render: (item) => getMaterialTypeBadge(item.materialType)
  },
  { key: "collectedBy", header: "Collected By" },
  { 
    key: "status", 
    header: "Processing Status",
    render: (item) => getProcessingStatusBadge(item.status)
  },
  { key: "notes", header: "Notes" },
  { 
    key: "createdAt", 
    header: "Created",
    render: (item) => new Date(item.createdAt).toLocaleDateString()
  },
  { 
    key: "updatedAt", 
    header: "Updated",
    render: (item) => new Date(item.updatedAt).toLocaleDateString()
  }
];

export const defaultBatchColumns = ["_id", "binIds", "weight", "materialType", "status", "collectedBy"];

// Complete Order column definitions with ALL database fields
export const allOrderColumns: Column<Order>[] = [
  { key: "_id", header: "Order ID" },
  { key: "orderNumber", header: "Order Number" },
  { key: "type", header: "Order Type" },
  { key: "serviceDescription", header: "Description" },
  { 
    key: "status", 
    header: "Status",
    render: (item) => getFulfillmentStatusBadge(item.status)
  },
  { 
    key: "total", 
    header: "Total",
    render: (item) => `$${item.total?.toFixed(2) || '0.00'}`
  },
  { key: "orgId", header: "Organization ID" },
  { key: "contractReference", header: "Contract Ref" },
  { 
    key: "lineItems", 
    header: "Line Items",
    render: (item) => Array.isArray(item.lineItems) ? `${item.lineItems.length} items` : '0 items'
  },
  { 
    key: "subtotal", 
    header: "Subtotal",
    render: (item) => `$${item.subtotal?.toFixed(2) || '0.00'}`
  },
  { 
    key: "tax", 
    header: "Tax",
    render: (item) => `$${item.tax?.toFixed(2) || '0.00'}`
  },
  { key: "invoiceId", header: "Invoice ID" },
  { 
    key: "orderDate", 
    header: "Order Date",
    render: (item) => item.orderDate ? new Date(item.orderDate).toLocaleDateString() : 'Not set'
  },
  { 
    key: "expectedCompletionDate", 
    header: "Expected Completion",
    render: (item) => item.expectedCompletionDate ? new Date(item.expectedCompletionDate).toLocaleDateString() : 'Not set'
  },
  { 
    key: "completedDate", 
    header: "Completed",
    render: (item) => item.completedDate ? new Date(item.completedDate).toLocaleDateString() : 'Not completed'
  },
  { 
    key: "invoicedDate", 
    header: "Invoiced",
    render: (item) => item.invoicedDate ? new Date(item.invoicedDate).toLocaleDateString() : 'Not invoiced'
  },
  { 
    key: "assignedStaff", 
    header: "Assigned Staff",
    render: (item) => Array.isArray(item.assignedStaff) ? `${item.assignedStaff.length} staff` : '0 staff'
  },
  { 
    key: "createdAt", 
    header: "Created",
    render: (item) => new Date(item.createdAt).toLocaleDateString()
  },
  { 
    key: "updatedAt", 
    header: "Updated",
    render: (item) => new Date(item.updatedAt).toLocaleDateString()
  }
];

export const defaultOrderColumns = ["_id", "orderNumber", "type", "serviceDescription", "status", "total"];

// Complete Blank column definitions with ALL database fields
export const allBlankColumns: Column<Blank>[] = [
  { key: "_id", header: "Blank ID" },
  { key: "batchId", header: "Batch ID" },
  { key: "productId", header: "Product ID" },
  { key: "userId", header: "User ID" },
  { 
    key: "type", 
    header: "Type",
    render: (item) => (
      <Badge variant={item.type === "finished" ? "default" : "secondary"}>
        {item.type}
      </Badge>
    )
  },
  { 
    key: "status", 
    header: "Status",
    render: (item) => {
      const colors = { 
        blank: "secondary", 
        assembled: "default", 
        delivered: "outline" 
      } as const;
      const variant = colors[item.status as keyof typeof colors] || "secondary";
      return (
        <Badge variant={variant as "secondary" | "default" | "outline"}>
          {item.status}
        </Badge>
      );
    }
  },
  { 
    key: "weight", 
    header: "Weight",
    render: (item) => `${item.weight} kg`
  },
  { 
    key: "assemblyDate", 
    header: "Assembly Date",
    render: (item) => item.assemblyDate ? new Date(item.assemblyDate).toLocaleDateString() : 'Not assembled'
  },
  { 
    key: "deliveryDate", 
    header: "Delivery Date",
    render: (item) => item.deliveryDate ? new Date(item.deliveryDate).toLocaleDateString() : 'Not delivered'
  },
  { 
    key: "createdAt", 
    header: "Created",
    render: (item) => new Date(item.createdAt).toLocaleDateString()
  },
  { 
    key: "updatedAt", 
    header: "Updated",
    render: (item) => new Date(item.updatedAt).toLocaleDateString()
  }
];

export const defaultBlankColumns = ["_id", "batchId", "type", "status", "weight"];