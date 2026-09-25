import Image from "next/image";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

export const metadata = {
  title: "About Us",
  description: "Learn about 360 Engineering and Consultancy, our philosophy, and the award-winning team behind our luxury design studio.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative hero-padding overflow-hidden border-b border-gray-200">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
            alt="Interior design sketches"
            fill
            className="object-cover"
          />
        </div>
        <div className="container-wide relative z-10 text-center max-w-4xl mx-auto">
          <SectionHeading title="Our Story" subtitle="About 360 Engineering and Consultancy" centered />
          <p className="text-gray-600 text-lg leading-relaxed">
            Founded in 2012, 360 Engineering and Consultancy was born from a simple belief: 
            our spaces shape our lives. We set out to create environments that 
            not only look beautiful but feel deeply restorative.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h3 className="font-heading text-3xl text-[var(--color-neutral-900)] mb-6">The 360 Engineering and Consultancy Philosophy</h3>
              <p className="text-gray-500 mb-6">
                We draw our inspiration directly from nature. The subtle gradient of a forest canopy, 
                the stark texture of natural stone, the warmth of aged timber—these are the elements 
                we use to compose our spaces.
              </p>
              <p className="text-gray-500">
                Every project begins with understanding how our clients live and work. 
                We design not for the portfolio, but for the people who will inhabit 
                these spaces every single day. True luxury is having a space that 
                works perfectly for your unique lifestyle.
              </p>
            </div>
            <div className="order-1 md:order-2 relative h-[500px] w-full img-overlay">
              <Image
                src="https://images.unsplash.com/photo-1706689656095-168768dc20a5?q=80&w=880&auto=format&fit=crop"
                alt="Our design studio"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeading title="Meet the Team" centered />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                name: "Eleanor Vance",
                role: "Founder & Lead Designer",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
                socials: {
                  linkedin: "#",
                  twitter: "#",
                  instagram: "#"
                }
              },
              {
                name: "Marcus Thorne",
                role: "Senior Architect",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
                socials: {
                  linkedin: "#",
                  twitter: "#"
                }
              },
              {
                name: "Sophia Lin",
                role: "Interior Stylist",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop",
                socials: {
                  linkedin: "#",
                  instagram: "#"
                }
              }
            ].map((member, i) => (
              <div key={i} className="group text-center">
                <div className="relative w-full aspect-[4/5] mb-6 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Social Icons Overlay (Always visible on mobile/tablet, hover on desktop) */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-100 translate-y-0 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 lg:translate-y-4 lg:group-hover:translate-y-0">
                    {member.socials.linkedin && (
                      <a href={member.socials.linkedin} className="bg-white/90 hover:bg-[var(--color-brand-500)] text-[var(--color-neutral-900)] hover:text-white p-2 rounded-full transition-colors duration-300 shadow-sm" aria-label={`${member.name}'s LinkedIn`}>
                        <LinkedinIcon className="w-4 h-4" />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a href={member.socials.twitter} className="bg-white/90 hover:bg-[var(--color-brand-500)] text-[var(--color-neutral-900)] hover:text-white p-2 rounded-full transition-colors duration-300 shadow-sm" aria-label={`${member.name}'s Twitter`}>
                        <TwitterIcon className="w-4 h-4" />
                      </a>
                    )}
                    {member.socials.instagram && (
                      <a href={member.socials.instagram} className="bg-white/90 hover:bg-[var(--color-brand-500)] text-[var(--color-neutral-900)] hover:text-white p-2 rounded-full transition-colors duration-300 shadow-sm" aria-label={`${member.name}'s Instagram`}>
                        <InstagramIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <h4 className="font-heading text-xl text-[var(--color-neutral-900)] mb-1">{member.name}</h4>
                <p className="text-[var(--color-brand-500)] text-sm tracking-widest uppercase">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
