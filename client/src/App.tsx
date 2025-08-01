import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Track from "@/pages/track";
import TrackItem from "@/pages/track-item";
import About from "@/pages/about";
import Services from "@/pages/services";
import Shop from "@/pages/shop";
import Partners from "@/pages/partners";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash;
    
    if (hash) {
      // Wait for content to render, then scroll to anchor
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          const navHeight = 80; // Height of sticky nav bar
          const elementPosition = element.offsetTop - navHeight;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // No hash, scroll to top
      window.scrollTo(0, 0);
    }
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/shop" component={Shop} />
        <Route path="/track" component={Track} />
        <Route path="/track/:id" component={TrackItem} />
        <Route path="/partners" component={Partners} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <main>
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
