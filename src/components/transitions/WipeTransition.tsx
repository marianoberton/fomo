"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import lottie from 'lottie-web';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

interface WipeTransitionProps {
  heroTriggerSelector?: string; // Selector CSS for the Hero section (e.g., "#fomoHero" or ".fomo-hero-section")
  nextSectionSelector?: string; // Selector for the section to reveal (optional, for potential future logic)
}

const WipeTransition: React.FC<WipeTransitionProps> = ({ 
  heroTriggerSelector = "section:first-of-type", // Default to the first section if no selector provided
  nextSectionSelector
}) => {
  const wipeLayerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lottieContainerRef = useRef<HTMLDivElement>(null); // Hidden container for Lottie
  const animationInstance = useRef<any>(null); // To store Lottie instance
  const tl = useRef<gsap.core.Timeline | null>(null); // To store GSAP timeline

  useEffect(() => {
    // Load Lottie Animation
    if (lottieContainerRef.current && !animationInstance.current) {
      animationInstance.current = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '/mask_reveal_lottie.json', // Path relative to public folder
      });
      // Optional: Listen for Lottie data ready if needed later
      // animationInstance.current.addEventListener('data_ready', () => { ... });
    }

    // --- GSAP ScrollTrigger Setup ---
    const triggerElement = document.querySelector(heroTriggerSelector);
    if (!triggerElement) {
      console.warn(`WipeTransition: Trigger element "${heroTriggerSelector}" not found.`);
      return;
    }

    const st = ScrollTrigger.create({
      trigger: triggerElement,
      start: "bottom 80%", // Start when 80% of the hero is scrolled past
      // end: "bottom top", // Not needed for 'once'
      // markers: true, // Uncomment for debugging ScrollTrigger position
      once: true, // Only trigger once when scrolling down
      onEnter: () => {
        console.log("ScrollTrigger entered, starting wipe animation...");
        // Ensure wipe layer is reset before starting
        gsap.set(wipeLayerRef.current, { 
          opacity: 0, 
          clipPath: 'circle(0% at 50% 50%)',
          // Ensure it's ready to be shown
          display: 'block', 
        });
        gsap.set(textRef.current, { opacity: 0, scale: 0.8, display: 'block' });

        // Prevent re-triggering if already running
        if (tl.current && tl.current.isActive()) {
            return;
        }

        // Create and play the timeline
        tl.current = gsap.timeline({
          // Optional: Add a small delay after trigger if needed
          // delay: 0.2,
          onStart: () => {
            // You *could* try to play a segment of the lottie here if needed visually
            // animationInstance.current?.playSegments([60, 180], true);
          },
          onComplete: () => {
            console.log("Wipe animation complete.");
            // Hide the wipe layer after completion
            gsap.set(wipeLayerRef.current, { opacity: 0, display: 'none' });
            gsap.set(textRef.current, { display: 'none' });
            tl.current = null; // Clear the timeline reference
          }
        })
        // 1. Show and expand the blue wipe layer
        .to(wipeLayerRef.current, {
          opacity: 1,
          clipPath: 'circle(150% at 50% 50%)', // Expand to cover diagonals
          duration: 1.2, // Total duration of the wipe expansion
          ease: "power2.inOut",
        }, 0) // Start at time 0
        
        // 2. Fade in the transition text shortly after wipe starts
        .to(textRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        }, 0.3) // Start 0.3s after timeline starts

        // 3. Fade out the transition text before wipe finishes
        .to(textRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.4,
          ease: "power2.in"
        }, 1.2 - 0.5); // Start 0.4s before the wipe (duration 1.2s) ends
      },
    });

    // Cleanup function
    return () => {
      st.kill(); // Kill ScrollTrigger instance
      if (tl.current) {
        tl.current.kill(); // Kill GSAP timeline if active
        tl.current = null;
      }
      animationInstance.current?.destroy(); // Destroy Lottie instance
      animationInstance.current = null;
    };

  }, [heroTriggerSelector]); // Rerun effect if trigger changes

  return (
    <>
      {/* Hidden container FOR LOTTIE CONTROL ONLY */}
      <div ref={lottieContainerRef} style={{ width: 0, height: 0, overflow: 'hidden', position: 'absolute' }}></div>
      
      {/* Wipe Layer - Ensure primary color variable is available */}
      <div
        ref={wipeLayerRef}
        id="fomoBlueWipeLayer"
        style={{ backgroundColor: 'hsl(var(--primary))' }} // Using CSS variable assuming it's defined
        className="fixed inset-0 w-full h-full z-40 pointer-events-none opacity-0 hidden" // z-40: below header(z-50), above hero content
      ></div>

      {/* Transition Text - Adjust font/size/color as needed */}
      <div
        ref={textRef}
        id="fomoTransitionText"
        // Example styling - adjust font, size, color as needed
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-41 pointer-events-none opacity-0 hidden font-concert text-white text-center text-3xl md:text-5xl lg:text-6xl p-4 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]"
      >
        IA: ¡NO TE QUEDES AFUERA!
      </div>
    </>
  );
};

export default WipeTransition; 