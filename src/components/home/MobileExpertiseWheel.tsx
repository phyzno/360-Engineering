"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
}

interface MobileExpertiseWheelProps {
  services: ServiceItem[];
}

// Physical link dimensions for the watch bracelet chain
const LINK_HEIGHT = 54;
const LINK_GAP = 6;
const ITEM_STEP = LINK_HEIGHT + LINK_GAP; // 60px per chain link step

// 7 slots rendered (-3 to +3) so links entering/leaving top & bottom glide smoothly across 5 visible slots
const RENDER_OFFSETS = [-3, -2, -1, 0, 1, 2, 3];

export default function MobileExpertiseWheel({ services }: MobileExpertiseWheelProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const total = services.length;
  const touchStartY = useRef<number | null>(null);
  const currentDragY = useRef(0);
  const lastHapticIndex = useRef(activeIndex);

  // Subtle tactile haptic vibration for supported mobile devices
  const triggerHaptic = useCallback(() => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(12);
      } catch {
        // Silently catch if not supported
      }
    }
  }, []);

  const changeIndex = useCallback(
    (newIndex: number) => {
      const normalized = ((newIndex % total) + total) % total;
      setActiveIndex(normalized);
      if (lastHapticIndex.current !== normalized) {
        triggerHaptic();
        lastHapticIndex.current = normalized;
      }
    },
    [total, triggerHaptic]
  );

  // Smooth continuous roll animation to a target offset
  const rollToOffset = useCallback(
    (offsetSteps: number) => {
      if (offsetSteps === 0 || isAnimating) return;
      setIsAnimating(true);

      const targetY = -offsetSteps * ITEM_STEP;
      const startY = currentDragY.current;

      animate(startY, targetY, {
        type: "spring",
        stiffness: 320,
        damping: 30,
        mass: 0.8,
        onUpdate: (latest) => {
          currentDragY.current = latest;
          setDragY(latest);
        },
        onComplete: () => {
          currentDragY.current = 0;
          setDragY(0);
          setIsAnimating(false);
          changeIndex(activeIndex + offsetSteps);
        },
      });
    },
    [activeIndex, changeIndex, isAnimating]
  );

  // Touch handlers for continuous 1:1 physical chain movement
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null || isAnimating) return;
    const currentY = e.touches[0].clientY;
    const delta = currentY - touchStartY.current;

    // Apply slight resistance when dragging far
    const dampedDelta = delta * 0.95;
    currentDragY.current = dampedDelta;
    setDragY(dampedDelta);
  };

  const handleTouchEnd = () => {
    if (touchStartY.current === null || isAnimating) return;
    touchStartY.current = null;

    const currentOffset = currentDragY.current;

    // If it was just a tap (movement < 5px), do nothing and let the click event fire
    if (Math.abs(currentOffset) < 5) {
      currentDragY.current = 0;
      setDragY(0);
      return;
    }

    // Determine how many link steps to roll based on drag distance
    const steps = Math.round(-currentOffset / ITEM_STEP);

    setIsAnimating(true);
    const targetY = -steps * ITEM_STEP;

    animate(currentOffset, targetY, {
      type: "spring",
      stiffness: 340,
      damping: 28,
      mass: 0.7,
      onUpdate: (latest) => {
        currentDragY.current = latest;
        setDragY(latest);
      },
      onComplete: () => {
        currentDragY.current = 0;
        setDragY(0);
        setIsAnimating(false);
        if (steps !== 0) {
          changeIndex(activeIndex + steps);
        }
      },
    });
  };

  const currentService = services[activeIndex];

  return (
    <div className="w-full flex gap-3 items-stretch h-[500px] select-none relative">
      {/* Left Area: Dynamic Showcase Card */}
      <div className="flex-1 relative rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentService.id}
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.04, y: -8 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 flex flex-col justify-between p-5"
          >
            {/* Background Image with Layered Luxury Dark Vignette */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src={currentService.image}
                alt={currentService.title}
                fill
                priority
                className="object-cover object-center transform transition-transform duration-1000 scale-105"
                sizes="(max-width: 1024px) 80vw, 50vw"
                quality={85}
              />
              <div className="absolute inset-0 bg-gray-50/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
            </div>

            {/* Top Pill Badge */}
            <div className="relative flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase bg-white/90 text-[var(--color-brand-500)] border border-[var(--color-brand-500)]/30 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)] animate-pulse" />
                Expertise {currentService.id}
              </span>
              <span className="text-[11px] tracking-widest text-gray-500 uppercase font-mono">
                {activeIndex + 1} / {total}
              </span>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 space-y-3">
              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.08 }}
                className="text-2xl font-heading text-[var(--color-neutral-900)] leading-tight"
              >
                {currentService.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.12 }}
                className="text-xs text-gray-500 leading-relaxed line-clamp-3"
              >
                {currentService.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.16 }}
                className="pt-2"
              >
                <Link
                  href={currentService.link}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--color-brand-500)] text-white text-xs font-semibold tracking-wide hover:bg-[#dfba59] active:scale-95 transition-all duration-200 shadow-md shadow-[#c9a84c]/15"
                >
                  <span>Explore Service</span>
                  <ArrowUpRight size={15} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Rail: Luxury Watch Bracelet Chain Track */}
      <div
        className="w-[82px] relative flex flex-col justify-center items-center rounded-2xl bg-gray-50 border border-gray-200 overflow-hidden shadow-2xl select-none touch-none z-10"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          perspective: "650px",
          perspectiveOrigin: "center center",
        }}
      >
        {/* Watch Bezel Channel Rails (Left & Right Metallic Guide Grooves) */}
        <div className="absolute left-[3px] inset-y-0 w-[1px] bg-gradient-to-b from-transparent via-gray-200 to-transparent pointer-events-none z-20" />
        <div className="absolute right-[3px] inset-y-0 w-[1px] bg-gradient-to-b from-transparent via-gray-200 to-transparent pointer-events-none z-20" />

        {/* Subtle Edge Vignettes (Non-intrusive, so all 5 numbers remain 100% visible and sharp) */}
        <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-white/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-white/80 to-transparent z-20 pointer-events-none" />

        {/* Continuous 3D Moving Chain Track */}
        <div
          className="w-full relative flex flex-col items-center justify-center pointer-events-auto"
          style={{
            height: `${5 * ITEM_STEP}px`,
            transformStyle: "preserve-3d",
          }}
        >
          {RENDER_OFFSETS.map((offset) => {
            const targetIndex = ((activeIndex + offset) % total + total) % total;
            const item = services[targetIndex];

            // Dynamic continuous position: base offset + live drag offset
            const continuousOffset = offset + dragY / ITEM_STEP;
            const absOffset = Math.abs(continuousOffset);

            // Interpolate 3D cylindrical drum curvature - gentle angle so all numbers face user and stay readable
            const rotateX = -continuousOffset * 12; // Gentle 3D perspective angle
            const scale = Math.max(0.82, 1.06 - absOffset * 0.09);

            // Keep all 5 visible numbers clearly visible with high contrast
            const opacity =
              absOffset > 2.35
                ? Math.max(0, 1 - (absOffset - 2.35) * 3) // Smooth fade only beyond the 5 visible slots
                : Math.max(0.72, 1 - absOffset * 0.12); // High baseline opacity for all 5 slots

            const isCenter = absOffset < 0.45;

            // Physical Y position relative to track center
            const itemY = offset * ITEM_STEP + dragY;

            return (
              <div
                key={`link-${offset}-${item.id}`}
                onClick={() => rollToOffset(offset)}
                className="absolute inset-x-2 cursor-pointer outline-none transition-transform"
                style={{
                  height: `${LINK_HEIGHT}px`,
                  top: `calc(50% - ${LINK_HEIGHT / 2}px)`,
                  transform: `translateY(${itemY}px) rotateX(${rotateX}deg) scale(${scale})`,
                  transformOrigin: "center center",
                  opacity,
                  transformStyle: "preserve-3d",
                  zIndex: isCenter ? 20 : 10 - Math.round(absOffset),
                }}
              >
                {/* Watch Bracelet Link Plate (Matches User Image Exactly) */}
                <div className="w-full h-full rounded-[10px] relative flex items-center justify-between px-2 transition-colors duration-200 border border-[var(--color-brand-500)]/50 bg-gradient-to-b from-neutral-800 to-neutral-950 shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                  {/* Left Pin (Dot + Line) */}
                  <div className="flex flex-col items-center">
                    <div className="w-[3px] h-[3px] rounded-full bg-[var(--color-brand-500)] shadow-[0_0_4px_#c9a84c]" />
                    <div className="w-[1px] h-2 bg-[var(--color-brand-500)]/40 mt-[3px]" />
                  </div>

                  {/* Center Content: Number & Underline */}
                  <div className="flex-1 flex flex-col items-center justify-center -mt-0.5">
                    <span className="font-heading tracking-widest text-[var(--color-brand-500)] font-bold text-lg drop-shadow-[0_0_6px_rgba(201,168,76,0.5)]">
                      {item.id}
                    </span>
                    <div className="h-[2px] rounded-full w-5 bg-[var(--color-brand-500)] mt-0.5" />
                  </div>

                  {/* Right Pin (Dot + Line) */}
                  <div className="flex flex-col items-center">
                    <div className="w-[3px] h-[3px] rounded-full bg-[var(--color-brand-500)] shadow-[0_0_4px_#c9a84c]" />
                    <div className="w-[1px] h-2 bg-[var(--color-brand-500)]/40 mt-[3px]" />
                  </div>
                </div>

                {/* Micro Chain Connector Link Shadow between plates */}
                <div className="w-6 h-[3px] mx-auto bg-gray-200 rounded-full opacity-70" />
              </div>
            );
          })}
        </div>

        {/* Tactile Roll Hint */}
        <div className="absolute bottom-1 text-[8px] text-gray-400 tracking-widest uppercase font-mono z-30 pointer-events-none opacity-60">
          Roll
        </div>
      </div>
    </div>
  );
}
