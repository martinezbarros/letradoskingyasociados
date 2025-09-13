// pages/index.tsx
import Link from 'next/link';
import * as motion  from 'motion/react-client';
import AnimatedButton from './ui/motion/AnimatedButton';
import { getSiteInfo } from './lib/wordpress';
import { Metadata } from 'next';

const siteInfo = await getSiteInfo();
export const metadata: Metadata = {
  title: `Inicio - ${siteInfo.name}`,
  description: 'Letrados King y Asociados: Bufete especializado en derecho administrativo, constitucional y derechos humanos. Defensa jurídica de alto nivel con compromiso social.',
  keywords: ["letrados king", "derecho administrativo", "derecho constitucional", "derechos humanos", "defensa legal", "compromiso social"]
};

const Home: React.FC = () => {
  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          default: { ease: 'linear' },
          layout: { duration: 0.3 },
        }}
      >
        {/* Hero */}
        <section className="py-24 bg-[#16224F] text-white text-center relative">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase">
              Letrados King y Asociados
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-[#BE9A42]">
              Asesoría legal y fiduciaria con alcance internacional.  
              Expertos en derecho corporativo, estructuras fiscales y protección de activos.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <AnimatedButton>
                <Link
                  href="/servicios"
                  className="bg-[#BE9A42] text-[#16224F] font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-[#16224F] transition-colors"
                >
                  Nuestros Servicios
                </Link>
              </AnimatedButton>
              <AnimatedButton>
                <Link
                  href="/contacto"
                  className="bg-white text-[#16224F] font-semibold px-6 py-3 rounded-lg hover:bg-[#BE9A42] hover:text-[#16224F] transition-colors"
                >
                  Agende una Consulta
                </Link>
              </AnimatedButton>
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Nuestros Servicios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg text-center shadow-md border-t-4 border-[#BE9A42]">
                <h3 className="text-xl font-semibold mb-2 text-[#16224F]">
                  Derecho Corporativo
                </h3>
                <p className="text-gray-600">
                  Constitución de sociedades, fusiones, adquisiciones y cumplimiento normativo en distintas jurisdicciones.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg text-center shadow-md border-t-4 border-[#BE9A42]">
                <h3 className="text-xl font-semibold mb-2 text-[#16224F]">
                  Servicios Fiduciarios
                </h3>
                <p className="text-gray-600">
                  Administración fiduciaria, fundaciones de interés privado y planificación patrimonial estratégica.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg text-center shadow-md border-t-4 border-[#BE9A42]">
                <h3 className="text-xl font-semibold mb-2 text-[#16224F]">
                  Asesoría Internacional
                </h3>
                <p className="text-gray-600">
                  Consultoría fiscal internacional, estructuras legales globales y asesoría para inversiones transfronterizas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ventajas */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              ¿Por qué elegirnos?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2 text-[#BE9A42]">
                  Prestigio y Experiencia
                </h3>
                <p className="text-gray-600">
                  Décadas de trayectoria en derecho empresarial y fiduciario con clientes en múltiples países.
                </p>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2 text-[#BE9A42]">
                  Enfoque Personalizado
                </h3>
                <p className="text-gray-600">
                  Cada cliente recibe soluciones legales y fiscales adaptadas a su realidad y objetivos.
                </p>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2 text-[#BE9A42]">
                  Red Internacional
                </h3>
                <p className="text-gray-600">
                  Colaboraciones estratégicas con firmas internacionales que garantizan cobertura global.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-[#16224F] text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Proteja su patrimonio con expertos legales
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-[#BE9A42]">
              En Letrados King y Asociados encontrará un aliado confiable para la gestión de sus asuntos legales y financieros.
            </p>
            <AnimatedButton>
              <Link
                href="/contacto"
                className="inline-block bg-[#BE9A42] text-[#16224F] font-semibold px-8 py-3 rounded-lg hover:bg-white transition-colors"
              >
                Solicitar Asesoría
              </Link>
            </AnimatedButton>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Home;
