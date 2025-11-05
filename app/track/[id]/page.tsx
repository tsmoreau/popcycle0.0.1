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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
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
  batchIds: string[];
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

  // Safe ID prefix checker - prevents crashes with non-string IDs
  const idStartsWith = (prefix: string) => {
    return typeof data?.id === 'string' && data.id.startsWith(prefix);
  };

  // Get the appropriate date field for each type
  const getDateField = () => {
    if (idStartsWith("B")) return data.collectionDate || data.lastCollectionDate;
    if (idStartsWith("T")) return data.collectionDate;
    if (idStartsWith("K")) return data.createdAt;
    if (idStartsWith("I")) return data.assemblyDate;
    return null;
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
  const isUncollected = idStartsWith("B") && !data.collectionDate && !data.lastCollectionDate;
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

  const getItemStatusLabel = (status: string) => {
    switch (status) {
      case "assembled":
        return "Assembled";
      case "quality_checked":
        return "Quality Checked";
      case "packaged":
        return "Packaged";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
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
    <div className="min-h-screen lg:max-w-[35vw] py-20 flex mx-auto justify-center font-jost bg-white">
      <div className="w-full mx-auto border border-gray-300 mr-6 ml-6">
        {/* ========== HEADER INFO ========== */}

        <div className="flex flex-col gap-6 ">
         
          <div className="pt-8 border-0">

            
            <div className="pb-3">
              <div className="text-sm font-light flex flex-col items-center justify-center font-mono">
                <div className=" pl-0 self-end flex items-center space-x-2 group pb-2 mx-auto">
                  <div className="w-10 h-10 bg-gray-300 flex items-center justify-center">
                    <span className="text-white font-base helvetica-bold text-lg">P</span>
                  </div>
                  <div className="flex-col flex mt-2">
                  <span className="text-3xl font-extralight tracking-tighter font-base font-jost text-gray-900">
                    PopCycle
                  </span>
                    </div>
                </div>
                <div className="font-jost">********************************</div>
                {data.id.startsWith("B")
                  ? "Bin Materials Receipt"
                  : data.id.startsWith("T")
                    ? "Batch Materials Receipt"
                   : data.id.startsWith("K")
                       ? "Pressed Blank Materials Receipt"
                  : data.id.startsWith("I")
                   ? "Item Materials Receipt"
                : "Receipt"}
                 <div className="font-jost mt-1">********************************</div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="w-full aspect-3/2 bg-gray-50"></div>

            </div>
            
          </div>

        </div>

      
        {/* ========== SOURCE DETAILS ========== */}
        <div className="flex flex-col gap-6 ">
          {/* Source Details Card */}
          <Card className="border-0 border-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-light flex items-center justify-start border-b border-gray-200 pb-3 text-gray-600">
                <Building className="hidden w-4 h-4 mr-2" />
                {idStartsWith("B")
                  ? "Bin Details:"
                  : idStartsWith("T")
                    ? "Batch Details:"
                  : idStartsWith("K")
                  ? "Sheet Details:"
                  : idStartsWith("I")
                  ? "Item Details:"
                    : "Source Details"}
              </CardTitle>
            </CardHeader>
            
            <div className="px-6 space-y-3 text-sm  ">
              {/* ID Hierarchy Display */}
              <div className="space-y-3 ">
                <div className="flex justify-between font-light">
                  <span className="text-gray-600">
                    {idStartsWith("B")
                      ? "Bin ID"
                      : idStartsWith("T")
                        ? "Batch ID"
                        : idStartsWith("K")
                          ? "Blank ID"
                      : idStartsWith("I")
                      ? "Item ID"
                          : "Main ID"}
                  </span>
                  <span className="font-mono">{data.id}</span>
                </div>
                {data.binIds && data.binIds.length > 0 && (
                  <div className="flex justify-between font-light">
                    <span className="text-gray-600">Bin IDs</span>
                    <div className="space-y-1 text-right">
                      {data.binIds.map((binId: string) => (
                        <Link
                          key={binId}
                          href={`/track/${binId}`}
                          className="block font-mono text-black hover:text-gray-600 hover:underline"
                        >
                          {binId}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {data.batchIds && data.batchIds.length > 0 && (
                  <div className="flex justify-between font-light">
                    <span className="text-gray-600">Batch IDs</span>
                    <div className="space-y-1 text-right">
                      {data.batchIds.map((batchId: string) => (
                        <Link
                          key={batchId}
                          href={`/track/${batchId}`}
                          className="block font-mono text-black hover:text-gray-600 hover:underline"
                        >
                          {batchId}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {data.blankIds && data.blankIds.length > 0 && (
                  <div className="flex justify-between font-light">
                    <span className="text-gray-600">Blank IDs</span>
                    <div className="space-y-1 text-right">
                      {data.blankIds.map((blankId: string) => (
                        <Link
                          key={blankId}
                          href={`/track/${blankId}`}
                          className="block font-mono text-black hover:text-gray-600 hover:underline"
                        >
                          {blankId}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {(idStartsWith("T") || idStartsWith("K") || idStartsWith("I")) && data.origins && data.origins.length > 0 && (
                <div className="flex justify-between font-light">
                  <span className="text-gray-600">{data.origins.length === 1 ? "Origin" : "Origins"}</span>
                  <div className="space-y-1 text-right">
                    {data.origins.map((origin: any) => (
                      <div key={origin.id} className="font-mono text-black">
                        {origin.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {idStartsWith("B") && (
                <div className="flex justify-between font-light">
                  <span className="text-gray-600">Origin</span>
                  <span className="font-mono">{data.organization?.name || "Unknown Origin"}</span>
                </div>
              )}
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
                  <div className="rounded-full px-2 border border-1 border-black font-mono text-black font-light">
                    {data.materialType}
                  </div>
                </div>
              )}
              {idStartsWith("T") && data.status && (
                <div className="flex justify-between">
                  <span className="text-gray-600 font-light">Status</span>
                  {data.status}
                </div>
              )}
              {data.weight && !idStartsWith("B") && (
                <div className="flex justify-between items-center font-light">
                  <span className="text-gray-600">Weight</span>
                  <span className="font-mono flex items-center">
                    <Weight className=" w-4 h-4 mr-1" />
                    {data.weight}kg
                  </span>
                </div>
              )}
              {getDateField() && (
                <div className="flex justify-between items-center font-light">
                  <span className="text-gray-600">
                    {idStartsWith("B") 
                      ? "Last Collected" 
                      : idStartsWith("T")
                        ? "Batched Date"
                        : idStartsWith("K")
                          ? "Pressed Date"
                          : idStartsWith("I")
                            ? "Manufacture Date"
                            : "Date"}
                  </span>
                  <span className="font-mono flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(getDateField())}
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
              {idStartsWith("B") && data.binStatus && (
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
              {data.adoptedBy && idStartsWith("B") && (
                <div className="flex justify-between font-light">
                  <span className="text-gray-600">Adopted By</span>
                  <span>{data.adoptedBy}</span>
                </div>
              )}

            </div>
          </Card>

        
        </div>



        {/* ========== ORG MESSAGE & EVENT DETAILS ========== */}

        <div className="flex flex-col pt-2  px-6"> 


          {data.orgMessage && (
            <div className="-mt-1 border-gray-200">
              <div className="text-sm text-gray-600 font-light hover:no-underline py-2 italic ">
                Message from {data.organization?.name || "Unknown Origin"}:
              </div>
              <div className="py-4 w-full flex justify-center">
              <div className="w-2/3 text-center text-sm italic font-light text-gray-700">
                "{data.orgMessage}"
              </div>
                </div>
            </div>
          )}

          
          {data.event && data.event.trim() && (
            <div className="pt-6">
              <Accordion type="single" collapsible className="border-0">
                <AccordionItem value="event-details" className="border-0">
                  <AccordionTrigger className="text-sm text-gray-600 font-light hover:no-underline py-2">
                    Event Details
                  </AccordionTrigger>
                  <AccordionContent className="px-0 pt-2 pb-0">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between font-light">
                        <span className="text-gray-600">Event Name</span>
                        <span className="font-mono">{data.event}</span>
                      </div>
                      {data.eventScheduledDate && (
                        <div className="flex justify-between font-light">
                          <span className="text-gray-600">Scheduled Date</span>
                          <span className="font-mono">{formatDate(data.eventScheduledDate)}</span>
                        </div>
                      )}
                      {data.eventDescription && (
                        <div className="border-t border-gray-200 pt-3">
                          <div className="text-gray-600 block mb-2 font-light text-sm">
                            Event Description:
                          </div>
                          <div className="text-sm font-light text-gray-700">
                            {data.eventDescription}
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
          
       
          </div>

        {/* ========== PRODUCT DETAILS ========== */}

         <div className="">
        {data.type === 'item' && data.productDetails && (
          <>
            <Card className="border-0 border-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-light flex items-center justify-start border-b border-gray-200 pb-3 text-gray-600">
                  Product Details:
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between font-light">
                  <span className="text-gray-600">Product Name</span>
                  <span className="font-mono">{data.productDetails.name}</span>
                </div>
                <div className="flex justify-between font-light">
                  <span className="text-gray-600">Product Type</span>
                  <span className="font-mono">{data.productDetails.productType}</span>
                </div>
                <div className="flex justify-between font-light">
                  <span className="text-gray-600">Category</span>
                  <span className="font-mono">{data.productDetails.category}</span>
                </div>
                {data.editionNumber && (
                  <div className="flex justify-between font-light">
                    <span className="text-gray-600">Edition</span>
                    <span className="font-mono">#{data.editionNumber}</span>
                  </div>
                )}
                {data.serialNumber && (
                  <div className="flex justify-between font-light">
                    <span className="text-gray-600">Serial Number</span>
                    <span className="font-mono">{data.serialNumber}</span>
                  </div>
                )}
                {data.deliveryDate && (
                  <div className="flex justify-between items-center font-light">
                    <span className="text-gray-600">Delivered</span>
                    <span className="flex items-center font-mono">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(data.deliveryDate)}
                    </span>
                  </div>
                )}
                {data.productDetails.description && (
                  <div className="border-t border-gray-200 pt-3">
                    <span className="text-gray-600 block mb-2 font-light">
                      Description:
                    </span>
                    <div className="my-4 text-sm font-light">{data.productDetails.description}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* ========== MAKER DETAILS ========== */}
            <Card className="hidden border border-gray-300">
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
     
        {/* ========== CONNECTED ITEMS - Produced Items ========== */}

        <div className="px-6">
        {/* Blanks from Batches */}
        {data.producedBlanks && data.producedBlanks.length > 0 && (
          <div className="mb-6">
            <Accordion type="single" collapsible className="border-0">
              <AccordionItem value="produced-blanks" className="border-0">
                <AccordionTrigger className="text-sm text-gray-600 font-light hover:no-underline py-2">
                  Produced Items ({data.producedBlanks.length})
                </AccordionTrigger>
                <AccordionContent className="px-0 pt-2 pb-0">
                  <div className="space-y-2">
                    {data.producedBlanks.map((blank: any, index: number) => (
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
                              {blank.status} • {blank.weight}kg
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 font-light">
                            Blank Item
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {/* Finished Products from Batches or Blanks */}
        {data.producedItems && data.producedItems.length > 0 && (
          <div className="mb-6">
            <Accordion type="single" collapsible className="border-0">
              <AccordionItem value="produced-items" className="border-0">
                <AccordionTrigger className="text-sm text-gray-600 font-light hover:no-underline py-2">
                  Finished Products ({data.producedItems.length})
                </AccordionTrigger>
                <AccordionContent className="px-0 pt-2 pb-0">
                  <div className="space-y-2">
                    {data.producedItems.map((item: any, index: number) => (
                      <Link
                        key={item.id}
                        href={`/track/${item.id}`}
                        className="block"
                      >
                        <div className="flex justify-between items-center p-3 border-0 hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div>
                            <div className="text-sm font-mono font-light">
                              {item.id}
                            </div>
                            <div className="text-xs text-gray-500 font-light">
                              {item.status}
                              {item.serialNumber && ` • Serial: ${item.serialNumber}`}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 font-light">
                            Finished Item
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {/* ========== CONNECTED ITEMS - Batches from Bin (for Bins) ========== */}
        {data.producedBatches && data.producedBatches.length > 0 && (
          <div className="mb-6">
            <Accordion type="single" collapsible className="border-0">
              <AccordionItem value="produced-batches" className="border-0">
                <AccordionTrigger className="text-sm text-gray-600 font-light hover:no-underline py-2">
                  Batches from this Bin ({data.producedBatches.length})
                </AccordionTrigger>
                <AccordionContent className="px-0 pt-2 pb-0">
                  <div className="space-y-2">
                    {data.producedBatches.map((batch: any, index: number) => (
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
                            <div className="text-xs text-gray-600 font-light">
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
          </div>
        

         {/* ========== FOOTER INFO ========== */}
        
         <div className="mb-12 mt-8 text-sm font-light items-center justify-center flex w-full text-cnter font-jost mt-1">***************************</div>

        
      </div>
    </div>
  );
}
