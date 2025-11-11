"use client";
import Link from "next/link";
import { Button } from "./components/ui/button";
import { ArrowRight, Recycle, Factory, Eye, RotateCcw, Target, Scan, ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen font-jost">
      {/* Hero Section */}
      <section className="relative group font-jost overflow-hidden h-[60vh] lg:h-[80vh] flex items-end pb-12">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="https://storage.googleapis.com/popcycle01/Solar_System_Coaster_Video_Generation.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 transition ease-in-out hover:bg-black/30 duration-400 z-10"></div>
        
        {/* Content */}
        <div className="relative  w-full mx-auto text-center z-20">

<div className="transition ease-in-out group-hover:transform group-hover:-translate-y-8 transform duration-400 ">    
          <div className="text-3xl lg:text-5xl mb-3 tracking-normal leading-tight text-white font-light group-hover:opacity-100 opacity-80">Traceable Sustainability</div>
          
       
          <p className="text-base font-light lg:text-2xl max-w-[90vw] lg:max-w-[35vw] mx-auto leading-relaxed group-hover:opacity-100 opacity-80 text-white">
            Transforming post-consumer plastic into designer objects with complete traceability. 
           
          </p>
           </div>
          <div className="left-1/2 -translate-x-1/2 absolute -bottom-5 flex flex-col sm:flex-row justify-center items-center z-30">




            <div 
              onClick={() => {
                document.getElementById('top')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className="duration-400 cursor-pointer opacity-0 group-hover:opacity-100 z-30 ease-in-out transition"
            >
              <svg width="40px" height="40px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path 
                  strokeWidth="0.75"    
                  stroke="#FFFFFF" 
                  fill="none" 
                  strokeLinecap="round"  
                  strokeLinejoin="round"
                  d="M3 7 L10 14 L17 7" 
                />
              </svg>
            </div>



          </div>
        </div>
     
      </section>

     
      {/* Editorial Section */}



          {/* Featured Products Grid */}
          <section id="top" className="lg:mt-20 pt-8 pb-4  bg-white">
            <div className="lg:w-[90vw] mx-4 mx-auto pt-1">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-3 lg:gap-y-12  ">
                {/* Product Card 1 */}
                <Link href="/about" className="group">
                  <div className="relative aspect-[7/4] overflow-hidden bg-gray-100">
                   
                  


                      <img
                        src="https://storage.googleapis.com/popcycle01/products/68f7c497367b7700db69fcc5/assets/upscalemedia-transformed-1761341017228.png"
                      
                        className="w-full h-full object-cover object-bottom transition duration-300 ease-in-out transform hover:scale-105"
                        data-testid="img-product-info"
                      />
                      
                   
                  </div>
                  <div className="w-auto h-auto justify-items-center my-2">

                    <h3 className="text-black mt-3 font-base text-xl lg:text-lg ">Studio Editions</h3>
                    <p className="text-gray-500 -mt-1 text-lg">One of a kind limited run designs</p>
                    </div>
                </Link>

                {/* Product Card 2 */}
              <Link href="/about" className="group">
                <div className="relative aspect-[7/4] bg-gray-100 overflow-hidden">
                  <img
                    src="https://storage.googleapis.com/popcycle01/Gemini_Generated_Image_393va2393va2393v.png"

                    

                    className="w-full h-full object-cover object-bottom transition duration-300 ease-in-out transform hover:scale-105"
                  
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 ">

                  </div>
                </div>
                <div className="w-auto h-auto justify-items-center my-2">
                  <h3 className="text-black mt-2 font-base text-lg ">Custom Collections</h3>
                  <p className="text-gray-500 -mt-1 text-lg">Exclusive designs and products</p>
                  </div>
              </Link>

                 {/* Product Card 3 */}
                <Link href="/about" className=" group">
                  <div className="relative aspect-[7/4] bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="https://storage.googleapis.com/popcycle01/Gemini_Generated_Image_d5b7k3d5b7k3d5b7.png"

                      className="w-full h-full object-cover object-bottom transition duration-300 ease-in-out transform hover:scale-105"
                      data-testid="img-product-info"
                    />
 </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 ">

                    </div>
                  </div>
                  <div className="w-auto h-auto justify-items-center my-2">
                  <h3 className="text-black mt-2 font-base text-lg ">Community Partners</h3>
                  <p className="text-gray-500 -mt-1 text-lg">Products from your waste stream</p>
                    </div>
                </Link>

                {/* Product Card 4 */}
                <Link href="/about" className=" group">
                  <div className="relative aspect-[7/4] bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src="https://storage.googleapis.com/popcycle01/Gemini_Generated_Image_ugvelnugvelnugve.png"

                        className="w-full h-full object-cover object-bottom transition duration-300 ease-in-out transform hover:scale-105"
                        data-testid="img-product-info"
                      />

                      
                      
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 ">

                    </div>
                  </div>
                  <div className="w-auto h-auto justify-items-center my-2">
                  <h3 className="text-black mt-2 font-base text-lg ">Complete Lifecycle Tracking</h3>
                  <p className="text-gray-500 -mt-1 text-lg">Provable material diversion</p>
                    </div>
                </Link>
              
              </div>
            </div>
          </section>



      <section className=" mt-32 text-center">

         <div className="hidden text-5xl font-light pb-8">Studio Retainer</div>
          <div className=" w-full h-[60vh] md:flex lg:flex mx-auto">


            <div className="w-full aspect[7/5]  lg:w-3/5 bg-gray-50 flex flex-col mx-auto items-center justify-center lg:h-auto ">

              <img
                src="https://storage.googleapis.com/popcycle01/products/68f7c497367b7700db69fccb/assets/gemini-generated-image-301d4u301d4u301d-1761761133617.png"

                className="w-full h-full object-cover object-bottom "
                data-testid="img-product-info"
              />

            </div>

            <div id="top" className="w-[90vw] lg:w-2/5  h-auto text-left">

              <div className="py-16 px-16 text-black">

                <div  className="text-3xl font-base pb-6">Community Sourced </div>
                <div className="text-xl font-light ">PopCycle sources its recycled materials from local Community Partners and transforms them into branded products for those partners, allowing for proven material waste diversion as well as curated product creation.</div>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 px-12 h-14 text-base font-light bg-pop-green text-white hover:bg-white hover:text-black mt-8"
                >
                  Learn More
                </Button>
              </div>
            </div>

          </div>



      </section>


      <section className="mt-16 text-center">

         <div className="hidden text-5xl font-light pb-8">Studio Retainer</div>
          <div className=" w-full h-[60vh] md:flex lg:flex mx-auto">


            <div className="w-full  lg:w-3/5 bg-gray-50 flex flex-col mx-auto items-center justify-center h-auto ">

              <img
                src="https://storage.googleapis.com/popcycle01/products/68f7c497367b7700db69fccb/assets/gemini-generated-image-301d4u301d4u301d-1761761133617.png"

                className="w-full h-full object-cover object-bottom "
                data-testid="img-product-info"
              />

            </div>


            <div className="w-[90vw] lg:w-2/5  h-auto text-right">

              <div className="py-16 px-16 text-black">

                <div  className="text-3xl font-base pb-6">Sustainably Manufactured</div>
                <div className="text-xl font-light ">PopCycle processes all material locally and in-house, using minimally destructive, environmentally friendly recycling methods, removing plastic from the waste stream and providing Community Partners with brand-focused product.</div>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 px-12 h-14 text-base font-light bg-pop-green text-white hover:bg-white hover:text-black mt-8"
                >
                  Track an Object
                </Button>
              </div>
            </div>

            
          </div>



      </section>


      <section className=" mt-16 text-center">

         <div className="hidden text-5xl font-light pb-8">Studio Retainer</div>
          <div className=" w-full md:flex lg:flex mx-auto">


            <div className="w-full h-[60vh] lg:w-3/5 bg-gray-50 flex flex-col mx-auto items-center justify-center ">

              <img
                src="https://storage.googleapis.com/popcycle01/products/68f7c497367b7700db69fccb/assets/gemini-generated-image-301d4u301d4u301d-1761761133617.png"

                className="w-full h-full object-cover object-bottom "
                data-testid="img-product-info"
              />


            </div>

            <div className="w-[90vw] lg:w-2/5 bg-white h-auto text-left">

              <div className="py-16 pl-16 pr-36 text-black">

                <div  className="text-3xl font-base pb-6">Fully Tracked </div>
                <div className="text-xl font-light ">PopCycle tracks our materials from pickup, through processing, to final object, allowing us to provide you with complete post-consumer material provenance.</div>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 px-12 h-14 text-base font-light bg-pop-green text-white hover:bg-white hover:text-black mt-8"
                >
                  Track an Object
                </Button>
              </div>
            </div>

          </div>



      </section>


      
      <section className="hidden pt-12 mt- text-center">

         <div className="hidden text-5xl font-light pb-8">Studio Retainer</div>
          <div className=" w-[90vw] flex mx-auto">

            <div className="w-2/5 bg-gray-50 h-auto text-right">

              <div className="py-16 px-16 text-black">

                <div className="text-3xl font-base pb-6">Community Produced </div>
                <div className="text-xl font-light ">PopCycle sources its recycled materials from Community Partners and tracks those materials from pickup to processing to final object, and embeds that journey into every object we produce. Every PopCycle object carries its history from Community Partner to final produced item.</div>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 px-12 h-14 text-base font-light bg-pop-green text-white hover:bg-white hover:text-black mt-8"
                >
                  Track an Object
                </Button>
              </div>
            </div>

            <div className="w-3/5 bg-gray-50 flex flex-col mx-auto items-center justify-center">
              <Eye className="w-24 h-24 text-gray-300" />

            </div>



          </div>



      </section>



      {/* Product Highlights Grid */}
      <section className="hidden py-16 lg:py-20 px-6 ">
        <div className="max-w-[90vw] mx-auto">
          <h2 className="text-3xl lg:text-4xl mb-12 text-center">Featured Products</h2>
          <div className="w-3/4 items-center  flex mx-auto justify-center grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((item) => (
              <Link key={item} href="/about" className="group">
                <div className="relative aspect-square bg-gray-50 mb-3 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Recycle className="w-12 h-12 text-gray-300" />
                  </div>
                </div>
                <h4 className="text-sm font-medium mb-1">Product {item}</h4>
                <p className="text-xs text-gray-600">Recycled materials</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className=" pt-72 pb-24  px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl mb-6 leading-tight">
            Start Your Circular Journey
          </h2>
          
          <p className="text-lg mb-10 text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Transform waste into traceable, branded products.
          </p>
          
          <Link href="/services">
            <Button size="lg" className="bg-pop-green text-white hover:bg-gray-800 text-base px-12 py-6 transition-all">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}