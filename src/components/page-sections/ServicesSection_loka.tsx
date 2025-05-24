"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { type LottieRefCurrentProps } from "lottie-react"
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

// Properly handle SSR by ensuring Lottie only loads on the client side
// Using { ssr: false } and creating a custom wrapper component
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// Create a component that safely renders Lottie animations only on client-side
const DynamicLottie = ({ lottieRef, animationData, className }: { 
  lottieRef: React.RefObject<LottieRefCurrentProps>, 
  animationData: any,
  className?: string 
}) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    // Return placeholder while client-side rendering hasn't happened yet
    return <div className={cn("lottie-placeholder", className)} />;
  }
  
  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={false}
      autoplay={false}
      className={className}
    />
  );
};

// Define the service data structure
interface Service {
  id: string
  number: string
  title: string
  description: string
  lottieSegment: [number, number]
  mobileImage: string
  buttonText: string
  buttonUrl: string
}

// Sample data for the services
const servicesData: Service[] = [
  {
    id: "consultoria-estrategica",
    number: "01",
    title: "Consultoría Estratégica",
    description:
      "Te ayudamos a definir tu estrategia digital y a tomar las mejores decisiones para tu negocio. Desde la concepción de la idea hasta la implementación y el seguimiento.",
    lottieSegment: [0, 59],
    mobileImage: "/images/services/consultoria_estrategica_mobile.jpg",
    buttonText: "Descubre Más",
    buttonUrl: "/servicios/consultoria-estrategica",
  },
  {
    id: "desarrollo-web",
    number: "02",
    title: "Desarrollo Web y Apps",
    description:
      "Creamos plataformas web y aplicaciones móviles a medida, robustas, escalables y centradas en el usuario. Utilizamos las últimas tecnologías para ofrecerte la mejor experiencia.",
    lottieSegment: [60, 119],
    mobileImage: "/images/services/desarrollo_web_mobile.jpg",
    buttonText: "Explora Proyectos",
    buttonUrl: "/servicios/desarrollo-web",
  },
  {
    id: "marketing-digital",
    number: "03",
    title: "Marketing Digital",
    description:
      "Impulsamos tu presencia online y optimizamos tu inversión en marketing. Desde SEO y SEM hasta gestión de redes sociales y creación de contenido.",
    lottieSegment: [120, 179],
    mobileImage: "/images/services/marketing_digital_mobile.jpg",
    buttonText: "Ver Estrategias",
    buttonUrl: "/servicios/marketing-digital",
  },
  {
    id: "ia-automatizacion",
    number: "04",
    title: "IA y Automatización",
    description:
      "Integramos inteligencia artificial y automatización para optimizar procesos, mejorar la eficiencia y ofrecer experiencias personalizadas. Descubre el poder de la IA.",
    lottieSegment: [180, 239],
    mobileImage: "/images/services/ia_automatizacion_mobile.jpg",
    buttonText: "Conoce las Soluciones",
    buttonUrl: "/servicios/ia-automatizacion",
  },
  {
    id: "diseno-ux-ui",
    number: "05",
    title: "Diseño UX/UI",
    description:
      "Diseñamos interfaces intuitivas y atractivas que enamoran a tus usuarios. Nos enfocamos en la experiencia de usuario para garantizar la usabilidad y la conversión.",
    lottieSegment: [240, 299],
    mobileImage: "/images/services/diseno_ux_ui_mobile.jpg",
    buttonText: "Inspírate",
    buttonUrl: "/servicios/diseno-ux-ui",
  },
  {
    id: "software-a-medida",
    number: "06",
    title: "Software a Medida",
    description:
      "Desarrollamos soluciones de software personalizadas que se adaptan perfectamente a las necesidades específicas de tu empresa. Escalabilidad y rendimiento garantizados.",
    lottieSegment: [300, 359],
    mobileImage: "/images/services/software_a_medida_mobile.jpg",
    buttonText: "Cotiza tu Proyecto",
    buttonUrl: "/servicios/software-a-medida",
  }
]

export default function PopularServices() {
  const [targetServiceIndex, setTargetServiceIndex] = useState(0)
  const [displayServiceIndex, setDisplayServiceIndex] = useState(0)
  const [isCardAnimating, setIsCardAnimating] = useState(false)
  
  const [animationData, setAnimationData] = useState<any | null>(null)
  const lottieRef = useRef<LottieRefCurrentProps | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const contentWrapperRef = useRef<HTMLDivElement>(null)
  const pinningTriggerRef = useRef<ScrollTrigger | null>(null)
  const snappingTriggerRef = useRef<ScrollTrigger | null>(null)
  
  // Add a flag to prevent further scrolling updates once we reach the last service
  const isAtLastService = useRef(false);

  // Refs for columns to potentially control their individual scroll or animation if needed beyond global scroll
  const serviceLinksColumnRef = useRef<HTMLDivElement>(null)
  const lottieColumnRef = useRef<HTMLDivElement>(null)
  const serviceContentColumnRef = useRef<HTMLDivElement>(null)

  // Helper function to calculate a snap point position for a given index
  const getSnapPointForIndex = (index: number, totalItems: number) => {
    // Safety checks
    if (totalItems <= 1) return 0;
    if (index < 0) return 0;
    if (index >= totalItems) return 1;
    
    // Calculate the snap point (same formula as in useEffect)
    return index / (totalItems - 1);
  };

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    fetch("/images/65afb35ffebdda615114ddab_loka_icons_v2.json")
      .then((response) => response.json())
      .then(setAnimationData)
      .catch((error) => console.error("Error fetching Lottie animation:", error))
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !animationData || !sectionRef.current || servicesData.length === 0) return

    // Register both plugins explicitly
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
    
    console.log("Setting up ScrollTrigger with", servicesData.length, "services");

    // Calculate explicit snap points - one for each service
    const numServices = servicesData.length;
    
    // Create explicit snap points to ensure each service is reachable
    // These values are evenly distributed from 0 to 1
    const snapPoints: number[] = [];
    for (let i = 0; i < numServices; i++) {
      snapPoints.push(i / (numServices - 1));
    }
    console.log("Snap points:", snapPoints);
    
    // Increase scroll distance SIGNIFICANTLY to ensure we can reach all the way to the end
    // Using an even larger multiplier to ensure the last service is reachable
    const scrollDistance = window.innerHeight * (numServices * 1.5);
    
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=" + scrollDistance,
      pin: sectionRef.current,
      scrub: 0.5,
      markers: true,
      snap: {
        // Use a custom snap function that works for all indices including first and last
        snapTo: (value) => {
          // Reset last service flag if we're scrolling back up towards the beginning
          if (value < 0.2 && isAtLastService.current) {
            console.log("Scrolling back up, resetting isAtLastService flag");
            isAtLastService.current = false;
          }
          
          // Special case for the first element - increased threshold to 0.2
          if (value < 0.2) {
            console.log("Near start, snapping to first service");
            return 0; // Force snap to first element
          }
          
          // Special case for the last element
          if (value > 0.8 || isAtLastService.current) {
            console.log("Near end or already at last service, snapping to last service");
            return 1; // Force snap to last element
          }
          
          // For middle elements, find the closest snap point
          let closestIndex = 0;
          let minDistance = 1;
          
          for (let i = 0; i < snapPoints.length; i++) {
            const distance = Math.abs(value - snapPoints[i]);
            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = i;
            }
          }
          
          return snapPoints[closestIndex];
        },
        delay: 0.1,
        ease: "power2.out"
      },
      onUpdate: self => {
        // If we already decided this is the last service, don't change back
        // unless we're explicitly scrolling back up towards the beginning
        if (isAtLastService.current && targetServiceIndex === numServices - 1 && self.progress > 0.5) {
          console.log("Already at last service, ignoring scroll update");
          return;
        }
        
        // CRITICAL: Calculate which service should be active based on scroll progress
        let targetIndex;
        const progress = self.progress;
        
        // First service handling - special case to always work - increased threshold to 0.2
        if (progress < 0.2) {
          targetIndex = 0; // First service
          console.log(`Progress: ${progress.toFixed(3)} → ACTIVATING FIRST service: 0`);
          
          // Reset the last service flag
          isAtLastService.current = false;
        }
        // Find the second-to-last snap point for last service detection
        else if (progress >= snapPoints[numServices - 2]) {
          // Beyond second-to-last snap point, show last service
          targetIndex = numServices - 1; // Last service
          console.log(`Progress: ${progress.toFixed(3)} → Beyond ${snapPoints[numServices - 2].toFixed(3)}, ACTIVATING LAST service: ${targetIndex}`);
          
          // Set the flag to prevent bouncing back
          isAtLastService.current = true;
        }
        // For all other cases, find the closest snap point
        else {
          // Find the closest snap point for normal services
          let closestIndex = 0;
          let minDistance = 1;
          
          snapPoints.forEach((point, idx) => {
            // Skip the last snap point as we handle it separately above
            if (idx === numServices - 1) return;
            
            const distance = Math.abs(progress - point);
            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = idx;
            }
          });
          
          targetIndex = closestIndex;
          console.log(`Progress: ${progress.toFixed(3)} → Service: ${targetIndex} of ${numServices-1} (dist: ${minDistance.toFixed(3)})`);
          
          // Reset the last service flag when we're not at the last service
          isAtLastService.current = false;
        }
        
        // Only update if needed
        if (targetServiceIndex !== targetIndex) {
          console.log("↳ CHANGING targetServiceIndex to:", targetIndex);
          setTargetServiceIndex(targetIndex);
        }
      }
    });
    
    // Store in both refs for compatibility with existing code
    pinningTriggerRef.current = trigger;
    snappingTriggerRef.current = trigger;

    return () => {
      console.log("Cleanup: Killing ScrollTrigger");
      if (trigger) {
        trigger.kill();
      }
    };
  }, [animationData, servicesData.length]);

  // Update display service index when target changes and animations complete
  useEffect(() => {
    // Only transition when card isn't already animating
    if (!isCardAnimating && targetServiceIndex !== displayServiceIndex) {
      console.log(`Starting transition from ${displayServiceIndex} to ${targetServiceIndex}`);
      setIsCardAnimating(true);
      setDisplayServiceIndex(targetServiceIndex);
    }
  }, [targetServiceIndex, displayServiceIndex, isCardAnimating]);

  // Lottie animation control based on displayServiceIndex
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    if (lottieRef.current && animationData && servicesData[displayServiceIndex]) {
      const [startFrame, endFrame] = servicesData[displayServiceIndex].lottieSegment
      lottieRef.current.playSegments([startFrame, endFrame], true)
    }
  }, [displayServiceIndex, animationData])

  // Animation callback handlers for service cards
  const handleCardAnimationStart = useCallback(() => {
    console.log("Card animation started");
    setIsCardAnimating(true);
  }, []);

  const handleCardAnimationComplete = useCallback(() => {
    console.log("Card animation completed");
    setIsCardAnimating(false);
    
    // Ensure the scroll position and service index are in sync
    if (pinningTriggerRef.current) {
      const progress = pinningTriggerRef.current.progress;
      console.log(`Animation completed. Current progress: ${progress.toFixed(3)}`);
      
      // For last service, don't allow changing back
      if (displayServiceIndex === servicesData.length - 1) {
        console.log("At last service after animation, locking state");
        isAtLastService.current = true;
        return;
      }
      
      // Use the same logic as in the ScrollTrigger onUpdate handler
      if (servicesData.length > 1) {
        // Calculate second-to-last snap point
        const numServices = servicesData.length;
        const secondLastIndex = numServices - 2;
        const secondLastSnapPoint = secondLastIndex / (numServices - 1);
        
        // If we're at or beyond the second-to-last snap point, show the last service
        if (progress >= secondLastSnapPoint && targetServiceIndex !== numServices - 1) {
          console.log(`Progress ${progress.toFixed(3)} at/beyond ${secondLastSnapPoint.toFixed(3)}, activating last service`);
          setTargetServiceIndex(numServices - 1);
          isAtLastService.current = true;
        } 
        // First service handling - increased threshold to 0.2
        else if (progress < 0.2 && targetServiceIndex !== 0) {
          console.log("Progress near start, activating first service");
          setTargetServiceIndex(0);
          isAtLastService.current = false;
        }
      }
      
      // Refresh ScrollTrigger to ensure proper positioning
      ScrollTrigger.refresh();
    }
  }, [targetServiceIndex, displayServiceIndex, servicesData.length]);

  // This runs after a service click to properly update the DOM 
  useEffect(() => {
    if (sectionRef.current && pinningTriggerRef.current) {
      // Refresh ScrollTrigger to ensure proper position calculation
      ScrollTrigger.refresh();
    }
  }, [displayServiceIndex]);
  
  // Direct navigation buttons for testing and reliability
  const goToFirstService = useCallback(() => {
    // Force immediate state update
    setTargetServiceIndex(0);
    setDisplayServiceIndex(0);
    
    // Reset the last service flag
    isAtLastService.current = false;
    
    // Scroll to start - using a slightly better approach to ensure we reach the start
    if (pinningTriggerRef.current) {
      const trigger = pinningTriggerRef.current;
      // Use a more precise approach to target the exact beginning
      const scrollPos = Math.max(0, trigger.start - 10); // Small offset to ensure we're at the very beginning
      
      gsap.to(window, {
        scrollTo: { y: scrollPos, autoKill: true },
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          // Force first service again after scrolling completes
          setTargetServiceIndex(0);
          setDisplayServiceIndex(0);
          ScrollTrigger.refresh();
        }
      });
    }
  }, []);
  
  const goToLastService = useCallback(() => {
    const lastIndex = servicesData.length - 1;
    
    // Force immediate state update
    setTargetServiceIndex(lastIndex);
    setDisplayServiceIndex(lastIndex);
    
    // Set the flag to lock at last service
    isAtLastService.current = true;
    
    // Scroll to the exact position for the last service
    if (pinningTriggerRef.current) {
      const trigger = pinningTriggerRef.current;
      
      // Go directly to the snap point for the last service plus buffer
      const scrollPos = trigger.start + ((trigger.end - trigger.start) * 0.95);
      
      console.log(`Going directly to last service at position ${scrollPos}`);
      
      gsap.to(window, {
        scrollTo: { y: scrollPos, autoKill: true },
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          // Force the last service again after scrolling completes
          setTargetServiceIndex(lastIndex);
          isAtLastService.current = true;
          ScrollTrigger.refresh();
        }
      });
    }
  }, [servicesData.length]);
  
  // Standard click handler for service links
  const handleServiceLinkClick = useCallback((clickedIndex: number) => {
    console.log(`Click service ${clickedIndex}, current display: ${displayServiceIndex}, animating: ${isCardAnimating}`);
    
    // Don't do anything if already on this service and not animating
    if (displayServiceIndex === clickedIndex && !isCardAnimating) return;
    
    // Special cases for first and last service
    if (clickedIndex === 0) {
      goToFirstService();
      return;
    } else if (clickedIndex === servicesData.length - 1) {
      goToLastService();
      return;
    }
    
    // Reset the last service flag for non-last services
    isAtLastService.current = false;
    
    // Set target index immediately 
    setTargetServiceIndex(clickedIndex);
    setIsCardAnimating(true);
    
    // For middle services, calculate position normally
    const trigger = pinningTriggerRef.current;
    if (!trigger) return;
    
    // Calculate position
    const progress = clickedIndex / (servicesData.length - 1);
    const scrollPos = trigger.start + (progress * (trigger.end - trigger.start));
    console.log(`Going to service ${clickedIndex} at position: ${scrollPos} (progress: ${progress.toFixed(2)})`);
    
    // Perform the scroll
    gsap.to(window, {
      scrollTo: { y: scrollPos, autoKill: true },
      duration: 0.75,
      ease: "power2.inOut",
      onComplete: () => {
        // Force the target index to ensure correct state
        setTargetServiceIndex(clickedIndex);
        ScrollTrigger.refresh();
      }
    });
  }, [displayServiceIndex, isCardAnimating, servicesData.length, goToFirstService, goToLastService]);

  return (
    <section ref={sectionRef} className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* This div will be the one that scrolls internally if content is too long for a pinned section of fixed height */}
      {/* Or, if sectionRef itself is pinned, then its direct children form the layout */}
      <div ref={contentWrapperRef} className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 h-full flex flex-col">
        
        <div className="mb-12 md:mb-16 flex justify-between items-center">
          <h2 className="text-blue-600 text-lg sm:text-xl font-semibold">Popular Services & Solutions</h2>
          <div className="flex gap-2">
            <button 
              onClick={goToFirstService} 
              className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm"
            >
              First Service
            </button>
            <button 
              onClick={goToLastService} 
              className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm"
            >
              Last Service
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[0.75fr_auto_1fr_auto_1.25fr] gap-x-6 lg:gap-x-8 flex-grow items-start relative">
          {/* Left Column: Service Links */}
          <div ref={serviceLinksColumnRef} className="pt-2 md:pt-0 space-y-1">
            {servicesData.map((service, index) => (
              <div 
                key={service.id}
                onClick={() => handleServiceLinkClick(index)}
                className={cn(
                  "py-2 md:py-3 transition-all duration-300 ease-in-out transform cursor-pointer",
                  targetServiceIndex === index ? "scale-105 opacity-100" : "opacity-50 hover:opacity-75"
                )}
              >
                <div className="flex items-start">
                  <span className={cn(
                    "text-xs font-bold w-6 text-right mr-3 mt-[0.3rem] sm:mt-[0.4rem] md:mt-[0.5rem]",
                     targetServiceIndex === index ? "text-blue-500" : "text-gray-400"
                  )}>
                    {service.number}
                  </span>
                  <h3 className={cn(
                    "text-xl sm:text-2xl md:text-[28px] lg:text-[32px] font-medium leading-tight",
                    targetServiceIndex === index ? "text-black" : "text-gray-500"
                  )}>
                    {service.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Vertical Separator 1 */}
          <div className="hidden md:block w-px bg-gray-200 h-full self-stretch"></div>

          {/* Center Column: Lottie Animation */}
          <div ref={lottieColumnRef} className="hidden md:flex items-center justify-center md:sticky md:top-28 lg:top-32 self-start py-10">
            <div className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[280px] lg:max-w-[320px] aspect-square">
              <AnimatePresence mode="wait">
                {animationData && servicesData[displayServiceIndex] && (
                  <motion.div
                    key={servicesData[displayServiceIndex].id + "-lottie"} // Unique key for AnimatePresence
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3, ease: "easeIn" } }}
                    className="w-full h-full"
                  >
                    <DynamicLottie
                      lottieRef={lottieRef as React.RefObject<LottieRefCurrentProps>}
                      animationData={animationData}
                      className="w-full h-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Vertical Separator 2 */}
          <div className="hidden md:block w-px bg-gray-200 h-full self-stretch"></div>

          {/* Right Column: Service Content */}
          <div ref={serviceContentColumnRef} className="relative min-h-[320px] sm:min-h-[350px] md:min-h-0 flex items-center">
            <AnimatePresence mode="wait">
              {servicesData.map((service, index) => 
                index === displayServiceIndex && (
                  <motion.div
                    key={service.id} 
                    initial={{ opacity: 0, y: 75 }} // Enter from bottom
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -75 }} // Exit to top
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="w-full flex flex-col px-2 sm:px-0 md:px-4 lg:px-6" // Added padding here
                    onAnimationStart={handleCardAnimationStart}
                    onAnimationComplete={handleCardAnimationComplete} // Hook to unlock next animation
                  >
                    <Image 
                        src={service.mobileImage} 
                        alt={`${service.title} mobile icon`} 
                        width={60} // Smaller for mobile, consistent with general icon sizes
                        height={60} 
                        className="md:hidden mb-5 mx-auto rounded-md" 
                    />
                    <h3 className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[44px] font-bold text-black mb-3 sm:mb-4 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-blue-500 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8">
                      {service.description}
                    </p>
                    <Button 
                      className="mt-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg text-sm sm:text-base w-full sm:w-auto self-start transform transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-opacity-75"
                      onClick={() => window.open(service.buttonUrl, "_blank")}
                    >
                      {service.buttonText}
                    </Button>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
