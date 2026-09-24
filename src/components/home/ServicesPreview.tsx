"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import { ArrowUpRight } from "lucide-react";
import MobileExpertiseWheel from "./MobileExpertiseWheel";

const services = [
  {
    id: "01",
    title: "Architectural Integration",
    description: "Seamlessly blending interior spaces with structural architecture for cohesive, flowing environments.",
    link: "/services#architecture",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Biophilic Design",
    description: "Integrating natural elements, light, and organic materials to create spaces that enhance well-being and connection to nature.",
    link: "/services#biophilic",
    image: "https://images.unsplash.com/photo-1530153739137-cafe11da39aa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "03",
    title: "Smart Ecosystems",
    description: "Discreetly embedding the latest home automation and technology to elevate modern luxury living.",
    link: "/services#smart-home",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Custom Furniture",
    description: "Designing and crafting bespoke furniture pieces that perfectly align with your space, offering unparalleled comfort and premium aesthetics.",
    link: "/services#custom-furniture",
    image: "https://images.unsplash.com/photo-1659976733536-dfa71f6015d7?q=80&w=645&auto=format&fit=crop"
  },
  {
    id: "05",
    title: "Custom Millwork",
    description: "Designing and crafting tailored cabinetry, joinery, and architectural woodwork of the highest caliber.",
    link: "/services#millwork",
    image: "https://images.unsplash.com/photo-1613798399365-419496c18abc?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "06",
    title: "Atmosphere & Lighting",
    description: "Sculpting spaces with natural and artificial light to create dynamic moods and highlight architectural details.",
    link: "/services#lighting",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200&auto=format&fit=crop"
  }
];

export default function ServicesPreview() {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  return (
    <section className="section-padding bg-white border-t border-gray-200">
      <div className="container-wide">
        <SectionHeading 
          title="Our Expertise" 
          subtitle="Services" 
        />
        
        {/* Mobile View: 3D Cylindrical Drum Wheel Scroller */}
        <div className="lg:hidden mt-8">
          <MobileExpertiseWheel services={services} />
        </div>

        {/* Desktop View: Preserved Original Two-Column Interactive Layout */}
        <div className="hidden lg:flex flex-row gap-12 mt-16 min-h-[600px]">
          {/* Left Side: Services List */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                className="group relative"
              >
                <Link 
                  href={service.link}
                  className={`block py-8 border-b border-gray-200 transition-all duration-500 relative z-10 ${
                    hoveredIndex === index ? "pl-8" : "pl-0"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <span className={`font-heading text-sm transition-colors duration-500 ${
                        hoveredIndex === index ? "text-[var(--color-brand-500)]" : "text-gray-500"
                      }`}>
                        {service.id}
                      </span>
                      <h3 className={`text-2xl md:text-3xl font-heading transition-colors duration-500 ${
                        hoveredIndex === index ? "text-[var(--color-brand-500)]" : "text-[var(--color-neutral-900)] group-hover:text-gray-600"
                      }`}>
                        {service.title}
                      </h3>
                    </div>
                    <ArrowUpRight 
                      size={24} 
                      className={`transition-all duration-500 ${
                        hoveredIndex === index 
                          ? "text-[var(--color-brand-500)] translate-x-0 opacity-100" 
                          : "text-gray-400 -translate-x-4 opacity-0 group-hover:opacity-50"
                      }`} 
                    />
                  </div>
                  
                  {/* Expanded description on mobile or when hovered on desktop */}
                  <div className={`overflow-hidden transition-all duration-500 ${
                    hoveredIndex === index ? "max-h-32 mt-4" : "max-h-0"
                  }`}>
                    <p className="text-gray-500 ml-12 pr-4 max-w-md">
                      {service.description}
                    </p>
                  </div>
                </Link>
                
                {/* Active Indicator Line */}
                <div 
                  className={`absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--color-brand-500)] transition-all duration-500 origin-top ${
                    hoveredIndex === index ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                  }`} 
                />
              </motion.div>
            ))}
          </div>

          {/* Right Side: Image Reveal */}
          <div className="lg:w-1/2 relative h-[400px] lg:h-auto overflow-hidden bg-gray-50 rounded-sm group">
            {services.map((service, index) => (
              <motion.div
                key={`img-${service.id}`}
                initial={false}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1 : 1.05,
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: hoveredIndex === index ? 10 : 1 }}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-white/20 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-60" />
              </motion.div>
            ))}
            
            <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
              <motion.div
                key={`explore-${hoveredIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3 text-[var(--color-neutral-900)] uppercase tracking-widest text-sm font-semibold"
              >
                <div className="w-8 h-[1px] bg-[var(--color-brand-500)]" />
                Explore Service
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

