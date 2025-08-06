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
            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <h4 className="font-medium text-sm">Partnership Agreement</h4>
                    <p className="text-xs text-gray-500">Signed Jan 15, 2024 • 2.4 MB PDF</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-700 text-xs">Active</Badge>
                  <Button variant="ghost" size="sm" className="text-xs px-2">Download</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <h4 className="font-medium text-sm">Initial Waste Assessment</h4>
                    <p className="text-xs text-gray-500">Completed Dec 10, 2023 • 1.8 MB PDF</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">Complete</Badge>
                  <Button variant="ghost" size="sm" className="text-xs px-2">Download</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div>
                    <h4 className="font-medium text-sm">Service Level Agreement</h4>
                    <p className="text-xs text-gray-500">Updated Mar 8, 2024 • 1.2 MB PDF</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-orange-100 text-orange-700 text-xs">Current</Badge>
                  <Button variant="ghost" size="sm" className="text-xs px-2">Download</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div>
                    <h4 className="font-medium text-sm">Compliance Certification</h4>
                    <p className="text-xs text-gray-500">Issued Nov 20, 2023 • 950 KB PDF</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-700 text-xs">Valid</Badge>
                  <Button variant="ghost" size="sm" className="text-xs px-2">Download</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 px-4 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500">Insurance Certificate</h4>
                    <p className="text-xs text-gray-400">Pending upload</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-xs px-3">Upload</Button>
              </div>
            </div>
            
            <div className="flex gap-2 pt-2 border-t">
              <Button variant="outline" className="flex-1 text-sm">
                Download All
              </Button>
              <Button className="flex-1 bg-pop-blue hover:bg-pop-blue/90 text-sm">
                Request Document
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