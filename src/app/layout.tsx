import "./globals.css";
import type { Metadata } from "next";
import { Quicksand, Poppins, Fredoka } from "next/font/google";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Script from "next/script";

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
      <head>
        <meta name="facebook-domain-verification" content="3dyqkms7knx3xv282a8j1db5capb0o" />
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '601988599528373');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=601988599528373&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`${quicksand.variable} ${poppins.variable} ${fredoka.variable} font-body bg-background selection:bg-accent selection:text-accent-foreground`}>
        <Navigation />
        <main>{children}</main>
       
      </body>
    </html>
  );
}
