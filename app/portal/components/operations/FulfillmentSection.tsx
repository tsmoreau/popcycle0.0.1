'use client'

import { Truck, Users, Package, BarChart3 } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'

export default function FulfillmentSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Truck className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-gray-600">Awaiting maker assembly</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Assembly</CardTitle>
            <Users className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-gray-600">With makers currently</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready to Ship</CardTitle>
            <Package className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-600">Assembly complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Assembly Time</CardTitle>
            <BarChart3 className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5h</div>
            <p className="text-xs text-gray-600">Per item average</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Queue</CardTitle>
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
              View Full Queue (34)
            </Button>
            <Button variant="outline" className="w-full">
              Assign to Makers
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maker Assignment</CardTitle>
            <CardDescription>Active makers and their current projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div>
                  <span className="text-sm font-medium">Sarah Chen</span>
                  <p className="text-xs text-gray-600">Level 3 Maker</p>
                </div>
                <Badge variant="outline">2 items</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div>
                  <span className="text-sm font-medium">Alex Rivera</span>
                  <p className="text-xs text-gray-600">Level 4 Maker</p>
                </div>
                <Badge variant="outline">1 item</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div>
                  <span className="text-sm font-medium">Jamie Kim</span>
                  <p className="text-xs text-gray-600">Level 2 Maker</p>
                </div>
                <Badge variant="outline">3 items</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Maker Performance
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Assembly Workflow</CardTitle>
            <CardDescription>Maker process and progress tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">1. Order Assignment</span>
                <Badge variant="outline">Automated</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">2. Tutorial Access</span>
                <Badge variant="outline">Available</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">3. Progress Tracking</span>
                <Badge variant="outline">Real-time</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">4. Quality Review</span>
                <Badge variant="outline">Required</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Assembly Analytics
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skill Development</CardTitle>
            <CardDescription>Maker progression and training</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="text-center p-3 bg-green-50 rounded border border-green-200">
                <div className="text-lg font-bold text-green-600">15</div>
                <div className="text-xs text-gray-600">Active Makers</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded border border-blue-200">
                <div className="text-lg font-bold text-blue-600">3.2</div>
                <div className="text-xs text-gray-600">Avg Skill Level</div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Training Programs
            </Button>
            <Button variant="outline" className="w-full">
              Skill Assessments
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping & Delivery</CardTitle>
            <CardDescription>Final stage logistics and customer delivery</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="text-sm">Local Pickup</span>
                <Badge className="bg-green-500 text-white">8 orders</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                <span className="text-sm">Standard Shipping</span>
                <Badge className="bg-blue-500 text-white">4 orders</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                <span className="text-sm">Express Delivery</span>
                <Badge className="bg-yellow-500 text-white">0 orders</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Shipping Labels
            </Button>
            <Button variant="outline" className="w-full">
              Delivery Tracking
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}