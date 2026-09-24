"use client";

import { motion } from "framer-motion";
import { ComparisonAccordion } from "@/components/ui/ComparisonAccordion";

export function InteractiveShowcase() {
  return (
    <section className="section-padding bg-white text-[var(--color-neutral-900)] relative overflow-clip">

      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--color-brand-500)] tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-4 flex items-center justify-center gap-4"
          >
            <span className="w-8 h-[1px] bg-[var(--color-brand-500)]"></span>
            Interactive Showcase
            <span className="w-8 h-[1px] bg-[var(--color-brand-500)]"></span>
          </motion.p>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-h2 font-heading text-[var(--color-neutral-900)] leading-tight mb-6"
          >
            Experience the <span className="italic text-[var(--color-brand-500)] font-light">Transformation</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600/75 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto"
          >
            Explore our renovation craftsmanship through interactive before & after comparisons of our bespoke spaces.
          </motion.p>
        </div>
      </div>

      {/* Content Area */}
      <div className="pb-24">
        <ComparisonAccordion />
      </div>
    </section>
  );
}
