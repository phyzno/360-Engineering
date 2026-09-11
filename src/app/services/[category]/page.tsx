import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/portfolio/PortfolioGallery";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryName = category.replace(/-/g, " ").toUpperCase();
  
  // Find projects that match the category
  const categoryProjects = projects.filter(
    (p) => p.category.toLowerCase() === category.replace(/-/g, " ").toLowerCase()
  );
  
  return (
    <PageTransition>
      <section className="hero-padding bg-[#0f1a0a] min-h-[70vh] border-b border-[#1a2912] flex flex-col justify-center">
        <div className="container-wide text-center max-w-4xl mx-auto mb-16">
          <SectionHeading title={`${categoryName} SERVICES`} subtitle="Expertise" centered />
          <p className="text-[#d4c5ae] text-lg mt-8">
            Explore our specialized {categoryName.toLowerCase()} interior design services. 
          </p>
        </div>
        
        {categoryProjects.length > 0 ? (
          <div className="container-wide mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        ) : (
          <div className="container-wide text-center max-w-4xl mx-auto">
            <p className="text-[#d4c5ae] text-lg mt-8">
              We are working on bringing full project galleries to this section soon.
            </p>
          </div>
        )}
      </section>
    </PageTransition>
  );
}
