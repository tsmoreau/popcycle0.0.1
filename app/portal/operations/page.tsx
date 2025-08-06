"use client";

import { useState } from "react";
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
import { DataTable, Column } from "../../components/ui/data-table";

export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState("collections");
  const [selectedBin, setSelectedBin] = useState(null);
  const [showScanModal, setShowScanModal] = useState(false);

  // Mock data for Collections Queue - this should come from your MongoDB API
  const collectionsQueue = [
    {
      id: "BI-7829",
      qrCode: "QR-BI-7829",
      orgId: "ORG-001",
      orgName: "TechCorp",
      location: "Floor 3 Kitchen",
      status: "Ready for Pickup",
      capacity: 50,
      currentLevel: 85,
      type: "permanent",
      collectionDate: "2025-01-15",
      isActive: true,
      adoptedBy: "Engineering Team"
    },
    {
      id: "BI-7830",
      qrCode: "QR-BI-7830", 
      orgId: "ORG-002",
      orgName: "GreenOffice",
      location: "Main Kitchen",
      status: "Collected",
      capacity: 30,
      currentLevel: 100,
      type: "permanent",
      collectionDate: "2025-01-14",
      isActive: true,
      adoptedBy: null
    },
    {
      id: "BI-7831",
      qrCode: "QR-BI-7831",
      orgId: "ORG-003", 
      orgName: "Metro Facilities",
      location: "Building A Lobby",
      status: "Awaiting Rough Wash",
      capacity: 40,
      currentLevel: 78,
      type: "permanent",
      collectionDate: "2025-01-13",
      isActive: true,
      adoptedBy: "Facilities Team"
    },
    {
      id: "BI-7832",
      qrCode: "QR-BI-7832",
      orgId: "ORG-004",
      orgName: "Creative Studios",
      location: "Event Space",
      status: "Ready for Pickup",
      capacity: 25,
      currentLevel: 92,
      type: "temporary",
      collectionDate: "2025-01-16",
      isActive: true,
      adoptedBy: null
    }
  ];

  // Mock data for Processing Queue - this should come from your MongoDB API
  const processingQueue = [
    {
      id: "BA-8472",
      qrCode: "QR-BA-8472",
      binId: "BI-7829",
      orgName: "TechCorp",
      collectionDate: "2025-01-15",
      weight: 45,
      materialType: "HDPE",
      collectedBy: "Mike Chen",
      status: "collected",
      stage: "rough_wash",
      notes: "Large batch, mixed containers"
    },
    {
      id: "BA-8471",
      qrCode: "QR-BA-8471",
      binId: "BI-7830",
      orgName: "GreenOffice",
      collectionDate: "2025-01-14",
      weight: 32,
      materialType: "PET",
      collectedBy: "Sarah Kim",
      status: "sorted",
      stage: "sorting",
      notes: "Clean bottles mostly"
    },
    {
      id: "BA-8470",
      qrCode: "QR-BA-8470",
      binId: "BI-7831",
      orgName: "Metro Facilities",
      collectionDate: "2025-01-13",
      weight: 28,
      materialType: "mixed",
      collectedBy: "Alex Rivera",
      status: "cleaned",
      stage: "shredding",
      notes: "Ready for processing"
    },
    {
      id: "BA-8469",
      qrCode: "QR-BA-8469",
      binId: "BI-7832",
      orgName: "Creative Studios",
      collectionDate: "2025-01-12",
      weight: 38,
      materialType: "PP",
      collectedBy: "Mike Chen",
      status: "processed",
      stage: "complete",
      notes: "High quality material"
    }
  ];

  // Mock data for Fulfillment Queue - this should come from your MongoDB API
  const fulfillmentQueue = [
    {
      id: "ORD-2847",
      qrCode: "QR-ORD-2847",
      customerName: "GreenTech Corp",
      itemType: "Phone Stand",
      quantity: 3,
      dueDate: "2025-01-17",
      status: "urgent",
      priority: "high",
      assignedMaker: null,
      batchId: "BA-8472",
      notes: "Rush order - customer pickup"
    },
    {
      id: "ORD-2846",
      qrCode: "QR-ORD-2846",
      customerName: "Metro Facilities",
      itemType: "Desk Organizer",
      quantity: 1,
      dueDate: "2025-01-18",
      status: "assembly",
      priority: "medium",
      assignedMaker: "Jordan Kim",
      batchId: "BA-8471",
      notes: "Standard assembly timeline"
    },
    {
      id: "ORD-2845",
      qrCode: "QR-ORD-2845",
      customerName: "Creative Studios",
      itemType: "Plant Holder",
      quantity: 2,
      dueDate: "2025-01-21",
      status: "ready",
      priority: "medium",
      assignedMaker: null,
      batchId: "BA-8470",
      notes: "Materials ready for assembly"
    },
    {
      id: "ORD-2844",
      qrCode: "QR-ORD-2844",
      customerName: "TechCorp",
      itemType: "Desk Organizer",
      quantity: 1,
      dueDate: "2025-01-20",
      status: "shipping",
      priority: "low",
      assignedMaker: "Maria Santos",
      batchId: "BA-8469",
      notes: "Completed, ready for shipment"
    },
    {
      id: "ORD-2843",
      qrCode: "QR-ORD-2843",
      customerName: "GreenOffice",
      itemType: "Phone Stand",
      quantity: 2,
      dueDate: "2025-01-19",
      status: "shipped",
      priority: "low",
      assignedMaker: "Alex Chen",
      batchId: "BA-8468",
      notes: "Delivered successfully"
    }
  ];

  // Column definitions for DataTable components
  const collectionsColumns: Column<any>[] = [
    { key: "id", header: "Bin ID" },
    { key: "orgName", header: "Organization" },
    { key: "location", header: "Location" },
    { 
      key: "status", 
      header: "Status",
      render: (item) => getStatusBadge(item.status)
    },
    { 
      key: "currentLevel", 
      header: "Capacity",
      render: (item) => (
        <div className="flex items-center gap-2">
          <div className="w-20 bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                item.currentLevel >= 85 ? 'bg-pop-red' : 
                item.currentLevel >= 60 ? 'bg-orange-500' : 'bg-pop-green'
              }`}
              style={{ width: `${item.currentLevel}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600">{item.currentLevel}%</span>
        </div>
      )
    },
    { 
      key: "type", 
      header: "Type",
      render: (item) => (
        <Badge variant={item.type === "permanent" ? "default" : "secondary"}>
          {item.type}
        </Badge>
      )
    }
  ];

  const processingColumns: Column<any>[] = [
    { key: "id", header: "Batch ID" },
    { key: "orgName", header: "Organization" },
    { 
      key: "weight", 
      header: "Weight",
      render: (item) => `${item.weight} lbs`
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
    { key: "collectedBy", header: "Collector" }
  ];

  const fulfillmentColumns: Column<any>[] = [
    { key: "id", header: "Order ID" },
    { key: "customerName", header: "Customer" },
    { key: "itemType", header: "Item" },
    { key: "quantity", header: "Qty" },
    { 
      key: "status", 
      header: "Status",
      render: (item) => getFulfillmentStatusBadge(item.status)
    },
    { key: "dueDate", header: "Due Date" }
  ];

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
            <Label className="text-sm font-medium text-gray-700">Source Bin</Label>
            <p className="text-sm font-mono">{batch.binId}</p>
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
        return <Badge className="bg-pop-blue text-white">Collected</Badge>;
      case "sorted":
        return <Badge className="bg-pop-green text-white">Sorted</Badge>;
      case "cleaned":
        return <Badge className="bg-orange-500 text-white">Cleaned</Badge>;
      case "processed":
        return <Badge className="bg-pop-red text-white">Processed</Badge>;
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
                <p className="text-sm text-gray-600">Real-time system metrics and status</p>
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
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Unified Quick Scan Section */}
      <div 
        className="w-full border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
        onClick={() => setShowScanModal(true)}
      >
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <Scan className="h-5 w-5 text-gray-600" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-pop-black">Quick QR Access</h3>
              <p className="text-sm text-gray-600">Scan any bin or batch QR code for instant access</p>
            </div>
            <div className="text-gray-400">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Operations Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="relative">
          <TabsList className="mb-0 relative z-10 p-0 bg-transparent h-auto gap-0 flex-nowrap overflow-visible">
            <TabsTrigger value="collections" className="folder-tab-white relative z-[4] text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2">
              📦 Collections
            </TabsTrigger>
            <TabsTrigger value="processing" className="folder-tab-white relative z-[3] -ml-6 sm:ml-0 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2">
              ⚙️ Processing
            </TabsTrigger>
            <TabsTrigger value="fulfillment" className="folder-tab-white relative z-[2] -ml-6 sm:ml-0 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2">
              🚚 Fulfillment
            </TabsTrigger>
            <TabsTrigger value="inventory" className="folder-tab-white relative z-[1] -ml-6 sm:ml-0 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2">
              📊 Inventory
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Collections Tab */}
        <TabsContent value="collections" className="space-y-6">
          {/* Collections Queue */}
          <DataTable
            title="Collections Queue"
            description="Live status overview of all bins assigned for pickup and collected materials awaiting processing"
            icon={<Package className="h-5 w-5 text-pop-green" />}
            data={collectionsQueue}
            columns={collectionsColumns}
            renderModal={renderCollectionsModal}
          />

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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pickup Scheduling</CardTitle>
                <CardDescription>
                  Route optimization and calendar integration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-pop-red/5 rounded-lg">
                    <div>
                      <span className="font-medium text-sm">
                        TechCorp - Floor 3
                      </span>
                      <p className="text-xs text-gray-600">
                        BI-7829 - 85% Full
                      </p>
                    </div>
                    <Badge className="bg-pop-red text-white">Urgent</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pop-blue/5 rounded-lg">
                    <div>
                      <span className="font-medium text-sm">
                        GreenOffice Kitchen
                      </span>
                      <p className="text-xs text-gray-600">BI-7830 - Ready</p>
                    </div>
                    <Badge className="bg-pop-blue text-white">Scheduled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pop-green/5 rounded-lg">
                    <div>
                      <span className="font-medium text-sm">
                        Metro Facilities A
                      </span>
                      <p className="text-xs text-gray-600">
                        BI-7831 - 78% Full
                      </p>
                    </div>
                    <Badge className="bg-pop-green text-white">Tomorrow</Badge>
                  </div>
                </div>
                <Button className="w-full bg-pop-green hover:bg-pop-green/90">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Pickup Route
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bin Network Status</CardTitle>
                <CardDescription>Real-time capacity monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Bins</span>
                    <span className="font-medium">156 total</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Ready for Pickup
                    </span>
                    <span className="font-medium text-pop-red">12 bins</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Recently Collected
                    </span>
                    <span className="font-medium">8 today</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Average Fill Rate
                    </span>
                    <span className="font-medium">67%</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  View Bin Map
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mobile Staff Workflow</CardTitle>
                <CardDescription>Collection team management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">Driver: Mike Chen</span>
                    <Badge className="bg-pop-green text-white">
                      Active Route
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">Driver: Sarah Kim</span>
                    <Badge variant="outline">Available</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">Driver: Alex Rivera</span>
                    <Badge className="bg-pop-blue text-white">Break</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Collection Log
                </Button>
                <Button className="w-full bg-pop-blue hover:bg-pop-blue/90">
                  Assign New Route
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Collection History</CardTitle>
              <CardDescription>
                Recent pickups and batch creation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium text-sm">
                      Batch BA-8472 Created
                    </span>
                    <p className="text-xs text-gray-600">
                      45 lbs from TechCorp Industries
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">2 hours ago</span>
                    <p className="text-xs text-pop-green">Driver: Mike Chen</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium text-sm">
                      Batch BA-8471 Created
                    </span>
                    <p className="text-xs text-gray-600">
                      32 lbs from GreenOffice Solutions
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">5 hours ago</span>
                    <p className="text-xs text-pop-green">Driver: Sarah Kim</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium text-sm">
                      Batch BA-8470 Created
                    </span>
                    <p className="text-xs text-gray-600">
                      28 lbs from Metro Facilities
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">1 day ago</span>
                    <p className="text-xs text-pop-green">
                      Driver: Alex Rivera
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>


        </TabsContent>

        {/* Processing Tab */}
        <TabsContent value="processing" className="space-y-6">
          {/* Processing Queue */}
          <DataTable
            title="Processing Queue"
            description="Live status overview of all batches in various processing stages"
            icon={<Settings className="h-5 w-5 text-pop-blue" />}
            data={processingQueue}
            columns={processingColumns}
            renderModal={renderProcessingModal}
          />

          {/* Processing Workflow Diagram */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5 text-pop-blue" />
                Processing Workflow
              </CardTitle>
              <CardDescription>
                Complete processing pipeline from collection to finished material
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
              </div>
            </CardContent>
          </Card>

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

          <Card>
            <CardHeader>
              <CardTitle>Batch Processing Status</CardTitle>
              <CardDescription>
                Track material transformation pipeline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium text-sm">Batch BA-8472</span>
                    <p className="text-xs text-gray-600">
                      45 lbs → 12 Phone Stands
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-pop-blue text-white">Station 2</Badge>
                    <span className="text-xs text-gray-500">8/12 complete</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium text-sm">Batch BA-8471</span>
                    <p className="text-xs text-gray-600">
                      32 lbs → 8 Desk Organizers
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-pop-green text-white">Complete</Badge>
                    <span className="text-xs text-gray-500">8/8 ready</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium text-sm">Batch BA-8470</span>
                    <p className="text-xs text-gray-600">
                      28 lbs → 7 Plant Holders
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-pop-green text-white">Station 1</Badge>
                    <span className="text-xs text-gray-500">3/7 created</span>
                  </div>
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
          <DataTable
            title="Order Queue"
            description="Customer orders and maker assignments with fulfillment status tracking"
            icon={<Users className="h-5 w-5 text-pop-green" />}
            data={fulfillmentQueue}
            columns={fulfillmentColumns}
            renderModal={renderFulfillmentModal}
          />

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
