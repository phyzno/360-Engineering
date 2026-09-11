import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a1206] text-[#f5f0e8]">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0 h-[120%] -top-[10%] w-full animate-fade-in delay-300">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Architecture"
          fill
          priority
          className="object-cover object-center" 
          quality={100}
          sizes="100vw"
        />
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-[#0a1206]/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1206] via-[#0a1206]/30 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1206]/80 via-transparent to-[#0a1206]/80 opacity-60" />
      </div>

      {/* Floating Badge */}
      <div 
        className="absolute top-32 left-8 md:left-16 z-20 glass-card px-6 py-3 rounded-full flex items-center gap-3 border border-white/10 animate-fade-in-up delay-1500"
      >
        <div className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
        <span className="text-xs uppercase tracking-widest text-white/80">Award Winning Studio</span>
      </div>

      {/* Main Content */}
      <div 
        className="container-wide relative z-10 flex flex-col justify-center h-full w-full pt-20 animate-fade-in delay-700"
      >
        <div className="max-w-7xl">
          <p
            className="text-[#c9a84c] tracking-[0.4em] uppercase text-xs md:text-sm font-semibold mb-6 flex items-center gap-4 animate-fade-in-left delay-800"
          >
            <span className="w-12 h-[1px] bg-[#c9a84c]"></span>
            Redefining Spaces
          </p>
          
          <div className="overflow-hidden py-2">
            <h1
              className="text-display mb-2 leading-[0.9] animate-fade-in-up delay-1000"
            >
              Curating <span className="italic font-light text-white/60">Modern</span>
            </h1>
          </div>
          <div className="overflow-hidden py-2 mb-10">
            <h1
              className="text-display leading-[0.9] animate-fade-in-up delay-1000"
            >
              <span className="text-gold-gradient">Masterpieces</span>
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <p
              className="text-white/60 text-lg max-w-md font-light leading-relaxed animate-fade-in delay-1500"
            >
              From conceptual architecture to luxury turnkey fit-outs, we design environments that seamlessly blend functionality with timeless aesthetics.
            </p>
            
            <div
              className="w-full sm:w-auto animate-fade-in delay-1800"
            >
              <Link href="/portfolio" className="group relative overflow-hidden rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 sm:px-8 flex items-center justify-center gap-3 transition-all hover:bg-white/20 w-full sm:w-auto">
                <span className="relative z-10 text-xs sm:text-sm tracking-widest uppercase font-medium">Explore Portfolio</span>
                <div className="w-8 h-8 rounded-full bg-[#c9a84c] flex-shrink-0 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                  <ArrowRight size={14} className="text-[#0a1206]" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-10 left-8 md:left-16 flex items-center gap-4 z-10 cursor-pointer animate-fade-in delay-2000"
      >
        <Link href="#stats" className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <ChevronDown size={16} className="text-white/60" />
          </div>
          <span className="text-white/40 text-[10px] uppercase tracking-[0.2em]">Scroll to explore</span>
        </Link>
      </div>
    </section>
  );
}
