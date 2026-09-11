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
      <section className="hero-padding bg-[#0f1a0a]">
        <div className="container-wide text-center max-w-4xl mx-auto">
          <SectionHeading title="Selected Works" subtitle="Portfolio" centered />
          <p className="text-[#d4c5ae] text-lg">
            A curated selection of our finest residential and commercial spaces. 
            Each project is a testament to our commitment to luxury, nature, and craft.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[#0f1a0a]">
        <div className="container-wide">
          <PortfolioGallery />
        </div>
      </section>
    </PageTransition>
  );
}
