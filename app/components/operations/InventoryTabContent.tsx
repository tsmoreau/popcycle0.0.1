'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export const InventoryTabContent = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Material Inventory</CardTitle>
            <CardDescription>Raw plastic material tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Processed Plastic Stock
                </span>
                <span className="font-medium">847 lbs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Pending Processing
                </span>
                <span className="font-medium">156 lbs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Ready for Production
                </span>
                <span className="font-medium text-pop-green">691 lbs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Quality Hold</span>
                <span className="font-medium text-pop-red">12 lbs</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Update Material Levels
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Production Inventory</CardTitle>
            <CardDescription>Finished goods and blanks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Phone Stand Blanks</span>
                <span className="font-medium">45 units</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Desk Organizer Blanks</span>
                <span className="font-medium">28 units</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Plant Holder Blanks</span>
                <span className="font-medium">19 units</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Custom Order Blanks</span>
                <span className="font-medium">7 units</span>
              </div>
            </div>
            <Button className="w-full bg-pop-blue hover:bg-pop-blue/90">
              Generate Production Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quality Control</CardTitle>
            <CardDescription>Batch tracking and compliance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-pop-green/5 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Batch BA-8471</span>
                  <p className="text-xs text-gray-600">
                    All QC checks passed
                  </p>
                </div>
                <Badge className="bg-pop-green text-white">Approved</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-pop-blue/5 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Batch BA-8472</span>
                  <p className="text-xs text-gray-600">
                    Pending final inspection
                  </p>
                </div>
                <Badge className="bg-pop-blue text-white">Review</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-pop-red/5 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Batch BA-8469</span>
                  <p className="text-xs text-gray-600">
                    Material defect noted
                  </p>
                </div>
                <Badge className="bg-pop-red text-white">Hold</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View QC Documentation
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Movements</CardTitle>
          <CardDescription>
            Recent stock changes and transfers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <span className="font-medium text-sm">
                  Material Addition
                </span>
                <p className="text-xs text-gray-600">
                  +45 lbs from Batch BA-8472
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500">2 hours ago</span>
                <p className="text-xs text-pop-green">Station 1</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <span className="font-medium text-sm">
                  Production Consumption
                </span>
                <p className="text-xs text-gray-600">
                  -12 lbs for Phone Stand Blanks
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500">4 hours ago</span>
                <p className="text-xs text-pop-blue">Manufacturing</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <span className="font-medium text-sm">Quality Hold</span>
                <p className="text-xs text-gray-600">
                  -12 lbs from Batch BA-8469
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500">1 day ago</span>
                <p className="text-xs text-pop-red">QC Hold</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};