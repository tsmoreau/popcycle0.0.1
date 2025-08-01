import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-pop-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl helvetica-bold mb-4">
              POP<span className="text-pop-green">CYCLE</span>
            </div>
            <p className="leading-relaxed text-gray-300">
              Transforming waste into wonder through systematic design and community engagement.
            </p>
          </div>
          
          <div>
            <h4 className="helvetica-bold mb-4 systematic-caps">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-pop-green transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-pop-green transition-colors">About</Link></li>
              <li><Link href="/services" className="hover:text-pop-green transition-colors">Services</Link></li>
              <li><Link href="/shop" className="hover:text-pop-green transition-colors">Shop</Link></li>
              <li><Link href="/track" className="hover:text-pop-green transition-colors">Track</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="helvetica-bold mb-4 systematic-caps">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Waste Processing</li>
              <li>QR Tracking</li>
              <li>Corporate Workshops</li>
              <li>Educational Programs</li>
            </ul>
          </div>
          
          <div>
            <h4 className="helvetica-bold mb-4 systematic-caps">Contact</h4>
            <div className="space-y-2 text-gray-300">
              <p>hello@popcycle.io</p>
              <p>(555) 123-4567</p>
              <p>San Francisco, CA</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 PopCycle. All rights reserved. Transforming waste into wonder.</p>
        </div>
      </div>
    </footer>
  );
}
