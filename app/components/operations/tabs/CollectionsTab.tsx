import { Package } from "lucide-react";
import { DataTable, Column, EditableField } from "../../ui/data-table";
import { Bin } from "../../../../lib/schemas";
import { CollectionsWorkflow } from "../CollectionsWorkflow";

interface CollectionsTabProps {
  bins: Bin[];
  loadingBins: boolean;
  allBinColumns: Column<Bin>[];
  defaultBinColumns: string[];
  binEditableFields: EditableField<Bin>[];
  handleBinSave: (bin: Bin) => Promise<void>;
  handleBinDelete: (bin: Bin) => Promise<void>;
  collectionsSortField: string;
  collectionsSortDirection: "asc" | "desc";
  onSort: (field: string, direction: "asc" | "desc") => void;
  isFullscreen?: boolean;
}

export const CollectionsTab = ({
  bins,
  loadingBins,
  allBinColumns,
  defaultBinColumns,
  binEditableFields,
  handleBinSave,
  handleBinDelete,
  collectionsSortField,
  collectionsSortDirection,
  onSort,
  isFullscreen = false,
}: CollectionsTabProps) => {
  console.log("CollectionsTab Debug:", {
    binsCount: bins?.length || 0,
    loadingBins,
    allBinColumnsCount: allBinColumns?.length || 0,
    defaultBinColumnsCount: defaultBinColumns?.length || 0,
    bins: bins?.slice(0, 2) // Show first 2 bins for debugging
  });

  return (
    <div className={`space-y-6 ${isFullscreen ? 'h-full' : ''}`}>
      {/* Collections Queue */}
      {loadingBins ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-sm text-gray-600">Loading bins...</div>
        </div>
      ) : (
        <DataTable
          title="Collections Queue"
          description="Live status overview of all bins assigned for pickup and collected materials awaiting processing"
          icon={<Package className="h-5 w-5 text-pop-green" />}
          data={bins}
          columns={allBinColumns.filter(col => defaultBinColumns.includes(String(col.key)))}
          availableColumns={allBinColumns}
          defaultVisibleColumns={defaultBinColumns}
          enableColumnSelection={true}
          enableFiltering={true}
          editableFields={binEditableFields}
          onSave={handleBinSave}
          onDelete={handleBinDelete}
          sortField={collectionsSortField}
          sortDirection={collectionsSortDirection}
          onSort={onSort}
        />
      )}

      {/* Collections Workflow Diagram - only show in regular mode */}
      {!isFullscreen && <CollectionsWorkflow />}
    </div>
  );
};