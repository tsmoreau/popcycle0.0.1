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
  Package
} from "lucide-react";

export default function About() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Large Image */}
      <section className="relative h-[70vh] bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageIcon className="w-32 h-32 text-gray-300" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black/60 to-transparent">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-light mb-4 text-white">
              About PopCycle
            </h1>
            <p className="text-xl text-white/90 max-w-2xl font-light">
              Transforming plastic waste into products that teach through making.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="max-w-4xl">
          <p className="text-2xl lg:text-3xl font-light leading-relaxed text-gray-700 mb-8">
            We transform plastic waste into products that teach through making.
            Every item is 100% recycled, digitally tracked from collection to
            creation, and designed to inspire hands-on learning and community
            connection.
          </p>
        </div>
      </section>

      {/* Team Section - Editorial Grid */}
      <section className="max-w-screen-2xl mx-auto px-6 lg:px-12 pb-20 lg:pb-32">
        <h2 className="text-4xl lg:text-5xl font-light mb-16 lg:mb-20">Team</h2>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Terrence Stasse */}
          <div>
            <div className="aspect-[3/4] bg-gray-100 mb-6 flex items-center justify-center">
              <Users className="w-20 h-20 text-gray-300" />
            </div>
            <h3 className="text-xl font-medium mb-1">Terrence Stasse</h3>
            <p className="text-base text-gray-500 mb-4">Founder & Creative Lead</p>
            <p className="text-base text-gray-600 leading-relaxed font-light">
              Builder, artist, and teacher. Leads product development, systems design, and hands-on R&D.
            </p>
          </div>

          {/* Oxana Ermolova */}
          <div>
            <div className="aspect-[3/4] bg-gray-100 mb-6 flex items-center justify-center">
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
            <div className="aspect-[3/4] bg-gray-100 mb-6 flex items-center justify-center">
              <Cog className="w-20 h-20 text-gray-300" />
            </div>
            <h3 className="text-xl font-medium mb-1">Argo</h3>
            <p className="text-base text-gray-500 mb-4">Human Relations Lead</p>
            <p className="text-base text-gray-600 leading-relaxed font-light">
              In charge of distractions, snacks, and walks. Enthusiastically leads the studio greeting committee.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section - Editorial Two Column */}
      <section className="bg-gray-50 py-20 lg:py-32">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">
              <ImageIcon className="w-24 h-24 text-gray-400" />
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-light mb-8 lg:mb-12">Story</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
                <p>
                  PopCycle emerged from the intersection of waste crisis and
                  educational opportunity. Every corporate plastic cup, every
                  discarded container represents both environmental challenge
                  and creative potential.
                </p>
                <p>
                  Our systematic approach transforms abstract sustainability
                  concepts into tangible maker education experiences. Through
                  QR code tracking, we create complete provenance stories that
                  connect waste sources to final educational products.
                </p>
                <p>
                  This isn't just recycling—it's reimagining how materials
                  flow through educational ecosystems, creating value at every
                  transformation point.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Large Visual Grid */}
      <section className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <h2 className="text-4xl lg:text-5xl font-light mb-16 lg:mb-20">Process</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Collection */}
          <div>
            <div className="aspect-square bg-gray-100 mb-6 flex items-center justify-center">
              <Factory className="w-20 h-20 text-gray-300" />
            </div>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-light text-gray-300">01</span>
              <h3 className="text-xl font-medium">Collection</h3>
            </div>
            <p className="text-base text-gray-600 leading-relaxed font-light">
              Partner companies separate plastic waste for circular transformation
            </p>
          </div>

          {/* Processing */}
          <div>
            <div className="aspect-square bg-gray-100 mb-6 flex items-center justify-center">
              <RotateCcw className="w-20 h-20 text-gray-300" />
            </div>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-light text-gray-300">02</span>
              <h3 className="text-xl font-medium">Processing</h3>
            </div>
            <p className="text-base text-gray-600 leading-relaxed font-light">
              Clean, sort, and prepare materials for manufacturing transformation
            </p>
          </div>

          {/* Manufacturing */}
          <div>
            <div className="aspect-square bg-gray-100 mb-6 flex items-center justify-center">
              <Wrench className="w-20 h-20 text-gray-300" />
            </div>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-light text-gray-300">03</span>
              <h3 className="text-xl font-medium">Manufacturing</h3>
            </div>
            <p className="text-base text-gray-600 leading-relaxed font-light">
              Transform processed plastic into educational tools and components
            </p>
          </div>

          {/* Distribution */}
          <div>
            <div className="aspect-square bg-gray-100 mb-6 flex items-center justify-center">
              <Package className="w-20 h-20 text-gray-300" />
            </div>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-light text-gray-300">04</span>
              <h3 className="text-xl font-medium">Distribution</h3>
            </div>
            <p className="text-base text-gray-600 leading-relaxed font-light">
              Deliver QR-coded products to educational institutions and makerspaces
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section - Minimal */}
      <section className="bg-gray-50 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <h2 className="text-4xl lg:text-5xl font-light mb-16 lg:mb-20">
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
      <section className="py-20 lg:py-32 px-6 lg:px-12 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-light mb-8 text-white">
            Join the Circular Revolution
          </h2>

          <p className="text-xl mb-12 text-white/80 leading-relaxed font-light">
            Transform your organization's impact through traceable plastic transformation.
          </p>

          <Link href="/product">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 text-base px-8 py-6 h-auto font-normal"
            >
              Explore Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
