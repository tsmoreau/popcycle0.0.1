"use client";

import { Settings, ArrowRight, ChevronDown, Droplets, Package, Zap } from "lucide-react";
import { DataTable } from "../ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import type { Batch } from "../../../lib/schemas";
import type { Column, EditableField } from "../ui/data-table";

interface ProcessingTabProps {
  batches: Batch[];
  loadingBatches: boolean;
  allBatchColumns: Column<Batch>[];
  defaultBatchColumns: string[];
  batchEditableFields: EditableField<Batch>[];
  handleBatchSave: (item: Batch) => Promise<void>;
  handleBatchDelete: (item: Batch) => Promise<void>;
  processingSortField: string;
  processingSortDirection: "asc" | "desc";
  onSort: (field: string, direction: "asc" | "desc") => void;
  isFullscreen?: boolean;
}

export function ProcessingTab({
  batches,
  loadingBatches,
  allBatchColumns,
  defaultBatchColumns,
  batchEditableFields,
  handleBatchSave,
  handleBatchDelete,
  processingSortField,
  processingSortDirection,
  onSort,
  isFullscreen = false,
}: ProcessingTabProps) {
  return (
    <div className={isFullscreen ? "space-y-6 h-full" : "space-y-6"}>
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
          onDelete={handleBatchDelete}
          sortField={processingSortField}
          sortDirection={processingSortDirection}
          onSort={onSort}
        />
      )}

      {/* Processing Workflow Diagram */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2 text-pop-green" />
            Manufacturing Process Flow
          </CardTitle>
          <CardDescription>
            Step-by-step plastic processing workflow from collection to finished blanks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 overflow-x-auto pb-4">
            {/* Step 1: Collection */}
            <div className="flex flex-col items-center">
              <Badge className="bg-pop-green text-white px-4 py-2 text-sm whitespace-nowrap">
                <Package className="h-4 w-4 mr-2" />
                Collection
              </Badge>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
            <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />

            {/* Step 2: Rough Wash */}
            <div className="flex flex-col items-center">
              <Badge className="bg-pop-blue text-white px-4 py-2 text-sm whitespace-nowrap">
                <Droplets className="h-4 w-4 mr-2" />
                Rough Wash
              </Badge>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
            <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />

            {/* Step 3: Sort */}
            <div className="flex flex-col items-center">
              <Badge className="bg-pop-green text-white px-4 py-2 text-sm whitespace-nowrap">
                <Settings className="h-4 w-4 mr-2" />
                Sort
              </Badge>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
            <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />

            {/* Step 4: First Dry */}
            <div className="flex flex-col items-center">
              <Badge className="bg-yellow-500 text-white px-4 py-2 text-sm whitespace-nowrap">
                <Zap className="h-4 w-4 mr-2" />
                First Dry
              </Badge>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
            <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />

            {/* Step 5: Shred */}
            <div className="flex flex-col items-center">
              <Badge className="bg-pop-red text-white px-4 py-2 text-sm whitespace-nowrap">
                <Settings className="h-4 w-4 mr-2" />
                Shred
              </Badge>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
            <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />

            {/* Step 6: Fine Wash */}
            <div className="flex flex-col items-center">
              <Badge className="bg-pop-blue text-white px-4 py-2 text-sm whitespace-nowrap">
                <Droplets className="h-4 w-4 mr-2" />
                Fine Wash
              </Badge>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
            <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />

            {/* Step 7: Second Dry */}
            <div className="flex flex-col items-center">
              <Badge className="bg-yellow-500 text-white px-4 py-2 text-sm whitespace-nowrap">
                <Zap className="h-4 w-4 mr-2" />
                Second Dry
              </Badge>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
            <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />

            {/* Step 8: Press */}
            <div className="flex flex-col items-center">
              <Badge className="bg-purple-600 text-white px-4 py-2 text-sm whitespace-nowrap">
                <Package className="h-4 w-4 mr-2" />
                Press
              </Badge>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
            <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
            
            {/* Step 9: Laser Marking */}
            <div className="flex flex-col items-center">
              <Badge className="bg-pop-red text-white px-4 py-2 text-sm whitespace-nowrap">
                <Zap className="h-4 w-4 mr-2" />
                Laser Marking
              </Badge>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
            <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
            {/* Step 10: inventory Creation */}
            <div className="flex flex-col items-center">
              <Badge className="bg-black text-white px-4 py-2 text-sm whitespace-nowrap">
                <Package className="h-4 w-4 mr-2" />
                Inventory Creation
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}