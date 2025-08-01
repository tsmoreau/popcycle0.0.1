import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { PopArtContainer, QRCodeElement } from "../components/PopArtElements";
import { Search, QrCode } from "lucide-react";
import Link from "next/link";

export default function Track() {
  const sampleCodes = ['ABC123', 'DEF456', 'GHI789', 'JKL012', 'MNO345', 'PQR678'];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl helvetica-bold mb-6 tracking-tight">
            <span className="text-pop-green">TRACK</span><br />
            YOUR ITEM
          </h1>
          <p className="text-xl text-pop-gray max-w-2xl mx-auto">
            Enter a QR code to see the complete journey from corporate waste to educational wonder.
          </p>
        </div>

        {/* QR Code Search */}
        <div className="mb-16">
          <PopArtContainer color="green" shadow>
            <Card className="border-4 border-pop-black">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input 
                      placeholder="Enter QR code (e.g. ABC123)" 
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

        {/* Sample QR Codes */}
        <div className="mb-16">
          <h2 className="text-3xl helvetica-bold mb-8 text-center">
            <span className="text-pop-black">TRY THESE SAMPLE CODES</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {sampleCodes.map((code, index) => {
              const colors = ['green', 'blue', 'red', 'black', 'green', 'blue'] as const;
              return (
                <Link key={code} href={`/track/${code}`}>
                  <PopArtContainer color={colors[index]} shadow>
                    <Card className="border-4 border-pop-black hover:scale-105 transition-transform cursor-pointer bg-white">
                      <CardContent className="p-6 text-center bg-white">
                        <QRCodeElement qrCode={code} size="md" className="mx-auto mb-4" />
                        <div className="systematic-caps text-lg helvetica-bold">{code}</div>
                        <div className="text-xs text-pop-gray mt-1">Click to track</div>
                      </CardContent>
                    </Card>
                  </PopArtContainer>
                </Link>
              );
            })}
          </div>
        </div>

        {/* How It Works */}
        <section>
          <h2 className="text-3xl helvetica-bold mb-8 text-center">
            <span className="text-pop-blue">HOW QR TRACKING WORKS</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pop-green border-2 border-pop-black mx-auto mb-4 flex items-center justify-center">
                <QrCode className="w-8 h-8 text-pop-black" />
              </div>
              <h3 className="systematic-caps text-lg mb-2">Scan or Enter Code</h3>
              <p className="text-pop-gray text-sm">
                Each recycled item gets a unique QR code when it enters our system
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pop-blue border-2 border-pop-black mx-auto mb-4 flex items-center justify-center">
                <span className="text-pop-black helvetica-bold text-xl">→</span>
              </div>
              <h3 className="systematic-caps text-lg mb-2">See Full Journey</h3>
              <p className="text-pop-gray text-sm">
                Track transformation from corporate waste through processing to final product
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pop-red border-2 border-pop-black mx-auto mb-4 flex items-center justify-center">
                <span className="text-pop-black helvetica-bold text-xl">!</span>
              </div>
              <h3 className="systematic-caps text-lg mb-2">Learn Impact</h3>
              <p className="text-pop-gray text-sm">
                Discover environmental impact, carbon offset, and educational value created
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}