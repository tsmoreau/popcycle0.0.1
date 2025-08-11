import { Truck } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { DataTable, Column, EditableField } from "../../ui/data-table";
import { Order } from "../../../../lib/schemas";

interface FulfillmentTabProps {
  orders: Order[];
  loadingOrders: boolean;
  allOrderColumns: Column<Order>[];
  defaultOrderColumns: string[];
  orderEditableFields: EditableField<Order>[];
  handleOrderSave: (order: Order) => Promise<void>;
  handleOrderDelete: (order: Order) => Promise<void>;
  fulfillmentSortField: string;
  fulfillmentSortDirection: "asc" | "desc";
  onSort: (field: string, direction: "asc" | "desc") => void;
  isFullscreen?: boolean;
}

export const FulfillmentTab = ({
  orders,
  loadingOrders,
  allOrderColumns,
  defaultOrderColumns,
  orderEditableFields,
  handleOrderSave,
  handleOrderDelete,
  fulfillmentSortField,
  fulfillmentSortDirection,
  onSort,
  isFullscreen = false,
}: FulfillmentTabProps) => {
  return (
    <div className="space-y-6">
      {/* Fulfillment Queue */}
      {loadingOrders ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-sm text-gray-600">Loading orders...</div>
        </div>
      ) : (
        <DataTable
          title="Fulfillment Queue"
          description="Active orders requiring fulfillment, invoicing, or delivery coordination"
          icon={<Truck className="h-5 w-5 text-pop-blue" />}
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

      {/* Fulfillment Stats - only show in regular mode */}
      {!isFullscreen && (
        <>
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
                      <p className="text-sm font-medium">ORD-2024-789</p>
                      <p className="text-xs text-gray-600">Corporate Demo Kit</p>
                    </div>
                    <Badge className="bg-pop-green text-white">Shipped</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">ORD-2024-788</p>
                      <p className="text-xs text-gray-600">Workshop Materials</p>
                    </div>
                    <Badge className="bg-pop-blue text-white">Ready</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">ORD-2024-787</p>
                      <p className="text-xs text-gray-600">Phone Stand Set</p>
                    </div>
                    <Badge variant="outline">Assembly</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};