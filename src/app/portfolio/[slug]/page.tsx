import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
      <section className="section-padding bg-[#0f1a0a]">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-3xl text-[#f5f0e8] mb-6">Project Overview</h2>
              <p className="text-[#d4c5ae] text-lg leading-relaxed">
                {project.overview.clientReq}
              </p>
            </div>
            <div className="bg-[#162411] p-8 rounded-lg border border-[#243a19]">
              <div className="space-y-6">
                <div>
                  <h4 className="text-[#9ba89e] text-sm uppercase tracking-wider mb-1">Location</h4>
                  <p className="text-[#f5f0e8] font-medium">{project.overview.location}</p>
                </div>
                <div>
                  <h4 className="text-[#9ba89e] text-sm uppercase tracking-wider mb-1">Square Footage</h4>
                  <p className="text-[#f5f0e8] font-medium">{project.overview.sqft}</p>
                </div>
                <div>
                  <h4 className="text-[#9ba89e] text-sm uppercase tracking-wider mb-1">Timeline</h4>
                  <p className="text-[#f5f0e8] font-medium">{project.overview.timeline}</p>
                </div>
              </div>
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
