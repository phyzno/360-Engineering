"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle2, AlertCircle, User, Mail, Phone, Map, Wallet, MessageSquare, ChevronDown } from "lucide-react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      interest: formData.get("interest"),
      budget: formData.get("budget"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-xl border border-neutral-200 p-12 text-center h-full flex flex-col items-center justify-center min-h-[500px] rounded-2xl shadow-xl relative overflow-hidden"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="w-20 h-20 bg-gradient-to-tr from-brand-700 to-brand-500 rounded-full flex items-center justify-center text-white mb-8 shadow-lg shadow-brand-500/20"
        >
          <CheckCircle2 size={40} />
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-heading text-4xl text-neutral-950 mb-4"
        >
          Message Received
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-neutral-500 text-lg max-w-md mx-auto mb-10 leading-relaxed"
        >
          Thank you for reaching out to 360 Engineering and Consultancy. We have received your inquiry and our team will get back to you within 24-48 business hours.
        </motion.p>
        <motion.button 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => setStatus("idle")}
          className="px-8 py-3 rounded-full border-2 border-brand-500 text-brand-700 hover:bg-brand-500 hover:text-white transition-colors font-medium"
        >
          Send Another Message
        </motion.button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col bg-white backdrop-blur-xl p-8 md:p-12 border border-neutral-200 rounded-2xl shadow-xl relative overflow-hidden group/form">
      {/* Decorative gradient overlay that moves on form hover */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-brand-100/50 to-brand-300/20 rounded-full blur-3xl group-hover/form:translate-x-10 group-hover/form:translate-y-10 transition-transform duration-1000 ease-out pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-brand-100/50 to-transparent rounded-full blur-3xl group-hover/form:-translate-x-10 group-hover/form:-translate-y-10 transition-transform duration-1000 ease-out pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Name Field */}
          <div className="relative group">
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              className="peer w-full bg-neutral-50 hover:bg-white border border-neutral-200 rounded-xl pl-12 pr-4 pt-7 pb-2 text-neutral-950 outline-none transition-all focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 placeholder-transparent" 
              placeholder="Jane Doe"
            />
            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 peer-focus:text-brand-500 transition-colors pointer-events-none" />
            <label htmlFor="name" className="absolute left-12 top-2 text-[11px] font-bold uppercase tracking-wider text-neutral-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:font-medium peer-focus:top-2 peer-focus:text-[11px] peer-focus:translate-y-0 peer-focus:text-brand-500 cursor-text">
              Full Name *
            </label>
          </div>

          {/* Email Field */}
          <div className="relative group">
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              className="peer w-full bg-neutral-50 hover:bg-white border border-neutral-200 rounded-xl pl-12 pr-4 pt-7 pb-2 text-neutral-950 outline-none transition-all focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 placeholder-transparent" 
              placeholder="jane@example.com"
            />
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 peer-focus:text-brand-500 transition-colors pointer-events-none" />
            <label htmlFor="email" className="absolute left-12 top-2 text-[11px] font-bold uppercase tracking-wider text-neutral-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:font-medium peer-focus:top-2 peer-focus:text-[11px] peer-focus:translate-y-0 peer-focus:text-brand-500 cursor-text">
              Email Address *
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Phone Field */}
          <div className="relative group">
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              className="peer w-full bg-neutral-50 hover:bg-white border border-neutral-200 rounded-xl pl-12 pr-4 pt-7 pb-2 text-neutral-950 outline-none transition-all focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 placeholder-transparent" 
              placeholder="+880 1XXX XXXXXX"
            />
            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 peer-focus:text-brand-500 transition-colors pointer-events-none" />
            <label htmlFor="phone" className="absolute left-12 top-2 text-[11px] font-bold uppercase tracking-wider text-neutral-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:font-medium peer-focus:top-2 peer-focus:text-[11px] peer-focus:translate-y-0 peer-focus:text-brand-500 cursor-text">
              Phone Number
            </label>
          </div>

          {/* Interest Field */}
          <div className="relative group">
            <select 
              id="interest" 
              name="interest" 
              required
              defaultValue=""
              className="peer w-full appearance-none bg-neutral-50 hover:bg-white border border-neutral-200 rounded-xl pl-12 pr-10 pt-7 pb-2 text-neutral-950 outline-none transition-all focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 cursor-pointer"
            >
              <option value="" disabled hidden>Select an option...</option>
              <option value="Residential Design">Residential Design</option>
              <option value="Commercial Spaces">Commercial Spaces</option>
              <option value="Interior Styling">Interior Styling</option>
              <option value="Consultation">Consultation</option>
              <option value="Other">Other</option>
            </select>
            <Map size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 peer-focus:text-brand-500 transition-colors pointer-events-none" />
            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
            <label htmlFor="interest" className="absolute left-12 top-2 text-[11px] font-bold uppercase tracking-wider text-neutral-500 transition-all peer-focus:text-brand-500 cursor-pointer pointer-events-none">
              Area of Interest *
            </label>
          </div>
        </div>

        {/* Budget Field */}
        <div className="mb-6 relative group">
          <select 
            id="budget" 
            name="budget" 
            defaultValue=""
            className="peer w-full appearance-none bg-neutral-50 hover:bg-white border border-neutral-200 rounded-xl pl-12 pr-10 pt-7 pb-2 text-neutral-950 outline-none transition-all focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 cursor-pointer"
          >
            <option value="" disabled hidden>Select a range...</option>
            <option value="BDT 10,00,000 - BDT 25,00,000">BDT 10,00,000 - BDT 25,00,000</option>
            <option value="BDT 25,00,000 - BDT 50,00,000">BDT 25,00,000 - BDT 50,00,000</option>
            <option value="BDT 50,00,000 - BDT 1,00,00,000">BDT 50,00,000 - BDT 1,00,00,000</option>
            <option value="BDT 1,00,00,000+">BDT 1,00,00,000+</option>
          </select>
          <Wallet size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 peer-focus:text-brand-500 transition-colors pointer-events-none" />
          <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
          <label htmlFor="budget" className="absolute left-12 top-2 text-[11px] font-bold uppercase tracking-wider text-neutral-500 transition-all peer-focus:text-brand-500 cursor-pointer pointer-events-none">
            Estimated Budget
          </label>
        </div>

        {/* Message Field */}
        <div className="mb-8 relative group flex-grow flex flex-col min-h-[120px]">
          <textarea 
            id="message" 
            name="message" 
            required 
            className="peer flex-grow w-full resize-none bg-neutral-50 hover:bg-white border border-neutral-200 rounded-xl pl-12 pr-4 pt-8 pb-4 text-neutral-950 outline-none transition-all focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 placeholder-transparent"
            placeholder="Tell us a bit about your project..."
          ></textarea>
          <MessageSquare size={18} className="absolute left-4 top-8 text-neutral-400 peer-focus:text-brand-500 transition-colors pointer-events-none" />
          <label htmlFor="message" className="absolute left-12 top-2 text-[11px] font-bold uppercase tracking-wider text-neutral-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-8 peer-placeholder-shown:font-medium peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-brand-500 cursor-text">
            Message *
          </label>
        </div>

        <AnimatePresence>
          {status === "error" && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-red-50/80 backdrop-blur-sm border border-red-200/60 rounded-xl flex items-start gap-3 text-red-600">
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{errorMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="group relative w-full flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-700 text-white py-4 px-8 rounded-xl font-medium tracking-wide transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden shadow-lg shadow-brand-900/20 hover:shadow-brand-900/30 hover:-translate-y-0.5"
        >
          {/* Button highlight effect */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          
          <span className="relative z-10 text-sm uppercase tracking-widest">{isSubmitting ? "Sending Inquiry..." : "Submit Inquiry"}</span>
          {isSubmitting ? (
            <Loader2 size={18} className="animate-spin relative z-10" />
          ) : (
            <Send size={16} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          )}
        </button>
      </div>
    </form>
  );
}