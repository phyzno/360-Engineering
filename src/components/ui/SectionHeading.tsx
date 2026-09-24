"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  theme?: "light" | "dark";
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  theme = "light",
}: SectionHeadingProps) {
  const isDark = theme === "dark";
  return (
    <div className={`mb-16 ${centered ? "text-center flex flex-col items-center" : ""}`}>
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className={`tracking-[0.2em] uppercase text-sm font-semibold mb-4 block ${
            isDark ? "text-[var(--color-brand-300)]" : "text-[var(--color-brand-700)]"
          }`}
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className={`text-h2 mb-6 ${
          isDark ? "text-white" : "text-[var(--color-neutral-900)]"
        }`}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`h-[1px] w-24 bg-gradient-to-r from-[var(--color-brand-500)] to-transparent ${
          centered ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
