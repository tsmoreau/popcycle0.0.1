'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { PopArtContainer } from '../components/PopArtElements';
import { QrCode, Search, ArrowRight } from 'lucide-react';

export default function TrackPage() {
  const [qrCode, setQrCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qrCode.trim()) return;
    
    setIsLoading(true);
    router.push(`/track/${qrCode.trim()}`);
  };

  // Mock QR codes for demonstration
  const sampleQRs = ['ABC123', 'DEF456', 'GHI789', 'JKL012'];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl lg:text-8xl helvetica-bold mb-8 tracking-tight">
          <span className="text-pop-green">TRACK</span><br />
          YOUR ITEM
        </h1>
        
        <p className="text-xl lg:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed text-pop-gray">
          Enter your QR code to see the complete journey from waste to wonder.
        </p>

        {/* QR Input Form */}
        <PopArtContainer color="green" shadow className="bg-white border-4 border-pop-green p-8 mb-12 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-pop-green rounded-full flex items-center justify-center">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl helvetica-bold systematic-caps">Enter QR Code</h2>
            </div>
            
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="ABC123"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value.toUpperCase())}
                className="text-center text-xl systematic-caps border-2 border-pop-black h-14"
                maxLength={6}
              />
              
              <Button 
                type="submit" 
                size="lg" 
                disabled={isLoading || !qrCode.trim()}
                className="w-full bg-pop-black text-white hover:bg-pop-green hover:text-pop-black systematic-caps text-lg py-4"
              >
                {isLoading ? 'Loading...' : (
                  <>
                    Track Item
                    <Search className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </PopArtContainer>

        {/* Sample QR Codes */}
        <div className="mb-12">
          <h3 className="text-2xl helvetica-bold mb-6 systematic-caps">
            Or Try These <span className="text-pop-blue">Sample Codes</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sampleQRs.map((code) => (
              <Card key={code} className="border-2 border-pop-black hover:border-pop-blue transition-colors cursor-pointer">
                <CardContent className="p-4" onClick={() => router.push(`/track/${code}`)}>
                  <div className="w-16 h-16 bg-white border-2 border-pop-black flex items-center justify-center mx-auto mb-3">
                    <span className="systematic-caps text-xs font-bold">{code}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full systematic-caps text-xs">
                    Track {code}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div className="text-center">
          <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">
            How <span className="text-pop-red">Tracking</span> Works
          </h3>
          
          <p className="text-lg text-pop-gray leading-relaxed max-w-2xl mx-auto mb-8">
            Every recycled item gets a unique QR code during manufacturing. 
            Scan or enter the code to see its complete transformation story, 
            environmental impact, and educational journey.
          </p>
          
          <Button variant="outline" size="lg" className="border-2 border-pop-black systematic-caps">
            Learn More About Our Process
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}