"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

export default function PortfolioShowcase({ initialProjects = [] }: { initialProjects?: any[] }) {
  // Use up to 3 projects for the showcase
  const projects = (initialProjects || []).slice(0, 3).map((p, i) => ({
    ...p,
    parallaxSpeed: [0.2, 0.1, 0.15][i],
    year: p.year || (p.created_at ? new Date(p.created_at).getFullYear().toString() : new Date().getFullYear().toString()),
  }));

  const containerRef = useRef(null);
  
  return (
    <section ref={containerRef} className="section-padding bg-white relative overflow-hidden">

      <div className="container-wide relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[var(--color-brand-500)] tracking-[0.3em] uppercase text-xs md:text-sm font-semibold mb-4 flex items-center gap-4"
            >
              <span className="w-8 h-[1px] bg-[var(--color-brand-500)]"></span>
              Selected Works
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-h2 text-[var(--color-neutral-900)] leading-tight"
            >
              Featured <span className="italic text-gray-500 font-light">Projects</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/portfolio" className="group relative inline-flex items-center gap-3 pb-2 border-b border-gray-300 hover:border-[var(--color-brand-500)] active:border-[var(--color-brand-500)] transition-colors">
              <span className="text-sm tracking-widest uppercase font-medium text-gray-600 group-hover:text-[var(--color-neutral-900)] group-active:text-[var(--color-neutral-900)] transition-colors">View All</span>
              <ArrowUpRight size={16} className="text-[var(--color-brand-500)] group-hover:translate-x-1 group-hover:-translate-y-1 group-active:translate-x-1 group-active:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="flex flex-col gap-24 md:gap-40">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const isEven = index % 2 === 0;

  return (
    <div ref={cardRef} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-20 items-center`}>
      {/* Image Container with Parallax */}
      <div className="w-full lg:w-[65%] relative h-[400px] md:h-[600px] overflow-hidden rounded-sm group">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 65vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            quality={90}
          />
        </motion.div>
        {/* Glass Overlay on Hover */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="w-full lg:w-[35%] flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 text-gray-500 text-sm tracking-widest uppercase mb-6"
        >
          <span>{(index + 1).toString().padStart(2, '0')}</span>
          <span className="w-6 h-[1px] bg-gray-300" />
          <span>{project.year}</span>
        </motion.div>
        
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl font-heading mb-4 text-[var(--color-neutral-900)]"
        >
          {project.title}
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[var(--color-brand-500)] mb-10 tracking-widest text-sm uppercase font-semibold"
        >
          {project.category}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link href={`/portfolio/${project.slug}`} className="group inline-flex items-center gap-4 text-gray-600 hover:text-[var(--color-brand-500)] active:text-[var(--color-brand-500)] transition-colors">
            <div className="w-12 h-12 rounded-full border border-gray-300 group-hover:border-[var(--color-brand-500)] group-active:border-[var(--color-brand-500)] flex items-center justify-center transition-colors">
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-active:translate-x-0.5 group-active:-translate-y-0.5 transition-transform" />
            </div>
            <span className="text-sm tracking-widest uppercase font-medium group-hover:text-[var(--color-brand-500)] group-active:text-[var(--color-brand-500)] transition-colors">Discover</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
