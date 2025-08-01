'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, Menu, X, ChevronRight } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const aboutItems = [
    { href: "/about#team", label: "Team" },
    { href: "/about#process", label: "Process" },
    { href: "/about#partners", label: "Partners" },
    { href: "/about#contact", label: "Contact" }
  ];

  const servicesItems = [
    { href: "/services#community-partnerships", label: "Community Partnerships" },
    { href: "/services#corporate-esg-events", label: "Corporate Services" },
    { href: "/services#educational-kits-workshops", label: "Educational Kits & Workshops" },
    { href: "/services#custom-products", label: "Custom Products" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-4 border-pop-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-pop-green border-2 border-pop-black flex items-center justify-center">
              <span className="text-pop-black helvetica-bold text-xl">P</span>
            </div>
            <span className="helvetica-bold text-2xl tracking-tight text-pop-black">
              PopCycle
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {/* Track */}
            <Link
              href="/track"
              className={`systematic-caps text-sm hover:text-pop-green transition-colors py-2 ${
                pathname === '/track' ? "nav-link-active" : ""
              }`}
            >
              Track
            </Link>
            
            {/* Store */}
            <Link
              href="/store"
              className={`systematic-caps text-sm hover:text-pop-green transition-colors py-2 ${
                pathname === '/store' ? "nav-link-active" : ""
              }`}
            >
              Store
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className={`systematic-caps text-sm hover:text-pop-green transition-colors flex items-center space-x-1 py-2 ${
                pathname === '/services' ? "nav-link-active" : ""
              }`}>
                <span>Services</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {servicesOpen && (
                <div className="absolute top-full left-0 w-56 bg-white border-4 border-pop-black pop-shadow-black">
                  {servicesItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block w-full text-left px-4 py-3 systematic-caps text-sm hover:bg-pop-blue hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* About Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button className={`systematic-caps text-sm hover:text-pop-green transition-colors flex items-center space-x-1 py-2 ${
                pathname?.startsWith('/about') ? "nav-link-active" : ""
              }`}>
                <span>About</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {aboutOpen && (
                <div className="absolute top-full left-0 w-48 bg-white border-4 border-pop-black pop-shadow-black">
                  {aboutItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block w-full text-left px-4 py-3 systematic-caps text-sm hover:bg-pop-green hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* <div className="hidden md:block">
            <Link href="/track">
              <Button variant="ghost" className="bg-pop-green text-white hover:bg-pop-black systematic-caps">
                Scan QR Code
              </Button>
            </Link>
          </div> */}

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
            {/* Track Mobile Section */}
            <div className="space-y-2">
              <Link
                href="/track"
                onClick={() => setMobileMenuOpen(false)}
                className="systematic-caps text-sm font-bold text-pop-black hover:text-pop-green transition-colors"
              >
                Track
              </Link>
            </div>
            
            {/* Store Mobile Section */}
            <div className="space-y-2">
              <Link
                href="/store"
                onClick={() => setMobileMenuOpen(false)}
                className="systematic-caps text-sm font-bold text-pop-black hover:text-pop-red transition-colors"
              >
                Store
              </Link>
            </div>
            
            {/* Services Mobile Accordion Section */}
            <div className="space-y-2">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center justify-between w-full systematic-caps text-sm font-bold text-pop-black hover:text-pop-blue transition-colors"
              >
                <span>Services</span>
                <ChevronRight className={`w-4 h-4 transform transition-transform ${mobileServicesOpen ? 'rotate-90' : ''}`} />
              </button>
              {mobileServicesOpen && (
                <div className="pl-4 space-y-1">
                  {servicesItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-left px-4 py-2 systematic-caps text-sm hover:bg-pop-blue hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* About Mobile Accordion Section */}
            <div className="space-y-2">
              <button
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                className="flex items-center justify-between w-full systematic-caps text-sm font-bold text-pop-black hover:text-pop-green transition-colors"
              >
                <span>About</span>
                <ChevronRight className={`w-4 h-4 transform transition-transform ${mobileAboutOpen ? 'rotate-90' : ''}`} />
              </button>
              {mobileAboutOpen && (
                <div className="pl-4 space-y-1">
                  {aboutItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-left px-4 py-2 systematic-caps text-sm hover:bg-pop-green hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile CTA */}
            {/* <div className="pt-4">
              <Link href="/track">
                <Button 
                  variant="ghost"
                  className="w-full bg-pop-green text-white hover:bg-pop-black systematic-caps"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Scan QR Code
                </Button>
              </Link>
            </div> */}
          </div>
        </div>
      )}
    </nav>
  );
}