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
  User,
  Settings,
  LogOut,
} from "lucide-react";
import AuthButton from "./AuthButton";

export default function Navigation() {
  const pathname = usePathname();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

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

  const aboutItems = [
    { href: "/about#team", label: "Team" },
    { href: "/about#story", label: "Story" },
    { href: "/about#process", label: "Process" },
    { href: "/about#contact", label: "Contact" },
    { href: "/about#faq", label: "FAQ" },
  ];

  const servicesItems = [
    {
      href: "/services#community-partnerships",
      label: "Waste Audits & Impact Reports",
    },
    { href: "/services#collection-services", label: "Collection Services" },
    { href: "/services#custom-products", label: "Traceable Custom Products" },
    { href: "/services#workshops-events", label: "Workshops & Events" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-full mx-auto pt-2">
        <div className=" relative flex  justify-between h-20">
          <div className="flex mb-1">
          {/* Logo */}
          <Link href="/" className="ml-12 self-end mb-2 flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-pop-green flex items-center justify-center transition-all group-hover:bg-opacity-90 mt-1.5">
              <span className="text-white helvetica-bold text-xl">P</span>
            </div>
            <span className="helvetica-bold text-4xl mt-2 tracking-tighter text-gray-900">
              PopCycle
            </span>
          </Link>

          {/* Absolutely centered navigation links */}
          <div className="hidden self-end lg:flex items-center space-x-8 ml-8">
            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button
                className={`font-base text-normal hover:text-pop-green transition-colors flex items-center space-x-1 py-2 ${
                  pathname?.startsWith("/about") ? "nav-link-active" : ""
                }`}
              >
                <span>About</span>
              </button>

              {aboutOpen && (
                <div className="absolute top-full left-0 min-w-max bg-white border border-gray-200 whitespace-nowrap overflow-hidden mt-2">
                  {aboutItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block w-full text-left px-5 py-3 systematic-caps text-sm hover:bg-pop-green hover:text-white transition-colors"
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
              <button
                className={`font-base text-normal hover:text-pop-green transition-colors flex items-center space-x-1 py-2 ${
                  pathname === "/services" ? "nav-link-active" : ""
                }`}
              >
                <span>Services</span>
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 w-max bg-white border border-gray-200 mr-4 overflow-hidden mt-2">
                  {servicesItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block w-full text-left px-5 py-3 pr-6 systematic-caps text-sm hover:bg-pop-green hover:text-white transition-colors whitespace-normal"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Shop */}
            <Link
              href="/shop"
              className={`font-base text-normal hover:text-pop-green transition-colors py-2 ${
                pathname === "/shop" ? "nav-link-active" : ""
              }`}
            >
              Shop
            </Link>

            {/* Track */}
            <Link
              href="/track"
              className={`font-base text-normal hover:text-pop-green transition-colors py-2 ${
                pathname === "/track" ? "nav-link-active" : ""
              }`}
            >
              Track
            </Link>
          </div>
            </div>
            

          {/* Right-aligned User Menu / Auth Button */}
          <div className="hidden lg:block self-center mr-12">
            {session ? (
              <div className="relative " ref={userMenuRef}>
                
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-pop-green flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-pop-black">
                        {session.user?.name?.split(" ")[0] || "User"}
                      </div>
                      <div className="text-xs text-pop-green systematic-caps">
                        {session.user?.userType === "super_admin"
                          ? "Super Admin"
                          : "Maker"}
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-pop-black transform transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 min-w-max bg-white border border-gray-200 overflow-hidden">
                    <div className="px-5 py-3 border-b border-gray-200">
                      <div className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                        {session.user?.email}
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-pop-green hover:text-white systematic-caps whitespace-nowrap"
                      >
                        <User className="w-4 h-4 mr-3" />
                        Profile
                      </Link>

                      {hasPortalAccess && (
                        <Link
                          href="/portal"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-pop-blue hover:text-white systematic-caps whitespace-nowrap"
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Portal
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          signOut({ callbackUrl: "/" });
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-pop-red hover:text-white systematic-caps text-left whitespace-nowrap"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <AuthButton />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden self-center mr-12">
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
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            {/* About Mobile Accordion Section */}
            <div className="space-y-2">
              <button
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                className="flex items-center justify-between w-full systematic-caps text-sm font-bold text-pop-black hover:text-pop-green transition-colors"
              >
                <span>About</span>
                <ChevronRight
                  className={`w-4 h-4 transform transition-transform ${mobileAboutOpen ? "rotate-90" : ""}`}
                />
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

            {/* What We Do Mobile Accordion Section */}
            <div className="space-y-2">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center justify-between w-full systematic-caps text-sm font-bold text-pop-black hover:text-pop-blue transition-colors"
              >
                <span>What We Do</span>
                <ChevronRight
                  className={`w-4 h-4 transform transition-transform ${mobileServicesOpen ? "rotate-90" : ""}`}
                />
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

            {/* Track Mobile Section */}
            <div className="space-y-2">
              <Link
                href="/track"
                onClick={() => setMobileMenuOpen(false)}
                className="systematic-caps text-sm font-bold text-pop-black hover:text-pop-green transition-colors"
              >
                Track Our Plastic
              </Link>
            </div>

            {/* Shop Mobile Section */}
            <div className="space-y-2">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="systematic-caps text-sm font-bold text-pop-black hover:text-pop-red transition-colors"
              >
                Shop
              </Link>
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
                        <div className="systematic-caps text-sm font-bold text-pop-black">
                          {session.user?.name?.split(" ")[0] || "User"}
                        </div>
                        <div className="systematic-caps text-xs font-medium text-pop-green mt-1">
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
                      className="w-full flex items-center px-4 py-2 systematic-caps text-sm rounded-md hover:bg-pop-green hover:text-white transition-colors"
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </Link>
                    {hasPortalAccess && (
                      <Link
                        href="/portal"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full flex items-center px-4 py-2 systematic-caps text-sm rounded-md hover:bg-pop-blue hover:text-white transition-colors"
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
                      className="w-full flex items-center px-4 py-2 systematic-caps text-sm rounded-md hover:bg-pop-red hover:text-white transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <AuthButton />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
