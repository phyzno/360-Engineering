"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1a2912] border border-[#4a7c59] p-12 text-center h-full flex flex-col items-center justify-center min-h-[500px]"
      >
        <div className="w-16 h-16 bg-[#243a19] rounded-full flex items-center justify-center text-[#c9a84c] mb-6">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="font-heading text-3xl text-[#f5f0e8] mb-4">Message Received</h3>
        <p className="text-[#9ba89e] max-w-md mx-auto mb-8">
          Thank you for reaching out to Arch Concept. We have received your inquiry and our team will get back to you within 24-48 business hours.
        </p>
        <button 
          onClick={() => setStatus("idle")}
          className="btn-outline"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#1a2912] p-8 md:p-12 border border-[#243a19]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium tracking-wide text-[#9ba89e] mb-2 uppercase">Full Name *</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            className="input-field" 
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium tracking-wide text-[#9ba89e] mb-2 uppercase">Email Address *</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            className="input-field" 
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium tracking-wide text-[#9ba89e] mb-2 uppercase">Phone Number</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            className="input-field" 
            placeholder="+880 1XXX XXXXXX"
          />
        </div>
        <div>
          <label htmlFor="interest" className="block text-sm font-medium tracking-wide text-[#9ba89e] mb-2 uppercase">Area of Interest *</label>
          <select 
            id="interest" 
            name="interest" 
            required
            defaultValue=""
            className="input-field appearance-none"
          >
            <option value="" disabled>Select an option...</option>
            <option value="Residential Design">Residential Design</option>
            <option value="Commercial Spaces">Commercial Spaces</option>
            <option value="Interior Styling">Interior Styling</option>
            <option value="Consultation">Consultation</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="budget" className="block text-sm font-medium tracking-wide text-[#9ba89e] mb-2 uppercase">Estimated Budget</label>
        <select 
          id="budget" 
          name="budget" 
          defaultValue=""
          className="input-field appearance-none"
        >
          <option value="" disabled>Select a range...</option>
          <option value="BDT 10,00,000 - BDT 25,00,000">KD 3,000 – KD 7,500</option>
          <option value="BDT 25,00,000 - BDT 50,00,000">KD 7,500 – KD 15,000</option>
          <option value="BDT 50,00,000 - BDT 1,00,00,000">KD 15,000 – KD 30,000</option>
          <option value="BDT 1,00,00,000+">BDT 1,00,00,000+</option>
        </select>
      </div>

      <div className="mb-8">
        <label htmlFor="message" className="block text-sm font-medium tracking-wide text-[#9ba89e] mb-2 uppercase">Project Details *</label>
        <textarea 
          id="message" 
          name="message" 
          required 
          rows={5}
          className="input-field resize-none"
          placeholder="Tell us about your project, vision, and timeline..."
        ></textarea>
      </div>

      {status === "error" && (
        <div className="mb-6 p-4 bg-red-950/50 border border-red-900 flex items-start gap-3 text-red-200">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="group btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin relative z-10" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Submit Inquiry</span>
            <Send size={16} className="relative z-10 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}
