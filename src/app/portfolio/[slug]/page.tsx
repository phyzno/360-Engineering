import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Maximize, Clock } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import { projects } from "@/data/projects";

// In Next.js 15, route params are Promises.
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full min-h-[500px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0a1206]/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-wide">
            <Link 
              href="/portfolio" 
              className="inline-flex items-center text-[#d4c5ae] hover:text-[#c9a84c] mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Portfolio
            </Link>
            <p className="text-[#c9a84c] text-sm md:text-base uppercase tracking-[0.2em] font-semibold mb-4">
              {project.category} {project.subcategory ? `| ${project.subcategory}` : ""}
            </p>
            <h1 className="font-heading text-5xl md:text-7xl text-[#f5f0e8] mb-6">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="section-padding bg-[var(--color-forest-900)]">
        <div className="container-wide">
          <div className="max-w-4xl">
            <h2 className="font-heading text-3xl md:text-4xl text-[var(--color-cream-100)] mb-6">Project Overview</h2>
            <p className="text-[var(--color-cream-300)] text-lg leading-relaxed mb-12">
              {project.overview.clientReq}
            </p>
          </div>
          
          {/* Centered Horizontal Stats with Gold Dividers */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 pt-10 mt-6 border-t border-[rgba(201,168,76,0.15)] w-full">
            
            {/* Location */}
            <div className="group flex flex-col items-center md:items-start text-center md:text-left w-full md:w-auto">
              <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                <div className="p-2 rounded-full bg-[var(--color-gold-500)]/10 text-[var(--color-gold-500)] transition-colors group-hover:bg-[var(--color-gold-500)]/20">
                  <MapPin size={18} strokeWidth={1.5} />
                </div>
                <h4 className="text-[var(--color-cream-700)] text-xs uppercase tracking-[0.15em] font-semibold">Location</h4>
              </div>
              <p className="text-[var(--color-cream-100)] text-lg font-medium md:pl-12">{project.overview.location}</p>
            </div>
            
            {/* Divider 1 */}
            <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-[var(--color-gold-500)]/40 to-transparent"></div>
            <div className="block md:hidden h-px w-3/4 mx-auto bg-gradient-to-r from-transparent via-[var(--color-gold-500)]/40 to-transparent"></div>
            
            {/* Area */}
            <div className="group flex flex-col items-center md:items-start text-center md:text-left w-full md:w-auto">
              <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                <div className="p-2 rounded-full bg-[var(--color-gold-500)]/10 text-[var(--color-gold-500)] transition-colors group-hover:bg-[var(--color-gold-500)]/20">
                  <Maximize size={18} strokeWidth={1.5} />
                </div>
                <h4 className="text-[var(--color-cream-700)] text-xs uppercase tracking-[0.15em] font-semibold">Area</h4>
              </div>
              <p className="text-[var(--color-cream-100)] text-lg font-medium md:pl-12">{project.overview.sqft}</p>
            </div>
            
            {/* Divider 2 */}
            <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-[var(--color-gold-500)]/40 to-transparent"></div>
            <div className="block md:hidden h-px w-3/4 mx-auto bg-gradient-to-r from-transparent via-[var(--color-gold-500)]/40 to-transparent"></div>
            
            {/* Timeline */}
            <div className="group flex flex-col items-center md:items-start text-center md:text-left w-full md:w-auto">
              <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                <div className="p-2 rounded-full bg-[var(--color-gold-500)]/10 text-[var(--color-gold-500)] transition-colors group-hover:bg-[var(--color-gold-500)]/20">
                  <Clock size={18} strokeWidth={1.5} />
                </div>
                <h4 className="text-[var(--color-cream-700)] text-xs uppercase tracking-[0.15em] font-semibold">Timeline</h4>
              </div>
              <p className="text-[var(--color-cream-100)] text-lg font-medium md:pl-12">{project.overview.timeline}</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Design Blueprint */}
      <section className="section-padding bg-[#0a1206]">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl text-[#f5f0e8] mb-4">Design Blueprint</h2>
            <p className="text-[#d4c5ae] max-w-2xl mx-auto">
              From 2D concepts and 3D visualizations to the final stunning reality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#243a19]">
                <Image src={project.blueprint.plan2d} alt="2D Floor Plan" fill className="object-cover" />
              </div>
              <h3 className="text-center text-[#f5f0e8] font-medium">2D Floor Plan</h3>
            </div>
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#243a19]">
                <Image src={project.blueprint.render3d} alt="3D Render" fill className="object-cover" />
              </div>
              <h3 className="text-center text-[#f5f0e8] font-medium">3D Render</h3>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="relative aspect-[21/9] rounded-lg overflow-hidden border border-[#243a19]">
              <Image src={project.blueprint.final} alt="Final Photography" fill className="object-cover" />
            </div>
            <h3 className="text-center text-[#f5f0e8] font-medium text-lg">Final Photography</h3>
          </div>
        </div>
      </section>

      {/* Material Palette */}
      <section className="section-padding bg-[#0f1a0a]">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl text-[#f5f0e8] mb-10 text-center">Material Palette</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.materials.map((material, idx) => (
                <div key={idx} className="bg-[#162411] p-6 rounded-lg border border-[#243a19] flex flex-col">
                  <h3 className="text-[#c9a84c] font-medium text-xl mb-3">{material.name}</h3>
                  <p className="text-[#d4c5ae] flex-grow">{material.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
