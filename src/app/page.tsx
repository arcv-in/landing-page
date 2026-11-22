import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { PlatformTour } from "@/components/PlatformTour";
import { ComparisonSection } from "@/components/ComparisonSection";
import { Testimonials } from "@/components/Testimonials";
import { FaqSection } from "@/components/FaqSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F3F3F3] text-[#1D1D1D] selection:bg-[#F0FD63] selection:text-[#1D1D1D]">
      <Navbar />
      <Hero />
      <ProblemSection />
      <PlatformTour />
      <ComparisonSection />
      <Testimonials />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
