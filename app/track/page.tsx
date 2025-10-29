"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { PopArtContainer, QRCodeElement } from "../components/PopArtElements";
import { Search, QrCode, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { LoadingSquare } from "../components/ui/loading-square";

interface SampleQRCodes {
  bins: Array<{ id: string; name: string; isActive: boolean; status: string }>;
  batches: Array<{ id: string; binIds: string[]; status: string }>;
  blanks: Array<{ id: string; batchId: string; status: string; userId?: string; productId?: string }>;
}

export default function Track() {
  const [sampleCodes, setSampleCodes] = useState<SampleQRCodes>({
    bins: [],
    batches: [],
    blanks: []
  });
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Fetch existing QR codes from the database
    const fetchExistingCodes = async () => {
      try {
        // Fetch existing bins, batches, and blanks
        const [binsRes, batchesRes, blanksRes] = await Promise.all([
          fetch('/api/items/sample?type=bins'),
          fetch('/api/items/sample?type=batches'), 
          fetch('/api/items/sample?type=blanks')
        ]);

        const bins = await binsRes.json();
        const batches = await batchesRes.json();
        const blanks = await blanksRes.json();

        setSampleCodes({
          bins: bins.success ? bins.items : [],
          batches: batches.success ? batches.items : [],
          blanks: blanks.success ? blanks.items : []
        });
      } catch (error) {
        console.error('Failed to fetch existing codes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExistingCodes();
  }, []);

  // Filter and combine codes based on selected filter
  const getFilteredCodes = () => {
    let codes: Array<{ id: string; type: string; name?: string }> = [];
    
    switch (selectedFilter) {
      case "ACTIVE BINS":
        codes = sampleCodes.bins.filter(bin => bin.isActive).map(bin => ({ id: bin.id, type: "active bin", name: bin.name }));
        break;
      case "COLLECTED BATCHES":
        codes = sampleCodes.batches.map(batch => ({ id: batch.id, type: "processing batch" }));
        break;
      case "PRESSED BLANKS":
        // Blanks that haven't been turned into products yet (no productId)
        codes = sampleCodes.blanks.filter(blank => blank.status === 'blank' && !blank.productId).map(blank => ({ id: blank.id, type: "pressed blank" }));
        break;
      case "MANUFACTURED ITEMS":
        // Blanks that have been turned into products (have productId) but not yet assigned to makers (no userId)
        codes = sampleCodes.blanks.filter(blank => blank.productId && !blank.userId).map(blank => ({ id: blank.id, type: "manufactured item" }));
        break;
      case "ASSEMBLED ITEMS":
        // Filter blanks that have been assembled by makers (same as manufactured for now)
        codes = sampleCodes.blanks.filter(blank => blank.status === 'assembled' && blank.userId && blank.productId).map(blank => ({ id: blank.id, type: "assembled item" }));
        break;
      default: // "ALL"
        codes = [
          ...sampleCodes.bins.filter(bin => bin.isActive).map(bin => ({ id: bin.id, type: "active bin", name: bin.name })),
          ...sampleCodes.batches.map(batch => ({ id: batch.id, type: `${batch.status} batch` })),
          ...sampleCodes.blanks.map(blank => ({ id: blank.id, type: `${blank.status} item` }))
        ];
    }

    // Apply search filter if search term exists
    if (searchTerm) {
      codes = codes.filter(code => 
        code.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        code.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return codes.slice(0, 9); // Limit to 9 items for grid display
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      window.location.href = `/track/${searchTerm.trim()}`;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-white py-0 pt-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl helvetica-bold mb-6 text-pop-black">
            TRACK
          </h1>
          <p className="text-xl text-pop-gray max-w-3xl mx-auto mb-6">
            Enter an item code to see that item's PopCycle journey. Track our plastic from waste bin to collected batch to pressed blank to finished product.
          </p>
        </div>
      </div>


      {/* Categories Filter */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between ">
          <div className="flex items-center">
          <div className="flex items-center gap-4">
            <span className="text-sm text-pop-gray">Filter items:</span>
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="border border-gray-200 bg-white pl-4 pr-5 py-2 text-sm systematic-caps cursor-pointer hover:bg-gray-50 transition-colors flex items-center whitespace-nowrap"
              >
                {selectedFilter}
                <ChevronDown className="ml-2 w-4 h-4 text-pop-black" />
              </button>
              
              {filterOpen && (
                <div className="absolute top-full left-0 min-w-full bg-white border border-gray-200 mt-2 overflow-hidden z-10">
                  {[
                    "ALL",
                    "ACTIVE BINS",
                    "COLLECTED BATCHES",
                    "PRESSED BLANKS",
                    "MANUFACTURED ITEMS",
                    "ASSEMBLED ITEMS",
                  ].map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedFilter(category);
                        setFilterOpen(false);
                      }}
                      className="block w-full text-left px-5 py-3 systematic-caps text-sm hover:bg-pop-green hover:text-white transition-colors whitespace-nowrap"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

            
  </div>
        
            {/* QR Code Search */}


          <div className=" flex space-x-4 mr-24">



                          <Input
                            placeholder="Enter item code (e.g. B1234567)"
                            className="flex w-3xl max-w-full h-10  text-lg text-gray-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                          />

                        <Button
                          size="lg"
                          className="bg-pop-green text-white hover:bg-pop-black hover:text-white systematic-caps h-10 px-4"
                          onClick={handleSearch}
                        >
                          Track Item
                        </Button>
                      </div>



         
          
          <div className="text-sm text-pop-gray">
            {getFilteredCodes().length} {getFilteredCodes().length === 1 ? 'item' : 'items'}
          </div>
        </div>
      </div>

      {/* QR Codes */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                <div className="col-span-full flex justify-center items-center py-16">
                  <LoadingSquare color="green" text="Loading Items..." />
                </div>
              ) : (
                getFilteredCodes().map((code, index) => {
                return (
                  <Link key={code.id} href={`/track/${code.id}`}>
                    <div className="bg-white border border-gray-200 p-8 hover:bg-gray-50 transition-colors cursor-pointer aspect-square flex flex-col justify-center items-center text-center -ml-[1px] -mt-[1px]">
                      <QRCodeElement
                        qrCode={code.id}
                        size="md"
                        className="mx-auto mb-4"
                      />
                      <div className="systematic-caps text-lg helvetica-bold">
                        {code.id}
                      </div>
                      <div className="text-xs text-pop-gray mt-1">
                        {code.type.toUpperCase()} • Click to track
                      </div>
                    </div>
                  </Link>
                );
                })
              )}
        </div>
      </div>

      {/* Footer CTA Section */}
      <section className="py-20 px-4 bg-pop-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl helvetica-bold mb-8 text-white">
            HOW DOES THIS
            <br />
            ALL WORK?
          </h2>

          <p className="text-xl mb-12 text-white leading-relaxed">
            Every unique code represents a complete transformation from waste to
            wonder.
          </p>

          <Link href="/products">
            <Button
              size="lg"
              className="bg-pop-green text-pop-black hover:bg-white hover:text-pop-black systematic-caps text-lg px-12 py-4"
            >
              LEARN MORE ABOUT THE PROCESS
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
