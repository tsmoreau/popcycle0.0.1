import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { DataTable } from "../ui/data-table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Package, Truck, AlertTriangle } from "lucide-react";
import { Blank } from "../../../lib/schemas";
import { allBlankColumns, defaultBlankColumns, blankEditableFields } from "./TableConfigurations";

interface InventoryTabContentProps {
  blanks: Blank[];
  loadingBlanks: boolean;
  handleBlankSave: (item: Blank) => Promise<void>;
  handleBlankDelete: (item: Blank) => Promise<void>;
  isFullscreen?: boolean;
}

export function InventoryTabContent({
  blanks,
  loadingBlanks,
  handleBlankSave,
  handleBlankDelete,
  isFullscreen = false,
}: InventoryTabContentProps) {
  const containerClass = isFullscreen ? "space-y-6 h-full" : "space-y-6";

  return (
    <div className={containerClass}>
      {!isFullscreen && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Material Inventory</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">HDPE Flakes</span>
                      <span className="font-medium">2.4 tons</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">PET Flakes</span>
                      <span className="font-medium">1.8 tons</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">PP Flakes</span>
                      <span className="font-medium">0.9 tons</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Mixed Plastic</span>
                      <span className="font-medium text-pop-red">0.2 tons</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center font-medium">
                      <span>Total Raw Material</span>
                      <span>5.3 tons</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Reorder Alert
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Production Inventory</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Phone Stands</span>
                      <span className="font-medium">47 units</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Desk Organizers</span>
                      <span className="font-medium">23 units</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Plant Pots</span>
                      <span className="font-medium">18 units</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Coasters</span>
                      <span className="font-medium">156 units</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center font-medium">
                      <span>Total Finished Goods</span>
                      <span>244 units</span>
                    </div>
                  </div>
                  <Button className="w-full bg-pop-green hover:bg-pop-green/90">
                    <Truck className="h-4 w-4 mr-2" />
                    Update Inventory
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Control</CardTitle>
                <CardDescription>
                  Product quality and specifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Passed QC</span>
                      <span className="font-medium text-pop-green">98.7%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Pending Review</span>
                      <span className="font-medium">12 items</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Failed QC</span>
                      <span className="font-medium text-pop-red">3 items</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View QC Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Inventory Movements</CardTitle>
          <CardDescription>
            Track blank production and product deliveries
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!loadingBlanks && (
            <DataTable
              title=""
              description=""
              data={blanks}
              columns={allBlankColumns}
              editableFields={blankEditableFields}
              onSave={handleBlankSave}
              onDelete={handleBlankDelete}
              availableColumns={allBlankColumns}
              defaultVisibleColumns={defaultBlankColumns}
              enableColumnSelection
              enableFiltering
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}