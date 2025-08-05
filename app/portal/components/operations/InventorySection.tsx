'use client'

import { Package, Settings, BarChart3, AlertCircle } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'

export default function InventorySection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Raw Material</CardTitle>
            <Package className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3 tons</div>
            <p className="text-xs text-gray-600">Processed plastic ready</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items in Production</CardTitle>
            <Settings className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-gray-600">Various stages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Finished Products</CardTitle>
            <BarChart3 className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-gray-600">Ready for makers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-600">Items need restocking</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Material Levels</CardTitle>
            <CardDescription>Raw material and component inventory</CardDescription>
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
              Order Raw Materials
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Inventory</CardTitle>
            <CardDescription>Finished goods ready for assembly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Desk Organizers</span>
                <Badge variant="outline">23 units</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Phone Stands</span>
                <Badge variant="outline">15 units</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Pen Holders</span>
                <Badge variant="outline">51 units</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Inventory Report
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Supply Chain</CardTitle>
            <CardDescription>Material sourcing and procurement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                <span className="text-sm">Supplier A: PET</span>
                <Badge className="bg-blue-500 text-white">On Time</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="text-sm">Supplier B: HDPE</span>
                <Badge className="bg-green-500 text-white">Early</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                <span className="text-sm">Supplier C: Hardware</span>
                <Badge className="bg-yellow-500 text-white">Delayed</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Supplier Management
            </Button>
            <Button variant="outline" className="w-full">
              Purchase Orders
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Waste Tracking</CardTitle>
            <CardDescription>Material efficiency and waste reduction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="text-center p-3 bg-green-50 rounded border border-green-200">
                <div className="text-lg font-bold text-green-600">92%</div>
                <div className="text-xs text-gray-600">Material Efficiency</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded border border-blue-200">
                <div className="text-lg font-bold text-blue-600">0.2 tons</div>
                <div className="text-xs text-gray-600">Waste This Week</div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Waste Analytics
            </Button>
            <Button variant="outline" className="w-full">
              Efficiency Reports
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Forecasting</CardTitle>
            <CardDescription>Demand prediction and planning</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Next Week Demand</span>
                <Badge variant="outline">+15%</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Reorder Point</span>
                <Badge variant="outline">3 days</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Safety Stock</span>
                <Badge variant="outline">Adequate</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Demand Forecast
            </Button>
            <Button variant="outline" className="w-full">
              Reorder Automation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}