import HeroSection from "@/components/home/HeroSection";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import TopGuides from "@/components/home/TopGuides";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedDestinations />
      <HowItWorks />
      <TopGuides />
      <WhyChooseUs />
      <CTASection />
    </div>
  );
}
