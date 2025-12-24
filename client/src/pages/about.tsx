import { useState, type MouseEvent } from "react";
import { Footer } from "@/components/ui/footer";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Linkedin } from "lucide-react";

// Placeholder Images
import ceoImage from "@assets/generated_images/professional_male_ceo_headshot.png";
import cpoImage from "@assets/generated_images/professional_female_executive_headshot.png";
import cfoImage from "@assets/generated_images/professional_male_cto_headshot.png";
import ctoImage from "@assets/generated_images/professional_female_vp_headshot.png";
import overviewBg from "@assets/ChatGPT_Image_Dec_14,_2025,_05_58_22_PM_1765887445908.png";
import nothiringBg from "@assets/fuckyou.png";
// --- Components ---

const TeamCard = ({ member }: { member: any }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleLinkedInClick = (e: MouseEvent) => {
    e.stopPropagation();
    window.open(member.linkedin, "_blank");
  };

  return (
    <div
      className="relative w-full aspect-[3/4] cursor-pointer group perspective-1000"
      onClick={handleCardClick}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="h-[75%] w-full overflow-hidden bg-zinc-100">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="h-[25%] p-4 flex flex-col justify-between bg-white relative z-10">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 leading-tight">
                {member.name}
              </h3>
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-500 mt-1">
                {member.role}
              </p>
            </div>
            <button
              onClick={handleLinkedInClick}
              className="absolute bottom-4 right-4 text-[#0077b5] hover:scale-110 transition-transform"
            >
              <Linkedin className="w-5 h-5 fill-current" />
            </button>
          </div>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 backface-hidden bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden p-6 flex flex-col items-center justify-center text-center shadow-xl"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white leading-tight">
              {member.name}
            </h3>
            <p className="text-xs font-mono uppercase tracking-wider text-red-500 mt-1">
              {member.role}
            </p>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-[90%]">
            {member.bio}
          </p>
          <div className="mt-6 pt-6 border-t border-zinc-800 w-full flex justify-center">
             <button
              onClick={handleLinkedInClick}
              className="text-white hover:text-red-500 transition-colors flex items-center gap-2 text-xs font-mono uppercase tracking-wider"
            >
              <Linkedin className="w-4 h-4" /> Connect
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Page Component ---

export default function About() {
  const [activeTeam, setActiveTeam] = useState<'technical' | 'sales' | 'marketing' | 'hr'>('technical');

  // Team data organized by department
  const teamData = {
    technical: [
      {
        id: 1,
        name: "Shreynsh Singh",
        role: "Software Engineer",
        image: cfoImage,
        linkedin: "https://linkedin.com",
        bio: "Builds the bones of 1SYX so it stays fast, stable and calm even when you throw huge stories at it. Thinks in edge cases, ships in straight lines.",
      },
      {
        id: 2,
        name: "Harshveer Singh",
        role: "AI Developer",
        image: cfoImage,
        linkedin: "https://linkedin.com",
        bio: "Lives inside models, prompts and guardrails so 1SYX argues like a sharp buyer, not a generic chatbot. Quiet, careful and ruthless about quality.",
      },
      {
        id: 3,
        name: "Deepanshu Singh",
        role: "AI Workflow Designer",
        image: cfoImage,
        linkedin: "https://linkedin.com",
        bio: "Designs how you move through 1SYX so the heavy thinking feels light. Obsessed with making powerful systems feel simple, honest and very hard to misuse.",
      },
      {
        id: 4,
        name: "Sanjeev Kumar",
        role: "Director of DevOps Engineering",
        image: cfoImage,
        linkedin: "https://linkedin.com",
        bio: "Keeps the lights on, the pipes clean and the system trustworthy. Thinks in failure modes so you never have to see them.",
      },
    ],
    sales: [
      {
        id: 5,
        name: "Neil Roy",
        role: "Co-Founder & VP Sales",
        image: ceoImage,
        linkedin: "https://linkedin.com",
        bio: "Builds the GTM systems that sit around 1SYX. Thinks in playbooks, sequences and partner motions so the product is never just a login screen.",
      },
      {
        id: 6,
        name: "Vikas Sagar",
        role: "Director of Sales",
        image: ceoImage,
        linkedin: "https://linkedin.com",
        bio: "Carries quotas in his head when he reviews every idea. If a sentence cannot survive a real pipeline conversation, Vikas will not let it reach you.",
      },
      {
        id: 7,
        name: "Anshul Bhardwaj",
        role: "Sales and Operations",
        image: ceoImage,
        linkedin: "https://linkedin.com",
        bio: "Keeps customer promises tied to actual delivery. Makes sure trials, feedback and support feel like a relationship, not tickets in a queue.",
      },
    ],
    marketing: [
      {
        id: 8,
        name: "Anubhav Gautam",
        role: "Head of Marketing",
        image: ctoImage,
        linkedin: "https://linkedin.com",
        bio: "Guards the bigger KLYRR story while 1SYX grows. Connects what we build today with the market we know we will have to answer to in three years.",
      },
      {
        id: 9,
        name: "Mayank Sehra",
        role: "Marketing Lead at KLYRR",
        image: cpoImage,
        linkedin: "https://linkedin.com",
        bio: "Treats 1SYX like a live experiment in his own hands first. If a playbook does not work on our campaigns, it never gets suggested for yours.",
      },
      {
        id: 10,
        name: "Aarya Shetty",
        role: "Brand and Experience Design",
        image: cpoImage,
        linkedin: "https://linkedin.com",
        bio: "Designs how clarity feels inside the product and in every touch around it. Her job is simple, make it impossible to forget what 1SYX stands for.",
      },
    ],
    hr: [
      {
        id: 11,
        name: "Anjana Khandelwal",
        role: "Head of Human Resources and Recruitment",
        image: cpoImage,
        linkedin: "https://linkedin.com",
        bio: "Protects the culture that lets people tell the truth about the work. Brings in humans who care more about craft than titles.",
      },
    ],
  };

  const teamMembers = teamData[activeTeam];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-red-500 selection:text-white flex flex-col overflow-x-hidden">
      <main className="flex-1 w-full">
        {/* Section 1: Overview */}
        <section 
          id="overview"
          className="relative py-20 md:py-32 px-6 border-b border-zinc-100 bg-cover bg-center"
          style={{ backgroundImage: `url(${overviewBg})` }}
        >
          {/* Overlay to ensure readability */}
           <div className="absolute inset-0 bg-white/20"></div>
          
          <div className="relative container mx-auto max-w-4xl text-center z-10">
            <h1 className="text-4xl md:text-7xl font-bold mb-8 text-zinc-900 tracking-tight">
            The team trying to give sharp people the story they <span className="text-red-600">deserve.</span>
            
            </h1>
            <div className="space-y-6 text-lg md:text-2xl text-zinc-900 leading-relaxed font-light">
              <p>
              If you sat with this team with no logos or titles in sight, you would see one thing.
              </p>
              <p>
              People who have spent years watching better products lose to louder stories, sharp ideas die in decks, good deals stall on vague follow ups, and ops hold it all together with duct tape.
              </p>
              <p>
              KLYRR is the house we built to fix that on purpose. 1SYX is the first tool in that house.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Leadership */}
        <section className="py-10 md:py-16 px-6 bg-zinc-50 border-b border-zinc-200">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-8">
                <span className="text-8xl">1</span>SYX Leadership
              </h2>
              
              <div className="space-y-2 text-lg md:text-xl text-zinc-900 leading-relaxed font-light">
              <p>
              We are not chasing hype.
              </p>
              <p>
              We are a small, obsessed group who have all seen the same problem from different seats and chose to fix it together.
              </p>
              <p>
              If you use 1SYX, you are trusting the people whose fingerprints are all over it.
              </p>
            </div>
              
            </div>

            {/* Team Navigation */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { id: 'technical', label: 'Product' },
                { id: 'sales', label: 'Sales' },
                { id: 'marketing', label: 'Marketing' },
                { id: 'hr', label: 'HR' },
              ].map((team) => (
                <button
                  key={team.id}
                  onClick={() => setActiveTeam(team.id as typeof activeTeam)}
                  className={cn(
                    "text-sm font-medium transition-colors border border-transparent rounded-full px-4 py-2",
                    activeTeam === team.id
                      ? "bg-accent text-white hover:bg-accent/90"
                      : "bg-white text-black hover:text-accent/70 hover:bg-zinc-100"
                  )}
                >
                  {team.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[280px]">
                  <TeamCard member={member} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hiring Section */}
        <section className="relative min-h-screen flex items-center bg-black">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 z-10 pointer-events-none">
              {/* Subtle dark gradient from bottom to top for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <img 
              src={nothiringBg} 
              alt="Not hiring workers, but torchbearers" 
              className="w-full h-full object-cover"
              style={{ filter: "saturate(0.90) brightness(0.70)" }}
            />
          </div>

          <div className="relative z-20 w-full py-20 lg:py-32">
            <div className="container mx-auto px-6 max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Side - Heading and Text */}
                <div className="flex flex-col justify-center">
                  <div className="max-w-xl mb-8 lg:mb-0">
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white mb-8">
                      Not hiring workers, but <span className="text-red-600">torchbearers</span> with skin in.
                    </h2>
                  </div>
                  
                  <div className="max-w-xl">
                    <p className="text-lg md:text-2xl font-bold leading-relaxed text-white/90">
                      If you want real ownership, meaningful ESOPs, and work you can point to years from now and say,"I helped build that,"you are exactly who we want to talk to.
                    </p>
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="relative border-l border-white/20 flex flex-col justify-center pl-6 lg:pl-8 pr-0">
                  <div className="max-w-xl">
                    <p className="text-lg md:text-2xl font-light leading-relaxed text-white/90 mb-6">
                      Pick anyone on this page, connect on LinkedIn, and tell us one thing: What would you fix first, and why should it be you doing it?
                    </p>
                    <p className="text-lg md:text-2xl font-bold leading-relaxed text-white/90 mb-6">
                      If you make yourself impossible to ignore, we will find you a seat.
                    </p>
                    <a 
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Make yourself impossible to ignore - connect on LinkedIn"
                      className="inline-block px-8 py-4 bg-white text-black text-lg font-medium rounded-md hover:bg-white/90 transition-colors duration-300"
                    >
                      Make yourself impossible to ignore
                    </a>
                    <p className="text-sm text-white/60 mt-4">
                      No applications. No roles. Just initiative.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
