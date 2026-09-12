"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type ProductVariant = {
  colorName: string;
  colorHex: string;
  image: string;
};

export type ShowcaseItem = {
  id: string;
  name: string;
  variants: ProductVariant[];
};

interface ProductShowcaseSliderProps {
  items: ShowcaseItem[];
}

export default function ProductShowcaseSlider({ items }: ProductShowcaseSliderProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<number, number>>({});

  if (!items || items.length === 0) return null;

  const currentItem = items[currentSlideIndex];
  const rawVariantIndex = selectedVariants[currentSlideIndex] || 0;
  const activeVariantIndex = rawVariantIndex < currentItem.variants.length ? rawVariantIndex : 0;
  const activeVariant = currentItem.variants[activeVariantIndex] || currentItem.variants[0];

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleVariantChange = (variantIndex: number) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [currentSlideIndex]: variantIndex,
    }));
  };

  return (
    <div className="w-full bg-[#f4f2ef] py-16 lg:py-24 relative overflow-hidden border-b border-[#e2ddd5]">
      <div className="container-wide relative z-10">
        
        {/* Slider Controls (Desktop) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 lg:left-12 z-20 hidden md:block">
          <button 
            onClick={handlePrevSlide}
            className="p-4 rounded-full bg-white/80 backdrop-blur-md text-[#0a1206] hover:bg-white hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            aria-label="Previous product"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        
        <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 lg:right-12 z-20 hidden md:block">
          <button 
            onClick={handleNextSlide}
            className="p-4 rounded-full bg-white/80 backdrop-blur-md text-[#0a1206] hover:bg-white hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            aria-label="Next product"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Main Presentation Area */}
        <div className="flex flex-col items-center max-w-5xl mx-auto">
          
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] mb-8 rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentSlideIndex}-${activeVariantIndex}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={activeVariant.image}
                    alt={`${currentItem.name} in ${activeVariant.colorName}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Variant Name Display */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20">
              <motion.p 
                key={activeVariant.colorName}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-heading text-[10px] md:text-sm tracking-[0.2em] text-[#0a1206] font-bold uppercase drop-shadow-md"
              >
                {activeVariant.colorName}
              </motion.p>
            </div>
            
            <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
              <h3 className="font-heading text-[10px] md:text-sm tracking-widest text-[#0a1206] font-bold uppercase drop-shadow-md text-right max-w-[200px] md:max-w-none">
                {currentItem.name}
              </h3>
            </div>
          </div>

          {/* Color Swatches */}
          <div className="flex flex-col items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-6">
              {currentItem.variants.map((variant, idx) => (
                <button
                  key={idx}
                  onClick={() => handleVariantChange(idx)}
                  className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeVariantIndex === idx ? "scale-110" : "hover:scale-110 opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Select ${variant.colorName}`}
                >
                  <span 
                    className="w-8 h-8 rounded-full shadow-inner"
                    style={{ backgroundColor: variant.colorHex }}
                  />
                  {activeVariantIndex === idx && (
                    <motion.div
                      layoutId="activeSwatchRing"
                      className="absolute inset-0 rounded-full border border-[#0a1206]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
            
            {/* Mobile Slide Controls */}
            <div className="flex items-center justify-between w-full max-w-[200px] mt-4 md:hidden">
              <button onClick={handlePrevSlide} className="p-3 text-[#0a1206]/60 hover:text-[#0a1206]">
                <ChevronLeft size={24} />
              </button>
              <div className="text-sm tracking-widest text-[#0a1206]/60">
                {currentSlideIndex + 1} / {items.length}
              </div>
              <button onClick={handleNextSlide} className="p-3 text-[#0a1206]/60 hover:text-[#0a1206]">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
