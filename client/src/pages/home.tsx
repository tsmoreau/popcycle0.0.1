import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { PopArtContainer, MetricCard } from "@/components/pop-art-elements";

interface Metrics {
  totalPieces: number;
  totalWeight: number;
  totalCarbonOffset: number;
  totalPartners: number;
}

export default function Home() {
  const { data: metrics } = useQuery<Metrics>({
    queryKey: ["/api/metrics"],
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-8xl helvetica-bold leading-none tracking-tight">
                  TRANSFORM<br />
                  <span className="text-pop-green">WASTE</span><br />
                  INTO<br />
                  <span className="text-pop-blue">WONDER</span>
                </h1>
              </div>
              
              <PopArtContainer color="green" pattern="geometric" shadow className="bg-pop-black text-white p-8">
                <p className="text-xl font-medium leading-relaxed">
                  Every piece of plastic tells a story. We transform corporate waste into trackable products that demonstrate circular economy principles through hands-on making.
                </p>
              </PopArtContainer>
              
              <div className="flex space-x-4">
                <Link href="/track">
                  <Button className="bg-pop-green text-white hover:bg-pop-black systematic-caps pop-shadow-green text-lg px-8 py-6">
                    Start Tracking
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="border-4 border-pop-black hover:bg-pop-black hover:text-white systematic-caps text-lg px-8 py-6">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <PopArtContainer pattern="dots" className="bg-gray-100 h-96 rounded-none">
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl helvetica-bold text-pop-green mb-4">TRANSFORM</div>
                    <div className="systematic-caps text-pop-gray">Plastic → Product</div>
                  </div>
                </div>
              </PopArtContainer>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-pop-red dots-pattern-red opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl helvetica-bold mb-8 tracking-tight">
              THREE STEP<br />
              <span className="text-pop-green">TRANSFORMATION</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PopArtContainer color="green" shadow className="bg-white p-8">
              <div className="w-16 h-16 bg-pop-green mb-6 flex items-center justify-center">
                <span className="text-white text-2xl helvetica-bold">01</span>
              </div>
              <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">Collect</h3>
              <p className="text-lg leading-relaxed">Corporate partners provide waste plastic. We sort, clean, and prepare materials for transformation.</p>
            </PopArtContainer>
            
            <PopArtContainer color="blue" shadow className="bg-white p-8">
              <div className="w-16 h-16 bg-pop-blue mb-6 flex items-center justify-center">
                <span className="text-white text-2xl helvetica-bold">02</span>
              </div>
              <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">Transform</h3>
              <p className="text-lg leading-relaxed">Heat press, CNC cut, and assemble into functional products with laser-etched QR tracking codes.</p>
            </PopArtContainer>
            
            <PopArtContainer color="red" shadow className="bg-white p-8">
              <div className="w-16 h-16 bg-pop-red mb-6 flex items-center justify-center">
                <span className="text-white text-2xl helvetica-bold">03</span>
              </div>
              <h3 className="text-2xl helvetica-bold mb-4 systematic-caps">Track</h3>
              <p className="text-lg leading-relaxed">QR codes link to complete provenance: source, impact, and reuse pathways for full transparency.</p>
            </PopArtContainer>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20 bg-pop-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <MetricCard 
              value={metrics?.totalPieces ?? 0}
              label="Pieces Tracked"
              color="green"
            />
            <MetricCard 
              value={`${Math.round(metrics?.totalWeight ?? 0)}kg`}
              label="Plastic Diverted"
              color="blue"
            />
            <MetricCard 
              value={`${Math.round(metrics?.totalCarbonOffset ?? 0)}kg`}
              label="CO₂ Saved"
              color="red"
            />
            <MetricCard 
              value={metrics?.totalPartners ?? 0}
              label="Partner Companies"
              color="green"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl helvetica-bold mb-8 systematic-caps">
            Ready to <span className="text-pop-green">Transform</span>?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button className="bg-pop-green text-white hover:bg-pop-black systematic-caps pop-shadow-green text-lg px-8 py-4">
                Our Services
              </Button>
            </Link>
            <Link href="/track">
              <Button variant="outline" className="border-4 border-pop-black hover:bg-pop-black hover:text-white systematic-caps text-lg px-8 py-4">
                Track an Item
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
