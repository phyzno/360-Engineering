import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/contact/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Arch Concept. Book a consultation for your residential or commercial interior design project.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <section className="hero-padding bg-[#0a1206]">
        <div className="container-wide text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <SectionHeading title="Start Your Project" subtitle="Contact" centered />
          <p className="text-[#d4c5ae] text-lg">
            Whether you have a clear vision or are looking for inspiration, 
            our team is here to guide you through the design process.
          </p>
        </div>

        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-12">
              <div>
                <h3 className="font-heading text-2xl text-[#f5f0e8] mb-6 border-b border-[#243a19] pb-4">Our Studio</h3>
                <div className="flex gap-4 text-[#9ba89e]">
                  <MapPin size={24} className="text-[#c9a84c] shrink-0" />
                  <p>Gulshan 1, Dhaka, Bangladesh</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-heading text-2xl text-[#f5f0e8] mb-6 border-b border-[#243a19] pb-4">Contact</h3>
                <div className="space-y-4">
                  <a href="mailto:info@archconceptbd.com" className="flex items-center gap-4 text-[#9ba89e] hover:text-[#c9a84c] transition-colors group w-fit">
                    <Mail size={24} className="text-[#c9a84c] shrink-0" />
                    <span>info@archconceptbd.com</span>
                  </a>
                  <a href="tel:+8801712345678" className="flex items-center gap-4 text-[#9ba89e] hover:text-[#c9a84c] transition-colors group w-fit">
                    <Phone size={24} className="text-[#c9a84c] shrink-0" />
                    <span>+880 1712 345678</span>
                  </a>
                  <a href="tel:+8801912345678" className="flex items-center gap-4 text-[#9ba89e] hover:text-[#c9a84c] transition-colors group w-fit pl-10">
                    <span>+880 1912 345678</span>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-2xl text-[#f5f0e8] mb-6 border-b border-[#243a19] pb-4">Hours</h3>
                <div className="text-[#9ba89e] space-y-2">
                  <p className="flex justify-between"><span>Monday - Friday</span> <span>9:00 AM - 6:00 PM</span></p>
                  <p className="flex justify-between"><span>Saturday</span> <span>By Appointment</span></p>
                  <p className="flex justify-between"><span>Sunday</span> <span>Closed</span></p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* Map Embed (Placeholder) */}
      <section className="h-[400px] w-full bg-[#1a2912] relative grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.6010534246837!2d90.4101485!3d23.7972412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c700147981b1%3A0x6b301c2db04d3e8e!2sGulshan-1%2C%20Dhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1693301019054!5m2!1sen!2sbd" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          sandbox="allow-scripts allow-same-origin allow-popups"
          title="Arch Concept Studio Location"
        />
      </section>
    </PageTransition>
  );
}
