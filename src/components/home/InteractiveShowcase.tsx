"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ComparisonAccordion } from "@/components/ui/ComparisonAccordion";
import { VirtualTour } from "@/components/ui/VirtualTour";
import { View, SplitSquareHorizontal } from "lucide-react";

export function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState<"comparison" | "tour">("comparison");

  return (
    <section className="section-padding bg-[#0a1206] text-[#f5f0e8] relative overflow-clip">
      {/* Subtle Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.02]">
        <h2 className="text-[14vw] font-heading font-bold whitespace-nowrap text-[#f5f0e8]">TRANSFORMATION</h2>
      </div>

      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#c9a84c] tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-4 flex items-center justify-center gap-4"
          >
            <span className="w-8 h-[1px] bg-[#c9a84c]"></span>
            Interactive Showcase
            <span className="w-8 h-[1px] bg-[#c9a84c]"></span>
          </motion.p>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-h2 font-heading text-[#f5f0e8] leading-tight mb-6"
          >
            Experience the <span className="italic text-[#c9a84c] font-light">Transformation</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#d4c5ae]/75 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto"
          >
            Explore our renovation craftsmanship through interactive before & after comparisons and immersive 3D virtual walkthroughs of our bespoke spaces.
          </motion.p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex bg-[#1a2912]/80 p-1.5 rounded-full border border-[#c9a84c]/20 shadow-2xl backdrop-blur-md">
            <button
              onClick={() => setActiveTab("comparison")}
              className={`relative flex items-center gap-2.5 px-6 py-3 rounded-full text-xs md:text-sm tracking-wider uppercase font-medium transition-colors z-10 ${
                activeTab === "comparison" ? "text-[#f5f0e8] font-semibold" : "text-[#d4c5ae]/70 hover:text-[#f5f0e8]"
              }`}
            >
              {activeTab === "comparison" && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-[#c9a84c] rounded-full -z-10 shadow-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <SplitSquareHorizontal size={17} className={activeTab === "comparison" ? "text-[#f5f0e8]" : "text-[#c9a84c]"} />
              Before & After
            </button>
            <button
              onClick={() => setActiveTab("tour")}
              className={`relative flex items-center gap-2.5 px-6 py-3 rounded-full text-xs md:text-sm tracking-wider uppercase font-medium transition-colors z-10 ${
                activeTab === "tour" ? "text-[#f5f0e8] font-semibold" : "text-[#d4c5ae]/70 hover:text-[#f5f0e8]"
              }`}
            >
              {activeTab === "tour" && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-[#c9a84c] rounded-full -z-10 shadow-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <View size={17} className={activeTab === "tour" ? "text-[#f5f0e8]" : "text-[#c9a84c]"} />
              3D Virtual Tour
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === "comparison" ? (
          <motion.div
            key="comparison"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ComparisonAccordion />
          </motion.div>
        ) : (
          <motion.div
            key="tour"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pb-24 max-w-6xl mx-auto px-4 md:px-6"
          >
            <VirtualTour />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
