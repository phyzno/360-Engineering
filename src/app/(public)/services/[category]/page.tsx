import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import { servicesData as categoryData } from "@/data/servicesData";
import { servicesData as allSubServices } from "@/data/services";
import FAQAccordion from "@/components/services/FAQAccordion";
import { ArrowRight, ChevronRight } from "lucide-react";

export function generateStaticParams() {
  return [
    { category: "commercial" },
    { category: "residential" },
    { category: "renovation" },
  ];
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  
  // Validate category
  const serviceKey = category.toLowerCase();
  if (!categoryData[serviceKey]) {
    notFound();
  }
  
  const data = categoryData[serviceKey];
  
  // Get the sub-services for this category
  const subServices = allSubServices.filter(s => s.category === serviceKey);
  
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={data.heroImage}
            alt={data.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        
        <div className="container-wide relative z-10 text-center max-w-4xl mx-auto py-20 px-4">
          <SectionHeading title={data.title.toUpperCase()} subtitle="Our Services" centered theme="dark" />
          <p className="text-white/80 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </div>
      </section>

      {/* Sub-Services Links Section */}
      {subServices.length > 0 && (
        <section className="py-16 bg-white border-b border-gray-200">
          <div className="container-wide mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-serif text-gray-900">Explore Our Specialized Services</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
              {subServices.map((subService) => (
                <Link
                  key={subService.id}
                  href={`/services/${category}/${subService.id}`}
                  className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group flex flex-col bg-white border border-gray-200 rounded-3xl p-4 transition-all duration-500 hover:border-[var(--color-brand-500)]/40 hover:shadow-[0_10px_30px_rgba(201,168,76,0.05)] hover:-translate-y-1"
                >
                  <div className="relative w-full h-48 mb-4 overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <Image
                      src={subService.heroImage}
                      alt={subService.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex justify-between items-end mt-2 mb-2 px-1">
                    <div className="flex flex-col">
                      <h3 className="text-xl font-medium text-gray-900 mb-1 group-hover:text-[var(--color-brand-500)] transition-colors">{subService.title}</h3>
                      <p className="text-sm text-gray-600">{subService.subtitle}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:bg-[var(--color-brand-500)]/10 group-hover:border-[var(--color-brand-500)]/30 transition-all duration-500 shrink-0">
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-brand-500)] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container-wide mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">Why Choose Us?</h2>
            <p className="text-gray-600">We bring expertise, precision, and passion to every project, ensuring the best outcomes for our clients.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="glass-card p-8 rounded-2xl hover:border-[var(--color-brand-500)]/30 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(201,168,76,0.08)] relative overflow-hidden">
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0 opacity-40 transition-transform duration-700 group-hover:scale-110">
                    <Image src={benefit.image || data.heroImage} alt="" fill className="object-cover" />
                  </div>
                  {/* Light overlay to make text readable */}
                  <div className="absolute inset-0 z-0 bg-white/80 group-hover:bg-white/70 transition-colors duration-500" />
                  
                  {/* Top corner glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-500)]/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-[var(--color-brand-500)]/20 transition-colors duration-500 z-0" />
                  
                  <div className="w-14 h-14 bg-white border border-[var(--color-brand-500)]/30 rounded-full flex items-center justify-center mb-6 group-hover:bg-[var(--color-brand-500)]/20 transition-colors duration-500 relative z-10">
                    <Icon className="w-6 h-6 text-[var(--color-brand-500)]" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4 relative z-10">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed relative z-10">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="container-wide mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know about our {data.title.toLowerCase()} services.</p>
          </div>
          
          <FAQAccordion faqs={data.faqs} />
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 bg-[#111c0c] border-t border-gray-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-gray-50/50 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-gray-50/50 blur-3xl" />
        
        <div className="container-wide mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-serif text-[#f1ece4] mb-6">Ready to transform your space?</h2>
          <p className="text-[#8b9c7c] text-lg mb-10">
            Let&apos;s collaborate to bring your vision to life. Schedule a consultation with our design experts today.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 bg-[var(--color-brand-500)] text-black px-8 py-4 rounded-md font-medium tracking-wide uppercase text-sm hover:bg-[#e0c16b] transition-colors"
          >
            <span>Book a Consultation</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
