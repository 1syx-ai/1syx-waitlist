import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Waitlist from "@/pages/waitlist";
import About from "@/pages/about";
import { Navbar } from "@/components/ui/navbar";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { useLocation } from "wouter";

function Router() {
  const [location] = useLocation();
  
  // Show navbar on home and about pages (Waitlist has its own header)
  const showNavbar = location === "/" || location === "/about";

  return (
    <>
      {showNavbar && <Navbar />}
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/waitlist" component={Waitlist} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <ScrollToTop />
      </TooltipProvider>
    </QueryClientProvider>
  );
}



export default App;
