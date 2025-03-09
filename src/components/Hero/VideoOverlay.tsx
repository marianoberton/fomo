// src/components/Hero/VideoOverlay.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VideoOverlay() {
  const sectionRef = useRef<HTMLDivElement>(null);       // Contenedor padre
  const videoContainerRef = useRef<HTMLDivElement>(null); // El círculo
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "+=100%",
        scrub: 1,
      },
    });

    // Animación del círculo manteniendo centrado perfecto
    tl.fromTo(
      videoContainerRef.current,
      {
        borderRadius: "50%",
        width: "500px",
        height: "500px",
        overflow: "hidden",
        top: "-25vh",
        left: "50%",
        transform: "translateX(-50%)",
      },
      {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        top: 0,
        left: "50%", // Mantenemos el left al 50%
        transform: "translateX(-50%)", // Mantenemos el transform hasta el final
        ease: "power2.inOut",
      },
      0
    )
    .to(
      videoContainerRef.current,
      {
        left: 0,
        transform: "none",
      },
      ">-0.1" // Solo al final removemos el centrado
    );
    
    // Sutil zoom del video para dar sensación de profundidad
    tl.fromTo(
      videoRef.current,
      {
        scale: 1,
        objectPosition: "center 30%",
      },
      {
        scale: 1.1,
        objectPosition: "center center",
        ease: "none",
      },
      0
    );

    return () => {
      // Limpieza: matamos todos los triggers al desmontar
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      className="relative w-full"
      ref={sectionRef}
      style={{
        height: "100vh", // Altura fija para el contenedor
        zIndex: 10,
      }}
    >
      {/* Círculo con el video, posicionado dentro del wrapper */}
      <div
        ref={videoContainerRef}
        style={{
          position: "absolute",
          bottom: "auto",
          top: "-10vh", // Ajustado para comenzar más arriba y solaparse con el Hero
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 11,
          borderRadius: "50%",
          width: "200px",
          height: "200px",
          overflow: "hidden",
          boxShadow: "0 0 20px rgba(0, 100, 255, 0.5)",
          pointerEvents: "auto",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            transformOrigin: "center center",
          }}
        >
          <source src="/videos/video.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento video.
        </video>
      </div>
    </section>
  );
}
