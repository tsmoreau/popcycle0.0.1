"use client";

import { CollectionsWorkflow } from "./CollectionsWorkflow";
import type { Bin } from "../../../lib/schemas";
import type { Column, EditableField } from "../ui/data-table";

interface CollectionsTabProps {
  bins: Bin[];
  loadingBins: boolean;
  allBinColumns: Column<Bin>[];
  defaultBinColumns: string[];
  binEditableFields: EditableField<Bin>[];
  handleBinSave: (item: Bin) => Promise<void>;
  handleBinDelete: (item: Bin) => Promise<void>;
  collectionsSortField: string;
  collectionsSortDirection: "asc" | "desc";
  onSort: (field: string, direction: "asc" | "desc") => void;
  isFullscreen?: boolean;
}

export function CollectionsTab({
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
}: CollectionsTabProps) {
  return (
    <div className={isFullscreen ? "space-y-6 h-full" : "space-y-6"}>
      <CollectionsWorkflow
        bins={bins}
        loadingBins={loadingBins}
        allBinColumns={allBinColumns}
        defaultBinColumns={defaultBinColumns}
        binEditableFields={binEditableFields}
        handleBinSave={handleBinSave}
        handleBinDelete={handleBinDelete}
        collectionsSortField={collectionsSortField}
        collectionsSortDirection={collectionsSortDirection}
        onSort={onSort}
      />
    </div>
  );
}