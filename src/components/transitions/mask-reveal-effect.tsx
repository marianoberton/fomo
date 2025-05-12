"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lottie from "lottie-react"
// Removed direct import of JSON

interface MaskRevealEffectProps {
  children: React.ReactNode
  triggerSelector: string
}

export default function MaskRevealEffect({ children, triggerSelector }: MaskRevealEffectProps) {
  const lottieRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const childWrapperRef = useRef<HTMLDivElement>(null)
  const [animationData, setAnimationData] = useState<any | null>(null); // Changed type to any

  useEffect(() => {
    // Fetch Lottie animation data
    fetch("/mask_reveal_lottie.json") // Path relative to public folder
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error fetching Lottie animation:", error));
  }, []);

  useEffect(() => {
    if (!animationData) return; // Don't run GSAP setup until Lottie data is loaded

    gsap.registerPlugin(ScrollTrigger)

    const triggerElement = document.querySelector(triggerSelector) as HTMLElement | null

    if (lottieRef.current && triggerElement && childWrapperRef.current) {
      lottieRef.current.goToAndStop(0, true)

      const viewportHeight = window.innerHeight

      const st = ScrollTrigger.create({
        trigger: triggerElement,
        start: "bottom bottom",
        end: `+=${viewportHeight}`,
        scrub: 1,
        markers: process.env.NODE_ENV === "development",
        onUpdate: (self) => {
          const totalFrames = animationData.op; // Use total frames from the fetched Lottie data
          const frame = Math.floor(self.progress * totalFrames)
          if (lottieRef.current) {
            lottieRef.current.goToAndStop(frame, true)
          }
        },
      })

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [triggerSelector, animationData]) // Add animationData to dependencies

  if (!animationData) {
    return <div>Loading animation...</div>; // Or some other loading state
  }

  return (
    <div ref={containerRef} className="relative w-full h-auto">
      <div className="absolute inset-0 z-20 pointer-events-none">
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData} // Use state for animation data
          className="w-full h-full object-cover"
          autoplay={false}
          loop={false}
        />
      </div>
      <div
        ref={childWrapperRef}
        className="relative z-10 w-full h-full"
      >
        {children}
      </div>
    </div>
  )
} 