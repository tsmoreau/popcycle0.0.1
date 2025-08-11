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
import { RoughWashStationCard } from "../../components/operations/stations/RoughWashStationCard";
import { SortStationCard } from "../../components/operations/stations/SortStationCard";

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
import { CollectionsTab } from "../../components/operations/tabs/CollectionsTab";
import { ProcessingTab } from "../../components/operations/tabs/ProcessingTab";
import { FulfillmentTab } from "../../components/operations/tabs/FulfillmentTab";
import { InventoryTab } from "../../components/operations/tabs/InventoryTab";

export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState("collections");
  const [selectedBin, setSelectedBin] = useState(null);
  const [showScanModal, setShowScanModal] = useState(false);
  const [isLogisticsFullscreen, setIsLogisticsFullscreen] = useState(false);

  const [showRoughWashFullscreen, setShowRoughWashFullscreen] = useState(false);
  const [showSortFullscreen, setShowSortFullscreen] = useState(false);

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
          <CollectionsTab
            bins={bins}
            loadingBins={loadingBins}
            allBinColumns={allBinColumns}
            defaultBinColumns={defaultBinColumns}
            binEditableFields={binEditableFields}
            handleBinSave={handleBinSave}
            handleBinDelete={handleBinDelete}
            collectionsSortField={collectionsSortField}
            collectionsSortDirection={collectionsSortDirection}
            onSort={(field, direction) => {
              setCollectionsSortField(field);
              setCollectionsSortDirection(direction);
            }}
          />
        </TabsContent>

        {/* Processing Tab */}
        <TabsContent value="processing" className="space-y-6">
          <ProcessingTab
            batches={batches}
            loadingBatches={loadingBatches}
            allBatchColumns={allBatchColumns}
            defaultBatchColumns={defaultBatchColumns}
            batchEditableFields={batchEditableFields}
            handleBatchSave={handleBatchSave}
            handleBatchDelete={handleBatchDelete}
            processingSortField={processingSortField}
            processingSortDirection={processingSortDirection}
            onSort={(field, direction) => {
              setProcessingSortField(field);
              setProcessingSortDirection(direction);
            }}
          />
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-6">
          <InventoryTab
            blanks={blanks}
            loadingBlanks={loadingBlanks}
            allBlankColumns={allBlankColumns}
            defaultBlankColumns={defaultBlankColumns}
            blankEditableFields={blankEditableFields}
            handleBlankSave={handleBlankSave}
            handleBlankDelete={handleBlankDelete}
          />
        </TabsContent>

        {/* Fulfillment Tab */}
        <TabsContent value="fulfillment" className="space-y-6">
          <FulfillmentTab
            orders={orders}
            loadingOrders={loadingOrders}
            allOrderColumns={allOrderColumns}
            defaultOrderColumns={defaultOrderColumns}
            orderEditableFields={orderEditableFields}
            handleOrderSave={handleOrderSave}
            handleOrderDelete={handleOrderDelete}
            fulfillmentSortField={fulfillmentSortField}
            fulfillmentSortDirection={fulfillmentSortDirection}
            onSort={(field, direction) => {
              setFulfillmentSortField(field);
              setFulfillmentSortDirection(direction);
            }}
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
              {/* Component-Based Station 1: Rough Wash */}
              <RoughWashStationCard
                station={{
                  currentBatch: "BA-8473",
                  status: "Processing", 
                  progress: 78
                }}
                onFullscreen={() => setShowRoughWashFullscreen(true)}
              />

              {/* Component-Based Station 2: Sort */}
              <SortStationCard
                station={{
                  queue: ["BA-8472", "BA-8471"],
                  status: "Idle",
                  currentMaterial: "PET Bottles"
                }}
                onFullscreen={() => setShowSortFullscreen(true)}
              />
         
              {/* Station 2: Sort - Original Hard-coded */}
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
            <div className="flex-1 flex flex-col overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
                <div className="flex items-center justify-between mb-6 px-6 pt-6">
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsLogisticsFullscreen(false)}
                    className="border-pop-red hover:bg-pop-red hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Collections Tab Fullscreen */}
<TabsContent value="collections" className="flex-1 overflow-hidden px-6 pb-6">
                  <CollectionsTab
                    bins={bins}
                    loadingBins={loadingBins}
                    allBinColumns={allBinColumns}
                    defaultBinColumns={defaultBinColumns}
                    binEditableFields={binEditableFields}
                    handleBinSave={handleBinSave}
                    handleBinDelete={handleBinDelete}
                    collectionsSortField={collectionsSortField}
                    collectionsSortDirection={collectionsSortDirection}
                    onSort={(field, direction) => {
                      setCollectionsSortField(field);
                      setCollectionsSortDirection(direction);
                    }}
                    isFullscreen={true}
                  />
                </TabsContent>

                {/* Processing Tab Fullscreen */}
                <TabsContent value="processing" className="flex-1 px-6 pb-6">
                  <ProcessingTab
                    batches={batches}
                    loadingBatches={loadingBatches}
                    allBatchColumns={allBatchColumns}
                    defaultBatchColumns={defaultBatchColumns}
                    batchEditableFields={batchEditableFields}
                    handleBatchSave={handleBatchSave}
                    handleBatchDelete={handleBatchDelete}
                    processingSortField={processingSortField}
                    processingSortDirection={processingSortDirection}
                    onSort={(field, direction) => {
                      setProcessingSortField(field);
                      setProcessingSortDirection(direction);
                    }}
                    isFullscreen={true}
                  />
                </TabsContent>

                {/* Fulfillment Tab Fullscreen */}
                <TabsContent value="fulfillment" className="flex-1 px-6 pb-6">
                  <FulfillmentTab
                    orders={orders}
                    loadingOrders={loadingOrders}
                    allOrderColumns={allOrderColumns}
                    defaultOrderColumns={defaultOrderColumns}
                    orderEditableFields={orderEditableFields}
                    handleOrderSave={handleOrderSave}
                    handleOrderDelete={handleOrderDelete}
                    fulfillmentSortField={fulfillmentSortField}
                    fulfillmentSortDirection={fulfillmentSortDirection}
                    onSort={(field, direction) => {
                      setFulfillmentSortField(field);
                      setFulfillmentSortDirection(direction);
                    }}
                    isFullscreen={true}
                  />
                </TabsContent>

                {/* Inventory Tab Fullscreen */}
                <TabsContent value="inventory" className="flex-1 px-6 pb-6">
                  <InventoryTab
                    blanks={blanks}
                    loadingBlanks={loadingBlanks}
                    allBlankColumns={allBlankColumns}
                    defaultBlankColumns={defaultBlankColumns}
                    blankEditableFields={blankEditableFields}
                    handleBlankSave={handleBlankSave}
                    handleBlankDelete={handleBlankDelete}
                    isFullscreen={true}
                  />
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



      {/* Rough Wash Card Fullscreen Dialog */}
      <Dialog open={showRoughWashFullscreen} onOpenChange={setShowRoughWashFullscreen}>
        <DialogContent className="max-w-none w-screen h-screen m-0 p-0 overflow-hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowRoughWashFullscreen(false)}
            className="absolute top-4 right-4 z-20 h-8 w-8 p-0 bg-white hover:bg-gray-100 shadow-md"
          >
            <X className="h-4 w-4" />
          </Button>
          <RoughWashStationCard
            station={{
              currentBatch: "BA-8473",
              status: "Processing", 
              progress: 78
            }}
            isFullscreen={true}
          />
        </DialogContent>
      </Dialog>

      {/* Sort Station Card Fullscreen Dialog */}
      <Dialog open={showSortFullscreen} onOpenChange={setShowSortFullscreen}>
        <DialogContent className="max-w-none w-screen h-screen m-0 p-0 overflow-hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSortFullscreen(false)}
            className="absolute top-4 right-4 z-20 h-8 w-8 p-0 bg-white hover:bg-gray-100 shadow-md"
          >
            <X className="h-4 w-4" />
          </Button>
          <SortStationCard
            station={{
              queue: ["BA-8472", "BA-8471"],
              status: "Idle",
              currentMaterial: "PET Bottles"
            }}
            isFullscreen={true}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
