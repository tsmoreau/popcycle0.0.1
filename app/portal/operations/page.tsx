'use client'

import { Package, Truck, Settings, AlertCircle, Calendar, BarChart3, Users } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'

export default function OperationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-pop-black">Operations Management</h2>
        <p className="text-gray-600 mt-2">Complete operations workflow: collections, processing, inventory, and fulfillment</p>
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
            <CardTitle className="text-sm font-medium">Active Batches</CardTitle>
            <Truck className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-gray-600">8 processing, 15 complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items in Queue</CardTitle>
            <Settings className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-gray-600">Station 1: 12, Station 2: 35</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Users className="h-4 w-4 text-pop-gray" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-gray-600">Awaiting maker assembly</p>
          </CardContent>
        </Card>
      </div>

      {/* Collections & Pickup Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bin Management & Collections</CardTitle>
            <CardDescription>Capacity monitoring and pickup coordination</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-red-50 rounded border border-red-200">
                <span className="text-sm">BI-CORP001: TechCorp Lobby</span>
                <Badge className="bg-red-500 text-white">95% Full</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded border border-yellow-200">
                <span className="text-sm">BI-UNI045: Library Floor 3</span>
                <Badge className="bg-yellow-500 text-white">75% Full</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded border border-green-200">
                <span className="text-sm">BI-OFF892: StartupHub</span>
                <Badge className="bg-green-500 text-white">45% Full</Badge>
              </div>
            </div>
            <Button className="w-full bg-pop-green hover:bg-pop-green/90">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Pickup Routes
            </Button>
            <Button variant="outline" className="w-full">
              View All Bins (156)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Production Stations</CardTitle>
            <CardDescription>Real-time station status and control</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-pop-green/5 border border-pop-green/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Station 1: Weighing/Photo</span>
                <Badge className="bg-pop-green text-white">Ready</Badge>
              </div>
              <div className="space-y-1 text-xs text-gray-600">
                <div>HID Scale: Connected (2.3kg)</div>
                <div>Camera: USB Feed Active</div>
                <div>Last Item: IT-ABC123 (14:32)</div>
              </div>
              <Button className="w-full mt-2 bg-pop-green hover:bg-pop-green/90" size="sm">
                Open Station Interface
              </Button>
            </div>
            
            <div className="p-3 bg-pop-blue/5 border border-pop-blue/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Station 2: Laser Processing</span>
                <Badge className="bg-pop-blue text-white">Processing</Badge>
              </div>
              <div className="space-y-1 text-xs text-gray-600">
                <div>Current: IT-XYZ789</div>
                <div>Queue: 35 items</div>
                <div>Est. Completion: 16:45</div>
              </div>
              <Button className="w-full mt-2 bg-pop-blue hover:bg-pop-blue/90" size="sm">
                Lightburn Integration
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory & Material Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Material Levels & Inventory</CardTitle>
            <CardDescription>Raw material and finished product tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="text-sm">PET Plastic Flakes</span>
                <Badge className="bg-green-500 text-white">1.8 tons</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                <span className="text-sm">HDPE Sheets</span>
                <Badge className="bg-yellow-500 text-white">0.5 tons</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                <span className="text-sm">Assembly Hardware</span>
                <Badge className="bg-red-500 text-white">Low Stock</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <BarChart3 className="h-4 w-4 mr-2" />
              Inventory Reports
            </Button>
            <Button variant="outline" className="w-full">
              Order Raw Materials
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Queue & Fulfillment</CardTitle>
            <CardDescription>Production scheduling and maker assignment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                <span className="text-sm">Order #1201 - Desk Organizer</span>
                <Badge className="bg-blue-500 text-white">Priority</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="text-sm">Order #1202 - Phone Stand</span>
                <Badge className="bg-green-500 text-white">In Progress</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                <span className="text-sm">Order #1203 - Pen Holder</span>
                <Badge className="bg-yellow-500 text-white">Assigned</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <Users className="h-4 w-4 mr-2" />
              Assign to Makers
            </Button>
            <Button variant="outline" className="w-full">
              View Full Queue (34)
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Batch Processing & Quality Control */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Batch Management</CardTitle>
            <CardDescription>Processing pipeline and status tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                <span className="text-sm">BA-2024-001: Tech District</span>
                <Badge className="bg-blue-500 text-white">Processing</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="text-sm">BA-2024-002: University</span>
                <Badge className="bg-green-500 text-white">Complete</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                <span className="text-sm">BA-2024-003: Downtown</span>
                <Badge className="bg-yellow-500 text-white">Station 1</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Create New Batch
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hardware Integration</CardTitle>
            <CardDescription>Connected devices and automation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="text-sm">HID Scale</span>
                <Badge className="bg-green-500 text-white">Connected</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="text-sm">USB Camera</span>
                <Badge className="bg-green-500 text-white">Active</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                <span className="text-sm">Lightburn Software</span>
                <Badge className="bg-blue-500 text-white">Ready</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Hardware Diagnostics
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Quality control and efficiency tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="text-center p-3 bg-green-50 rounded border border-green-200">
                <div className="text-lg font-bold text-green-600">98.5%</div>
                <div className="text-xs text-gray-600">Pass Rate Today</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded border border-blue-200">
                <div className="text-lg font-bold text-blue-600">2.1 min</div>
                <div className="text-xs text-gray-600">Avg Processing Time</div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Quality Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}