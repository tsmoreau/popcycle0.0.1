'use client'

import { Package, Settings, BarChart3 } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'

export default function ProcessingSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Batches</CardTitle>
            <Package className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-gray-600">8 processing, 15 complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Station 1 Queue</CardTitle>
            <Settings className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-600">Weighing/Photo items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Station 2 Queue</CardTitle>
            <Settings className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35</div>
            <p className="text-xs text-gray-600">Laser processing items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Created Today</CardTitle>
            <BarChart3 className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-gray-600">From 23 batches</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              View All Batches
            </Button>
            <Button variant="outline" className="w-full">
              Create New Batch
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Production Workflow</CardTitle>
            <CardDescription>End-to-end manufacturing process</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">1. Batch Creation</span>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">2. Item Generation</span>
                <Badge variant="outline">Queue: 47</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">3. QR Laser Processing</span>
                <Badge variant="outline">Processing</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">4. Quality Check</span>
                <Badge variant="outline">Ready</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View Process Analytics
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
            <CardTitle>Quality Control</CardTitle>
            <CardDescription>Production standards and validation</CardDescription>
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