import { BarChart3, Package, Users, Archive } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { DataTable, Column, EditableField } from "../../ui/data-table";
import { Blank } from "../../../../lib/schemas";

interface InventoryTabProps {
  blanks: Blank[];
  loadingBlanks: boolean;
  allBlankColumns: Column<Blank>[];
  defaultBlankColumns: string[];
  blankEditableFields: EditableField<Blank>[];
  handleBlankSave: (blank: Blank) => Promise<void>;
  handleBlankDelete: (blank: Blank) => Promise<void>;
  isFullscreen?: boolean;
}

export const InventoryTab = ({
  blanks,
  loadingBlanks,
  allBlankColumns,
  defaultBlankColumns,
  blankEditableFields,
  handleBlankSave,
  handleBlankDelete,
  isFullscreen = false,
}: InventoryTabProps) => {
  return (
    <div className="space-y-6">
      {/* Blanks Inventory */}
      {loadingBlanks ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-sm text-gray-600">Loading blanks...</div>
        </div>
      ) : (
        <DataTable
          title="Blanks Inventory"
          description="Individual product blanks ready for maker assembly and tracking"
          icon={<BarChart3 className="h-5 w-5 text-pop-green" />}
          data={blanks}
          columns={allBlankColumns.filter(col => defaultBlankColumns.includes(String(col.key)))}
          availableColumns={allBlankColumns}
          defaultVisibleColumns={defaultBlankColumns}
          enableColumnSelection={true}
          enableFiltering={true}
          editableFields={blankEditableFields}
          onSave={handleBlankSave}
          onDelete={handleBlankDelete}
        />
      )}

      {/* Inventory Stats and Cards - only show in regular mode */}
      {!isFullscreen && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Material Inventory</CardTitle>
                <CardDescription>
                  Available processed materials for production
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">HDPE Flakes</span>
                        <Badge className="bg-pop-blue text-white">Ready</Badge>
                      </div>
                      <div className="text-2xl font-bold">245 lbs</div>
                      <p className="text-xs text-gray-600">~1,200 blanks capacity</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">PET Flakes</span>
                        <Badge className="bg-pop-green text-white">Ready</Badge>
                      </div>
                      <div className="text-2xl font-bold">187 lbs</div>
                      <p className="text-xs text-gray-600">~900 blanks capacity</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">PP Flakes</span>
                        <Badge variant="outline">Low</Badge>
                      </div>
                      <div className="text-2xl font-bold">67 lbs</div>
                      <p className="text-xs text-gray-600">~300 blanks capacity</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Mixed Materials</span>
                        <Badge className="bg-pop-red text-white">Processing</Badge>
                      </div>
                      <div className="text-2xl font-bold">123 lbs</div>
                      <p className="text-xs text-gray-600">~600 blanks capacity</p>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Request Material Resupply
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Production Inventory</CardTitle>
                <CardDescription>
                  Current product blanks and finished items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium text-sm">Phone Stand Blanks</span>
                        <p className="text-xs text-gray-600">Ready for assembly</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">47 units</div>
                        <Badge className="bg-pop-green text-white text-xs">Available</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium text-sm">Desk Organizer Blanks</span>
                        <p className="text-xs text-gray-600">Ready for assembly</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">23 units</div>
                        <Badge className="bg-pop-green text-white text-xs">Available</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium text-sm">Custom Blanks</span>
                        <p className="text-xs text-gray-600">Various specifications</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">12 units</div>
                        <Badge variant="outline" className="text-xs">Mixed</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium text-sm">QC Hold Items</span>
                        <p className="text-xs text-gray-600">Pending quality review</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">5 units</div>
                        <Badge className="bg-pop-red text-white text-xs">On Hold</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" size="sm">
                        <Package className="h-4 w-4 mr-2" />
                        Create Batch
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4 mr-2" />
                        Assign Makers
                      </Button>
                    </div>
                  </div>
                </div>
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
        </>
      )}
    </div>
  );
};