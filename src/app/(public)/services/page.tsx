import Image from "next/image";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Services",
  description: "Comprehensive interior design services including residential design, commercial spaces, and interior styling.",
};

export default function ServicesPage() {
  const services = [
    {
      id: "architecture",
      title: "Architectural Integration",
      desc: "We bridge the gap between interior design and structural architecture. Our approach ensures that every interior element flows seamlessly with the building's core structure, creating environments that feel unified, expansive, and intentionally crafted.",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "biophilic",
      title: "Biophilic Design",
      desc: "By integrating natural elements, organic materials, and abundant natural light, we create spaces that enhance well-being. Our biophilic approach reduces stress and fosters a deep connection to nature, making your living or working environment feel vibrant and alive.",
      image: "https://images.unsplash.com/photo-1597218584824-7eb3878b665f?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "smart-home",
      title: "Smart Ecosystems",
      desc: "Modern luxury requires modern convenience. We discreetly embed the latest home automation, lighting control, and climate systems into our designs, ensuring that technology elevates your lifestyle without compromising the aesthetic purity of the space.",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "custom-furniture",
      title: "Custom Furniture",
      desc: "True luxury is found in the details of bespoke creations. Our custom furniture service designs and crafts unique, premium pieces that perfectly align with your space, offering unparalleled comfort and a signature finish that reflects your sophisticated taste.",
      image: "https://images.unsplash.com/photo-1659976733536-dfa71f6015d7?q=80&w=645&auto=format&fit=crop"
    },
    {
      id: "millwork",
      title: "Custom Millwork",
      desc: "Our master craftsmen design and build tailored cabinetry, joinery, and architectural woodwork of the highest caliber. From custom walk-in closets to statement libraries, our millwork adds unparalleled value and bespoke elegance to your property.",
      image: "https://images.unsplash.com/photo-1613798399365-419496c18abc?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: "lighting",
      title: "Atmosphere & Lighting",
      desc: "Lighting is the unsung hero of interior design. We meticulously sculpt spaces using a blend of natural and artificial light to create dynamic moods, highlight architectural details, and transform the atmosphere of a room from day to night.",
      image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  return (
    <PageTransition>
      <section className="hero-padding bg-white border-b border-gray-200">
        <div className="container-wide text-center max-w-4xl mx-auto">
          <SectionHeading title="Our Expertise" subtitle="Services" centered />
          <p className="text-gray-600 text-lg">
            From concept to completion, we offer comprehensive design services 
            tailored to elevate your living and working environments.
          </p>
        </div>
      </section>

      <section className="bg-white">
        {services.map((service, index) => (
          <div 
            key={service.id} 
            id={service.id}
            className={`grid grid-cols-1 md:grid-cols-2 min-h-[70vh] border-b border-gray-200 ${
              index % 2 !== 0 ? 'md:grid-flow-dense' : ''
            }`}
          >
            <div className={`relative h-[50vh] md:h-full w-full ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex flex-col justify-center p-12 md:p-24 lg:p-32">
              <span className="text-[var(--color-brand-500)] tracking-[0.2em] uppercase text-sm font-semibold mb-6 block">
                0{index + 1}
              </span>
              <h2 className="font-heading text-4xl text-[var(--color-neutral-900)] mb-6">{service.title}</h2>
              <p className="text-gray-500 leading-relaxed text-lg">
                {service.desc}
              </p>
            </div>
          </div>
        ))}
      </section>
    </PageTransition>
  );
}
