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
    <footer className="bg-stone-200 text-black py-16 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className=" lg:flex mx-auto justify-center gap-x-16">
          {/* Logo & Description */}
          <div className="md:col-span-2 mb-8 w-auto md:mb-0">
            <Link href="/" className=" self-end pb-2 flex items-center space-x-2 group lg:mx-0 mx-auto">
              <div className="w-10 h-10 bg-pop-green flex items-center justify-center transition-all group-hover:bg-opacity-90 mt-1">
                <span className="text-white font-bold helvetica-bold text-lg">P</span>
              </div>
              <div className="flex-col flex mt-2">
              <span className="text-3xl font-light tracking-tighter font-base text-gray-900">
                PopCycle
              </span>
              <span className="hidden mt-0.0 ml-1 tracking-[2.2em] text-[8px] font-bold text-gray-900">
                STUDIO
              </span>
                </div>
            </Link>
            <p className="text-sm text-gray-500">© 2025 Insight Makers LLC.</p>
          </div>

          {/* Resources */}
          <div className="mb-2 md:mb-0">
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
          <div className="mb-2 md:mb-0">
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
          <div className="mb-2 md:mb-0">
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
