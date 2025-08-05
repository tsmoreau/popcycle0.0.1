'use client'

import { Truck, Package, BarChart3, Users, ArrowRight } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import Link from 'next/link'

export default function OperationsDashboard() {
  const operationsAreas = [
    { 
      id: 'collections', 
      label: 'Collections', 
      icon: Truck, 
      color: 'text-pop-green',
      bgColor: 'bg-pop-green/5',
      borderColor: 'border-pop-green/20',
      description: 'Bin pickup schedules, routes, and collection tracking',
      stats: { primary: '156 Active Bins', secondary: '12 ready for pickup' }
    },
    { 
      id: 'processing', 
      label: 'Processing', 
      icon: Package, 
      color: 'text-pop-blue',
      bgColor: 'bg-pop-blue/5',
      borderColor: 'border-pop-blue/20',
      description: 'Production stations, batch processing, QR generation',
      stats: { primary: '23 Active Batches', secondary: '47 items in queue' }
    },
    { 
      id: 'inventory', 
      label: 'Inventory', 
      icon: BarChart3, 
      color: 'text-pop-red',
      bgColor: 'bg-pop-red/5',
      borderColor: 'border-pop-red/20',
      description: 'Material levels, stock management, supply chain',
      stats: { primary: '2.3 tons Material', secondary: '89 finished products' }
    },
    { 
      id: 'fulfillment', 
      label: 'Fulfillment', 
      icon: Users, 
      color: 'text-pop-gray',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      description: 'Order queue, maker assignment, shipping coordination',
      stats: { primary: '34 Pending Orders', secondary: '18 in assembly' }
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-pop-black">Operations Dashboard</h2>
        <p className="text-gray-600 mt-2">Comprehensive operations management and workflow coordination</p>
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
            <CardTitle className="text-sm font-medium">Material Stock</CardTitle>
            <BarChart3 className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3 tons</div>
            <p className="text-xs text-gray-600">Processed plastic ready</p>
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

      {/* Operations Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {operationsAreas.map((area) => {
          const Icon = area.icon
          return (
            <Card key={area.id} className={`${area.bgColor} border ${area.borderColor}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-6 w-6 ${area.color}`} />
                    <div>
                      <CardTitle className="text-lg">{area.label}</CardTitle>
                      <CardDescription>{area.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className={area.color}>
                    {area.stats.primary}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600">
                  {area.stats.secondary}
                </div>
                <Link href={`/portal/operations/${area.id}`}>
                  <Button variant="outline" className="w-full group">
                    <span>Manage {area.label}</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Production Stations</CardTitle>
            <CardDescription>Real-time station status and control</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-pop-green/5 rounded-lg">
              <div>
                <span className="font-medium text-sm">Station 1: Weighing/Photo</span>
                <p className="text-xs text-gray-600">HID Scale + Camera Ready</p>
              </div>
              <Badge className="bg-pop-green text-white">Online</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-pop-blue/5 rounded-lg">
              <div>
                <span className="font-medium text-sm">Station 2: Laser</span>
                <p className="text-xs text-gray-600">Lightburn Integration</p>
              </div>
              <Badge className="bg-pop-blue text-white">Processing</Badge>
            </div>
            <Link href="/portal/operations/processing">
              <Button variant="outline" className="w-full">
                Station Controls
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Activity</CardTitle>
            <CardDescription>Current operations summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Pickups Completed</span>
                <Badge variant="outline">8</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Items Processed</span>
                <Badge variant="outline">47</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Orders Fulfilled</span>
                <Badge variant="outline">12</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Overall operations health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="text-sm">Hardware Status</span>
                <Badge className="bg-green-500 text-white">All Online</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                <span className="text-sm">Processing Queue</span>
                <Badge className="bg-blue-500 text-white">Normal</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                <span className="text-sm">Alerts</span>
                <Badge className="bg-yellow-500 text-white">3 Low Stock</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}