"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface SubSubItem {
  href: string;
  label: string;
}

interface SubItem {
  href: string;
  label: string;
  subSubItems?: SubSubItem[];
}

interface NavItem {
  href: string;
  label: string;
  subItems?: SubItem[];
}

const navLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { 
    href: "/services", 
    label: "Services",
    subItems: [
      { 
        label: "Commercial",
        href: "/services/commercial",
        subSubItems: [
          { href: "/services/commercial/beauty-salon", label: "Beauty Salon Interior Design" },
          { href: "/services/commercial/office", label: "Office Interior Design" },
          { href: "/services/commercial/barbers-shop", label: "Barbers Shop Design" },
          { href: "/services/commercial/hotel", label: "Hotel Interior Design" },
          { href: "/services/commercial/landscape", label: "Landscape Design" },
          { href: "/services/commercial/restaurant", label: "Restaurant Interior Design" },
        ]
      },
      { 
        label: "Residential",
        href: "/services/residential",
        subSubItems: [
          { href: "/services/residential/living-room", label: "Living Room Design" },
          { href: "/services/residential/kitchen", label: "Kitchen Interior" },
          { href: "/services/residential/bedroom", label: "Bedroom Design" },
          { href: "/services/residential/bathroom", label: "Bathroom Design" },
          { href: "/services/residential/full-house", label: "Whole House Interior" },
        ]
      },
      { 
        label: "Renovation",
        href: "/services/renovation",
        subSubItems: [
          { href: "/services/renovation/kitchen", label: "Kitchen Remodeling" },
          { href: "/services/renovation/bathroom", label: "Bathroom Remodeling" },
          { href: "/services/renovation/full-home", label: "Full Home Renovation" },
          { href: "/services/renovation/office", label: "Office Renovation" },
        ]
      },
    ]
  },
  { 
    href: "/products", 
    label: "Products",
    subItems: [
      { href: "/products/curtains", label: "Curtains" },
      { href: "/products/sofa", label: "Sofa" },
      { href: "/products/tiles", label: "Tiles" },
      { href: "/products/rugs", label: "Rugs & Carpets" },
      { href: "/products/lighting", label: "Premium Lighting" },
      { href: "/products/wallpaper", label: "Wallpapers" },
    ]
  },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/#estimator", label: "Estimate Cost" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const [expandedMobileMain, setExpandedMobileMain] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.desktop-nav')) {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-1 bg-[#0a1206]/30 backdrop-blur-xl border-b border-[#c9a84c]/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            : "py-2 bg-transparent"
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          <Link 
            href="/" 
            className="group relative z-50 flex items-center" 
            aria-label="DF Interiors"
          >
            <Image 
              src="/df-logo.png" 
              alt="DF Interiors" 
              width={120} 
              height={120} 
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-[96px] md:h-[96px] lg:w-[110px] lg:h-[110px] object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105" 
              priority
            />
            <span className="sr-only">DF Interiors</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 desktop-nav">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              
              if (link.subItems) {
                const subItems = link.subItems;
                return (
                  <div key={link.href} className="relative group/navItem py-2">
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        if (window.matchMedia("(hover: none)").matches) {
                          if (activeDropdown !== link.label) {
                            e.preventDefault();
                            setActiveDropdown(link.label);
                            setActiveSubDropdown(null);
                          }
                        }
                      }}
                      className={`text-sm tracking-widest uppercase transition-colors duration-300 relative flex items-center gap-1 ${
                        isActive ? "text-[#c9a84c]" : "text-[#f5f0e8] hover:text-[#c9a84c]"
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={14} className="transition-transform duration-300 group-hover/navItem:rotate-180" />
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute -bottom-2 left-0 right-0 h-[1px] bg-[#c9a84c]"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                    
                    {/* First Level Dropdown */}
                    <div className={`absolute top-full left-0 mt-0 w-56 opacity-0 invisible group-hover/navItem:opacity-100 group-hover/navItem:visible transition-all duration-300 translate-y-2 group-hover/navItem:translate-y-0 z-50 pt-4 ${activeDropdown === link.label ? '!opacity-100 !visible !translate-y-0' : ''}`}>
                      <div className="bg-[#1a2f15] border border-[#c9a84c]/40 shadow-[0_8px_30px_rgba(0,0,0,0.6)] rounded-md flex flex-col relative">
                        {subItems.map((sub, idx) => (
                          <div key={idx} className="relative group/subItem">
                            <Link
                              href={sub.href}
                              onClick={(e) => {
                                if (sub.subSubItems && window.matchMedia("(hover: none)").matches) {
                                  if (activeSubDropdown !== sub.label) {
                                    e.preventDefault();
                                    setActiveSubDropdown(sub.label);
                                  }
                                }
                              }}
                              className={`px-5 py-4 text-sm tracking-widest uppercase text-[#f5f0e8] hover:bg-[#c9a84c]/10 hover:text-[#c9a84c] transition-colors flex items-center justify-between ${
                                idx !== subItems.length - 1 ? "border-b border-[#c9a84c]/10" : ""
                              } ${idx === 0 ? "rounded-t-md" : ""} ${idx === subItems.length - 1 ? "rounded-b-md" : ""}`}
                            >
                              {sub.label}
                              {sub.subSubItems && <ChevronRight size={14} />}
                            </Link>
                            
                            {/* Second Level Dropdown */}
                            {sub.subSubItems && (
                              <div className={`absolute top-0 left-full ml-0 w-64 opacity-0 invisible group-hover/subItem:opacity-100 group-hover/subItem:visible transition-all duration-300 -translate-x-2 group-hover/subItem:translate-x-0 z-50 pl-1 ${activeSubDropdown === sub.label ? '!opacity-100 !visible !translate-x-0' : ''}`}>
                                <div className="bg-[#1a2f15] border border-[#c9a84c]/40 shadow-[0_8px_30px_rgba(0,0,0,0.6)] rounded-md overflow-hidden flex flex-col relative">
                                  {sub.subSubItems.map((subSub, subIdx) => (
                                    <Link
                                      key={subIdx}
                                      href={subSub.href}
                                      className="px-5 py-4 text-xs tracking-widest uppercase text-[#f5f0e8] hover:bg-[#c9a84c]/10 hover:text-[#c9a84c] transition-colors border-b border-[#c9a84c]/10 last:border-b-0"
                                    >
                                      {subSub.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith("/#") && pathname === "/") {
                      e.preventDefault();
                      const targetId = link.href.split("#")[1];
                      const element = document.getElementById(targetId);
                      if (element) {
                        if ((window as any).lenis) {
                          (window as any).lenis.scrollTo(element, { offset: -100 });
                        } else {
                          const y = element.getBoundingClientRect().top + window.scrollY - 100;
                          window.scrollTo({ top: y, behavior: "smooth" });
                        }
                      }
                    }
                  }}
                  className={`text-sm tracking-widest uppercase transition-colors duration-300 relative ${
                    isActive
                      ? "text-[#c9a84c]"
                      : "text-[#f5f0e8] hover:text-[#c9a84c]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-2 left-0 right-0 h-[1px] bg-[#c9a84c]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden relative z-50 p-2 text-[#f5f0e8] hover:text-[#c9a84c] transition-colors ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex flex-col justify-end"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsMobileMenuOpen(false);
              }
            }}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full bg-[#0f1b0a] border-t border-[#c9a84c]/40 rounded-t-[2.5rem] flex flex-col items-center overflow-y-auto max-h-[70vh] mt-24 pt-4 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] relative"
            >
              <div className="w-12 h-1.5 bg-[#f5f0e8]/20 rounded-full mb-8 flex-shrink-0" />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 p-2 text-[#f5f0e8]/60 hover:text-[#c9a84c] transition-colors"
                aria-label="Close Menu"
              >
                <X size={24} />
              </button>
              <nav className="flex flex-col items-center gap-6 w-full px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="w-full flex flex-col items-center"
                >
                  <div className="flex items-center gap-2">
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        setIsMobileMenuOpen(false);
                        if (link.href.startsWith("/#") && pathname === "/") {
                          e.preventDefault();
                          const targetId = link.href.split("#")[1];
                          setTimeout(() => {
                            const element = document.getElementById(targetId);
                            if (element) {
                              if ((window as any).lenis) {
                                (window as any).lenis.scrollTo(element, { offset: -100 });
                              } else {
                                const y = element.getBoundingClientRect().top + window.scrollY - 100;
                                window.scrollTo({ top: y, behavior: "smooth" });
                              }
                            }
                          }, 300); // Wait for menu to close
                        }
                      }}
                      className={`font-heading text-3xl sm:text-4xl ${
                        pathname === link.href || pathname.startsWith(link.href + "/")
                          ? "text-[#c9a84c]"
                          : "text-[#f5f0e8]"
                      } transition-colors`}
                    >
                      {link.label}
                    </Link>
                    {link.subItems && (
                      <button
                        onClick={() => setExpandedMobileMain(expandedMobileMain === link.label ? null : link.label)}
                        className="p-1 text-[#f5f0e8]/80 hover:text-[#c9a84c]"
                        aria-label={`Toggle ${link.label} menu`}
                      >
                        <ChevronDown size={28} className={`transition-transform duration-300 ${expandedMobileMain === link.label ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>

                  {/* Render First Level on Mobile */}
                  <AnimatePresence>
                    {link.subItems && expandedMobileMain === link.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden w-full"
                      >
                        <div className="flex flex-col items-center gap-4 mt-4 w-full">
                          {link.subItems.map((sub, idx) => (
                            <div key={idx} className="w-full flex flex-col items-center">
                              <div className="flex items-center gap-2">
                                <Link
                                  href={sub.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="text-sm tracking-widest uppercase text-[#f5f0e8]/80 hover:text-[#c9a84c] transition-colors"
                                >
                                  {sub.label}
                                </Link>
                                {sub.subSubItems && (
                                  <button
                                    onClick={() => setExpandedMobileMenu(expandedMobileMenu === sub.label ? null : sub.label)}
                                    className="p-1 text-[#f5f0e8]/80 hover:text-[#c9a84c]"
                                    aria-label={`Toggle ${sub.label} sub-menu`}
                                  >
                                    <ChevronDown size={20} className={`transition-transform duration-300 ${expandedMobileMenu === sub.label ? "rotate-180" : ""}`} />
                                  </button>
                                )}
                              </div>
                              
                              {/* Render Second Level on Mobile */}
                              <AnimatePresence>
                                {sub.subSubItems && expandedMobileMenu === sub.label && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden w-full"
                                  >
                                    <div className="flex flex-col items-center gap-3 mt-3 w-full border-l border-[#c9a84c]/20 pl-4 max-w-[250px] mx-auto">
                                      {sub.subSubItems.map((subSub, subIdx) => (
                                        <Link
                                          key={subIdx}
                                          href={subSub.href}
                                          onClick={() => setIsMobileMenuOpen(false)}
                                          className="text-xs tracking-widest uppercase text-[#f5f0e8]/60 hover:text-[#c9a84c] transition-colors text-center"
                                        >
                                          {subSub.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}