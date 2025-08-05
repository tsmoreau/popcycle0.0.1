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
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState("collections");

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

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              Items in Queue
            </CardTitle>
            <Settings className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-gray-600">Ready for assembly</p>
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
        <div className="relative mb-6">
          <TabsList className="mb-0 relative z-10">
            <TabsTrigger value="collections" className="folder-tab-green">
              📦 Collections
            </TabsTrigger>
            <TabsTrigger value="processing" className="folder-tab-blue">
              ⚙️ Processing
            </TabsTrigger>
            <TabsTrigger value="inventory" className="folder-tab-red">
              📊 Inventory
            </TabsTrigger>
            <TabsTrigger value="fulfillment" className="folder-tab-black">
              🚚 Fulfillment
            </TabsTrigger>
          </TabsList>
          {/* Tab base line */}
          <div className="h-px bg-gray-400 w-full absolute bottom-0 z-0"></div>
        </div>

        {/* Collections Tab */}
        <TabsContent value="collections" className="space-y-6">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Station 1: Weighing/Photo/Creation</CardTitle>
                <CardDescription>
                  Batch processing and item creation workflow
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
                <CardTitle>Station 2: Laser Processing</CardTitle>
                <CardDescription>
                  QR code laser engraving workflow
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
    </div>
  );
}
