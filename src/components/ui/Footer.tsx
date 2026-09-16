"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// Social media SVG icons
// ... (rest remains same)
const Instagram = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Facebook = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Linkedin = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "loading" || status === "success"}
        placeholder="Your email address" 
        className="w-full bg-[#0a1409]/80 border border-[#243a19] rounded-lg py-3 px-4 text-[#f5f0e8] placeholder:text-[#6a9e72] focus:outline-none focus:border-[#c9a84c] transition-all duration-200 text-sm disabled:opacity-50"
        required
      />
      <button 
        type="submit" 
        disabled={status === "loading" || status === "success"}
        className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#c9a84c]/15 hover:bg-[#c9a84c] text-[#c9a84c] hover:text-black rounded-md transition-all duration-200 font-semibold text-xs tracking-wider uppercase disabled:opacity-50"
      >
        {status === "loading" ? "..." : status === "success" ? "Done" : "Join"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-xs mt-2 absolute -bottom-5 left-0">Error subscribing. Try again.</p>
      )}
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-black pt-6 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floating Bento Card Container */}
      <div className="bg-[#101e0f]/95 backdrop-blur-xl border border-[#c9a84c]/35 rounded-[2rem] lg:rounded-[2.5rem] pt-16 pb-10 px-6 sm:px-10 lg:px-16 mx-auto max-w-[1400px] shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_50px_rgba(201,168,76,0.12)] relative overflow-hidden">
        
        {/* Subtle Ambient Gold Radial Glow */}
        <div 
          className="absolute -top-24 right-1/4 w-96 h-96 bg-[#c9a84c]/10 rounded-full blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 relative z-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex flex-col items-center mb-6 group w-max">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-[48px] h-[48px] md:w-[60px] md:h-[60px] relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(201,168,76,0.4)] group-active:scale-95">
                  <Image src="/logo-360.png" alt="360 Engineering and Consultancy Logo" fill className="object-contain" sizes="60px" />
                </div>
                <span className="font-heading text-4xl md:text-5xl font-bold leading-none tracking-wider text-[#c9a84c] group-hover:text-[#f5f0e8] transition-colors mt-1">360</span>
              </div>
              <div className="flex flex-col mt-2 items-center text-center text-[8.5px] md:text-[10.5px] font-semibold tracking-[0.25em] uppercase leading-tight text-[#c9a84c] group-hover:text-[#f5f0e8] transition-colors">
                <span>Engineering</span>
                <span>& Consultancy</span>
              </div>
            </Link>
            <p className="text-[#9ba89e] mb-8 max-w-sm text-sm sm:text-base leading-relaxed">
              Your Satisfaction Our Destination.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/360engineeringNconsultancy" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-[#243a19] bg-white/5 flex items-center justify-center text-[#f5f0e8] hover:border-[#c9a84c] hover:text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all duration-300"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.instagram.com/group360bd" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-[#243a19] bg-white/5 flex items-center justify-center text-[#f5f0e8] hover:border-[#c9a84c] hover:text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-heading text-xl text-[#f5f0e8] mb-6 tracking-wide">Navigation</h3>
            <ul className="space-y-3.5">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Our Services", href: "/services" },
                { name: "Portfolio", href: "/portfolio" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-[#9ba89e] hover:text-[#c9a84c] transition-colors flex items-center gap-1.5 group w-fit text-sm sm:text-base"
                  >
                    {link.name}
                    <ArrowUpRight 
                      size={14} 
                      className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200 text-[#c9a84c]" 
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-heading text-xl text-[#f5f0e8] mb-6 tracking-wide">Contact Us</h3>
            <ul className="space-y-4 text-sm sm:text-base text-[#9ba89e]">
              <li>
                <p className="mb-1 text-[#f5f0e8] font-medium">Headquarters</p>
                <p className="leading-relaxed">Bangladesh</p>
              </li>
              <li>
                <p className="mb-1 text-[#f5f0e8] font-medium">Inquiries</p>
                <a href="mailto:group360bd@gmail.com" className="hover:text-[#c9a84c] transition-colors block mb-2">
                  group360bd@gmail.com
                </a>
                <a href="tel:+8801410360247" className="hover:text-[#c9a84c] transition-colors block mt-0.5">
                  +8801410360247
                </a>
                <a href="tel:+8801335224360" className="hover:text-[#c9a84c] transition-colors block mt-0.5">
                  +8801335224360
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="font-heading text-xl text-[#f5f0e8] mb-6 tracking-wide">Newsletter</h3>
            <p className="text-[#9ba89e] mb-4 text-sm sm:text-base leading-relaxed">
              Subscribe to receive design insights and studio updates.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-[#243a19]/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-[#6a9e72] relative z-10">
          <p>&copy; {new Date().getFullYear()} 360 Engineering and Consultancy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#c9a84c] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#c9a84c] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
