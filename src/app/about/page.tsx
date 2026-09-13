import Image from "next/image";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = {
  title: "About Us",
  description: "Learn about Arch Concept, our philosophy, and the award-winning team behind our luxury design studio.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative hero-padding overflow-hidden border-b border-[#1a2912]">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
            alt="Interior design sketches"
            fill
            className="object-cover"
          />
        </div>
        <div className="container-wide relative z-10 text-center max-w-4xl mx-auto">
          <SectionHeading title="Our Story" subtitle="About Arch Concept" centered />
          <p className="text-[#d4c5ae] text-lg leading-relaxed">
            Founded in 2012, Arch Concept was born from a simple belief: 
            our spaces shape our lives. We set out to create environments that 
            not only look beautiful but feel deeply restorative.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-[#0f1a0a]">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h3 className="font-heading text-3xl text-[#f5f0e8] mb-6">The Arch Concept Philosophy</h3>
              <p className="text-[#9ba89e] mb-6">
                We draw our inspiration directly from nature. The subtle gradient of a forest canopy, 
                the stark texture of natural stone, the warmth of aged timber—these are the elements 
                we use to compose our spaces.
              </p>
              <p className="text-[#9ba89e]">
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
      <section className="section-padding bg-[#0a1206]">
        <div className="container-wide">
          <SectionHeading title="Meet the Team" centered />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                name: "Eleanor Vance",
                role: "Founder & Lead Designer",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop"
              },
              {
                name: "Marcus Thorne",
                role: "Senior Architect",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
              },
              {
                name: "Sophia Lin",
                role: "Interior Stylist",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop"
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
                  <div className="absolute inset-0 bg-[#0a1206]/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <h4 className="font-heading text-xl text-[#f5f0e8] mb-1">{member.name}</h4>
                <p className="text-[#c9a84c] text-sm tracking-widest uppercase">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
