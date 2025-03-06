"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "5 formas de usar IA para vender más en tu pyme",
    excerpt: "Descubrí cómo la inteligencia artificial puede ayudarte a aumentar tus ventas y mejorar la experiencia de tus clientes sin necesidad de grandes inversiones.",
    image: "/blog/ia-ventas.jpg",
    date: "15 Mar 2024",
    readTime: "5 min",
    slug: "ia-ventas-pyme"
  },
  {
    title: "Cómo integrar Mercado Pago en tu sitio en 3 pasos",
    excerpt: "Una guía práctica para implementar pagos online en tu negocio de forma rápida y segura, aumentando tus conversiones desde el primer día.",
    image: "/blog/mercadopago-integracion.jpg",
    date: "10 Mar 2024",
    readTime: "7 min",
    slug: "integracion-mercadopago"
  },
  {
    title: "Automatizaciones que todo negocio argentino necesita",
    excerpt: "Las mejores herramientas y tips para automatizar tareas repetitivas y enfocarte en hacer crecer tu negocio.",
    image: "/blog/automatizaciones.jpg",
    date: "5 Mar 2024",
    readTime: "6 min",
    slug: "automatizaciones-negocio"
  }
];

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (section && cards) {
      gsap.fromTo(
        section.querySelector('.section-header'),
        { 
          opacity: 0, 
          y: -30 
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top center+=100"
          }
        }
      );

      cards.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { 
              opacity: 0, 
              y: 50 
            },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8,
              delay: index * 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top bottom-=100"
              }
            }
          );
        }
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white" id="blog">
      <div className="container">
        <div className="section-header text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-neutral mb-4">
            Blog
          </h2>
          <p className="text-lg text-neutral/80">
            Enterate de las últimas tendencias en tecnología y negocios, 
            con consejos prácticos para tu pyme.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={post.slug}
              ref={(el: HTMLDivElement | null) => {
                cardsRef.current[index] = el;
              }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 text-sm text-neutral/60">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime} lectura</span>
                </div>
                <h3 className="text-xl font-bold text-primary hover:text-primary/80 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-neutral/80">
                  {post.excerpt}
                </p>
                <div className="pt-4">
                  <Link href={`/blog/${post.slug}`}>
                    <Button 
                      variant="ghost" 
                      className="p-0 hover:bg-transparent hover:text-primary"
                    >
                      Leer más →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}