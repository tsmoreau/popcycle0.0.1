import Link from "next/link";
import { Recycle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-pop-black text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-pop-green border-2 border-pop-black flex items-center justify-center">
                <span className="text-pop-black helvetica-bold text-xl">P</span>
              </div>
              <span className="helvetica-bold text-2xl tracking-tight">
                PopCycle
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Transforming waste into sustainability. <br/> Track our plastic, every
              piece tells a story.
            </p>
            <p className="text-sm text-gray-400">
              © 2025 PopCycle. Building the circular economy through making.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="systematic-caps text-sm font-bold mb-4 text-pop-green">
              Resources
            </h3>
            <div className="space-y-2">
              <Link
                href="/track"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Track Our Plastic
              </Link>
              <Link
                href="#"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Impact Reports
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="systematic-caps text-sm font-bold mb-4 text-pop-green">
              Connect
            </h3>
            <div className="space-y-2">
              <Link
                href="/partners"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Become a Partner
              </Link>
              <Link
                href="/about#contact"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
