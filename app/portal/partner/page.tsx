'use client'

import { Package, TrendingUp, Recycle, QrCode } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'

export default function PartnerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-pop-black">Partner Dashboard</h2>
        <p className="text-gray-600 mt-2">Your circular economy impact and bin management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Bins</CardTitle>
            <Package className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-600">3 ready for pickup</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plastic Collected</CardTitle>
            <Recycle className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847 lbs</div>
            <p className="text-xs text-gray-600">This quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Created</CardTitle>
            <QrCode className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-gray-600">From your waste</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-gray-600">Circular efficiency</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Bin Network</CardTitle>
            <CardDescription>Track your collection points and capacity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-pop-green/5 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Main Office - Floor 3</span>
                  <p className="text-xs text-gray-600">Bin ID: BI-7829</p>
                </div>
                <Badge className="bg-pop-green text-white">85% Full</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-pop-blue/5 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Kitchen Area</span>
                  <p className="text-xs text-gray-600">Bin ID: BI-7830</p>
                </div>
                <Badge className="bg-pop-blue text-white">Ready</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Conference Room A</span>
                  <p className="text-xs text-gray-600">Bin ID: BI-7831</p>
                </div>
                <Badge variant="outline">45% Full</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View All Bin Locations
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Partner Documentation</CardTitle>
            <CardDescription>Essential documents and agreements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-medium">📄</span>
                  </div>
                  <Badge className="bg-green-500 text-white text-xs">Active</Badge>
                </div>
                <h4 className="font-medium text-sm mb-1">Partnership Agreement</h4>
                <p className="text-xs text-gray-500">Signed Jan 15, 2024</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-sm font-medium">📊</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">Complete</Badge>
                </div>
                <h4 className="font-medium text-sm mb-1">Waste Assessment</h4>
                <p className="text-xs text-gray-500">2,340 lbs baseline</p>
              </div>
              
              <div className="border border-orange-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 text-sm font-medium">⚖️</span>
                  </div>
                  <Badge className="bg-orange-500 text-white text-xs">Current</Badge>
                </div>
                <h4 className="font-medium text-sm mb-1">Service Agreement</h4>
                <p className="text-xs text-gray-500">Updated Mar 8, 2024</p>
              </div>
              
              <div className="border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm font-medium">✓</span>
                  </div>
                  <Badge className="bg-green-500 text-white text-xs">Valid</Badge>
                </div>
                <h4 className="font-medium text-sm mb-1">Compliance Cert</h4>
                <p className="text-xs text-gray-500">Expires Dec 2024</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 text-sm">
                Download All
              </Button>
              <Button className="flex-1 bg-pop-blue hover:bg-pop-blue/90 text-sm">
                Request New Document
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest pickups and transformations from your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <span className="font-medium text-sm">Batch BA-8472 Collected</span>
                <p className="text-xs text-gray-600">45 lbs from Main Office</p>
              </div>
              <span className="text-xs text-gray-500">2 days ago</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <span className="font-medium text-sm">12 Phone Stands Completed</span>
                <p className="text-xs text-gray-600">Made from your Q3 collection</p>
              </div>
              <span className="text-xs text-gray-500">5 days ago</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <span className="font-medium text-sm">Bin BI-7829 Pickup Scheduled</span>
                <p className="text-xs text-gray-600">Tomorrow at 10:00 AM</p>
              </div>
              <span className="text-xs text-gray-500">1 week ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}