"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../ui/SectionHeading";

export default function AboutTeaser() {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Image with Parallax/Reveal Effect */}
          <div className="relative h-[600px] lg:h-[700px] w-full img-overlay">
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full relative"
            >
              <Image
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop"
                alt="360 Engineering and Consultancy Design Studio"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Decorative Gold Frame */}
              <div className="absolute -inset-4 border border-[var(--color-brand-500)]/30 z-10 pointer-events-none hidden md:block" />
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="lg:pl-8">
            <SectionHeading 
              title="A Harmony of Elements" 
              subtitle="Our Philosophy" 
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-gray-600 mb-6 text-lg">
                At 360 Engineering and Consultancy, one of Bangladesh's premier interior design firms, we believe that true luxury lies in the delicate balance 
                between bold architectural lines and the organic, calming presence of nature.
              </p>
              <p className="text-gray-500 mb-10 leading-relaxed">
                Founded on the principle that our environments deeply impact our well-being, 
                our Dhaka-based studio specializes in creating bespoke interiors for residential and commercial spaces across the country. Using premium materials, contextual design, 
                and masterful lighting, we transform ordinary spaces into extraordinary sanctuaries.
              </p>
              
              <Link href="/about" className="btn-outline">
                Discover Our Story
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
