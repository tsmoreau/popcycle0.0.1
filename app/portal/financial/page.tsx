'use client'

import { DollarSign, TrendingUp, CreditCard, BarChart3 } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'

export default function FinancialPage() {
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
            <div className="text-2xl font-bold">$42,847</div>
            <p className="text-xs text-gray-600">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operational Costs</CardTitle>
            <BarChart3 className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$23,190</div>
            <p className="text-xs text-gray-600">78% material costs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gross Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">46%</div>
            <p className="text-xs text-gray-600">$19,657 profit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Invoices</CardTitle>
            <CreditCard className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,420</div>
            <p className="text-xs text-gray-600">12 overdue</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Streams</CardTitle>
            <CardDescription>Breakdown by business segment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Partner Subscriptions</span>
                <span className="font-medium">$28,500</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Product Sales</span>
                <span className="font-medium">$8,920</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Workshop Fees</span>
                <span className="font-medium">$3,240</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Custom Manufacturing</span>
                <span className="font-medium">$2,187</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View Detailed Breakdown
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Analysis</CardTitle>
            <CardDescription>Operational expense breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Material Processing</span>
                <span className="font-medium">$18,089</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Labor & Makers</span>
                <span className="font-medium">$3,240</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Equipment & Facilities</span>
                <span className="font-medium">$1,236</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Transportation</span>
                <span className="font-medium">$625</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Export Cost Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>QuickBooks Integration</CardTitle>
            <CardDescription>Automated accounting sync</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-pop-green/5 rounded-lg">
              <div>
                <span className="font-medium text-sm">Last Sync</span>
                <p className="text-xs text-gray-600">2 hours ago</p>
              </div>
              <Badge className="bg-pop-green text-white">Connected</Badge>
            </div>
            <Button variant="outline" className="w-full">
              Generate Invoices
            </Button>
            <Button variant="outline" className="w-full">
              View P&L Statement
            </Button>
            <Button variant="outline" className="w-full">
              Export to QuickBooks
            </Button>
            <Button className="w-full bg-pop-blue hover:bg-pop-blue/90">
              Force Sync Now
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest financial activity and Stripe payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <span className="font-medium text-sm">TechCorp Industries - Monthly Service</span>
                <p className="text-xs text-gray-600">Subscription payment via Stripe</p>
              </div>
              <span className="text-sm font-medium text-pop-green">+$2,850</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <span className="font-medium text-sm">Material Processing - Batch BA-8472</span>
                <p className="text-xs text-gray-600">Manufacturing costs</p>
              </div>
              <span className="text-sm font-medium text-pop-red">-$890</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <span className="font-medium text-sm">Workshop Revenue - Maker Skills Training</span>
                <p className="text-xs text-gray-600">15 participants</p>
              </div>
              <span className="text-sm font-medium text-pop-green">+$675</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}