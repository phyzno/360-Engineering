import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import { getServiceDetails } from "@/data/services";

export default async function ServiceDetailsPage({ params }: { params: Promise<{ category: string, slug: string }> }) {
  const { category, slug } = await params;
  const service = getServiceDetails(category, slug);
  
  if (!service) {
    return notFound();
  }
  
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative hero-padding bg-[#0f1a0a] min-h-[85vh] flex items-center border-b border-[#1a2912] overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1206] via-[#0a1206]/80 to-transparent" />
        </div>

        <div className="container-wide relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
          <span className="text-[#c9a84c] text-sm tracking-widest uppercase mb-4">{service.category} Service</span>
          <h1 className="font-heading text-5xl md:text-7xl font-medium tracking-wide text-[#f5f0e8] mb-6">
            {service.title}
          </h1>
          <p className="text-xl md:text-2xl text-[#d4c5ae] font-light max-w-3xl mb-12 leading-relaxed">
            {service.subtitle}
          </p>
          <div className="w-24 h-[1px] bg-[#c9a84c]/50 mx-auto" />
        </div>
      </section>

      {/* Main Content & Features */}
      <section className="section-padding bg-[#0a1206]">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading title="The Concept" subtitle="Our Approach" />
              <p className="text-[#d4c5ae] text-lg leading-relaxed mb-8">
                {service.description}
              </p>
              
              <ul className="space-y-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle className="text-[#c9a84c] mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h4 className="text-[#f5f0e8] text-xl font-medium mb-2">{feature.title}</h4>
                      <p className="text-[#d4c5ae]">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[600px] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#c9a84c]/20">
              <Image
                src={service.galleryImages[0]}
                alt="Concept Design"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specific Details Section */}
      <section className="section-padding bg-[#0f1a0a] border-y border-[#1a2912]">
        <div className="container-wide">
          <SectionHeading title="Expertise" subtitle="How We Work" centered />
          
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Approach */}
            <div className="bg-[#0a1206] p-8 rounded-xl border border-[#1a2912] transition-colors hover:border-[#c9a84c]/30">
              <h3 className="text-[#f5f0e8] text-xl font-medium mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#1a2912] text-[#c9a84c] flex items-center justify-center text-sm font-bold">01</span>
                Our Approach
              </h3>
              <p className="text-[#d4c5ae] leading-relaxed">
                {service.specificDetails.approach}
              </p>
            </div>

            {/* What We Do */}
            <div className="bg-[#0a1206] p-8 rounded-xl border border-[#1a2912] transition-colors hover:border-[#c9a84c]/30">
              <h3 className="text-[#f5f0e8] text-xl font-medium mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#1a2912] text-[#c9a84c] flex items-center justify-center text-sm font-bold">02</span>
                What We Do
              </h3>
              <ul className="space-y-4">
                {service.specificDetails.activities.map((activity, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#d4c5ae]">
                    <CheckCircle className="text-[#c9a84c] mt-0.5 flex-shrink-0" size={18} />
                    <span className="leading-snug">{activity}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Materials We Use */}
            <div className="bg-[#0a1206] p-8 rounded-xl border border-[#1a2912] transition-colors hover:border-[#c9a84c]/30">
              <h3 className="text-[#f5f0e8] text-xl font-medium mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#1a2912] text-[#c9a84c] flex items-center justify-center text-sm font-bold">03</span>
                Materials We Use
              </h3>
              <ul className="space-y-4">
                {service.specificDetails.materials.map((material, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#d4c5ae]">
                    <CheckCircle className="text-[#c9a84c] mt-0.5 flex-shrink-0" size={18} />
                    <span className="leading-snug">{material}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="section-padding bg-[#0a1206]">
        <div className="container-wide">
          <SectionHeading title="Who We've Worked With" subtitle="Select Clients & Projects" centered />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {service.clients.map((client, idx) => (
              <div key={idx} className="bg-[#0f1a0a] border border-[#1a2912] p-8 rounded-xl text-center hover:border-[#c9a84c]/40 hover:shadow-[0_10px_30px_rgba(201,168,76,0.05)] transition-all duration-300">
                <h4 className="text-[#f5f0e8] text-xl font-medium mb-2">{client.name}</h4>
                {client.type && <p className="text-[#c9a84c] text-sm uppercase tracking-wider">{client.type}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-[#0f1a0a] border-y border-[#1a2912]">
        <div className="container-wide">
          <SectionHeading title="Inspirations" subtitle="Gallery" centered />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {service.galleryImages.map((img, idx) => (
              <div key={idx} className={`relative rounded-xl overflow-hidden border border-[#1a2912] group ${idx === 0 ? "md:col-span-2 lg:col-span-1 h-[400px]" : "h-[400px]"}`}>
                <Image
                  src={img}
                  alt={`${service.title} Gallery ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative bg-[#1a2912] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.heroImage}
            alt="Background"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="container-wide relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl font-medium text-[#f5f0e8] mb-6">
            Ready to transform your space?
          </h2>
          <p className="text-[#d4c5ae] text-lg mb-10">
            Let&apos;s discuss how our {service.title.toLowerCase()} service can bring your vision to life.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#c9a84c] text-[#0a1206] px-8 py-4 rounded-md font-medium tracking-wide uppercase text-sm hover:bg-[#e0c16b] transition-colors"
          >
            Start Your Project <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
