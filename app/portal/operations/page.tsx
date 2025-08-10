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
import { CollectionsWorkflow } from "../../components/operations/CollectionsWorkflow";
import {
  getStatusBadge,
  getProcessingStatusBadge,
  getMaterialTypeBadge,
  getFulfillmentStatusBadge,
} from "../../components/operations/StatusBadges";
import {
  binEditableFields,
  batchEditableFields,
  orderEditableFields,
  blankEditableFields,
  allBinColumns,
  defaultBinColumns,
  allBatchColumns,
  defaultBatchColumns,
  allOrderColumns,
  defaultOrderColumns,
  allBlankColumns,
  defaultBlankColumns,
} from "../../components/operations/TableConfigurations";
import { CollectionsTabContent } from "../../components/operations/CollectionsTabContent";
import { ProcessingTabContent } from "../../components/operations/ProcessingTabContent";
import { FulfillmentTabContent } from "../../components/operations/FulfillmentTabContent";
import { InventoryTabContent } from "../../components/operations/InventoryTabContent";

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

  // Table configurations imported from separate file
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
          <CollectionsTabContent
            bins={bins}
            loadingBins={loadingBins}
            handleBinSave={handleBinSave}
            handleBinDelete={handleBinDelete}
            collectionsSortField={collectionsSortField}
            collectionsSortDirection={collectionsSortDirection}
            setCollectionsSortField={setCollectionsSortField}
            setCollectionsSortDirection={setCollectionsSortDirection}
          />
        </TabsContent>

        {/* Processing Tab */}
        <TabsContent value="processing" className="space-y-6">
          <ProcessingTabContent
            batches={batches}
            loadingBatches={loadingBatches}
            handleBatchSave={handleBatchSave}
            handleBatchDelete={handleBatchDelete}
            processingSortField={processingSortField}
            processingSortDirection={processingSortDirection}
            setProcessingSortField={setProcessingSortField}
            setProcessingSortDirection={setProcessingSortDirection}
          />
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-6">
          <InventoryTabContent
            blanks={blanks}
            loadingBlanks={loadingBlanks}
            handleBlankSave={handleBlankSave}
            handleBlankDelete={handleBlankDelete}
          />
        </TabsContent>

        {/* Fulfillment Tab */}
        <TabsContent value="fulfillment" className="space-y-6">
          <FulfillmentTabContent
            orders={orders}
            loadingOrders={loadingOrders}
            handleOrderSave={handleOrderSave}
            handleOrderDelete={handleOrderDelete}
            fulfillmentSortField={fulfillmentSortField}
            fulfillmentSortDirection={fulfillmentSortDirection}
            setFulfillmentSortField={setFulfillmentSortField}
            setFulfillmentSortDirection={setFulfillmentSortDirection}
          />
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
              <Card>
                <CardHeader>
                  <CardTitle>Station 1: Sorting & Cleaning</CardTitle>
                  <CardDescription>
                    Initial plastic sorting and washing operations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Batch</Label>
                    <Input value="BA-8473 - Mixed Plastics" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Next in Queue</Label>
                    <div className="space-y-1">
                      <div className="text-sm p-2 bg-gray-50 rounded">BA-8472 - PET Only</div>
                      <div className="text-sm p-2 bg-gray-50 rounded">BA-8471 - HDPE Mix</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Station Status</span>
                    <Badge className="bg-pop-green text-white">Active</Badge>
                  </div>
                  <Button className="w-full bg-pop-green hover:bg-pop-green/90">
                    Mark Batch Complete
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Station 2: Material Sorting</CardTitle>
                  <CardDescription>Automated plastic type sorting</CardDescription>
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
            </div>

            {/* Additional Production Workflow Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Station 3: Shredding</CardTitle>
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
                    <Badge className="bg-pop-green text-white">Ready</Badge>
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

              <Card>
                <CardHeader>
                  <CardTitle>Station 4: Fine Wash</CardTitle>
                  <CardDescription>Post-shred cleaning and debris removal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Material</Label>
                    <Input value="PET Flakes - 5mm" readOnly />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Wash Status</span>
                    <Badge className="bg-pop-blue text-white">Processing</Badge>
                  </div>
                  <Button className="w-full bg-pop-blue hover:bg-pop-blue/90">
                    Complete Wash Cycle
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Station 5: Drying</CardTitle>
                  <CardDescription>Final material preparation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Temperature Control</Label>
                    <div className="flex space-x-2">
                      <Input value="85°C" readOnly className="flex-1" />
                      <Button size="sm" variant="outline">Monitor</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Dryer Status</span>
                    <Badge variant="outline">Idle</Badge>
                  </div>
                  <Button className="w-full">
                    Start Drying Process
                  </Button>
                </CardContent>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Logistics & Collections Accordion */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="logistics-collections" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-pop-blue" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-pop-black">Logistics & Collections</h3>
                <p className="text-sm text-gray-600">Pickup scheduling and route optimization</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <CardTitle>Today's Collections Schedule</CardTitle>
                <CardDescription>Pickup routes and partner locations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  <div className="p-2 bg-gray-50 rounded text-sm text-center">
                    <div className="font-bold">Mon</div>
                    <div className="text-xs">11</div>
                  </div>
                  <div className="p-2 bg-pop-green/10 rounded text-sm text-center">
                    <div className="font-bold">Tue</div>
                    <div className="text-xs">12</div>
                    <div className="w-2 h-2 bg-pop-green rounded-full mx-auto mt-1"></div>
                  </div>
                  <div className="p-2 bg-pop-blue/10 rounded text-sm text-center">
                    <div className="font-bold">Wed</div>
                    <div className="text-xs">13</div>
                    <div className="w-2 h-2 bg-pop-blue rounded-full mx-auto mt-1"></div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded text-sm">
                    <div className="font-bold">Thu</div>
                    <div className="text-xs">14</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded text-sm">
                    <div className="font-bold">Fri</div>
                    <div className="text-xs">15</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded text-sm">
                    <div className="font-bold">Sat</div>
                    <div className="text-xs">16</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded text-sm">
                    <div className="font-bold">Sun</div>
                    <div className="text-xs">17</div>
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
            <div className="flex items-center justify-between p-6 bg-white border-b flex-shrink-0">
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
            
            <div className="flex-1 overflow-y-auto min-h-0">
              <div className="p-6">
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
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <QrCode className="h-4 w-4 mr-2" />
                      Scan QR
                    </Button>
                  </div>
                </div>

                {/* Collections Tab Fullscreen */}
                <TabsContent value="collections" className="space-y-6">
                  <CollectionsTabContent
                    bins={bins}
                    loadingBins={loadingBins}
                    handleBinSave={handleBinSave}
                    handleBinDelete={handleBinDelete}
                    collectionsSortField={collectionsSortField}
                    collectionsSortDirection={collectionsSortDirection}
                    setCollectionsSortField={setCollectionsSortField}
                    setCollectionsSortDirection={setCollectionsSortDirection}
                    isFullscreen={true}
                  />
                </TabsContent>

                {/* Processing Tab Fullscreen */}
                <TabsContent value="processing" className="space-y-6">
                  <ProcessingTabContent
                    batches={batches}
                    loadingBatches={loadingBatches}
                    handleBatchSave={handleBatchSave}
                    handleBatchDelete={handleBatchDelete}
                    processingSortField={processingSortField}
                    processingSortDirection={processingSortDirection}
                    setProcessingSortField={setProcessingSortField}
                    setProcessingSortDirection={setProcessingSortDirection}
                    isFullscreen={true}
                  />
                </TabsContent>

                {/* Fulfillment Tab Fullscreen */}
                <TabsContent value="fulfillment" className="space-y-6">
                  <FulfillmentTabContent
                    orders={orders}
                    loadingOrders={loadingOrders}
                    handleOrderSave={handleOrderSave}
                    handleOrderDelete={handleOrderDelete}
                    fulfillmentSortField={fulfillmentSortField}
                    fulfillmentSortDirection={fulfillmentSortDirection}
                    setFulfillmentSortField={setFulfillmentSortField}
                    setFulfillmentSortDirection={setFulfillmentSortDirection}
                    isFullscreen={true}
                  />
                </TabsContent>

                {/* Inventory Tab Fullscreen */}
                <TabsContent value="inventory" className="space-y-6">
                  <InventoryTabContent
                    blanks={blanks}
                    loadingBlanks={loadingBlanks}
                    handleBlankSave={handleBlankSave}
                    handleBlankDelete={handleBlankDelete}
                    isFullscreen={true}
                  />
                </TabsContent>
              </Tabs>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* QR Scanner Modal */}
      <QRScanner 
        isOpen={showScanModal} 
        onClose={() => setShowScanModal(false)} 
      />
    </div>
  );
}
