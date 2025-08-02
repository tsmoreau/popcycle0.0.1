'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { PopArtContainer, QRCodeElement } from "../../components/PopArtElements";
import { Building, Calendar, Weight, Leaf, Package, CheckCircle, User, MapPin, Heart, Plus, HeartHandshake } from "lucide-react";

interface MakerDetails {
  userId: string;
  name: string;
  location: string;
  assemblyDate: string;
  story: string;
  registeredAt: string;
  verifiedEmail: string;
}

interface PlasticItem {
  id: string;
  qrCode: string;
  sourceCompany: string;
  collectionDate: string;
  materialType: string;
  weight: number;
  processedDate: string;
  carbonOffset: number;
  status: string;
  productType: string;
  event?: string;
  message?: string;
  makerDetails?: MakerDetails | null;
  isSourceOnly?: boolean;
  impactMetrics: {
    carbonSaved: number;
    wasteReduced: number;
    status: string;
  };
}

export default function TrackItem() {
  const { id } = useParams();
  const [item, setItem] = useState<PlasticItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/track/${id}`);
        if (!response.ok) {
          throw new Error('Item not found');
        }
        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch item');
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
        <div className="text-center">
          <div className="w-16 h-16 bg-pop-green border-2 border-pop-black mx-auto mb-4 animate-pulse"></div>
          <p className="systematic-caps">Loading item data...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PopArtContainer color="red" shadow>
          <Card className="border-4 border-pop-black">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl helvetica-bold mb-4">Item Not Found</h2>
              <p className="text-pop-gray mb-6">QR code "{id}" is not in our system.</p>
              <p className="text-sm text-pop-gray">Try one of our sample codes: ABC123, DEF456, GHI789, JKL012, MNO345, PQR678</p>
            </CardContent>
          </Card>
        </PopArtContainer>
      </div>
    );
  }

  // Derived logic from streamlined schema
  const isSourceOnly = !item.productType;
  const isProcessed = !!item.processedDate;
  const isCharity = !!item.donatingEntity;
  const isComplete = !!item.deliveredDate;
  const hasMaker = !!item.makerDetails;

  // Impact metrics calculation
  const impactMetrics = item.carbonOffset ? {
    carbonSaved: item.carbonOffset,
    wasteReduced: item.weight
  } : null;

  const getProductTypeLabel = (type: string) => {
    switch (type) {
      case 'rover_chassis': return 'Rover Chassis';
      case 'assembly_toy': return 'Assembly Toy';
      case 'educational_kit': return 'Educational Kit';
      case 'dinnerware': return 'Dinnerware';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl helvetica-bold mb-6 tracking-tight">
            <span className="text-pop-green">QR</span> {item.id}
          </h1>
          <p className="text-lg text-pop-gray">
            {isSourceOnly 
              ? (isProcessed 
                  ? `Processed plastic from ${item.originPoint}` 
                  : `Fresh plastic collection from ${item.originPoint}`)
              : `Complete transformation journey from ${item.originPoint}`
            }
          </p>
        </div>

        {/* QR Code Display */}
        <div className="flex justify-center mb-12">
          <PopArtContainer color="green" shadow>
            <div className="p-8 bg-white border-4 border-pop-black">
              <QRCodeElement qrCode={item.id} size="lg" />
            </div>
          </PopArtContainer>
        </div>

        {/* Status Timeline */}
        {!isSourceOnly && (
          <div className="mb-12">
            <div className="flex gap-2 justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 border-2 border-pop-black flex items-center justify-center bg-pop-green">
                  <CheckCircle className="w-8 h-8 text-pop-black" />
                </div>
                <h3 className="systematic-caps text-sm mb-1">Collected</h3>
                <p className="text-xs text-pop-gray">{item.collectionDate}</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 border-2 border-pop-black flex items-center justify-center bg-pop-blue">
                  <CheckCircle className="w-8 h-8 text-pop-black" />
                </div>
                <h3 className="systematic-caps text-sm mb-1">Processed</h3>
                <p className="text-xs text-pop-gray">{item.processedDate}</p>
              </div>
              
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 border-2 border-pop-black flex items-center justify-center ${isCharity ? 'bg-pop-red' : 'bg-pop-black'}`}>
                  {isCharity ? (
                    <HeartHandshake className="w-8 h-8 text-pop-black" />
                  ) : (
                    <CheckCircle className="w-8 h-8 text-white" />
                  )}
                </div>
                <h3 className="systematic-caps text-sm mb-1">{isCharity ? 'Donated' : 'Purchased'}</h3>
                <p className="text-xs text-pop-gray">{item.transactionDate}</p>
              </div>
              
              {hasMaker && (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 border-2 border-pop-black flex items-center justify-center bg-pop-red">
                    <CheckCircle className="w-8 h-8 text-pop-black" />
                  </div>
                  <h3 className="systematic-caps text-sm mb-1">Assembled</h3>
                  <p className="text-xs text-pop-gray">{item.makerDetails.assemblyDate}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Source-Only Status */}
        {isSourceOnly && (
          <div className="mb-12">
            <div className="flex gap-2 justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 border-2 border-pop-black flex items-center justify-center bg-pop-green">
                  <CheckCircle className="w-8 h-8 text-pop-black" />
                </div>
                <h3 className="systematic-caps text-sm mb-1">Collected</h3>
                <p className="text-xs text-pop-gray">{item.collectionDate}</p>
              </div>
              
              {isProcessed && (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 border-2 border-pop-black flex items-center justify-center bg-pop-blue">
                    <CheckCircle className="w-8 h-8 text-pop-black" />
                  </div>
                  <h3 className="systematic-caps text-sm mb-1">Processed</h3>
                  <p className="text-xs text-pop-gray">{item.processedDate}</p>
                </div>
              )}
            </div>
            
            {!isProcessed && (
              <div className="text-center mt-4">
                <p className="text-xs text-pop-red systematic-caps">Ready for Processing</p>
              </div>
            )}
            
            {isProcessed && (
              <div className="text-center mt-4">
                <p className="text-xs text-pop-blue systematic-caps">Ready for Manufacturing</p>
              </div>
            )}
          </div>
        )}

        {/* Item Details */}
        <div className="flex flex-col gap-8 mb-12 max-w-2xl mx-auto">
          {/* Source Details Card */}
          <PopArtContainer color="green" shadow>
            <Card className="border-4 border-pop-black">
              <CardHeader>
                <CardTitle className="systematic-caps flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Source Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="systematic-caps text-sm">ID</span>
                  <span>{item.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="systematic-caps text-sm">Origin</span>
                  <span>{item.originPoint}</span>
                </div>
                <div className="flex justify-between">
                  <span className="systematic-caps text-sm">Material</span>
                  <Badge className="bg-pop-green text-pop-black">{item.materialType}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="systematic-caps text-sm">Weight</span>
                  <span className="flex items-center">
                    <Weight className="w-4 h-4 mr-1" />
                    {item.weight}kg
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="systematic-caps text-sm">Collected</span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {item.collectionDate}
                  </span>
                </div>
                {item.processedDate && (
                  <div className="flex justify-between items-center">
                    <span className="systematic-caps text-sm">Processed</span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.processedDate}
                    </span>
                  </div>
                )}
                {item.event && (
                  <div className="flex justify-between">
                    <span className="systematic-caps text-sm">Event</span>
                    <span>{item.event}</span>
                  </div>
                )}
                {item.message && (
                  <div className="border-t border-pop-gray pt-4">
                    <span className="systematic-caps text-sm text-pop-gray block mb-2">Message</span>
                    <p className="text-sm italic">{item.message}</p>
                  </div>
                )}
                {isSourceOnly && (
                  <div className={`border-t pt-4 text-center ${isProcessed ? 'border-pop-blue' : 'border-pop-red'}`}>
                    <div className={`flex items-center justify-center text-sm ${isProcessed ? 'text-pop-blue' : 'text-pop-red'}`}>
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="systematic-caps">
                        {isProcessed ? 'Ready for Manufacturing' : 'Awaiting Processing'}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </PopArtContainer>

          {/* Product Details Card */}
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
                      <span className="systematic-caps text-sm">Product Type</span>
                      <span>{getProductTypeLabel(item.productType)}</span>
                    </div>

                    {!isCharity && (
                      <div className="flex justify-between items-center">
                        <span className="systematic-caps text-sm">Purchased</span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {item.transactionDate}
                        </span>
                      </div>
                    )}

                    {isCharity && item.donatingEntity && (
                      <div className="flex justify-between">
                        <span className="systematic-caps text-sm">Donor</span>
                        <span>{item.donatingEntity}</span>
                      </div>
                    )}
                    
                    {isCharity && (
                      <div className="flex justify-between items-center">
                        <span className="systematic-caps text-sm">Donated</span>
                        <span>{item.destination}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className="systematic-caps text-sm">Delivered</span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {item.deliveredDate}
                      </span>
                    </div>
                    
                    {item.event && (
                      <div className="flex justify-between">
                        <span className="systematic-caps text-sm">Event</span>
                        <span>{item.event}</span>
                      </div>
                    )}
                    
                    {isCharity && item.message && (
                      <div className="border-t border-pop-gray pt-4">
                        <span className="systematic-caps text-sm text-pop-gray block mb-2">Message</span>
                        <p className="text-sm italic">{item.message}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </PopArtContainer>

              {/* Maker Details Card */}
              <PopArtContainer color="red" shadow>
                  <Card className="border-4 border-pop-black">
                  <CardHeader>
                    <CardTitle className="systematic-caps flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Maker Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {item.makerDetails ? (
                      // Registered State - Show completed maker details
                      <>
                        <div className="flex justify-between">
                          <span className="systematic-caps text-sm">Maker</span>
                          <span className="font-semibold">{item.makerDetails.name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="systematic-caps text-sm">Location</span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {item.makerDetails.location}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="systematic-caps text-sm">Assembled</span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {item.makerDetails.assemblyDate}
                          </span>
                        </div>
                        {item.makerDetails.story && (
                          <div className="border-t border-pop-gray pt-4">
                            <span className="systematic-caps text-sm text-pop-gray block mb-2">Maker Story</span>
                            <p className="text-sm italic leading-relaxed">{item.makerDetails.story}</p>
                          </div>
                        )}
                        <div className="border-t border-pop-gray pt-4 flex items-center justify-center">
                          <div className="flex items-center text-pop-red text-sm">
                            <Heart className="w-4 h-4 mr-1 fill-current" />
                            <span className="systematic-caps">Maker Journey Complete</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      // Unregistered State - Show CTA
                      <div className="text-center py-8">
                        <div className="w-16 h-16 mx-auto mb-4 border-2 border-dashed border-pop-gray rounded-full flex items-center justify-center">
                          <Plus className="w-8 h-8 text-pop-gray" />
                        </div>
                        <h3 className="text-lg helvetica-bold mb-2">Complete Your Maker Journey</h3>
                        <p className="text-sm text-pop-gray mb-6 leading-relaxed">
                          {isCharity 
                            ? `Did you assemble this item${item.destination ? ` at ${item.destination}` : ''}? Share your story and connect this donation to its educational impact.`
                            : 'Did you assemble this item? Share your story and become part of the circular economy narrative.'
                          }
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
                      {impactMetrics.carbonSaved}kg
                    </div>
                    <div className="systematic-caps text-sm text-pop-gray">CO₂ Offset Generated</div>
                    <p className="text-xs text-pop-gray mt-2">
                      Equivalent to removing a car from the road for 2.3 days
                    </p>
                  </div>
                  <div>
                    <div className="text-4xl helvetica-bold text-pop-red mb-2">
                      {impactMetrics.wasteReduced}kg
                    </div>
                    <div className="systematic-caps text-sm text-pop-gray">Plastic Waste Diverted</div>
                    <p className="text-xs text-pop-gray mt-2">
                      Prevented from entering landfills or ocean systems
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </PopArtContainer>
        )}

        {/* Source-Only Call to Action */}
        {isSourceOnly && (
          <PopArtContainer color={isProcessed ? "blue" : "red"} shadow>
            <Card className="border-4 border-pop-black">
              <CardHeader>
                <CardTitle className="systematic-caps flex items-center justify-center text-2xl">
                  <Building className="w-6 h-6 mr-2" />
                  {isProcessed ? 'Processing Complete' : 'Collection Complete'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-8">
                <div className={`text-4xl helvetica-bold mb-4 ${isProcessed ? 'text-pop-blue' : 'text-pop-red'}`}>
                  {item.weight}kg
                </div>
                <div className="systematic-caps text-sm text-pop-gray mb-6">
                  {isProcessed ? 'Plastic Processed' : 'Plastic Collected'}
                </div>
                <p className="text-lg text-pop-gray mb-2">
                  {isProcessed 
                    ? 'This plastic has been processed and is ready for manufacturing into new products.'
                    : 'This plastic is ready for processing into new products.'
                  }
                </p>
                <p className="text-sm text-pop-gray">
                  Check back soon to see its transformation journey!
                </p>
              </CardContent>
            </Card>
          </PopArtContainer>
        )}
      </div>
    </div>
  );
}