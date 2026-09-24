import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Maximize, Clock } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import { createClient } from "@/utils/supabase/server";

// In Next.js 15, route params are Promises.
interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0; // Disable static generation for fully dynamic page

export default async function ProjectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();
  
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", resolvedParams.slug)
    .single();

  if (!project) {
    notFound();
  }
  
  // Format the blueprint final images
  const rawFinal = project.blueprint?.final;
  const finalPhotos: string[] = Array.isArray(rawFinal) ? rawFinal : (rawFinal ? [rawFinal] : []);
  
  // Check if we have 2d/3d plans
  const hasPlan2D = !!project.blueprint?.plan2d;
  const hasRender3D = !!project.blueprint?.render3d;
  const hasBlueprintSection = hasPlan2D || hasRender3D || finalPhotos.length > 0;

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full min-h-[500px]">
        <Image
          src={project.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-wide">
            <Link 
              href="/portfolio" 
              className="inline-flex items-center text-gray-600 hover:text-[#d96b11] mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Portfolio
            </Link>
            <p className="text-[#d96b11] text-sm md:text-base uppercase tracking-[0.2em] font-semibold mb-4">
              {project.category} {project.subcategory ? `| ${project.subcategory}` : ""}
            </p>
            <h1 className="font-heading text-5xl md:text-7xl text-gray-900 mb-6">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-4xl">
            <h2 className="font-heading text-3xl md:text-4xl text-gray-900 mb-6">Project Overview</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              {project.overview?.clientReq || "Project details coming soon."}
            </p>
          </div>
          
          {/* Centered Horizontal Stats with Gold Dividers */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 pt-10 mt-6 border-t border-[#fadbc2] w-full">
            
            {/* Location */}
            {project.overview?.location && (
              <>
                <div className="group flex flex-col items-center md:items-start text-center md:text-left w-full md:w-auto">
                  <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                    <div className="p-2 rounded-full bg-[#d96b11]/10 text-[#d96b11] transition-colors group-hover:bg-[#d96b11]/20">
                      <MapPin size={18} strokeWidth={1.5} />
                    </div>
                    <h4 className="text-gray-500 text-xs uppercase tracking-[0.15em] font-semibold">Location</h4>
                  </div>
                  <p className="text-gray-900 text-lg font-medium md:pl-12">{project.overview.location}</p>
                </div>
                <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-[#d96b11]/40 to-transparent"></div>
                <div className="block md:hidden h-px w-3/4 mx-auto bg-gradient-to-r from-transparent via-[#d96b11]/40 to-transparent"></div>
              </>
            )}
            
            {/* Area */}
            {project.overview?.sqft && (
              <>
                <div className="group flex flex-col items-center md:items-start text-center md:text-left w-full md:w-auto">
                  <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                    <div className="p-2 rounded-full bg-[#d96b11]/10 text-[#d96b11] transition-colors group-hover:bg-[#d96b11]/20">
                      <Maximize size={18} strokeWidth={1.5} />
                    </div>
                    <h4 className="text-gray-500 text-xs uppercase tracking-[0.15em] font-semibold">Area</h4>
                  </div>
                  <p className="text-gray-900 text-lg font-medium md:pl-12">{project.overview.sqft}</p>
                </div>
                <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-[#d96b11]/40 to-transparent"></div>
                <div className="block md:hidden h-px w-3/4 mx-auto bg-gradient-to-r from-transparent via-[#d96b11]/40 to-transparent"></div>
              </>
            )}
            
            {/* Timeline */}
            {project.overview?.timeline && (
              <div className="group flex flex-col items-center md:items-start text-center md:text-left w-full md:w-auto">
                <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                  <div className="p-2 rounded-full bg-[#d96b11]/10 text-[#d96b11] transition-colors group-hover:bg-[#d96b11]/20">
                    <Clock size={18} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-gray-500 text-xs uppercase tracking-[0.15em] font-semibold">Timeline</h4>
                </div>
                <p className="text-gray-900 text-lg font-medium md:pl-12">{project.overview.timeline}</p>
              </div>
            )}
            
          </div>
        </div>
      </section>

      {/* Design Blueprint */}
      {hasBlueprintSection && (
        <section className="section-padding bg-white">
          <div className="container-wide">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl text-gray-900 mb-4">Design Blueprint</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From initial concepts to the stunning final reality.
              </p>
            </div>
            
            {/* 2D & 3D Plans Grid */}
            {(hasPlan2D || hasRender3D) && (
              <div className={`grid grid-cols-1 ${hasPlan2D && hasRender3D ? 'md:grid-cols-2' : ''} gap-8 mb-12`}>
                {hasPlan2D && (
                  <div className="space-y-4 max-w-4xl mx-auto w-full">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                      <Image src={project.blueprint.plan2d} alt="2D Floor Plan" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                    <h3 className="text-center text-gray-900 font-medium font-heading text-xl">2D Floor Plan</h3>
                  </div>
                )}
                {hasRender3D && (
                  <div className="space-y-4 max-w-4xl mx-auto w-full">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                      <Image src={project.blueprint.render3d} alt="3D Render" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                    <h3 className="text-center text-gray-900 font-medium font-heading text-xl">3D Render</h3>
                  </div>
                )}
              </div>
            )}
            
            {/* Final Photography */}
            {finalPhotos.length > 0 && (
              <div className="space-y-8 mt-16">
                <h3 className="text-center text-gray-900 font-heading text-3xl mb-8">Final Photography</h3>
                <div className="flex flex-wrap justify-center gap-6">
                  {finalPhotos.map((photo, index) => (
                    <div 
                      key={index} 
                      className={`relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm
                        ${finalPhotos.length === 1 ? 'w-full aspect-[21/9] max-w-5xl' : 'w-full md:w-[calc(50%-12px)] aspect-[4/3]'}
                      `}
                    >
                      <Image 
                        src={photo} 
                        alt={`Final Photography ${index + 1}`} 
                        fill 
                        className="object-cover hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Material Palette */}
      {project.materials && project.materials.length > 0 && (
        <section className="section-padding bg-[#FFF8F0]">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-4xl text-gray-900 mb-10 text-center">Material Palette</h2>
              <div className="flex flex-wrap justify-center gap-6">
                {project.materials.map((material: any, idx: number) => (
                  <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-[#fadbc2] flex flex-col w-full sm:w-[calc(50%-12px)] hover:-translate-y-1 transition-transform">
                    <h3 className="text-[#d96b11] font-heading font-medium text-2xl mb-3">{material.name}</h3>
                    <p className="text-gray-600 flex-grow leading-relaxed">{material.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </PageTransition>
  );
}
