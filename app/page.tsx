import Link from "next/link";
import { Button } from "./components/ui/button";
import { ArrowRight, Recycle, Factory, Eye, RotateCcw, Target, Scan } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen font-jost">
      {/* Hero Section */}
      <section className="relative w-2/3 py-40 lg:py-48 px-6 bg-white font-jost overflow-hidden h-[70vh] flex items-center justify-center ">
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
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        {/* Content */}
        <div className="max-w-5xl mx-auto text-center relative z-20">
          <span className="text-4xl lg:text-6xl mb-10 tracking-tight leading-tight text-white font-light">
            connecting <span className="text-pop-blue">systemic</span> and <span className="text-pop-red">aesthetic</span> dimensions of <span className="text-pop-green">recycled</span> materials
           
          </span>
          
          <p className="text-lg lg:text-xl max-w-3xl mx-auto mb-14 leading-relaxed text-white/90 hidden">
            we transform plastic waste into custom-branded products with complete traceability. 
            every item tells a story of sustainability, from bins and back again.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          

            <Link href="/about#faq">
              <Button variant="outline" size="lg" className="hidden mt-6 border-2 border-white text-black hover:bg-white  systematic-caps text-base px-12 py-5 transition-all">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="pt-12 pb-4 lg:pt-16 px-6 bg-white">
        <div className="max-w-8xl mx-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {/* Product Card 1 */}
            <Link href="/about" className="group">
              <div className="relative aspect-[5/3] bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Recycle className="w-24 h-24 text-gray-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 ">
                  
                </div>
              </div>
              <div className="w-auto h-auto justify-items-center my-2">
             
                <h3 className="text-black mt-2 font-light text-xl ">Studio Editions</h3>
                <p className="text-gray-500 -mt-1 text-base">One of a kind limited run designs.</p>
                </div>
            </Link>

            {/* Product Card 2 */}
          <Link href="/about" className="group">
            <div className="relative aspect-[5/3] bg-gray-100 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Recycle className="w-24 h-24 text-gray-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 ">

              </div>
            </div>
            <div className="w-auto h-auto justify-items-center my-2">
              <h3 className="text-black mt-2 font-light text-xl ">Custom Collections</h3>
              <p className="text-gray-500 -mt-1 text-base">Exclusive designs and products</p>
              </div>
          </Link>
  </div>
        </div>
      </section>
      
      {/* Featured Products Grid */}
      <section className=" pb-4 px-6 bg-white">
        <div className="max-w-8xl mx-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {/* Product Card 1 */}
            <Link href="/about" className="group">
              <div className="relative aspect-[5/3] bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Recycle className="w-24 h-24 text-gray-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 ">

                </div>
              </div>
              <div className="w-auto h-auto justify-items-center my-2">
              <h3 className="text-black mt-2 font-light text-xl ">Coasters</h3>
              <p className="text-gray-500 -mt-1 text-base">From your waste stream</p>
                </div>
            </Link>

            {/* Product Card 2 */}
          <Link href="/about" className="group">
            <div className="relative aspect-[5/3] bg-gray-100 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Recycle className="w-24 h-24 text-gray-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 ">

              </div>
            </div>
            <div className="w-auto h-auto justify-items-center my-2">
            <h3 className="text-black mt-2 font-light text-xl ">Coasters</h3>
            <p className="text-gray-500 -mt-1 text-base">From your waste stream</p>
              </div>
          </Link>
      </div>
        </div>
      </section>
     
      {/* Category Showcase */}
      <section className="py-0 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Category 1 */}
            <Link href="/about" className="group">
              <div className="relative aspect-square bg-gray-50 overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Factory className="w-20 h-20 text-gray-300" />
                </div>
              </div>
              <h3 className="text-lg font-medium mb-1">Collection</h3>
              <p className="text-sm text-gray-600">Traceable waste streams</p>
            </Link>

            {/* Category 2 */}
            <Link href="/about" className="group">
              <div className="relative aspect-square bg-gray-50 overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <RotateCcw className="w-20 h-20 text-gray-300" />
                </div>
              </div>
              <h3 className="text-lg font-medium mb-1">Processing</h3>
              <p className="text-sm text-gray-600">Verified transformation</p>
            </Link>

            {/* Category 3 */}
            <Link href="/about" className="group">
              <div className="relative aspect-square bg-gray-50 overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Scan className="w-20 h-20 text-gray-300" />
                </div>
              </div>
              <h3 className="text-lg font-medium mb-1">Tracking</h3>
              <p className="text-sm text-gray-600">Complete transparency</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="py-24 lg:py-32 px-6 bg-gray-50 mt-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Placeholder */}
            <div className="relative aspect-[3/4] bg-gray-200 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Eye className="w-32 h-32 text-gray-300" />
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-4xl lg:text-5xl mb-6 leading-tight">
                True <span className="text-pop-green">Circularity</span>
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Every product tells a story. From collection to creation, 
                we track each step of your waste's transformation into 
                custom-branded products.
              </p>
              <Link href="/about">
                <Button variant="outline" size="lg" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Highlights Grid */}
      <section className="py-16 lg:py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl mb-12 text-center">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((item) => (
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
      <section className="hidden py-24 lg:py-28 px-6 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl mb-6 leading-tight">
            Start Your Circular Journey
          </h2>
          
          <p className="text-lg mb-10 text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Transform your waste into traceable, branded products.
          </p>
          
          <Link href="/about#contact">
            <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800 text-base px-12 py-6 transition-all">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}