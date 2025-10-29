"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { 
  Users, 
  Target, 
  Cog, 
  ArrowRight, 
  ChevronDown, 
  ImageIcon,
  Factory,
  RotateCcw,
  Wrench,
  Package,
  Recycle
} from "lucide-react";

export default function About() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white font-jost">
      {/* Hero Section */}
      <section className="relative py-40 lg:py-48 px-6 bg-gray-50 overflow-hidden flex items-center">
       
        
        <div className="max-w-5xl mx-auto text-center relative z-20">
          <h1 className="text-4xl lg:text-6xl mb-8 tracking-tight leading-tight text-black font-light">
            About PopCycle
          </h1>
          <p className="text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed text-black font-light">
            PopCycle is an LA Based Design Studio that transforms tracked plastic waste streams into custom products that delight. We believe that each item we engage with can be anchor for story, learning, connection, and impact.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="pt-36 bg-white">
        <div className="w-[65vw] mx-auto">
          <p className="text-2xl lg:text-3xl font-light leading-relaxed text-gray-700">
            We transform plastic waste into products that teach through making.
            Every item is 100% recycled, digitally tracked from collection to
            creation, and designed to inspire hands-on learning and community
            connection.
          </p>
        </div>
      </section>

      {/* Team Section - Editorial Grid */}
      <section className="my-36 w-[75vw] bg-white flex mx-auto">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-light mb-12 lg:mb-16">Team</h2>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Terrence Stasse */}
          <div>
            <div className="aspect-[4/5] bg-gray-100 mb-6 flex items-center justify-center">
              <Users className="w-20 h-20 text-gray-300" />
            </div>
            <h3 className="text-xl font-medium mb-1">Terrence Stasse</h3>
            <p className="text-base text-gray-500 mb-4">Founder & Creative Lead</p>
            <p className="text-base text-gray-600 leading-relaxed font-light">
              Builder, artist, and teacher. Leads product development, systems design, and R&D.
            </p>
          </div>

          {/* Oxana Ermolova */}
          <div>
            <div className="aspect-[4/5] bg-gray-100 mb-6 flex items-center justify-center">
              <Target className="w-20 h-20 text-gray-300" />
            </div>
            <h3 className="text-xl font-medium mb-1">Oxana Ermolova</h3>
            <p className="text-base text-gray-500 mb-4">Development & Partnerships Lead</p>
            <p className="text-base text-gray-600 leading-relaxed font-light">
              Connector of people, impact, and ideas. Heads outreach, collaborations, and partnerships.
            </p>
          </div>

          {/* Argo */}
          <div>
            <div className="aspect-[4/5] bg-gray-100 mb-6 flex items-center justify-center">
              <Cog className="w-20 h-20 text-gray-300" />
            </div>
            <h3 className="text-xl font-medium mb-1">Argo</h3>
            <p className="text-base text-gray-500 mb-4">Human Relations Lead</p>
            <p className="text-base text-gray-600 leading-relaxed font-light">
              Head of distractions, snacks, and walks. Enthusiastically leads the studio greeting committee.
            </p>
          </div>
          </div>
        </div>
      </section>

    

      {/* Process Section - Large Visual Grid */}
      <div className="relative py-36 w-[75vw] text-center flex flex-col mx-auto">
         <h2 className=" text-3xl lg:text-4xl font-light">Process</h2>
        <section className="pt-12 pb-4 lg:pt-16 bg-white">
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
          <section className=" pb-4 bg-white">
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
       
        <section className="  pb-4 bg-white">
          <div className="w-[45vw] l mx-4 mx-auto ">
            <div className="grid grid-cols-1 gap-4 lg:gap-6">
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

          
        </div>
          </div>
        </section>

      </div>

      {/* FAQ Section - Minimal */}
      <section className="py-36 pt-36 bg-gray-50">
        <div className="w-[65vw] mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-light mb-12 lg:mb-16">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {/* FAQ 1 */}
            <div className="border-b border-gray-200">
              <button
                className="w-full py-6 flex items-center justify-between text-left hover:opacity-70 transition-opacity"
                onClick={() => toggleFaq('faq1')}
              >
                <h3 className="text-lg font-medium pr-8">
                  How does QR code tracking work?
                </h3>
                <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${openFaq === 'faq1' ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === 'faq1' && (
                <div className="pb-6">
                  <p className="text-gray-600 leading-relaxed font-light">
                    Each plastic item receives a unique QR code during collection. This code tracks the complete journey from corporate waste through processing, manufacturing, and final delivery to educational institutions. Users can scan the code to see the full provenance story.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="border-b border-gray-200">
              <button
                className="w-full py-6 flex items-center justify-between text-left hover:opacity-70 transition-opacity"
                onClick={() => toggleFaq('faq2')}
              >
                <h3 className="text-lg font-medium pr-8">
                  What types of plastic do you accept?
                </h3>
                <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${openFaq === 'faq2' ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === 'faq2' && (
                <div className="pb-6">
                  <p className="text-gray-600 leading-relaxed font-light">
                    We work with common office plastics including cups, containers, and packaging materials. Our system is designed to handle PET, HDPE, and PP plastics that are commonly found in corporate waste streams.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="border-b border-gray-200">
              <button
                className="w-full py-6 flex items-center justify-between text-left hover:opacity-70 transition-opacity"
                onClick={() => toggleFaq('faq3')}
              >
                <h3 className="text-lg font-medium pr-8">
                  How can educational institutions get involved?
                </h3>
                <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${openFaq === 'faq3' ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === 'faq3' && (
                <div className="pb-6">
                  <p className="text-gray-600 leading-relaxed font-light">
                    Schools and makerspaces can join our network to receive tracked educational products. We provide maker education resources, assembly guides, and curriculum integration support to maximize learning outcomes.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 4 */}
            <div className="border-b border-gray-200">
              <button
                className="w-full py-6 flex items-center justify-between text-left hover:opacity-70 transition-opacity"
                onClick={() => toggleFaq('faq4')}
              >
                <h3 className="text-lg font-medium pr-8">
                  What is the maker registration system?
                </h3>
                <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${openFaq === 'faq4' ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === 'faq4' && (
                <div className="pb-6">
                  <p className="text-gray-600 leading-relaxed font-light">
                    Our maker registration allows customers to declare when they've completed assembling their tracked products. This creates a fourth "Assembled" step in the transformation timeline, completing the circular economy story from waste to finished educational tool.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 5 */}
            <div className="border-b border-gray-200">
              <button
                className="w-full py-6 flex items-center justify-between text-left hover:opacity-70 transition-opacity"
                onClick={() => toggleFaq('faq5')}
              >
                <h3 className="text-lg font-medium pr-8">
                  How do companies become partners?
                </h3>
                <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${openFaq === 'faq5' ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === 'faq5' && (
                <div className="pb-6">
                  <p className="text-gray-600 leading-relaxed font-light">
                    Corporate partners provide plastic waste streams and receive detailed impact reporting. We handle collection, processing, and transformation while providing complete transparency through our QR tracking system. Contact us to discuss partnership opportunities.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="relative py-32 lg:py-40 mt-12 px-6 bg-white overflow-hidden flex items-center">
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <h2 className="text-3xl lg:text-5xl font-light mb-6 lg:mb-8 text-black">
            Contact Us
          </h2>

          <p className="text-lg lg:text-xl mb-10 lg:mb-12 text-black/80 leading-relaxed font-light">
            Transform your organization's impact through traceable plastic transformation.
          </p>

          <Link href="/products">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 text-base px-8 py-6 h-auto font-normal"
            >
              Submit Inquiry
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
