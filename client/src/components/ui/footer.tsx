import { Link, useLocation } from "wouter";
import logoImage from "@assets/1syx-logo2_1764931232010.jpg";
import { useState } from "react";
import { TermsModal } from "@/components/ui/terms-modal";
import { CareerModal } from "@/components/ui/career-modal";
import { PrivacyModal } from "@/components/ui/privacy-modal";

export function Footer() {
  const [showTerms, setShowTerms] = useState(false);
  const [showCareer, setShowCareer] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [location, setLocation] = useLocation();

  const handleNavigateToHash = (route: string, hash: string) => {
    if (location === route) {
      // Already on the page, just scroll to hash
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to route first, then scroll after navigation
      setLocation(route);
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <>
      <TermsModal open={showTerms} onOpenChange={setShowTerms} />
      <CareerModal open={showCareer} onOpenChange={setShowCareer} />
      <PrivacyModal open={showPrivacy} onOpenChange={setShowPrivacy} />
      <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-300 font-sans mt-auto">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-zinc-800 border-b border-zinc-800">
            {/* Block 1: Branding */}
            <div className="p-8 md:p-12 flex flex-col justify-between h-full min-h-[200px] hover:bg-zinc-900/30 transition-colors duration-500">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                      <img
                        src={logoImage}
                        alt="1SYX"
                        className="h-10 w-auto object-contain"
                      />
                  </div>
                </div>
                <br />
                <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                  1 System For Your X-Factor
                </div>
                <br />
                <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                  <div>
                    © {new Date().getFullYear()} 1SYX. All rights reserved.
                  </div>
                </div>
              </div>
            </div>

            {/* Block 2: Navigation */}
            <div className="p-8 md:p-12 flex flex-col gap-6 hover:bg-zinc-900/30 transition-colors duration-500">
              <div className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
                Navigation
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleNavigateToHash("/", "#hero")}
                  className="text-left hover:text-white transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavigateToHash("/about", "#overview")}
                  className="text-left hover:text-white transition-colors"
                >
                  About Us
                </button>
                <button
                  onClick={() => setShowCareer(true)}
                  className="text-left hover:text-white transition-colors"
                >
                  Career
                </button>
                <button
                  onClick={() => handleNavigateToHash("/waitlist", "#section-01")}
                  className="text-left hover:text-white transition-colors"
                >
                  Waitlist
                </button>
              </div>
            </div>

            {/* Block 3: Legal */}
            <div className="p-8 md:p-12 flex flex-col gap-6 hover:bg-zinc-900/30 transition-colors duration-500">
              <div className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
                Legal_Protocols
              </div>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setShowTerms(true)}
                  className="text-left hover:text-white transition-colors"
                >
                  Terms & Conditions
                </button>
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="text-left hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </div>
            </div>

            {/* Block 4: Connect & Contact */}
            <div className="p-8 md:p-12 flex flex-col gap-6 hover:bg-zinc-900/30 transition-colors duration-500">
              <div className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
                Communication
              </div>
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:contact@1syxai.com"
                  className="hover:text-white transition-colors"
                >
                  contact@1syxai.com
                </a>
                <div className="flex gap-4 pt-2">
                  <a
                    href="https://www.linkedin.com/showcase/1syx-ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all rounded-full"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/1syxAI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all rounded-full"
                  >
                    <span className="sr-only">X (Twitter)</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
