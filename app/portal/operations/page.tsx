"use client";

import { useState, useEffect } from "react";
import {
  Package,
  Truck,
  Settings,
  AlertCircle,
  Calendar,
  BarChart3,
  Users,
  MapPin,
  Scale,
  Camera,
  Zap,
  QrCode,
  CheckCircle,
  Clock,
  ArrowRight,
  Scan,
  Droplets,
  Scissors,
  Zap as ShredIcon,
  Wind,
  Archive,
  ChevronDown,
  Maximize,
  Minimize,
  X,
  Monitor,
  Activity,
  Route,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { DataTable, Column, EditableField } from "../../components/ui/data-table";
import { Bin, Batch, Order, Blank } from "../../../lib/schemas";
import { useOperationsData } from "../../../hooks/useOperationsData";
import { QRScanner } from "../../components/operations/QRScanner";
import { OperationsOverview } from "../../components/operations/OperationsOverview";
import { ProcessingWorkflow } from "../../components/operations/ProcessingWorkflow";
import {
  getStatusBadge,
  getProcessingStatusBadge,
  getMaterialTypeBadge,
  getFulfillmentStatusBadge,
} from "../../components/operations/StatusBadges";

export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState("collections");
  const [selectedBin, setSelectedBin] = useState(null);
  const [showScanModal, setShowScanModal] = useState(false);
  const [isLogisticsFullscreen, setIsLogisticsFullscreen] = useState(false);

  // Use the extracted data hook
  const {
    bins,
    batches,
    orders,
    blanks,
    loadingBins,
    loadingBatches,
    loadingOrders,
    loadingBlanks,
    handleBinSave,
    handleBinDelete,
    handleBatchSave,
    handleBatchDelete,
    handleOrderSave,
    handleOrderDelete,
    handleBlankSave,
    handleBlankDelete,
  } = useOperationsData();


  
  // Shared sorting state for data tables
  const [collectionsSortField, setCollectionsSortField] = useState<string>("");
  const [collectionsSortDirection, setCollectionsSortDirection] = useState<"asc" | "desc">("asc");
  const [processingSortField, setProcessingSortField] = useState<string>("");
  const [processingSortDirection, setProcessingSortDirection] = useState<"asc" | "desc">("asc");
  const [fulfillmentSortField, setFulfillmentSortField] = useState<string>("");
  const [fulfillmentSortDirection, setFulfillmentSortDirection] = useState<"asc" | "desc">("asc");

  // COMPLETE Bin editing configuration - ALL database fields
  const binEditableFields: EditableField<Bin>[] = [
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

  const handleBinSave = async (bin: Bin) => {
    try {
      const response = await fetch('/api/operations/bins', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bin)
      })
      
      if (response.ok) {
        await fetchBins()
      } else {
        throw new Error('Failed to save bin')
      }
    } catch (error) {
      console.error('Error saving bin:', error)
      throw error
    }
  }

  const handleBinDelete = async (bin: Bin) => {
    try {
      const response = await fetch(`/api/operations/bins?id=${bin._id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        await fetchBins()
      } else {
        throw new Error('Failed to delete bin')
      }
    } catch (error) {
      console.error('Error deleting bin:', error)
      throw error
    }
  }

  // COMPLETE Batch editing configuration - ALL database fields
  const batchEditableFields: EditableField<Batch>[] = [
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

  const handleBatchSave = async (batch: Batch) => {
    try {
      const response = await fetch('/api/operations/batches', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(batch)
      })
      
      if (response.ok) {
        await fetchBatches()
      } else {
        throw new Error('Failed to save batch')
      }
    } catch (error) {
      console.error('Error saving batch:', error)
      throw error
    }
  }

  const handleBatchDelete = async (batch: Batch) => {
    try {
      const response = await fetch(`/api/operations/batches?id=${batch._id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        await fetchBatches()
      } else {
        throw new Error('Failed to delete batch')
      }
    } catch (error) {
      console.error('Error deleting batch:', error)
      throw error
    }
  }

  // COMPLETE Order editing configuration - ALL database fields
  const orderEditableFields: EditableField<Order>[] = [
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

  const handleOrderSave = async (order: Order) => {
    try {
      const response = await fetch('/api/operations/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      })
      
      if (response.ok) {
        await fetchOrders()
      } else {
        throw new Error('Failed to save order')
      }
    } catch (error) {
      console.error('Error saving order:', error)
      throw error
    }
  }

  const handleOrderDelete = async (order: Order) => {
    try {
      const response = await fetch(`/api/operations/orders?id=${order._id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        await fetchOrders()
      } else {
        throw new Error('Failed to delete order')
      }
    } catch (error) {
      console.error('Error deleting order:', error)
      throw error
    }
  }

  // COMPLETE Blank editing configuration - ALL database fields
  const blankEditableFields: EditableField<Blank>[] = [
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

  const handleBlankSave = async (blank: Blank) => {
    try {
      const response = await fetch('/api/operations/blanks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blank)
      })
      
      if (response.ok) {
        await fetchBlanks()
      } else {
        throw new Error('Failed to save blank')
      }
    } catch (error) {
      console.error('Error saving blank:', error)
      throw error
    }
  }

  const handleBlankDelete = async (blank: Blank) => {
    try {
      const response = await fetch(`/api/operations/blanks?id=${blank._id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        await fetchBlanks()
      } else {
        throw new Error('Failed to delete blank')
      }
    } catch (error) {
      console.error('Error deleting blank:', error)
      throw error
    }
  }

  // Complete Bin column definitions with ALL database fields
  const allBinColumns: Column<Bin>[] = [
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

  // Default visible columns for Bins (current selection)
  const defaultBinColumns = ["_id", "name", "location", "status", "type", "capacity"];

  // Complete Batch column definitions with ALL database fields
  const allBatchColumns: Column<Batch>[] = [
    { key: "_id", header: "Batch ID" },
    { 
      key: "binIds", 
      header: "Source Bins",
      render: (item) => {
        if (!item.binIds || item.binIds.length === 0) return 'No bins';
        if (item.binIds.length === 1) return item.binIds[0];
        return `${item.binIds.length} bins: ${item.binIds.slice(0, 2).join(', ')}${item.binIds.length > 2 ? '...' : ''}`;
      }
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
    { 
      key: "status", 
      header: "Status",
      render: (item) => getProcessingStatusBadge(item.status)
    },
    { key: "collectedBy", header: "Collector" },
    { 
      key: "collectionDate", 
      header: "Collection Date",
      render: (item) => new Date(item.collectionDate).toLocaleDateString()
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

  // Default visible columns for Batches (current selection)
  const defaultBatchColumns = ["_id", "binIds", "weight", "materialType", "status", "collectedBy"];

  // Complete Order column definitions with ALL database fields
  const allOrderColumns: Column<Order>[] = [
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
      render: (item) => Array.isArray(item.assignedStaff) ? `${item.assignedStaff.length} staff` : 'Unassigned'
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

  // Default visible columns for Orders (current selection)
  const defaultOrderColumns = ["_id", "orderNumber", "type", "serviceDescription", "status", "total"];

  // Complete Blank column definitions with ALL database fields
  const allBlankColumns: Column<Blank>[] = [
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

  // Default visible columns for Blanks
  const defaultBlankColumns = ["_id", "batchId", "type", "status", "weight"];

  // Modal render functions
  const renderCollectionsModal = (bin: any) => (
    <>
      <DialogHeader>
        <DialogTitle>Bin Details - {bin.id}</DialogTitle>
        <DialogDescription>
          Universal scan modal - same interface as QR code scanning
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">Organization</Label>
            <p className="text-sm">{bin.orgName}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700">Location</Label>
            <p className="text-sm">{bin.location}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">Current Status</Label>
            <div className="mt-1">{getStatusBadge(bin.status)}</div>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700">Capacity</Label>
            <p className="text-sm">{bin.currentLevel}% of {bin.capacity}kg</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">Type</Label>
            <p className="text-sm capitalize">{bin.type}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700">QR Code</Label>
            <p className="text-sm font-mono">{bin.qrCode}</p>
          </div>
        </div>
        {bin.adoptedBy && (
          <div>
            <Label className="text-sm font-medium text-gray-700">Adopted By</Label>
            <p className="text-sm">{bin.adoptedBy}</p>
          </div>
        )}
        <div className="pt-4 border-t">
          <div className="space-y-2">
            {bin.status === "Ready for Pickup" && (
              <Button className="w-full bg-pop-green hover:bg-pop-green/90">
                <CheckCircle className="h-4 w-4 mr-2" />
                Check-in Bin
              </Button>
            )}
            {bin.status === "Collected" && (
              <Button className="w-full bg-pop-blue hover:bg-pop-blue/90">
                <ArrowRight className="h-4 w-4 mr-2" />
                Start Rough Wash
              </Button>
            )}
            {bin.status === "Awaiting Rough Wash" && (
              <Button className="w-full bg-pop-red hover:bg-pop-red/90">
                <Droplets className="h-4 w-4 mr-2" />
                Begin Processing
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const renderProcessingModal = (batch: any) => (
    <>
      <DialogHeader>
        <DialogTitle>Batch Details - {batch.id}</DialogTitle>
        <DialogDescription>
          Universal scan modal - same interface as QR code scanning
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">Organization</Label>
            <p className="text-sm">{batch.orgName}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700">Collection Date</Label>
            <p className="text-sm">{new Date(batch.collectionDate).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">Weight</Label>
            <p className="text-sm">{batch.weight} lbs</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700">Material Type</Label>
            <div className="mt-1">{getMaterialTypeBadge(batch.materialType)}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">Current Status</Label>
            <div className="mt-1">{getProcessingStatusBadge(batch.status)}</div>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700">Collected By</Label>
            <p className="text-sm">{batch.collectedBy}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">Source Bins</Label>
            {batch.binIds && batch.binIds.length > 0 ? (
              <div className="space-y-1">
                {batch.binIds.map((binId: string, index: number) => (
                  <p key={index} className="text-sm font-mono">{binId}</p>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No bins assigned</p>
            )}
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700">QR Code</Label>
            <p className="text-sm font-mono">{batch.qrCode}</p>
          </div>
        </div>
        {batch.notes && (
          <div>
            <Label className="text-sm font-medium text-gray-700">Processing Notes</Label>
            <p className="text-sm">{batch.notes}</p>
          </div>
        )}
        <div className="pt-4 border-t">
          <div className="space-y-2">
            {batch.status === "collected" && (
              <Button className="w-full bg-pop-blue hover:bg-pop-blue/90">
                <Droplets className="h-4 w-4 mr-2" />
                Start Rough Wash
              </Button>
            )}
            {batch.status === "sorted" && (
              <Button className="w-full bg-pop-green hover:bg-pop-green/90">
                <Scissors className="h-4 w-4 mr-2" />
                Begin Sorting
              </Button>
            )}
            {batch.status === "cleaned" && (
              <Button className="w-full bg-pop-red hover:bg-pop-red/90">
                <ShredIcon className="h-4 w-4 mr-2" />
                Start Shredding
              </Button>
            )}
            {batch.status === "processed" && (
              <div className="text-center">
                <Badge className="bg-green-500 text-white">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Processing Complete
                </Badge>
                <Button className="w-full mt-2 bg-pop-black hover:bg-pop-black/90 text-white">
                  <Archive className="h-4 w-4 mr-2" />
                  Create Inventory Items
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const renderFulfillmentModal = (order: any) => (
    <>
      <DialogHeader>
        <DialogTitle>Order Details - {order.id}</DialogTitle>
        <DialogDescription>
          Customer order tracking and maker assignment
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">Customer</Label>
            <p className="text-sm">{order.customerName}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700">Item Type</Label>
            <p className="text-sm">{order.itemType}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">Quantity</Label>
            <p className="text-sm">{order.quantity} units</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700">Due Date</Label>
            <p className="text-sm">{order.dueDate}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">Status</Label>
            <div className="mt-1">{getFulfillmentStatusBadge(order.status)}</div>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700">Priority</Label>
            <p className="text-sm capitalize">{order.priority}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">Assigned Maker</Label>
            <p className="text-sm">{order.assignedMaker || "Unassigned"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700">Batch ID</Label>
            <p className="text-sm font-mono">{order.batchId}</p>
          </div>
        </div>
        {order.notes && (
          <div>
            <Label className="text-sm font-medium text-gray-700">Notes</Label>
            <p className="text-sm text-gray-600">{order.notes}</p>
          </div>
        )}
        <div className="flex gap-2 pt-2">
          {order.status === "ready" && (
            <Button className="bg-pop-green hover:bg-pop-green/90">
              Assign Maker
            </Button>
          )}
          {order.status === "assembly" && (
            <Button className="bg-pop-blue hover:bg-pop-blue/90">
              Mark Complete
            </Button>
          )}
          {order.status === "urgent" && (
            <Button className="bg-pop-red hover:bg-pop-red/90">
              Prioritize
            </Button>
          )}
        </div>
      </div>
    </>
  );

  // Badge helper functions

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ready for Pickup":
        return <Badge className="bg-pop-red text-white">Ready for Pickup</Badge>;
      case "Collected":
        return <Badge className="bg-pop-blue text-white">Collected</Badge>;
      case "Awaiting Rough Wash":
        return <Badge className="bg-pop-green text-white">Awaiting Wash</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getProcessingStatusBadge = (status: string) => {
    switch (status) {
      case "collected":
        return <Badge className="bg-gray-500 text-white"><Package className="h-3 w-3 mr-1" />Collected</Badge>;
      case "rough_wash":
        return <Badge className="bg-pop-blue text-white"><Droplets className="h-3 w-3 mr-1" />Rough Wash</Badge>;
      case "sort":
        return <Badge className="bg-pop-green text-white"><Scissors className="h-3 w-3 mr-1" />Sort</Badge>;
      case "first_dry":
        return <Badge className="bg-yellow-500 text-white"><Wind className="h-3 w-3 mr-1" />First Dry</Badge>;
      case "shred":
        return <Badge className="bg-orange-500 text-white"><ShredIcon className="h-3 w-3 mr-1" />Shred</Badge>;
      case "fine_wash":
        return <Badge className="bg-blue-600 text-white"><Droplets className="h-3 w-3 mr-1" />Fine Wash</Badge>;
      case "second_dry":
        return <Badge className="bg-yellow-600 text-white"><Wind className="h-3 w-3 mr-1" />Second Dry</Badge>;
      case "press":
        return <Badge className="bg-purple-500 text-white"><Archive className="h-3 w-3 mr-1" />Press</Badge>;
      case "weigh_photo":
        return <Badge className="bg-indigo-500 text-white"><Scale className="h-3 w-3 mr-1" />Weigh & Photo</Badge>;
      case "laser_marking":
        return <Badge className="bg-pop-red text-white"><Zap className="h-3 w-3 mr-1" />Laser Marking</Badge>;
      case "inventory_creation":
        return <Badge className="bg-pop-black text-white"><Settings className="h-3 w-3 mr-1" />Inventory Creation</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getMaterialTypeBadge = (type: string) => {
    switch (type) {
      case "HDPE":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">HDPE</Badge>;
      case "PET":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">PET</Badge>;
      case "PP":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800">PP</Badge>;
      case "mixed":
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Mixed</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getFulfillmentStatusBadge = (status: string) => {
    switch (status) {
      case "urgent":
        return <Badge className="bg-pop-red text-white">Urgent</Badge>;
      case "assembly":
        return <Badge className="bg-pop-blue text-white">Assembly</Badge>;
      case "ready":
        return <Badge className="bg-pop-green text-white">Ready</Badge>;
      case "shipping":
        return <Badge className="bg-orange-500 text-white">Shipping</Badge>;
      case "shipped":
        return <Badge className="bg-gray-500 text-white">Shipped</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-pop-black">
          Operations Dashboard
        </h2>
       
      </div>

      {/* Operations Overview - Mobile-Ready Collapsible */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="operations-overview" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-pop-green" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-pop-black">Operations Overview</h3>
                 <p className="text-sm text-gray-600">Bins, batches, orders and inventory</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {/* Mobile-First Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 pb-4">
              {/* Active Bins */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Package className="h-5 w-5 text-gray-600" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Bins</span>
                </div>
                <div className="text-2xl font-bold text-pop-black mb-1">156</div>
                <div className="text-sm text-gray-600 mb-2">Total Active</div>
                <div className="flex gap-2 text-xs">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">12 Ready</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">8 Transit</span>
                </div>
              </div>

              {/* Active Batches */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Truck className="h-5 w-5 text-gray-600" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Batches</span>
                </div>
                <div className="text-2xl font-bold text-pop-black mb-1">23</div>
                <div className="text-sm text-gray-600 mb-2">Total Active</div>
                <div className="flex gap-2 text-xs">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">8 Processing</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">15 Complete</span>
                </div>
              </div>

              {/* Active Orders */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-5 w-5 text-gray-600" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Orders</span>
                </div>
                <div className="text-2xl font-bold text-pop-black mb-1">7</div>
                <div className="text-sm text-gray-600 mb-2">Active Orders</div>
                <div className="flex gap-2 text-xs">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">3 Production</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">4 Shipping</span>
                </div>
              </div>

              {/* Inventory Status */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Archive className="h-5 w-5 text-gray-600" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Inventory</span>
                </div>
                <div className="text-2xl font-bold text-pop-black mb-1">89</div>
                <div className="text-sm text-gray-600 mb-2">Total Blanks</div>
                <div className="flex gap-2 text-xs">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">42 Items</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">5 Orders</span>
                </div>
              </div>

             
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Unified Quick Scan Section */}
      <div className="w-full border rounded-lg px-4 cursor-pointer hover:bg-gray-50" onClick={() => setShowScanModal(true)}>
        <div className="py-4">
          <div className="flex items-center gap-3">
            <QrCode className="h-5 w-5 text-pop-green" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-pop-black">QR Scanner</h3>
               <p className="text-sm font-medium text-gray-600">Universal quick view</p>
            </div>
          </div>
        </div>
      </div>

      {/* Operations Management Accordion */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="operations-management" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-pop-green" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-pop-black">Logistics Management</h3>
                <p className="text-sm text-gray-600">Sort tables for materials processing and storage</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {/* Main Operations Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="relative z-10 p-0 bg-transparent h-auto gap-0 flex-nowrap overflow-visible">
              <TabsTrigger value="collections" className="folder-tab-white relative z-[4] text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2">
                <Package className="w-4 h-4 mr-2 text-pop-green" />
                Collections
              </TabsTrigger>
              <TabsTrigger value="processing" className="folder-tab-white relative z-[3] -ml-6 sm:ml-0 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2">
                <Settings className="w-4 h-4 mr-2 text-pop-green" />
                Processing
              </TabsTrigger>
              <TabsTrigger value="fulfillment" className="folder-tab-white relative z-[2] -ml-6 sm:ml-0 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2">
                <Truck className="w-4 h-4 mr-2 text-pop-green" />
                Fulfillment
              </TabsTrigger>
              <TabsTrigger value="inventory" className="folder-tab-white relative z-[1] -ml-6 sm:ml-0 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2">
                <BarChart3 className="w-4 h-4 mr-2 text-pop-green" />
                Inventory
              </TabsTrigger>
              <Button
                size="sm"
                onClick={() => setIsLogisticsFullscreen(true)}
                className="ml-4 border-0 hover:bg-pop-green hover:text-white"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </TabsList>
           
          </div>
        </div>

        {/* Collections Tab */}
        <TabsContent value="collections" className="space-y-6">
          {/* Collections Queue */}
          {loadingBins ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-sm text-gray-600">Loading bins...</div>
            </div>
          ) : (
            <DataTable
              title="Collections Queue"
              description="Live status overview of all bins assigned for pickup and collected materials awaiting processing"
              icon={<Package className="h-5 w-5 text-pop-green" />}
              data={bins}
              columns={allBinColumns.filter(col => defaultBinColumns.includes(String(col.key)))}
              availableColumns={allBinColumns}
              defaultVisibleColumns={defaultBinColumns}
              enableColumnSelection={true}
              enableFiltering={true}
              editableFields={binEditableFields}
              onSave={handleBinSave}
              onDelete={handleBinDelete}
              sortField={collectionsSortField}
              sortDirection={collectionsSortDirection}
              onSort={(field, direction) => {
                setCollectionsSortField(field);
                setCollectionsSortDirection(direction);
              }}
            />
          )}

          {/* Collections Workflow Diagram */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5 text-pop-green" />
                Collections Workflow
              </CardTitle>
              <CardDescription>
                Complete collections pipeline from bin checkout to processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 py-4">
                {/* Step 1: Ready for Check-Out */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-pop-green text-white px-4 py-2 text-sm whitespace-nowrap">
                    <Package className="h-4 w-4 mr-2" />
                    Bin Ready for Check-Out
                  </Badge>
                </div>
                
                {/* Arrow 1 */}
                <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
                
                {/* Step 2: On Vehicle */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-pop-blue text-white px-4 py-2 text-sm whitespace-nowrap">
                    <Truck className="h-4 w-4 mr-2" />
                    Bin On Vehicle
                  </Badge>
                </div>
                
                {/* Arrow 2 */}
                <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
                
                {/* Step 3: On Site */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-orange-500 text-white px-4 py-2 text-sm whitespace-nowrap">
                    <MapPin className="h-4 w-4 mr-2" />
                    Bin On Site
                  </Badge>
                </div>
                
                {/* Arrow 3 */}
                <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
                
                {/* Step 4: Ready for Pickup */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-red-600 text-white px-4 py-2 text-sm whitespace-nowrap">
                    <Clock className="h-4 w-4 mr-2" />
                    Upcoming Pickup
                  </Badge>
                </div>
                
                {/* Arrow 4 */}
                <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
                
                {/* Step 5: On Vehicle (Return) */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-pop-blue text-white px-4 py-2 text-sm whitespace-nowrap">
                    <Truck className="h-4 w-4 mr-2" />
                   Pickup On Vehicle
                  </Badge>
                </div>
                
                {/* Arrow 5 */}
                <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
                
                {/* Step 6: Ready for Processing */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-pop-black text-white px-4 py-2 text-sm whitespace-nowrap">
                    <Settings className="h-4 w-4 mr-2" />
                    Ready for Processing
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

    

        </TabsContent>

        {/* Processing Tab */}
        <TabsContent value="processing" className="space-y-6">
          {/* Processing Queue */}
          {loadingBatches ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-sm text-gray-600">Loading batches...</div>
            </div>
          ) : (
            <DataTable
              title="Processing Queue"
              description="Live status overview of all batches in various processing stages"
              icon={<Settings className="h-5 w-5 text-pop-blue" />}
              data={batches}
              columns={allBatchColumns.filter(col => defaultBatchColumns.includes(String(col.key)))}
              availableColumns={allBatchColumns}
              defaultVisibleColumns={defaultBatchColumns}
              enableColumnSelection={true}
              enableFiltering={true}
              editableFields={batchEditableFields}
              onSave={handleBatchSave}
              onDelete={handleBatchDelete}
              sortField={processingSortField}
              sortDirection={processingSortDirection}
              onSort={(field, direction) => {
                setProcessingSortField(field);
                setProcessingSortDirection(direction);
              }}
            />
          )}

          {/* Processing Workflow Diagram */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5 text-pop-blue" />
                Processing Workflow
              </CardTitle>
              <CardDescription>
                Ten step complete processing pipeline from collection to finished materials.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 py-4">
                {/* Step 1: Rough Wash */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-pop-blue text-white px-4 py-2 text-sm whitespace-nowrap">
                    <Droplets className="h-4 w-4 mr-2" />
                    Rough Wash
                  </Badge>
                </div>
                
                {/* Arrow 1 */}
                <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
                
                {/* Step 2: Sort */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-pop-green text-white px-4 py-2 text-sm whitespace-nowrap">
                    <Scissors className="h-4 w-4 mr-2" />
                    Sort
                  </Badge>
                </div>
                
                {/* Arrow 2 */}
                <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
                
                {/* Step 3: First Dry */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-orange-500 text-white px-4 py-2 text-sm whitespace-nowrap">
                    <Wind className="h-4 w-4 mr-2" />
                    First Dry
                  </Badge>
                </div>
                
                {/* Arrow 3 */}
                <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
                
                {/* Step 4: Shred */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-red-600 text-white px-4 py-2 text-sm whitespace-nowrap">
                    <ShredIcon className="h-4 w-4 mr-2" />
                    Shred
                  </Badge>
                </div>
                
                {/* Arrow 4 */}
                <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
                
                {/* Step 5: Fine Wash */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-pop-blue text-white px-4 py-2 text-sm whitespace-nowrap">
                    <Droplets className="h-4 w-4 mr-2" />
                    Fine Wash
                  </Badge>
                </div>
                
                {/* Arrow 5 */}
                <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
                
                {/* Step 6: Second Dry */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-orange-500 text-white px-4 py-2 text-sm whitespace-nowrap">
                    <Wind className="h-4 w-4 mr-2" />
                    Second Dry
                  </Badge>
                </div>
                
                {/* Arrow 6 */}
                <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
                
                {/* Step 7: Press */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-pop-black text-white px-4 py-2 text-sm whitespace-nowrap">
                    <Archive className="h-4 w-4 mr-2" />
                    Press
                  </Badge>
                </div>
                
                {/* Arrow 7 */}
                <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
                
                {/* Step 8: Weigh & Photo */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-pop-green text-white px-4 py-2 text-sm whitespace-nowrap">
                    <Scale className="h-4 w-4 mr-2" />
                    Weigh & Photo
                  </Badge>
                </div>
                
                {/* Arrow 8 */}
                <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
                
                {/* Step 9: Laser Marking */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-pop-red text-white px-4 py-2 text-sm whitespace-nowrap">
                    <Zap className="h-4 w-4 mr-2" />
                    Laser Marking
                  </Badge>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                 <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
                {/* Step 10: inventory Creation */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-black text-white px-4 py-2 text-sm whitespace-nowrap">
                    <Package className="h-4 w-4 mr-2" />
                    Inventory Creation
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Material Inventory</CardTitle>
                <CardDescription>Raw plastic material tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Processed Plastic Stock
                    </span>
                    <span className="font-medium">847 lbs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Pending Processing
                    </span>
                    <span className="font-medium">156 lbs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Ready for Production
                    </span>
                    <span className="font-medium text-pop-green">691 lbs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Quality Hold</span>
                    <span className="font-medium text-pop-red">12 lbs</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Update Material Levels
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Production Inventory</CardTitle>
                <CardDescription>Finished goods and blanks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Phone Stand Blanks</span>
                    <span className="font-medium">45 units</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Desk Organizer Blanks</span>
                    <span className="font-medium">28 units</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Plant Holder Blanks</span>
                    <span className="font-medium">19 units</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Custom Order Blanks</span>
                    <span className="font-medium">7 units</span>
                  </div>
                </div>
                <Button className="w-full bg-pop-blue hover:bg-pop-blue/90">
                  Generate Production Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Control</CardTitle>
                <CardDescription>Batch tracking and compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-pop-green/5 rounded-lg">
                    <div>
                      <span className="font-medium text-sm">Batch BA-8471</span>
                      <p className="text-xs text-gray-600">
                        All QC checks passed
                      </p>
                    </div>
                    <Badge className="bg-pop-green text-white">Approved</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pop-blue/5 rounded-lg">
                    <div>
                      <span className="font-medium text-sm">Batch BA-8472</span>
                      <p className="text-xs text-gray-600">
                        Pending final inspection
                      </p>
                    </div>
                    <Badge className="bg-pop-blue text-white">Review</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pop-red/5 rounded-lg">
                    <div>
                      <span className="font-medium text-sm">Batch BA-8469</span>
                      <p className="text-xs text-gray-600">
                        Material defect noted
                      </p>
                    </div>
                    <Badge className="bg-pop-red text-white">Hold</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View QC Documentation
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Inventory Movements</CardTitle>
              <CardDescription>
                Recent stock changes and transfers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium text-sm">
                      Material Addition
                    </span>
                    <p className="text-xs text-gray-600">
                      +45 lbs from Batch BA-8472
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">2 hours ago</span>
                    <p className="text-xs text-pop-green">Station 1</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium text-sm">
                      Production Consumption
                    </span>
                    <p className="text-xs text-gray-600">
                      -12 lbs for Phone Stand Blanks
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">4 hours ago</span>
                    <p className="text-xs text-pop-blue">Manufacturing</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium text-sm">Quality Hold</span>
                    <p className="text-xs text-gray-600">
                      -12 lbs from Batch BA-8469
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">1 day ago</span>
                    <p className="text-xs text-pop-red">QC Hold</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fulfillment Tab */}
        <TabsContent value="fulfillment" className="space-y-6">
          {/* Fulfillment Queue */}
          {loadingOrders ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-sm text-gray-600">Loading orders...</div>
            </div>
          ) : (
            <DataTable
              title="Order Queue"
              description="Customer orders and maker assignments with fulfillment status tracking"
              icon={<Users className="h-5 w-5 text-pop-green" />}
              data={orders}
              columns={allOrderColumns.filter(col => defaultOrderColumns.includes(String(col.key)))}
              availableColumns={allOrderColumns}
              defaultVisibleColumns={defaultOrderColumns}
              enableColumnSelection={true}
              enableFiltering={true}
              editableFields={orderEditableFields}
              onSave={handleOrderSave}
              onDelete={handleOrderDelete}
              sortField={fulfillmentSortField}
              sortDirection={fulfillmentSortDirection}
              onSort={(field, direction) => {
                setFulfillmentSortField(field);
                setFulfillmentSortDirection(direction);
              }}
            />
          )}

            <Card>
              <CardHeader>
                <CardTitle>Maker Assembly Status</CardTitle>
                <CardDescription>
                  Active maker projects and progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <span className="text-sm font-medium">Alex Chen</span>
                      <p className="text-xs text-gray-600">
                        Phone Stand Assembly
                      </p>
                    </div>
                    <Badge className="bg-pop-blue text-white">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <span className="text-sm font-medium">Maria Santos</span>
                      <p className="text-xs text-gray-600">
                        Desk Organizer Assembly
                      </p>
                    </div>
                    <Badge className="bg-pop-green text-white">Complete</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <span className="text-sm font-medium">Jordan Kim</span>
                      <p className="text-xs text-gray-600">
                        Available for assignment
                      </p>
                    </div>
                    <Badge variant="outline">Available</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Maker Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping & Delivery</CardTitle>
                <CardDescription>
                  Order fulfillment coordination
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Orders Ready to Ship
                    </span>
                    <span className="font-medium text-pop-green">8 orders</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">In Assembly</span>
                    <span className="font-medium">5 orders</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Shipped Today</span>
                    <span className="font-medium">12 orders</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Average Fulfillment
                    </span>
                    <span className="font-medium">2.3 days</span>
                  </div>
                </div>
                <Button className="w-full bg-pop-blue hover:bg-pop-blue/90">
                  Generate Shipping Labels
                </Button>
              </CardContent>
            </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
            <CardHeader>
              <CardTitle>Recent Fulfillment Activity</CardTitle>
              <CardDescription>
                Order completion and customer updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium text-sm">
                      Order #2843 Shipped
                    </span>
                    <p className="text-xs text-gray-600">
                      2x Phone Stand to GreenTech Corp
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">1 hour ago</span>
                    <p className="text-xs text-pop-green">Maker: Alex Chen</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium text-sm">
                      Order #2844 Completed
                    </span>
                    <p className="text-xs text-gray-600">
                      1x Desk Organizer - Ready for shipping
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">3 hours ago</span>
                    <p className="text-xs text-pop-green">
                      Maker: Maria Santos
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium text-sm">
                      Order #2842 Assembly Started
                    </span>
                    <p className="text-xs text-gray-600">
                      3x Plant Holder - Estimated completion Friday
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">5 hours ago</span>
                    <p className="text-xs text-pop-blue">Maker: Jordan Kim</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </TabsContent>
            </Tabs>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Production Station Interfaces Accordion */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="production-stations" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Monitor className="h-5 w-5 text-pop-green" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-pop-black">Production Station Interfaces</h3>
                <p className="text-sm text-gray-600">Real-time monitoring and control of processing stations</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {/* Manufacturing Workflow Stations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Station 1: Rough Wash */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Droplets className="h-5 w-5 mr-2 text-pop-blue" />
                    Wash Station
                  </CardTitle>
                  <CardDescription>Initial cleaning and contaminant removal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Batch</Label>
                    <Input value="BA-8473" readOnly />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pop-blue/5 rounded-lg">
                    <span className="text-sm">Station Status</span>
                    <Badge className="bg-pop-blue text-white">Processing</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-pop-blue h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                  <Button className="w-full bg-pop-blue hover:bg-pop-blue/90">
                    Complete Wash Cycle
                  </Button>
                </CardContent>
              </Card>

              {/* Station 2: Sort */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Scissors className="h-5 w-5 mr-2 text-pop-green" />
                    Sort Station
                  </CardTitle>
                  <CardDescription>Material separation and quality control</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Queue</Label>
                    <div className="space-y-1">
                      <div className="text-sm p-2 bg-gray-50 rounded">BA-8472 - Ready</div>
                      <div className="text-sm p-2 bg-gray-50 rounded">BA-8471 - Ready</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Station Status</span>
                    <Badge variant="outline">Idle</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">PET</Button>
                    <Button variant="outline" size="sm">HDPE</Button>
                    <Button variant="outline" size="sm">PP</Button>
                    <Button variant="outline" size="sm">Reject</Button>
                  </div>
                  <Button className="w-full bg-pop-green hover:bg-pop-green/90">
                    Start Sort Process
                  </Button>
                </CardContent>
              </Card>

              {/* Station 3: Shred */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShredIcon className="h-5 w-5 mr-2 text-pop-red" />
                    Shred Station
                  </CardTitle>
                  <CardDescription>Size reduction processing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Material Input</Label>
                    <div className="flex space-x-2">
                      <Input placeholder="Weight (lbs)" className="flex-1" />
                      <Button size="sm" variant="outline">Scale</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Shredder Status</span>
                    <Badge variant="outline">Ready</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Target Size</span>
                      <span>5mm flakes</span>
                    </div>
                  </div>
                  <Button className="w-full bg-pop-red hover:bg-pop-red/90">
                    Start Shredding
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Station 4: Fine Wash */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Droplets className="h-5 w-5 mr-2 text-pop-blue" />
                    Fine Wash Station
                  </CardTitle>
                  <CardDescription>Post-shred cleaning and debris removal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Material</Label>
                    <Input value="PET Flakes - 5mm" readOnly />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Station Status</span>
                    <Badge variant="outline">Ready</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Water Temperature</span>
                      <span>60°C</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Rinse Cycles</span>
                      <span>3x planned</span>
                    </div>
                  </div>
                  <Button className="w-full bg-pop-blue hover:bg-pop-blue/90">
                    Start Fine Wash
                  </Button>
                </CardContent>
              </Card>

              {/* Station 5: Dry */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wind className="h-5 w-5 mr-2 text-gray-600" />
                    Dry Station
                  </CardTitle>
                  <CardDescription>Moisture removal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Temperature Control</Label>
                    <div className="flex items-center space-x-2">
                      <Input value="85°C" readOnly className="flex-1" />
                      <Badge className="bg-pop-green text-white">Optimal</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Drying Time</span>
                      <span>45 min remaining</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-600 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Monitor Cycle
                  </Button>
                </CardContent>
              </Card>

              {/* Station 6: Storage */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Archive className="h-5 w-5 mr-2 text-gray-500" />
                    Storage Bins
                  </CardTitle>
                  <CardDescription>Material inventory management</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-pop-blue/10 rounded">
                        <div className="font-medium">PET</div>
                        <div className="text-xs">156 lbs</div>
                      </div>
                      <div className="p-2 bg-pop-green/10 rounded">
                        <div className="font-medium">HDPE</div>
                        <div className="text-xs">89 lbs</div>
                      </div>
                      <div className="p-2 bg-pop-red/10 rounded">
                        <div className="font-medium">PP</div>
                        <div className="text-xs">67 lbs</div>
                      </div>
                      <div className="p-2 bg-gray-100 rounded">
                        <div className="font-medium">Mixed</div>
                        <div className="text-xs">23 lbs</div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Update Inventory
                  </Button>
                </CardContent>
              </Card>

              {/* Station 7: Pressing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ChevronDown className="h-5 w-5 mr-2 text-pop-black" />
                    Press Station
                  </CardTitle>
                  <CardDescription>Blank formation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Press Settings</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-xs text-gray-600">Temperature</div>
                        <div className="text-sm font-medium">180°C</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Pressure</div>
                        <div className="text-sm font-medium">2500 PSI</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pop-black/5 rounded-lg">
                    <span className="text-sm">Press Status</span>
                    <Badge className="bg-pop-black text-white">Ready</Badge>
                  </div>
                  <Button className="w-full bg-pop-black hover:bg-pop-black/90 text-white">
                    Start Press Cycle
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Production Stations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Scale className="h-5 w-5 mr-2 text-pop-green" />
                    Station 8: Weighing/Photo/Creation
                  </CardTitle>
                  <CardDescription>
                    Item creation from pressed blanks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="batch-id">Batch ID Input</Label>
                      <Input
                        id="batch-id"
                        placeholder="BA-XXXX"
                        className="mt-1"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-pop-green/5 rounded-lg">
                      <div>
                        <span className="font-medium text-sm">
                          HID Scale Integration
                        </span>
                        <p className="text-xs text-gray-600">
                          Auto-weight capture ready
                        </p>
                      </div>
                      <Badge className="bg-pop-green text-white">
                        <Scale className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-pop-blue/5 rounded-lg">
                      <div>
                        <span className="font-medium text-sm">
                          Webcam Capture
                        </span>
                        <p className="text-xs text-gray-600">USB camera ready</p>
                      </div>
                      <Badge className="bg-pop-blue text-white">
                        <Camera className="h-3 w-3 mr-1" />
                        Ready
                      </Badge>
                    </div>
                  </div>
                  <Button className="w-full bg-pop-green hover:bg-pop-green/90">
                    <Package className="h-4 w-4 mr-2" />
                    Create New Item
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-pop-blue" />
                    Station 9: Laser Processing
                  </CardTitle>
                  <CardDescription>
                    QR code engraving and completion
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Queue Management</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">
                            IT-8472-001 - Phone Stand
                          </span>
                          <Badge variant="outline">Queued</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-pop-blue/5 rounded">
                          <span className="text-sm">
                            IT-8471-003 - Desk Organizer
                          </span>
                          <Badge className="bg-pop-blue text-white">
                            Processing
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-pop-green/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          Lightburn Integration
                        </span>
                        <Badge className="bg-pop-green text-white">
                          <Zap className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        Copy QR codes for laser engraving
                      </p>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Offline QR: ABC123"
                          className="text-xs"
                          readOnly
                        />
                        <Button size="sm" variant="outline">
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-pop-blue hover:bg-pop-blue/90">
                    <QrCode className="h-4 w-4 mr-2" />
                    Mark Laser Complete
                  </Button>
                </CardContent>
              </Card>
            </div>

            
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Pickup Scheduling Accordion */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="pickup-scheduling" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-pop-green" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-pop-black">Pickup Scheduling</h3>
                <p className="text-sm text-gray-600">Route planning and logistics coordination</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2 pb-4">
              {/* Today's Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-pop-blue" />
                    Today's Schedule
                  </CardTitle>
                  <CardDescription>Active pickup routes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-pop-red/5 rounded-lg border-l-4 border-pop-red">
                    <div>
                      <div className="font-medium text-sm">TechCorp - Floor 3</div>
                      <div className="text-xs text-gray-600">BI-7829 - 85% Full</div>
                      <div className="text-xs text-gray-500">9:30 AM</div>
                    </div>
                    <Badge className="bg-pop-red text-white">Urgent</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pop-blue/5 rounded-lg border-l-4 border-pop-blue">
                    <div>
                      <div className="font-medium text-sm">GreenTech Industries</div>
                      <div className="text-xs text-gray-600">BI-5432 - 65% Full</div>
                      <div className="text-xs text-gray-500">11:00 AM</div>
                    </div>
                    <Badge className="bg-pop-blue text-white">Scheduled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pop-green/5 rounded-lg border-l-4 border-pop-green">
                    <div>
                      <div className="font-medium text-sm">Innovation Hub</div>
                      <div className="text-xs text-gray-600">BI-9876 - 45% Full</div>
                      <div className="text-xs text-gray-500">2:15 PM</div>
                    </div>
                    <Badge className="bg-pop-green text-white">Confirmed</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Route Optimization */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Route className="h-5 w-5 text-pop-green" />
                    Route Planning
                  </CardTitle>
                  <CardDescription>Optimized pickup routes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-gray-700">Route A</div>
                    <div className="text-xs text-gray-600 mt-1">3 stops • 12.5 miles • 2h 15m</div>
                    <div className="flex gap-1 mt-2">
                      <Badge variant="outline" className="text-xs">TechCorp</Badge>
                      <Badge variant="outline" className="text-xs">GreenTech</Badge>
                      <Badge variant="outline" className="text-xs">Innovation</Badge>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-gray-700">Route B</div>
                    <div className="text-xs text-gray-600 mt-1">2 stops • 8.3 miles • 1h 30m</div>
                    <div className="flex gap-1 mt-2">
                      <Badge variant="outline" className="text-xs">StartupCo</Badge>
                      <Badge variant="outline" className="text-xs">EcoSpace</Badge>
                    </div>
                  </div>
                  <Button size="sm" className="w-full bg-pop-green hover:bg-pop-green/90">
                    <Route className="h-4 w-4 mr-2" />
                    Optimize Routes
                  </Button>
                </CardContent>
              </Card>

              {/* Driver Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-pop-blue" />
                    Driver Assignments
                  </CardTitle>
                  <CardDescription>Team availability and assignments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Mike Rodriguez</div>
                      <div className="text-xs text-gray-600">Route A - On Route</div>
                    </div>
                    <Badge className="bg-pop-green text-white">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Sarah Chen</div>
                      <div className="text-xs text-gray-600">Route B - Available</div>
                    </div>
                    <Badge variant="outline">Standby</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Alex Kim</div>
                      <div className="text-xs text-gray-600">Processing Station</div>
                    </div>
                    <Badge className="bg-pop-blue text-white">Busy</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Calendar Integration */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-pop-green" />
                  Weekly Schedule Overview
                </CardTitle>
                <CardDescription>Upcoming pickups and scheduling coordination</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 text-center">
                  <div className="font-semibold text-sm text-gray-600 p-2">Mon</div>
                  <div className="font-semibold text-sm text-gray-600 p-2">Tue</div>
                  <div className="font-semibold text-sm text-gray-600 p-2">Wed</div>
                  <div className="font-semibold text-sm text-gray-600 p-2">Thu</div>
                  <div className="font-semibold text-sm text-gray-600 p-2">Fri</div>
                  <div className="font-semibold text-sm text-gray-600 p-2">Sat</div>
                  <div className="font-semibold text-sm text-gray-600 p-2">Sun</div>
                  
                  <div className="p-2 bg-pop-green/10 rounded text-sm">
                    <div className="font-bold">12</div>
                    <div className="text-xs">3 pickups</div>
                  </div>
                  <div className="p-2 bg-pop-blue/10 rounded text-sm">
                    <div className="font-bold">13</div>
                    <div className="text-xs">2 pickups</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded text-sm">
                    <div className="font-bold text-pop-red">14</div>
                    <div className="text-xs">Today</div>
                  </div>
                  <div className="p-2 bg-pop-red/10 rounded text-sm">
                    <div className="font-bold">15</div>
                    <div className="text-xs">5 pickups</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded text-sm">
                    <div className="font-bold">16</div>
                    <div className="text-xs">1 pickup</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded text-sm">
                    <div className="font-bold">17</div>
                    <div className="text-xs">-</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded text-sm">
                    <div className="font-bold">18</div>
                    <div className="text-xs">-</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Full Calendar
                  </Button>
                  <Button size="sm" variant="outline">
                    <MapPin className="h-4 w-4 mr-2" />
                    Map View
                  </Button>
                  <Button size="sm" className="bg-pop-green hover:bg-pop-green/90">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Pickup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Fullscreen Logistics Management Dialog */}
      <Dialog open={isLogisticsFullscreen} onOpenChange={setIsLogisticsFullscreen}>
        <DialogContent className="max-w-none w-screen h-screen m-0 p-0 bg-gray-50">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 bg-white border-b">
              <h2 className="text-2xl font-bold text-pop-black">Logistics Management</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLogisticsFullscreen(false)}
                className="border-pop-red hover:bg-pop-red hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
                <div className="flex items-center justify-between mb-6">
                  <TabsList className="relative z-10 p-0 bg-transparent h-auto gap-0 flex-nowrap overflow-visible">
                    <TabsTrigger value="collections" className="folder-tab-white relative z-[4] text-sm px-6 py-3">
                      <Package className="w-4 h-4 mr-2 text-pop-green" />
                      Collections
                    </TabsTrigger>
                    <TabsTrigger value="processing" className="folder-tab-white relative z-[3] -ml-6 text-sm px-6 py-3">
                      <Settings className="w-4 h-4 mr-2 text-pop-green" />
                      Processing
                    </TabsTrigger>
                    <TabsTrigger value="fulfillment" className="folder-tab-white relative z-[2] -ml-6 text-sm px-6 py-3">
                      <Truck className="w-4 h-4 mr-2 text-pop-green" />
                      Fulfillment
                    </TabsTrigger>
                    <TabsTrigger value="inventory" className="folder-tab-white relative z-[1] -ml-6 text-sm px-6 py-3">
                      <BarChart3 className="w-4 h-4 mr-2 text-pop-green" />
                      Inventory
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Collections Tab Fullscreen */}
                <TabsContent value="collections" className="space-y-6 h-full">
                  <DataTable
                    title="Collections Queue"
                    description="Live status overview of all bins assigned for pickup and collected materials awaiting processing"
                    icon={<Package className="h-5 w-5 text-pop-green" />}
                    data={bins}
                    columns={allBinColumns.filter(col => defaultBinColumns.includes(String(col.key)))}
                    availableColumns={allBinColumns}
                    defaultVisibleColumns={defaultBinColumns}
                    enableColumnSelection={true}
                    enableFiltering={true}
                    editableFields={binEditableFields}
                    onSave={handleBinSave}
                    onDelete={handleBinDelete}
                    sortField={collectionsSortField}
                    sortDirection={collectionsSortDirection}
                    onSort={(field, direction) => {
                      setCollectionsSortField(field);
                      setCollectionsSortDirection(direction);
                    }}
                  />
                </TabsContent>

                {/* Processing Tab Fullscreen */}
                <TabsContent value="processing" className="space-y-6 h-full">
                  <DataTable
                    title="Processing Queue"
                    description="Active batches moving through sorting, cleaning, and shredding stages"
                    icon={<Settings className="h-5 w-5 text-pop-green" />}
                    data={batches}
                    columns={allBatchColumns.filter(col => defaultBatchColumns.includes(String(col.key)))}
                    availableColumns={allBatchColumns}
                    defaultVisibleColumns={defaultBatchColumns}
                    enableColumnSelection={true}
                    enableFiltering={true}
                    editableFields={batchEditableFields}
                    onSave={handleBatchSave}
                    onDelete={handleBatchDelete}
                    sortField={processingSortField}
                    sortDirection={processingSortDirection}
                    onSort={(field, direction) => {
                      setProcessingSortField(field);
                      setProcessingSortDirection(direction);
                    }}
                  />
                </TabsContent>

                {/* Fulfillment Tab Fullscreen */}
                <TabsContent value="fulfillment" className="space-y-6 h-full">
                  <DataTable
                    title="Fulfillment Queue"
                    description="Customer orders and maker assignments for item assembly and delivery"
                    icon={<Truck className="h-5 w-5 text-pop-green" />}
                    data={orders}
                    columns={allOrderColumns.filter(col => defaultOrderColumns.includes(String(col.key)))}
                    availableColumns={allOrderColumns}
                    defaultVisibleColumns={defaultOrderColumns}
                    enableColumnSelection={true}
                    enableFiltering={true}
                    editableFields={orderEditableFields}
                    onSave={handleOrderSave}
                    onDelete={handleOrderDelete}
                    sortField={fulfillmentSortField}
                    sortDirection={fulfillmentSortDirection}
                    onSort={(field, direction) => {
                      setFulfillmentSortField(field);
                      setFulfillmentSortDirection(direction);
                    }}
                  />
                </TabsContent>

                {/* Inventory Tab Fullscreen */}
                <TabsContent value="inventory" className="space-y-6 h-full">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Material Inventory</CardTitle>
                        <CardDescription>Raw plastic material tracking</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              Processed Plastic Stock
                            </span>
                            <span className="font-medium">847 lbs</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              Pending Processing
                            </span>
                            <span className="font-medium">156 lbs</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              Ready for Production
                            </span>
                            <span className="font-medium text-pop-green">691 lbs</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Quality Hold</span>
                            <span className="font-medium text-pop-red">12 lbs</span>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          Update Material Levels
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Production Inventory</CardTitle>
                        <CardDescription>Finished goods and blanks</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm">Phone Stand Blanks</span>
                            <span className="font-medium">45 units</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm">Desk Organizer Blanks</span>
                            <span className="font-medium">28 units</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm">Plant Holder Blanks</span>
                            <span className="font-medium">19 units</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm">Custom Order Blanks</span>
                            <span className="font-medium">7 units</span>
                          </div>
                        </div>
                        <Button className="w-full bg-pop-blue hover:bg-pop-blue/90">
                          Generate Production Report
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Quality Control</CardTitle>
                        <CardDescription>Batch tracking and compliance</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-pop-green/5 rounded-lg">
                            <div>
                              <span className="font-medium text-sm">Batch BA-8471</span>
                              <p className="text-xs text-gray-600">
                                All QC checks passed
                              </p>
                            </div>
                            <Badge className="bg-pop-green text-white">Approved</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-pop-blue/5 rounded-lg">
                            <div>
                              <span className="font-medium text-sm">Batch BA-8472</span>
                              <p className="text-xs text-gray-600">
                                Pending final inspection
                              </p>
                            </div>
                            <Badge className="bg-pop-blue text-white">Review</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-pop-red/5 rounded-lg">
                            <div>
                              <span className="font-medium text-sm">Batch BA-8469</span>
                              <p className="text-xs text-gray-600">
                                Material defect noted
                              </p>
                            </div>
                            <Badge className="bg-pop-red text-white">Hold</Badge>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          View QC Documentation
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Inventory Movements</CardTitle>
                      <CardDescription>
                        Recent stock changes and transfers
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <span className="font-medium text-sm">
                              Material Addition
                            </span>
                            <p className="text-xs text-gray-600">
                              +45 lbs from Batch BA-8472
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-gray-500">2 hours ago</span>
                            <p className="text-xs text-pop-green">Station 1</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <span className="font-medium text-sm">
                              Production Consumption
                            </span>
                            <p className="text-xs text-gray-600">
                              -12 lbs for Phone Stand Blanks
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-gray-500">4 hours ago</span>
                            <p className="text-xs text-pop-blue">Manufacturing</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <span className="font-medium text-sm">Quality Hold</span>
                            <p className="text-xs text-gray-600">
                              -12 lbs from Batch BA-8469
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-gray-500">1 day ago</span>
                            <p className="text-xs text-pop-red">QC Hold</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Scan Modal */}
      <Dialog open={showScanModal} onOpenChange={setShowScanModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Scan className="h-5 w-5 text-pop-green" />
              QR Code Scanner
            </DialogTitle>
            <DialogDescription>
              Scan any QR code for bin status, batch processing, or item tracking
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Camera placeholder */}
            <div className="relative aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Camera feed will appear here</p>
                <p className="text-xs text-gray-400 mt-1">Position QR code within frame</p>
              </div>
              
              {/* Scanning overlay */}
              <div className="absolute inset-4 border-2 border-pop-green rounded-lg">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-pop-green"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-pop-green"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-pop-green"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-pop-green"></div>
              </div>
            </div>

            {/* Scan controls */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowScanModal(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-pop-green hover:bg-pop-green/90"
                onClick={() => {
                  // Simulate successful scan - in real implementation this would process the QR code
                  setShowScanModal(false);
                  // Here you would handle the scanned code and open the appropriate modal/action
                }}
              >
                <Scan className="h-4 w-4 mr-2" />
                Scan
              </Button>
            </div>

            {/* Quick access buttons */}
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-3">Quick Access:</p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <Package className="h-3 w-3 mr-1" />
                  Bin Status
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Settings className="h-3 w-3 mr-1" />
                  Batch Process
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Archive className="h-3 w-3 mr-1" />
                  Item Track
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Truck className="h-3 w-3 mr-1" />
                  Collection
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
