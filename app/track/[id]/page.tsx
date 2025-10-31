"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { QRCodeElement } from "../../components/PopArtElements";
import { LoadingSquare } from "../../components/ui/loading-square";
import {
  Building,
  Calendar,
  Weight,
  Leaf,
  Package,
  CheckCircle,
  User,
  MapPin,
  Heart,
  Plus,
  HeartHandshake,
  Circle,
  Clock,
  Droplets,
  Scissors,
  Zap as ShredIcon,
  Wind,
  Archive,
  Scale,
  Camera,
  Zap,
  Settings,
} from "lucide-react";

interface MakerDetails {
  userId: string;
  name: string;
  location: string;
  assemblyDate: string;
  story: string;
  registeredAt: string;
  verifiedEmail: string;
}

interface BlankItem {
  id: string;
  batchId: string;
  status: string;
  weight: number;
  materialType: string;
  collectionDate: string;
  productId?: string;
}

interface BatchItem {
  id: string;
  weight: number;
  materialType: string;
  status: string;
  collectionDate: string;
}



export default function TrackItem() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [relatedItems, setRelatedItems] = useState<any>({
    batches: [],
    blanks: [],
    sourceBin: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Date formatting helper - formats to M/D/YYYY
  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'numeric', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/track/${id}`);
        if (!response.ok) {
          throw new Error("Item not found");
        }
        const apiData = await response.json();
        setData(apiData);

        // Fetch related items based on type
        const related = { batches: [], blanks: [], sourceBin: null };

        if (apiData.type === "bin") {
          try {
            const batchResponse = await fetch(`/api/items/sample?type=batches&binId=${apiData.id}`);
            if (batchResponse.ok) {
              const batchData = await batchResponse.json();
              related.batches = batchData.items || [];
            }
          } catch (batchErr) {
            console.log("Could not fetch batches for bin:", batchErr);
          }
        }

        if (apiData.type === "batch") {
          try {
            const blankResponse = await fetch(`/api/items/sample?type=blanks&batchId=${apiData.id}`);
            if (blankResponse.ok) {
              const blankData = await blankResponse.json();
              related.blanks = blankData.items || [];
            }

            if (apiData.binIds && apiData.binIds.length > 0) {
              const binResponse = await fetch(`/api/track/${apiData.binIds[0]}`);
              if (binResponse.ok) {
                const binData = await binResponse.json();
                related.sourceBin = { ...binData, allBinIds: apiData.binIds };
              }
            }
          } catch (relatedErr) {
            console.log("Could not fetch related items for batch:", relatedErr);
          }
        }

        setRelatedItems(related);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch item");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSquare color="green" text="Loading Item..." />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center font-jost">
        <Card className="border border-gray-300 max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl mb-4 font-light">Item Not Found</h2>
            <p className="text-gray-600 mb-6 font-light">
              Item code "{id}" is not in our system.
            </p>
            <p className="text-sm text-gray-500 font-light">
              Try one of our sample item codes: ABC123, DEF456, GHI789,
              JKL012, MNO345, PQR678, STU901
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Derived logic using direct API data
  const isUncollected = !data.collectionDate && !data.lastCollectionDate;
  const isSourceOnly = !data.productId;
  const isProcessed = !!data.processedDate || data.status === "inventory_creation";
  const isCharity = !!data.donatingEntity;
  const isComplete = !!data.deliveredDate;
  const hasMaker = !!data.makerDetails;

  // Impact metrics calculation
  const impactMetrics = data.impactMetrics?.carbonSaved
    ? {
        carbonSaved: data.impactMetrics.carbonSaved,
        wasteReduced: data.weight,
      }
    : null;

  const getProductTypeLabel = (type: string) => {
    switch (type) {
      case "rover_chassis":
        return "Rover Chassis";
      case "assembly_toy":
        return "Assembly Toy";
      case "educational_kit":
        return "Educational Kit";
      case "dinnerware":
        return "Dinnerware";
      default:
        return type;
    }
  };

  const getBinStatusLabel = (status: string) => {
    switch (status) {
      case "bin_on_vehicle":
        return "On Vehicle";
      case "bin_on_site":
        return "On Site";
      case "ready_for_processing":
        return "Ready for Processing";
      default:
        return "Awaiting Collection";
    }
  };

  const getBatchStatusLabel = (status: string) => {
    switch (status) {
      case "collected":
        return "Collected";
      case "rough_wash":
        return "Rough Wash";
      case "sort":
        return "Sorting";
      case "first_dry":
        return "First Dry";
      case "shred":
        return "Shredding";
      case "fine_wash":
        return "Fine Wash";
      case "second_dry":
        return "Second Dry";
      case "press":
        return "Pressing";
      case "weigh_photo":
        return "Weigh & Photo";
      case "laser_marking":
        return "Laser Marking";
      case "inventory_creation":
        return "Inventory Creation";
      default:
        return status;
    }
  };

  const getProcessingStatusBadge = (status: string) => {
    switch (status) {
      case "collected":
        return (
          <Badge className="bg-gray-500 text-white font-light">
            <Package className="h-3 w-3 mr-1" />
            Collected
          </Badge>
        );
      case "rough_wash":
        return (
          <Badge className="bg-gray-600 text-white font-light">
            <Droplets className="h-3 w-3 mr-1" />
            Rough Wash
          </Badge>
        );
      case "sort":
        return (
          <Badge className="bg-gray-700 text-white font-light">
            <Scissors className="h-3 w-3 mr-1" />
            Sort
          </Badge>
        );
      case "first_dry":
        return (
          <Badge className="bg-gray-500 text-white font-light">
            <Wind className="h-3 w-3 mr-1" />
            First Dry
          </Badge>
        );
      case "shred":
        return (
          <Badge className="bg-gray-600 text-white font-light">
            <ShredIcon className="h-3 w-3 mr-1" />
            Shred
          </Badge>
        );
      case "fine_wash":
        return (
          <Badge className="bg-gray-700 text-white font-light">
            <Droplets className="h-3 w-3 mr-1" />
            Fine Wash
          </Badge>
        );
      case "second_dry":
        return (
          <Badge className="bg-gray-600 text-white font-light">
            <Wind className="h-3 w-3 mr-1" />
            Second Dry
          </Badge>
        );
      case "press":
        return (
          <Badge className="bg-gray-700 text-white font-light">
            <Archive className="h-3 w-3 mr-1" />
            Press
          </Badge>
        );
      case "weigh_photo":
        return (
          <Badge className="bg-gray-600 text-white font-light">
            <Scale className="h-3 w-3 mr-1" />
            Weigh & Photo
          </Badge>
        );
      case "laser_marking":
        return (
          <Badge className="bg-gray-700 text-white font-light">
            <Zap className="h-3 w-3 mr-1" />
            Laser Marking
          </Badge>
        );
      case "inventory_creation":
        return (
          <Badge className="bg-black text-white font-light">
            <Settings className="h-3 w-3 mr-1" />
            Inventory Creation
          </Badge>
        );
      default:
        return <Badge variant="outline" className="font-light">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen py-20 flex mx-auto justify-center font-jost bg-white">
      <div className="max-w-2xl mx-auto border border-gray-300 mx-8">
        {/* ========== HEADER BOX ========== */}

        <div className="flex flex-col gap-6 ">
         
          <Card className=" border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-light flex flex-col items-center justify-center">
                <Link href="/" className=" pl-0 self-end flex items-center space-x-2 group pb-2 mx-auto">
                  <div className="w-10 h-10 bg-gray-300 flex items-center justify-center">
                    <span className="text-white font-base helvetica-bold text-lg">P</span>
                  </div>
                  <div className="flex-col flex mt-2">
                  <span className="text-3xl font-extralight tracking-tighter font-base text-gray-900">
                    PopCycle
                  </span>
                  <span className="hidden mt-0.0 ml-1 tracking-[2.2em] text-[8px] font-bold text-gray-900">
                    STUDIO
                  </span>
                    </div>
                </Link>
                <div className="font-jost">********************************************</div>
                {data.id.startsWith("B")
                  ? " Bin Receipt"
                  : data.id.startsWith("T")
                    ? " Batch Receipt"
                   : data.id.startsWith("K")
                       ? " Pressed Sheet Receipt"
                : "Receipt"}
                 <div className="font-jost mt-1">********************************************</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="w-full aspect-3/2 bg-gray-50"></div>
              
              {/* QR Code */}
              <div className="hidden flex justify-center py-4 ">
                <QRCodeElement qrCode={data.id} size="lg" />
              </div>
              {/* Timeline */}
              <div className="hidden flex gap-2 lg:gap-3 justify-center">
              {/* Bins: Show only Collection step */}
              {data.id.startsWith("B") && (
                <div className="text-center flex-1">
                  <div className={`w-16 h-16 mx-auto mb-3 border border-gray-300 flex items-center justify-center ${
                    data.collectionDate || data.lastCollectionDate || data.id.startsWith("B") 
                      ? "bg-gray-400" 
                      : "bg-white"
                  }`}>
                    <Package className={`w-8 h-8 ${
                      data.collectionDate || data.lastCollectionDate || data.id.startsWith("B") 
                        ? "text-white" 
                        : "text-gray-400"
                    }`} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xs mb-1 font-light">
                    Collection
                  </h3>
                  <p className="text-xs text-gray-500 font-light">
                    {data.id.startsWith("B") 
                      ? "Active bin" 
                      : data.collectionDate 
                        ? formatDate(data.collectionDate)
                        : data.lastCollectionDate
                          ? formatDate(data.lastCollectionDate)
                          : "Pending"
                    }
                  </p>
                </div>
              )}

              {/* Batches: Show Collection and Processing steps */}
              {data.id.startsWith("T") && (
                <>
                  {/* Step 1: COLLECTION */}
                  <div className="text-center flex-1">
                    <div className={`w-16 h-16 mx-auto mb-3 border border-gray-300 flex items-center justify-center ${
                      data.collectionDate || data.lastCollectionDate || data.id.startsWith("B") 
                        ? "bg-gray-400" 
                        : "bg-white"
                    }`}>
                      <Package className={`w-8 h-8 ${
                        data.collectionDate || data.lastCollectionDate || data.id.startsWith("B") 
                          ? "text-white" 
                          : "text-gray-400"
                      }`} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xs mb-1 font-light">
                      Collection
                    </h3>
                    <p className="text-xs text-gray-500 font-light">
                      {data.collectionDate ? formatDate(data.collectionDate) : "Complete"}
                    </p>
                  </div>

                  {/* Connection Line */}
                  <div className="flex items-center justify-center pt-8">
                    <div className={`w-4 h-0.5 ${
                      isProcessed ? "bg-black" : "bg-gray-300"
                    }`}></div>
                  </div>

                  {/* Step 2: PROCESSING */}
                  <div className="text-center flex-1">
                    <div className={`w-16 h-16 mx-auto mb-3 border border-gray-300 flex items-center justify-center ${
                      isProcessed 
                        ? "bg-black" 
                        : "bg-white"
                    }`}>
                      <Settings className={`w-8 h-8 ${
                        isProcessed 
                          ? "text-white" 
                          : "text-gray-400"
                      }`} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xs mb-1 font-light">
                      {data.status === "inventory_creation" ? "Processed" : "Processing"}
                    </h3>
                    <p className="text-xs text-gray-500 font-light">
                      {data.status === "inventory_creation" ? "Complete" : "In progress"}
                    </p>
                  </div>
                </>
              )}

              {/* Blanks: Show Processing, Purchased/Donated, and optionally Assembled */}
              {data.id.startsWith("K") && (
                <>
                  {/* Step 1: PROCESSING */}
                  <div className="text-center flex-1">
                    <div className={`w-16 h-16 mx-auto mb-3 border border-gray-300 flex items-center justify-center ${
                      isProcessed 
                        ? "bg-gray-400" 
                        : "bg-white"
                    }`}>
                      <Settings className={`w-8 h-8 ${
                        isProcessed 
                          ? "text-white" 
                          : "text-gray-400"
                      }`} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xs mb-1 font-light">
                      {data.status === "inventory_creation" ? "Processed" : "Processing"}
                    </h3>
                    <p className="text-xs text-gray-500 font-light">
                      Complete
                    </p>
                  </div>

                  {/* Connection Line */}
                  <div className="flex items-center justify-center pt-8">
                    <div className={`w-4 h-0.5 ${
                      data.productId ? "bg-black" : "bg-gray-300"
                    }`}></div>
                  </div>

                  {/* Step 2: PURCHASED/DONATED */}
                  <div className="text-center flex-1">
                    <div className={`w-16 h-16 mx-auto mb-3 border border-gray-300 flex items-center justify-center ${
                      data.productId 
                        ? "bg-black" 
                        : "bg-white"
                    }`}>
                      {isCharity ? (
                        <HeartHandshake className={`w-8 h-8 ${
                          data.productId 
                            ? "text-white" 
                            : "text-gray-400"
                        }`} strokeWidth={1.5} />
                      ) : (
                        <CheckCircle className={`w-8 h-8 ${
                          data.productId 
                            ? "text-white" 
                            : "text-gray-400"
                        }`} strokeWidth={1.5} />
                      )}
                    </div>
                    <h3 className="text-xs mb-1 font-light">
                      {isCharity ? "Donated" : "Purchased"}
                    </h3>
                    <p className="text-xs text-gray-500 font-light">
                      {data.productId 
                        ? data.deliveredDate || data.deliveryDate
                          ? formatDate(data.deliveredDate || data.deliveryDate)
                          : "Complete"
                        : "Available"
                      }
                    </p>
                  </div>

                  {/* Show Assembly step only if blank has productId (has been purchased) */}
                  {data.productId && (
                    <>
                      {/* Connection Line */}
                      <div className="flex items-center justify-center pt-8">
                        <div className={`w-4 h-0.5 ${
                          data.userId ? "bg-black" : "bg-gray-300"
                        }`}></div>
                      </div>

                      {/* Step 3: ASSEMBLED */}
                      <div className="text-center flex-1">
                        <div className={`w-16 h-16 mx-auto mb-3 border border-gray-300 flex items-center justify-center ${
                          data.userId 
                            ? "bg-black" 
                            : "bg-white"
                        }`}>
                          <User className={`w-8 h-8 ${
                            data.userId 
                              ? "text-white" 
                              : "text-gray-400"
                          }`} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xs mb-1 font-light">
                          Assembled
                        </h3>
                        <p className="text-xs text-gray-500 font-light">
                          {data.userId 
                            ? data.makerDetails?.assemblyDate 
                              ? formatDate(data.makerDetails.assemblyDate)
                              : "Complete"
                            : "Awaiting maker"
                          }
                        </p>
                      </div>
                    </>
                  )}
                </>
              )}
              </div>
            </CardContent>
            
          </Card>

        </div>

        
      
        {/* ========== SOURCE DETAILS ========== */}
        <div className="flex flex-col gap-6 ">
          {/* Source Details Card */}
          <Card className="border-0 border-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-light flex items-center justify-start border-b border-gray-200 pb-3 text-gray-600">
                <Building className="hidden w-4 h-4 mr-2" />
                {data.id.startsWith("B")
                  ? "Bin Details:"
                  : data.id.startsWith("T")
                    ? "Batch Details:"
                    : "Source Details"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {/* ID Hierarchy Display */}
              <div className="space-y-3 ">
                <div className="flex justify-between font-light">
                  <span className="text-gray-600">
                    {data.id.startsWith("B")
                      ? "Bin ID"
                      : data.id.startsWith("T")
                        ? "Batch ID"
                        : data.id.startsWith("K")
                          ? "Blank ID"
                          : "Main ID"}
                  </span>
                  <span className="font-mono">{data.id}</span>
                </div>
                {(data.binIds || relatedItems.sourceBin) && (
                  <div className="flex justify-between font-light">
                    <span className="text-gray-600">Bin IDs</span>
                    <div className="space-y-1 text-right">
                      {data.binIds ? (
                        // Show multiple bin IDs from the array
                        data.binIds.map((binId: string) => (
                          <Link
                            key={binId}
                            href={`/track/${binId}`}
                            className="block font-mono text-black hover:text-gray-600 hover:underline"
                          >
                            {binId}
                          </Link>
                        ))
                      ) : (
                        // Fallback to source bin
                        relatedItems.sourceBin && (
                          <Link
                            href={`/track/${relatedItems.sourceBin.id}`}
                            className="block font-mono text-black hover:text-gray-600 hover:underline"
                          >
                            {relatedItems.sourceBin.id}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                )}
                {data.batchId && (
                  <div className="flex justify-between font-light">
                    <span className="text-gray-600">Batch ID</span>
                    <Link
                      href={`/track/${data.batchId}`}
                      className="font-mono text-black hover:text-gray-600 hover:underline"
                    >
                      {data.batchId}
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex justify-between font-light">
                <span className="text-gray-600">Origin</span>
                <span className="font-mono">{data.organization?.name || "Unknown Origin"}</span>
              </div>
              {data.location && (
                <div className="flex justify-between items-center font-light">
                  <span className="text-gray-600">Location</span>
                  <span className="font-mono flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {data.location}
                  </span>
                </div>
              )}
              {data.materialType && (
                <div className="flex justify-between font-light">
                  <span className="text-gray-600">Material</span>
                  <Badge className="font-mono bg-gray-200 text-black font-light">
                    {data.materialType}
                  </Badge>
                </div>
              )}
              {data.id.startsWith("T") && data.status && (
                <div className="flex justify-between">
                  <span className="text-gray-600 font-light">Status</span>
                  {getProcessingStatusBadge(data.status)}
                </div>
              )}
              {data.weight && !data.id.startsWith("B") && (
                <div className="flex justify-between items-center font-light">
                  <span className="text-gray-600">Weight</span>
                  <span className="font-mono flex items-center">
                    <Weight className=" w-4 h-4 mr-1" />
                    {data.weight}kg
                  </span>
                </div>
              )}
              {data.collectionDate && (
                <div className="flex justify-between items-center font-light">
                  <span className="text-gray-600">
                    {data.id.startsWith("T") ? "Batched Date" : "Last Collected"}
                  </span>
                  <span className="font-mono flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(data.collectionDate)}
                  </span>
                </div>
              )}
              {data.nextCollectionDate && (
                <div className="flex justify-between items-center font-light">
                  <span className="text-gray-600">
                    Next Collection
                  </span>
                  <span className="font-mono font-extralight flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(data.nextCollectionDate)}
                  </span>
                </div>
              )}
              {data.id.startsWith("B") && data.binStatus && (
                <div className="flex justify-between items-center font-light">
                  <span className="text-gray-600">Status</span>
                  <Badge className="bg-gray-200 text-black font-light">
                    {getBinStatusLabel(data.binStatus)}
                  </Badge>
                </div>
              )}
              {data.processedDate && (
                <div className="flex justify-between items-center font-light">
                  <span className="text-gray-600">Processed</span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(data.processedDate)}
                  </span>
                </div>
              )}
              {data.event && data.event.trim() && (
                <div className="flex justify-between font-light">
                  <span className="text-gray-600">Event</span>
                  <span>{data.event}</span>
                </div>
              )}
              {data.adoptedBy && data.id.startsWith("B") && (
                <div className="flex justify-between font-light">
                  <span className="text-gray-600">Adopted By</span>
                  <span>{data.adoptedBy}</span>
                </div>
              )}
              {data.message && (
                <div className="border-t border-gray-200 pt-3">
                  <span className="text-gray-600 block mb-2 font-light">
                    Org Message:
                  </span>
                  <div className="my-12 text-center justify-center w-full flex mx-auto"><div className="text-sm text-center italic w-3/4 font-light">{data.message}</div></div>
                </div>
              )}
              {isUncollected && (
                <div className="border-t pt-3 text-center border-gray-200">
                  <div className="flex items-center justify-center text-sm text-gray-600 font-light">
                    <Package className="w-4 h-4 mr-1" strokeWidth={1.5} />
                    <span>
                      Ready for Collection
                    </span>
                  </div>
                </div>
              )}
              {isSourceOnly && !isUncollected && isProcessed && (
                <div className="border-t pt-3 text-center border-gray-200">
                  <div className="flex items-center justify-center text-sm text-gray-600 font-light">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>
                      Ready for Purchase
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ========== PRODUCT DETAILS ========== */}
          {!isSourceOnly && (
            <>
              <Card className="border border-gray-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-light flex items-center">
                    <Package className="w-4 h-4 mr-2" />
                    Product Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between font-light">
                    <span className="text-gray-600">
                      Product Type
                    </span>
                    <span>{getProductTypeLabel(data.productType)}</span>
                  </div>

                  {!isCharity && (
                    <div className="flex justify-between items-center font-light">
                      <span className="text-gray-600">
                        Purchased
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(data.transactionDate)}
                      </span>
                    </div>
                  )}

                  {isCharity && data.donatingEntity && (
                    <div className="flex justify-between font-light">
                      <span className="text-gray-600">Donor</span>
                      <span>{data.donatingEntity}</span>
                    </div>
                  )}

                  {isCharity && (
                    <div className="flex justify-between items-center font-light">
                      <span className="text-gray-600">Donated</span>
                      <span>{data.destination}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center font-light">
                    <span className="text-gray-600">Delivered</span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(data.deliveredDate)}
                    </span>
                  </div>

                  {data.event && (
                    <div className="flex justify-between font-light">
                      <span className="text-gray-600">Event</span>
                      <span>{data.event}</span>
                    </div>
                  )}

                  {isCharity && data.message && (
                    <div className="border-t border-gray-200 pt-3">
                      <span className="text-gray-500 block mb-2 font-light text-xs">
                        Message
                      </span>
                      <p className="text-sm italic font-light">{data.message}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* ========== MAKER DETAILS ========== */}
              <Card className="border border-gray-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-light flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Maker Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {data.makerDetails ? (
                    // Registered State - Show completed maker details
                    <>
                      <div className="flex justify-between font-light">
                        <span className="text-gray-600">Maker</span>
                        <span className="font-medium">
                          {data.makerDetails.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center font-light">
                        <span className="text-gray-600">
                          Location
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {data.makerDetails.location}
                        </span>
                      </div>
                      <div className="flex justify-between items-center font-light">
                        <span className="text-gray-600">
                          Assembled
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(data.makerDetails.assemblyDate)}
                        </span>
                      </div>
                      {data.makerDetails.story && (
                        <div className="border-t border-gray-200 pt-3">
                          <span className="text-gray-500 block mb-2 font-light text-xs">
                            Maker Story
                          </span>
                          <p className="text-sm italic leading-relaxed font-light">
                            {data.makerDetails.story}
                          </p>
                        </div>
                      )}
                      <div className="border-t border-gray-200 pt-3 flex items-center justify-center">
                        <div className="flex items-center text-black text-sm font-light">
                          <Heart className="w-4 h-4 mr-1 fill-current" />
                          <span>
                            Maker Journey Complete
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Unregistered State - Show CTA
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <Plus className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-base mb-2 font-light">
                        Complete Your Maker Journey
                      </h3>
                      <p className="text-sm text-gray-600 mb-6 leading-relaxed font-light">
                        {isCharity
                          ? `Did you assemble this item${data.destination ? ` at ${data.destination}` : ""}? Share your story and connect this donation to its educational impact.`
                          : "Did you assemble this item? Share your story and become part of the circular economy narrative."}
                      </p>
                      <button className="w-full bg-black text-white font-light py-3 px-6 border border-gray-300 hover:bg-gray-800 transition-colors text-sm">
                        Register as Maker
                      </button>
                      <p className="text-xs text-gray-500 mt-3 font-light">
                        Email verification required
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Impact Metrics - Commented out for now */}
        {false && !isSourceOnly && impactMetrics && (
          <Card className="border-0 ">
            <CardHeader>
              <CardTitle className="flex items-center justify-center text-xl font-light">
                <Leaf className="w-5 h-5 mr-2" />
                Environmental Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8 text-center">
                <div>
                  <div className="text-4xl mb-2 font-light">
                    {impactMetrics?.carbonSaved}kg
                  </div>
                  <div className="text-sm text-gray-600 font-light">
                    CO₂ Offset Generated
                  </div>
                  <p className="text-xs text-gray-500 mt-2 font-light">
                    Equivalent to removing a car from the road for 2.3 days
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-2 font-light">
                    {impactMetrics?.wasteReduced}kg
                  </div>
                  <div className="text-sm text-gray-600 font-light">
                    Plastic Waste Diverted
                  </div>
                  <p className="text-xs text-gray-500 mt-2 font-light">
                    Prevented from entering landfills or ocean systems
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ========== CONNECTED ITEMS - Produced Items (for Batches) ========== */}
        {data.id.startsWith("T") && relatedItems.blanks.length > 0 && (
          <div className="mb-12">
            <Card className="border-0 border-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-light flex items-center justify-center">
                  <Package className="w-4 h-4 mr-2" />
                  Produced Items
                </CardTitle>
              </CardHeader>
              <CardContent className="py-3">
                <div className="space-y-2">
                  {relatedItems.blanks.map((blank: BlankItem, index: number) => (
                    <Link
                      key={blank.id}
                      href={`/track/${blank.id}`}
                      className="block"
                    >
                      <div className="flex justify-between items-center p-3 border-0 hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div>
                          <div className="text-sm font-mono font-light">
                            {blank.id}
                          </div>
                          <div className="text-xs text-gray-500 font-light">
                            {blank.productId
                              ? "Assembled"
                              : "Available for Assembly"}{" "}
                            • {blank.status}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 font-light">
                          Blank Item
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ========== CONNECTED ITEMS - Batches from Bin (for Bins) ========== */}
        {data.id.startsWith("B") && relatedItems.batches.length > 0 && (
          <div className="mb-12 -mt-12">
            <Card className="border-0">
              <CardHeader className="pb-0">
                <CardTitle className="text-sm font-light flex items-center justify-start pb-2 border-b text-gray-600"><div className="flex ">
                  <Package className="hidden w-4 h-4 mr-2" />
                  Batches from this Bin:
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="py-3">
                <div className="space-y-2">
                  {relatedItems.batches.map((batch: BatchItem, index: number) => (
                    <Link
                      key={batch.id}
                      href={`/track/${batch.id}`}
                      className="block"
                    >
                      <div className="flex justify-between items-center p-3 border-0 hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div>
                        

                          <div className="text-xs text-gray-600 font-light">
                            {formatDate(batch.collectionDate)}
                          </div>
                          <div className="text-xs text-gray-\600 font-light">
                            {batch.weight}kg • {batch.materialType} •{" "}
                            {getBatchStatusLabel(batch.status)}
                          </div>
                        </div>

                        <div className="text-sm font-mono font-light">
                          {batch.id}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            
               <div className="mt-8 text-sm font-light items-center justify-center flex w-full text-cnter font-jost mt-1">*************************************</div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
