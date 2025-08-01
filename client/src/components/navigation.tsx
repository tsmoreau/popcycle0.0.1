import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/track", label: "Track" },
    { path: "/about", label: "About" },
    { path: "/partners", label: "Partners" },
  ];

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
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`systematic-caps text-sm hover:text-pop-green transition-colors ${
                  location === item.path ? "nav-link-active" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
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
