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
  Image,
  RefreshCw,
  ReceiptText,
  Download,
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

  // Impact metrics calculation (kept for potential future use)
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

  return (
    <div className="flex flex-col justify-start items-center gap-y-2">
      
    <div className="relative mt-6 items-top content-start scale-[0.9] md:scale-[0.8] lg:scale-[0.80] origin-top md:max-w-[55vw] lg:max-w-[35vw] max-w-[95vw]  py-4 flex mx-auto justify-center font-helvetica bg-white drop-shadow-2xl px-4 h-min">
      <div className="w-full mx-auto bg-white border border-black p-2">
        
        {/* ========== MATERIAL FACTS HEADER ========== */}
        <div className="w-full flex justify-center mx-auto border-b-[8px] border-black px-2 pb-1">
          
          <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-none">Material Facts</h1>
        </div>

        {/* ========== SERVING SIZE EQUIVALENT (Item Type) ========== */}
        <div className="px-2 py-1.5 text-xs leading-tight">
          <div>Objects for tracking</div>
          <div className="font-black text-base">
            Object Type:{" "}
            <span className="font-black">
              {data.id.startsWith("B")
                ? "Bin"
                : data.id.startsWith("T")
                  ? "Batch"
                  : data.id.startsWith("K")
                    ? "Blank"
                    : data.id.startsWith("I")
                      ? "Manufactured Item"
                      : "Unknown"}
            </span>
          </div>
        </div>

        {/* ========== THICK BLACK BAR ========== */}
        <div className="bg-black h-[10px]"></div>

        {/* ========== PRIMARY DETAILS (Calories Equivalent) ========== */}
        <div className="px-2 py-1 border-b-[1px] border-black">
          <div className="text-[10px] font-bold">Material identification</div>
        </div>

        {/* ========== MAIN ID (Big Calorie-style) ========== */}
        <div className="px-2 py-1 flex justify-between items-end border-b-[6px] border-black">
          <div className="font-black text-2xl">
            {idStartsWith("B")
              ? "Bin ID"
              : idStartsWith("T")
                ? "Batch ID"
                : idStartsWith("K")
                  ? "Blank ID"
                  : idStartsWith("I")
                    ? "Item ID"
                    : "Main ID"}
          </div>
          <div className="font-black text-3xl lg:text-5xl leading-none">{data.id}</div>
        </div>

        {/* ========== MEDIUM DIVIDER BAR ========== */}
        <div className="bg-black h-[4px]"></div>

        {/* ========================================
            NUTRIENT-STYLE DETAILS SECTION
            Displays core metadata
            ======================================== */}
        <div className="px-2 py-1 text-sm">
          
          {/* ORIGINS - Multi-origin display for Items/Batches/Blanks */}
          {data.origins && data.origins.length > 0 && (
            <div className="flex justify-between border-b border-black py-0.5">
              <span className="font-bold">{data.origins.length === 1 ? "Origin" : "Origins"}</span>
              <div className="flex flex-wrap gap-x-1 justify-end max-w-[60%]">
                {data.origins.map((origin: any, idx: number) => (
                  <span key={origin.id} className="font-bold">
                    {origin.name}{idx < data.origins.length - 1 ? "," : ""}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* EVENTS - Multi-event display */}
          {data.events && data.events.length > 0 && (
            <div className="flex justify-between border-b border-black py-0.5">
              <span className="font-bold">Event</span>
              <span className="font-bold">{data.events.map((e: any) => e.name).join(", ")}</span>
            </div>
          )}

          {/* ORIGIN - Single organization origin for Bins */}
          {idStartsWith("B") && (
            <div className="flex justify-between border-b border-black py-0.5">
              <span className="font-bold">Origin</span>
              <span className="font-bold">{data.organization?.name || "Unknown Origin"}</span>
            </div>
          )}

          {/* EVENT - Single event display for Bins */}
          {idStartsWith("B") && data.event && (
            <div className="flex justify-between border-b border-black py-0.5">
              <span className="font-bold">Event</span>
              <span className="font-bold">{data.event}</span>
            </div>
          )}

          {/* LOCATION */}
          {data.location && (
            <div className="flex justify-between border-b border-black py-0.5">
              <span className="font-bold">Location</span>
              <span className="font-bold">{data.location}</span>
            </div>
          )}

          {/* MATERIAL TYPE */}
          {data.materialType && (
            <div className="flex justify-between border-b border-black py-0.5">
              <span className="font-bold">Material Type</span>
              <span className="font-bold">{data.materialType}</span>
            </div>
          )}

          {/* STATUS - For Batches */}
          {idStartsWith("T") && data.status && (
            <div className="flex justify-between border-b border-black py-0.5">
              <span className="font-bold">Processing Status</span>
              <span>{getBatchStatusLabel(data.status)}</span>
            </div>
          )}

          {/* WEIGHT */}
          {data.weight && !idStartsWith("B") && (
            <div className="flex justify-between border-b border-black py-0.5">
              <span className="font-bold">Weight</span>
              <span className="font-bold">{data.weight}kg</span>
            </div>
          )}

          {/* PRIMARY DATE */}
          {getDateField() && (
            <div className="flex justify-between border-black py-0.5">
              <span className="font-bold">
                {idStartsWith("B") 
                  ? "Last Collected" 
                  : idStartsWith("T")
                    ? "Batched"
                    : idStartsWith("K")
                      ? "Pressed"
                      : idStartsWith("I")
                        ? "Manufactured"
                        : "Date"}
              </span>
              <span className="font-bold">{formatDate(getDateField())}</span>
            </div>
          )}

          {/* NEXT COLLECTION DATE */}
          {data.nextCollectionDate && (
            <div className="flex justify-between border-t border-black py-0.5">
              <span className="font-bold">Next Collection</span>
              <span className="font-bold">{formatDate(data.nextCollectionDate)}</span>
            </div>
          )}

          {/* BIN STATUS */}
          {idStartsWith("B") && data.binStatus && (
            <div className="flex justify-between border-b border-black py-0.5">
              <span className="font-bold">Status</span>
              <span>{getBinStatusLabel(data.binStatus)}</span>
            </div>
          )}

          {/* PROCESSED DATE */}
          {data.processedDate && (
            <div className="flex justify-between border-b border-black py-0.5">
              <span className="font-bold">Processed</span>
              <span>{formatDate(data.processedDate)}</span>
            </div>
          )}

          {/* ADOPTED BY */}
          {data.adoptedBy && idStartsWith("B") && (
            <div className="flex justify-between border-b border-black py-0.5">
              <span className="font-bold">Adopted By</span>
              <span>{data.adoptedBy}</span>
            </div>
          )}

        </div>

        {/* ========== MEDIUM DIVIDER BAR ========== */}
        <div className="bg-black h-[6px]"></div>

        {/* SUPPLY CHAIN HISTORY ACCORDIONS - For Items only */}
        {idStartsWith("I") && (
          <div className="px-2 py-1 text-sm border-b-[6px] border-black">

            {/* BLANKS HISTORY ACCORDION */}
            {data.blanks && data.blanks.length > 0 && (
              <div className="border-b border-black py-0.5">
                <Accordion type="single" collapsible className="border-0">
                  <AccordionItem value="blanks-history" className="border-0">
                    <AccordionTrigger className="text-sm font-bold hover:no-underline py-0 h-5">
                      Source Blanks ({data.blanks.length})
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pt-1 pb-1">
                      <div className="space-y-0.5 pl-3">
                        {data.blanks.map((blank: any) => (
                          <Link
                            key={blank.id}
                            href={`/track/${blank.id}`}
                            className="block text-sm hover:underline"
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

            {/* BATCHES HISTORY ACCORDION */}
            {data.batches && data.batches.length > 0 && (
              <div className="border-b border-black py-0.5">
                <Accordion type="single" collapsible className="border-0">
                  <AccordionItem value="batches-history" className="border-0">
                    <AccordionTrigger className="text-sm font-bold hover:no-underline py-0 h-5">
                      Source Batches ({data.batches.length})
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pt-1 pb-1">
                      <div className="space-y-0.5 pl-3">
                        {data.batches.map((batch: any) => (
                          <Link
                            key={batch.id}
                            href={`/track/${batch.id}`}
                            className="block text-sm hover:underline"
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

            {/* BINS HISTORY ACCORDION */}
            {data.bins && data.bins.length > 0 && (
              <div className=" border-black py-0.5">
                <Accordion type="single" collapsible className="border-0">
                  <AccordionItem value="bins-history" className="border-0">
                    <AccordionTrigger className="text-sm font-bold hover:no-underline py-0 h-5">
                      Source Bins ({data.bins.length})
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pt-1 pb-1">
                      <div className="space-y-0.5 pl-3">
                        {data.bins.map((bin: any) => (
                          <Link
                            key={bin.id}
                            href={`/track/${bin.id}`}
                            className="block text-sm hover:underline"
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
          <div className="px-2 py-1 text-sm border-b-[6px] border-black">

            {/* BATCHES HISTORY ACCORDION */}
            {data.batches && data.batches.length > 0 && (
              <div className="border-b border-black py-0.5">
                <Accordion type="single" collapsible className="border-0">
                  <AccordionItem value="batches-history" className="border-0">
                    <AccordionTrigger className="text-sm font-bold hover:no-underline py-0 h-5">
                      Source Batches ({data.batches.length})
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pt-1 pb-1">
                      <div className="space-y-0.5 pl-3">
                        {data.batches.map((batch: any) => (
                          <Link
                            key={batch.id}
                            href={`/track/${batch.id}`}
                            className="block text-sm hover:underline"
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

            {/* BINS HISTORY ACCORDION */}
            {data.bins && data.bins.length > 0 && (
              <div className=" border-black py-0.5">
                <Accordion type="single" collapsible className="border-0">
                  <AccordionItem value="bins-history" className="border-0">
                    <AccordionTrigger className="text-sm font-bold hover:no-underline py-0 h-5">
                      Source Bins ({data.bins.length})
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pt-1 pb-1">
                      <div className="space-y-0.5 pl-3">
                        {data.bins.map((bin: any) => (
                          <Link
                            key={bin.id}
                            href={`/track/${bin.id}`}
                            className="block text-sm hover:underline"
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
          <div className="px-2 py-1 text-sm border-b-[6px] border-black">

            {/* BINS HISTORY ACCORDION */}
            {data.bins && data.bins.length > 0 && (
              <div className=" border-black py-0.5">
                <Accordion type="single" collapsible className="border-0">
                  <AccordionItem value="bins-history" className="border-0">
                    <AccordionTrigger className="text-sm font-bold hover:no-underline py-0 h-5">
                      Source Bins ({data.bins.length})
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pt-1 pb-1">
                      <div className="space-y-0.5 pl-3">
                        {data.bins.map((bin: any) => (
                          <Link
                            key={bin.id}
                            href={`/track/${bin.id}`}
                            className="block text-sm hover:underline"
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

        {/* EVENT DETAILS ACCORDIONS FOR BATCHES/BLANKS/ITEMS */}
        {!idStartsWith("B") && data.events && data.events.length > 0 && (
          <div className=" px-2 pt-1 text-sm  border-black">
            {data.events.map((event: any) => (
              <div key={event.eventId} className=" border-black py-0.5">
                <Accordion type="single" collapsible className="border-0">
                  <AccordionItem value={`event-${event.eventId}`} className="border-0">
                    <AccordionTrigger className="text-sm font-bold hover:no-underline py-0">
                      Event Details
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pt-1 pb-1">
                      
                      <div className="space-y-0.5 pl-3 text-sm">
                        <div className="font-bold"> {event.name}</div>
                        {event.scheduledDate && (
                          <div>Scheduled: {formatDate(event.scheduledDate)}</div>
                        )}
                        {event.description && (
                          <div className="italic text-[10px] mt-1">{event.description}</div>
                        )}
                      </div>

                      

                      
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        )}

        {/* ========== ORG MESSAGE SECTION ========== */}
        {data.orgMessage && (
          <div className="px-2 py-2 text-sm border-b-[6px] border-black">
            <div className="font-bold mb-1">Message from {data.organization?.name || "Unknown Origin"}:</div>
            <div className="w-full flex justify-center">
            <div className="w-2/3 text-center italic text-sm leading-0.5 py-6">"{data.orgMessage}"</div>
             </div>
          </div>
        )}

        {/* EVENT DETAILS ACCORDION FOR BINS */}
        {idStartsWith("B") && data.event && data.event.trim() && (
          <div className="px-2 py-1 text-sm border-b-[6px] border-black">
            <div className=" border-black py-0.5">
              <Accordion type="single" collapsible className="border-0">
                <AccordionItem value="event-details" className="border-0">
                  <AccordionTrigger className="text-sm font-bold hover:no-underline py-0 h-5">
                    Event Details
                  </AccordionTrigger>
                  <AccordionContent className="px-0 pt-1 pb-1">
                    <div className="space-y-0.5 pl-3 text-sm">
                      <div className="font-bold">{data.event}</div>
                      {data.eventScheduledDate && (
                        <div>Scheduled: {formatDate(data.eventScheduledDate)}</div>
                      )}
                      {data.eventDescription && (
                        <div className="italic text-[10px] mt-1">{data.eventDescription}</div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        )}

        {/* ========== PRODUCT DETAILS SECTION ========== */}
        {data.type === 'item' && data.productDetails && (
          <div  id="test3" className="px-2 py-1 text-sm ">
            
            <div className="flex justify-between border-b border-black py-0.5">
              <span className="font-bold">Product Name</span>
              <span className="font-bold">{data.productDetails.name}</span>
            </div>
            
            <div className="flex justify-between border-b border-black py-0.5">
              <span className="font-bold">Product Type</span>
              <span>{data.productDetails.productType}</span>
            </div>
            
            <div className="flex justify-between border-b border-black py-0.5">
              <span className="font-bold">Category</span>
              <span>{data.productDetails.category}</span>
            </div>
            
            {data.editionNumber && (
              <div className="flex justify-between border-b border-black py-0.5">
                <span className="font-bold">Edition</span>
                <span>#{data.editionNumber}</span>
              </div>
            )}
            
            {data.serialNumber && (
              <div className="flex justify-between border-b border-black py-0.5">
                <span className="font-bold">Serial Number</span>
                <span className="font-bold">{data.serialNumber}</span>
              </div>
            )}
            
            {data.deliveryDate && (
              <div className="flex justify-between border-b border-black py-0.5">
                <span className="font-bold">Delivered</span>
                <span>{formatDate(data.deliveryDate)}</span>
              </div>
            )}
            
            {data.productDetails.description && (
              <div className="py-0.5 border-black">
                <div className="font-bold mb-0.5">Description:</div>
                <div className="flex w-full mx-auto justify-center">
                <div className=" w-2/3 text-center italic text-[10px]">{data.productDetails.description}</div>
              </div>
                </div>
            )}
          </div>
        )}
     
        {/* ========== CONNECTED ITEMS SECTION ========== */}
        <div id="test3" className="px-2 py-1 text-sm border-b-[6px] border-black">
        
        {/* PRODUCED BLANKS ACCORDION */}
        {data.producedBlanks && data.producedBlanks.length > 0 && (
          <div className=" border-black py-0.5">
            <Accordion type="single" collapsible className="border-0">
              <AccordionItem value="produced-blanks" className="border-0">
                <AccordionTrigger className="text-sm font-bold hover:no-underline py-0 h-5">
                  Produced Blanks ({data.producedBlanks.length})
                </AccordionTrigger>
                <AccordionContent className="px-0 pt-1 pb-1">
                  <div className="space-y-1 pl-3">
                    {data.producedBlanks.map((blank: any, index: number) => (
                      <Link
                        key={blank.id}
                        href={`/track/${blank.id}`}
                        className="block text-sm hover:underline"
                      >
                        <div className="flex justify-between">
                          <span>{blank.id}</span>
                          <span className="text-[10px]">{blank.weight}kg</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {/* PRODUCED ITEMS ACCORDION */}
        {data.producedItems && data.producedItems.length > 0 && (
          <div className=" border-black py-0.5">
            <Accordion type="single" collapsible className="border-0">
              <AccordionItem value="produced-items" className="border-0">
                <AccordionTrigger className="text-sm font-bold hover:no-underline py-0 h-5">
                  Finished Products ({data.producedItems.length})
                </AccordionTrigger>
                <AccordionContent className="px-0 pt-1 pb-1">
                  <div className="space-y-1 pl-3">
                    {data.producedItems.map((item: any, index: number) => (
                      <Link
                        key={item.id}
                        href={`/track/${item.id}`}
                        className="block text-sm hover:underline"
                      >
                        <div className="flex justify-between">
                          <span>{item.id}</span>
                          {item.serialNumber && (
                            <span className="text-[10px]">#{item.serialNumber}</span>
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

        {/* PRODUCED BATCHES ACCORDION */}
        {data.producedBatches && data.producedBatches.length > 0 && (
          <div className=" border-black py-0.5">
            <Accordion type="single" collapsible className="border-0">
              <AccordionItem value="produced-batches" className="border-0">
                <AccordionTrigger className="text-sm font-bold hover:no-underline py-0 h-5">
                  Produced Batches ({data.producedBatches.length})
                </AccordionTrigger>
                <AccordionContent className="px-0 pt-1 pb-1">
                  <div className="space-y-1 pl-3">
                    {data.producedBatches.map((batch: any, index: number) => (
                      <Link
                        key={batch.id}
                        href={`/track/${batch.id}`}
                        className="block text-sm hover:underline"
                      >
                        <div className="flex justify-between">
                          <span className="text-[10px]">{formatDate(batch.collectionDate)}</span>
                          <span>{batch.id}</span>
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

        {/* ========== FOOTER DISCLAIMER ========== */}
        <div className="px-2 py-2 text-[8px] leading-tight">
          <span className="font-bold">Material Facts</span> provides complete transparency about the circular journey of recycled materials. The information displayed represents verified data from our tracking system. For questions about this item or our recycling process, visit popcycle.io/faq or contact us at support@popcycle.io.
        </div>
        
      </div>
      <div className="absolute -bottom-24 lg:-bottom-16 flex gap-x-2 w-min px-4 py-2 text-gray-400 rounded-full bg-gray-100">
         <Download/>
        <ReceiptText/>

         <Image/>



      </div>
    </div>
        
     
      
      
      </div>
  );
}
