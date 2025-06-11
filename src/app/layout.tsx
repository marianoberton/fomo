import "./globals.css";
import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import ClientLayout from "@/components/client-layout";
import Script from "next/script";

// Font definitions - Geométricas y frescas
const manrope = Manrope({ 
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap"
});

export const metadata: Metadata = {
  title: "FOMO - IA y Datos que disparan tu PyME",
  description: "Consultora FOMO: estrategia, implementación y optimización continua para crecer sin depender de la intuición.",
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
      <body className={`${manrope.variable} ${spaceGrotesk.variable} font-body bg-background selection:bg-accent selection:text-accent-foreground`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
