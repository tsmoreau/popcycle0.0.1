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

  // Mobile menu item arrays
  const aboutItems = [
    { href: "/about#team", label: "Team" },
    { href: "/about#story", label: "Story" },
    { href: "/about#process", label: "Process" },
    { href: "/about#contact", label: "Contact" },
    { href: "/about#faq", label: "FAQ" },
  ];

  const productsItems = [
    { href: "/shop#limited-coasters", label: "Coasters" },
    { href: "/shop#limited-boards", label: "Cutting Boards" },
    { href: "/shop#limited-clocks", label: "Clocks" },
    { href: "/shop#limited-lighting", label: "Lighting" },
    { href: "/shop#custom-coasters", label: "Custom Coasters" },
    { href: "/shop#custom-keychains", label: "Keychains" },
    { href: "/shop#custom-magnets", label: "Magnets" },
    { href: "/shop#custom-bookmarks", label: "Bookmarks" },
    { href: "/shop#custom-combs", label: "Combs" },
    { href: "/shop#all", label: "Browse All" },
  ];

  const servicesItems = [
    { href: "/services#custom-products", label: "Seasonal Collections" },
    { href: "/services#custom-products", label: "Everyday Objects" },
    { href: "/services#collection-services", label: "Custom Collection" },
    { href: "/services#workshops-events", label: "Installations" },
    { href: "/services#workshops-events", label: "Workshops" },
    { href: "/services#workshops-events", label: "Donations" },
    { href: "/services#community-partnerships", label: "Local Partnerships" },
    { href: "/services#collection-services", label: "Global Initiatives" },
  ];

  return (
    <nav className="font-jost font-light  z-50 bg-white border-b border-gray-200">
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
            </div>

            {/* Products Dropdown */}
            <div
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
            </div>
            
            {/* Services Dropdown */}
            <div
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
              <div className="z-50 absolute right-0 top-full pt-2">
                <div className="w-80 bg-white border border-gray-200 shadow-lg p-6">
                  {iconDropdownOpen === 'search' && (
                    <div>
                      <h3 className="font-jost text-lg font-semibold mb-4 text-pop-black border-b pb-2">Track Lifecycle</h3>
                      <input
                        type="text"
                        placeholder="Enter object code..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md font-jost focus:outline-none focus:border-pop-green"
                      />
                    </div>
                  )}

                  {iconDropdownOpen === 'user' && (
                    <div>
                      <h3 className="font-jost text-lg font-semibold mb-4 text-pop-black border-b pb-2">Account</h3>
                     <AuthButton />
                    </div>
                  )}

                  {iconDropdownOpen === 'cart' && (
                    <div>
                      <h3 className="font-jost text-lg font-semibold mb-4 text-pop-black border-b pb-2">Shopping Cart</h3>
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

          {/* Dropdowns rendered at nav level */}
          {aboutOpen && (() => {
            // 1. DATA STRUCTURE
            // We define the sections that will be used.
            const companySection = {
              title: "Company",
              items: [
                { href: "/about#team", label: "Team" },
                { href: "/about#story", label: "Story" },
                { href: "/about#process", label: "Process" },
              ],
            };
            const connectSection = {
              title: "Connect",
              items: [
                { href: "/about#contact", label: "Contact" },
                { href: "/about#faq", label: "FAQ" },
              ],
            };

            // This nested array defines the columns. Each inner array is a column.
            const aboutColumns = [
              [ // Column 1
                companySection,
                connectSection,
              ],
           
            ];

            // The data for the image cards on the right.
            const aboutCardData = [
                { caption: "Team Stories", color: "bg-pop-green" },
                { caption: "Our Process", color: "bg-pop-green" },
                { caption: "Impact", color: "bg-pop-green" },
            ];

            return (
              <div 
                className="absolute left-0 right-0 top-full z-50 bg-white border-t border-gray-200 shadow-lg "
                onMouseEnter={() => setAboutOpen(true)}
                onMouseLeave={() => setAboutOpen(false)}
              >
                {/* 2. LAYOUT: A simple flex container. `justify-between` creates the space. */}
                <div className="max-w-7xl  mx-auto px-12 py-6 h-full flex items-start justify-start mt-2">

                  {/* Container for the text columns */}
                  <div className="flex gap-8 h-full">
                    {/* Outer loop creates the columns */}
                    {aboutColumns.map((column, colIndex) => (
                      <div key={colIndex} className="w-[180px] flex-shrink-0">
                        {/* Inner loop renders the stacked sections inside each column */}
                        {column.map((section, secIndex) => (
                          <div key={secIndex} className="mb-8">
                            <Link href={section.items?.[0]?.href || '#'} className="block systematic-caps text-sm font-normal text-gray-400 mb-4 hover:text-pop-green transition-colors cursor-pointer ">
                              {section.title}
                            </Link>
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
                    ))}
                  </div>

                  {/* Container for the image cards */}
                 <div className="relative overflow-hidden"> 
                   <div className="relative  flex gap-6 w-full overflow-x-auto"><div className="w-min aboslute right-0 overflow-x-a flex gap-4">

                 {aboutCardData.map((card, cardIndex) => (
                   <div key={cardIndex} className="w-72  px-1 bg-gray-100 rounded-md  relative h-96 cursor-pointer ">
                     <div className="absolute inset-0 flex items-center justify-center">
                       <div className="text-center">
                         <div className={`w-12 h-12 ${card.color} mx-auto mb-3 flex items-center justify-center`}>
                           <span className="text-white helvetica-bold text-xl">P</span>
                         </div>
                         <p className="systematic-caps text-xs text-gray-600 px-4">{card.caption}</p>
                       </div>
                     </div>
                   </div>
                 ))}
                 </div>
                 </div>
</div>
                 
                  </div>
                </div>
             
            );
          })()}

          {productsOpen && (() => {
            // 1. DATA STRUCTURE
            // We define the sections that will be used.
            const coastersSection = {
              title: "Coasters",
              items: [
                { href: "/shop#all", label: "Themed Sets" },
              ],
            };
            const boardsSection = {
              title: "Cutting Boards",
              items: [
                { href: "/shop#all", label: "Abstracts" },
                { href: "/shop#all", label: "Still Lifes" },
              ],
            };
            const clocksSection = {
              title: "Clocks",
              items: [
                { href: "/shop#all", label: "Desk Clocks" },
                { href: "/shop#all", label: "Wall Clocks" },
              ],
            };
            const lightingSection = {
              title: "Lighting",
              items: [
                { href: "/shop#all", label: "Designer Lights" },
              ],
            };
            const makeYourOwnSection = {
              title: "Make-Your-Own",
              items: [
                { href: "/shop#custom-coasters", label: "Coasters" },
                { href: "/shop#custom-keychains", label: "Keychains" },
                { href: "/shop#custom-magnets", label: "Magnets" },
                { href: "/shop#custom-bookmarks", label: "Bookmarks" },
                { href: "/shop#custom-combs", label: "More" },
              ],
            };

            // This nested array defines the columns. Each inner array is a column.
            // "Make Your Own" is included in both Column 1 and Column 2.
            const productColumns = [
              [ // Column 1
                coastersSection,
                clocksSection,
                 lightingSection,
              ],
              [ // Column 2
                makeYourOwnSection,
              ],
            ];

            // The data for the image cards on the right.
            const cardData = [
                { caption: "New Arrivals", color: "bg-pop-red" },
                { caption: "Featured Products", color: "bg-pop-red" },
                { caption: "Studio Collections", color: "bg-pop-red" },  { caption: "Studio Collections", color: "bg-pop-red" },
            ];

            return (
              <div 
                className="absolute left-0 right-0 top-full z-50 bg-white border-t border-gray-200 shadow-lg "
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                {/* 2. LAYOUT: A simple flex container. `justify-between` creates the space. */}
                <div className="max-w-7xl  mx-auto px-12 py-6 h-full flex items-start justify-start mt-2">

                  {/* Container for the text columns */}
                  <div className="flex gap-8 h-full">
                    {/* Outer loop creates the columns */}
                    {productColumns.map((column, colIndex) => (
                      <div key={colIndex} className="w-[180px] flex-shrink-0">
                        {/* Inner loop renders the stacked sections inside each column */}
                        {column.map((section, secIndex) => (
                          <div key={secIndex} className="mb-8">
                            <Link href={section.items?.[0]?.href || '#'} className="block systematic-caps text-sm font-normal text-gray-400 mb-4 hover:text-pop-green transition-colors cursor-pointer ">
                              {section.title}
                            </Link>
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
                    ))}
                  </div>

                  {/* Container for the image cards */}
                 <div className="relative overflow-hidden"> 
                   <div className="relative  flex gap-6 w-full overflow-x-auto"><div className="w-min aboslute right-0 overflow-x-a flex gap-4">

                 {cardData.map((card, cardIndex) => (
                   <div key={cardIndex} className="w-72  px-1 bg-gray-100 rounded-md  relative h-96 cursor-pointer ">
                     <div className="absolute inset-0 flex items-center justify-center">
                       <div className="text-center">
                         <div className={`w-12 h-12 ${card.color} mx-auto mb-3 flex items-center justify-center`}>
                           <span className="text-white helvetica-bold text-xl">P</span>
                         </div>
                         <p className="systematic-caps text-xs text-gray-600 px-4">{card.caption}</p>
                       </div>
                     </div>
                   </div>
                 ))}
                 </div>
                 </div>
</div>
                 
                  </div>
                </div>
             
            );
          })()}

          {servicesOpen && (() => {
            // 1. DATA STRUCTURE
            // We define the sections that will be used.
            const studioRetainerSection = {
              title: "Studio Retainer",
              items: [
                { href: "/services#custom-products", label: "Ongoing Collection" },
             
              ],
            };
            const limitedCommissionSection = {
              title: "Limited Commission",
              items: [
                { href: "/services#collection-services", label: "Custom Collection" },
                { href: "/services#workshops-events", label: "Installations" },
               
              ],
            };
            const communityPartnersSection = {
              title: "Community Partners",
              items: [
                { href: "/services#workshops-events", label: "Material Sourcing" },
                { href: "/services#workshops-events", label: "Consignment Collection" },
              ],
            };

            // This nested array defines the columns. Each inner array is a column.
            const servicesColumns = [
              [ // Column 1
                 limitedCommissionSection,
                studioRetainerSection,
                 communityPartnersSection,
              ],
            
            ];

            // The data for the image cards on the right.
            const servicesCardData = [
                { caption: "Studio Process", color: "bg-pop-blue" },
              { caption: "Custom Collections", color: "bg-pop-blue" },
                { caption: "Universal Provenance", color: "bg-pop-blue"},


            ];

            return (
              <div 
                className="absolute left-0 right-0 top-full z-50 bg-white border-t border-gray-200 shadow-lg "
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                {/* 2. LAYOUT: A simple flex container. `justify-between` creates the space. */}
                <div className="max-w-7xl  mx-auto px-12 py-6 h-full flex items-start justify-start mt-2">

                  {/* Container for the text columns */}
                  <div className="flex gap-8 h-full">
                    {/* Outer loop creates the columns */}
                    {servicesColumns.map((column, colIndex) => (
                      <div key={colIndex} className="w-[180px] flex-shrink-0">
                        {/* Inner loop renders the stacked sections inside each column */}
                        {column.map((section, secIndex) => (
                          <div key={secIndex} className="mb-8">
                            <Link href={section.items?.[0]?.href || '#'} className="block systematic-caps text-sm font-normal text-gray-400 mb-4 hover:text-pop-green transition-colors cursor-pointer ">
                              {section.title}
                            </Link>
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
                    ))}
                  </div>

                  {/* Container for the image cards */}
                 <div className="relative overflow-hidden"> 
                   <div className="relative  flex gap-6 w-full overflow-x-auto"><div className="w-min aboslute right-0 overflow-x-a flex gap-4">

                 {servicesCardData.map((card, cardIndex) => (
                   <div key={cardIndex} className="w-72  px-1 bg-gray-100 rounded-md  relative h-96 cursor-pointer ">
                     <div className="absolute inset-0 flex items-center justify-center">
                       <div className="text-center">
                         <div className={`w-12 h-12 ${card.color} mx-auto mb-3 flex items-center justify-center`}>
                           <span className="text-white helvetica-bold text-xl">P</span>
                         </div>
                         <p className="systematic-caps text-xs text-gray-600 px-4">{card.caption}</p>
                       </div>
                     </div>
                   </div>
                 ))}
                 </div>
                 </div>
</div>
                 
                  </div>
                </div>
             
            );
          })()}
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