"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { projects, Project } from "@/data/projects";

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
      className="group relative aspect-[4/5] overflow-hidden"
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
          className={`absolute inset-0 bg-gradient-to-t from-[#0a1206]/90 via-[#0a1206]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            isInView ? "max-lg:opacity-100" : ""
          }`} 
        />
        <div 
          className={`absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100 ${
            isInView ? "max-lg:translate-y-0 max-lg:opacity-100" : ""
          }`}
        >
          <p className="text-[#c9a84c] text-sm uppercase tracking-widest font-semibold mb-2">
            {project.category} {project.subcategory ? `- ${project.subcategory}` : ""}
          </p>
          <h3 className="font-heading text-2xl text-[#f5f0e8] mb-0">
            {project.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}

export default function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

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
                ? "bg-[#c9a84c] border-[#c9a84c] text-[#0a1206]"
                : "border-[#243a19] text-[#9ba89e] hover:border-[#c9a84c] hover:text-[#c9a84c]"
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
