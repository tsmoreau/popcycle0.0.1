'use client';

import { DataTable, Column, EditableField } from '../ui/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Settings, ArrowRight, ChevronDown, Droplets, Scissors, Wind, Archive, Scale, Zap, Package, Minus } from 'lucide-react';

interface ProcessingTabContentProps {
  batches: any[];
  loadingBatches: boolean;
  allBatchColumns: Column<any>[];
  defaultBatchColumns: string[];
  batchEditableFields: EditableField<any>[];
  handleBatchSave: (batch: any) => Promise<void>;
  handleBatchDelete: (batch: any) => Promise<void>;
  processingSortField: string;
  processingSortDirection: 'asc' | 'desc';
  onSort: (field: string, direction: 'asc' | 'desc') => void;
}

export const ProcessingTabContent = ({
  batches,
  loadingBatches,
  allBatchColumns,
  defaultBatchColumns,
  batchEditableFields,
  handleBatchSave,
  handleBatchDelete,
  processingSortField,
  processingSortDirection,
  onSort
}: ProcessingTabContentProps) => {
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
          onDelete={handleBatchDelete}
          sortField={processingSortField}
          sortDirection={processingSortDirection}
          onSort={onSort}
        />
      )}

      {/* Processing Workflow Diagram */}
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
            <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
            
            {/* Step 2: Sort */}
            <div className="flex flex-col items-center">
              <Badge className="bg-pop-green text-white px-4 py-2 text-sm whitespace-nowrap">
                <Scissors className="h-4 w-4 mr-2" />
                Sort
              </Badge>
            </div>
            
            {/* Arrow 2 */}
            <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
            <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
            
            {/* Step 3: First Dry */}
            <div className="flex flex-col items-center">
              <Badge className="bg-orange-500 text-white px-4 py-2 text-sm whitespace-nowrap">
                <Wind className="h-4 w-4 mr-2" />
                First Dry
              </Badge>
            </div>
            
            {/* Arrow 3 */}
            <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
            <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
            
            {/* Step 4: Shred */}
            <div className="flex flex-col items-center">
              <Badge className="bg-red-600 text-white px-4 py-2 text-sm whitespace-nowrap">
                <Minus className="h-4 w-4 mr-2" />
                Shred
              </Badge>
            </div>
            
            {/* Arrow 4 */}
            <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
            <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
            
            {/* Step 5: Fine Wash */}
            <div className="flex flex-col items-center">
              <Badge className="bg-pop-blue text-white px-4 py-2 text-sm whitespace-nowrap">
                <Droplets className="h-4 w-4 mr-2" />
                Fine Wash
              </Badge>
            </div>
            
            {/* Arrow 5 */}
            <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
            <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
            
            {/* Step 6: Second Dry */}
            <div className="flex flex-col items-center">
              <Badge className="bg-orange-500 text-white px-4 py-2 text-sm whitespace-nowrap">
                <Wind className="h-4 w-4 mr-2" />
                Second Dry
              </Badge>
            </div>
            
            {/* Arrow 6 */}
            <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
            <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
            
            {/* Step 7: Press */}
            <div className="flex flex-col items-center">
              <Badge className="bg-pop-black text-white px-4 py-2 text-sm whitespace-nowrap">
                <Archive className="h-4 w-4 mr-2" />
                Press
              </Badge>
            </div>
            
            {/* Arrow 7 */}
            <ArrowRight className="h-5 w-5 text-gray-400 hidden sm:block" />
            <ChevronDown className="h-5 w-5 text-gray-400 sm:hidden" />
            
            {/* Step 8: Weigh & Photo */}
            <div className="flex flex-col items-center">
              <Badge className="bg-pop-green text-white px-4 py-2 text-sm whitespace-nowrap">
                <Scale className="h-4 w-4 mr-2" />
                Weigh & Photo
              </Badge>
            </div>
            
            {/* Arrow 8 */}
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
};