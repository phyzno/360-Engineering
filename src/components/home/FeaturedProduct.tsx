"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedProduct() {
  return (
    <section className="bg-[#050803] relative border-t border-white/5 py-16 md:py-24">
      
      {/* Section Title */}
      <div className="container-wide mb-8 md:mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center flex flex-col items-center"
        >
          <span className="text-[#c9a84c] text-sm tracking-[0.3em] uppercase mb-3">Featured Product</span>
          <h2 className="text-3xl md:text-4xl font-serif text-white">Premium Collection</h2>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer mx-auto"
        >
          <Link href="/products/wallpaper" className="absolute inset-0 z-20">
            <span className="sr-only">View Wallpaper Collection</span>
          </Link>

          <Image
            src="https://res.cloudinary.com/djr5ztmep/image/upload/v1789197523/330f6c66-550c-4596-a81b-f1ce5af21630.png"
            alt="Art Deco Geometric Wallpaper - Cream & Gold"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 1024px"
            quality={90}
          />
          
          {/* Subtle Overlay to ensure text readability without hiding image */}
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/5"></div>
          
          {/* Top Right Title (No box) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute top-6 right-6 md:top-10 md:right-10 z-10"
          >
            <h3 className="text-black/80 text-xs md:text-sm tracking-[0.2em] uppercase font-semibold">
              Art Deco Geometric Wallpaper
            </h3>
          </motion.div>

          {/* Bottom Left Color (No box) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10"
          >
            <p className="text-black/80 text-xs md:text-sm tracking-[0.2em] uppercase font-semibold">
              Cream & Gold
            </p>
          </motion.div>

        </motion.div>

        {/* Bottom CTA (Moved below image) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 md:mt-12 flex justify-center"
        >
          <Link 
            href="/products/wallpaper" 
            className="inline-flex items-center gap-4 group"
          >
            <span className="text-white uppercase tracking-widest text-sm border-b border-[#c9a84c] pb-1 transition-colors group-hover:text-[#c9a84c]">
              Explore Collection
            </span>
            <span className="w-10 h-10 rounded-full border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c] transition-all duration-300 group-hover:border-[#c9a84c] group-hover:border-[2px] active:scale-95">
              <span className="transform transition-transform duration-300 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </span>
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
