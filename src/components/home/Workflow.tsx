"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, Variants } from "framer-motion";
import { Compass, Layers, Handshake, Hammer, KeySquare } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

const workflowSteps = [
  {
    title: "Discovery & Site Visit",
    description: "We begin by understanding your unique vision, lifestyle, and preferences, followed by precise spatial measurements to establish the foundation of our design.",
    number: "01",
    icon: Compass,
  },
  {
    title: "3D Visualization & Layout",
    description: "Watch your space come to life. We curate bespoke material mood boards and provide detailed 3D visualizations for your complete approval.",
    number: "02",
    icon: Layers,
  },
  {
    title: "Estimation & Agreement",
    description: "Trust is built on transparency. We provide clear, detailed budgeting and establish a realistic timeline for your project's completion.",
    number: "03",
    icon: Handshake,
  },
  {
    title: "Sourcing & Site Execution",
    description: "Our network of master craftsmen and expert engineers meticulously bring the design to reality, using only the finest sourced materials.",
    number: "04",
    icon: Hammer,
  },
  {
    title: "Quality Audit & Handover",
    description: "After a rigorous final inspection to ensure our exacting standards are met, we hand over the keys to your perfectly realized sanctuary.",
    number: "05",
    icon: KeySquare,
  }
];

// Framer motion variants
const cardVariants: Variants = {
  hidden: { 
    opacity: 0.3, 
    y: 50, 
    scale: 0.95,
    filter: "brightness(0.4) sepia(50%) hue-rotate(-30deg)" // Makes it dark and slightly brownish/gold when inactive
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    filter: "brightness(1) sepia(0%) hue-rotate(0deg)",
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1], // Custom smooth ease
      staggerChildren: 0.15
    } 
  }
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function Workflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pathData, setPathData] = useState("");
  const [svgHeight, setSvgHeight] = useState(0);
  
  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Smooth spring animation for the moving light/thick line
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  // Position for the traveling glowing orb (Mobile only now)
  const orbPosition = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const calculatePath = () => {
      if (!containerRef.current) return;
      
      const width = window.innerWidth;
      // Only for desktop
      if (width < 768) {
        setPathData("");
        return;
      }

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      setSvgHeight(rect.height);

      const steps = container.querySelectorAll('.step-container');
      if (steps.length === 0) return;

      const nodes = Array.from(steps).map(step => {
        const stepRect = step.getBoundingClientRect();
        return {
          y: (stepRect.top - rect.top) + (stepRect.height / 2),
          x: rect.width / 2
        };
      });

      let d = `M ${nodes[0].x} ${nodes[0].y} `;
      const r = 24; 
      const offset = rect.width * 0.15; 

      for (let i = 0; i < nodes.length - 1; i++) {
        const curr = nodes[i];
        const next = nodes[i + 1];
        const isEven = i % 2 === 0;
        const direction = isEven ? 1 : -1;
        const targetX = curr.x + (offset * direction);
        const sweep1 = isEven ? 1 : 0;
        const sweep2 = isEven ? 1 : 0;
        
        d += `L ${targetX - r * direction} ${curr.y} `;
        d += `A ${r} ${r} 0 0 ${sweep1} ${targetX} ${curr.y + r} `;
        d += `L ${targetX} ${next.y - r} `;
        d += `A ${r} ${r} 0 0 ${sweep2} ${targetX - r * direction} ${next.y} `;
        d += `L ${next.x} ${next.y} `;
      }
      setPathData(d);
    };

    calculatePath();
    window.addEventListener('resize', calculatePath);
    
    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      observer = new ResizeObserver(calculatePath);
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', calculatePath);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <section className="section-padding bg-white border-t border-gray-200 overflow-hidden relative">
      <div className="container-wide">
        <SectionHeading 
          title="Our Design Process" 
          subtitle="How We Work" 
          centered 
        />
        
        <div className="relative mt-20 max-w-5xl mx-auto" ref={containerRef}>
          
          {/* Base Thin Line (Mobile Only) */}
          <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-gray-50 -translate-x-1/2 md:hidden" />
          
          {/* Animated Thick Line (The "Light") (Mobile Only) */}
          <motion.div 
            className="absolute left-8 top-0 bottom-0 w-[3px] bg-[var(--color-brand-500)] origin-top -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(201,168,76,0.6)] md:hidden"
            style={{ scaleY: smoothProgress }}
          />

          {/* Traveling Glowing Orb (Mobile Only) */}
          <motion.div 
            className="absolute left-8 w-3 h-3 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 z-20 shadow-[0_0_20px_5px_rgba(201,168,76,0.8)] md:hidden"
            style={{ top: orbPosition }}
          />

          {/* Desktop SVG Zigzag Overlay */}
          {pathData && (
            <svg 
              className="absolute top-0 left-0 w-full hidden md:block z-0 pointer-events-none" 
              style={{ height: svgHeight }}
            >
              {/* Faint Background Path */}
              <path 
                d={pathData} 
                fill="none" 
                stroke="rgba(201,168,76,0.2)" 
                strokeWidth="2" 
              />
              
              {/* Animated Glowing Light Path */}
              <motion.path 
                d={pathData} 
                fill="none" 
                stroke="#c9a84c" 
                strokeWidth="3"
                style={{ pathLength: smoothProgress }}
                className="drop-shadow-[0_0_15px_rgba(201,168,76,0.6)]"
              />
            </svg>
          )}

          <div className="flex flex-col gap-10 md:gap-16 relative z-20 pb-10">
            {workflowSteps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={index} 
                  className={`step-container relative flex items-center justify-between flex-col md:flex-row ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  
                  {/* Timeline Node (Circle on the line) */}
                  <div className="absolute top-1/2 left-8 md:left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-[var(--color-brand-500)] bg-white z-30 flex items-center justify-center shadow-[0_0_10px_rgba(201,168,76,0.3)]">
                    {/* Pulsating Ring */}
                    <motion.div 
                      className="absolute w-full h-full rounded-full border border-[var(--color-brand-500)]"
                      initial={{ scale: 1, opacity: 0.8 }}
                      whileInView={{ scale: 2.2, opacity: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    />
                    {/* Inner Solid Dot */}
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-[var(--color-brand-500)]"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: false, margin: "-150px" }}
                      transition={{ duration: 0.5, type: "spring", bounce: 0.6 }}
                    />
                  </div>
                  
                  {/* Card Content */}
                  <div className={`w-full md:w-5/12 pl-20 md:pl-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <motion.div 
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.2 }}
                      className="bg-gradient-to-br from-[#ffffff] to-[#f5f0e8] p-8 md:p-10 rounded-[24px] shadow-[0_20px_50px_rgba(201,168,76,0.9)] transition-all duration-500 relative group hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(255,140,0,0.4)] cursor-default"
                    >
                      {/* Beautiful Decorative Frame */}
                      <div className="absolute inset-3 border border-gray-300/40 rounded-[16px] pointer-events-none transition-colors duration-500 group-hover:border-[var(--color-brand-500)]/40">
                        {/* Corner Accents */}
                        <div className="absolute -top-[1px] -left-[1px] w-6 h-6 border-t-[3px] border-l-[3px] border-[var(--color-brand-500)] rounded-tl-[16px] transition-all duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1" />
                        <div className="absolute -top-[1px] -right-[1px] w-6 h-6 border-t-[3px] border-r-[3px] border-[var(--color-brand-500)] rounded-tr-[16px] transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        <div className="absolute -bottom-[1px] -left-[1px] w-6 h-6 border-b-[3px] border-l-[3px] border-[var(--color-brand-500)] rounded-bl-[16px] transition-all duration-500 group-hover:-translate-x-1 group-hover:translate-y-1" />
                        <div className="absolute -bottom-[1px] -right-[1px] w-6 h-6 border-b-[3px] border-r-[3px] border-[var(--color-brand-500)] rounded-br-[16px] transition-all duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
                      </div>

                      {/* Number Watermark (Parallax on hover) */}
                      <div className={`absolute top-4 ${isEven ? 'right-6' : 'left-6'} font-heading text-6xl md:text-8xl font-bold text-black/5 z-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-[var(--color-brand-500)]/10 group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-3`}>
                        {step.number}
                      </div>
                      
                      <div className="relative z-10">
                        {/* Premium Icon Header */}
                        <motion.div variants={textVariants} className={`flex items-center gap-4 mb-6 ${isEven ? 'justify-end' : 'justify-start'}`}>
                          {isEven && <div className="w-12 h-[1px] bg-[#d4c5ae]" />}
                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--color-brand-500)]/10 transition-colors duration-500">
                            <step.icon className="w-5 h-5 text-[var(--color-brand-500)]" strokeWidth={1.5} />
                          </div>
                          {!isEven && <div className="w-12 h-[1px] bg-[#d4c5ae]" />}
                        </motion.div>

                        <motion.h3 variants={textVariants} className="font-heading text-xl md:text-2xl font-bold text-black uppercase tracking-[0.08em] mb-4">
                          {step.title}
                        </motion.h3>
                        
                        <motion.div variants={textVariants} className={`w-10 h-[2px] bg-[var(--color-brand-500)] mb-5 ${isEven ? 'ml-auto' : ''}`} />
                        
                        <motion.p variants={textVariants} className="font-sans text-[14px] md:text-[15px] leading-relaxed text-black/80">
                          {step.description}
                        </motion.p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty space to balance the zigzag layout */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}