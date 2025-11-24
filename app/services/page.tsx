import { Button } from "../components/ui/button";
import { ArrowRight, Palette, Sparkles, Users, Box, Droplet } from "lucide-react";
import Link from "next/link";

export default function Services() {
  return (
    <div className="min-h-screen bg-white font-jost">
      {/* Hero Section */}
      <section className="relative py-40 lg:py-48 px-6 bg-gray-50 font-jost overflow-hidden h-[40vh] lg:h-[60vh] flex items-center">
       
        
        <div className="max-w-5xl mx-auto text-center relative z-20 -mt-7">
          <h1 className="text-4xl lg:text-6xl mb-8 tracking-normal leading-normal text-black font-light">
            Services
          </h1>
          <p className="text-lg lg:text-xl max-w-3xl mx-auto leading-wide text-black/90 font-extralight">
            Complete circular manufacturing solutions from waste collection through custom product creation and delivery.
          </p>
        </div>
      </section>

      {/* Studio Retainer Section */}
      <section className="pt-24 mt-16 text-center">
        
         <div className="text-5xl font-light pb-8">Studio Retainer</div>
          <div className=" w-full bg-pop-red flex mx-auto">
           

            <div className="w-3/5 bg-gray-50 flex flex-col mx-auto items-center justify-center">
              <Palette className="w-24 h-24 text-gray-300" />
              
            </div>

            <div className="w-2/5 bg-gray-200 h-auto text-left">
              
              <div className="py-16 px-16 text-black">
                
                <div className="text-4xl font-base pb-6">Sustainable Design Partner</div>
                <div className="text-2xl font-light ">Ongoing partnership model for organizations seeking continuous creative output and material transformation. We become an extension of your team, delivering regular collections and custom pieces throughout the year.</div>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 px-12 h-14 text-base font-light bg-black text-white hover:bg-gray-300 mt-8"
                >
                  More Details
                </Button>
              </div>
            </div>

          </div>
          
           
     
      </section>


      {/* Limited Commission Section */}
      <section className="pt-24 mt-16 text-center">

         <div className="text-5xl font-light pb-8">Limited Commission</div>
          <div className=" w-full bg-pop-red flex mx-auto">


            <div className="w-3/5 bg-gray-50 flex flex-col mx-auto items-center justify-center">
              <Palette className="w-24 h-24 text-gray-300" />

            </div>

            <div className="w-2/5 bg-gray-200 h-auto text-left">

              <div className="py-16 px-16 text-black">

                <div className="text-4xl font-base pb-6">Custom Collection Development</div>
                <div className="text-2xl font-light ">Bespoke objects designed specifically for your brand or organization. 
                  From concept to delivery, we work with you to create 
                  unique pieces that reflect your values and story.</div>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 px-12 h-14 text-base font-light bg-black text-white hover:bg-gray-300 mt-8"
                >
                  More Details
                </Button>
              </div>
            </div>

          </div>



      </section>

      {/* Community Partner Section */}
      <section className="pt-24 mt-16 text-center">

         <div className="text-5xl font-light pb-8">Community Partners</div>
          <div className=" w-full bg-pop-red flex mx-auto">


            <div className="w-3/5 bg-gray-50 flex flex-col mx-auto items-center justify-center">
              <Palette className="w-24 h-24 text-gray-300" />

            </div>

            <div className="w-2/5 bg-gray-200 h-auto text-left">

              <div className="py-16 px-16 text-black">

                <div className="text-4xl font-base pb-6">Truly Local Circular Economics</div>
                <div className="text-2xl font-light "> Partner organizations provide raw feedstock material, PopCycle provides high-quality custom made products in return. Just in time and on consignment. Everyone wins.</div>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 px-12 h-14 text-base font-light bg-black text-white hover:bg-gray-300 mt-8"
                >
                  More Details
                </Button>
              </div>
            </div>

          </div>



      </section>

      {/* Footer CTA Section */}
      <section className="hidden relative py-32 lg:py-40 px-6 bg-white overflow-hidden flex items-center">
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
