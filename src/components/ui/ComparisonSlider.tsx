"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { GripVertical } from "lucide-react";
import Image from "next/image";

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function ComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
}: ComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Set up framer-motion values for the draggable handle
  const x = useMotionValue(0);
  
  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        if (width > 0) {
          setContainerWidth(width);
          x.set(width / 2);
        }
      }
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [x]);

  // Dynamically calculate clip-path based on the dragged position (x)
  const clipPath = useTransform(
    x, 
    (value) => `inset(0 ${Math.max(0, containerWidth - value)}px 0 0)`
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-xl md:rounded-2xl group bg-white"
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt="After renovation"
          fill
          className="object-cover"
        />
        <div className="absolute top-3 right-3 md:top-6 md:right-6 bg-white/85 text-[var(--color-neutral-900)] px-2.5 py-1 md:px-5 md:py-2 rounded-full text-[10px] md:text-sm tracking-wider uppercase font-medium backdrop-blur-md pointer-events-none border border-[var(--color-brand-500)]/30 shadow-xl whitespace-nowrap z-10">
          <span className="sm:hidden">After</span>
          <span className="hidden sm:inline">{afterLabel}</span>
        </div>
      </div>

      {/* Before Image (Foreground, clipped) */}
      <motion.div
        className="absolute inset-0 overflow-hidden z-20"
        style={{ clipPath }}
      >
        <Image
          src={beforeImage}
          alt="Before renovation"
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3 md:top-6 md:left-6 bg-white/85 text-[var(--color-neutral-900)] px-2.5 py-1 md:px-5 md:py-2 rounded-full text-[10px] md:text-sm tracking-wider uppercase font-medium backdrop-blur-md pointer-events-none border border-[var(--color-brand-500)]/30 shadow-xl whitespace-nowrap z-10">
          <span className="sm:hidden">Before</span>
          <span className="hidden sm:inline">{beforeLabel}</span>
        </div>
      </motion.div>

      {/* Drag Handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-[2px] bg-[var(--color-brand-500)] cursor-ew-resize z-30 flex items-center justify-center shadow-[0_0_12px_rgba(201,168,76,0.6)]"
        style={{ x }}
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0}
        dragMomentum={false}
      >
        <div className="absolute w-11 h-11 md:w-12 md:h-12 bg-[var(--color-brand-500)] text-black rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-110">
          <GripVertical size={22} className="opacity-90 stroke-[2.5]" />
        </div>
      </motion.div>
    </div>
  );
}