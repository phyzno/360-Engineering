"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatProps {
  end: number;
  label: string;
  suffix?: string;
  delay?: number;
}

function AnimatedCounter({ end, label, suffix = "", delay = 0 }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;
    const duration = 2500; // 2.5 seconds

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [isInView, end, delay]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: delay }}
      className="flex flex-col items-center text-center relative group"
    >
      <div className="absolute inset-0 bg-[#c9a84c]/5 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
      <div className="font-heading text-6xl md:text-7xl text-[#f5f0e8] mb-4 flex items-center relative z-10">
        {count}
        <span className="text-[#c9a84c]">{suffix}</span>
      </div>
      <div className="w-12 h-[1px] bg-white/20 mb-6 relative z-10" />
      <span className="text-[#f5f0e8]/60 uppercase tracking-[0.2em] text-xs font-semibold relative z-10">
        {label}
      </span>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="relative section-padding bg-[#0a1206] overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 noise mix-blend-overlay opacity-20 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c9a84c]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          <AnimatedCounter end={12} label="Years Experience" suffix="+" delay={0.1} />
          <AnimatedCounter end={150} label="Projects Completed" suffix="+" delay={0.3} />
          <AnimatedCounter end={24} label="Design Awards" delay={0.5} />
          <AnimatedCounter end={98} label="Happy Clients" suffix="%" delay={0.7} />
        </div>
      </div>
    </section>
  );
}
