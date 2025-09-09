// app/layout.tsx
import './globals.css'; // Ajustado para la ubicación real en Next.js
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../context/ThemeContext';
import Header from './ui/components/Header';
import Navigation from './ui/components/Navigation';
import Footer from './ui/components/Footer';
import ThemeSelector from './ui/components/ThemeSelector';
import WhatsAppButton from './ui/components/WhatsappButton';
import { CursorContextProvider } from './ui/motion/CustomCursorContext';
import CustomCursor from './ui/motion/CustomCursor';
import { getSiteInfo } from './lib/wordpress';


const inter = Inter({ subsets: ['latin'] });
const siteInfo = await getSiteInfo();

export const metadata = {
  title: `Abogados Asociados Martínez Barros | ${siteInfo?.name || ''}`,
  description:
    'Firma especializada en derecho comercial, servicios fiduciarios, asesoría de inversiones y estructuras internacionales. Expertos en Empresas Offshore en Panamá y otros territorios, Fundaciones de Interés Privado y Fideicomisos para protección de patrimonio.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <CursorContextProvider>
            <CustomCursor />
            <div className="min-h-screen flex flex-col">
              <Header />
              <div className="container mx-auto px-4">
                <ThemeSelector />
              </div>
              <div className="relative z-50 md:mb-8">
                <Navigation />
              </div>
              <main className="flex-grow">
                <WhatsAppButton phone="50766429696" />
                {children}
              </main>
              <Footer />
            </div>
          </CursorContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
