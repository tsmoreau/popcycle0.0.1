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
              <div className="w-12 h-12 bg-pop-green border-2 border-white flex items-center justify-center">
                <Recycle className="w-6 h-6 text-black" />
              </div>
              <span className="helvetica-bold text-2xl tracking-tight">
                PopCycle
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Transforming corporate plastic waste into trackable, educational products. 
              Every QR code tells a complete story of circular transformation.
            </p>
            <p className="text-sm text-gray-400">
              © 2025 PopCycle. Building the circular economy through making.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="systematic-caps text-sm font-bold mb-4 text-pop-green">
              Explore
            </h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/services" className="block text-gray-300 hover:text-white transition-colors">
                Services
              </Link>
              <Link href="/store" className="block text-gray-300 hover:text-white transition-colors">
                Store
              </Link>
              <Link href="/track" className="block text-gray-300 hover:text-white transition-colors">
                Track Item
              </Link>
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="systematic-caps text-sm font-bold mb-4 text-pop-green">
              Connect
            </h3>
            <div className="space-y-2">
              <Link href="/partners" className="block text-gray-300 hover:text-white transition-colors">
                Become a Partner
              </Link>
              <Link href="/about#contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact Us
              </Link>
              <p className="text-gray-400 text-sm">
                Building sustainable futures through circular design
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}