import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { DataTable } from "../ui/data-table";
import { Bin } from "../../../lib/schemas";
import { allBinColumns, defaultBinColumns, binEditableFields } from "./TableConfigurations";
import { CollectionsWorkflow } from "./CollectionsWorkflow";

interface CollectionsTabContentProps {
  bins: Bin[];
  loadingBins: boolean;
  handleBinSave: (item: Bin) => Promise<void>;
  handleBinDelete: (item: Bin) => Promise<void>;
  collectionsSortField: string;
  collectionsSortDirection: "asc" | "desc";
  setCollectionsSortField: (field: string) => void;
  setCollectionsSortDirection: (direction: "asc" | "desc") => void;
  isFullscreen?: boolean;
}

export function CollectionsTabContent({
  bins,
  loadingBins,
  handleBinSave,
  handleBinDelete,
  collectionsSortField,
  collectionsSortDirection,
  setCollectionsSortField,
  setCollectionsSortDirection,
  isFullscreen = false,
}: CollectionsTabContentProps) {
  const containerClass = "space-y-6 h-full flex flex-col";

  return (
    <div className={containerClass}>
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
        onSort={(field, direction) => {
          setCollectionsSortField(field);
          setCollectionsSortDirection(direction);
        }}
      />
    </div>
  );
}