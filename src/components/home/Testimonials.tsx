"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, ShieldCheck } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

const testimonials = [
  {
    id: 1,
    quote: "Arch Concept didn't just redesign our home; they reimagined how we live. The attention to detail and connection to natural elements is unparalleled.",
    author: "Sarah & James Sterling",
    role: "Residential Clients",
    initial: "S"
  },
  {
    id: 2,
    quote: "Working with the Arch Concept team was a seamless experience. They understood our brand vision perfectly and translated it into a breathtaking commercial space.",
    author: "Elena Rodriguez",
    role: "Founder, Oasis Boutique",
    initial: "E"
  },
  {
    id: 3,
    quote: "The way they manipulate light and texture creates such a calming atmosphere. Our living room has truly become our sanctuary.",
    author: "Michael Chang",
    role: "Residential Client",
    initial: "M"
  },
  {
    id: 4,
    quote: "From the initial consultation to the final reveal, everything was handled with absolute professionalism and a deep understanding of aesthetics.",
    author: "David & Emma Thompson",
    role: "Residential Clients",
    initial: "D"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const totalReviews = testimonials.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalReviews);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  };

  const handleCardClick = (index: number) => {
    const diff = (index - activeIndex + totalReviews) % totalReviews;
    if (diff === 1) handleNext();
    if (diff === totalReviews - 1) handlePrev();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();

    setTouchStart(0);
    setTouchEnd(0);
  };

  const getCardStyle = (index: number) => {
    const diff = (index - activeIndex + totalReviews) % totalReviews;

    if (diff === 0) {
      return "translate-x-0 scale-100 opacity-100 z-30 shadow-[0_25px_60px_rgba(0,0,0,0.5)] rotate-0 blur-none pointer-events-auto";
    } else if (diff === 1) {
      return "translate-x-[30%] sm:translate-x-[45%] md:translate-x-[60%] scale-[0.85] opacity-60 z-20 shadow-xl rotate-6 blur-[1px] cursor-pointer hover:opacity-80 hover:scale-[0.88] pointer-events-auto";
    } else if (diff === totalReviews - 1) {
      return "-translate-x-[30%] sm:-translate-x-[45%] md:-translate-x-[60%] scale-[0.85] opacity-60 z-20 shadow-xl -rotate-6 blur-[1px] cursor-pointer hover:opacity-80 hover:scale-[0.88] pointer-events-auto";
    } else {
      return "translate-x-0 scale-75 opacity-0 z-10 rotate-0 pointer-events-none";
    }
  };

  return (
    <section className="section-padding bg-[#0f1a0a] border-t border-[#1a2912] overflow-hidden">
      <div className="container-wide">
        
        <SectionHeading 
          title="What Customers Say" 
          subtitle="Client Satisfaction" 
          centered 
        />

        <div
          className="relative flex justify-center items-center w-full min-h-[400px] md:min-h-[430px] px-4 touch-pan-y mt-12 md:mt-16"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {testimonials.map((review, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={review.id}
                onClick={() => handleCardClick(index)}
                className={`absolute w-[80vw] sm:w-[360px] lg:w-[400px] flex flex-col bg-[#f5f0e8] border border-[#d4c5ae]/60 p-6 md:p-8 rounded-[24px] transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] select-none ${getCardStyle(index)}`}
              >
                <Quote className="absolute top-6 right-6 w-12 h-12 md:w-16 md:h-16 text-[#0f1a0a]/5 -rotate-12" />

                <div className="flex items-center justify-between mb-6 md:mb-8 relative z-10">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isActive ? 'fill-[#c9a84c] text-[#c9a84c]' : 'fill-[#d4c5ae] text-[#d4c5ae]'} transition-colors duration-500`} />
                    ))}
                  </div>
                  <div className={`flex items-center gap-1.5 transition-colors duration-500 ${isActive ? 'text-[#0f1a0a]/70' : 'text-[#0f1a0a]/30'}`}>
                    <ShieldCheck className="w-4 h-4 stroke-[2]" />
                    <span className="font-sans text-[9px] font-bold uppercase tracking-[0.15em]">Verified</span>
                  </div>
                </div>

                <p className={`font-sans text-[14px] md:text-[15px] leading-relaxed tracking-wide mb-8 md:mb-10 flex-grow relative z-10 italic transition-colors duration-500 ${isActive ? 'text-[#0f1a0a]/80' : 'text-[#0f1a0a]/40'}`}>
                  &quot;{review.quote}&quot;
                </p>

                <div className="mt-auto border-t border-[#d4c5ae]/60 pt-4 md:pt-5 relative z-10 flex items-center gap-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex shrink-0 items-center justify-center font-heading text-lg font-bold transition-all duration-500 ${isActive ? 'bg-[#0f1a0a] text-[#c9a84c]' : 'bg-[#d4c5ae]/30 text-[#0f1a0a]/30'}`}>
                    {review.initial}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h4 className={`font-heading text-base md:text-lg font-bold tracking-[0.05em] transition-colors duration-500 ${isActive ? 'text-[#0f1a0a]' : 'text-[#0f1a0a]/40'}`}>
                      {review.author}
                    </h4>
                    <span className={`font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.15em] transition-colors duration-500 ${isActive ? 'text-[#c9a84c]' : 'text-[#0f1a0a]/30'}`}>
                      {review.role}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center items-center gap-6 mt-6 md:mt-12 relative z-40">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-[#1a2912] bg-[#0f1a0a] text-[#f5f0e8] flex items-center justify-center hover:bg-[#111d0b] hover:text-[#c9a84c] hover:border-[#c9a84c] shadow-sm transition-all duration-300 active:scale-90 cursor-pointer"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
          </button>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-[#1a2912] bg-[#0f1a0a] text-[#f5f0e8] flex items-center justify-center hover:bg-[#111d0b] hover:text-[#c9a84c] hover:border-[#c9a84c] shadow-sm transition-all duration-300 active:scale-90 cursor-pointer"
            aria-label="Next Review"
          >
            <ChevronRight className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

      </div>
    </section>
  );
}
