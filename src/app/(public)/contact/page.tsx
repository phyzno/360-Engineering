import PageTransition from "@/components/ui/PageTransition";
import ContactForm from "@/components/contact/ContactForm";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with 360 Engineering and Consultancy. Book a consultation for your residential or commercial interior design project.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-neutral-950">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000" 
            alt="Modern interior design" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/60 to-neutral-100" />
        </div>
        
        <div className="container-wide relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-5 py-2 rounded-full border border-brand-500/30 bg-brand-900/50 backdrop-blur-md text-brand-100 text-xs font-bold uppercase tracking-[0.2em] shadow-sm">
            Contact Studio
          </div>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            Let's Talk <span className="text-brand-500 italic">Design.</span>
          </h1>
          <p className="text-neutral-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Ready to transform your space? Reach out to our team today.
          </p>
        </div>
      </section>

      {/* Main Content: Contact Info + Form */}
      <section className="py-16 md:py-24 relative z-10 bg-neutral-100">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Contact Info Box (Left side / form er pasher box) */}
            <div className="lg:col-span-5 bg-brand-900 text-white p-8 md:p-12 rounded-2xl shadow-[0_20px_40px_rgba(217,107,17,0.15)] relative overflow-hidden group flex flex-col justify-between h-full">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-700 to-transparent rounded-full blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-brand-500/40 to-transparent rounded-full blur-3xl opacity-50 group-hover:translate-x-10 transition-transform duration-1000" />
              
              <div className="relative z-10">
                <h2 className="font-heading text-3xl md:text-4xl mb-3 text-white">Contact Information</h2>
                <p className="text-brand-100 mb-12 text-lg opacity-80">Fill up the form and our team will get back to you within 24 hours.</p>

                <div className="space-y-8">
                  <div className="flex items-start gap-5 group/item">
                    <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover/item:bg-brand-500 group-hover/item:text-white transition-colors duration-300">
                      <Phone size={24} />
                    </div>
                    <div className="pt-1">
                      <h4 className="text-xs text-brand-300 uppercase tracking-widest font-bold mb-2">Call Us</h4>
                      <a href="tel:+8801410360247" className="block text-lg text-white hover:text-brand-300 transition-colors">+880 1410 360247</a>
                      <a href="tel:+8801335224360" className="block text-lg text-white hover:text-brand-300 transition-colors">+880 1335 224360</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group/item">
                    <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover/item:bg-brand-500 group-hover/item:text-white transition-colors duration-300">
                      <Mail size={24} />
                    </div>
                    <div className="pt-1">
                      <h4 className="text-xs text-brand-300 uppercase tracking-widest font-bold mb-2">Email Us</h4>
                      <a href="mailto:group360bd@gmail.com" className="block text-lg text-white hover:text-brand-300 transition-colors break-all">group360bd@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group/item">
                    <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover/item:bg-brand-500 group-hover/item:text-white transition-colors duration-300">
                      <MapPin size={24} />
                    </div>
                    <div className="pt-1">
                      <h4 className="text-xs text-brand-300 uppercase tracking-widest font-bold mb-2">Visit Studio</h4>
                      <p className="text-lg text-white leading-relaxed">102/1 west Agargaon, Dhaka,<br />Bangladesh, 1207</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5 group/item">
                    <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover/item:bg-brand-500 group-hover/item:text-white transition-colors duration-300">
                      <Clock size={24} />
                    </div>
                    <div className="pt-1">
                      <h4 className="text-xs text-brand-300 uppercase tracking-widest font-bold mb-2">Working Hours</h4>
                      <p className="text-lg text-white">Mon - Fri: 9:00 AM - 6:00 PM<br />Sat: By Appointment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Box (Right side) */}
            <div className="lg:col-span-7 h-full">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-24 px-4 md:px-8 bg-neutral-100">
        <div className="container-wide max-w-7xl mx-auto">
          <div className="w-full h-[500px] rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(217,107,17,0.08)] border-4 border-brand-500/20 relative group bg-neutral-50 p-2">
            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              {/* Map overlay that fades on hover for interactive feel */}
              <div className="absolute inset-0 bg-brand-900/10 mix-blend-multiply pointer-events-none group-hover:opacity-0 transition-opacity duration-700 z-10" />
              <iframe 
                src="https://maps.google.com/maps?q=102/1%20west%20Agargaon,%20Dhaka,%20Bangladesh,%201207&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-popups"
                title="360 Engineering and Consultancy Studio Location"
                className="grayscale-[0.4] contrast-[1.1] group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 relative z-0"
              />
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}