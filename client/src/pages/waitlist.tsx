import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";
import logoImage from "@assets/1syx-logo2_1764931232010.jpg";
import { Footer } from "@/components/ui/footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  X,
  Check,
  Play,
  RefreshCw,
  Brain,
  Search,
  Shapes,
  Activity,
  Wrench,
  ChevronRight,
  Zap,
  Target,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type React from "react";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";

// Import Assets
import noiseTexture from "@assets/generated_images/subtle_digital_noise_texture_with_red_accent.png";
import blueprintImage from "@assets/generated_images/technical_blueprint_of_data_flow.png";
import executivesImage from "@assets/generated_images/heroWaitlist6.jpeg";
import facadeImage from "@assets/generated_images/abstract_steel_glass_facade_texture.png";
import analysisVideo from "@assets/1syx-record.mp4";
import linkedinPostImage from "@assets/linkedin_postimage/WhatsApp Image 2025-12-23 at 20.06.11_1ed41664.jpg";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  email: z
    .string()
    .email({ message: "Please enter a valid work email address." }),
  linkedin: z.string().url({ message: "Please enter a valid LinkedIn URL." }),
  hierarchy: z.enum(
    [
      "Intern",
      "Jr Management",
      "Sr. Management",
      "Director",
      "GM",
      "VP",
      "CXO",
    ],
    {
      required_error: "Please select your hierarchy level.",
    },
  ),
  function: z.enum(["Marketing", "Sales", "Product", "Agency"], {
    required_error: "Please select your function.",
  }),
  companySize: z.string({ required_error: "Please select company size." }),
  useCase: z.string({ required_error: "Please select your primary use case." }),
  painPoint: z.string({ required_error: "Please select what hurts most." }),
  currentSolution: z.string({
    required_error: "Please select how you handle this today.",
  }),
  suggestions: z.string().optional(),
  terms: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
});

const Section = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <section id={id} className={className}>
    {children}
  </section>
);

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const ParallaxBackground = ({
  src,
  opacity = 0.5,
  scale = 1.1,
}: {
  src: string;
  opacity?: number;
  scale?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      <motion.div style={{ y, scale }} className="w-full h-full">
        <img
          src={src}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity }}
        />
      </motion.div>
    </div>
  );
};

const damageData = [
  {
    id: "strategise",
    title: "STRATEGISE",
    icon: Brain,
    feel: "“Every new campaign feels like a reset. Nobody remembers the last big narrative shift.”",
    cost: "You think you are building a compound story. Your market keeps receiving fresh noise. Old promises stay live and keep confusing new buyers. Over time, nobody outside your walls can say, in one clean line, what you stand for.",
    missing: [
      "A memory that retains strategy, tone and rules with zero fatigue",
      "A brain that tracks competitor moves and market direction",
      "A way to see how a narrative change plays out before you bet a quarter on it",
    ],
  },
  {
    id: "study",
    title: "STUDY",
    icon: Search,
    feel: "“Your team spends hours researching competitors, but insights never translate into action.”",
    cost: "Analysis paralysis becomes your default. You repeat the same mistakes with new words. Opportunities slip while you are still gathering data, and nobody can say why a piece actually worked.",
    missing: [
      "Live competitive intelligence that updates on its own",
      "Pattern recognition across message and outcome, not just clicks",
      "Actionable signals that connect straight into your content strategy",
    ],
  },
  {
    id: "sync",
    title: "SYNC",
    icon: RefreshCw,
    feel: "“Your website says one thing, your sales deck says another, your emails sound like a third company.”",
    cost: "Prospects hear a different story at each touch. Trust never compounds. Champions struggle to explain you inside their org. Deals die, not because of product, but because nobody can repeat your value in one clear sentence.",
    missing: [
      "A single source of truth for brand voice and positioning",
      "Automatic consistency checks across content channels",
      "Version control for messaging that keeps everyone aligned",
    ],
  },
  {
    id: "shape",
    title: "SHAPE",
    icon: Shapes,
    feel: "“You know your brand needs to evolve, but every change feels like starting from scratch.”",
    cost: "Your positioning stays frozen while the market moves. Relevance fades quarter by quarter. Each new idea turns into another heavy lift instead of flowing through a system.",
    missing: [
      "An adaptive positioning frame that evolves with real feedback",
      "Intelligence on which narrative angles actually land",
      "Gradual refinement so you do not shock the market with random pivots",
    ],
  },
  {
    id: "sense",
    title: "SENSE",
    icon: Activity,
    feel: "“You publish content into the void. No idea what is working or why it resonates.”",
    cost: "You repeat failures and abandon quiet winners. Every campaign feels like a coin flip. You keep paying for traffic into lines nobody has ever properly stress tested.",
    missing: [
      "Performance tracking tied directly to narrative elements",
      "A way to see what buyers truly react to, beyond surface metrics",
      "A way to predict which messages will hit before you ship them",
    ],
  },
  {
    id: "solve",
    title: "SOLVE",
    icon: Wrench,
    feel: "“Creating content takes forever. Every piece requires starting from a blank page.”",
    cost: "Your team burns out on production. Strategic thinking gets crowded out by execution. You keep shipping safe, forgettable lines because nobody has energy left to fight for sharper ones.",
    missing: [
      "An engine trained on your positioning, not generic prompts",
      "A library that speeds output without flattening your voice",
      "A quality layer that stops off brand or low consequence copy from going live",
    ],
  },
];

// New Feature Data
const featuresData = [
  {
    id: 0,
    heading: "Waitlist Members Get",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="text-xl font-bold mb-2">
            One full <span className="text-3xl">1</span>SYX diagnostic on one
            brand
          </h4>
          <p className="text-zinc-400 leading-relaxed">
            Your website, landing pages, pricing, PDPs, blogs, comparison pages,
            market perception scan, competitor scan, social media scan, GAP
            heatmap, diagnostic radar, insight report, prioritised content road
            map and a 4 week campaign outline.
          </p>
        </div>
        <div>
          <h4 className="text-xl font-bold mb-2">
            Daily content from your activation date till 31 January
          </h4>
          <p className="text-zinc-400 leading-relaxed mb-4">
            One content piece per day. You choose the format:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-400">
            <li>
              Blog with stock images, landing or website copy, ad set, outbound
              or nurture email, faceless video script, infographic outline or
              slide deck outline.
            </li>
            <li>Free stock images or stock style video ideas included.</li>
            <li>Unused daily content slots do not roll over.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 1,
    heading: "Daily 1 winner",
    content: (
      <div className="space-y-6">
        <h4 className="text-xl font-bold mb-2">
          Each day in January, one waitlist member receives a 10x content
          upgrade.
        </h4>
        <ul className="list-disc pl-5 space-y-3 text-zinc-400">
          <li>
            Generate up to 10 content pieces per day for the remaining days in
            January instead of 1.
          </li>
          <li>
            No roll over. Unused content slots on any day expire at the end of
            that day.
          </li>
          <li>Diagnostic stays one per account.</li>
          <li>Eligibility: you have completed your diagnostic.</li>
          <li>
            Eligibility: you have given 1SYX a public shoutout on LinkedIn about
            joining the Jan Waitlist.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 2,
    heading: "What after Jan26",
    content: (
      <div className="space-y-6">
        <ul className="list-disc pl-5 space-y-3 text-zinc-400">
          <li>
            Waitlist acceptance window is open only till midnight on 31 December
            2025.
          </li>
          <li>We will accept a maximum of 1,000 Jan Waitlist accounts.</li>
          <li>No credit card needed for Jan Waitlist access.</li>
          <li>
            You keep everything 1SYX creates for you. After 31 January, new
            diagnostics and new content generation pause unless you move to a
            paid plan.
          </li>
          <li>
            If you discover 1SYX after 31 January, you will still get a 1 week
            free trial with a fixed credit limit instead of Jan Waitlist access.
          </li>
        </ul>
      </div>
    ),
  },
];

const WaitlistFeatures = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Calculate rotation: Active item should be at 0 degrees (Right side/3 o'clock)
  // We have 3 items distributed over 360 degrees (120 deg apart)
  // Item 0: 0 deg
  // Item 1: 120 deg
  // Item 2: 240 deg
  // To bring Item i to 0 deg, we rotate the wheel by -ItemAngle
  const rotation = -activeIndex * 120;

  return (
    <Section id="section-03" className="py-20 md:py-32 px-6 bg-zinc-950 border-b border-border relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Fixed Heading */}
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <div className="font-mono text-6xl font-bold text-zinc-800 mb-4">
            03
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
            <span className="text-7xl">1</span>SYX Waitlist (Jan 2026) is open
            now{" "}
            <span className="text-zinc-500 text-2xl md:text-4xl block md:inline mt-2 md:mt-0">
              (limited seats)
            </span>
          </h2>
          <p className="text-accent text-lg md:text-xl font-mono uppercase tracking-wider">
            Every day, 1 waitlist member gets a 10x boost
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 min-h-[600px]">
          {/* Left Side: Interactive Wheel (40%) */}
          <div className="w-full lg:w-[40%] flex justify-center items-center relative h-[400px] md:h-[500px]">
            {/* The Wheel Container */}
            <motion.div
              className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-zinc-800 flex items-center justify-center"
              animate={{ rotate: rotation }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
              {/* Center Content (Static relative to wheel, so needs counter-rotation to stay upright) */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                animate={{ rotate: -rotation }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-zinc-900 border border-zinc-700 flex flex-col items-center justify-center text-center p-4 shadow-2xl z-20 relative">
                  <div className="text-2xl md:text-3xl font-bold text-white font-mono tracking-tighter">
                    1SYX
                  </div>
                </div>
                {/* Decorative dashed circle */}
                <div className="absolute inset-0 m-auto w-[200%] h-[200%] border border-dashed border-zinc-800 rounded-full opacity-20 pointer-events-none" />
              </motion.div>

              {/* Interactive Headings on Circumference */}
              {featuresData.map((feature, index) => {
                // Position calculation (Angle in radians)
                const angleDeg = index * 120;
                const angleRad = (angleDeg * Math.PI) / 180;
                // Radius is 50% of width + some spacing.
                // Actually, let's put them ON the circle edge.
                // CSS transform translate moves relative to center.
                // x = r * cos(a), y = r * sin(a)
                // BUT, 0 degrees in CSS rotate is usually "Up" or "Right" depending.
                // Let's use simple CSS rotate and translate.
                // Rotate container to angle, translate outward, then counter-rotate text.

                const isActive = activeIndex === index;

                return (
                  <motion.div
                    key={feature.id}
                    className="absolute top-1/2 left-1/2 w-48 -ml-24 -mt-6 cursor-pointer z-30 flex items-center justify-center"
                    style={{
                      transform: `rotate(${angleDeg}deg) translate(150px) rotate(-${angleDeg}deg)`, // Initial static position logic - wait
                      // We need them to stay fixed to the wheel structure.
                      // When wheel rotates, they move with it.
                      // But we need the TEXT inside to stay upright.
                    }}
                    // Replacing style with motion animate to sync counter-rotation
                    animate={{
                      rotate: -rotation, // Counter rotate to keep text upright as wheel spins
                    }}
                    // Wait, the POSITION on the wheel is fixed. The ORIENTATION of the component needs to adjust.
                    // Let's rethink structure.
                    // Wheel rotates.
                    // Item is at `rotate(120deg) translateX(200px)` relative to wheel center.
                    // This item rotates with wheel.
                    // Inside item, we have text. Text needs `rotate(-TotalWheelRotation - ItemOffsetRotation)`?
                    // No, simpler: Text needs `rotate(-TotalWheelRotation)` if the item itself didn't rotate its local axis.
                    // But `rotate(120deg)` rotates local axis.
                    // So Text needs `rotate(-120deg - rotation)`.
                  >
                    {/* We need a wrapper to position it on the circle first */}
                  </motion.div>
                );
              })}

              {/* Let's try a different approach for the items to ensure stability */}
              {featuresData.map((feature, index) => {
                const angleDeg = index * 120;
                return (
                  <div
                    key={feature.id}
                    className="absolute w-full h-full top-0 left-0 pointer-events-none"
                    style={{ transform: `rotate(${angleDeg}deg)` }}
                  >
                    {/* This places the item at the "Right" (0 deg) edge, then rotated by angleDeg */}
                    <div
                      className="absolute top-1/2 right-[-60px] md:right-[-80px] -mt-10 w-40 md:w-56 pointer-events-auto flex items-center justify-start"
                      onClick={() => setActiveIndex(index)}
                    >
                      {/* The Dot */}
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full border-2 transition-all duration-300 mr-4 shrink-0",
                          activeIndex === index
                            ? "bg-accent border-accent shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                            : "bg-zinc-950 border-zinc-700 hover:border-zinc-500",
                        )}
                      />

                      {/* The Text - Needs to counter-rotate carefully */}
                      <motion.div
                        animate={{ rotate: -rotation - angleDeg }}
                        transition={{
                          type: "spring",
                          stiffness: 50,
                          damping: 20,
                        }}
                        className={cn(
                          "text-sm md:text-base font-bold transition-all duration-300 select-none text-left",
                          activeIndex === index
                            ? "text-white scale-110"
                            : "text-zinc-600 hover:text-zinc-400",
                        )}
                      >
                        {feature.heading}
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Side: Content (60%) */}
          <div className="w-full lg:w-[60%] pl-0 lg:pl-12 min-h-[400px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-zinc-900/50 border border-zinc-800 p-8 md:p-12 rounded-xl w-full backdrop-blur-sm"
              >
                <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6">
                  Selected Module {activeIndex + 1}/3
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-8">
                  {featuresData[activeIndex].heading}
                </h3>
                <div className="text-base md:text-lg text-zinc-300">
                  {featuresData[activeIndex].content}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
};

import { TermsModal } from "@/components/ui/terms-modal";

export default function Waitlist() {
  const { toast } = useToast();
  const [activeDamage, setActiveDamage] = useState(damageData[0]);
  const [showTerms, setShowTerms] = useState(false);
  const [location] = useLocation();
  const [activeSection, setActiveSection] = useState<string>("section-01");
  const [showVideoOverlay, setShowVideoOverlay] = useState(true);


  // Scroll to hash on load
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setActiveSection(id);
        }
      }, 100);
    }
  }, [location]);

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["section-01", "section-02", "section-03", "section-04"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const elementTop = element.offsetTop;
          if (scrollPosition >= elementTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section handler
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  // Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [upgradeOption, setUpgradeOption] = useState<"yes" | "no" | null>(null);
  const [pendingFormData, setPendingFormData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // LinkedIn Post Preview/Edit Modal State
  const [showPostPreviewModal, setShowPostPreviewModal] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [postContentConfirmed, setPostContentConfirmed] = useState(false);
  
  // LinkedIn Post Success Modal State
  const [showLinkedInSuccessModal, setShowLinkedInSuccessModal] = useState(false);
  
  // Default post content (editable part only, without hashtags and link)
  const defaultPostContent = `I came across 1SYX (a KLYRR Labs Product), a new tool trying to fix how brands explain what they do and turn that into content.

Felt interesting enough to back the effort, so I have joined their Jan 2026 waitlist.

If it works, it could help with clearer story, cleaner messaging and more useful content. If it does not, at least a serious attempt was made.

Doing my bit to support a budding entrepreneur who is building in public.`;

  // Fixed parts (not editable)
  const postHashtags = `#1syx #1syxai #StrategicMarketing #KLYRRLabs #ContentMarketing #Marketing #MarketingOps #GoToMarketAlignment`;
  const postLink = `Check out 1SYX: https://www.linkedin.com/showcase/1syx-ai/`;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      linkedin: "",
      suggestions: "",
      terms: false,
    },
  });

  // Handle OAuth callback success/error messages
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get("success");
    const error = urlParams.get("error");
    const message = urlParams.get("message");

    if (success === "true") {
      // Show beautiful success modal instead of toast
      setShowLinkedInSuccessModal(true);
      // Reset form and close modals
      form.reset();
      setPendingFormData(null);
      setShowSuccessModal(false);
      setUpgradeOption(null);
      
      // Clean up URL parameters immediately
      window.history.replaceState({}, "", window.location.pathname);
      
      // Auto-dismiss modal after 3 seconds
      const autoDismissTimer = setTimeout(() => {
        setShowLinkedInSuccessModal(false);
      }, 3000);
      
      // Clean up timer if component unmounts
      return () => {
        clearTimeout(autoDismissTimer);
      };
    } else if (error) {
      const toastId = toast({
        title: "Error",
        description: decodeURIComponent(message || "Something went wrong. Please try again."),
        variant: "destructive",
      });
      // Auto-dismiss toast after 5 seconds
      setTimeout(() => {
        toastId.dismiss();
      }, 5000);
      // Clean up URL parameters
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [location, toast, form]);

  // Step 1: Validate form and show modal (don't save to DB yet)
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { terms, ...dataToSubmit } = values;
    setPendingFormData(dataToSubmit);
    setUpgradeOption(null);
    setShowSuccessModal(true);
  }

  // Step 2: Save to Google Sheets via API
  async function saveToDatabase(wantsUpgrade: "yes" | "no") {
    if (!pendingFormData) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/waitlist/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...pendingFormData,
          wantsUpgrade,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to submit form");
      }

      toast({
        title: "Form Submitted!",
        description: "Thank you for joining the waitlist!",
      });
      
      form.reset();
      setPendingFormData(null);
      setShowSuccessModal(false);
      return true;
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  // Handle "Do not add me" confirm
  const handleConfirmNoUpgrade = async () => {
    await saveToDatabase("no");
  };

  // Handle LinkedIn post button click - show preview modal
  const handleLinkedInPost = () => {
    if (!pendingFormData) return;
    
    // Initialize post content with default if not set
    if (!postContent) {
      setPostContent(defaultPostContent);
    }
    
    // Reset confirmation checkbox
    setPostContentConfirmed(false);
    
    // Show preview modal
    setShowPostPreviewModal(true);
  };

  // Handle actual LinkedIn OAuth redirect after confirmation
  const handleConfirmAndPost = () => {
    if (!pendingFormData || !postContentConfirmed || !postContent.trim()) return;
    
    // Combine editable content with fixed hashtags and link
    const fullPostText = `${postContent.trim()}\n\n${postLink}\n\n${postHashtags}`;
    
    // Encode form data and post content to pass to OAuth flow
    const dataToSend = {
      ...pendingFormData,
      postContent: fullPostText,
    };
    const encodedFormData = encodeURIComponent(JSON.stringify(dataToSend));
    
    // Close modal and redirect to LinkedIn OAuth endpoint
    setShowPostPreviewModal(false);
    window.location.href = `/api/linkedin/auth?formData=${encodedFormData}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-4 md:p-6 border-b border-border flex justify-between items-center sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <Link href="/">
          <a className="text-2xl font-bold tracking-tighter font-mono">
            <img
                src={logoImage}
                alt="1SYX"
                className="h-10 w-auto object-contain" 
              />
              </a>
        </Link>
        
        <div className="flex items-center gap-4">
          {/* Section Navigation Buttons */}
          <div className="flex items-center gap-2">
            {[
              { num: "02", label: "STACKED DAMAGE" },
              { num: "03", label: "WAITLIST PERKS" },
              { num: "04", label: "SUBMIT FORM" },
            ].map(({ num, label }) => {
              const sectionId = `section-${num}`;
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={sectionId}
                  onClick={() => scrollToSection(sectionId)}
                  className={cn(
                    "font-mono font-bold text-xs md:text-sm px-2 md:px-3 py-1.5 transition-colors",
                    isActive
                      ? "text-foreground border-b-2 border-accent"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <Link href="/#hero">
            <Button
              variant="ghost"
              className="font-mono text-xs uppercase tracking-wider"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex-1">
        {/* 01 Identity / Hero Section */}
        <section
          id="section-01"
          className="min-h-screen lg:h-screen relative overflow-hidden border-b border-border flex items-center py-12 lg:py-0 scroll-mt-32"
        >
          <ParallaxBackground src={executivesImage} opacity={40} scale={1} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent/20 z-10"></div>

          <div className="container mx-auto px-6 relative z-20 grid grid-cols-1 lg:grid-cols-[40%_60%] h-full items-center gap-12">
            <div className="max-w-2xl py-12">
              <div className="font-mono text-6xl font-bold text-zinc-800 mb-4">
                01
              </div>
              <FadeIn>
                <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
                  Your brand’s <br />
                  X-factor,{" "}
                  <span className="text-accent">under inspection</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                  The engine that stops your content from pretending it works.
                  1SYX is a marketing intelligence system that reads your story
                  like a sceptical buyer, not a friendly agency.
                </p>
              </FadeIn>

              <div className="space-y-4 mb-12">
                {[
                  "No more generic content",
                  "No more guessing your narrative",
                  "No more copying competitors",
                  "One system that aligns everything you say with what actually moves deals",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                    <p className="text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Video Placeholder */}
            <div
              className="w-full lg:h-full relative mt-8 lg:mt-0 flex items-center justify-center"
              style={{ paddingRight: "5%", paddingLeft: "5%" }}
            >
              <div className="w-full aspect-video bg-white relative overflow-hidden border border-zinc-800 shadow-2xl group">
                <video
                  className="w-full h-full object-contain transition-all duration-700"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={analysisVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Blur Overlay - Click to reveal */}
                {showVideoOverlay && (
                  <div
                    onClick={() => setShowVideoOverlay(false)}
                    className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center bg-background/30 backdrop-blur-md transition-opacity duration-300"
                  >
                    <div className="text-center">
                      <p className="font-mono text-sm md:text-base font-bold text-foreground uppercase tracking-widest">
                        Click for sneak peek
                      </p>
                    </div>
                  </div>
                )}

                

                {/* Grid overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 The Stacked Damage (Redesigned) */}
        <Section
          id="section-02"
          className="py-20 md:py-32 px-6 bg-zinc-950 text-white border-b border-border relative overflow-hidden"
        >
          {/* Background Texture */}
          <ParallaxBackground src={facadeImage} opacity={0.5} />

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
              {/* Left Column: Navigation */}
              <div className="md:w-1/3 lg:w-1/4 shrink-0">
                <div className="font-mono text-6xl font-bold text-zinc-800 mb-4">
                  02
                </div>
                <h2 className="text-2xl font-bold mb-6 uppercase tracking-tight">
                  The Stacked Damage
                </h2>
                <p className="text-zinc-400 mb-8 text-sm leading-relaxed">
                  Your brand is living with missing functions. Each one looks
                  harmless on its own. Together they create a stack of
                  consequences that bleeds attention, trust and revenue.
                </p>

                <div className="space-y-1">
                  {damageData.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveDamage(item)}
                      className={cn(
                        "w-full flex items-center justify-between p-4 text-left transition-all duration-300 font-mono text-sm uppercase tracking-wider border-l-2",
                        activeDamage.id === item.id
                          ? "border-accent bg-white/5 text-white"
                          : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/5",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon
                          className={cn(
                            "w-4 h-4",
                            activeDamage.id === item.id
                              ? "text-accent"
                              : "opacity-50",
                          )}
                        />
                        <span>{item.title}</span>
                      </div>
                      {activeDamage.id === item.id && (
                        <ChevronRight className="w-4 h-4 text-accent" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Content */}
              <div className="md:w-2/3 lg:w-3/4 min-h-[600px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDamage.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* What you feel */}
                    <div className="border border-zinc-800 p-8 rounded-sm bg-zinc-950/80 backdrop-blur-md">
                      <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest mb-4">
                        <ChevronRight className="w-3 h-3" /> This is what you
                        feel
                      </div>
                      <p className="text-xl md:text-2xl font-serif italic text-white leading-relaxed">
                        {activeDamage.feel}
                      </p>
                    </div>

                    {/* Real Cost */}
                    <div className="bg-gradient-to-br from-red-950/30 to-transparent border border-red-900/30 p-8 rounded-sm backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase tracking-widest mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />{" "}
                        The Real Cost
                      </div>
                      <p className="text-zinc-300 leading-relaxed">
                        {activeDamage.cost}
                      </p>
                    </div>

                    {/* Missing Components */}
                    <div className="space-y-2">
                      <div className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-2 px-1">
                        System Components Missing
                      </div>
                      {activeDamage.missing.map((miss, idx) => (
                        <div
                          key={idx}
                          className="border border-zinc-800 p-4 bg-zinc-900/50 flex items-center gap-4 hover:border-zinc-700 transition-colors"
                        >
                          <span className="text-zinc-600 font-mono text-xs">
                            0{idx + 1}
                          </span>
                          <span className="text-zinc-300 text-sm">{miss}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Section>

        {/* 03 Features Section (New) */}
        <WaitlistFeatures />

        {/* 04 Join Waitlist Form (Renamed from 03) */}
        <Section id="section-04" className="py-20 md:py-32 px-6 bg-background">
          <div className="container mx-auto max-w-5xl">
            <div className="font-mono text-6xl font-bold text-zinc-800 mb-4">
              04
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-serif">
                  Inviting Early Adopters.
                </h2>
                <p className="text-muted-foreground">
                  Fill this out. It takes 45 seconds.
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="bg-secondary/10 border border-border p-6 md:p-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Row 1: Personal Info */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Jane Doe"
                              {...field}
                              className="bg-background rounded-none border-input focus-visible:ring-accent h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                            Work Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="jane@company.com"
                              {...field}
                              className="bg-background rounded-none border-input focus-visible:ring-accent h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                            LinkedIn Profile
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="linkedin.com/in/..."
                              {...field}
                              className="bg-background rounded-none border-input focus-visible:ring-accent h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Row 2: Professional Info */}
                    <FormField
                      control={form.control}
                      name="hierarchy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                            Hierarchy
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-background rounded-none border-input focus:ring-accent h-10">
                                <SelectValue placeholder="Select Level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-none">
                              {[
                                "Intern",
                                "Jr Management",
                                "Sr. Management",
                                "Director",
                                "GM",
                                "VP",
                                "CXO",
                              ].map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="function"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                            Function
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-background rounded-none border-input focus:ring-accent h-10">
                                <SelectValue placeholder="Select Function" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-none">
                              {["Marketing", "Sales", "Product", "Agency"].map(
                                (item) => (
                                  <SelectItem key={item} value={item}>
                                    {item}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="companySize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                            Company Size
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-background rounded-none border-input focus:ring-accent h-10">
                                <SelectValue placeholder="Select Size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-none">
                              <SelectItem value="1-10">
                                1-10 employees
                              </SelectItem>
                              <SelectItem value="11-50">
                                11-50 employees
                              </SelectItem>
                              <SelectItem value="51-200">
                                51-200 employees
                              </SelectItem>
                              <SelectItem value="201-500">
                                201-500 employees
                              </SelectItem>
                              <SelectItem value="501-1000">
                                501-1000 employees
                              </SelectItem>
                              <SelectItem value="1000+">
                                1000+ employees
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Row 3: The "Big" Questions + Solution */}
                    <FormField
                      control={form.control}
                      name="useCase"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                            Primary Goal (Next 90 Days)
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-background rounded-none border-input focus:ring-accent h-10">
                                <SelectValue placeholder="Pick the single job you care about most" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-none">
                              <SelectItem value="homepage">
                                Fix our homepage and key website pages
                              </SelectItem>
                              <SelectItem value="sales-deck">
                                Audit and sharpen our main sales deck and talk
                                track
                              </SelectItem>
                              <SelectItem value="email-sequences">
                                Rescue underperforming email sequences and
                                follow ups
                              </SelectItem>
                              <SelectItem value="paid-ads">
                                Judge and upgrade paid ads and social campaigns
                              </SelectItem>
                              <SelectItem value="consistency">
                                Make our story consistent across website, deck,
                                emails and calls
                              </SelectItem>
                              <SelectItem value="pipeline-proof">
                                Prove which messages actually move pipeline
                              </SelectItem>
                              <SelectItem value="team-training">
                                Train the team on one harsh standard for
                                messaging
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="painPoint"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                            Biggest Pain Point
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-background rounded-none border-input focus:ring-accent h-10">
                                <SelectValue placeholder="What hurts most right now?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-none max-w-[400px] md:max-w-[600px]">
                              {[
                                "Buyers skim our site and still do not get why we are different",
                                "Our deck feels smart but deals still stall after the first call",
                                "Outbound and nurture emails get polite opens and dead replies",
                                "We spend on ads and social but cannot link copy to real pipeline",
                                "Every channel tells a slightly different story about us",
                                "Reviews are long, political and still let vague lines slip through",
                                "We just do not know which sentences are actually working",
                              ].map((item) => (
                                <SelectItem
                                  key={item}
                                  value={item}
                                  className="whitespace-normal py-2"
                                >
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currentSolution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                            Current Solution
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-background rounded-none border-input focus:ring-accent h-10">
                                <SelectValue placeholder="How do you handle it?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-none">
                              {[
                                "In house reviews and founder or CMO edits",
                                "External agency or consultant",
                                "Generic AI tools and prompts",
                                "We just ship and hope for the best",
                                "Other",
                              ].map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mb-8">
                    <FormField
                      control={form.control}
                      name="suggestions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                            What would make 1SYX a no brainer? (Optional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Tell us what feature would make this indispensable..."
                              className="bg-background rounded-none border-input focus-visible:ring-accent h-10"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mb-6">
                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-white/20 data-[state=checked]:bg-accent data-[state=checked]:text-white"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-normal text-muted-foreground">
                              I accept the{" "}
                              <button
                                type="button"
                                onClick={() => setShowTerms(true)}
                                className="text-accent hover:underline focus:outline-none"
                              >
                                Terms and Conditions
                              </button>{" "}
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-8 border-t border-border pt-6">
                    <Button
                      type="submit"
                      className="w-full md:w-auto md:px-12 rounded-none h-12 text-base uppercase tracking-wider font-mono bg-foreground hover:bg-accent text-background hover:text-white transition-all whitespace-nowrap"
                    >
                      Submit
                    </Button>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] md:text-xs font-mono text-muted-foreground justify-center md:justify-start">
                      <span className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-accent" />
                        No credit card
                      </span>
                      <span className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-accent" />
                        Cancel anytime
                      </span>
                      <span className="flex items-center gap-2">
                        <Target className="w-3 h-3 text-accent" />
                        Daily 1 member wins 10X Upgrade
                      </span>
                    </div>
                  </div>
                </form>
              </Form>
            </motion.div>
          </div>
        </Section>
      </div>

      {/* Terms Modal */}
      <AnimatePresence>
        {showTerms && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTerms(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 shadow-2xl max-h-[80vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                <h3 className="text-xl font-serif text-white">
                  Terms and Conditions
                </h3>
                <button
                  onClick={() => setShowTerms(false)}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto custom-scrollbar text-zinc-400 space-y-4 text-sm leading-relaxed">
                <p>
                  <strong>Last Updated: December 12, 2025</strong>
                </p>
                <p>
                  Please read these Terms and Conditions ("Terms", "Terms and
                  Conditions") carefully before using the 1SYX website and
                  service operated by 1SYX ("us", "we", or "our").
                </p>
                <p>
                  Your access to and use of the Service is conditioned on your
                  acceptance of and compliance with these Terms. These Terms
                  apply to all visitors, users and others who access or use the
                  Service.
                </p>
                <p>
                  By accessing or using the Service you agree to be bound by
                  these Terms. If you disagree with any part of the terms then
                  you may not access the Service.
                </p>
                <p>
                  <strong>1. Content Analysis</strong>
                  <br />
                  Our service analyzes your marketing content. By submitting
                  content, you grant us a license to process it for the purpose
                  of providing the analysis. We do not claim ownership of your
                  content.
                </p>
                <p>
                  <strong>2. Privacy</strong>
                  <br />
                  Your use of the Service is also governed by our Privacy
                  Policy. We respect the confidentiality of your data and
                  submitted materials.
                </p>
                <p>
                  <strong>3. Limitations</strong>
                  <br />
                  In no event shall 1SYX, nor its directors, employees,
                  partners, agents, suppliers, or affiliates, be liable for any
                  indirect, incidental, special, consequential or punitive
                  damages, including without limitation, loss of profits, data,
                  use, goodwill, or other intangible losses.
                </p>
                <p>
                  <strong>4. Changes</strong>
                  <br />
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time.
                </p>
                <p className="italic opacity-60">
                  (This is a placeholder for the full legal terms and
                  conditions.)
                </p>
              </div>
              <div className="p-6 border-t border-zinc-800 bg-zinc-900/50 flex justify-end">
                <Button
                  onClick={() => setShowTerms(false)}
                  className="bg-white text-black hover:bg-zinc-200"
                >
                  I Understand
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />

      <TermsModal open={showTerms} onOpenChange={setShowTerms} />

      {/* LinkedIn Post Preview/Edit Modal */}
      <Dialog open={showPostPreviewModal} onOpenChange={setShowPostPreviewModal}>
        <DialogContent className="sm:max-w-2xl bg-zinc-950 border-zinc-800 text-white max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">
              Preview & Edit Your LinkedIn Post
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Review and customize your post before sharing. The hashtags and link will be added automatically.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto space-y-4 py-4">
            {/* Editable Content */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Post Content (Editable)
              </label>
              <Textarea
                value={postContent}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  const newContent = e.target.value;
                  if (newContent.length <= 1200) {
                    setPostContent(newContent);
                  }
                }}
                className="bg-zinc-900 border-zinc-700 text-white min-h-[200px] resize-y"
                placeholder="Write your post content here..."
              />
              <div className="flex justify-between items-center text-xs text-zinc-500">
                <span className={cn(
                  postContent.length > 1100 && "text-yellow-500",
                  postContent.length >= 1200 && "text-red-500"
                )}>
                  {postContent.length} / 1200 characters
                </span>
                {postContent.length >= 1200 && (
                  <span className="text-red-500">Character limit reached</span>
                )}
              </div>
            </div>

            {/* Fixed Link (Read-only) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Link (Automatically Added)
              </label>
              <div className="bg-zinc-900 border border-zinc-700 p-3 rounded-md text-zinc-400 text-sm">
                {postLink}
              </div>
            </div>

            {/* Fixed Hashtags (Read-only) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Hashtags (Automatically Added)
              </label>
              <div className="bg-zinc-900 border border-zinc-700 p-3 rounded-md text-zinc-400 text-sm">
                {postHashtags}
              </div>
            </div>

            {/* Preview of Full Post */}
            <div className="space-y-2 pt-4 border-t border-zinc-800">
              <label className="text-sm font-medium text-zinc-300">
                Full Post Preview
              </label>
              {/* LinkedIn-style post preview card */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-md overflow-hidden">
                {/* Image (LinkedIn shows image above text) */}
                <div className="w-full aspect-video bg-zinc-800 overflow-hidden">
                  <img
                    src={linkedinPostImage}
                    alt="LinkedIn post preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Text content */}
                <div className="p-4">
                  <div className="text-sm text-zinc-300 whitespace-pre-wrap">
                    {postContent.trim() || "(Your content will appear here)"}
                    {postContent.trim() && `\n\n${postLink}\n\n${postHashtags}`}
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation Checkbox */}
            <div className="flex items-start space-x-3 pt-2">
              <Checkbox
                id="post-confirm"
                checked={postContentConfirmed}
                onCheckedChange={(checked) => setPostContentConfirmed(checked === true)}
                className="border-zinc-600 data-[state=checked]:bg-accent data-[state=checked]:border-accent mt-1"
              />
              <label
                htmlFor="post-confirm"
                className="text-sm text-zinc-300 cursor-pointer leading-relaxed"
              >
                I confirm this content and agree to post this on LinkedIn
              </label>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2 pt-4 border-t border-zinc-800">
            <Button
              variant="outline"
              onClick={() => {
                setShowPostPreviewModal(false);
                setPostContentConfirmed(false);
              }}
              className="w-full sm:w-auto border-zinc-700 hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmAndPost}
              disabled={!postContentConfirmed || !postContent.trim() || postContent.length > 1200}
              className="w-full sm:w-auto bg-[#0077b5] hover:bg-[#006396] text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post on LinkedIn
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md bg-zinc-950 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">
              Congratulations! You are on the Jan 2026 waitlist.
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4 text-zinc-400">
              Choose if you want to join the daily 10x content upgrade.
            </p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div
                  className={cn(
                    "w-4 h-4 border flex items-center justify-center transition-colors",
                    upgradeOption === "no"
                      ? "bg-accent border-accent"
                      : "border-zinc-600 group-hover:border-zinc-400",
                  )}
                >
                  {upgradeOption === "no" && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <input
                  type="radio"
                  name="upgrade"
                  value="no"
                  className="hidden"
                  onChange={() => setUpgradeOption("no")}
                  checked={upgradeOption === "no"}
                />
                <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                  Do not add me
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group">
                <div
                  className={cn(
                    "w-4 h-4 border flex items-center justify-center transition-colors",
                    upgradeOption === "yes"
                      ? "bg-accent border-accent"
                      : "border-zinc-600 group-hover:border-zinc-400",
                  )}
                >
                  {upgradeOption === "yes" && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <input
                  type="radio"
                  name="upgrade"
                  value="yes"
                  className="hidden"
                  onChange={() => setUpgradeOption("yes")}
                  checked={upgradeOption === "yes"}
                />
                <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                  Add me
                </span>
              </label>
            </div>
          </div>
          <DialogFooter className="flex-col sm:justify-start gap-2">
            {upgradeOption === "no" && (
              <div className="w-full space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Button
                  className="w-full bg-white hover:bg-zinc-200 text-black"
                  onClick={handleConfirmNoUpgrade}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Confirm & Join Waitlist"}
                </Button>
                <p className="text-[10px] text-zinc-500 text-center uppercase tracking-wide">
                  You'll be added to the waitlist without the 10x upgrade.
                </p>
              </div>
            )}
            {upgradeOption === "yes" && (
              <div className="w-full space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Button
                  className="w-full bg-[#0077b5] hover:bg-[#006396] text-white"
                  onClick={handleLinkedInPost}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Post on LinkedIn"}
                </Button>
                <p className="text-[10px] text-zinc-500 text-center uppercase tracking-wide">
                  You enter the daily 10x content upgrade after your LinkedIn
                  post is live.
                </p>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* LinkedIn Post Success Modal with Celebration */}
      <AnimatePresence>
        {showLinkedInSuccessModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowLinkedInSuccessModal(false);
                window.history.replaceState({}, "", window.location.pathname);
              }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            />
            
            {/* Success Modal */}
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border-2 border-red-500/50 rounded-2xl shadow-2xl max-w-md w-full p-8 pointer-events-auto relative overflow-hidden"
              >
                {/* Celebration Confetti Effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        x: "50%",
                        y: "50%",
                        opacity: 1,
                        scale: 1,
                      }}
                      animate={{
                        x: `${50 + (Math.random() - 0.5) * 200}%`,
                        y: `${50 + (Math.random() - 0.5) * 200}%`,
                        opacity: 0,
                        scale: 0,
                        rotate: Math.random() * 360,
                      }}
                      transition={{
                        duration: 2,
                        delay: Math.random() * 0.5,
                        ease: "easeOut",
                      }}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: ["#ef4444", "#22c55e", "#3b82f6", "#f59e0b"][
                          Math.floor(Math.random() * 4)
                        ],
                      }}
                    />
                  ))}
                </div>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setShowLinkedInSuccessModal(false);
                    window.history.replaceState({}, "", window.location.pathname);
                  }}
                  className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="relative z-10 text-center space-y-6">
                  {/* Animated Checkmark Circle */}
                  <div className="flex justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.2,
                      }}
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/50"
                    >
                      <motion.div
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.4,
                          ease: "easeOut",
                        }}
                      >
                        <Check className="w-12 h-12 text-white stroke-[4]" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Success Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-3"
                  >
                    <h2 className="text-3xl font-serif font-bold text-white">
                      Success!
                    </h2>
                    <p className="text-lg text-zinc-300 leading-relaxed">
                      Your LinkedIn post has been created successfully!
                    </p>
                    <p className="text-sm text-zinc-400">
                      You've been added to the daily 10x content upgrade.
                    </p>
                  </motion.div>

                  {/* Pulsing Ring Effect */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.8 }}
                      animate={{
                        scale: [1, 1.2, 1.4],
                        opacity: [0.8, 0.4, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      className="absolute w-32 h-32 rounded-full border-2 border-green-500/50"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
