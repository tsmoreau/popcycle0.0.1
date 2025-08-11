'use client';

import { DataTable, Column, EditableField } from '../ui/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Users } from 'lucide-react';

interface FulfillmentTabContentProps {
  orders: any[];
  loadingOrders: boolean;
  allOrderColumns: Column<any>[];
  defaultOrderColumns: string[];
  orderEditableFields: EditableField<any>[];
  handleOrderSave: (order: any) => Promise<void>;
  handleOrderDelete: (order: any) => Promise<void>;
  fulfillmentSortField: string;
  fulfillmentSortDirection: 'asc' | 'desc';
  onSort: (field: string, direction: 'asc' | 'desc') => void;
}

export const FulfillmentTabContent = ({
  orders,
  loadingOrders,
  allOrderColumns,
  defaultOrderColumns,
  orderEditableFields,
  handleOrderSave,
  handleOrderDelete,
  fulfillmentSortField,
  fulfillmentSortDirection,
  onSort
}: FulfillmentTabContentProps) => {
  return (
    <div className="space-y-6">
      {/* Fulfillment Queue */}
      {loadingOrders ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-sm text-gray-600">Loading orders...</div>
        </div>
      ) : (
        <DataTable
          title="Order Queue"
          description="Customer orders and maker assignments with fulfillment status tracking"
          icon={<Users className="h-5 w-5 text-pop-green" />}
          data={orders}
          columns={allOrderColumns.filter(col => defaultOrderColumns.includes(String(col.key)))}
          availableColumns={allOrderColumns}
          defaultVisibleColumns={defaultOrderColumns}
          enableColumnSelection={true}
          enableFiltering={true}
          editableFields={orderEditableFields}
          onSave={handleOrderSave}
          onDelete={handleOrderDelete}
          sortField={fulfillmentSortField}
          sortDirection={fulfillmentSortDirection}
          onSort={onSort}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>Maker Assembly Status</CardTitle>
          <CardDescription>
            Active maker projects and progress
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div>
                <span className="text-sm font-medium">Alex Chen</span>
                <p className="text-xs text-gray-600">
                  Phone Stand Assembly
                </p>
              </div>
              <Badge className="bg-pop-blue text-white">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div>
                <span className="text-sm font-medium">Maria Santos</span>
                <p className="text-xs text-gray-600">
                  Desk Organizer Assembly
                </p>
              </div>
              <Badge className="bg-pop-green text-white">Complete</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div>
                <span className="text-sm font-medium">Jordan Kim</span>
                <p className="text-xs text-gray-600">
                  Available for assignment
                </p>
              </div>
              <Badge variant="outline">Available</Badge>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            View Maker Dashboard
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipping & Delivery</CardTitle>
          <CardDescription>
            Order fulfillment coordination
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Orders Ready to Ship
              </span>
              <span className="font-medium text-pop-green">8 orders</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">In Assembly</span>
              <span className="font-medium">5 orders</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Shipped Today</span>
              <span className="font-medium">12 orders</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Average Fulfillment
              </span>
              <span className="font-medium">2.3 days</span>
            </div>
          </div>
          <Button className="w-full bg-pop-blue hover:bg-pop-blue/90">
            Generate Shipping Labels
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Fulfillment Activity</CardTitle>
            <CardDescription>
              Order completion and customer updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-medium text-sm">
                    Order #2843 Shipped
                  </span>
                  <p className="text-xs text-gray-600">
                    2x Phone Stand to GreenTech Corp
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">1 hour ago</span>
                  <p className="text-xs text-pop-green">Maker: Alex Chen</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-medium text-sm">
                    Order #2844 Completed
                  </span>
                  <p className="text-xs text-gray-600">
                    1x Desk Organizer - Ready for shipping
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">3 hours ago</span>
                  <p className="text-xs text-pop-green">
                    Maker: Maria Santos
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-medium text-sm">
                    Order #2842 Assembly Started
                  </span>
                  <p className="text-xs text-gray-600">
                    3x Plant Holder - Estimated completion Friday
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">5 hours ago</span>
                  <p className="text-xs text-pop-blue">Maker: Jordan Kim</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};