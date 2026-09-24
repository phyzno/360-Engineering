"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/data/servicesData";

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="w-full max-w-3xl mx-auto border-t border-gray-200">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div 
            key={index}
            className={`border-b border-gray-200 transition-colors duration-500 ${isOpen ? "bg-gray-50" : "hover:bg-gray-50/50"}`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              className="w-full py-6 md:py-8 px-4 md:px-6 flex items-center gap-4 md:gap-6 text-left group"
            >
              <span className="text-[var(--color-brand-500)] font-serif text-xl w-6 md:w-8 flex-shrink-0 opacity-70">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <span className={`flex-1 font-medium text-lg md:text-xl transition-colors duration-300 ${isOpen ? "text-[var(--color-brand-500)]" : "text-gray-900 group-hover:text-[var(--color-brand-500)]"}`}>
                {faq.question}
              </span>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 flex-shrink-0 ${isOpen ? "bg-[var(--color-brand-500)] border-[var(--color-brand-500)] text-white" : "border-gray-300 text-gray-500 group-hover:border-[var(--color-brand-500)]/50 group-hover:text-[var(--color-brand-500)]"}`}>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} 
                />
              </div>
            </button>
            
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-4 md:px-6 pb-8 pl-[3.5rem] md:pl-[5.5rem] text-gray-600 text-base md:text-lg leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
