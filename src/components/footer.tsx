import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold font-heading mb-4">FOMO</h3>
            <p className="text-white/80 max-w-xs">
              Transformamos tu negocio con tecnología a medida. Desarrollo web, 
              automatizaciones, IA y más para pymes argentinas.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="#about" 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link 
                  href="#services" 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link 
                  href="#portfolio" 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Proyectos
                </Link>
              </li>
              <li>
                <Link 
                  href="#blog" 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/terminos" 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacidad" 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link 
                  href="#contact" 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p>© 2025 FOMO. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}