import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { DataTable } from "../ui/data-table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Order } from "../../../lib/schemas";
import { allOrderColumns, defaultOrderColumns, orderEditableFields } from "./TableConfigurations";

interface FulfillmentTabContentProps {
  orders: Order[];
  loadingOrders: boolean;
  handleOrderSave: (item: Order) => Promise<void>;
  handleOrderDelete: (item: Order) => Promise<void>;
  fulfillmentSortField: string;
  fulfillmentSortDirection: "asc" | "desc";
  setFulfillmentSortField: (field: string) => void;
  setFulfillmentSortDirection: (direction: "asc" | "desc") => void;
  isFullscreen?: boolean;
}

export function FulfillmentTabContent({
  orders,
  loadingOrders,
  handleOrderSave,
  handleOrderDelete,
  fulfillmentSortField,
  fulfillmentSortDirection,
  setFulfillmentSortField,
  setFulfillmentSortDirection,
  isFullscreen = false,
}: FulfillmentTabContentProps) {
  const containerClass = isFullscreen ? "space-y-6 h-full" : "space-y-6";

  return (
    <div className={containerClass}>
      {/* Fulfillment Queue */}
      {!loadingOrders && (
        <DataTable
          title="Fulfillment Queue"
          description="Order processing and delivery management"
          data={orders}
          columns={allOrderColumns}
          editableFields={orderEditableFields}
          onSave={handleOrderSave}
          onDelete={handleOrderDelete}
          availableColumns={allOrderColumns}
          defaultVisibleColumns={defaultOrderColumns}
          enableColumnSelection
          enableFiltering
          sortField={fulfillmentSortField}
          sortDirection={fulfillmentSortDirection}
          onSort={(field, direction) => {
            setFulfillmentSortField(field);
            setFulfillmentSortDirection(direction);
          }}
        />
      )}

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
                      <p className="text-sm font-medium">Order #ORD-2025-156</p>
                      <p className="text-xs text-gray-500">Completed & Shipped</p>
                    </div>
                    <Badge className="bg-pop-green text-white">Shipped</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Order #ORD-2025-155</p>
                      <p className="text-xs text-gray-500">Ready for Pickup</p>
                    </div>
                    <Badge className="bg-pop-blue text-white">Ready</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Order #ORD-2025-154</p>
                      <p className="text-xs text-gray-500">In Assembly</p>
                    </div>
                    <Badge variant="outline">Processing</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}