'use client'

import { Package, Truck, Settings, AlertCircle, Calendar } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'

export default function CollectionsSection() {
  return (
    <div className="space-y-6">
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
            <CardTitle className="text-sm font-medium">Batches Today</CardTitle>
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
            <CardTitle className="text-sm font-medium">HID Scale Status</CardTitle>
            <AlertCircle className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Online</div>
            <p className="text-xs text-gray-600">Last reading: 2.3kg</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Production Station 1</CardTitle>
            <CardDescription>Weighing, photo capture, item creation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-pop-green/5 border border-pop-green/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Station Status</span>
                <Badge className="bg-pop-green text-white">Ready</Badge>
              </div>
              <div className="space-y-1 text-xs text-gray-600">
                <div>HID Scale: Connected (2.3kg)</div>
                <div>Camera: USB Feed Active</div>
                <div>Last Item: IT-ABC123 (14:32)</div>
              </div>
            </div>
            <Button className="w-full bg-pop-green hover:bg-pop-green/90">
              Open Station Interface
            </Button>
            <Button variant="outline" className="w-full">
              View Processing Queue
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Production Station 2</CardTitle>
            <CardDescription>QR laser processing, completion tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-pop-blue/5 border border-pop-blue/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Laser Queue</span>
                <Badge className="bg-pop-blue text-white">Processing</Badge>
              </div>
              <div className="space-y-1 text-xs text-gray-600">
                <div>Current: IT-XYZ789</div>
                <div>Queue: 35 items</div>
                <div>Est. Completion: 16:45</div>
              </div>
            </div>
            <Button className="w-full bg-pop-blue hover:bg-pop-blue/90">
              Lightburn Integration
            </Button>
            <Button variant="outline" className="w-full">
              Mark Batch Complete
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mobile Staff & Routes</CardTitle>
            <CardDescription>Pickup scheduling and field operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Route A: Downtown</span>
                <Badge variant="outline">In Progress</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Route B: Industrial</span>
                <Badge variant="outline">Scheduled 15:00</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Route C: University</span>
                <Badge variant="outline">Complete</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule New Pickup
            </Button>
            <Button variant="outline" className="w-full">
              Mobile Staff Check-in
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bin Management</CardTitle>
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
            <Button variant="outline" className="w-full">
              View All Bins (156)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Real-Time Operations</CardTitle>
            <CardDescription>Live status and coordination</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full">
              Batch Processing Status
            </Button>
            <Button variant="outline" className="w-full">
              QR Code Generation Queue
            </Button>
            <Button variant="outline" className="w-full">
              Hardware Diagnostics
            </Button>
            <Button variant="outline" className="w-full">
              Operations Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}