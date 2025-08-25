import { Helmet } from 'react-helmet-async'
import { AboutContent } from '@/components/AboutUs/AboutContent'
import { useEffect } from 'react'

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Helmet>
        <title>Sobre Nosotros - Oriental Ramirez</title>
        <meta name="description" content="Conoce más sobre Oriental Ramirez, líder en financiamiento de motocicletas en República Dominicana" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Sobre Oriental Ramirez
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Más de 30 años siendo líderes en la venta de motocicletas y vehículos en República Dominicana
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <AboutContent />
          </div>

          {/* Additional Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Misión y Visión */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Nuestra Misión</h2>
              <p className="text-gray-700 mb-6">
                Facilitar el acceso a la movilidad personal y comercial a través de soluciones financieras accesibles, 
                contribuyendo al desarrollo económico de las comunidades dominicanas.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Nuestra Visión</h3>
              <p className="text-gray-700">
                Ser la empresa líder en financiamiento de motocicletas en República Dominicana, 
                reconocida por nuestra confiabilidad, innovación y compromiso con el éxito de nuestros clientes.
              </p>
            </div>

            {/* Valores */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Nuestros Valores</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Confianza</h4>
                    <p className="text-gray-600 text-sm">Construimos relaciones duraderas basadas en la transparencia y honestidad</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Excelencia</h4>
                    <p className="text-gray-600 text-sm">Nos esforzamos por ofrecer el mejor servicio y productos de calidad</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Compromiso</h4>
                    <p className="text-gray-600 text-sm">Estamos dedicados al éxito y bienestar de nuestros clientes</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Innovación</h4>
                    <p className="text-gray-600 text-sm">Buscamos constantemente mejorar nuestros servicios y procesos</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Ubicaciones */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Nuestras Ubicaciones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">La Altagracia</h3>
                <p className="text-gray-600 text-sm">Sucursal principal con servicio completo</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Boca Chica</h3>
                <p className="text-gray-600 text-sm">Atención personalizada en la costa</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Bonao</h3>
                <p className="text-gray-600 text-sm">Servicio en el corazón del país</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">San Pedro de Macorís</h3>
                <p className="text-gray-600 text-sm">Atención en la región este</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Santo Domingo</h3>
                <p className="text-gray-600 text-sm">Sucursal en la capital</p>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-sm p-8 text-white mb-8">
            <h2 className="text-2xl font-semibold mb-8 text-center">Nuestros Números</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">30+</div>
                <div className="text-blue-100">Años de Experiencia</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">5</div>
                <div className="text-blue-100">Sucursales</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div className="text-blue-100">Clientes Satisfechos</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Soporte</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              ¿Listo para comenzar tu proyecto?
            </h2>
            <p className="text-gray-600 mb-6">
              Nuestro equipo está listo para ayudarte a encontrar la solución financiera perfecta
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Solicitar Financiamiento
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                Contactar Asesor
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
