"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ComparisonSlider } from "./ComparisonSlider";
import { ChevronDown, Sparkles } from "lucide-react";

interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  beforeImage: string;
  afterImage: string;
}

const projects: Project[] = [
  {
    id: "living-room",
    number: "01",
    title: "Minimalist Modern Living Space",
    subtitle: "Open-plan renovation with bespoke oak cabinetry",
    beforeImage: "https://images.unsplash.com/photo-1731557482469-35cd8c3a378b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    afterImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "kitchen",
    number: "02",
    title: "Luxury Chef's Kitchen & Island",
    subtitle: "Italian marble countertops & architectural brass lighting",
    beforeImage: "https://images.unsplash.com/photo-1591438649454-b21e5072256e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    afterImage: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "bedroom",
    number: "03",
    title: "Master Suite Sanctuary",
    subtitle: "Warm neutral tones with custom acoustic wood slats",
    beforeImage: "https://images.unsplash.com/photo-1637958163265-6214375cfc90?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    afterImage: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export function ComparisonAccordion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track scroll progress along the 260vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Switch active card based on scroll position
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress < 0.35) {
      setActiveIndex(0);
    } else if (progress < 0.7) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
    }
  });

  return (
    <div ref={containerRef} className="relative w-full min-h-[260vh]">
      {/* Sticky container that remains in viewport while scrolling */}
      <div className="sticky top-20 md:top-24 min-h-[80vh] flex flex-col justify-center py-6 px-4 md:px-6">
        <div className="max-w-6xl w-full mx-auto flex flex-col gap-3">
          {projects.map((project, index) => {
            const isExpanded = activeIndex === index;

            return (
              <motion.div
                key={project.id}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`relative rounded-2xl md:rounded-3xl border transition-all duration-300 overflow-hidden shadow-2xl ${
                  isExpanded
                    ? "bg-[#1a2912]/90 border-[#c9a84c]/40 ring-1 ring-[#c9a84c]/25 shadow-[0_20px_50px_rgba(10,18,6,0.8)]"
                    : "bg-[#0f1a0a]/75 hover:bg-[#1a2912]/60 border-white/10 hover:border-[#c9a84c]/25 cursor-pointer backdrop-blur-md"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {/* Album Header / Tab */}
                <div className="flex items-center justify-between p-4 md:p-6 select-none">
                  <div className="flex items-center gap-4 md:gap-6">
                    <span
                      className={`text-xs md:text-sm font-mono px-3 py-1 rounded-full border transition-colors ${
                        isExpanded
                          ? "bg-[#c9a84c]/15 text-[#c9a84c] border-[#c9a84c]/30"
                          : "bg-white/5 text-[#d4c5ae]/60 border-white/10"
                      }`}
                    >
                      {project.number}
                    </span>
                    <div>
                      <h3
                        className={`text-lg md:text-2xl font-heading transition-colors ${
                          isExpanded ? "text-[#f5f0e8]" : "text-[#d4c5ae]/80"
                        }`}
                      >
                        {project.title}
                      </h3>
                      <p className="text-xs md:text-sm text-[#d4c5ae]/60 font-light hidden sm:block">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {isExpanded && (
                      <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-[#c9a84c] bg-[#c9a84c]/10 px-3 py-1 rounded-full border border-[#c9a84c]/25 tracking-wide">
                        <Sparkles size={12} className="text-[#c9a84c]" /> Drag slider to compare
                      </span>
                    )}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
                        isExpanded
                          ? "bg-[#c9a84c]/15 border-[#c9a84c]/30 text-[#c9a84c]"
                          : "bg-transparent border-white/10 text-[#d4c5ae]/60"
                      }`}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </div>
                </div>

                {/* Expanded Content with Slider */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="px-4 pb-4 md:px-6 md:pb-6"
                    >
                      <div className="w-full overflow-hidden rounded-xl md:rounded-2xl border border-[#c9a84c]/20">
                        <ComparisonSlider
                          beforeImage={project.beforeImage}
                          afterImage={project.afterImage}
                          beforeLabel="Before Renovation"
                          afterLabel="After Renovation"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
