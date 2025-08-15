"use client";

import { useState, useEffect } from "react";
import {
  Package,
  Truck,
  Settings,
  Calendar,
  BarChart3,
  Users,
  MapPin,
  Maximize,
  X,
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
} from "../../components/ui/dialog";
import { Bin, Batch, Order, Blank } from "../../../lib/schemas";

import { useOperationsData } from "../../../hooks/useOperationsData";
import { OperationsOverview } from "../../components/operations/OperationsOverview";
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
    handleBinAdd,
    handleBinDelete,
    handleBatchSave,
    handleBatchAdd,
    handleBatchDelete,
    handleOrderSave,
    handleOrderAdd,
    handleOrderDelete,
    handleBlankSave,
    handleBlankAdd,
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
  // All modal functions moved to individual tab components

  // Badge functions now imported from StatusBadges component

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-pop-black">
          Operations Dashboard
        </h2>
       
      </div>

      {/* Operations Overview - Connected to Real Data */}
      <OperationsOverview 
        bins={bins}
        batches={batches}
        orders={orders}
        blanks={blanks}
        loading={loadingBins || loadingBatches || loadingOrders || loadingBlanks}
      />

    

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
            handleBinAdd={handleBinAdd}
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
            handleBatchAdd={handleBatchAdd}
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
            handleBlankAdd={handleBlankAdd}
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
            handleOrderAdd={handleOrderAdd}
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
                <h3 className="text-lg font-semibold text-pop-black">Production Interfaces</h3>
                <p className="text-sm text-gray-600">Real-time monitoring and control of materials processing</p>
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

              {/* Component-Based Station 3: Shred */}
              <ShredStationCard
                station={{
                  materialInput: "Weight (lbs)",
                  status: "Ready",
                  targetSize: "5mm flakes"
                }}
                onFullscreen={() => setShowShredFullscreen(true)}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Station 3: Shred - Original Hard-coded */}
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
                    handleBinAdd={handleBinAdd}
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
                    handleBatchAdd={handleBatchAdd}
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
                    handleOrderAdd={handleOrderAdd}
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
                    handleBlankAdd={handleBlankAdd}
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
      {/* QR Scanner Component - Using Extracted Component */}
      <QRScanner open={showScanModal} onOpenChange={setShowScanModal} />



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

      {/* Shred Station Card Fullscreen Dialog */}
      <Dialog open={showShredFullscreen} onOpenChange={setShowShredFullscreen}>
        <DialogContent className="max-w-none w-screen h-screen m-0 p-0 overflow-hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowShredFullscreen(false)}
            className="absolute top-4 right-4 z-20 h-8 w-8 p-0 bg-white hover:bg-gray-100 shadow-md"
          >
            <X className="h-4 w-4" />
          </Button>
          <ShredStationCard
            station={{
              materialInput: "Weight (lbs)",
              status: "Ready",
              targetSize: "5mm flakes"
            }}
            isFullscreen={true}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
