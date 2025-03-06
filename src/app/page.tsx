import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import TechnologiesSection from "@/components/technologies-section";
import PortfolioSection from "@/components/portfolio-section";
import BlogSection from "@/components/blog-section";
import ContactSection from "@/components/contact-section";
import { redirect } from 'next/navigation';

export default function Home() {
  // Temporarily redirect to coming soon page
  redirect('/proximamente');
  
  // This code will be used when the site is ready to launch
  /* return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TechnologiesSection />
      <PortfolioSection />
      <BlogSection />
      <ContactSection />
    </>
  ); */
}