import { Button } from "../components/ui/button";
import { ArrowRight, Palette, Sparkles, Users, Box, Droplet } from "lucide-react";
import Link from "next/link";

export default function Services() {
  return (
    <div className="min-h-screen bg-white font-jost">
      {/* Hero Section */}
      <section className="relative py-40 lg:py-48 px-6 bg-black overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-10"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-20">
          <h1 className="text-4xl lg:text-6xl mb-8 tracking-tight leading-tight text-white font-light">
            Services
          </h1>
          <p className="text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed text-white/90 font-light">
            Complete circular manufacturing solutions from waste collection through custom product creation and delivery.
          </p>
        </div>
      </section>

      {/* Studio Retainer Section */}
      <section className="pt-16 pb-12 lg:pt-20 lg:pb-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light mb-6 lg:mb-8">Studio Retainer</h2>
              <p className="text-base lg:text-lg text-gray-700 leading-relaxed font-light mb-6">
                Ongoing partnership model for organizations seeking continuous creative output and material transformation. 
                We become an extension of your team, delivering regular collections and custom pieces throughout the year.
              </p>
              <div className="space-y-4">
                <div className="border-l-2 border-pop-blue pl-4">
                  <h3 className="text-lg lg:text-xl font-medium mb-2">Seasonal Collections</h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed font-light">
                    Quarterly releases of limited-edition products made from tracked plastic waste streams. 
                    Each collection tells a unique story through design and provenance.
                  </p>
                </div>
              </div>
            </div>
            <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
              <Palette className="w-24 h-24 text-gray-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Limited Commission Section */}
      <section className="pt-12 pb-12 lg:pt-16 lg:pb-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-light mb-12 lg:mb-16">Limited Commission</h2>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Custom Collection */}
            <div className="bg-white p-8">
              <Sparkles className="w-12 h-12 text-pop-blue mb-6" />
              <h3 className="text-xl lg:text-2xl font-medium mb-4">Custom Collection</h3>
              <p className="text-base text-gray-600 leading-relaxed font-light">
                Bespoke product lines designed specifically for your brand or organization. 
                From concept to delivery, we work with your plastic waste streams to create 
                unique pieces that reflect your values and story.
              </p>
            </div>

            {/* Installations */}
            <div className="bg-white p-8">
              <Box className="w-12 h-12 text-pop-blue mb-6" />
              <h3 className="text-xl lg:text-2xl font-medium mb-4">Installations</h3>
              <p className="text-base text-gray-600 leading-relaxed font-light">
                Large-scale sculptural works and environmental installations created from 
                recycled materials. Perfect for exhibitions, events, and permanent displays 
                that make powerful statements about sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Partners Section */}
      <section className="pt-12 pb-12 lg:pt-16 lg:pb-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-light mb-12 lg:mb-16">Community Partners</h2>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <div className="space-y-6">
                <div className="border-l-2 border-pop-green pl-4">
                  <h3 className="text-lg lg:text-xl font-medium mb-2">Consignment Collections</h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed font-light">
                    Partner makerspaces and educational institutions can offer PopCycle products 
                    through consignment arrangements, creating new revenue streams while promoting 
                    circular economy principles.
                  </p>
                </div>
                
                <div className="border-l-2 border-pop-green pl-4">
                  <h3 className="text-lg lg:text-xl font-medium mb-2">Material Sourcing</h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed font-light">
                    Community collection programs that transform local plastic waste into educational 
                    resources. We provide training, tracking systems, and support for grassroots 
                    circular economy initiatives.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
              <Users className="w-24 h-24 text-gray-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="relative py-32 lg:py-40 px-6 bg-white overflow-hidden flex items-center">
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <h2 className="text-3xl lg:text-5xl font-light mb-6 lg:mb-8 text-black">
            Start Your Project
          </h2>

          <p className="text-lg lg:text-xl mb-10 lg:mb-12 text-black/80 leading-relaxed font-light">
            Partner with us to transform plastic waste into meaningful products and collections.
          </p>

          <Link href="/about#contact">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 text-base px-8 py-6 h-auto font-normal border border-gray-200"
            >
              Get in Touch
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
