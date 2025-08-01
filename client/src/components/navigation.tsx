import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const aboutItems = [
    { href: "/about#staff", label: "Mission" },
    { href: "/about#staff", label: "Team" },
   
    { href: "/about#process", label: "Process" },
     { href: "/about#process", label: "Impact" },
    { href: "/about#contact", label: "Contact" },
  ];

  const servicesItems = [
    { href: "/services#waste-processing", label: "Community Parnerships" },
    
    { href: "/services#corporate-services", label: "Corporate CSR & Event Services" },
    { href: "/services#educational-workshops", label: "Educational Kits & Workshops" },

    { href: "/services#custom-products", label: "Custom Products" }
  ];

  const handleServicesClick = (href: string) => {
    const [path, hash] = href.split('#');
    if (location === path && hash) {
      // Same page, just scroll to anchor
      const element = document.getElementById(hash);
      if (element) {
        const navHeight = 80; // Height of sticky nav bar
        const elementPosition = element.offsetTop - navHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Different page, navigate then scroll
      window.location.href = href;
    }
    setServicesOpen(false);
  };

  const handleAboutClick = (href: string) => {
    const [path, hash] = href.split('#');
    if (location === path && hash) {
      // Same page, just scroll to anchor
      const element = document.getElementById(hash);
      if (element) {
        const navHeight = 80; // Height of sticky nav bar
        const elementPosition = element.offsetTop - navHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Different page, navigate then scroll
      window.location.href = href;
    }
    setAboutOpen(false);
  };

  return (
    <nav className="nav-systematic sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-3xl helvetica-bold tracking-tight">
              POP<span className="text-pop-green">CYCLE</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {/* About Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button className={`systematic-caps text-sm hover:text-pop-green transition-colors flex items-center space-x-1 py-2 ${
                location.startsWith('/about') ? "nav-link-active" : ""
              }`}>
                <span>About</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {aboutOpen && (
                <div className="absolute top-full left-0 w-48 bg-white border-4 border-pop-black pop-shadow-black">
                  {aboutItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleAboutClick(item.href)}
                      className="block w-full text-left px-4 py-3 systematic-caps text-sm hover:bg-pop-green hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className={`systematic-caps text-sm hover:text-pop-green transition-colors flex items-center space-x-1 py-2 ${
                location === '/services' ? "nav-link-active" : ""
              }`}>
                <span>Services</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {servicesOpen && (
                <div className="absolute top-full left-0 w-56 bg-white border-4 border-pop-black pop-shadow-black">
                  {servicesItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleServicesClick(item.href)}
                      className="block w-full text-left px-4 py-3 systematic-caps text-sm hover:bg-pop-blue hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Regular Nav Items */}
            <Link
              href="/shop"
              className={`systematic-caps text-sm hover:text-pop-green transition-colors ${
                location === '/shop' ? "nav-link-active" : ""
              }`}
            >
              Shop
            </Link>
            
            <Link
              href="/track"
              className={`systematic-caps text-sm hover:text-pop-green transition-colors ${
                location === '/track' ? "nav-link-active" : ""
              }`}
            >
              Track
            </Link>
          </div>

          <div className="hidden md:block">
            <Link href="/track">
              <Button className="bg-pop-green text-white hover:bg-pop-black systematic-caps pop-shadow-green">
                Scan QR Code
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover:bg-pop-green hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t-4 border-pop-black">
          <div className="px-4 py-6 space-y-4">
            {/* About Mobile Section */}
            <div className="space-y-2">
              <div className="systematic-caps text-sm font-bold text-pop-black">About</div>
              {aboutItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    const [path, hash] = item.href.split('#');
                    if (location === path && hash) {
                      const element = document.getElementById(hash);
                      if (element) {
                        const navHeight = 80;
                        const elementPosition = element.offsetTop - navHeight;
                        window.scrollTo({
                          top: elementPosition,
                          behavior: 'smooth'
                        });
                      }
                    } else {
                      window.location.href = item.href;
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 systematic-caps text-sm hover:bg-pop-green hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Services Mobile Section */}
            <div className="space-y-2">
              <div className="systematic-caps text-sm font-bold text-pop-black">Services</div>
              {servicesItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    const [path, hash] = item.href.split('#');
                    if (location === path && hash) {
                      const element = document.getElementById(hash);
                      if (element) {
                        const navHeight = 80;
                        const elementPosition = element.offsetTop - navHeight;
                        window.scrollTo({
                          top: elementPosition,
                          behavior: 'smooth'
                        });
                      }
                    } else {
                      window.location.href = item.href;
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 systematic-caps text-sm hover:bg-pop-blue hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Regular Mobile Nav Items */}
            <div className="space-y-2">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 systematic-caps text-sm hover:bg-pop-red hover:text-white transition-colors border border-pop-black ${
                  location === '/shop' ? "bg-pop-red text-white" : ""
                }`}
              >
                Shop
              </Link>
              
              <Link
                href="/track"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 systematic-caps text-sm hover:bg-pop-green hover:text-white transition-colors border border-pop-black ${
                  location === '/track' ? "bg-pop-green text-white" : ""
                }`}
              >
                Track
              </Link>
            </div>
            
            {/* Mobile CTA */}
            <div className="pt-4">
              <Link href="/track">
                <Button 
                  className="w-full bg-pop-green text-white hover:bg-pop-black systematic-caps pop-shadow-green"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Scan QR Code
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
