import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: '900',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FOMO - Próximamente',
  description: 'Agencia de tecnología para pymes argentinas',
};

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body className={poppins.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}