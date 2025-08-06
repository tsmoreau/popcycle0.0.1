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
          <CardContent className="space-y-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Signed Partnership Agreement</span>
                  <p className="text-xs text-gray-600">Executed: Jan 15, 2024</p>
                </div>
                <Badge className="bg-green-100 text-green-700">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Initial Waste Assessment</span>
                  <p className="text-xs text-gray-600">Baseline: 2,340 lbs/month</p>
                </div>
                <Badge variant="outline">Complete</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Service Level Agreement</span>
                  <p className="text-xs text-gray-600">Updated: Mar 8, 2024</p>
                </div>
                <Badge className="bg-orange-100 text-orange-700">Current</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Compliance Certification</span>
                  <p className="text-xs text-gray-600">Valid through Dec 2024</p>
                </div>
                <Badge className="bg-green-100 text-green-700">Verified</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View All Documents
            </Button>
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