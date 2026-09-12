import { Building2, Home, Hammer, Clock, ShieldCheck, Sparkles, TrendingUp, Users, HeartHandshake } from "lucide-react";

export type Benefit = {
  title: string;
  description: string;
  icon: any; // Using any for simplicity with Lucide icons
  image?: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type ServiceData = {
  title: string;
  description: string;
  heroImage: string;
  benefits: Benefit[];
  faqs: FAQ[];
};

export const servicesData: Record<string, ServiceData> = {
  commercial: {
    title: "Commercial Spaces",
    description: "Designing productive, inspiring, and brand-aligned workspaces that foster growth, collaboration, and success for your business.",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
    benefits: [
      {
        title: "Enhanced Productivity",
        description: "Optimized layouts and ergonomic designs that boost employee focus and efficiency.",
        icon: TrendingUp,
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Brand Identity",
        description: "Spaces that reflect your company's core values and leave a lasting impression on clients.",
        icon: Building2,
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Employee Well-being",
        description: "Incorporating natural light, biophilic elements, and comfortable breakout areas.",
        icon: Users,
        image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Timely Execution",
        description: "We understand that time is money. We deliver projects strictly on schedule.",
        icon: Clock,
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
      },
    ],
    faqs: [
      {
        question: "How long does a typical commercial interior project take?",
        answer: "The timeline depends on the scale and complexity of the project. A small office might take 4-6 weeks, while a full corporate headquarters could take several months. We provide a detailed timeline during the consultation phase."
      },
      {
        question: "Do you handle all the regulatory approvals?",
        answer: "Yes, our team assists with acquiring all necessary permits and ensures the design complies with local building codes and safety regulations."
      },
      {
        question: "Can we incorporate our brand colors into the design?",
        answer: "Absolutely. We work closely with your brand guidelines to subtly or boldly integrate your brand identity into the physical space."
      }
    ]
  },
  residential: {
    title: "Residential Interiors",
    description: "Transforming houses into homes with bespoke designs that reflect your personality, lifestyle, and aspirations.",
    heroImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop",
    benefits: [
      {
        title: "Personalized Design",
        description: "Every element is curated to match your unique taste and everyday needs.",
        icon: HeartHandshake,
        image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Comfort & Functionality",
        description: "We balance aesthetic appeal with practical solutions for comfortable living.",
        icon: Home,
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Premium Quality",
        description: "Partnering with top suppliers to ensure long-lasting materials and flawless finishes.",
        icon: Sparkles,
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Peace of Mind",
        description: "From concept to handover, we manage everything so you can relax.",
        icon: ShieldCheck,
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop",
      },
    ],
    faqs: [
      {
        question: "What is your residential design process?",
        answer: "We start with a detailed consultation to understand your vision, followed by concept creation, 3D renderings, material selection, and finally, execution and styling."
      },
      {
        question: "Do you design single rooms or only full houses?",
        answer: "While we specialize in full-home transformations, we also take on select single-room projects depending on our current schedule and the project's scope."
      },
      {
        question: "Can I use some of my existing furniture?",
        answer: "Yes! We love blending meaningful existing pieces with new designs to create a space that feels truly yours."
      }
    ]
  },
  renovation: {
    title: "Renovation & Remodeling",
    description: "Breathing new life into old spaces. We expertly upgrade, restructure, and modernize your existing property.",
    heroImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop",
    benefits: [
      {
        title: "Value Addition",
        description: "Strategic upgrades that significantly increase the market value of your property.",
        icon: TrendingUp,
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Structural Integrity",
        description: "Ensuring all modifications are safe, sound, and built to last.",
        icon: ShieldCheck,
        image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Modern Upgrades",
        description: "Integrating smart home tech and modern amenities into older structures.",
        icon: Sparkles,
        image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=800&auto=format&fit=crop",
      },
      {
        title: "Efficient Execution",
        description: "Minimizing disruption to your daily life with streamlined project management.",
        icon: Hammer,
        image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=800&auto=format&fit=crop",
      },
    ],
    faqs: [
      {
        question: "Do I need to move out during the renovation?",
        answer: "It depends on the scope. For a full-gut renovation, moving out is usually necessary. For partial remodeling, we try to contain the work area to minimize disruption."
      },
      {
        question: "How do you handle unexpected structural issues?",
        answer: "Our initial assessment is thorough, but if hidden issues (like old wiring or plumbing) arise, we immediately inform you and present transparent solutions and cost implications before proceeding."
      },
      {
        question: "Do you handle both exterior and interior renovations?",
        answer: "Our primary focus is on interior architecture and design, but we do handle exterior facade upgrades that tie into the interior aesthetic."
      }
    ]
  }
};
