"use client";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { QRCodeElement } from "../components/PopArtElements";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { LoadingSquare } from "../components/ui/loading-square";
import { useOperationsData } from "../../hooks/useOperationsData";

export default function Track() {
  const { bins, batches, blanks, items, loadingBins, loadingBatches, loadingBlanks, loadingItems } = useOperationsData();
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  
  const loading = loadingBins || loadingBatches || loadingBlanks || loadingItems;

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

  // Filter and combine codes based on selected filter
  const getFilteredCodes = () => {
    let codes: Array<{ id: string; type: string; name?: string }> = [];
    
    switch (selectedFilter) {
      case "ACTIVE BINS":
        codes = bins.filter(bin => bin.isActive).map(bin => ({ id: bin._id, type: "active bin", name: bin.name }));
        break;
      case "COLLECTED BATCHES":
        codes = batches.map(batch => ({ id: batch._id, type: "collected batch" }));
        break;
      case "PRESSED BLANKS":
        codes = blanks.filter(blank => blank.status === 'blank').map(blank => ({ id: blank._id, type: "pressed blank" }));
        break;
      case "MANUFACTURED ITEMS":
        codes = items.map(item => ({ id: item._id, type: "manufactured item" }));
        break;
      default: // "ALL"
        codes = [
          ...bins.filter(bin => bin.isActive).map(bin => ({ id: bin._id, type: "active bin", name: bin.name })),
          ...batches.map(batch => ({ id: batch._id, type: "collected batch" })),
          ...blanks.filter(blank => blank.status === 'blank').map(blank => ({ id: blank._id, type: "pressed blank" })),
          ...items.map(item => ({ id: item._id, type: "manufactured item" }))
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
