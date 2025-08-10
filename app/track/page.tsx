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
import { Search, QrCode, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface SampleQRCodes {
  bins: Array<{ id: string; name: string }>;
  batches: Array<{ id: string; binId: string }>;
  blanks: Array<{ id: string; batchId: string }>;
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
      case "BINS":
        codes = sampleCodes.bins.map(bin => ({ id: bin.id, type: "bin", name: bin.name }));
        break;
      case "BATCHES":
        codes = sampleCodes.batches.map(batch => ({ id: batch.id, type: "batch" }));
        break;
      case "BLANKS":
        codes = sampleCodes.blanks.map(blank => ({ id: blank.id, type: "blank" }));
        break;
      default: // "ALL"
        codes = [
          ...sampleCodes.bins.map(bin => ({ id: bin.id, type: "bin", name: bin.name })),
          ...sampleCodes.batches.map(batch => ({ id: batch.id, type: "batch" })),
          ...sampleCodes.blanks.map(blank => ({ id: blank.id, type: "blank" }))
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
            TRACK OUR PLASTIC
          </h1>
          <p className="text-xl text-pop-gray max-w-3xl mx-auto mb-6">
            Enter an item code to see the complete journey from corporate waste
            to educational wonder.
          </p>
        </div>
      </div>

      <div className="pb-24 pt-0">
        <div className=" mx-auto px-6 sm:px-8">
          {/* QR Code Search */}
          <div className="mb-16 mx-auto  max-w-4xl">
            <PopArtContainer color="green" shadow>
              <Card className="border-4 border-pop-black">
                <CardContent className="p-8">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Enter item code (e.g. B1234567)"
                        className="border-2 border-pop-black text-lg h-12"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      />
                    </div>
                    <Button
                      size="lg"
                      className="bg-pop-green text-pop-black hover:bg-pop-black hover:text-white systematic-caps h-12 px-8"
                      onClick={handleSearch}
                    >
                      <Search className="w-5 h-5 mr-2" />
                      Track Item
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </PopArtContainer>
          </div>

          {/* Categories Filter */}
          <div className="mb-16 max-w-full">
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                "ALL",
                "BINS",
                "BATCHES", 
                "BLANKS",
              ].map((category) => (
                <button
                  key={category}
                  className={`px-6 py-3 border-2 border-pop-black transition-colors systematic-caps ${
                    selectedFilter === category
                      ? "bg-pop-black text-white"
                      : "bg-white hover:bg-pop-black hover:text-white"
                  }`}
                  onClick={() => setSelectedFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* QR Codes */}
          <div className="mb-16 mt-32">
           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-12">
              {loading ? (
                <div className="col-span-full text-center text-pop-gray">Loading QR codes...</div>
              ) : (
                getFilteredCodes().map((code, index) => {
                const colors = [
                  "green",
                  "blue",
                  "red",
                  "black",
                  "green",
                  "blue",
                  "red",
                ] as const;
                return (
                  <Link key={code.id} href={`/track/${code.id}`}>
                    <PopArtContainer color={colors[index]} shadow>
                      <Card className="border-4 border-pop-black hover:scale-105 transition-transform cursor-pointer bg-white aspect-square">
                        <CardContent className="p-4 text-center bg-white h-full flex flex-col justify-center">
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
                        </CardContent>
                      </Card>
                    </PopArtContainer>
                  </Link>
                );
                })
              )}
            </div>
          </div>

          {/* How It Works */}
          {/* <section>
            <h2 className="text-3xl helvetica-bold mb-8 text-center">
              <span className="text-pop-blue">HOW QR TRACKING WORKS</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-pop-green border-2 border-pop-black mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="w-8 h-8 text-pop-black" />
                </div>
                <h3 className="systematic-caps text-lg mb-2">
                  Scan or Enter Code
                </h3>
                <p className="text-pop-gray text-sm">
                  Each recycled item gets a unique QR code when it enters our
                  system
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-pop-blue border-2 border-pop-black mx-auto mb-4 flex items-center justify-center">
                  <span className="text-pop-black helvetica-bold text-xl">
                    →
                  </span>
                </div>
                <h3 className="systematic-caps text-lg mb-2">
                  See Full Journey
                </h3>
                <p className="text-pop-gray text-sm">
                  Track transformation from corporate waste through processing
                  to final product
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-pop-red border-2 border-pop-black mx-auto mb-4 flex items-center justify-center">
                  <span className="text-pop-black helvetica-bold text-xl">
                    !
                  </span>
                </div>
                <h3 className="systematic-caps text-lg mb-2">Learn Impact</h3>
                <p className="text-pop-gray text-sm">
                  Discover environmental impact, carbon offset, and educational
                  value created
                </p>
              </div>
            </div>
          </section> */}
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

          <Link href="/shop">
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
