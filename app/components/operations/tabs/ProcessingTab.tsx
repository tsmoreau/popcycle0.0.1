import { Settings, ArrowRight, Droplets, Package2, Wind, Scissors, Sparkles, Zap, Camera, Target, Archive } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { DataTable, Column, EditableField } from "../../ui/data-table";
import { Batch } from "../../../../lib/schemas";

interface ProcessingTabProps {
  batches: Batch[];
  loadingBatches: boolean;
  allBatchColumns: Column<Batch>[];
  defaultBatchColumns: string[];
  batchEditableFields: EditableField<Batch>[];
  handleBatchSave: (batch: Batch) => Promise<void>;
  handleBatchAdd: (batch: Batch) => Promise<void>;
  handleBatchDelete: (batch: Batch) => Promise<void>;
  processingSortField: string;
  processingSortDirection: "asc" | "desc";
  onSort: (field: string, direction: "asc" | "desc") => void;
  isFullscreen?: boolean;
}

export const ProcessingTab = ({
  batches,
  loadingBatches,
  allBatchColumns,
  defaultBatchColumns,
  batchEditableFields,
  handleBatchSave,
  handleBatchAdd,
  handleBatchDelete,
  processingSortField,
  processingSortDirection,
  onSort,
  isFullscreen = false,
}: ProcessingTabProps) => {


  return (
    <div className="space-y-6">
      {/* Processing Queue */}
      {loadingBatches ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-sm text-gray-600">Loading batches...</div>
        </div>
      ) : (
        <DataTable
          title="Processing Queue"
          description="Live status overview of all batches in various processing stages"
          icon={<Settings className="h-5 w-5 text-pop-blue" />}
          data={batches}
          columns={allBatchColumns.filter(col => defaultBatchColumns.includes(String(col.key)))}
          availableColumns={allBatchColumns}
          defaultVisibleColumns={defaultBatchColumns}
          enableColumnSelection={true}
          enableFiltering={true}
          editableFields={batchEditableFields}
          onSave={handleBatchSave}
          onAdd={handleBatchAdd}
          onDelete={handleBatchDelete}
          sortField={processingSortField}
          sortDirection={processingSortDirection}
          onSort={onSort}
        />
      )}

      {/* Processing Workflow Diagram - only show in regular mode */}
      {!isFullscreen && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-pop-blue" />
              Processing Workflow
            </CardTitle>
            <CardDescription>
              Ten step complete processing pipeline from collection to finished materials.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 py-4">
              {/* Step 1: Rough Wash */}
              <div className="flex flex-col items-center">
                <Badge className="bg-pop-blue text-white px-4 py-2 text-sm whitespace-nowrap">
                  <Droplets className="h-4 w-4 mr-2" />
                  Rough Wash
                </Badge>
              </div>
              
              {/* Arrow 1 */}
              <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
              
              {/* Step 2: Sort */}
              <div className="flex flex-col items-center">
                <Badge className="bg-pop-green text-white px-4 py-2 text-sm whitespace-nowrap">
                  <Package2 className="h-4 w-4 mr-2" />
                  Sort
                </Badge>
              </div>
              
              {/* Arrow 2 */}
              <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
              
              {/* Step 3: First Dry */}
              <div className="flex flex-col items-center">
                <Badge className="bg-orange-500 text-white px-4 py-2 text-sm whitespace-nowrap">
                  <Wind className="h-4 w-4 mr-2" />
                  First Dry
                </Badge>
              </div>
              
              {/* Arrow 3 */}
              <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
              
              {/* Step 4: Shred */}
              <div className="flex flex-col items-center">
                <Badge className="bg-red-600 text-white px-4 py-2 text-sm whitespace-nowrap">
                  <Scissors className="h-4 w-4 mr-2" />
                  Shred
                </Badge>
              </div>
              
              {/* Arrow 4 */}
              <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
              
              {/* Step 5: Fine Wash */}
              <div className="flex flex-col items-center">
                <Badge className="bg-cyan-500 text-white px-4 py-2 text-sm whitespace-nowrap">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Fine Wash
                </Badge>
              </div>
              
              {/* Row 2 */}
              <div className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-4 py-4">
                {/* Step 6: Second Dry */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-amber-500 text-white px-4 py-2 text-sm whitespace-nowrap">
                    <Wind className="h-4 w-4 mr-2" />
                    Second Dry
                  </Badge>
                </div>
                
                {/* Arrow 5 */}
                <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                
                {/* Step 7: Press */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-purple-600 text-white px-4 py-2 text-sm whitespace-nowrap">
                    <Zap className="h-4 w-4 mr-2" />
                    Press
                  </Badge>
                </div>
                
                {/* Arrow 6 */}
                <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                
                {/* Step 8: Weigh & Photo */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-pink-600 text-white px-4 py-2 text-sm whitespace-nowrap">
                    <Camera className="h-4 w-4 mr-2" />
                    Weigh & Photo
                  </Badge>
                </div>
                
                {/* Arrow 7 */}
                <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                
                {/* Step 9: Laser Marking */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-indigo-600 text-white px-4 py-2 text-sm whitespace-nowrap">
                    <Target className="h-4 w-4 mr-2" />
                    Laser Marking
                  </Badge>
                </div>
                
                {/* Arrow 8 */}
                <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
                
                {/* Step 10: Inventory Creation */}
                <div className="flex flex-col items-center">
                  <Badge className="bg-pop-black text-white px-4 py-2 text-sm whitespace-nowrap">
                    <Archive className="h-4 w-4 mr-2" />
                    Inventory Creation
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};