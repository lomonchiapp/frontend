import { Link, useLocation } from 'react-router-dom'
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
  const location = useLocation()
  
  if (location.pathname === '/catalogo') {
    return null
  }

  return (
    <footer className="bg-[#38367D] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src="/logo.png" alt="Oriental Ramirez" className="h-16 w-auto" />
            <p className="text-sm text-gray-300">
              Más de 30 años siendo líderes en la venta de motocicletas y vehículos en República Dominicana.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" 
                className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer"
                className="hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalogo" className="text-gray-300 hover:text-white transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/sucursales" className="text-gray-300 hover:text-white transition-colors">
                  Sucursales
                </Link>
              </li>
              <li>
                <Link to="/financiamiento" className="text-gray-300 hover:text-white transition-colors">
                  Financiamiento
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-gray-300 hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacidad" className="text-gray-300 hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="text-gray-300 hover:text-white transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/garantia" className="text-gray-300 hover:text-white transition-colors">
                  Política de Garantía
                </Link>
              </li>
              <li>
                <Link to="/devoluciones" className="text-gray-300 hover:text-white transition-colors">
                  Política de Devoluciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-300 mt-0.5" />
                <span className="text-gray-300">
                  Av. 27 de Febrero #123, Santo Domingo, República Dominicana
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-300" />
                <span className="text-gray-300">(809) 555-0123</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-300" />
                <span className="text-gray-300">info@orientalramirez.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-300">
              © {new Date().getFullYear()} Oriental Ramirez. Todos los derechos reservados.
            </div>
            <div className="text-sm text-gray-300">
              <span>Desarrollado por </span>
              <a
                href="https://ixiapps.com"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-white"
              >
                ixiApps
              </a>
            </div>
            <div className="text-xs text-gray-400">
              Algunas imágenes pueden ser ejemplos. Consulte con su vendedor asignado.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

