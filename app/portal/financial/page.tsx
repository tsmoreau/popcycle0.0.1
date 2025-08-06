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
            <CardTitle className="flex items-center justify-between">
              Revenue
              <span className="text-2xl font-bold text-green-600">$42,847</span>
            </CardTitle>
            <CardDescription>Monthly income transactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 px-3 border rounded-lg">
                <div>
                  <span className="text-sm font-medium">TechCorp Partnership</span>
                  <p className="text-xs text-gray-600">Monthly service - Jan 15</p>
                </div>
                <span className="font-medium">$12,500.00</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 border rounded-lg">
                <div>
                  <span className="text-sm font-medium">Green Solutions Inc</span>
                  <p className="text-xs text-gray-600">Q1 contract - Jan 12</p>
                </div>
                <span className="font-medium">$8,750.00</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 border rounded-lg">
                <div>
                  <span className="text-sm font-medium">Online Store Sales</span>
                  <p className="text-xs text-gray-600">Product orders - Jan 10</p>
                </div>
                <span className="font-medium">$3,420.50</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 border rounded-lg">
                <div>
                  <span className="text-sm font-medium">Workshop Registration</span>
                  <p className="text-xs text-gray-600">15 participants - Jan 8</p>
                </div>
                <span className="font-medium">$1,875.00</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 border rounded-lg">
                <div>
                  <span className="text-sm font-medium">Custom Manufacturing</span>
                  <p className="text-xs text-gray-600">Special order - Jan 6</p>
                </div>
                <span className="font-medium">$2,650.00</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 border rounded-lg">
                <div>
                  <span className="text-sm font-medium">EcoPartners LLC</span>
                  <p className="text-xs text-gray-600">Pickup service - Jan 3</p>
                </div>
                <span className="font-medium">$4,200.00</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-3">
              View All Revenue
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Expenses
              <span className="text-2xl font-bold text-red-600">$23,190</span>
            </CardTitle>
            <CardDescription>Monthly operational expenses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 px-3 border rounded-lg">
                <div>
                  <span className="text-sm font-medium">Shell Gas Station</span>
                  <p className="text-xs text-gray-600">Fleet fuel - Jan 15</p>
                </div>
                <span className="font-medium">$340.50</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 border rounded-lg">
                <div>
                  <span className="text-sm font-medium">HD Supply</span>
                  <p className="text-xs text-gray-600">Plastic pellets - Jan 14</p>
                </div>
                <span className="font-medium">$2,850.00</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 border rounded-lg">
                <div>
                  <span className="text-sm font-medium">Pacific Electric</span>
                  <p className="text-xs text-gray-600">Monthly utilities - Jan 12</p>
                </div>
                <span className="font-medium">$1,205.75</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 border rounded-lg">
                <div>
                  <span className="text-sm font-medium">Workshop Materials Inc</span>
                  <p className="text-xs text-gray-600">Maker supplies - Jan 10</p>
                </div>
                <span className="font-medium">$485.20</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 border rounded-lg">
                <div>
                  <span className="text-sm font-medium">Stripe Processing</span>
                  <p className="text-xs text-gray-600">Payment fees - Jan 8</p>
                </div>
                <span className="font-medium">$127.85</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 border rounded-lg">
                <div>
                  <span className="text-sm font-medium">Office Depot</span>
                  <p className="text-xs text-gray-600">Admin supplies - Jan 5</p>
                </div>
                <span className="font-medium">$89.40</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-3">
              View All Expenses
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