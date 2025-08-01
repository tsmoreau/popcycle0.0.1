import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { PopArtContainer, QRCodeElement } from "@/components/pop-art-elements";

export default function Track() {
  const [qrCode, setQrCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (qrCode.trim()) {
      window.location.href = `/track/${qrCode.trim()}`;
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl helvetica-bold mb-8 tracking-tight">
            TRACK YOUR<br />
            <span className="text-pop-green">PLASTIC'S</span><br />
            <span className="text-pop-blue">JOURNEY</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed text-pop-gray">
            Enter a QR code to discover the complete transformation story of recycled plastic waste.
          </p>
        </div>

        {/* QR Code Input */}
        <PopArtContainer color="green" shadow className="bg-white border-4 border-pop-black p-8 mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <QRCodeElement code="SCAN" size="lg" color="green" />
            </div>
            
            <div className="space-y-4">
              <label htmlFor="qrCode" className="block text-lg helvetica-bold systematic-caps">
                Enter QR Code
              </label>
              <Input
                id="qrCode"
                type="text"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                placeholder="e.g., ABC123"
                className="text-center text-2xl helvetica-bold h-16 border-4 border-pop-black"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-pop-green text-white hover:bg-pop-black systematic-caps pop-shadow-green text-lg py-4"
              disabled={!qrCode.trim()}
            >
              Track Item
            </Button>
          </form>
        </PopArtContainer>

        {/* Sample Items */}
        <div className="space-y-8">
          <h2 className="text-3xl helvetica-bold text-center systematic-caps">
            Try These <span className="text-pop-blue">Sample</span> Items
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/track/ABC123">
              <Card className="border-4 border-pop-green hover:pop-shadow-green transition-all transform-pop cursor-pointer">
                <CardHeader className="text-center">
                  <QRCodeElement code="ABC123" size="md" color="green" />
                  <CardTitle className="systematic-caps">ABC123</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-center">
                    <div className="helvetica-bold">Rover Chassis</div>
                    <div className="text-pop-gray">TechCorp Solutions</div>
                    <div className="text-pop-green text-sm">2.4kg CO₂ Saved</div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/track/DEF456">
              <Card className="border-4 border-pop-blue hover:pop-shadow-blue transition-all transform-pop cursor-pointer">
                <CardHeader className="text-center">
                  <QRCodeElement code="DEF456" size="md" color="blue" />
                  <CardTitle className="systematic-caps">DEF456</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-center">
                    <div className="helvetica-bold">Pop-out Toy</div>
                    <div className="text-pop-gray">GreenTech Industries</div>
                    <div className="text-pop-blue text-sm">1.8kg CO₂ Saved</div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/track/GHI789">
              <Card className="border-4 border-pop-red hover:pop-shadow-red transition-all transform-pop cursor-pointer">
                <CardHeader className="text-center">
                  <QRCodeElement code="GHI789" size="md" color="red" />
                  <CardTitle className="systematic-caps">GHI789</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-center">
                    <div className="helvetica-bold">Educational Kit</div>
                    <div className="text-pop-gray">EduSystem Schools</div>
                    <div className="text-pop-red text-sm">3.2kg CO₂ Saved</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
