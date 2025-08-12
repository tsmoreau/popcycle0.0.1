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
import {
  PopArtContainer,
  QRCodeElement,
} from "../../components/PopArtElements";
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
      <div className="min-h-screen flex items-center justify-center">
        <PopArtContainer color="red" shadow>
          <Card className="border-4 border-pop-black">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl helvetica-bold mb-4">Item Not Found</h2>
              <p className="text-pop-gray mb-6">
                Item code "{id}" is not in our system.
              </p>
              <p className="text-sm text-pop-gray">
                Try one of our sample item codes: ABC123, DEF456, GHI789,
                JKL012, MNO345, PQR678, STU901
              </p>
            </CardContent>
          </Card>
        </PopArtContainer>
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
          <Badge className="bg-gray-500 text-white">
            <Package className="h-3 w-3 mr-1" />
            Collected
          </Badge>
        );
      case "rough_wash":
        return (
          <Badge className="bg-pop-blue text-white">
            <Droplets className="h-3 w-3 mr-1" />
            Rough Wash
          </Badge>
        );
      case "sort":
        return (
          <Badge className="bg-pop-green text-white">
            <Scissors className="h-3 w-3 mr-1" />
            Sort
          </Badge>
        );
      case "first_dry":
        return (
          <Badge className="bg-yellow-500 text-white">
            <Wind className="h-3 w-3 mr-1" />
            First Dry
          </Badge>
        );
      case "shred":
        return (
          <Badge className="bg-orange-500 text-white">
            <ShredIcon className="h-3 w-3 mr-1" />
            Shred
          </Badge>
        );
      case "fine_wash":
        return (
          <Badge className="bg-blue-600 text-white">
            <Droplets className="h-3 w-3 mr-1" />
            Fine Wash
          </Badge>
        );
      case "second_dry":
        return (
          <Badge className="bg-yellow-600 text-white">
            <Wind className="h-3 w-3 mr-1" />
            Second Dry
          </Badge>
        );
      case "press":
        return (
          <Badge className="bg-purple-500 text-white">
            <Archive className="h-3 w-3 mr-1" />
            Press
          </Badge>
        );
      case "weigh_photo":
        return (
          <Badge className="bg-indigo-500 text-white">
            <Scale className="h-3 w-3 mr-1" />
            Weigh & Photo
          </Badge>
        );
      case "laser_marking":
        return (
          <Badge className="bg-pop-red text-white">
            <Zap className="h-3 w-3 mr-1" />
            Laser Marking
          </Badge>
        );
      case "inventory_creation":
        return (
          <Badge className="bg-pop-black text-white">
            <Settings className="h-3 w-3 mr-1" />
            Inventory Creation
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* ========== HERO SECTION ========== */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl helvetica-bold mb-6 tracking-tight">
            <span className="text-pop-green"></span> {data.id}
          </h1>
          <p className="text-lg text-pop-gray">
            {isUncollected
              ? `Active collection bin at ${data.organization?.name || "Unknown Origin"}`
              : isSourceOnly
                ? isProcessed
                  ? `Processed plastic from ${data.organization?.name || "Unknown Origin"}`
                  : `Fresh plastic collection from ${data.organization?.name || "Unknown Origin"}`
                : `Complete transformation journey from ${data.organization?.name || "Unknown Origin"}`}
          </p>
        </div>

        {/* QR Code Display */}
        <div className="flex justify-center mb-12">
          <PopArtContainer color="green" shadow>
            <div className="p-8 bg-white border-4 border-pop-black">
              <QRCodeElement qrCode={data.id} size="lg" />
            </div>
          </PopArtContainer>
        </div>

        {/* ========== TIMELINE SECTION ========== */}
        <div className="mb-12">
          <div className="flex gap-4 justify-center max-w-3xl mx-auto">
            {/* Step 1: COLLECTION */}
            <div className="text-center flex-1 max-w-[140px]">
              <div className={`w-20 h-20 mx-auto mb-4 border-4 border-pop-black flex items-center justify-center rounded-lg shadow-lg ${
                data.collectionDate || data.lastCollectionDate || data.id.startsWith("B") 
                  ? "bg-pop-green" 
                  : "bg-gray-200"
              }`}>
                <Package className={`w-10 h-10 ${
                  data.collectionDate || data.lastCollectionDate || data.id.startsWith("B") 
                    ? "text-pop-black" 
                    : "text-gray-400"
                }`} strokeWidth={1.5} />
              </div>
              <h3 className="systematic-caps text-sm mb-2 font-semibold">
                Collection
              </h3>
              <p className="text-xs text-pop-gray">
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

            {/* Connection Line */}
            <div className="flex items-center justify-center pt-10">
              <div className={`w-8 h-0.5 ${
                isProcessed ? "bg-pop-blue" : "bg-gray-300"
              }`}></div>
            </div>

            {/* Step 2: PROCESSING */}
            <div className="text-center flex-1 max-w-[140px]">
              <div className={`w-20 h-20 mx-auto mb-4 border-4 border-pop-black flex items-center justify-center rounded-lg shadow-lg ${
                isProcessed 
                  ? "bg-pop-blue" 
                  : "bg-gray-200"
              }`}>
                <Settings className={`w-10 h-10 ${
                  isProcessed 
                    ? "text-pop-black" 
                    : "text-gray-400"
                }`} strokeWidth={1.5} />
              </div>
              <h3 className="systematic-caps text-sm mb-2 font-semibold">
                {data.status === "inventory_creation" ? "Processed" : "Processing"}
              </h3>
              <p className="text-xs text-pop-gray">
                {data.status === "inventory_creation" ? "Complete" : data.id.startsWith("T") ? "In progress" : "Pending"}
              </p>
            </div>

            {/* Connection Line */}
            <div className="flex items-center justify-center pt-10">
              <div className={`w-8 h-0.5 ${
                data.productId ? "bg-pop-red" : "bg-gray-300"
              }`}></div>
            </div>

            {/* Step 3: PURCHASED/DONATED */}
            <div className="text-center flex-1 max-w-[140px]">
              <div className={`w-20 h-20 mx-auto mb-4 border-4 border-pop-black flex items-center justify-center rounded-lg shadow-lg ${
                data.productId 
                  ? "bg-pop-red" 
                  : "bg-gray-200"
              }`}>
                {isCharity ? (
                  <HeartHandshake className={`w-10 h-10 ${
                    data.productId 
                      ? "text-pop-black" 
                      : "text-gray-400"
                  }`} strokeWidth={1.5} />
                ) : (
                  <CheckCircle className={`w-10 h-10 ${
                    data.productId 
                      ? "text-pop-black" 
                      : "text-gray-400"
                  }`} strokeWidth={1.5} />
                )}
              </div>
              <h3 className="systematic-caps text-sm mb-2 font-semibold">
                {isCharity ? "Donated" : "Purchased"}
              </h3>
              <p className="text-xs text-pop-gray">
                {data.productId 
                  ? data.deliveredDate || data.deliveryDate
                    ? formatDate(data.deliveredDate || data.deliveryDate)
                    : "Complete"
                  : "Available"
                }
              </p>
            </div>

            {/* Connection Line */}
            <div className="flex items-center justify-center pt-10">
              <div className={`w-8 h-0.5 ${
                data.userId ? "bg-pop-red" : "bg-gray-300"
              }`}></div>
            </div>

            {/* Step 4: ASSEMBLED */}
            <div className="text-center flex-1 max-w-[140px]">
              <div className={`w-20 h-20 mx-auto mb-4 border-4 border-pop-black flex items-center justify-center rounded-lg shadow-lg ${
                data.userId 
                  ? "bg-pop-red" 
                  : "bg-gray-200"
              }`}>
                <User className={`w-10 h-10 ${
                  data.userId 
                    ? "text-pop-black" 
                    : "text-gray-400"
                }`} strokeWidth={1.5} />
              </div>
              <h3 className="systematic-caps text-sm mb-2 font-semibold">
                Assembled
              </h3>
              <p className="text-xs text-pop-gray">
                {data.userId 
                  ? data.makerDetails?.assemblyDate 
                    ? formatDate(data.makerDetails.assemblyDate)
                    : "Complete"
                  : "Awaiting maker"
                }
              </p>
            </div>
          </div>
        </div>

        {/* ========== SOURCE DETAILS ========== */}
        <div className="flex flex-col gap-8 mb-12 max-w-2xl mx-auto">
          {/* Source Details Card */}
          <PopArtContainer color="green" shadow>
            <Card className="border-4 border-pop-black">
              <CardHeader>
                <CardTitle className="systematic-caps flex items-center justify-center">
                  <Building className="w-5 h-5 mr-2" />
                  {data.id.startsWith("B")
                    ? "Bin Details"
                    : data.id.startsWith("T")
                      ? "Batch Details"
                      : "Source Details"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* ID Hierarchy Display */}
                <div className="space-y-3 pb-4 border-b border-pop-gray">
                  <div className="flex justify-between">
                    <span className="systematic-caps text-sm">
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
                    <div className="flex justify-between">
                      <span className="systematic-caps text-sm">Bin IDs</span>
                      <div className="space-y-1 text-right">
                        {data.binIds ? (
                          // Show multiple bin IDs from the array
                          data.binIds.map((binId: string) => (
                            <Link
                              key={binId}
                              href={`/track/${binId}`}
                              className="block font-mono text-pop-green hover:text-pop-black hover:underline"
                            >
                              {binId}
                            </Link>
                          ))
                        ) : (
                          // Fallback to source bin
                          relatedItems.sourceBin && (
                            <Link
                              href={`/track/${relatedItems.sourceBin.id}`}
                              className="block font-mono text-pop-green hover:text-pop-black hover:underline"
                            >
                              {relatedItems.sourceBin.id}
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  )}
                  {data.batchId && (
                    <div className="flex justify-between">
                      <span className="systematic-caps text-sm">Batch ID</span>
                      <Link
                        href={`/track/${data.batchId}`}
                        className="font-mono text-pop-blue hover:text-pop-black hover:underline"
                      >
                        {data.batchId}
                      </Link>
                    </div>
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="systematic-caps text-sm">Origin</span>
                  <span>{data.originPoint}</span>
                </div>
                {data.materialType && (
                  <div className="flex justify-between">
                    <span className="systematic-caps text-sm">Material</span>
                    <Badge className="bg-pop-green text-pop-black">
                      {data.materialType}
                    </Badge>
                  </div>
                )}
                {data.id.startsWith("T") && data.event && (
                  <div className="flex justify-between">
                    <span className="systematic-caps text-sm">Status</span>
                    {getProcessingStatusBadge(data.event)}
                  </div>
                )}
                {data.weight && !data.id.startsWith("B") && (
                  <div className="flex justify-between items-center">
                    <span className="systematic-caps text-sm">Weight</span>
                    <span className="flex items-center">
                      <Weight className="w-4 h-4 mr-1" />
                      {data.weight}kg
                    </span>
                  </div>
                )}
                {data.collectionDate && (
                  <div className="flex justify-between items-center">
                    <span className="systematic-caps text-sm">
                      Last Collected
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(data.collectionDate)}
                    </span>
                  </div>
                )}
                {data.nextCollectionDate && (
                  <div className="flex justify-between items-center">
                    <span className="systematic-caps text-sm">
                      Next Collection
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(data.nextCollectionDate)}
                    </span>
                  </div>
                )}
                {data.id.startsWith("B") && data.binStatus && (
                  <div className="flex justify-between items-center">
                    <span className="systematic-caps text-sm">Status</span>
                    <Badge className="bg-pop-green text-pop-black">
                      {getBinStatusLabel(data.binStatus)}
                    </Badge>
                  </div>
                )}
                {data.processedDate && (
                  <div className="flex justify-between items-center">
                    <span className="systematic-caps text-sm">Processed</span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(data.processedDate)}
                    </span>
                  </div>
                )}
                {data.event && data.event.trim() && (
                  <div className="flex justify-between">
                    <span className="systematic-caps text-sm">Event</span>
                    <span>{data.event}</span>
                  </div>
                )}
                {data.adoptedBy && data.id.startsWith("B") && (
                  <div className="flex justify-between">
                    <span className="systematic-caps text-sm">Adopted By</span>
                    <span>{data.adoptedBy}</span>
                  </div>
                )}
                {data.message && (
                  <div className="border-t border-pop-gray pt-4">
                    <span className="systematic-caps text-sm text-pop-gray block mb-2">
                      Message
                    </span>
                    <p className="text-sm italic">{data.message}</p>
                  </div>
                )}
                {isUncollected && (
                  <div className="border-t pt-4 text-center border-pop-gray">
                    <div className="flex items-center justify-center text-sm text-pop-gray">
                      <Package className="w-4 h-4 mr-1" strokeWidth={1.5} />
                      <span className="systematic-caps">
                        Ready for Collection
                      </span>
                    </div>
                  </div>
                )}
                {isSourceOnly && !isUncollected && isProcessed && (
                  <div className="border-t pt-4 text-center border-pop-blue">
                    <div className="flex items-center justify-center text-sm text-pop-blue">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="systematic-caps">
                        Ready for Purchase
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </PopArtContainer>

          {/* ========== PRODUCT DETAILS ========== */}
          {!isSourceOnly && (
            <>
              <PopArtContainer color={isCharity ? "red" : "blue"} shadow>
                <Card className="border-4 border-pop-black">
                  <CardHeader>
                    <CardTitle className="systematic-caps flex items-center">
                      <Package className="w-5 h-5 mr-2" />
                      Product Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="systematic-caps text-sm">
                        Product Type
                      </span>
                      <span>{getProductTypeLabel(data.productType)}</span>
                    </div>

                    {!isCharity && (
                      <div className="flex justify-between items-center">
                        <span className="systematic-caps text-sm">
                          Purchased
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(data.transactionDate)}
                        </span>
                      </div>
                    )}

                    {isCharity && data.donatingEntity && (
                      <div className="flex justify-between">
                        <span className="systematic-caps text-sm">Donor</span>
                        <span>{data.donatingEntity}</span>
                      </div>
                    )}

                    {isCharity && (
                      <div className="flex justify-between items-center">
                        <span className="systematic-caps text-sm">Donated</span>
                        <span>{data.destination}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="systematic-caps text-sm">Delivered</span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(data.deliveredDate)}
                      </span>
                    </div>

                    {data.event && (
                      <div className="flex justify-between">
                        <span className="systematic-caps text-sm">Event</span>
                        <span>{data.event}</span>
                      </div>
                    )}

                    {isCharity && data.message && (
                      <div className="border-t border-pop-gray pt-4">
                        <span className="systematic-caps text-sm text-pop-gray block mb-2">
                          Message
                        </span>
                        <p className="text-sm italic">{data.message}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </PopArtContainer>

              {/* ========== MAKER DETAILS ========== */}
              <PopArtContainer color="red" shadow>
                <Card className="border-4 border-pop-black">
                  <CardHeader>
                    <CardTitle className="systematic-caps flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Maker Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {data.makerDetails ? (
                      // Registered State - Show completed maker details
                      <>
                        <div className="flex justify-between">
                          <span className="systematic-caps text-sm">Maker</span>
                          <span className="font-semibold">
                            {data.makerDetails.name}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="systematic-caps text-sm">
                            Location
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {data.makerDetails.location}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="systematic-caps text-sm">
                            Assembled
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(data.makerDetails.assemblyDate)}
                          </span>
                        </div>
                        {data.makerDetails.story && (
                          <div className="border-t border-pop-gray pt-4">
                            <span className="systematic-caps text-sm text-pop-gray block mb-2">
                              Maker Story
                            </span>
                            <p className="text-sm italic leading-relaxed">
                              {data.makerDetails.story}
                            </p>
                          </div>
                        )}
                        <div className="border-t border-pop-gray pt-4 flex items-center justify-center">
                          <div className="flex items-center text-pop-red text-sm">
                            <Heart className="w-4 h-4 mr-1 fill-current" />
                            <span className="systematic-caps">
                              Maker Journey Complete
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      // Unregistered State - Show CTA
                      <div className="text-center py-8">
                        <div className="w-16 h-16 mx-auto mb-4 border-2 border-dashed border-pop-gray rounded-full flex items-center justify-center">
                          <Plus className="w-8 h-8 text-pop-gray" />
                        </div>
                        <h3 className="text-lg helvetica-bold mb-2">
                          Complete Your Maker Journey
                        </h3>
                        <p className="text-sm text-pop-gray mb-6 leading-relaxed">
                          {isCharity
                            ? `Did you assemble this item${data.destination ? ` at ${data.destination}` : ""}? Share your story and connect this donation to its educational impact.`
                            : "Did you assemble this item? Share your story and become part of the circular economy narrative."}
                        </p>
                        <button className="w-full bg-pop-red text-white font-semibold py-3 px-6 border-2 border-pop-black hover:bg-pop-black transition-colors systematic-caps">
                          Register as Maker
                        </button>
                        <p className="text-xs text-pop-gray mt-3">
                          Email verification required
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </PopArtContainer>
            </>
          )}
        </div>

        {/* Impact Metrics - Commented out for now */}
        {false && !isSourceOnly && impactMetrics && (
          <PopArtContainer color="red" shadow>
            <Card className="border-4 border-pop-black">
              <CardHeader>
                <CardTitle className="systematic-caps flex items-center justify-center text-2xl">
                  <Leaf className="w-6 h-6 mr-2" />
                  Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8 text-center">
                  <div>
                    <div className="text-4xl helvetica-bold text-pop-red mb-2">
                      {impactMetrics?.carbonSaved}kg
                    </div>
                    <div className="systematic-caps text-sm text-pop-gray">
                      CO₂ Offset Generated
                    </div>
                    <p className="text-xs text-pop-gray mt-2">
                      Equivalent to removing a car from the road for 2.3 days
                    </p>
                  </div>
                  <div>
                    <div className="text-4xl helvetica-bold text-pop-red mb-2">
                      {impactMetrics?.wasteReduced}kg
                    </div>
                    <div className="systematic-caps text-sm text-pop-gray">
                      Plastic Waste Diverted
                    </div>
                    <p className="text-xs text-pop-gray mt-2">
                      Prevented from entering landfills or ocean systems
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </PopArtContainer>
        )}

        {/* ========== CONNECTED ITEMS - Produced Items (for Batches) ========== */}
        {data.id.startsWith("T") && relatedItems.blanks.length > 0 && (
          <div className="max-w-2xl mx-auto">
            <PopArtContainer color="red" shadow>
              <Card className="border-4 border-pop-black">
                <CardHeader>
                  <CardTitle className="systematic-caps flex items-center justify-center text-2xl">
                    <Package className="w-6 h-6 mr-2" />
                    Produced Items
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-6">
                  <div className="space-y-3">
                    {relatedItems.blanks.map((blank, index) => (
                      <Link
                        key={blank.id}
                        href={`/track/${blank.id}`}
                        className="block"
                      >
                        <div className="flex justify-between items-center p-3 border border-pop-gray rounded hover:border-pop-red hover:bg-pop-red hover:bg-opacity-5 transition-colors cursor-pointer">
                          <div>
                            <div className="systematic-caps text-sm font-semibold text-pop-red hover:text-pop-black">
                              {blank.id}
                            </div>
                            <div className="text-xs text-pop-gray">
                              {blank.productId
                                ? "Assembled"
                                : "Available for Assembly"}{" "}
                              • {blank.status}
                            </div>
                          </div>
                          <div className="text-xs text-pop-gray">
                            Blank Item
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </PopArtContainer>
          </div>
        )}

        {/* ========== CONNECTED ITEMS - Batches from Bin (for Bins) ========== */}
        {data.id.startsWith("B") && relatedItems.batches.length > 0 && (
          <div className="max-w-2xl mx-auto">
            <PopArtContainer color="green" shadow>
              <Card className="border-4 border-pop-black">
                <CardHeader>
                  <CardTitle className="systematic-caps flex items-center justify-center text-2xl">
                    <Package className="w-6 h-6 mr-2" />
                    Batches from this Bin
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-6">
                  <div className="space-y-3">
                    {relatedItems.batches.map((batch, index) => (
                      <Link
                        key={batch.id}
                        href={`/track/${batch.id}`}
                        className="block"
                      >
                        <div className="flex justify-between items-center p-3 border border-pop-gray rounded hover:border-pop-green hover:bg-pop-green hover:bg-opacity-5 transition-colors cursor-pointer">
                          <div>
                            <div className="systematic-caps text-sm font-semibold text-pop-green hover:text-pop-black">
                              {batch.id}
                            </div>
                            <div className="text-xs text-pop-gray">
                              {batch.weight}kg • {batch.materialType} •{" "}
                              {getBatchStatusLabel(batch.status)}
                            </div>
                          </div>
                          <div className="text-xs text-pop-gray">
                            {formatDate(batch.collectionDate)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </PopArtContainer>
          </div>
        )}
      </div>
    </div>
  );
}
