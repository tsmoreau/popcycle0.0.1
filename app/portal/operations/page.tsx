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

export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState("collections");
  const [selectedBin, setSelectedBin] = useState(null);
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [processingSortField, setProcessingSortField] = useState("id");
  const [processingSortDirection, setProcessingSortDirection] = useState("asc");
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

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleProcessingSort = (field: string) => {
    if (processingSortField === field) {
      setProcessingSortDirection(processingSortDirection === "asc" ? "desc" : "asc");
    } else {
      setProcessingSortField(field);
      setProcessingSortDirection("asc");
    }
  };

  const sortedQueue = [...collectionsQueue].sort((a, b) => {
    let aVal: any = a[sortField as keyof typeof a];
    let bVal: any = b[sortField as keyof typeof b];
    
    // Handle null/undefined values
    if (aVal == null) aVal = "";
    if (bVal == null) bVal = "";
    
    // Convert to string for comparison if needed
    if (typeof aVal === "string" && typeof bVal === "string") {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    
    if (sortDirection === "asc") {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });

  const sortedProcessingQueue = [...processingQueue].sort((a, b) => {
    let aVal: any = a[processingSortField as keyof typeof a];
    let bVal: any = b[processingSortField as keyof typeof b];
    
    // Handle null/undefined values
    if (aVal == null) aVal = "";
    if (bVal == null) bVal = "";
    
    // Convert to string for comparison if needed
    if (typeof aVal === "string" && typeof bVal === "string") {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    
    if (processingSortDirection === "asc") {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-pop-black">
          Operations Management
        </h2>
        <p className="text-gray-600 mt-2">
          Complete operations workflow: collections, processing, inventory, and
          fulfillment
        </p>
      </div>

      {/* Quick Stats Overview - Hidden on mobile */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bins</CardTitle>
            <Package className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-gray-600">12 ready for pickup</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Batches
            </CardTitle>
            <Truck className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-gray-600">8 processing, 15 complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Blanks in Inventory
            </CardTitle>
            <Settings className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-gray-600">Ready for manufacture</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Station Status
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2/2</div>
            <p className="text-xs text-gray-600">All stations online</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Operations Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="relative">
          <TabsList className="mb-0 relative z-10 p-0 bg-transparent h-auto gap-0 flex-nowrap overflow-visible">
            <TabsTrigger value="collections" className="folder-tab-green relative z-[4] text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2">
              📦 Collections
            </TabsTrigger>
            <TabsTrigger value="processing" className="folder-tab-blue relative z-[3] -ml-6 sm:ml-0 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2">
              ⚙️ Processing
            </TabsTrigger>
            <TabsTrigger value="inventory" className="folder-tab-red relative z-[2] -ml-6 sm:ml-0 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2">
              📊 Inventory
            </TabsTrigger>
            <TabsTrigger value="fulfillment" className="folder-tab-black relative z-[1] -ml-6 sm:ml-0 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2">
              🚚 Fulfillment
            </TabsTrigger>
          </TabsList>
          {/* Tab base line - will be covered by content border */}
          <div className="h-px bg-gray-400 w-full absolute bottom-0 z-0"></div>
        </div>

        {/* Collections Tab */}
        <TabsContent value="collections" className="space-y-6">
          {/* Scan Bin Section */}
          <Card className="bg-pop-green/5 border-pop-green/20">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-pop-green mb-1">Quick QR Access</h3>
                  <p className="text-sm text-gray-600">Scan code for bin check-in, check-out, and status updates</p>
                </div>
                <Button 
                  className="bg-pop-green hover:bg-pop-green/90 text-white px-8 py-3 text-base"
                  onClick={() => setShowScanModal(true)}
                >
                  <Scan className="h-5 w-5 mr-2" />
                  Scan QR Code
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Collections Queue */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-pop-green" />
                Collections Queue
              </CardTitle>
              <CardDescription>
                Live status overview of all bins assigned for pickup and collected materials awaiting processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead onClick={() => handleSort("id")} className="cursor-pointer hover:bg-gray-50">
                      Bin ID {sortField === "id" && (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead onClick={() => handleSort("orgName")} className="cursor-pointer hover:bg-gray-50">
                      Organization {sortField === "orgName" && (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead onClick={() => handleSort("location")} className="cursor-pointer hover:bg-gray-50">
                      Location {sortField === "location" && (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead onClick={() => handleSort("status")} className="cursor-pointer hover:bg-gray-50">
                      Status {sortField === "status" && (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead onClick={() => handleSort("currentLevel")} className="cursor-pointer hover:bg-gray-50">
                      Level {sortField === "currentLevel" && (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead onClick={() => handleSort("type")} className="cursor-pointer hover:bg-gray-50">
                      Type {sortField === "type" && (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedQueue.map((bin) => (
                    <Dialog key={bin.id}>
                      <DialogTrigger asChild>
                        <TableRow className="cursor-pointer hover:bg-gray-50">
                          <TableCell className="font-medium">{bin.id}</TableCell>
                          <TableCell>{bin.orgName}</TableCell>
                          <TableCell>{bin.location}</TableCell>
                          <TableCell>{getStatusBadge(bin.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    bin.currentLevel >= 85 ? 'bg-pop-red' : 
                                    bin.currentLevel >= 60 ? 'bg-orange-500' : 'bg-pop-green'
                                  }`}
                                  style={{ width: `${bin.currentLevel}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">{bin.currentLevel}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={bin.type === "permanent" ? "default" : "secondary"}>
                              {bin.type}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
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
                      </DialogContent>
                    </Dialog>
                  ))}
                </TableBody>
              </Table>
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
          <Card className="bg-pop-green/5 border-pop-green/20">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-pop-green mb-1">Quick QR Access</h3>
                  <p className="text-sm text-gray-600">Scan code for processing menu.</p>
                </div>
                <Button 
                  className="bg-pop-green hover:bg-pop-green/90 text-white px-8 py-3 text-base"
                  onClick={() => setShowScanModal(true)}
                >
                  <Scan className="h-5 w-5 mr-2" />
                  Scan Bin
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Processing Queue */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-pop-blue" />
                Processing Queue
              </CardTitle>
              <CardDescription>
                Live status overview of all batches in various processing stages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead onClick={() => handleProcessingSort("id")} className="cursor-pointer hover:bg-gray-50">
                      Batch ID {processingSortField === "id" && (processingSortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead onClick={() => handleProcessingSort("orgName")} className="cursor-pointer hover:bg-gray-50">
                      Organization {processingSortField === "orgName" && (processingSortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead onClick={() => handleProcessingSort("weight")} className="cursor-pointer hover:bg-gray-50">
                      Weight {processingSortField === "weight" && (processingSortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead onClick={() => handleProcessingSort("materialType")} className="cursor-pointer hover:bg-gray-50">
                      Material {processingSortField === "materialType" && (processingSortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead onClick={() => handleProcessingSort("status")} className="cursor-pointer hover:bg-gray-50">
                      Status {processingSortField === "status" && (processingSortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead onClick={() => handleProcessingSort("collectedBy")} className="cursor-pointer hover:bg-gray-50">
                      Collector {processingSortField === "collectedBy" && (processingSortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedProcessingQueue.map((batch) => (
                    <Dialog key={batch.id}>
                      <DialogTrigger asChild>
                        <TableRow className="cursor-pointer hover:bg-gray-50">
                          <TableCell className="font-medium">{batch.id}</TableCell>
                          <TableCell>{batch.orgName}</TableCell>
                          <TableCell>{batch.weight} lbs</TableCell>
                          <TableCell>{getMaterialTypeBadge(batch.materialType)}</TableCell>
                          <TableCell>{getProcessingStatusBadge(batch.status)}</TableCell>
                          <TableCell>{batch.collectedBy}</TableCell>
                        </TableRow>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
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
                      </DialogContent>
                    </Dialog>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

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
                  <Badge className="bg-pop-red text-white px-4 py-2 text-sm whitespace-nowrap">
                    <ShredIcon className="h-4 w-4 mr-2" />
                    Shred
                  </Badge>
                </div>
                
                {/* Arrow 4 */}
                <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
                
                {/* Step 5: Second Dry */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-purple-500 text-white px-4 py-2 text-sm whitespace-nowrap">
                    <Wind className="h-4 w-4 mr-2" />
                    Second Dry
                  </Badge>
                </div>
                
                {/* Arrow 5 */}
                <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
                
                {/* Step 6: Press */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-pop-black text-white px-4 py-2 text-sm whitespace-nowrap">
                    <Archive className="h-4 w-4 mr-2" />
                    Press
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Queue</CardTitle>
                <CardDescription>
                  Customer orders and maker assignments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-pop-red/5 rounded-lg">
                    <div>
                      <span className="font-medium text-sm">Order #2847</span>
                      <p className="text-xs text-gray-600">
                        3x Phone Stand - Due Tomorrow
                      </p>
                    </div>
                    <Badge className="bg-pop-red text-white">Urgent</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pop-blue/5 rounded-lg">
                    <div>
                      <span className="font-medium text-sm">Order #2846</span>
                      <p className="text-xs text-gray-600">
                        1x Desk Organizer - Due Friday
                      </p>
                    </div>
                    <Badge className="bg-pop-blue text-white">Assembly</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pop-green/5 rounded-lg">
                    <div>
                      <span className="font-medium text-sm">Order #2845</span>
                      <p className="text-xs text-gray-600">
                        2x Plant Holder - Due Monday
                      </p>
                    </div>
                    <Badge className="bg-pop-green text-white">Ready</Badge>
                  </div>
                </div>
                <Button className="w-full bg-pop-green hover:bg-pop-green/90">
                  <Users className="h-4 w-4 mr-2" />
                  Assign to Maker
                </Button>
              </CardContent>
            </Card>

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
          </div>

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
