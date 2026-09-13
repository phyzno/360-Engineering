"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const featuredProducts = [
  {
    category: "wallpaper",
    title: "Art Deco Geometric Wallpaper",
    color: "Cream & Gold",
    image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789197523/330f6c66-550c-4596-a81b-f1ce5af21630.png",
    href: "/products/wallpaper",
    textColor: "text-black/80",
  },
  {
    category: "rugs",
    title: "Traditional Persian Rug",
    color: "Burgundy Red",
    image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789200788/6bf512b1-b730-422c-b92b-19bbed6d54ae.png",
    href: "/products/rugs",
    textColor: "text-white/90",
  },
  {
    category: "tiles",
    title: "Bookmatched Marble Slabs",
    color: "Calacatta Gold",
    image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789181579/058c745c-e4c0-480a-85c2-67f3eac2f002.png",
    href: "/products/tiles",
    textColor: "text-black/80",
  },
  {
    category: "sofa",
    title: "Classic Chesterfield Leather Sofa",
    color: "Cognac Brown",
    image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789196306/880daa8d-6fe5-4baf-8ad0-7c317d12e8ad.png",
    href: "/products/sofa",
    textColor: "text-white/90",
  },
  {
    category: "lighting",
    title: "Modern Branching Chandelier",
    color: "Brushed Brass",
    image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789183244/320d53c3-4a40-4a0d-93ac-b8184f154643.png",
    href: "/products/lighting",
    textColor: "text-white/90",
  },
  {
    category: "curtains",
    title: "Sheer Linen Curtains",
    color: "Natural Beige",
    image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789157088/Gemini_Generated_Image_r9m7whr9m7whr9m7_cmgadw.jpg",
    href: "/products/curtains",
    textColor: "text-black/80",
  },
];

export default function FeaturedProduct() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start or restart the auto-rotation interval
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer mx-auto bg-[#0a1206]"
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -50) {
                  // Swipe left -> Next
                  setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
                  startTimer();
                } else if (swipe > 50) {
                  // Swipe right -> Previous
                  setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
                  startTimer();
                }
              }}
            >
              <Link 
                href={featuredProducts[currentIndex].href} 
                className="absolute inset-0 z-20"
                onClick={(e) => {
                  // Prevent click if we were dragging
                  // This is a simple heuristic, framer-motion usually handles it but just in case
                }}
              >
                <span className="sr-only">View {featuredProducts[currentIndex].category} Collection</span>
              </Link>

              <Image
                src={featuredProducts[currentIndex].image}
                alt={`${featuredProducts[currentIndex].title} - ${featuredProducts[currentIndex].color}`}
                fill
                className="object-cover transition-transform duration-[10000ms] ease-linear group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 1024px"
                quality={90}
                priority
                draggable={false}
              />
              
              {/* Subtle Overlay to ensure text readability without hiding image */}
              <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20 z-10"></div>
              
              {/* Top Title */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute top-6 left-6 right-6 md:top-10 md:left-auto md:right-10 z-30"
              >
                <h3 className={`text-[10px] sm:text-xs md:text-sm tracking-[0.2em] uppercase font-semibold text-left md:text-right line-clamp-2 md:line-clamp-none ${featuredProducts[currentIndex].textColor}`}>
                  {featuredProducts[currentIndex].title}
                </h3>
              </motion.div>

              {/* Bottom Color */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute bottom-6 left-6 right-32 md:bottom-10 md:left-10 md:right-auto z-30"
              >
                <p className={`text-[10px] sm:text-xs md:text-sm tracking-[0.2em] uppercase font-semibold truncate md:overflow-visible md:whitespace-normal ${featuredProducts[currentIndex].textColor}`}>
                  {featuredProducts[currentIndex].color}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Indicators */}
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-1/2 md:translate-x-1/2 z-30 flex gap-2">
            {featuredProducts.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIndex(idx);
                  startTimer(); // Reset auto-rotation timer on manual selection
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx 
                    ? "bg-[#c9a84c] w-6" 
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 md:mt-12 flex justify-center"
        >
          <Link 
            href="/products" 
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
