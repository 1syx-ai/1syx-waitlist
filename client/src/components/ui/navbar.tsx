import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoImage from "@assets/1syx-logo2_1764931232010.jpg";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Why 1SYX", href: "#why-it-exists" },
    { name: "How it works", href: "#what-it-does" },
    { name: "It's not for", href: "#who-it-is-for" },
    { name: "What Happens When", href: "#proof" },
  ];

  const scrollToSection = (id: string) => {
    if (location === "/") {
      // Already on home page, just scroll to section
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
      }
    } else {
      // Not on home page, navigate to home first, then scroll
      setLocation("/");
      setMobileMenuOpen(false);
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.querySelector(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleNavigateToHash = (route: string, hash: string) => {
    if (location === route) {
      // Already on the page, just scroll to hash
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setMobileMenuOpen(false);
    } else {
      // Navigate to route first, then scroll after navigation
      setLocation(route);
      setMobileMenuOpen(false);
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled
          ? "bg-white backdrop-blur-sm border-border py-4"
          : "bg-transparent py-6",
      )}
    >
      <div className="w-full px-8 flex items-center justify-between">
        <div className="flex items-center">
          <button
            key="home"
            onClick={() => scrollToSection("#hero")}
            className="flex items-center"
          >
            <img src={logoImage} alt="1SYX" className="h-10 w-auto object-contain" />
          </button>
        </div>
        

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className={cn(
                "text-sm font-medium transition-colors border border-transparent rounded-full p-2",
                link.name === "How it works"
                  ? "bg-accent text-white hover:bg-accent/90"
                  : "bg-white text-black hover:text-accent/70"
              )}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => handleNavigateToHash("/about", "#overview")}
            className="text-sm font-medium hover:text-accent/70 transition-colors bg-white border border-transparent rounded-full p-2 text-black"
          >
            About Us
          </button> 
          <Link href="/waitlist#section-01">
            <Button className="rounded-none font-mono text-xs uppercase tracking-wider bg-accent text-white hover:bg-accent/90 ">
              Join Waitlist
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-6 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className={cn(
                "text-left text-lg font-medium py-2 px-4 rounded-full",
                link.name === "How it works"
                  ? "bg-accent text-white hover:bg-accent/90"
                  : "hover:bg-secondary/50"
              )}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => handleNavigateToHash("/about", "#overview")}
            className="text-lg font-medium hover:text-accent/70 transition-colors bg-white border border-transparent rounded-full py-2 px-4 text-black w-full text-left"
          >
            About Us
          </button>
          <Link href="/waitlist#section-01">
            <Button className="w-full rounded-none mt-2 bg-accent text-white hover:bg-accent/90">
              Join Waitlist
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
