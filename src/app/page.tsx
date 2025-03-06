import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import TechnologiesSection from "@/components/technologies-section";
import PortfolioSection from "@/components/portfolio-section";
import BlogSection from "@/components/blog-section";
import ContactSection from "@/components/contact-section";
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/proximamente');
}
export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TechnologiesSection />
      <PortfolioSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}