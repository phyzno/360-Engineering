"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";

// Accept Project type here since we're removing the static import
export type Project = any; 

const categories = ["All", "Residential", "Commercial", "Renovation"];

export function ProjectCard({ project }: { project: Project }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, margin: "0px 0px -10% 0px" });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      ref={ref}
      className="group relative aspect-[4/5] overflow-hidden rounded-xl"
    >
      <Link href={`/portfolio/${project.slug}`} className="block w-full h-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-1000 group-hover:scale-110 ${
            isInView ? "max-lg:scale-110" : ""
          }`}
        />
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            isInView ? "max-lg:opacity-100" : ""
          }`} 
        />
        <div 
          className={`absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100 ${
            isInView ? "max-lg:translate-y-0 max-lg:opacity-100" : ""
          }`}
        >
          <p className="text-[#d96b11] text-sm uppercase tracking-widest font-semibold mb-2">
            {project.category} {project.subcategory ? `- ${project.subcategory}` : ""}
          </p>
          <h3 className="font-heading text-2xl text-white mb-0">
            {project.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}

export default function PortfolioGallery({ initialProjects }: { initialProjects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? initialProjects 
    : initialProjects.filter((p: any) => p.category === activeCategory);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full border text-sm font-medium tracking-wide transition-colors ${
              activeCategory === cat
                ? "bg-[var(--color-brand-500)] border-[var(--color-brand-500)] text-black"
                : "border-gray-200 text-gray-500 hover:border-[var(--color-brand-500)] hover:text-[var(--color-brand-500)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
