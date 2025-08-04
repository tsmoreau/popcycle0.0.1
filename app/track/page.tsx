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

export default function Track() {
  const sampleCodes = [
    "ABC123",
    "DEF456",
    "GHI789",
    "JKL012",
    "MNO345",
    "PQR678",
  ];

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
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          {/* QR Code Search */}
          <div className="mb-16">
            <PopArtContainer color="green" shadow>
              <Card className="border-4 border-pop-black">
                <CardContent className="p-8">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Enter item code (e.g. ABC123)"
                        className="border-2 border-pop-black text-lg h-12"
                      />
                    </div>
                    <Button
                      size="lg"
                      className="bg-pop-green text-pop-black hover:bg-pop-black hover:text-white systematic-caps h-12 px-8"
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
          <div className="mb-16">
            <div className="flex flex-wrap gap-4 justify-center">
              {['COLLECTED BATCHES', 'PRESSED BLANKS', 'FINISHED ITEMS'].map((category) => (
                <button
                  key={category}
                  className="px-6 py-3 border-2 border-pop-black bg-white hover:bg-pop-black hover:text-white transition-colors systematic-caps"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Sample QR Codes */}
          <div className="mb-16 mt-32">
            <h2 className="text-3xl helvetica-bold mb-8 text-center">
              <span className="text-pop-black">TRY THESE SAMPLE CODES</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto px-2">
              {sampleCodes.map((code, index) => {
                const colors = [
                  "green",
                  "blue",
                  "red",
                  "black",
                  "green",
                  "blue",
                ] as const;
                return (
                  <Link key={code} href={`/track/${code}`}>
                    <PopArtContainer color={colors[index]} shadow>
                      <Card className="border-4 border-pop-black hover:scale-105 transition-transform cursor-pointer bg-white aspect-square">
                        <CardContent className="p-4 text-center bg-white h-full flex flex-col justify-center">
                          <QRCodeElement
                            qrCode={code}
                            size="md"
                            className="mx-auto mb-4"
                          />
                          <div className="systematic-caps text-lg helvetica-bold">
                            {code}
                          </div>
                          <div className="text-xs text-pop-gray mt-1">
                            Click to track
                          </div>
                        </CardContent>
                      </Card>
                    </PopArtContainer>
                  </Link>
                );
              })}
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
            Every unique code represents a complete transformation from waste
            to wonder.
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
