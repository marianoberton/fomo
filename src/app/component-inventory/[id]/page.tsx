"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, AlertTriangle } from "lucide-react";

// Import components that can be displayed individually
import HeroSection from "@/components/page-sections/hero-section";
import PainPointsSection from "@/components/page-sections/pain-points-section";
import ThreePillarsSection from "@/components/page-sections/three-pillars-section";
import ProcessTimelineSection from "@/components/page-sections/process-timeline-section";
import DemoGallerySection from "@/components/page-sections/demo-gallery-section";
import TeamSection from "@/components/page-sections/team-section";
import FAQSection from "@/components/page-sections/faq-section";
import ContactFormSection from "@/components/page-sections/contact-form-section";
import FinalCTASection from "@/components/page-sections/final-cta-section";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import MaturityScoreSection from "@/components/page-sections/maturity-score-section";

// Legacy components that can be displayed
import HeroAISection from "@/components/page-sections/hero-ai-section";
import ServicesSection_loka from "@/components/page-sections/ServicesSection_loka";
import HeroSection_loka from "@/components/page-sections/hero-section_loka";
import HeroSection_old from "@/components/page-sections/hero-section_old";
import WhatWeDoSection from "@/components/page-sections/WhatWeDoSection";
import { DescriptionSection } from "@/components/page-sections/description-section";
import { AboutSection } from "@/components/page-sections/about-section";
import { ContactSection } from "@/components/page-sections/contact-section";
import { PlansSection } from "@/components/page-sections/plans-section";
import { SuccessCasesSection } from "@/components/page-sections/success-cases-section";
import { ServicesSection } from "@/components/page-sections/services-section";
import IrresistibleOfferSection from "@/components/page-sections/irresistible-offer-section";
import SocialProofSection from "@/components/page-sections/social-proof-section";
import NavigationBackup from "@/components/navigation-backup";

// Component mapping - only components that can be rendered individually
const componentMap: { [key: string]: { component: React.ComponentType; name: string; status: string } } = {
  // ACTIVE COMPONENTS
  "1": { component: HeroSection, name: "Hero Section", status: "active" },
  "2": { component: PainPointsSection, name: "Pain Points Section", status: "active" },
  "3": { component: ThreePillarsSection, name: "Three Pillars Section", status: "active" },
  "4": { component: ProcessTimelineSection, name: "Process Timeline Section", status: "active" },
  "5": { component: DemoGallerySection, name: "Demo Gallery Section", status: "active" },
  "6": { component: TeamSection, name: "Team Section", status: "active" },
  "7": { component: FAQSection, name: "FAQ Section", status: "active" },
  "8": { component: ContactFormSection, name: "Contact Form Section", status: "active" },
  "9": { component: FinalCTASection, name: "Final CTA Section", status: "active" },
  "10": { component: Navigation, name: "Navigation", status: "active" },
  "11": { component: Footer, name: "Footer", status: "active" },
  
  // FUTURE COMPONENTS
  "12": { component: MaturityScoreSection, name: "Maturity Score Section", status: "future" },
  
  // LEGACY COMPONENTS
  "13": { component: HeroAISection, name: "Hero AI Section", status: "legacy" },
  "14": { component: ServicesSection_loka, name: "Services Section (Loka)", status: "legacy" },
  "15": { component: HeroSection_loka, name: "Hero Section (Loka)", status: "legacy" },
  "16": { component: HeroSection_old, name: "Hero Section (Old)", status: "legacy" },
  "17": { component: WhatWeDoSection, name: "What We Do Section", status: "legacy" },
  "18": { component: DescriptionSection, name: "Description Section", status: "legacy" },
  "19": { component: AboutSection, name: "About Section", status: "legacy" },
  "21": { component: ContactSection, name: "Contact Section", status: "legacy" },
  "22": { component: PlansSection, name: "Plans Section", status: "legacy" },
  "23": { component: SuccessCasesSection, name: "Success Cases Section", status: "legacy" },
  "25": { component: ServicesSection, name: "Services Section", status: "legacy" },
  "29": { component: IrresistibleOfferSection, name: "Irresistible Offer Section", status: "legacy" },
  "30": { component: SocialProofSection, name: "Social Proof Section", status: "legacy" },
  "31": { component: NavigationBackup, name: "Navigation Backup", status: "legacy" },
};

export default function ComponentViewPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const componentData = componentMap[id];

  if (!componentData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Componente no disponible</h1>
          <p className="text-slate-600 mb-6">
            El componente #{id} no se puede mostrar individualmente o no existe.
            <br />
            <span className="text-sm">Algunos componentes requieren props específicas o no tienen exports adecuados.</span>
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => router.back()} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <Button onClick={() => router.push('/component-inventory')}>
              <Home className="w-4 h-4 mr-2" />
              Inventario
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const Component = componentData.component;
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'future': return 'bg-orange-100 text-orange-800';
      case 'legacy': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button onClick={() => router.back()} variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">#{id} - {componentData.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(componentData.status)}`}>
                    {componentData.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => router.push('/component-inventory')} variant="outline" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Inventario
              </Button>
              <Button onClick={() => window.open('/', '_blank')} variant="outline" size="sm">
                Ver página principal
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Component Display */}
      <div className="relative">
        <Component />
      </div>

      {/* Component Info Footer */}
      <div className="bg-slate-50 border-t">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Componente #{id}: {componentData.name}
            </h3>
            <p className="text-slate-600 mb-4">
              Estado: <span className="font-medium">{componentData.status}</span>
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => router.back()} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al inventario
              </Button>
              <Button onClick={() => router.push('/')}>
                Ver página principal completa
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 