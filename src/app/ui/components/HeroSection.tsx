

export default function HeroSection({pageTitle} : {pageTitle: string}) {
    return(
        <section
            className="relative h-[60vh] flex items-center justify-center text-center text-white"
            style={{ backgroundImage: "url('https://bakerandalvarez.site/letradoskingyasociados/wp-content/uploads/sites/5/2025/09/panama-cinta-scaled.jpg')", backgroundPosition:"center center", backgroundSize:"cover" }} // coloca tu imagen en /public
        >
            {/* Overlay con opacidad */}
            <div className="absolute inset-0 bg-black/80" />

            {/* Contenido */}
            <div className="relative z-10 max-w-3xl px-6">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
                {pageTitle}
            </h1>
            <p className="text-lg md:text-xl font-sans mb-6">
                Especialistas en Sociedades Offshore y Protección de Activos
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                href="/servicios"
                className="bg-white text-primary-700 font-semibold px-6 py-3 rounded-lg hover:bg-primary-100 transition-colors"
                >
                Nuestros Servicios
                </a>
                <a
                href="/contacto"
                className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-primary-700 transition-colors"
                >
                Consultoría Gratuita
                </a>
            </div> */}
            </div>
        </section>
    )
}
