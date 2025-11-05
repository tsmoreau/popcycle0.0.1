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
      <div className=" w-full mx-auto border drop-shadow-xl bg-white border-gray-300 mr-6 ml-6">
        {/* ========== HEADER INFO ========== */}

        <div className="flex flex-col gap-6 ">
         
          <div className="pt-8 border-0">

            
            <div className="pb-3">
              <div className="text-sm font-light flex flex-col items-center justify-center font-mono">
                <div className=" pl-0 self-end flex items-center space-x-2 group pb-2 mx-auto">
                  <div className="w-10 h-10 bg-gray-300 flex items-center justify-center">
                       <img
                        src="https://storage.googleapis.com/popcycle01/logo4.svg"

                        className="w-full h-full object-cover"
                        data-testid="img-product-info"
                      />
                   
                  </div>
                  <div className="flex-col flex mt-2">
                  <span className="text-3xl font-extralight tracking-tighter font-base font-jost text-gray-900">
                    PopCycle
                  </span>
                    </div>
                </div>
                <div className="font-jost">********************************</div>
                {data.id.startsWith("B")
                  ? "Bin Receipt"
                  : data.id.startsWith("T")
                    ? "Batch Receipt"
                   : data.id.startsWith("K")
                       ? "Pressed Blank Receipt"
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

      
        {/* ========================================
            SOURCE DETAILS SECTION
            Displays core identification and metadata
            ======================================== */}
        <div className="flex flex-col gap-6 ">
          <Card className="border-0 border-white">
            
            {/* --- SECTION HEADER --- */}
            <CardHeader className="pb-3">
              
            </CardHeader>
            
            <div className="px-6 space-y-3 text-sm">
              
              {/* ==================== ID HIERARCHY ==================== */}
              <div className="space-y-3">
                
                {/* PRIMARY ID - Main identifier for this item (Bin/Batch/Blank/Item) */}
                <div className="flex justify-between font-light mb-2">
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

                {/* BIN IDs - Shows source bin(s) for batches (clickable links) */}
                {data.binIds && data.binIds.length > 0 && (
                  <div className="hidden flex justify-between font-light">
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

                {/* BATCH IDs - Shows source batch(es) for blanks (clickable links) */}
                {data.batchIds && data.batchIds.length > 0 && (
                  <div className="hidden flex justify-between font-light">
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

                {/* BLANK IDs - Shows source blank(s) for items (clickable links) */}
                {data.blankIds && data.blankIds.length > 0 && (
                  <div className="hidden flex justify-between font-light">
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

              {/* ==================== SUPPLY CHAIN HISTORY ==================== */}
              
            </div>
          </Card>
        </div>

     

        <div className="flex flex-col gap-6 ">
          <Card className="border-0 border-white">
            
            {/* --- Continuing source details --- */}
            <div className="px-6 space-y-3 text-sm">
              
              {/* ORIGINS - Multi-origin display for Items (array of origin objects) */}
              {idStartsWith("I") && data.origins && data.origins.length > 0 && (
                <div className="flex justify-between font-light">
                  <span className="text-gray-600">{data.origins.length === 1 ? "Origin" : "Origins"}</span>
                  <div className="space-y-2 text-right">
                    {data.origins.map((origin: any) => (
                      <div key={origin.id} className="font-mono text-black">
                        {origin.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ORIGIN - Single organization origin for Bins */}
              {idStartsWith("B") && (
                <div className="flex justify-between font-light">
                  <span className="text-gray-600">Origin</span>
                  <span className="font-mono">{data.organization?.name || "Unknown Origin"}</span>
                </div>
              )}

              {/* ==================== PHYSICAL ATTRIBUTES ==================== */}
              
              {/* LOCATION - Physical location with map pin icon */}
              {data.location && (
                <div className="flex justify-between items-center font-light">
                  <span className="text-gray-600">Location</span>
                  <span className="font-mono flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {data.location}
                  </span>
                </div>
              )}

              {/* MATERIAL TYPE - Type of plastic/material (e.g., HDPE, PET) */}
              {data.materialType && (
                <div className="flex justify-between font-light">
                  <span className="text-gray-600">Material</span>
                  <div className="rounded-full px-2 border border-1 border-black font-mono text-black font-light">
                    {data.materialType}
                  </div>
                </div>
              )}

              {/* STATUS - Processing status for Batches only */}
              {idStartsWith("T") && data.status && (
                <div className="flex justify-between">
                  <span className="text-gray-600 font-light">Status</span>
                  {data.status}
                </div>
              )}

              {/* WEIGHT - Weight in kilograms (hidden for Bins) */}
              {data.weight && !idStartsWith("B") && (
                <div className="flex justify-between items-center font-light">
                  <span className="text-gray-600">Weight</span>
                  <span className="font-mono flex items-center">
                    <Weight className=" w-4 h-4 mr-1" />
                    {data.weight}kg
                  </span>
                </div>
              )}

              {/* ==================== DATE INFORMATION ==================== */}
              
              {/* PRIMARY DATE - Main date field (varies by item type) */}
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

              {/* NEXT COLLECTION DATE - Scheduled future collection for Bins */}
              {data.nextCollectionDate && (
                <div className="flex justify-between items-center font-light">
                  <span className="text-gray-600">Next Collection</span>
                  <span className="font-mono font-extralight flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(data.nextCollectionDate)}
                  </span>
                </div>
              )}

              {/* ==================== STATUS INFORMATION ==================== */}
              
              {/* BIN STATUS - Current bin location/state (Bins only) */}
              {idStartsWith("B") && data.binStatus && (
                <div className="flex justify-between items-center font-light">
                  <span className="text-gray-600">Status</span>
                  <Badge className="bg-gray-200 text-black font-light">
                    {getBinStatusLabel(data.binStatus)}
                  </Badge>
                </div>
              )}

              {/* PROCESSED DATE - When item was processed into inventory */}
              {data.processedDate && (
                <div className="flex justify-between items-center font-light">
                  <span className="text-gray-600">Processed</span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(data.processedDate)}
                  </span>
                </div>
              )}

              {/* ADOPTED BY - Organization/person who adopted this bin */}
              {data.adoptedBy && idStartsWith("B") && (
                <div className="flex justify-between font-light">
                  <span className="text-gray-600">Adopted By</span>
                  <span>{data.adoptedBy}</span>
                </div>
              )}

            </div>
          </Card>
        </div>

        {/* SUPPLY CHAIN HISTORY ACCORDIONS - For Items only */}
        {idStartsWith("I") && (
          <div className="pb-4 border-b border-gray-200 mt-2 flex flex-col gap-y-1 mx-6">

            {/* BLANKS HISTORY ACCORDION - Full blank details for items */}
            {data.blanks && data.blanks.length > 0 && (
              <div>
                <Accordion type="single" collapsible className="border-0">
                  <AccordionItem value="blanks-history" className="border-0">
                    <AccordionTrigger className="text-sm text-gray-600 font-light hover:no-underline py-1">
                      Blanks History ({data.blanks.length})
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pt-1 pb-0">
                      <div className="space-y-1 text-right">
                        {data.blanks.map((blank: any) => (
                          <Link
                            key={blank.id}
                            href={`/track/${blank.id}`}
                            className="block font-mono text-black hover:text-gray-600 hover:underline"
                          >
                            {blank.id}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            {/* BATCHES HISTORY ACCORDION - Full batch details for items */}
            {data.batches && data.batches.length > 0 && (
              <div>
                <Accordion type="single" collapsible className="border-0">
                  <AccordionItem value="batches-history" className="border-0">
                    <AccordionTrigger className="text-sm text-gray-600 font-light hover:no-underline py-1">
                      Batches History ({data.batches.length})
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pt-1 pb-0">
                      <div className="space-y-1 text-right">
                        {data.batches.map((batch: any) => (
                          <Link
                            key={batch.id}
                            href={`/track/${batch.id}`}
                            className="block font-mono text-black hover:text-gray-600 hover:underline"
                          >
                            {batch.id}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            {/* BINS HISTORY ACCORDION - Full bin details for items */}
            {data.bins && data.bins.length > 0 && (
              <div>
                <Accordion type="single" collapsible className="border-0">
                  <AccordionItem value="bins-history" className="border-0">
                    <AccordionTrigger className="text-sm text-gray-600 font-light hover:no-underline py-1">
                      Bins History ({data.bins.length})
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pt-1 pb-0">
                      <div className="space-y-1 text-right">
                        {data.bins.map((bin: any) => (
                          <Link
                            key={bin.id}
                            href={`/track/${bin.id}`}
                            className="block font-mono text-black hover:text-gray-600 hover:underline"
                          >
                            {bin.id}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

          </div>
        )}

        {/* SUPPLY CHAIN HISTORY ACCORDIONS - For Blanks only */}
        {idStartsWith("K") && (
          <div className="pb-4 border-b border-gray-200 mt-2 flex flex-col gap-y-1 mx-6">

            {/* BATCHES HISTORY ACCORDION - Full batch details for blanks */}
            {data.batches && data.batches.length > 0 && (
              <div>
                <Accordion type="single" collapsible className="border-0">
                  <AccordionItem value="batches-history" className="border-0">
                    <AccordionTrigger className="text-sm text-gray-600 font-light hover:no-underline py-1">
                      Batches History ({data.batches.length})
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pt-1 pb-0">
                      <div className="space-y-1 text-right">
                        {data.batches.map((batch: any) => (
                          <Link
                            key={batch.id}
                            href={`/track/${batch.id}`}
                            className="block font-mono text-black hover:text-gray-600 hover:underline"
                          >
                            {batch.id}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            {/* BINS HISTORY ACCORDION - Full bin details for blanks */}
            {data.bins && data.bins.length > 0 && (
              <div>
                <Accordion type="single" collapsible className="border-0">
                  <AccordionItem value="bins-history" className="border-0">
                    <AccordionTrigger className="text-sm text-gray-600 font-light hover:no-underline py-1">
                      Bins History ({data.bins.length})
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pt-1 pb-0">
                      <div className="space-y-1 text-right">
                        {data.bins.map((bin: any) => (
                          <Link
                            key={bin.id}
                            href={`/track/${bin.id}`}
                            className="block font-mono text-black hover:text-gray-600 hover:underline"
                          >
                            {bin.id}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

          </div>
        )}

        {/* SUPPLY CHAIN HISTORY ACCORDIONS - For Batches only */}
        {idStartsWith("T") && (
          <div className="pb-4 border-b border-gray-200 mt-2 flex flex-col gap-y-1 mx-6">

            {/* BINS HISTORY ACCORDION - Full bin details for batches */}
            {data.bins && data.bins.length > 0 && (
              <div>
                <Accordion type="single" collapsible className="border-0">
                  <AccordionItem value="bins-history" className="border-0">
                    <AccordionTrigger className="text-sm text-gray-600 font-light hover:no-underline py-1">
                      Bins History ({data.bins.length})
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pt-1 pb-0">
                      <div className="space-y-1 text-right">
                        {data.bins.map((bin: any) => (
                          <Link
                            key={bin.id}
                            href={`/track/${bin.id}`}
                            className="block font-mono text-black hover:text-gray-600 hover:underline"
                          >
                            {bin.id}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

          </div>
        )}

        <div className="mb-6 mt-8 text-sm font-light items-center justify-center flex w-full text-cnter font-jost mt-1">*********************</div>


        {/* ========================================
            ORG MESSAGE & EVENT DETAILS SECTION
            Optional messaging and event information
            ======================================== */}

        <div className="flex flex-col pt-2  px-6"> 

          {/* ORGANIZATION MESSAGE - Custom message from the source organization */}
          {data.orgMessage && (
            <div className="-mt-1 border-gray-200">
              
              {/* Message header showing organization name */}
              <div className="text-sm text-gray-600 font-light hover:no-underline py-2 italic ">
                Message from {data.organization?.name || "Unknown Origin"}:
              </div>
              
              {/* Message content - displayed in italics, centered */}
              <div className="py-4 w-full flex justify-center">
                <div className="w-2/3 text-center text-sm italic font-light text-gray-700">
                  "{data.orgMessage}"
                </div>
              </div>
            </div>
          )}

          {/* EVENT DETAILS ACCORDION - Collection event information (if bin is associated with an event) */}
          {data.event && data.event.trim() && (
            <div className="pt-6">
              <Accordion type="single" collapsible className="border-0">
                <AccordionItem value="event-details" className="border-0">
                  
                  {/* Accordion trigger */}
                  <AccordionTrigger className="text-sm text-gray-600 font-light hover:no-underline py-2">
                    Event Details
                  </AccordionTrigger>
                  
                  <AccordionContent className="px-0 pt-2 pb-0">
                    <div className="space-y-3 text-sm">
                      
                      {/* EVENT NAME - Name of the collection event */}
                      <div className="flex justify-between font-light">
                        <span className="text-gray-600">Event Name</span>
                        <span className="font-mono">{data.event}</span>
                      </div>
                      
                      {/* EVENT SCHEDULED DATE - When the event is/was scheduled */}
                      {data.eventScheduledDate && (
                        <div className="flex justify-between font-light">
                          <span className="text-gray-600">Scheduled Date</span>
                          <span className="font-mono">{formatDate(data.eventScheduledDate)}</span>
                        </div>
                      )}
                      
                      {/* EVENT DESCRIPTION - Detailed description of the event */}
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

        {/* ========================================
            PRODUCT DETAILS SECTION
            Shows for Items only - product information
            ======================================== */}

         <div className="">
        {data.type === 'item' && data.productDetails && (
          <>
            <Card className="border-0 border-white">
              
              
              <CardContent className="space-y-3 text-sm">
                
                {/* PRODUCT NAME - Name of the finished product */}
                <div className="flex justify-between font-light">
                  <span className="text-gray-600">Product Name</span>
                  <span className="font-mono">{data.productDetails.name}</span>
                </div>
                
                {/* PRODUCT TYPE - Type of product (e.g., rover_chassis, assembly_toy) */}
                <div className="flex justify-between font-light">
                  <span className="text-gray-600">Product Type</span>
                  <span className="font-mono">{data.productDetails.productType}</span>
                </div>
                
                {/* CATEGORY - Product category classification */}
                <div className="flex justify-between font-light">
                  <span className="text-gray-600">Category</span>
                  <span className="font-mono">{data.productDetails.category}</span>
                </div>
                
                {/* EDITION NUMBER - Limited edition number (if applicable) */}
                {data.editionNumber && (
                  <div className="flex justify-between font-light">
                    <span className="text-gray-600">Edition</span>
                    <span className="font-mono">#{data.editionNumber}</span>
                  </div>
                )}
                
                {/* SERIAL NUMBER - Unique serial number for this item */}
                {data.serialNumber && (
                  <div className="flex justify-between font-light">
                    <span className="text-gray-600">Serial Number</span>
                    <span className="font-mono">{data.serialNumber}</span>
                  </div>
                )}
                
                {/* DELIVERY DATE - When the item was delivered to customer */}
                {data.deliveryDate && (
                  <div className="flex justify-between items-center font-light">
                    <span className="text-gray-600">Delivered</span>
                    <span className="flex items-center font-mono">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(data.deliveryDate)}
                    </span>
                  </div>
                )}
                
                {/* PRODUCT DESCRIPTION - Detailed description of the product */}
                {data.productDetails.description && (
                  <div className="border-t border-gray-200 pt-3">
                    <span className="text-gray-600 block mb-2 font-light">
                      Description:
                    </span>
                    <div className="w-full flex mx-auto justify-center">
                    <div className="text-center my-4 w-2/3 italic text-sm font-light">{data.productDetails.description}</div>
                      </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* ========================================
                MAKER DETAILS SECTION (Hidden)
                Person who assembled the item - includes CTA if not registered
                ======================================== */}
            <Card className="hidden border border-gray-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-light flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Maker Details
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3 text-sm">
                {data.makerDetails ? (
                  // REGISTERED MAKER STATE - Shows when maker has registered
                  <>
                    {/* MAKER NAME - Name of person who assembled the item */}
                    <div className="flex justify-between font-light">
                      <span className="text-gray-600">Maker</span>
                      <span className="font-medium">
                        {data.makerDetails.name}
                      </span>
                    </div>
                    
                    {/* MAKER LOCATION - Where the maker is located */}
                    <div className="flex justify-between items-center font-light">
                      <span className="text-gray-600">Location</span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {data.makerDetails.location}
                      </span>
                    </div>
                    
                    {/* ASSEMBLY DATE - When the item was assembled by the maker */}
                    <div className="flex justify-between items-center font-light">
                      <span className="text-gray-600">Assembled</span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(data.makerDetails.assemblyDate)}
                      </span>
                    </div>
                    
                    {/* MAKER STORY - Personal story from the maker about assembling the item */}
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
                    
                    {/* COMPLETION STATUS - Visual indicator that maker journey is complete */}
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
                  // UNREGISTERED STATE - CTA to register as maker
                  <div className="text-center py-8">
                    {/* Icon placeholder */}
                    <div className="w-16 h-16 mx-auto mb-4 border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    
                    {/* CTA heading */}
                    <h3 className="text-base mb-2 font-light">
                      Complete Your Maker Journey
                    </h3>
                    
                    {/* CTA description - varies based on charity status */}
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed font-light">
                      {isCharity
                        ? `Did you assemble this item${data.destination ? ` at ${data.destination}` : ""}? Share your story and connect this donation to its educational impact.`
                        : "Did you assemble this item? Share your story and become part of the circular economy narrative."}
                    </p>
                    
                    {/* Register button */}
                    <button className="w-full bg-black text-white font-light py-3 px-6 border border-gray-300 hover:bg-gray-800 transition-colors text-sm">
                      Register as Maker
                    </button>
                    
                    {/* Email verification note */}
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
     
        {/* ========================================
            CONNECTED ITEMS SECTION
            Shows downstream items produced from this item
            ======================================== */}

        <div className="px-6">
        
        {/* PRODUCED BLANKS ACCORDION - Shows blank sheets created from this batch (for Batches) */}
        {data.producedBlanks && data.producedBlanks.length > 0 && (
          <div className="mb-6">
            <Accordion type="single" collapsible className="border-0">
              <AccordionItem value="produced-blanks" className="border-0">
                
                {/* Accordion trigger with count */}
                <AccordionTrigger className="text-sm text-gray-600 font-light hover:no-underline py-2">
                  Produced Blanks ({data.producedBlanks.length})
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
                            {/* BLANK ID - Identifier for the blank sheet */}
                            <div className="text-sm font-mono font-light">
                              {blank.id}
                            </div>
                            
                            {/* PRODUCT INFO - Type and product name */}
                            <div className="text-xs text-gray-500 font-light">
                              {blank.productType && blank.productName
                                ? `${blank.productType} • ${blank.productName}`
                                : `${blank.weight}kg`}
                            </div>
                          </div>
                          
                          {/* Item type label */}
                          <div className="text-xs text-gray-500 font-light">
                            {blank.weight}kg
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

        {/* PRODUCED ITEMS ACCORDION - Shows finished products from this batch/blank (for Batches or Blanks) */}
        {data.producedItems && data.producedItems.length > 0 && (
          <div className="mb-6">
            <Accordion type="single" collapsible className="border-0">
              <AccordionItem value="produced-items" className="border-0">
                
                {/* Accordion trigger with count */}
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
                            {/* ITEM ID - Identifier for the finished item */}
                            <div className="text-sm font-mono font-light">
                              {item.id}
                            </div>
                            
                            {/* PRODUCT INFO - Type and product name */}
                            <div className="text-xs text-gray-500 font-light">
                              {item.productType && item.productName
                                ? `${item.productType} • ${item.productName}`
                                : item.serialNumber
                                  ? `Serial: ${item.serialNumber}`
                                  : 'Finished Item'}
                            </div>
                          </div>
                          
                          {/* Serial number if available */}
                          {item.serialNumber && (
                            <div className="text-xs text-gray-500 font-light">
                              #{item.serialNumber}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {/* PRODUCED BATCHES ACCORDION - Shows batches created from this bin (for Bins) */}
        {data.producedBatches && data.producedBatches.length > 0 && (
          <div className="mb-6">
            <Accordion type="single" collapsible className="border-0">
              <AccordionItem value="produced-batches" className="border-0">
                
                {/* Accordion trigger with count */}
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
                            {/* BATCH COLLECTION DATE - When this batch was collected */}
                            <div className="text-xs text-gray-600 font-light">
                              {formatDate(batch.collectionDate)}
                            </div>
                            
                            {/* BATCH WEIGHT, MATERIAL & STATUS - Physical attributes and processing status */}
                            <div className="text-xs text-gray-600 font-light">
                              {batch.weight}kg • {batch.materialType} •{" "}
                              {getBatchStatusLabel(batch.status)}
                            </div>
                          </div>

                          {/* BATCH ID - Identifier for the batch */}
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
        
         <div className="mb-12 mt-8 text-sm font-light items-center justify-center flex w-full text-cnter font-jost mt-1">*****************</div>

        
      </div>
    </div>
  );
}
