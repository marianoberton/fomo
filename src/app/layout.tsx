import "./globals.css";
import type { Metadata } from "next";
import { Quicksand, Poppins, Fredoka } from "next/font/google";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

// Font definitions - Más redondeadas y cálidas
const quicksand = Quicksand({ 
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap"
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap"
});

export const metadata: Metadata = {
  title: "FOMO - Diseño Digital para Pymes",
  description: "Transformamos tu negocio con soluciones digitales a medida. Desarrollo, automatizaciones, IA y diseño para pymes innovadoras.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${quicksand.variable} ${poppins.variable} ${fredoka.variable} font-body bg-background selection:bg-accent selection:text-accent-foreground`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
