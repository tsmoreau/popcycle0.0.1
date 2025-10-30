"use client";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { QRCodeElement } from "../components/PopArtElements";
import { ChevronDown } from "lucide-react";
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
    <div className="min-h-screen bg-white font-jost">
      {/* Hero Section */}
      <section className="relative py-40 lg:py-48 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl mb-8 tracking-tight leading-tight text-black font-light">
            Track
          </h1>
          <p className="text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed text-black/90 font-light mb-12">
            Enter an item code to see its complete journey from waste collection to finished product.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto flex gap-4">
            <Input
              placeholder="Enter item code (e.g. B1234567)"
              className="flex-1 h-14 text-base bg-white border-gray-300 font-light"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              data-testid="input-search"
            />
            <Button
              className="bg-black text-white hover:bg-gray-800 font-light px-8 h-14"
              onClick={handleSearch}
              data-testid="button-search"
            >
              Track Item
            </Button>
          </div>
        </div>
      </section>

      {/* Filter and Grid Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-12 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-500 font-light">Filter by type</span>
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="border border-gray-300 bg-white px-6 py-2 text-sm font-light cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-2"
                data-testid="button-filter"
              >
                {selectedFilter}
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              
              {filterOpen && (
                <div className="absolute top-full left-0 min-w-full bg-white border border-gray-300 mt-1 z-10 shadow-sm">
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
                      className="block w-full text-left px-6 py-3 text-sm font-light hover:bg-gray-50 transition-colors"
                      data-testid={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="text-sm text-gray-500 font-light">
            {getFilteredCodes().length} {getFilteredCodes().length === 1 ? 'item' : 'items'}
          </div>
        </div>

        {/* QR Codes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-20 bg-white">
              <LoadingSquare color="green" text="Loading Items..." />
            </div>
          ) : (
            getFilteredCodes().map((code) => (
              <Link key={code.id} href={`/track/${code.id}`}>
                <div className="bg-white p-12 hover:bg-gray-50 transition-colors cursor-pointer aspect-square flex flex-col justify-center items-center text-center">
                  <QRCodeElement
                    qrCode={code.id}
                    size="md"
                    className="mx-auto mb-6"
                  />
                  <div className="text-base font-light text-black mb-1">
                    {code.id}
                  </div>
                  <div className="text-xs text-gray-500 font-light">
                    {code.type}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
