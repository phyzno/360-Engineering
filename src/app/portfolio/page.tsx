import Image from "next/image";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";

export const metadata = {
  title: "Portfolio",
  description: "Explore our curated collection of luxury interior design projects, featuring residential, commercial, and styling works.",
};

export default function PortfolioPage() {
  return (
    <PageTransition>
      <section className="relative hero-padding overflow-hidden border-b border-[#1a2912] bg-[#0f1a0a]">
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
          <p className="text-[#d4c5ae] text-lg">
            A curated selection of our finest residential and commercial spaces. 
            Each project is a testament to our commitment to luxury, nature, and craft.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[#0a1206]">
        <div className="container-wide">
          <PortfolioGallery />
        </div>
      </section>
    </PageTransition>
  );
}
