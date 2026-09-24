import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import AboutTeaser from "@/components/home/AboutTeaser";
import ServicesPreview from "@/components/home/ServicesPreview";
import PortfolioShowcase from "@/components/home/PortfolioShowcase";
import { InteractiveShowcase } from "@/components/home/InteractiveShowcase";
import CostEstimator from "@/components/home/CostEstimator";
import Workflow from "@/components/home/Workflow";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/home/CtaBanner";
import PageTransition from "@/components/ui/PageTransition";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 0; // ensure it's always up to date or use revalidate = 60 for ISR

export default async function Home() {
  const supabase = await createClient();
  const { data: featuredProjects } = await supabase
    .from("projects")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(3);

  // Fallback to latest projects if no featured ones are set
  let projectsToPass = featuredProjects || [];
  if (projectsToPass.length === 0) {
    const { data: latestProjects } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);
    projectsToPass = latestProjects || [];
  }

  return (
    <PageTransition>
      {/* 
        Hero Section: Needs to be at the very top, full screen. 
        It has its own padding/margins handled internally.
      */}
      <Hero />
      
      {/* Stats Counter Section */}
      <Stats />
      
      {/* About Section Teaser */}
      <AboutTeaser />
      
      {/* Services Overview */}
      <ServicesPreview />
      
      {/* Portfolio Highlight */}
      <PortfolioShowcase initialProjects={projectsToPass} />
      
      {/* Interactive Showcase (Before/After) */}
      <InteractiveShowcase />
      
      {/* Interactive Cost Estimator */}
      <CostEstimator />
      
      {/* Our Workflow/Process */}
      <Workflow />
      
      {/* Testimonials Slider */}
      <Testimonials />
      
      {/* Call to Action Banner */}
      <CtaBanner />
    </PageTransition>
  );
}
