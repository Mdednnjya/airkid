import HeroSection from "@/components/landing-page/hero-section";
import FeaturesSection from "@/components/landing-page/feature-section";
import { LandingPageHeader } from "@/components/landing-page/landing-page-header";
import Footer from "@/components/landing-page/footer";

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-800">
      <LandingPageHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}