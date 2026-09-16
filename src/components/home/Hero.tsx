import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a1206] text-[#f5f0e8]">
      {/* Dynamic Background Video */}
      <div className="absolute inset-0 z-0 h-[120%] -top-[10%] w-full animate-fade-in delay-300">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="https://www.pexels.com/download/video/7578547/" type="video/mp4" />
        </video>
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-[#0a1206]/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1206] via-[#0a1206]/30 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1206]/80 via-transparent to-[#0a1206]/80 opacity-60" />
      </div>

      {/* Floating Badge */}
      <div 
        className="absolute top-28 left-1/2 -translate-x-1/2 md:translate-x-0 md:top-32 md:left-16 z-20 glass-card px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-2 md:gap-3 border border-white/10 animate-fade-in-up delay-1500 w-max"
      >
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#c9a84c] animate-pulse" />
        <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/80">Award Winning Studio</span>
      </div>

      {/* Main Content */}
      <div 
        className="container-wide relative z-10 flex flex-col justify-center h-full w-full pt-24 md:pt-20 animate-fade-in delay-700"
      >
        <div className="max-w-7xl flex flex-col items-center md:items-start text-center md:text-left w-full">
          <p
            className="text-[#c9a84c] tracking-[0.3em] md:tracking-[0.4em] uppercase text-[10px] md:text-xs font-semibold mb-4 md:mb-6 flex items-center justify-center md:justify-start gap-3 md:gap-4 animate-fade-in-left delay-800 w-full"
          >
            <span className="w-8 md:w-12 h-[1px] bg-[#c9a84c]"></span>
            <span>Redefining Spaces</span>
            <span className="w-8 h-[1px] bg-[#c9a84c] md:hidden"></span>
          </p>
          
          <div className="overflow-hidden py-2 mb-6 md:mb-10 w-full">
            <h1
              className="text-display leading-[0.95] md:leading-[0.9] animate-fade-in-up delay-1000"
            >
              <span className="block mb-1 md:mb-2">Curating <span className="italic font-light text-white/60">Modern</span></span>
              <span className="text-gold-gradient">Masterpieces</span>
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center w-full md:justify-start">
            <p
              className="text-white/70 text-base md:text-lg max-w-md font-light leading-relaxed animate-fade-in delay-1500 text-center md:text-left mx-auto md:mx-0"
            >
              From conceptual architecture to premium turnkey interior solutions across Bangladesh, we design environments that seamlessly blend functionality with timeless aesthetics tailored to your lifestyle.
            </p>
            
            <div
              className="w-full sm:w-auto animate-fade-in delay-1800 flex justify-center md:justify-start"
            >
              <Link href="/portfolio" className="group relative overflow-hidden rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3.5 sm:px-8 sm:py-4 flex items-center justify-center gap-3 transition-all hover:bg-white/20 w-auto">
                <span className="relative z-10 text-[11px] sm:text-xs tracking-widest uppercase font-medium">Explore Portfolio</span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#c9a84c] flex-shrink-0 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                  <ArrowRight size={14} className="text-[#0a1206]" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-10 md:left-16 flex items-center gap-4 z-10 cursor-pointer animate-fade-in delay-2000"
      >
        <Link href="#stats" className="flex items-center gap-3 md:gap-4 group">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <ChevronDown size={14} className="text-white/60 md:w-4 md:h-4" />
          </div>
          <span className="hidden sm:block text-white/40 text-[10px] uppercase tracking-[0.2em]">Scroll to explore</span>
        </Link>
      </div>
    </section>
  );
}
