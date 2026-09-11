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

export default function Home() {
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
      <PortfolioShowcase />
      
      {/* Interactive Showcase (Before/After & 3D Tour) */}
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
