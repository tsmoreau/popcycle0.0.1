"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import {
  ChevronDown,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  User,
  Settings,
  LogOut,
  ShoppingCart,
  Search,
} from "lucide-react";
import AuthButton from "./AuthButton";

// Manual nav changes: User adjusted vertical alignment of centered nav elements (About, Services, Shop, Track)
// Modified items-center positioning on centered nav container for individual control of nav link vertical positions

interface DropdownCard {
  title: string;
  description?: string;
  image?: string;
  color: "green" | "blue" | "red" | "black";
  href?: string;
}

export default function Navigation() {
  const pathname = usePathname();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [iconDropdownOpen, setIconDropdownOpen] = useState<'search' | 'user' | 'cart' | null>(null);
  
  const [aboutScrollPosition, setAboutScrollPosition] = useState(0);
  const [productsScrollPosition, setProductsScrollPosition] = useState(0);
  const [servicesScrollPosition, setServicesScrollPosition] = useState(0);
  
  const aboutCardsRef = useRef<HTMLDivElement>(null);
  const productsCardsRef = useRef<HTMLDivElement>(null);
  const servicesCardsRef = useRef<HTMLDivElement>(null);

  const userMenuRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();
  const hasPortalAccess =
    session?.user?.userType === "super_admin" ||
    (session?.user?.permissions && session.user.permissions.length > 0);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Don't render navigation on portal pages
  if (pathname?.startsWith("/portal")) {
    return null;
  }

  const aboutSections = [
    {
      title: "Company",
      items: [
        { href: "/about#team", label: "Team" },
        { href: "/about#story", label: "Story" },
        { href: "/about#process", label: "Process" },
      ],
    },
    {
      title: "Connect",
      items: [
        { href: "/about#contact", label: "Contact" },
        { href: "/about#faq", label: "FAQ" },
      ],
    },
  ];

  const aboutCards: DropdownCard[] = [
    { title: "Team Stories", color: "green", href: "/about#team" },
    { title: "Our Process", color: "green", href: "/about#process" },
    { title: "Impact", color: "green", href: "/about#story" },
    { title: "Contact Us", color: "green", href: "/about#contact" },
  ];

  const productsSections = [
    {
      title: "Limited Editions",
      items: [
        { href: "/shop#all", label: "Coasters" },
        { href: "/shop#bags", label: "Cutting Boards" },
        { href: "/shop#bags", label: "Clocks" },
        { href: "/shop#bags", label: "Lighting" },
      ],
    },
    {
      title: "Make Your Own",
      items: [
        { href: "/shop#custom-orders", label: "Coasters" },
        { href: "/shop#bulk-orders", label: "Keychains" },
        { href: "/shop#bags", label: "Magnets" },
        { href: "/shop#bags", label: "Bookmarks" },
        { href: "/shop#bags", label: "Combs" },
      ],
    },
    {
      title: "All Products",
      items: [],
    },
  ];

  const productsCards: DropdownCard[] = [
    { title: "New Arrivals", color: "red", href: "/shop" },
    { title: "Featured Products", color: "red", href: "/shop" },
    { title: "Collections", color: "red", href: "/shop" },
    { title: "Limited Editions", color: "red", href: "/shop" },
    { title: "Make Your Own", color: "red", href: "/shop" },
  ];

  const servicesSections = [
    {
      title: "Studio Retainer",
      items: [
        { href: "/services#custom-products", label: "Seasonal Collections" },
        { href: "/services#custom-products", label: "Everyday Objects" },
      ],
    },
    {
      title: "Limited Commission",
      items: [
        { href: "/services#collection-services", label: "Custom Collection" },
        { href: "/services#workshops-events", label: "Installations" },
        { href: "/services#workshops-events", label: "Workshops" },
        { href: "/services#workshops-events", label: "Donations" },
      ],
    },
    {
      title: "Community Partners",
      items: [
        { href: "/services#community-partnerships", label: "" },
        { href: "/services#collection-services", label: "" },
      ],
    },
  ];

  const servicesCards: DropdownCard[] = [
    { title: "Studio Process", color: "blue", href: "/services" },
    { title: "Material Sourcing", color: "blue", href: "/services" },
    { title: "Universal Provenance", color: "blue", href: "/services" },
    { title: "Community Partnerships", color: "blue", href: "/services#community-partnerships" },
  ];

  const aboutItems = aboutSections.flatMap(section => section.items);
  const productsItems = productsSections.flatMap(section => section.items);
  const servicesItems = servicesSections.flatMap(section => section.items);

  // Get color class for card
  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      green: 'bg-pop-green',
      blue: 'bg-pop-blue',
      red: 'bg-pop-red',
      black: 'bg-pop-black',
    };
    return colorMap[color] || 'bg-pop-green';
  };

  // Scroll functions for card containers
  const scrollCards = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 300;
      const newPosition = direction === 'left' 
        ? ref.current.scrollLeft - scrollAmount 
        : ref.current.scrollLeft + scrollAmount;
      ref.current.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  const canScrollLeft = (position: number) => position > 0;
  const canScrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return false;
    return ref.current.scrollLeft < ref.current.scrollWidth - ref.current.clientWidth - 10;
  };

  // Track scroll position
  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>, setter: (pos: number) => void) => {
    if (ref.current) {
      setter(ref.current.scrollLeft);
    }
  };

  return (
    <nav className="font-jost font-light sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-full mx-auto pt-2">
        <div className=" relative flex  justify-between h-16 lg:h-20">
          {/* Mobile menu button - moved to left */}
          <div className="lg:hidden self-center ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover:bg-pop-green hover:text-white"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="flex mb-1">
          {/* Logo */}
          <Link href="/" className="pl-2 lg:pl-12 pl-0 self-end pb-2 flex items-center space-x-2 group lg:mx-0 mx-auto">
            <div className="w-12 h-12 bg-pop-green flex items-center justify-center transition-all group-hover:bg-opacity-90 mt-1">
              <span className="text-white font-bold helvetica-bold text-xl">P</span>
            </div>
            <div className="flex-col flex mt-2">
            <span className="text-4xl  tracking-tighter font-base text-gray-900">
              PopCycle
            </span>
            <span className="hidden mt-0.0 ml-1 tracking-[2.2em] text-[8px] font-bold text-gray-900">
              STUDIO
            </span>
              </div>
          </Link>


          {/* Absolutely centered navigation links */}
          <div className="  hidden self-end lg:flex items-end space-x-10 ml-8">
            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button
                className={`text-lg  hover:text-pop-green transition-colors flex items-center space-x-1 py-2 ${
                  pathname?.startsWith("/about") ? "nav-link-active" : ""
                }`}
              >
                <span>About</span>
              </button>

              {aboutOpen && (
                <div 
                  className="fixed left-0 right-0 top-[88px] z-50 bg-white border-t border-gray-200 shadow-lg"
                  onMouseEnter={() => setAboutOpen(true)}
                  onMouseLeave={() => setAboutOpen(false)}
                >
                  <div className="max-w-7xl mx-auto px-12 py-12">
                    <div className="flex gap-12">
                      {/* Left navigation - flows into columns */}
                      <div className="flex gap-12 min-w-fit">
                        {aboutSections.map((section, idx) => (
                          <div key={idx} className="min-w-[160px]">
                            <h3 className="systematic-caps text-sm font-bold text-gray-400 mb-4">
                              {section.title}
                            </h3>
                            <div className="space-y-2">
                              {section.items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className="block text-sm hover:text-pop-green transition-colors"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Right cards - horizontal scroll with arrows */}
                      <div className="flex-1 relative">
                        {canScrollLeft(aboutScrollPosition) && (
                          <button
                            onClick={() => scrollCards(aboutCardsRef, 'left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-200 p-2 hover:bg-gray-50"
                            data-testid="button-scroll-left-about"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                        )}
                        
                        <div 
                          ref={aboutCardsRef}
                          onScroll={() => handleScroll(aboutCardsRef, setAboutScrollPosition)}
                          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                          {aboutCards.map((card, idx) => (
                            <Link
                              key={idx}
                              href={card.href || '#'}
                              className="flex-shrink-0 w-[240px] aspect-[3/4] bg-gray-100 relative group cursor-pointer overflow-hidden"
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                  <div className={`w-12 h-12 ${getColorClass(card.color)} mx-auto mb-3 flex items-center justify-center`}>
                                    <span className="text-white helvetica-bold text-xl">P</span>
                                  </div>
                                  <p className="systematic-caps text-xs text-gray-600 px-4">{card.title}</p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        
                        {canScrollRight(aboutCardsRef) && (
                          <button
                            onClick={() => scrollCards(aboutCardsRef, 'right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-200 p-2 hover:bg-gray-50"
                            data-testid="button-scroll-right-about"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                className={`text-lg hover:text-pop-green transition-colors flex items-center space-x-1 py-2 ${
                  pathname === "/shop" ? "nav-link-active" : ""
                }`}
              >
                <span>Products</span>
              </button>

              {productsOpen && (
                <div 
                  className="fixed left-0 right-0 top-[88px] z-50 bg-white border-t border-gray-200 shadow-lg"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <div className="max-w-7xl mx-auto px-12 py-12">
                    <div className="flex gap-12">
                      {/* Left navigation - flows into columns */}
                      <div className="flex gap-12 min-w-fit">
                        {productsSections.map((section, idx) => (
                          <div key={idx} className="min-w-[160px]">
                            <h3 className="systematic-caps text-sm font-bold text-gray-400 mb-4">
                              {section.title}
                            </h3>
                            <div className="space-y-2">
                              {section.items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className="block text-sm hover:text-pop-green transition-colors"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Right cards - horizontal scroll with arrows */}
                      <div className="flex-1 relative">
                        {canScrollLeft(productsScrollPosition) && (
                          <button
                            onClick={() => scrollCards(productsCardsRef, 'left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-200 p-2 hover:bg-gray-50"
                            data-testid="button-scroll-left-products"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                        )}
                        
                        <div 
                          ref={productsCardsRef}
                          onScroll={() => handleScroll(productsCardsRef, setProductsScrollPosition)}
                          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                          {productsCards.map((card, idx) => (
                            <Link
                              key={idx}
                              href={card.href || '#'}
                              className="flex-shrink-0 w-[240px] aspect-[3/4] bg-gray-100 relative group cursor-pointer overflow-hidden"
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                  <div className={`w-12 h-12 ${getColorClass(card.color)} mx-auto mb-3 flex items-center justify-center`}>
                                    <span className="text-white helvetica-bold text-xl">P</span>
                                  </div>
                                  <p className="systematic-caps text-xs text-gray-600 px-4">{card.title}</p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        
                        {canScrollRight(productsCardsRef) && (
                          <button
                            onClick={() => scrollCards(productsCardsRef, 'right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-200 p-2 hover:bg-gray-50"
                            data-testid="button-scroll-right-products"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`text-lg hover:text-pop-green transition-colors flex items-center space-x-1 py-2 ${
                  pathname === "/services" ? "nav-link-active" : ""
                }`}
              >
                <span>Services</span>
              </button>

              {servicesOpen && (
                <div 
                  className="fixed left-0 right-0 top-[88px] z-50 bg-white border-t border-gray-200 shadow-lg"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <div className="max-w-7xl mx-auto px-12 py-12">
                    <div className="flex gap-12">
                      {/* Left navigation - flows into columns */}
                      <div className="flex gap-12 min-w-fit">
                        {servicesSections.map((section, idx) => (
                          <div key={idx} className="min-w-[160px]">
                            <h3 className="systematic-caps text-sm font-bold text-gray-400 mb-4">
                              {section.title}
                            </h3>
                            <div className="space-y-2">
                              {section.items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className="block text-sm hover:text-pop-green transition-colors"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Right cards - horizontal scroll with arrows */}
                      <div className="flex-1 relative">
                        {canScrollLeft(servicesScrollPosition) && (
                          <button
                            onClick={() => scrollCards(servicesCardsRef, 'left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-200 p-2 hover:bg-gray-50"
                            data-testid="button-scroll-left-services"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                        )}
                        
                        <div 
                          ref={servicesCardsRef}
                          onScroll={() => handleScroll(servicesCardsRef, setServicesScrollPosition)}
                          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                          {servicesCards.map((card, idx) => (
                            <Link
                              key={idx}
                              href={card.href || '#'}
                              className="flex-shrink-0 w-[240px] aspect-[3/4] bg-gray-100 relative group cursor-pointer overflow-hidden"
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                  <div className={`w-12 h-12 ${getColorClass(card.color)} mx-auto mb-3 flex items-center justify-center`}>
                                    <span className="text-white helvetica-bold text-xl">P</span>
                                  </div>
                                  <p className="systematic-caps text-xs text-gray-600 px-4">{card.title}</p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        
                        {canScrollRight(servicesCardsRef) && (
                          <button
                            onClick={() => scrollCards(servicesCardsRef, 'right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-200 p-2 hover:bg-gray-50"
                            data-testid="button-scroll-right-services"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Shop */}


            {/* Track */}

          </div>
            </div>


          {/* Right-aligned User Menu / Auth Button / Cart */}
          <div 
            className="hidden lg:flex items-center space-x-4 self-end mb-4 mr-16 relative"
            onMouseLeave={() => setIconDropdownOpen(null)}
          >
            {/* Search Icon */}
            <button
              onMouseEnter={() => setIconDropdownOpen('search')}
              className="hover:opacity-80 transition-opacity"
              data-testid="button-search"
            >
              <Search className="w-6 h-6 text-gray-700" />
            </button>

            {/* User Icon */}
            <button
              onMouseEnter={() => setIconDropdownOpen('user')}
              className="hover:opacity-80 transition-opacity"
              data-testid="button-user"
            >
              <User className="w-6 h-6 text-gray-700" />
            </button>

            {/* Shopping Cart */}
            <button
              onMouseEnter={() => setIconDropdownOpen('cart')}
              className="hover:opacity-80 transition-opacity"
              data-testid="button-cart"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
            </button>

            {/* Unified Dropdown */}
            {iconDropdownOpen && (
              <div className="absolute right-0 top-full pt-2">
                <div className="w-80 bg-white border border-gray-200 shadow-lg p-6">
                  {iconDropdownOpen === 'search' && (
                    <div>
                      <h3 className="font-jost text-lg font-semibold mb-4 text-pop-black">Search</h3>
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md font-jost focus:outline-none focus:border-pop-green"
                      />
                    </div>
                  )}

                  {iconDropdownOpen === 'user' && (
                    <div>
                      <h3 className="font-jost text-lg font-semibold mb-4 text-pop-black">Account</h3>
                      <button className="w-full px-6 py-2 bg-pop-green text-white font-jost rounded-md hover:bg-opacity-90 transition-colors">
                        Login
                      </button>
                    </div>
                  )}

                  {iconDropdownOpen === 'cart' && (
                    <div>
                      <h3 className="font-jost text-lg font-semibold mb-4 text-pop-black">Shopping Cart</h3>
                      <button className="w-full px-6 py-2 bg-pop-red text-white font-jost rounded-md hover:bg-opacity-90 transition-colors">
                        View Products
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile icons - search and cart */}
          <div className="lg:hidden flex items-center space-x-2 self-center mr-4">
            <button
              className="hover:opacity-80 transition-opacity"
              data-testid="button-search-mobile"
            >
              <Search className="w-5 h-5 text-gray-700" />
            </button>
            <button
              className="hover:opacity-80 transition-opacity"
              data-testid="button-cart-mobile"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden font-jost font-light bg-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            {/* About Mobile Accordion Section */}
            <div className="space-y-2">
              <button
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                className="flex items-center w-full font-jost text-sm text-pop-black hover:text-pop-green transition-colors"
              >
                <ChevronRight
                  className={`w-4 h-4 mr-2 transform transition-transform ${mobileAboutOpen ? "rotate-90" : ""}`}
                />
                <span className="font-jost">About</span>
              </button>
              {mobileAboutOpen && (
                <div className="pl-4 space-y-1">
                  {aboutItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-left px-4 py-2 font-jost text-sm hover:bg-pop-green hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Products Mobile Accordion Section */}
            <div className="space-y-2">
              <button
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className="flex items-center w-full font-jost text-sm text-pop-black hover:text-pop-red transition-colors"
              >
                <ChevronRight
                  className={`w-4 h-4 mr-2 transform transition-transform ${mobileProductsOpen ? "rotate-90" : ""}`}
                />
                <span className="font-jost">Products</span>
              </button>
              {mobileProductsOpen && (
                <div className="pl-4 space-y-1">
                  {productsItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-left px-4 py-2 font-jost text-sm hover:bg-pop-red hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Services Mobile Accordion Section */}
            <div className="space-y-2">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center w-full font-jost text-sm text-pop-black hover:text-pop-blue transition-colors"
              >
                <ChevronRight
                  className={`w-4 h-4 mr-2 transform transition-transform ${mobileServicesOpen ? "rotate-90" : ""}`}
                />
                <span className="font-jost">Services</span>
              </button>
              {mobileServicesOpen && (
                <div className="pl-4 space-y-1">
                  {servicesItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-left px-4 py-2 font-jost text-sm hover:bg-pop-blue hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile User Section */}
            <div className="pt-4 border-t border-gray-200 space-y-3">

              {session ? (
                <>
                  {/* User Profile Header */}
                  <div className="flex items-center justify-between">

                    <div className="flex items-center space-x-3">

                      <div className="w-10 h-10 bg-pop-green rounded-full flex items-center justify-center shadow-md">

                        <User className="w-5 h-5 text-white" /> 
                      </div>
                      <div>
                        <div className="font-jost text-sm font-bold text-pop-black">
                          {session.user?.name?.split(" ")[0] || "User"}
                        </div>
                        <div className="font-jost text-xs font-medium text-pop-green mt-1">
                          {session.user?.userType === "super_admin"
                            ? "Super Admin"
                            : "Maker"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Menu Items */}
                  <div className="space-y-2">
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center px-4 py-2 font-jost text-sm rounded-md hover:bg-pop-green hover:text-white transition-colors"
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </Link>
                    {hasPortalAccess && (
                      <Link
                        href="/portal"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full flex items-center px-4 py-2 font-jost text-sm rounded-md hover:bg-pop-blue hover:text-white transition-colors"
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Portal
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-2 font-jost text-sm rounded-md hover:bg-pop-red hover:text-white transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-2 flex items-center">
                  <AuthButton /> Login  or Sign Up
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
