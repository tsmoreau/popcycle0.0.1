import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const aboutItems = [
    { path: "/about/staff", label: "Staff" },
    { path: "/about/story", label: "Story" },
    { path: "/about/process", label: "Process" },
    { path: "/about/contact", label: "Contact" },
  ];

  const servicesItems = [
    { href: "/services#waste-processing", label: "Waste Processing" },
    { href: "/services#educational-workshops", label: "Educational Workshops" },
    { href: "/services#custom-products", label: "Custom Products" },
    { href: "/services#corporate-services", label: "Corporate Services" },
    { href: "/services#educational-services", label: "Educational Services" },
  ];

  const handleServicesClick = (href: string) => {
    const [path, hash] = href.split('#');
    window.location.href = href;
    setServicesOpen(false);
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
              <button className={`systematic-caps text-sm hover:text-pop-green transition-colors flex items-center space-x-1 ${
                location.startsWith('/about') ? "nav-link-active" : ""
              }`}>
                <span>About</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {aboutOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border-4 border-pop-black pop-shadow-black">
                  {aboutItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`block px-4 py-3 systematic-caps text-sm hover:bg-pop-green hover:text-white transition-colors ${
                        location === item.path ? "bg-pop-green text-white" : ""
                      }`}
                      onClick={() => setAboutOpen(false)}
                    >
                      {item.label}
                    </Link>
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
              <button className={`systematic-caps text-sm hover:text-pop-green transition-colors flex items-center space-x-1 ${
                location === '/services' ? "nav-link-active" : ""
              }`}>
                <span>Services</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border-4 border-pop-black pop-shadow-black">
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
            <Button variant="outline" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
