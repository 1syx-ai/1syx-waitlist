import { useRef, useState, useEffect, type ReactNode, type CSSProperties, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import logoImage from "@assets/1syx-logo2_1764931232010.jpg";
import analysisVideo from "@assets/1syx-record.mp4";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Check,
  AlertCircle,
  X as XIcon,
  Search,
  FileText,
  Mail,
  LayoutTemplate,
  MessageSquare,
  ChevronRight,
  MousePointerClick,
  Pilcrow,
  Layout,
  Presentation,
  Megaphone,
  User,
  ShieldAlert,
  ScanSearch,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

// Import generated assets
import noiseTexture from "@assets/generated_images/subtle_digital_noise_texture_with_red_accent.png";
import blueprintImage from "@assets/generated_images/technical_blueprint_of_data_flow.png";
import skylineImage from "@assets/generated_images/imposing_corporate_skyline_low_angle_bw.png";
import { Footer } from "@/components/ui/footer";
import glassOfficeImage from "@assets/generated_images/cold_glass_wall_office_abstract.png";
import executivesImage from "@assets/generated_images/executives_in_motion_blur_bw.png";
import faqImage from "@assets/faq_1764753361571.jpeg";
import patternImage from "@assets/chicago 2.jpg";

const Section = ({
  children,
  className,
  id,
  style,
  background,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  background?: ReactNode;
}) => (
  <section
    id={id}
    className={cn("py-20 md:py-32 px-6 relative overflow-hidden", className)}
    style={style}
  >
    {background}
    <div className="container mx-auto max-w-5xl relative z-10">{children}</div>
  </section>
);

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: ReactNode;
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
  className,
}: {
  src: string;
  opacity?: number;
  scale?: number;
  className?: string;
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
          className={cn("w-full h-full object-cover", className)}
          style={{ opacity }}
        />
      </motion.div>
    </div>
  );
};

const OH_SHIT_QUESTIONS = [
  "If someone muted your logo and stripped your brand name from every asset, could you point to a single campaign and say this story alone would still make the right buyers choose you.",
  "If someone removed 20% of the copy from your homepage, would your sharpest buyer even notice which lines were gone.",
  "If your leadership told you to print one page from your entire funnel and bet your job that it actually creates pipeline, which page would you choose, and are you sure it deserves that bet.",
  "If the best competitor in your space copied your current narrative word for word, would you panic that you lost an advantage or will it be a proof that your story could belong to anyone.",
  "If you had to sit in front of your sharpest buyer and read your homepage, your main deck and your top follow up email out loud, at what point would you start wishing you could skip a part.",
  "If tomorrow you slashed ad spend by half, are you confident the remaining campaigns say anything sharp enough to survive.",
  "If a key customer printed your homepage and used it to justify choosing you to their CFO, would they sound credible or embarrassed.",
  "If you removed every metric except replies, demo requests and opportunities created, which pieces of content would you still dare to call successful.",
  "If your next brand or campaign review banned words like innovative, leading, seamless and powerful, how much of your current story would be left standing on specifics alone.",
];

const InteractiveWhoItIsFor = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(
    scrollYProgress,
    [0, 0.15, 0.2, 0.35, 0.4, 0.55, 0.6, 0.75, 0.8, 1],
    [
      "0%",
      "0%",
      "-20%",
      "-20%",
      "-40%",
      "-40%",
      "-60%",
      "-60%",
      "-80%",
      "-80%",
    ],
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.2) setActiveTab(0);
    else if (latest < 0.4) setActiveTab(1);
    else if (latest < 0.6) setActiveTab(2);
    else if (latest < 0.8) setActiveTab(3);
    else setActiveTab(4);
  });

  const scrollToTab = (index: number) => {
    if (!targetRef.current) return;
    const sectionTop = targetRef.current.offsetTop;
    const sectionHeight = targetRef.current.offsetHeight;
    const scrollHeight = sectionHeight - window.innerHeight;

    const progress = index / 4;
    const targetScroll = sectionTop + scrollHeight * progress;

    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const TABS = [
    { id: 0, label: "Who 1SYX is not for" },
    { id: 1, label: "Who is 1SYX For" },
    { id: 2, label: "What 1syx is Not" },
    { id: 3, label: "1SYX’s Difference" },
    { id: 4, label: "What Now" },
  ];

  return (
    <section
      id="who-it-is-for"
      ref={targetRef}
      className="relative h-[500vh] bg-zinc-950 scroll-mt-32"
    >
      <div className="sticky top-5 h-screen flex flex-col overflow-hidden">
        {/* Background Noise */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img
            src={noiseTexture}
            alt=""
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        {/* Header - Static */}
        <div className="container mx-auto relative z-10 text-center shrink-0" style={{ paddingLeft: 'clamp(1rem, 3vw, 1.5rem)', paddingRight: 'clamp(1rem, 3vw, 1.5rem)', paddingTop: 'clamp(2rem, 6vw, 3rem)', paddingBottom: 'clamp(0.75rem, 2vw, 1.25rem)' }}>
          <h2 className="font-serif text-white" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', marginBottom: 'clamp(0.75rem, 2vw, 1.25rem)' }}>
            You are not buying a pretty report.
          </h2>
          <p className="text-zinc-400 max-w-4xl mx-auto" style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)', marginBottom: 'clamp(0.75rem, 2vw, 1.25rem)' }}>
            You are buying a system that refuses to let vague, generic, safe
            lines sit between you and revenue.
          </p>

          {/* Tabs Navigation */}
          <div className="flex justify-center mb-0 md:mb-2">
            <div className="inline-flex bg-zinc-900/80 backdrop-blur-md rounded-full border border-zinc-800 shadow-xl z-50" style={{ padding: 'clamp(0.25rem, 0.5vw, 0.5rem)' }}>
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToTab(tab.id)}
                  className={cn(
                    "rounded-full font-mono uppercase tracking-wider transition-all duration-300",
                    activeTab === tab.id
                      ? "bg-zinc-100 text-zinc-900 font-bold shadow-md scale-105"
                      : "text-red-500 hover:text-zinc-300 hover:bg-zinc-800/50",
                  )}
                  style={{ paddingLeft: 'clamp(0.5rem, 1.5vw, 1rem)', paddingRight: 'clamp(0.5rem, 1.5vw, 1rem)', paddingTop: 'clamp(0.25rem, 0.75vw, 0.5rem)', paddingBottom: 'clamp(0.25rem, 0.75vw, 0.5rem)', fontSize: 'clamp(0.625rem, 1vw, 0.75rem)' }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Area */}
        <div className="flex-1 relative z-10 flex items-start">
          <motion.div style={{ x }} className="flex items-start">
            {/* Card 2: The Mismatch (Dark/Warning) */}
            <div className="w-screen h-full flex items-start justify-center flex-shrink-0" style={{ paddingLeft: 'clamp(0.5rem, 3vw, 2rem)', paddingRight: 'clamp(0.5rem, 3vw, 2rem)' }}>
              <div className="w-full bg-zinc-50 border border-zinc-800 text-zinc-900 rounded-sm overflow-hidden relative group flex flex-col shadow-2xl" style={{ maxWidth: 'clamp(280px, 40vw, 42rem)' }}>
                <div className="h-2 bg-red-600 w-full shrink-0"></div>
                {/* Diagonal Stripes Pattern Overlay */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 10px, #ef4444 10px, #ef4444 11px)",
                  }}
                ></div>

                <div className="flex flex-col h-full min-h-0" style={{ padding: 'clamp(0.75rem, 2vw, 1.5rem)' }}>
                  <div className="flex justify-between items-start shrink-0" style={{ marginBottom: 'clamp(0.25rem, 0.75vw, 0.5rem)' }}>
                    <div>
                      <h3 className="font-serif font-bold text-zinc-900" style={{ fontSize: 'clamp(0.875rem, 2vw, 1.25rem)', marginBottom: 'clamp(0.25rem, 0.5vw, 0.5rem)' }}>
                        Who <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.75rem)' }}>1</span>SYX is not for
                      </h3>
                      <p className="text-red-500 font-mono uppercase tracking-wider" style={{ fontSize: 'clamp(0.5rem, 0.875vw, 0.625rem)', marginBottom: 'clamp(0.25rem, 0.75vw, 0.5rem)' }}>
                        Status: Disqualified
                      </p>
                      <p className="text-zinc-900 font-mono uppercase tracking-wider" style={{ fontSize: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                        1SYX is not for people who
                      </p>
                    </div>
                    <div className="border border-red-500/30 text-red-500 flex items-center justify-center rounded-full bg-red-500/10" style={{ width: 'clamp(2rem, 4vw, 2.5rem)', height: 'clamp(2rem, 4vw, 2.5rem)' }}>
                      <XIcon style={{ width: 'clamp(1rem, 2vw, 1.25rem)', height: 'clamp(1rem, 2vw, 1.25rem)' }} />
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 min-h-0 overflow-y-auto" style={{ gap: 'clamp(0.125rem, 0.5vw, 0.375rem)', marginBottom: 'clamp(0rem, 0.5vw, 0.5rem)' }}>
                    {[
                      "Want tools that flatter, not tools that tell the truth",
                      "Expect AI to fix growth while the story stays vague",
                      "Blame leads, channels or budget instead of the message",
                      "Treat copy as \"creative\" and beyond hard judgment",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start hover:bg-red-500/5 transition-colors rounded-sm border border-transparent hover:border-red-500/10"
                        style={{ gap: 'clamp(0.25rem, 1vw, 0.5rem)', padding: 'clamp(0.25rem, 0.75vw, 0.5rem)' }}
                      >
                        <XIcon className="text-red-600 shrink-0" style={{ width: 'clamp(0.75rem, 1.5vw, 1rem)', height: 'clamp(0.75rem, 1.5vw, 1rem)', marginTop: 'clamp(0.125rem, 0.25vw, 0.25rem)' }} />
                        <span className="text-zinc-900 leading-snug" style={{ fontSize: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-zinc-800 shrink-0" style={{ paddingTop: 'clamp(0.25rem, 0.75vw, 0.5rem)' }}>
                    <p className="text-zinc-500 italic" style={{ fontSize: 'clamp(0.5rem, 0.875vw, 0.625rem)', marginBottom: 'clamp(0.125rem, 0.5vw, 0.25rem)' }}>
                      System Warning:
                    </p>
                    <p className="font-medium text-red-500 italic leading-tight border-l-2 border-red-600" style={{ fontSize: 'clamp(0.5rem, 1vw, 0.75rem)', paddingLeft: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                      "If you are fine betting another quarter on untested
                      messaging, you do not need 1SYX."
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Card 1: The Fit (White/Clean) */}
            <div className="w-screen h-full flex items-start justify-center flex-shrink-0" style={{ paddingLeft: 'clamp(0.5rem, 3vw, 2rem)', paddingRight: 'clamp(0.5rem, 3vw, 2rem)' }}>
              <div className="w-full bg-zinc-50 text-zinc-900 rounded-sm overflow-hidden relative group flex flex-col shadow-2xl" style={{ maxWidth: 'clamp(280px, 40vw, 42rem)' }}>
                <div className="h-2 bg-red-500 w-full shrink-0"></div>
                <div className="flex flex-col h-full min-h-0" style={{ padding: 'clamp(0.75rem, 2vw, 1.5rem)' }}>
                  <div className="flex justify-between items-start shrink-0" style={{ marginBottom: 'clamp(0.25rem, 0.75vw, 0.5rem)' }}>
                    <div>
                      <h3 className="font-serif font-bold" style={{ fontSize: 'clamp(0.875rem, 2vw, 1.25rem)', marginBottom: 'clamp(0.25rem, 0.5vw, 0.5rem)' }}>
                        Who <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.75rem)' }}>1</span>SYX Is Really
                        Built For
                      </h3>
                      <p className="text-green-500 font-mono uppercase tracking-wider" style={{ fontSize: 'clamp(0.5rem, 0.875vw, 0.625rem)', marginBottom: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                        Status: Qualified
                      </p>
                      
                      <p className="text-zinc-900 font-mono uppercase tracking-wider" style={{ fontSize: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                        not for people who want comfort,
                        <span className="font-bold">
                          {" "}
                          but for people who{" "}
                        </span>
                      </p>
                    </div>
                    <div className="border border-green-500 bg-zinc-100 text-green-500 flex items-center justify-center rounded-full" style={{ width: 'clamp(2rem, 4vw, 2.5rem)', height: 'clamp(2rem, 4vw, 2.5rem)' }}>
                      <Check style={{ width: 'clamp(1rem, 2vw, 1.25rem)', height: 'clamp(1rem, 2vw, 1.25rem)' }} />
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 min-h-0 overflow-y-auto" style={{ gap: 'clamp(0.125rem, 0.5vw, 0.375rem)', marginBottom: 'clamp(0.25rem, 0.75vw, 0.5rem)' }}>
                    {[
                      "Know their product is stronger than their story",
                      "Prefer one sharp report sting over a slow pipeline bleed.",
                      "Are willing to see exactly where their own words are the bottleneck",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start rounded-sm hover:bg-white transition-colors border border-transparent hover:border-zinc-200"
                        style={{ gap: 'clamp(0.25rem, 1vw, 0.5rem)', padding: 'clamp(0.5rem, 1vw, 0.625rem)' }}
                      >
                        <div className="border border-zinc-400 text-zinc-900 rounded-sm flex items-center justify-center shrink-0" style={{ width: 'clamp(0.875rem, 1.5vw, 1rem)', height: 'clamp(0.875rem, 1.5vw, 1rem)', marginTop: 'clamp(0.125rem, 0.25vw, 0.25rem)' }}>
                          <div className="bg-green-500 rounded-[1px]" style={{ width: 'clamp(0.5rem, 1vw, 0.625rem)', height: 'clamp(0.5rem, 1vw, 0.625rem)' }}></div>
                        </div>
                        <p className="text-zinc-800 font-medium leading-snug" style={{ fontSize: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-zinc-300 shrink-0" style={{ paddingTop: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
                    <p className="font-mono uppercase tracking-widest text-zinc-500" style={{ fontSize: 'clamp(0.5rem, 0.875vw, 0.625rem)', marginBottom: 'clamp(0.25rem, 0.75vw, 0.5rem)' }}>
                      Designed For
                    </p>
                    <div className="flex flex-wrap" style={{ gap: 'clamp(0.25rem, 0.75vw, 0.5rem)' }}>
                      {[
                        "FOUNDERS",
                        "CMOs",
                        "HEADS OF SALES",
                        "AGENCIES",
                        "GTM OPERATORS",
                      ].map((role, i) => (
                        <span
                          key={i}
                          className="bg-white border border-green-300 font-mono text-green-600 rounded-sm"
                          style={{ paddingLeft: 'clamp(0.25rem, 0.75vw, 0.5rem)', paddingRight: 'clamp(0.25rem, 0.75vw, 0.5rem)', paddingTop: 'clamp(0.125rem, 0.5vw, 0.25rem)', paddingBottom: 'clamp(0.125rem, 0.5vw, 0.25rem)', fontSize: 'clamp(0.5rem, 0.875vw, 0.625rem)' }}
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-red-600 font-mono uppercase tracking-wider" style={{ fontSize: 'clamp(0.5rem, 1vw, 0.75rem)', marginBottom: 'clamp(0.75rem, 1.5vw, 1.5rem)' }}>
                    If you speak to an audience, 1SYX will tell you if you are
                    actually saying anything.
                  </p>
                </div>
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-zinc-200 to-transparent opacity-50 pointer-events-none"></div>
              </div>
            </div>

            {/* Card 4: What It Is Not (Outline/Contrast) */}
            <div className="w-screen h-full flex items-start justify-center flex-shrink-0" style={{ paddingLeft: 'clamp(0.5rem, 3vw, 2rem)', paddingRight: 'clamp(0.5rem, 3vw, 2rem)' }}>
              <div className="w-full border border border-zinc-800 text-zinc-900 rounded-sm overflow-hidden relative group flex flex-col bg-zinc-50 backdrop-blur-md shadow-2xl" style={{ maxWidth: 'clamp(280px, 40vw, 42rem)' }}>
                <div className="h-2 bg-red-500 w-full shrink-0"></div>

                <div className="flex flex-col h-full min-h-0" style={{ padding: 'clamp(0.75rem, 2vw, 1.5rem)' }}>
                  <div className="flex justify-between items-start shrink-0" style={{ marginBottom: 'clamp(0.5rem, 1.5vw, 1rem)' }}>
                    <div>
                      <h3 className="font-serif font-bold text-zinc-900" style={{ fontSize: 'clamp(0.875rem, 2vw, 1.25rem)', marginBottom: 'clamp(0.25rem, 0.5vw, 0.5rem)' }}>
                        What <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.75rem)' }}>1</span>SYX is not
                      </h3>
                      <p className="text-red-500 font-mono uppercase tracking-wider" style={{ fontSize: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                        Category Error
                      </p>
                    </div>
                    <div className="border border-red-500 text-red-500 flex items-center justify-center rounded-full" style={{ width: 'clamp(2rem, 4vw, 2.5rem)', height: 'clamp(2rem, 4vw, 2.5rem)' }}>
                      <XIcon style={{ width: 'clamp(1rem, 2vw, 1.25rem)', height: 'clamp(1rem, 2vw, 1.25rem)' }} />
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 min-h-0 overflow-y-auto" style={{ gap: 'clamp(0.75rem, 1.5vw, 1.25rem)', marginBottom: 'clamp(0.75rem, 1.5vw, 1.5rem)' }}>
                    <p className="text-zinc-900" style={{ fontSize: 'clamp(0.625rem, 1.25vw, 0.875rem)' }}>
                      Do not mistake it for yet another AI
                      toy, it is not
                    </p>

                    <div className="flex flex-col" style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                      {[
                        "An AI copywriter that spits out fresh content or check grammer/spelling",
                        "A slide beautifier that makes weak decks look pretty",
                        "A vanity dashboard that ONLY gives your content a score out of 100",
                        "A replacement for strategy, positioning or leadership decisions",
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start bg-zinc-150 rounded-sm border border-zinc-800/50"
                          style={{ gap: 'clamp(0.5rem, 1.5vw, 0.75rem)', padding: 'clamp(0.5rem, 1vw, 0.625rem)' }}
                        >
                          <div className="bg-red-500 rounded-full shrink-0" style={{ width: 'clamp(0.375rem, 0.75vw, 0.5rem)', height: 'clamp(0.375rem, 0.75vw, 0.5rem)', marginTop: 'clamp(0.25rem, 0.5vw, 0.375rem)' }}></div>
                          <span className="text-zinc-900 leading-snug" style={{ fontSize: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Card 3: The Differentiator (Grey/Highlight) */}
            <div className="w-screen h-full flex items-start justify-center flex-shrink-0" style={{ paddingLeft: 'clamp(0.5rem, 3vw, 2rem)', paddingRight: 'clamp(0.5rem, 3vw, 2rem)' }}>
              <div className="w-full bg-zinc-50 border border-zinc-800 text-zinc-900 rounded-sm overflow-hidden relative group flex flex-col shadow-2xl" style={{ maxWidth: 'clamp(280px, 40vw, 42rem)' }}>
                <div className="h-2 bg-red-500 w-full shrink-0"></div>
                <div className="flex flex-col h-full min-h-0" style={{ padding: 'clamp(0.75rem, 2vw, 1.5rem)' }}>
                  <div className="flex justify-between items-start shrink-0" style={{ marginBottom: 'clamp(0.25rem, 0.75vw, 0.5rem)' }}>
                    <div>
                      <h3 className="font-serif font-bold text-zinc-900" style={{ fontSize: 'clamp(0.875rem, 2vw, 1.25rem)', marginBottom: 'clamp(0.25rem, 0.5vw, 0.5rem)' }}>
                        What's different about{" "}
                        <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.75rem)' }}>1</span>SYX
                      </h3>
                    </div>
                    <div className="bg-red-500 text-white flex items-center justify-center rounded-full" style={{ width: 'clamp(2rem, 4vw, 2.5rem)', height: 'clamp(2rem, 4vw, 2.5rem)' }}>
                      <ShieldAlert style={{ width: 'clamp(1rem, 2vw, 1.25rem)', height: 'clamp(1rem, 2vw, 1.25rem)' }} />
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 min-h-0 overflow-y-auto" style={{ gap: 'clamp(0.75rem, 1.5vw, 1.25rem)', marginBottom: 'clamp(0.75rem, 1.5vw, 1.5rem)' }}>
                    <p className="text-zinc-900" style={{ fontSize: 'clamp(0.625rem, 1.25vw, 0.875rem)' }}>
                      Most tools try to help you write faster.{" "}
                      <span className="text-red-500 font-bold">
                        1SYX does not care how fast you write.
                      </span>{" "}
                      It cares whether the sentences that survive are worth
                      sending at all.
                    </p>

                    <div className="flex flex-col" style={{ gap: 'clamp(0.25rem, 0.75vw, 0.5rem)' }}>
                      <p className="text-zinc-500 font-mono uppercase" style={{ fontSize: 'clamp(0.5rem, 0.875vw, 0.625rem)' }}>
                        Instead of:
                      </p>
                      <ul className="flex flex-col" style={{ gap: 'clamp(0.25rem, 0.5vw, 0.375rem)' }}>
                        {[
                          "More templates",
                          "More generic suggestions",
                          "More vague scores out of 100",
                        ].map((item, i) => (
                          <li
                            key={i}
                            className="flex items-center text-zinc-400 line-through decoration-zinc-600"
                            style={{ gap: 'clamp(0.25rem, 1vw, 0.5rem)', fontSize: 'clamp(0.5rem, 1vw, 0.75rem)' }}
                          >
                            <span className="rounded-full bg-red-500" style={{ width: 'clamp(0.375rem, 0.75vw, 0.5rem)', height: 'clamp(0.375rem, 0.75vw, 0.5rem)' }}></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col" style={{ gap: 'clamp(0.25rem, 0.75vw, 0.5rem)' }}>
                      <p className="text-zinc-500 font-mono uppercase" style={{ fontSize: 'clamp(0.5rem, 0.875vw, 0.625rem)' }}>
                        You get:
                      </p>
                      <ul className="flex flex-col" style={{ gap: 'clamp(0.25rem, 0.5vw, 0.375rem)' }}>
                        {[
                          "Sentences that are either kept on purpose or removed on purpose.",
                          "Copy reviews that move from 'I do not like this' to 'this is a consequence failure'.",
                          "Teams that can finally see the link between words on a page and real revenue risk.",
                        ].map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start text-zinc-900"
                            style={{ gap: 'clamp(0.25rem, 1vw, 0.5rem)', marginBottom: 'clamp(0.25rem, 0.75vw, 0.5rem)', fontSize: 'clamp(0.5rem, 1vw, 0.75rem)' }}
                          >
                            <Check className="text-green-500 shrink-0" style={{ width: 'clamp(0.875rem, 1.5vw, 1rem)', height: 'clamp(0.875rem, 1.5vw, 1rem)', marginTop: 'clamp(0.125rem, 0.25vw, 0.25rem)' }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Card 5: The Fit (White/Clean) */}
            {/* Redesigned card */}
            <div className="w-screen h-full flex items-start justify-center flex-shrink-0" style={{ paddingLeft: 'clamp(0.5rem, 3vw, 2rem)', paddingRight: 'clamp(0.5rem, 3vw, 2rem)' }}>
              <div
                className="w-full bg-zinc-50 text-zinc-900 rounded-sm overflow-hidden relative group flex flex-col shadow-2xl border border-zinc-300"
                role="region"
                aria-label="What now card"
                style={{ maxWidth: 'clamp(280px, 40vw, 42rem)' }}
              >
                {/* subtle texture / noise layer (optional - replace path) */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-5"
                  style={{
                    backgroundImage: "url('/noise.png')",
                    backgroundRepeat: "repeat",
                  }}
                  aria-hidden="true"
                />

                {/* thin red top rule */}
                <div className="h-2 bg-red-600 w-full shrink-0" />

                {/* content area */}
                <div className="flex flex-col h-full min-h-0" style={{ padding: 'clamp(0.75rem, 2vw, 1.5rem)' }}>
                  {/* make inner column distribute space so bottom block stays aligned */}
                  <div className="flex-1 flex flex-col justify-between min-h-0 overflow-y-auto">
                    {/* TOP: headline + intro */}
                    <div className="flex flex-col" style={{ gap: 'clamp(0.5rem, 1.5vw, 1rem)' }}>
                      <h3 className="font-serif font-extrabold text-zinc-900 tracking-tight" style={{ fontSize: 'clamp(0.875rem, 2vw, 1.25rem)' }}>
                        What NOW?
                      </h3>

                      <p className="font-mono uppercase tracking-widest text-zinc-700 leading-relaxed" style={{ fontSize: 'clamp(0.5rem, 1.25vw, 0.875rem)' }}>
                        If even one line above felt{" "}
                        <span className="font-bold text-zinc-50 bg-red-600">
                          uncomfortably accurate
                        </span>{" "}
                        ,
                        <br />
                        this is not curiosity any more. <br />
                        It is a choice.
                      </p>
                    </div>

                    {/* MIDDLE: emphasized line with left accent (acts like a featured quote) */}
                    <div>
                      <div className="h-px bg-zinc-300" style={{ marginTop: 'clamp(0.5rem, 1.5vw, 1rem)', marginBottom: 'clamp(0.5rem, 1.5vw, 1rem)' }} />

                      <p className="font-mono uppercase tracking-wide text-zinc-800 border-l-4 border-red-600 leading-relaxed" style={{ fontSize: 'clamp(0.5rem, 1.25vw, 0.875rem)', paddingLeft: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
                        It is about whether you want to keep running the same
                        system with your eyes closed.
                      </p>
                    </div>

                    {/* BOTTOM: closing + CTA aligned on same baseline */}
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between" style={{ marginTop: 'clamp(0.5rem, 1.5vw, 1rem)', marginBottom: 'clamp(0.75rem, 2vw, 2rem)', gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                      {/* closing line (left) */}
                      <div className="flex-1">
                        <p className="font-mono uppercase tracking-wider text-zinc-600 leading-relaxed" style={{ fontSize: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                          The risk is not in not trying 1SYX.
                          <br />
                          The risk is staying blind to your own sentences.
                        </p>
                      </div>

                      {/* CTA (right) - full width on mobile, compact on desktop) */}
                      <div className="w-full sm:w-auto">
                        <Link href="/waitlist#section-01">
                          <a
                            className="inline-flex w-full sm:w-auto items-center justify-center bg-red-600 hover:bg-red-500 text-white 
                                        font-black font-mono uppercase tracking-widest rounded-md 
                                        shadow-[0_10px_30px_rgba(220,38,38,0.25)] transition-transform transform-gpu
                                        hover:-translate-y-0.5 active:translate-y-0"
                            style={{ fontSize: 'clamp(0.5rem, 1vw, 0.75rem)', paddingTop: 'clamp(0.5rem, 1vw, 0.75rem)', paddingBottom: 'clamp(0.5rem, 1vw, 0.75rem)', paddingLeft: 'clamp(0.75rem, 2vw, 1.5rem)', paddingRight: 'clamp(0.75rem, 2vw, 1.5rem)' }}
                          >
                            Join Waitlist
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AutopsySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity1 = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const blur1 = useTransform(scrollYProgress, [0.1, 0.3], [10, 0]);
  const y1 = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);

  const opacity2 = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const scale2 = useTransform(scrollYProgress, [0.4, 0.6], [0.9, 1]);

  const opacity3 = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  const color3 = useTransform(
    scrollYProgress,
    [0.85, 0.95],
    ["#ffffff", "#ef4444"],
  );

  return (
    <section ref={containerRef} className="h-[200vh] bg-white relative">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Grid */}
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Scan Line Animation */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent via-red-900/10 to-transparent"
          style={{
            top: useTransform(scrollYProgress, [0, 1], ["-100%", "200%"]),
          }}
        />

        <div className="max-w-5xl px-6 text-center z-10 flex flex-col gap-12 md:gap-16 relative">
          {/* Statement 1 */}
          <div className="relative">
            <p className="text-2xl md:text-3xl lg:text-3xl font-serif text-zinc-900 leading-tight">
              1SYX reads your content the way your{" "}
              <span className="text-black font-bold">toughest prospect</span>{" "}
              does
              <br className="hidden md:block" />
              and{" "}
              <span className="text-red-500 italic font-serif">
                brutally flags
              </span>{" "}
              every line they stop believing.
            </p>
          </div>

          {/* Statement 2 */}
          <motion.div
            style={{ opacity: opacity2, scale: scale2 }}
            className="relative"
          >
            <div className="inline-block border border-zinc-900 bg-zinc-900/50 backdrop-blur-md px-8 py-4 rounded-sm">
              <p className="font-mono text-sm md:text-lg text-zinc-900 uppercase tracking-widest">
                If you only want faster content, <br className="md:hidden" />
                <span className="text-white border-b border-zinc-600">
                  pick any flashy AI toy.
                </span>
              </p>
            </div>
          </motion.div>

          {/* Statement 3 - The Climax */}
          <motion.div style={{ opacity: opacity3 }} className="relative">
            <p className="text-3xl md:text-5xl lg:text-7xl font-bold font-serif tracking-tight text-black leading-[1.1]">
              If you want to see which sentences are{" "}
              <br className="hidden md:block" />
              quietly killing your pipeline...
            </p>
            <motion.p
              style={{ color: color3 }}
              className="text-3xl md:text-3xl lg:text-3xl font-black font-mono uppercase mt-6 md:mt-10 tracking-tighter"
            >
              THIS IS THE AUTOPSY TABLE.
            </motion.p>
            <div className="w-full md:w-auto items-center justify-center pt-4">
              <Link href="/waitlist#section-01">
                <a
                  className="inline-flex w-full md:w-auto items-center justify-center bg-red-600 hover:bg-red-500 text-white 
                              font-black font-mono uppercase tracking-widest text-sm py-3 px-6 rounded-md 
                              shadow-[0_10px_30px_rgba(220,38,38,0.25)] transition-transform transform-gpu
                              hover:-translate-y-0.5 active:translate-y-0"
                >
                  Join Waitlist
                </a>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const OH_SHIT_CARDS = [
  {
    id: 1,
    questions: [
      "🎭 If your logo vanished tomorrow, would a single campaign still win you a serious buyer on story alone?",
      "✂️ If 20% of your homepage disappeared, would your sharpest buyer even notice what's missing?",
      "🎲 If you had to bet your job on one page in your funnel actually creating pipeline, which page would you choose, and would you trust it with your career?",
    ],
  },
  {
    id: 2,
    questions: [
      "🪞 If your best competitor stole your narrative word for word, would you lose an edge or realise you never had one?",
      "📖 If you had to read out aloud, your content to your toughest buyer, where would you secretly hope to skip?",
      "💸 If ad spend fell to half today, would your story still stand or collapse? Would it still generate pipeline?",
    ],
  },
  {
    id: 3,
    questions: [
      "📄 If a customer used your homepage to justify choosing you to their CFO, would the argument hold or fall apart in the first sentence?",
      "📈 If you judged content only by your buyer's action/responses, would you still dare to call it “good”?",
      "🚫✨ If you banned every filler word (innovative, leading, seamless, powerful etc), would your story have anything left to stand on?",
    ],
  },
];

function OhShitFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [cards, setCards] = useState(OH_SHIT_CARDS);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = (e?: MouseEvent) => {
    e?.stopPropagation();
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setCards((prev) => {
        const newCards = [...prev];
        const first = newCards.shift();
        if (first) newCards.push(first);
        return newCards;
      });
      setIsAnimating(false);
    }, 400);
  };

  return (
    <>
      {/* Floating Chicklet Trigger */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-60 right-8 z-50 group"
          >
            <div className="bg-zinc-950 border border-zinc-800 p-1 rounded-full shadow-2xl flex items-center gap-3 pr-6 pl-2 py-2 hover:border-red-900/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold animate-pulse">
                !
              </div>
              <div className="text-left">
                <div className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
                  System Warning
                </div>
                <div className="text-sm text-white font-serif font-bold italic leading-none">
                  Oh Damn!..
                </div>
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
          >
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-zinc-950/90 backdrop-blur-xl cursor-pointer"
            />

            {/* Modal Content – perfectly centered */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-4 md:px-8 flex flex-col lg:grid lg:grid-cols-2 gap-8 items-center max-h-screen overflow-y-auto lg:overflow-visible lg:max-h-none py-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 lg:-top-12 lg:-right-12 text-zinc-500 hover:text-white transition-colors pointer-events-auto z-50"
              >
                <XIcon className="w-8 h-8" />
              </button>

              {/* Left Side Text (Cards) */}
              <div className="pointer-events-auto flex justify-center perspective-[1000px] w-full">
                <div className="relative w-full max-w-[320px] md:max-w-[420px] aspect-[420/520]">
                  <div className="relative w-full h-full">
                    <AnimatePresence mode="popLayout">
                      {cards.map((card, index) => {
                        if (index > 2) return null;

                        let initialStyles: any = {};
                        if (index === 0)
                          initialStyles = {
                            rotate: 4,
                            x: 0,
                            y: 0,
                            scale: 1,
                            opacity: 1,
                            zIndex: 30,
                          };
                        else if (index === 1)
                          initialStyles = {
                            rotate: -6,
                            x: -20,
                            y: 20,
                            scale: 1,
                            opacity: 1,
                            zIndex: 20,
                          };
                        else if (index === 2)
                          initialStyles = {
                            rotate: -2,
                            x: 20,
                            y: 20,
                            scale: 1,
                            opacity: 1,
                            zIndex: 10,
                          };

                        return (
                          <motion.div
                            key={card.id}
                            layout
                            initial={false}
                            animate={initialStyles}
                            exit={{
                              x: -300,
                              y: 50,
                              opacity: 0,
                              rotate: -20,
                              transition: {
                                duration: 0.4,
                                ease: [0.32, 0.72, 0, 1],
                              },
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 150,
                              damping: 25,
                            }}
                            onClick={index === 0 ? handleNext : undefined}
                            className={cn(
                              "absolute inset-0 rounded-[18px] shadow-2xl flex flex-col overflow-hidden",
                              "bg-gradient-to-b from-zinc-800 via-zinc-900 to-black",
                              index === 0
                                ? "cursor-pointer"
                                : "pointer-events-none",
                            )}
                            style={{
                              boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent pointer-events-none"></div>
                            <div className="absolute top-0 left-0 right-0 h-1 bg-red-600 z-10"></div>

                            <div className="relative z-10 flex justify-between items-start p-6">
                              <div className="w-10 h-10 rounded-lg border border-zinc-700/50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                                <span className="text-red-500 font-bold text-lg">
                                  {card.id}
                                </span>
                              </div>
                              <div className="bg-zinc-950/80 px-3 py-1.5 rounded-full border border-zinc-800/50">
                                <span className="text-[10px] uppercase tracking-widest text-white font-medium">
                                  Truth Card
                                </span>
                              </div>
                            </div>

                            <div className="relative z-10 flex-1 px-8 md:px-12 flex flex-col justify-center items-center text-center -mt-8">
                              <div className="space-y-6">
                                {card.questions.map((q, i) => (
                                  <p
                                    key={i}
                                    className="text-sm md:text-md font-bold text-white leading-snug tracking-wide"
                                  >
                                    {q}
                                  </p>
                                ))}
                              </div>
                            </div>

                            <div className="relative z-10 pb-8 text-center">
                              <p className="text-sm text-red-500 font-medium">
                                HIT ME
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {/* Pagination */}
                  <div className="absolute -bottom-16 left-0 right-0 flex justify-center items-center gap-3">
                    {OH_SHIT_CARDS.map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "rounded-full transition-all duration-300",
                          i === cards[0].id - 1
                            ? "w-4 h-4 bg-red-600"
                            : "w-2.5 h-2.5 border border-zinc-600 bg-transparent",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side Card Stack (Text) */}
              <div className="pointer-events-auto space-y-6 text-left w-full">
                <div>
                  <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-4 leading-[0.8]">
                    Oh <br /> damn !...
                  </h2>
                  <p className="text-lg md:text-2xl font-bold text-white mt-4 md:mt-8">
                    The questions you cannot unsee
                  </p>
                </div>

                <div className="space-y-2 text-zinc-400 text-base md:text-lg">
                  <p>You don’t have to answer these out loud.</p>
                  <p className="text-white font-medium">
                    Just answer them in your head.
                  </p>
                </div>

                <div className="pt-6 space-y-6">
                  {/* CTA Button */}

                  <Link
                    href="/waitlist#section-01"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      className="w-full md:w-auto bg-red-600 hover:bg-red-500 text-white font-bold py-6 px-8 rounded-xl shadow-[0_20px_50px_rgba(220,38,38,0.3)] transition-all hover:scale-105 active:scale-95 group border-0"
                      style={{ paddingLeft: "100px", paddingRight: "100px" }}
                    >
                      <div className="flex flex-col items-center ">
                        <span className="text-lg uppercase tracking-wide font-black">
                          I have had enough
                        </span>
                        <span className="text-[12px] font-mono opacity-80 font-normal mt-0.5">
                          Add me to Waitlist
                        </span>
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showVideoOverlay, setShowVideoOverlay] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const finalY = isMobile ? "0%" : y;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen min-h-[600px] md:min-h-[700px] lg:min-h-[800px] h-auto lg:h-screen relative overflow-hidden border-b border-border flex items-center"
        style={{ paddingTop: 'clamp(3rem, 8vw, 5rem)', paddingBottom: 'clamp(3rem, 8vw, 5rem)' }}
      >
        {/* Parallax Background */}
        <ParallaxBackground src={skylineImage} opacity={1} scale={1} />

        {/* Overlay to ensure text readability on left half */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 md:via-background/95 to-transparent/20 z-10"></div>

        {/* Content */}
        <div className="container mx-0 relative z-20 flex items-center" style={{ paddingLeft: 'clamp(1rem, 5vw, 3rem)', paddingRight: 'clamp(1rem, 5vw, 3rem)' }}>
          <div className="max-w-4xl xl:max-w-5xl" style={{ paddingTop: 'clamp(2rem, 6vw, 5rem)', paddingBottom: 'clamp(2rem, 6vw, 5rem)' }}>
            <FadeIn>
              <h1 className="font-serif font-medium leading-[1.1] tracking-tight" style={{ fontSize: 'clamp(1.875rem, 5vw, 4.5rem)', marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)', marginTop: 'clamp(0rem, 2vw, 2rem)' }}>
                What if your{" "}
                <span className="italic text-muted-foreground decoration-accent/50 line-through decoration-2">
                  "approved"
                </span>{" "} <br />
                content is the biggest risk <br /> in your funnel
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="flex flex-col leading-relaxed text-muted-foreground" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', gap: 'clamp(1rem, 3vw, 2rem)', marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
                <p className="text-foreground font-medium">
                  Your product is real. Your team is smart.
                </p>
                <p className="text-foreground font-medium">
                  But your pipeline is noisy, fragile and far too dependent on
                  luck.
                  <br className="hidden sm:block" />{" "}
                  Prospects read your lines, nod politely and forget you
                  in 5 seconds.
                </p>
                <div className="border-l-2 border-accent" style={{ paddingTop: 'clamp(0.75rem, 2vw, 1.25rem)', paddingLeft: 'clamp(1rem, 3vw, 2rem)' }}>
                  <p className="text-foreground font-serif italic" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
                    You are not losing to better products.{" "}
                    <br className="hidden sm:block" />
                    You are losing to sharper sentences.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center" style={{ gap: 'clamp(1rem, 3vw, 2rem)' }}>
                <Link href="/waitlist#section-01" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto rounded-none font-mono uppercase tracking-wider bg-foreground bg-red-500 text-background hover:bg-black hover:text-accent-foreground transition-all shadow-2xl"
                    style={{ height: 'clamp(2.75rem, 5vw, 3.5rem)', paddingLeft: 'clamp(1.25rem, 3vw, 2rem)', paddingRight: 'clamp(1.25rem, 3vw, 2rem)', fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)' }}
                  >
                    Join waitlist
                  </Button>
                </Link>
                <p className="text-foreground max-w-full sm:max-w-xs" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)' }}>
                  You can either gamble the next quarter on mere opinions, or
                  you can let{" "}
                  <span className="font-bold text-foreground text-red-500">
                    1SYX{" "}
                  </span>
                  punish your content before the market does.{" "}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* The Idea */}
      <Section className="bg-foreground text-background py-32 relative overflow-hidden">
        {/*<ParallaxBackground src={blueprintImage} opacity={0.15} />*/}

        <div className="max-w-8xl mx-auto text-center space-y-8 relative z-10">
          <span className="font-mono text-accent text-md uppercase tracking-widest">
            THINK!
          </span>
          <h2 className="text-4xl md:text-6xl font-serif leading-tight">
            What if every important sentence in your funnel had to{" "}
            <span className="text-accent italic">earn the right to exist</span>
          </h2>
          <div className="h-px w-24 bg-accent mx-auto my-8"></div>
          <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed">
            Not based on taste. Not based on internal authority. But based on
            whether it actually helps a serious buyer move closer to a decision.
            <br />
            <span className="text-accent font-serif italic">
              1SYX exists to enforce that standard for everything you ship.
            </span>
          </p>
          <div className="w-full md:w-auto items-center justify-center pt-4">
            <Link href="/waitlist#section-01">
              <a
                className="inline-flex w-full md:w-auto items-center justify-center bg-red-600 hover:bg-red-500 text-white 
                            font-black font-mono uppercase tracking-widest text-sm py-3 px-6 rounded-md 
                            shadow-[0_10px_30px_rgba(220,38,38,0.25)] transition-transform transform-gpu
                            hover:-translate-y-0.5 active:translate-y-0"
              >
                Join Waitlist
              </a>
            </Link>
          </div>
        </div>
      </Section>

      {/* The Pattern Section */}
      <Section
        className="border-b border-border relative bg-white"
        background={
          <ParallaxBackground
            src={patternImage}
            opacity={1}
            className="grayscale"
            scale={1}
          />
        }
      >
        <div className="mb-16 relative z-10 text-center">
          <h2 className="text-4xl text-white  font-serif mb-4">
            <span className="bg-red-600">
              The stacked damage you are already living with
            </span>
          </h2>
          <p className="text-xl text-foreground">
            You do not have{" "}
            <span className="font-bold text-foreground">one</span> content
            problem. You have a pattern.
          </p>
          <p className="text-xl text-foreground text-white ">
            Look at the system you are running without meaning to.
          </p>
        </div>
        <div>
          <br />

          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border relative z-10"
            style={{ paddingTop: "10px", paddingBottom: "10px" }}
          >
            {[
              "A homepage that sounds smart, but nobody can quote a single line from it",
              "Promises that could describe any vendor in your category",
              "Case studies that do not reveal the tension behind the risk that  the buyer took",
              "Sequences that get polite opens but dead replies. Emails that feel like follow up for the sake of follow up",
              "Decks that get nods on slide-3 & lost faces by slide-7 as they collapse into bullet chaos",
              "Pages that talk about your roadmap while the buyer still does not know why you matter",
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white/90 backdrop-blur-sm p-8 h-full hover:bg-zinc-50/95 transition-all group relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  <div className="font-mono text-lg text-red-500 text-muted-foreground mb-4">
                    0{i + 1}
                  </div>
                  <p className="text-lg group-hover:text-foreground transition-colors relative z-10">
                    {item}
                  </p>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="w-5 h-5 text-accent" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <div className=" text-center max-w-3xl mx-auto relative z-10">
          <strong
            className="text-muted-foreground italic font-serif text-3xl text-red-500 inline-block px-2 py-2 backdrop-blur-sm"
            style={{ marginBottom: "30px" }}
          >
            None of the above kills you tomorrow.
            <br />
            Together they slowly train your market to ignore you.
          </strong>
        </div>
      </Section>

      {/* Problem Section - Redesigned */}
      <section
        id="why-it-exists"
        className="bg-background border-b border-border relative p-0 w-full scroll-mt-32"
        style={{ backgroundColor: "black", padding: 0 }}
      >
        <div className="grid lg:grid-cols-2 h-full w-full">
          {/* Left Side: The Headline & Core Problem - Black Background */}
          <div className="bg-black text-white p-12 md:p-20 flex flex-col justify-center h-full relative">
            <FadeIn>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 bg-red-600 animate-pulse rounded-sm"></div>
                <span className="font-mono text-xs uppercase tracking-widest text-red-600 font-bold">
                  System Failure Detected
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-serif leading-[0.9] mb-8 font-bold tracking-tight">
                The part of your <br />
                funnel <span className="text-zinc-600">nobody</span> <br />
                <span className="text-zinc-600">owns</span>
              </h2>
            </FadeIn>

            <div className="space-y-12 text-lg md:text-xl font-light leading-relaxed text-zinc-100">
              <FadeIn delay={0.1}>
                <p className="italic font-serif text-red-600">
                  You are spending real money on traffic that lands on messaging
                  which could belong to any of your competitors.
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <ul className="space-y-6 list-disc pl-5 marker:text-white">
                  <li>
                    Inside the team, everyone has an opinion on copy, colour,
                    layout & taglines.
                  </li>
                  <li>
                    On the outside, the market gives you one kind of feedback.{" "}
                    <span className="bg-red-600 text-white px-1 font-medium">
                      Silence
                    </span>
                  </li>
                </ul>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-white">
                  The real problem is simple:{" "}
                  <span className="text-red-600 italic font-serif">
                    Nothing your content says feels sharp, risky or specific
                    enough to force a decision.
                  </span>
                </p>
              </FadeIn>
            </div>
          </div>

          {/* Right Side: The Symptoms List - White Background */}

          {/* Right Side: The Symptoms List */}
          <div
            className="relative m-4 lg:m-[90px]"
            style={{ backgroundColor: "black" }}
          >
            <FadeIn delay={0.3}>
              <div
                className="bg-zinc-50 border border-zinc-200 p-8 md:p-10 relative"
                style={{}}
              >
                <div
                  className="absolute -top-3 -right-3 bg-foreground text-background font-mono text-xs px-3 py-1 uppercase tracking-widest"
                  style={{ backgroundColor: "red" }}
                >
                  Status: Critical
                </div>

                <h3 className="font-mono text-md uppercase tracking-widest text-muted-foreground mb-8">
                  Current Operating State
                </h3>

                <ul className="space-y-6">
                  {[
                    "Inside the team, everyone has an opinion on copy.",
                    "Nobody has a shared diagnostic language for what is wrong.",
                    "Message runs on instinct, taste and politics.",
                    "Your website, decks, emails and ads all claim big outcomes.",
                    "Ask anyone a day later what line they remember and you get silence.",
                    "Lines that sound confident but say nothing, Lines that never put any real risk on the table, keep slipping through.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <XIcon className="w-5 h-5 text-destructive shrink-0 mt-1 opacity-60 group-hover:opacity-100 transition-opacity" />
                      <span className="text-lg text-zinc-800 group-hover:text-black transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 pt-8 border-t border-zinc-200">
                  <p className="font-serif text-xl text-red-500">
                    <span className="font-serif text-3xl">1</span>SYX exists so
                    you cannot pretend that it is fine anymore.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What it does */}
      <Section id="what-it-does" className="bg-background scroll-mt-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Sticky Left Side */}
          <div className="lg:w-1/3 space-y-8 lg:sticky lg:top-2">
            <h2 className="text-4xl font-serif">
              How <span className="text-5xl">1</span>SYX operates
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-default group">
                <span className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-mono text-sm group-hover:bg-accent transition-colors">
                  1
                </span>
                <span className="font-medium">Captures your entire story</span>
              </div>
              <div className="h-8 w-px bg-border ml-8"></div>
              <div className="flex items-center gap-4 p-4 border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-default group">
                <span className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-mono text-sm group-hover:bg-accent transition-colors">
                  2
                </span>
                <span className="font-medium">Exposes lines doing no work</span>
              </div>
              <div className="h-8 w-px bg-border ml-8"></div>
              <div className="flex items-center gap-4 p-4 border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-default group">
                <span className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-mono text-sm group-hover:bg-accent transition-colors">
                  3
                </span>
                <span className="font-medium">
                  Holds a brutal market mirror
                </span>
              </div>
              <div className="h-8 w-px bg-border ml-8"></div>
              <div className="flex items-center gap-4 p-4 border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-default group">
                <span className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-mono text-sm group-hover:bg-accent transition-colors">
                  4
                </span>
                <span className="font-medium">
                  Names the exact failure pattern
                </span>
              </div>
              <div className="h-8 w-px bg-border ml-8"></div>
              <div className="flex items-center gap-4 p-4 border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-default group">
                <span className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-mono text-sm group-hover:bg-accent transition-colors">
                  5
                </span>
                <span className="font-medium">
                  Prioritises fixes by risk, return
                </span>
              </div>
              <div className="h-8 w-px bg-border ml-8"></div>
              <div className="flex items-center gap-4 p-4 border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-default group">
                <span className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-mono text-sm group-hover:bg-accent transition-colors">
                  6
                </span>
                <span className="font-medium">
                  Ships sharper versions, Measures Impact
                </span>
              </div>
            </div>
          </div>

          {/* Scrollable Right Side */}
          <div className="lg:w-2/3 space-y-12">
            {/* Visual Element for Right Side */}
            <div className="w-full aspect-video bg-white relative overflow-hidden border border-zinc-500 shadow-2xl group">
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
                
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground ">
                    <span className="bg-red-600 text-white px-1 ">Input</span>
                  </h3>
                  <h4 className="text-xl font-medium mb-2">
                    Hand <span className="text-3xl">1</span>SYX your assets
                  </h4>
                  <ul className="space-y-2">
                    {[
                      { icon: LayoutTemplate, text: "Homepage and core pages" },
                      { icon: FileText, text: "Main sales deck" },
                      { icon: Mail, text: "Key email sequences" },
                      { icon: AlertCircle, text: "Highest spend ad copy" },
                      { icon: MessageSquare, text: "Recent call transcripts" },
                      {
                        icon: ScanSearch,
                        text: "Crawls competitors & Thought Leaders",
                      },
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground ">
                    <span className="bg-red-600 text-white px-1 ">
                      Diagnostics
                    </span>
                  </h3>
                  <h4 className="text-xl font-medium mb-2">
                    <span className="text-3xl">1</span>SYX tears through them
                    and flags lines that
                  </h4>
                  <div className="flex flex-wrap gap-2 ">
                    {[
                      "Sound strong but say nothing concrete",
                      "Talk about you, not the buyer",
                      "Feature lists with no clear consequence",
                      "Buzzwords vs real situations",
                      "Zero tension b/w status quo vs changing",
                      "Aim at everyone, cut through no one",
                      "Feel like any other vendor in your space",
                    ].map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-destructive/5 border border-destructive/20 text-destructive text-[10px] font-mono uppercase hover:bg-destructive/10 transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-secondary/30 p-8 border border-border h-fit sticky top-32">
                <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-4">
                  <span className="bg-red-600 text-white px-1 ">Output</span>
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2 group">
                    <div className="text-sm font-bold flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full opacity-100 "></div>
                      The Diagnosis
                    </div>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      Exact Failure Labels, Clarity, Specificity, Relevance,
                      Proof, Consequence, Persona Mismatch.
                    </p>
                  </div>
                  <div className="space-y-2 group">
                    <div className="text-sm font-bold flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full opacity-100 "></div>
                      The Priority
                    </div>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      A ranked list of what to fix first on high traffic,
                      high stake assets.
                    </p>
                  </div>
                  <div className="space-y-2 group">
                    <div className="text-sm font-bold flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full opacity-100 "></div>
                      The Rewrite
                    </div>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      Multiple sharper alternatives that still sound like you.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-border mt-6">
                    <p className="text-sm font-mono text-black">
                      "This is where copy reviews stop being,
                      <br />{" "}
                      <span className="text-red-500">
                        ‘I just do not like how this sounds’
                        <br />
                      </span>{" "}
                      & start becoming,
                      <br />{" "}
                      <span className="text-red-500">
                        ‘This is a clarity failure for this persona at this
                        stage’
                      </span>
                      ."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Who it is for */}
      <InteractiveWhoItIsFor />

      {/* Proof Section - "The Interrogation Light" Concept with Scroll Pinning */}
      <div ref={targetRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-white">
          <section
            id="proof"
            className="text-zinc-950 py-20 lg:py-0 w-full h-[70vh] flex items-stretch scroll-mt-32"
          >
            {/* Overexposed lighting effects */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white via-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[150px] pointer-events-none"></div>

            {/* Subtle grid for structure */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

            <div className="w-full relative z-20 grid lg:grid-cols-[40%_60%]">
              {/* Left Side - Static Heading */}
              <div className="px-6 lg:pl-16 lg:pr-8 flex flex-col h-full mb-16 lg:mb-0">
                <FadeIn>
                  <div className="max-w-xl">
                    <div className="inline-flex items-center gap-3 mb-6 border-l-4 border-red-600 pl-4">
                      <span className="font-mono text-xs uppercase tracking-widest text-red-600 font-bold">
                        Exposure Level: Maximum
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-8xl font-black tracking-tighter leading-[0.9] text-black">
                      What happens when <br />
                      your story meets <br />
                      <span className="text-red-600 decoration-4 underline-offset-8">
                        real proof
                      </span>
                      .
                    </h2>
                  </div>
                </FadeIn>
              </div>

              {/* Right Side - Interactive Evidence Log */}
              <div className="relative border-l border-zinc-200 bg-white overflow-hidden h-[60vh] lg:h-full flex flex-col w-full">
                {/* Animated Content Container */}
                <div className="overflow-hidden h-full relative">
                  <motion.div
                    style={{ y }}
                    className="absolute w-full px-8 md:px-16 pb-32"
                  >
                    {[
                      {
                        fluff: "We help you align stakeholders...",
                        reality:
                          "Leaders stop saying “I like it” and start asking “what did it change.”",
                      },
                      {
                        fluff: "We optimize your messaging...",
                        reality:
                          "Pages that felt “clear enough” start hitting buyers like honest, uncomfortable mirrors.",
                      },
                      {
                        fluff: "We improve engagement...",
                        reality:
                          "Emails that do not win a reply, a click or a next step get deleted, not reskinned.",
                      },
                      {
                        fluff: "We empower your sales team...",
                        reality:
                          "Reps stop saying “leads suck” and start asking “did our words kill this.”",
                      },
                      {
                        fluff: "We drive better results...",
                        reality:
                          "The numbers change because the sentences behind them finally do.",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="group relative flex flex-col gap-8 border-b border-zinc-200 h-[60vh] w-full py-12 first:border-t-0"
                      >
                        {/* The Fluff (Small, fading away) */}
                        <div className="relative">
                          <p className="font-serif italic text-zinc-400 text-xl md:text-4xl transition-all duration-500 line-through decoration-red-300 decoration-2 opacity-60 group-hover:opacity-100 mb-6">
                            "{item.fluff}"
                          </p>
                        </div>

                        {/* The Reality (Huge, Sharp) */}
                        <div>
                          <p className="text-2xl md:text-6xl font-bold text-black leading-tight">
                            {item.reality}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* The "Oh Shit" Section - Redesigned */}
      <OhShitFloating />

      {/* FAQ - Accordion Style */}
      <section className="relative overflow-hidden border-t border-border text-zinc-100 min-h-screen flex flex-col justify-center py-24 md:py-32 px-6">
        <ParallaxBackground src={faqImage} opacity={0.6} scale={1.2} />
        <div className="absolute inset-0 bg-zinc-950/80 z-10"></div>

        <div className="container mx-auto max-w-[95%] relative z-20 w-full">
          <FadeIn>
            <div className="text-center mb-20 space-y-6">
              <span className="font-mono text-accent text-3xl uppercase tracking-widest">
                Still thinking about it
              </span>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight">
                Here are the questions you are probably <br />
                asking in your head, not in the form.
              </h2>
            </div>
          </FadeIn>

          <Tabs defaultValue="part1" className="w-full">
            <TabsList className="grid max-w-4xl mx-auto grid-cols-1 md:grid-cols-2 gap-2 mb-12 h-auto bg-zinc-900/80 p-2 rounded-xl border border-zinc-800">
              <TabsTrigger
                value="part1"
                className="text-sm md:text-lg py-4 h-auto whitespace-normal text-center font-mono uppercase tracking-widest rounded-2xl transition-all duration-300 text-zinc-500 hover:text-zinc-300 data-[state=active]:bg-zinc-100 data-[state=active]:text-zinc-950 data-[state=active]:shadow-md data-[state=active]:font-bold"
              >
                1SYX fits my world?
              </TabsTrigger>
              <TabsTrigger
                value="part2"
                className="text-sm md:text-lg py-4 h-auto whitespace-normal text-center font-mono uppercase tracking-widest rounded-2xl transition-all duration-300 text-zinc-500 hover:text-zinc-300 data-[state=active]:bg-zinc-100 data-[state=active]:text-zinc-950 data-[state=active]:shadow-md data-[state=active]:font-bold"
              >
                How well it fits?
              </TabsTrigger>
            </TabsList>

            <TabsContent value="part1" className="mt-0">
              {/* Group 1: Does 1SYX belong in my world? */}
              <div className="max-w-4xl mx-auto">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-4"
                >
                  {[
                    {
                      q: "If 1SYX proves the real problem is our content, not the leads or the market, does that just make me, my team or my agency look useless in front of leadership?",
                      a: (
                        <>
                          <p className="mb-4">
                            That is exactly what it is designed to do when it is
                            true.
                          </p>
                          <p className="mb-4">
                            The real question is this. Would you rather keep
                            arguing about channels and timing, or finally see
                            which lines are quietly wasting the money you
                            already spend.
                          </p>
                          <p>
                            The question is whether you would rather keep
                            blaming the market than fix the lines you control.
                            If the content is clean, 1SYX will show you that. If
                            it is not, better you find out before your board
                            does.
                          </p>
                          <p>
                            It will make the gaps look bad. What you do next is
                            what makes you look weak or strong. Owning the gaps
                            and fixing them quickly is one of the few moves that
                            raises everyone’s stock at once. You included.
                          </p>
                        </>
                      ),
                    },
                    {
                      q: "If my team and agency are already good, why do we need something like 1SYX at all?",
                      a: (
                        <>
                          <p className="mb-4">
                            If everyone is already strong, why is there still
                            this much debate, drift and guesswork around your
                            message.
                          </p>
                          <p className="mb-4">
                            Great teams still have blind spots. 1SYX does not
                            replace them. It removes the parts of the argument
                            that are pure opinion so their skill actually shows.
                          </p>
                          <p>
                            A harsh external mirror does not replace them. It
                            stops everyone from pretending. Think of it as the
                            one person in the room who does not care who wrote
                            the line, only whether it works.
                          </p>
                        </>
                      ),
                    },
                    {
                      q: "How do I know this will not just become another tool my team ignores after two weeks",
                      a: (
                        <>
                          <p className="mb-4">
                            People ignore tools that add work and no clarity.
                            1SYX does the opposite. It deletes effort. Fewer
                            lines. Fewer slides. Fewer maybe this version
                            options.
                          </p>
                          <p className="mb-4">
                            1SYX removes lines, pages and slides. It gives you
                            less to argue about, not more. You end up with less
                            to fight about and a clearer standard for what
                            survives. That is the kind of tool teams quietly
                            stick with.
                          </p>
                        </>
                      ),
                    },
                    {
                      q: "Is this going to kill our brand voice and turn everything into cold, robotic copy?",
                      a: (
                        <>
                          <p className="mb-4">
                            1SYX keeps your voice. It kills your vagueness. If
                            being clearer, more specific and more honest breaks
                            your brand, your brand has a different problem than
                            this tool.
                          </p>
                          <p className="mb-4">
                            If your brand cannot survive being clearer, you have
                            a different problem. The goal is simple. Same voice.
                            Sharper sentences. Less fluff your buyers have to
                            fight through.
                          </p>
                        </>
                      ),
                    },
                    {
                      q: "Is this just another AI scoring toy that spits clever labels and a number, without helping me change anything real?",
                      a: (
                        <>
                          <p className="mb-4">
                            If all you got was a score and some generic
                            comments, it would be a toy.
                          </p>
                          <p className="mb-4">
                            1SYX is only doing its job if you can point to a
                            line it flagged and say that is exactly the failure
                            pattern and here is the sharper version we shipped
                            instead.
                          </p>
                          <p className="mb-4">
                            You are not buying a vibe report. You are buying
                            fewer weak assets in the wild and more sentences you
                            can stand behind in front of a buyer or a board.
                          </p>
                        </>
                      ),
                    },
                    {
                      q: "What really happens if I just wait a few more months before doing anything about our message?",
                      a: (
                        <>
                          <p className="mb-4">
                            Ask yourself one thing. Has waiting ever made your
                            message sharper without you doing anything about it.
                            You already know the answer.
                          </p>
                          <p className="mb-4">
                            If “no” is already in your head, then waiting is not
                            a neutral move. It is agreeing to run the next few
                            campaigns, quarters and reviews on the same soft
                            story and hoping the market stays polite about it.
                          </p>
                          <p className="mb-4">
                            That is a choice. It just should not be a hidden
                            one. You can make that choice. It just should not
                            pretend to be a strategy.
                          </p>
                        </>
                      ),
                    },
                  ].map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`item-${i}`}
                      className="border border-zinc-800 bg-zinc-900/30 px-6 rounded-lg data-[state=open]:bg-zinc-900/80 data-[state=open]:border-red-900/50 transition-all duration-300"
                    >
                      <AccordionTrigger className="text-left text-lg font-medium py-6 hover:text-red-500 transition-colors [&[data-state=open]]:text-red-500">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-zinc-400 text-base leading-relaxed pb-6">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent value="part2" className="mt-0">
              {/* Group 2: How well will 1SYX actually work in my world? */}
              <div className="max-w-4xl mx-auto">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-4"
                >
                  {[
                    {
                      q: "Do I really have the bandwidth for this, or will it just add more work, tasks and tickets?",
                      a: (
                        <>
                          <p className="mb-4">
                            You probably do not have bandwidth for anything that
                            only adds work. Which is why 1SYX is not another
                            ritual. It is a delete button on fluff. Fewer
                            versions. Fewer slides. Fewer lines that survive.
                          </p>
                          <p className="mb-4">
                            If a tool does not reduce meetings, arguments or
                            revision cycles, you are right to ignore it.
                          </p>
                          <p>
                            If it strips noise before you even walk into the
                            room, that is not a layer. That is a filter.
                          </p>
                          <p>
                            A good 1SYX report does not say, here are forty
                            tasks. It says, here are the six sentences that are
                            quietly killing this asset, fix these and stop
                            touching the rest. That is progress you can actually
                            finish.
                          </p>
                        </>
                      ),
                    },
                    {
                      q: "Is this actually different from every other AI writing or scoring tool that promised the world?",
                      a: (
                        <>
                          <p className="mb-4">
                            Most tools start with, let me write for you.
                          </p>
                          <p className="mb-4">
                            1SYX starts with, show me what you already ship and
                            let me prove where it is lying to you, or simply not
                            doing any real work.
                          </p>
                          <p>
                            The goal is not more words. The goal is fewer,
                            sharper words and a shared language for what good
                            looks like.
                          </p>
                          <p>
                            If a tool does not change how you judge your own
                            content, it is not in the same category.
                          </p>
                          <p>
                            If the output is not specific enough to make you
                            uncomfortable, it is useless. 1SYX is only doing its
                            job if you can point to a line it flagged and say,
                            yes, that is exactly the failure pattern, and here
                            is what we did about it.
                          </p>
                          <p>
                            Accountability shows up in two places, the labels
                            are concrete enough to argue with and the rewrites
                            are clear enough to ship. Anything else is theatre.
                          </p>
                        </>
                      ),
                    },
                    {
                      q: "Will the feedback feel generic and robotic, or will it actually sound like it knows my world and my buyers?",
                      a: (
                        <>
                          <p className="mb-4">
                            If it could apply to any company in any industry, it
                            has failed. The whole point is to judge your story
                            in the context of your buyers, your promises and
                            your category, not in a vacuum.
                          </p>
                          <p className="mb-4">
                            You should be able to read a 1SYX pass and think,
                            this sounds uncomfortably close to how my sharpest
                            buyer would talk to me if they stopped being polite.
                            That is the bar.
                          </p>
                          <p>That is the bar.</p>
                          <p className="mb-4">
                            Unusual is not the problem. Unclear is.
                          </p>
                          <p className="mb-4">
                            If a wild idea has a sharp promise, a clear buyer
                            and a real consequence, 1SYX will see that. If it
                            cannot answer who this is for, what changes for them
                            and why they should care now, that is not
                            creativity. That is fog.
                          </p>
                          <p className="mb-4">
                            The job is not to drag everything to the middle. The
                            job is to make sure even your strangest ideas can be
                            understood, repeated and defended by the people who
                            have to sell them.
                          </p>
                        </>
                      ),
                    },
                    {
                      q: "Will this kill the weird, human parts of our brand and push us into some cold, clinical style?",
                      a: (
                        <>
                          <p className="mb-4">
                            If everything starts sounding like a B2B template,
                            something went wrong. 1SYX is not here to flatten
                            your voice. It is here to stop you from hiding weak
                            thinking behind pretty phrasing.
                          </p>
                          <p className="mb-4">
                            The weird, human parts that actually land will
                            survive, because they work.
                          </p>
                          <p>
                            The ones that are just inside jokes, buzzwords or
                            fluff will not. That is not killing your brand. That
                            is finally letting the real parts of it breathe.
                            1SYX keeps your voice. It kills your vagueness
                          </p>
                        </>
                      ),
                    },
                    {
                      q: "How much of my content and strategy do I actually feel safe feeding into a system like this?",
                      a: (
                        <>
                          <p className="mb-4">
                            You do not need to pour your entire brain in on day
                            one.
                          </p>
                          <p className="mb-4">
                            Start with one asset that is already live and
                            important. See if the diagnosis passes your own
                            sniff test.
                          </p>
                          <p>
                            If it does not, you walk away. If it does, you
                            decide how much deeper you want to go.
                          </p>
                          <p>
                            The risk is not starting small. The real risk is
                            using fear as a reason to keep running big bets on
                            copy you have never really stress tested.
                          </p>
                        </>
                      ),
                    },
                    {
                      q: "How quickly would I see a real difference, and does using 1SYX mean I have to kill assets it proves are weak?",
                      a: (
                        <>
                          <p className="mb-4">
                            You will not need twelve months to feel it.
                          </p>
                          <p className="mb-4">
                            The first place you apply this is not your entire
                            brand. It is one high traffic page, one core deck or
                            one important sequence.
                          </p>
                          <p>
                            If sharper lines do not change replies, meetings or
                            deal momentum on those, you have your answer fast.
                          </p>
                          <p>
                            If they do, you finally have a concrete story to
                            take into the next review that is not just, trust
                            us, the narrative is better.
                          </p>
                          <p>
                            If you do not act on what shows up as weak, you are
                            paying to be told the truth and then choosing to
                            ignore it.
                          </p>
                          <p>
                            You do not have to burn everything on day one. You
                            can set your own thresholds. But if an asset shows
                            up as weak, stays weak and never improves, keeping
                            it live is not caution, it is self sabotage.
                          </p>
                          <p>
                            The real commitment is this, I will not let
                            obviously broken messages keep running just because
                            they are familiar. That is exactly the kind of thing
                            that makes your next role or promotion easier to
                            justify, not harder.
                          </p>
                        </>
                      ),
                    },
                  ].map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`part2-item-${i}`}
                      className="border border-zinc-800 bg-zinc-900/30 px-6 rounded-lg data-[state=open]:bg-zinc-900/80 data-[state=open]:border-red-900/50 transition-all duration-300"
                    >
                      <AccordionTrigger className="text-left text-lg font-medium py-6 hover:text-red-500 transition-colors [&[data-state=open]]:text-red-500">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-zinc-400 text-base leading-relaxed pb-6">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* The Autopsy Section */}
      <AutopsySection />

      <Footer />
    </div>
  );
}

