import Link from "next/link";
import { Recycle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-pop-black text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-6">
          {/* Logo & Description */}
          <div className="md:col-span-2 mb-8 md:mb-0">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-pop-green border-2 border-white flex items-center justify-center">
                <span className="text-white helvetica-bold text-xl">P</span>
              </div>
              <div>
                <span className="helvetica-bold text-2xl tracking-tight">
                  PopCycle
                </span>
                <br />
                <span className="text-gray-300 leading-relaxed">
                  Track our plastic
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400">© 2025 Insight Makers LLC.</p>
          </div>

          {/* Resources */}
          <div className="mb-6 md:mb-0">
            <h3 className="systematic-caps text-sm font-bold mb-3 text-pop-green">
              Resources
            </h3>
            <div className="space-y-1">
              <Link
                href="/track"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Curriculum & Guides
              </Link>
              <Link
                href="#"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Waste Audits
              </Link>
              <Link
                href="#"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Impact Reports
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div className="mb-6 md:mb-0">
            <h3 className="systematic-caps text-sm font-bold mb-3 text-pop-green">
              Connect
            </h3>
            <div className="space-y-1">
              <Link
                href="/partners"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Become a Partner
              </Link>
              <Link
                href="/about#contact"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div className="mb-6 md:mb-0">
            <h3 className="systematic-caps text-sm font-bold mb-3 text-pop-green">
              Social Media
            </h3>
            <div className="space-y-1">
              <Link
                href="/partners"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Youtube
              </Link>
              <Link
                href="/about#contact"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Bluesky
              </Link>
              <Link
                href="/about#contact"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                LinkedIn
              </Link>
            </div>
          </div>

          {/* Insight Ecosystem */}
          <div>
            <h3 className="systematic-caps text-sm font-bold mb-3 text-pop-green">
              Insight Ecosystem
            </h3>
            <div className="space-y-1">
              <Link
                href="/partners"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Insight Makers
              </Link>
              <Link
                href="/about#contact"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Insight Rovers
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
