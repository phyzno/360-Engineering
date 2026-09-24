import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import { getServiceDetails } from "@/data/services";
import { createClient } from "@/utils/supabase/server";

export default async function ServiceDetailsPage({ params }: { params: Promise<{ category: string, slug: string }> }) {
  const { category, slug } = await params;
  const service = getServiceDetails(category, slug);
  
  if (!service) {
    return notFound();
  }

  const supabase = await createClient();
  
  // Fetch dynamic clients
  const { data: dbClients } = await supabase
    .from('service_clients')
    .select('*')
    .eq('service_id', slug)
    .order('created_at', { ascending: false });

  // Fetch projects to use as dynamic gallery images
  const { data: dbProjects } = await supabase
    .from('projects')
    .select('image, blueprint, subcategory')
    .ilike('category', category)
    .order('created_at', { ascending: false });

  // Filter projects by subcategory exactly matching slug or legacy text
  const relevantProjects = (dbProjects || []).filter(p => {
    if (!p.subcategory) return false;
    // The admin panel now saves the slug (e.g. 'beauty-salon') in the subcategory field
    if (p.subcategory === slug) return true;
    
    // Fallback for older projects where subcategory might be saved as text
    const sub = p.subcategory.toLowerCase();
    const serviceTitle = service.title.toLowerCase();
    const serviceSlug = slug.toLowerCase().replace(/-/g, ' ');
    return sub.includes(serviceTitle) || serviceTitle.includes(sub) || sub.includes(serviceSlug) || serviceSlug.includes(sub);
  });

  // Extract up to 3 images from relevant projects
  let dynamicImages: string[] = [];
  relevantProjects.forEach(p => {
    if (p.image) dynamicImages.push(p.image);
    if (p.blueprint?.final && Array.isArray(p.blueprint.final)) {
      dynamicImages.push(...p.blueprint.final);
    }
  });
  
  // Get unique images (deduplicating by original filename if uploaded multiple times) and limit to 3
  const uniqueImagesMap = new Map<string, string>();
  dynamicImages.forEach(url => {
    let key = url;
    if (url.startsWith('/uploads/')) {
      const parts = url.split('-');
      if (parts.length >= 3) {
        // Filename format is /uploads/{timestamp}-{random}-{original-name}
        key = parts.slice(2).join('-');
      }
    }
    if (!uniqueImagesMap.has(key)) {
      uniqueImagesMap.set(key, url);
    }
  });
  
  dynamicImages = Array.from(uniqueImagesMap.values()).slice(0, 3);

  // Fallback to static dummy images if no dynamic images exist
  const galleryImagesToDisplay = dynamicImages.length > 0 ? dynamicImages : service.galleryImages;

  // Use dynamic clients if any exist, otherwise fallback to static
  const clientsToDisplay = dbClients && dbClients.length > 0 ? dbClients : service.clients;
  
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative hero-padding bg-[var(--color-neutral-950)] min-h-[70vh] flex items-center border-b border-gray-200 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 bg-black">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-neutral-950)] via-[var(--color-neutral-950)]/30 to-black/30" />
        </div>

        <div className="container-wide relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
          <span className="text-[var(--color-brand-300)] text-sm tracking-widest uppercase mb-4 font-semibold tracking-[0.2em]">{service.category} Service</span>
          <h1 className="font-heading text-5xl md:text-7xl font-medium tracking-wide text-white mb-6">
            {service.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mb-12 leading-relaxed">
            {service.subtitle}
          </p>
          <div className="brand-line mx-auto" />
        </div>
      </section>

      {/* Main Content & Features */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading title="The Concept" subtitle="Our Approach" />
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {service.description}
              </p>
              
              <ul className="space-y-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle className="text-[var(--color-brand-500)] mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h4 className="text-[var(--color-neutral-900)] text-xl font-medium mb-2">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[600px] rounded-xl overflow-hidden shadow-lg border border-gray-100">
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
      <section className="section-padding bg-gray-50 border-y border-gray-200">
        <div className="container-wide">
          <SectionHeading title="Expertise" subtitle="How We Work" centered />
          
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Approach */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all hover:border-[var(--color-brand-500)] hover:shadow-md">
              <h3 className="text-[var(--color-neutral-900)] text-xl font-medium mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[var(--color-brand-100)] text-[var(--color-brand-700)] flex items-center justify-center text-sm font-bold">01</span>
                Our Approach
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.specificDetails.approach}
              </p>
            </div>

            {/* What We Do */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all hover:border-[var(--color-brand-500)] hover:shadow-md">
              <h3 className="text-[var(--color-neutral-900)] text-xl font-medium mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[var(--color-brand-100)] text-[var(--color-brand-700)] flex items-center justify-center text-sm font-bold">02</span>
                What We Do
              </h3>
              <ul className="space-y-4">
                {service.specificDetails.activities.map((activity, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle className="text-[var(--color-brand-500)] mt-0.5 flex-shrink-0" size={18} />
                    <span className="leading-snug">{activity}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Materials We Use */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all hover:border-[var(--color-brand-500)] hover:shadow-md">
              <h3 className="text-[var(--color-neutral-900)] text-xl font-medium mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[var(--color-brand-100)] text-[var(--color-brand-700)] flex items-center justify-center text-sm font-bold">03</span>
                Materials We Use
              </h3>
              <ul className="space-y-4">
                {service.specificDetails.materials.map((material, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle className="text-[var(--color-brand-500)] mt-0.5 flex-shrink-0" size={18} />
                    <span className="leading-snug">{material}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeading title="Who We've Worked With" subtitle="Select Clients & Projects" centered />
          
          <div className="flex flex-wrap justify-center gap-6 mt-16">
            {clientsToDisplay.map((client: any, idx: number) => (
              <div key={client.id || idx} className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] bg-white border border-gray-200 shadow-sm p-8 rounded-xl text-center hover:border-[var(--color-brand-500)] hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center">
                {client.logo && (
                  <div className="relative w-full h-16 mb-4 flex items-center justify-center">
                    <img src={client.logo} alt={client.name} className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                  </div>
                )}
                <h4 className="text-[var(--color-neutral-900)] text-xl font-medium mb-2">{client.name}</h4>
                {client.type && <p className="text-[var(--color-brand-500)] text-sm uppercase tracking-wider font-semibold">{client.type}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-gray-50 border-y border-gray-200">
        <div className="container-wide">
          <SectionHeading title="Inspirations" subtitle="Gallery" centered />
          
          <div className="flex flex-wrap justify-center gap-6 mt-16">
            {galleryImagesToDisplay.map((img: string, idx: number) => (
              <div key={idx} className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm group w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] h-[400px]">
                <Image
                  src={img}
                  alt={`${service.title} Gallery ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative bg-[var(--color-neutral-900)] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.heroImage}
            alt="Background"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="container-wide relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl font-medium text-white mb-6">
            Ready to transform your space?
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            Let&apos;s discuss how our {service.title.toLowerCase()} service can bring your vision to life.
          </p>
          <Link
            href="/contact"
            className="btn-primary"
          >
            <span>Start Your Project</span> <ArrowRight size={18} className="relative z-10" />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
