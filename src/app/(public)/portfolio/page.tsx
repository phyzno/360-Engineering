import Image from "next/image";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import { createClient } from "@/utils/supabase/server";

export const metadata = {
  title: "Portfolio",
  description: "Explore our curated collection of luxury interior design projects, featuring residential, commercial, and styling works.",
};

export const revalidate = 0; // ensure it's always up to date or use revalidate = 60 for ISR

export default async function PortfolioPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <PageTransition>
      <section className="relative hero-padding overflow-hidden border-b border-gray-200 bg-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop"
            alt="Luxury interior design"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container-wide relative z-10 text-center max-w-4xl mx-auto">
          <SectionHeading title="Selected Works" subtitle="Portfolio" centered />
          <p className="text-gray-600 text-lg">
            A curated selection of our finest residential and commercial spaces. 
            Each project is a testament to our commitment to luxury, nature, and craft.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <PortfolioGallery initialProjects={projects || []} />
        </div>
      </section>
    </PageTransition>
  );
}
