'use client'

import { Building2, Package, BarChart3, FileText } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'

export default function PartnerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-pop-black">Partner Dashboard</h2>
        <p className="text-gray-600 mt-2">Partner-specific reporting and impact tracking (read-only access)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Bins</CardTitle>
            <Package className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-600">Active collection points</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plastic Collected</CardTitle>
            <BarChart3 className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3 tons</div>
            <p className="text-xs text-gray-600">This quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Created</CardTitle>
            <Building2 className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-gray-600">From your waste</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
            <FileText className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2 tons</div>
            <p className="text-xs text-gray-600">Environmental impact</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bin Status & Locations</CardTitle>
            <CardDescription>Real-time monitoring of your collection points</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-red-50 rounded border border-red-200">
                <span className="text-sm">BI-CORP001: Main Lobby</span>
                <Badge className="bg-red-500 text-white">95% Full</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded border border-yellow-200">
                <span className="text-sm">BI-CORP002: Cafeteria</span>
                <Badge className="bg-yellow-500 text-white">75% Full</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded border border-green-200">
                <span className="text-sm">BI-CORP003: Floor 3 Break Room</span>
                <Badge className="bg-green-500 text-white">45% Full</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded border border-green-200">
                <span className="text-sm">BI-CORP004: Parking Garage</span>
                <Badge className="bg-green-500 text-white">30% Full</Badge>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              * Pickup scheduled when bins reach 90% capacity
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Impact Tracking</CardTitle>
            <CardDescription>Your organization's environmental contribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-3 bg-green-50 rounded border border-green-200">
                <div className="text-lg font-bold text-green-600">2.3 tons</div>
                <div className="text-xs text-gray-600">Plastic Diverted</div>
              </div>
              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                <div className="text-lg font-bold text-blue-600">156</div>
                <div className="text-xs text-gray-600">Products Created</div>
              </div>
              <div className="p-3 bg-purple-50 rounded border border-purple-200">
                <div className="text-lg font-bold text-purple-600">1.2 tons</div>
                <div className="text-xs text-gray-600">CO₂ Equivalent</div>
              </div>
              <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                <div className="text-lg font-bold text-yellow-600">89%</div>
                <div className="text-xs text-gray-600">Diversion Rate</div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Download Impact Report
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Collection History</CardTitle>
            <CardDescription>Recent pickups and processing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Aug 3: Pickup completed</span>
                <Badge variant="outline">45kg</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Jul 28: Pickup completed</span>
                <Badge variant="outline">38kg</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Jul 21: Pickup completed</span>
                <Badge variant="outline">52kg</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View Full History
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Provenance</CardTitle>
            <CardDescription>Items created from your materials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                <span className="text-sm">Desk Organizers</span>
                <Badge className="bg-blue-500 text-white">45 units</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="text-sm">Phone Stands</span>
                <Badge className="bg-green-500 text-white">67 units</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                <span className="text-sm">Pen Holders</span>
                <Badge className="bg-yellow-500 text-white">44 units</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Track Product Journey
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sustainability Goals</CardTitle>
            <CardDescription>Progress toward waste reduction targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Annual Target: 10 tons</span>
                  <span>23%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-pop-green h-2 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Q3 Target: 3 tons</span>
                  <span>77%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-pop-blue h-2 rounded-full" style={{ width: '77%' }}></div>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Goal Planning
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}