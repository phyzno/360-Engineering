"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function CtaBanner() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <section ref={containerRef} className="section-padding relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#0a1206]">
      {/* Background Gradient & Noise */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1206] to-black z-0" />
      <div className="absolute inset-0 noise mix-blend-overlay opacity-30 z-0" />
      
      {/* Large Blurred Circle */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute bottom-0 translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[#c9a84c]/10 blur-[120px] z-0 pointer-events-none"
      />

      <div className="container-wide relative z-10 text-center flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[#c9a84c] tracking-[0.4em] uppercase text-xs md:text-sm font-semibold mb-8"
        >
          Have a project in mind?
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden mb-12"
        >
          <h2 className="text-display text-[#f5f0e8] leading-[0.9] whitespace-normal">
            Let&apos;s Create <br />
            <span className="italic font-light text-[#f5f0e8]/50">Something</span> <br />
            <span className="text-gold-gradient">Extraordinary</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link href="/contact" className="group relative flex items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 active:bg-white/10 transition-all duration-500 overflow-hidden">
            {/* Magnetic Hover Effect Background */}
            <div className="absolute inset-0 bg-[#c9a84c] translate-y-full rounded-full group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-500 ease-in-out" />
            
            <div className="relative z-10 flex flex-col items-center gap-2 group-hover:text-black group-active:text-black transition-colors duration-500">
              <span className="text-sm tracking-widest uppercase font-semibold">Start</span>
              <span className="text-sm tracking-widest uppercase font-semibold">Project</span>
              <ArrowRight size={20} className="mt-2 -rotate-45 group-hover:rotate-0 group-active:rotate-0 transition-transform duration-500" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
