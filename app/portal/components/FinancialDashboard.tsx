'use client'

import { DollarSign, TrendingUp, TrendingDown, CreditCard } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'

export default function FinancialDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-pop-black">Financial Dashboard</h2>
        <p className="text-gray-600 mt-2">Revenue tracking, cost analysis, and QuickBooks integration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$47,284</div>
            <p className="text-xs text-gray-600">+18% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operating Costs</CardTitle>
            <TrendingDown className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$28,156</div>
            <p className="text-xs text-gray-600">-5% efficiency gain</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$19,128</div>
            <p className="text-xs text-gray-600">40.5% margin</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">QuickBooks Sync</CardTitle>
            <CreditCard className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Live</div>
            <p className="text-xs text-gray-600">Last sync: 14:45</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Streams</CardTitle>
            <CardDescription>Income sources and growth tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-pop-green/5 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Product Sales</span>
                  <p className="text-xs text-gray-600">E-commerce platform</p>
                </div>
                <span className="font-bold text-pop-green">$28,450</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-pop-blue/5 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Partner Contracts</span>
                  <p className="text-xs text-gray-600">Collection services</p>
                </div>
                <span className="font-bold text-pop-blue">$12,340</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-pop-red/5 rounded-lg">
                <div>
                  <span className="font-medium text-sm">Workshop Events</span>
                  <p className="text-xs text-gray-600">Community programs</p>
                </div>
                <span className="font-bold text-pop-red">$6,494</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Revenue Trend Analysis
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Health Metrics</CardTitle>
            <CardDescription>Key performance indicators and targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 bg-green-50 rounded border border-green-200">
                <div className="text-lg font-bold text-green-600">42%</div>
                <div className="text-xs text-gray-600">Profit Margin</div>
              </div>
              <div className="p-2 bg-blue-50 rounded border border-blue-200">
                <div className="text-lg font-bold text-blue-600">$23k</div>
                <div className="text-xs text-gray-600">Cash Flow</div>
              </div>
              <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
                <div className="text-lg font-bold text-yellow-600">1.8x</div>
                <div className="text-xs text-gray-600">Revenue Growth</div>
              </div>
              <div className="p-2 bg-purple-50 rounded border border-purple-200">
                <div className="text-lg font-bold text-purple-600">$156k</div>
                <div className="text-xs text-gray-600">Annual Run Rate</div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Monthly Financial Summary
            </Button>
            <Button variant="outline" className="w-full">
              Budget vs Actual Report
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cost Analysis</CardTitle>
            <CardDescription>Operational expense breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Staff & Labor</span>
                <Badge variant="outline">$15,200</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Materials & Supply</span>
                <Badge variant="outline">$8,950</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Equipment & Tech</span>
                <Badge variant="outline">$2,800</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Logistics & Transport</span>
                <Badge variant="outline">$1,206</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Detailed Cost Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Processing</CardTitle>
            <CardDescription>Stripe integration and transaction management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="text-center p-3 bg-green-50 rounded border border-green-200">
                <div className="text-lg font-bold text-green-600">$28,450</div>
                <div className="text-xs text-gray-600">Stripe Volume MTD</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded border border-blue-200">
                <div className="text-lg font-bold text-blue-600">247</div>
                <div className="text-xs text-gray-600">Transactions</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded border border-yellow-200">
                <div className="text-lg font-bold text-yellow-600">2.9%</div>
                <div className="text-xs text-gray-600">Processing Fee</div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Transaction Reports
            </Button>
            <Button variant="outline" className="w-full">
              Refund Management
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Planning</CardTitle>
            <CardDescription>Budgets, forecasts, and goal tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Q3 Revenue Goal</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-pop-green h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Annual Profit Target</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-pop-blue h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Financial Forecast
            </Button>
            <Button variant="outline" className="w-full">
              QuickBooks Integration
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}