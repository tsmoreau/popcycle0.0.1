'use client'

import Link from "next/link";
import { Recycle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Don't render footer on portal pages
  if (pathname?.startsWith('/portal')) {
    return null;
  }
  return (
    <footer className="bg-gray-50 text-black py-10 pt-24 mt-16 ">
      <div className="max-w-9/10  mx-auto px-6">
        <Link href="/" className=" hidden lg:block w-auto transform -translate-y-1 scale- w-auto md:mb-0 justify-center text-center">
          <div className=" flex w-auto justify-center font-jost font-light pl-0 pb-2 space-x-1 mt-1">

           <img
                src="https://storage.googleapis.com/popcycle01/Gemini_Generated_Image_pih22upih22upih2.png"

                className="w-11 h-11 object-cover mt-0.5"
                data-testid="img-product-info"
              />

            <div className="flex-col flex mt-">
            <span className="text-4xl  tracking-tight font-medium text-gray-900 uppercase ">
              PopCycle
            </span>
            <span className=" -mt-1.5 ml-1 tracking-[0.32em] text-[8px] font-bold text-gray-900">
              RECYCLING DESIGN STUDIO
            </span>
              </div>
          </div>
          <p className="hidden text-sm text-gray-500">© 2025 Insight Makers LLC.</p>
        </Link>
        <div id="main" className="mt-4 flex flex-col lg:flex-row mx-auto justify-center items-center lg:items-start text-center  gap-x-12 ">
          {/* Logo & Description */}
          <Link href="/" className="lg:hidden w-auto transform -translate-y-1  mb-4 w-auto md:mb-0 justify-center text-center">
            <div className=" flex w-auto justify-center font-jost font-light pl-0 pb-2 space-x-1 mt-1">

             <img
                  src="https://storage.googleapis.com/popcycle01/Gemini_Generated_Image_pih22upih22upih2.png"

                  className="w-11 h-11 object-cover mt-0.5"
                  data-testid="img-product-info"
                />

              <div className="flex-col flex mt-">
              <span className="text-4xl  tracking-tight font-medium text-gray-900 uppercase ">
                PopCycle
              </span>
              <span className=" -mt-1.5 ml-1 tracking-[0.32em] text-[8px] font-bold text-gray-900">
                RECYCLING DESIGN STUDIO
              </span>
                </div>
            </div>
            <p className="hidden text-sm text-gray-500">© 2025 Insight Makers LLC.</p>
          </Link>

          {/* Main Nav */}
          <div className="mb-8 md:mb-0 -mt-2 text-center ">
            <h3 className="systematic-caps text-xs font-semibold mb-4 text-gray-800 tracking-wider">
              
            </h3>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block text-sm text-gray-500 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/products"
                className="block text-sm text-gray-500 hover:text-white transition-colors"
              >
                Products
              </Link>
              <Link
                href="/services"
                className="block text-sm text-gray-500 hover:text-white transition-colors"
              >
                Services
              </Link>
              <Link
                href="/services"
                className="block text-sm text-gray-500 hover:text-white transition-colors"
              >
                Track
              </Link>
              
            </div>
          </div>

          <div className="mb-8 md:mb-0 -mt-2 text-center ">
            <h3 className="systematic-caps text-xs font-semibold mb-4 text-gray-800 tracking-wider">

            </h3>
            <div className="space-y-2">
    
              <Link
                href="#"
                className="block text-sm text-gray-500 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="block text-sm text-gray-500 hover:text-white transition-colors"
              >
                Terms of Use
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="hidden mb-8 md:mb-0 text-center lg:text-left">
            <h3 className="systematic-caps text-xs font-semibold mb-4 text-gray-800 tracking-wider">
              Resources
            </h3>
            <div className="space-y-2">
              <Link
                href="/track"
                className="block text-sm text-gray-500 hover:text-white transition-colors"
              >
                Process Guides
              </Link>
              <Link
                href="#"
                className="block text-sm text-gray-500 hover:text-white transition-colors"
              >
                Waste Audits
              </Link>
              <Link
                href="#"
                className="block text-sm text-gray-500 hover:text-white transition-colors"
              >
                Impact Reports
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div className="hidden mb-8 md:mb-0 text-center lg:text-left">
            <h3 className="systematic-caps text-xs font-semibold mb-4 text-gray-800 tracking-wider">
              Connect
            </h3>
            <div className="space-y-2">
              <Link
                href="/partners"
                className="block text-sm text-gray-500 hover:text-white transition-colors"
              >
                Become a Partner
              </Link>
              <Link
                href="/about#contact"
                className="block text-sm text-gray-500 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div className=" hidden mb-8 md:mb-0 text-center lg:text-left">
            <h3 className="systematic-caps text-xs font-semibold mb-4 text-gray-800 tracking-wider">
              Social Media
            </h3>
            <div className="space-y-2">
              <Link
                href="/partners"
                className="block text-sm text-gray-500 hover:text-white transition-colors"
              >
                Youtube
              </Link>
              <Link
                href="/about#contact"
                className="block text-sm text-gray-500 hover:text-white transition-colors"
              >
                Bluesky
              </Link>
              <Link
                href="/about#contact"
                className="block text-sm text-gray-500 hover:text-white transition-colors"
              >
                LinkedIn
              </Link>
            </div>
          </div>

          {/* Insight Ecosystem */}
          <div className="mb-12 hidden">
            <h3 className="systematic-caps text-xs font-semibold mb-4 text-gray-800 tracking-wider">
              Insight Ecosystem
            </h3>
            <div className="space-y-2">
              <Link
                href="/partners"
                className="block text-sm text-gray-500 hover:text-white transition-colors"
              >
                Insight Makers
              </Link>
              <Link
                href="/about#contact"
                className="block text-sm text-gray-500 hover:text-white transition-colors"
              >
                Insight Robotics
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
