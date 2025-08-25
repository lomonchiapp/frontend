import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'

export default function Warranty() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Helmet>
        <title>Política de Garantía - Oriental Ramirez</title>
        <meta name="description" content="Política de garantía para motocicletas y vehículos de Oriental Ramirez" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Política de Garantía
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-DO')}
              </p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Cobertura de Garantía
                </h2>
                <p className="text-gray-700 mb-4">
                  Oriental Ramirez ofrece garantía integral para todos los vehículos y motocicletas que vendemos, asegurando la calidad y confiabilidad de nuestros productos.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Período de Garantía
                </h2>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                  <p className="text-blue-800">
                    <strong>Garantía del Fabricante:</strong> Según especificaciones del fabricante (generalmente 1-3 años)<br />
                    <strong>Garantía de Oriental Ramirez:</strong> 6 meses adicionales en componentes críticos
                  </p>
                </div>
                <p className="text-gray-700 mb-4">
                  La garantía comienza desde la fecha de entrega del vehículo y cubre defectos de fabricación y materiales.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Componentes Cubiertos
                </h2>
                <p className="text-gray-700 mb-4">
                  Nuestra garantía cubre los siguientes componentes:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Motor:</strong> Bloque, pistones, cigüeñal, válvulas</li>
                  <li><strong>Transmisión:</strong> Caja de cambios, embrague, cadena</li>
                  <li><strong>Sistema Eléctrico:</strong> Batería, alternador, sistema de encendido</li>
                  <li><strong>Suspensión:</strong> Amortiguadores, resortes, brazos</li>
                  <li><strong>Frenos:</strong> Pastillas, discos, líneas hidráulicas</li>
                  <li><strong>Carrocería:</strong> Estructura principal, pintura original</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Componentes No Cubiertos
                </h2>
                <p className="text-gray-700 mb-4">
                  Los siguientes elementos no están cubiertos por la garantía:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Consumibles (aceite, filtros, neumáticos)</li>
                  <li>Desgaste normal por uso</li>
                  <li>Daños por accidente o mal uso</li>
                  <li>Modificaciones no autorizadas</li>
                  <li>Mantenimiento no realizado según especificaciones</li>
                  <li>Daños por condiciones climáticas extremas</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Condiciones de la Garantía
                </h2>
                <p className="text-gray-700 mb-4">
                  Para que la garantía sea válida, el cliente debe cumplir con:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Realizar mantenimiento preventivo según el calendario recomendado</li>
                  <li>Usar repuestos originales o de calidad equivalente</li>
                  <li>Conducir el vehículo de manera responsable</li>
                  <li>Mantener registros de mantenimiento</li>
                  <li>Notificar problemas dentro del período de garantía</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Proceso de Reclamación
                </h2>
                <p className="text-gray-700 mb-4">
                  Para hacer efectiva la garantía, siga estos pasos:
                </p>
                <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                  <li>Contacte a nuestro servicio técnico</li>
                  <li>Describa el problema detalladamente</li>
                  <li>Programe una cita para inspección</li>
                  <li>Presente documentación de mantenimiento</li>
                  <li>Reciba diagnóstico y solución</li>
                </ol>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Servicios de Garantía
                </h2>
                <p className="text-gray-700 mb-4">
                  Durante el período de garantía, ofrecemos:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Reparación gratuita de defectos cubiertos</li>
                  <li>Reemplazo de piezas defectuosas</li>
                  <li>Servicio técnico especializado</li>
                  <li>Vehículo de reemplazo temporal (cuando aplique)</li>
                  <li>Seguimiento del proceso de reparación</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Garantía Extendida
                </h2>
                <p className="text-gray-700 mb-4">
                  Ofrecemos opciones de garantía extendida para mayor protección:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Plan Básico</h4>
                    <p className="text-green-700 text-sm">+12 meses adicionales en componentes principales</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Plan Premium</h4>
                    <p className="text-blue-700 text-sm">+24 meses con cobertura completa</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Excepciones
                </h2>
                <p className="text-gray-700 mb-4">
                  La garantía no aplica en los siguientes casos:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Vehículos utilizados para competencia o deportes extremos</li>
                  <li>Daños por negligencia o abuso</li>
                  <li>Reparaciones realizadas por talleres no autorizados</li>
                  <li>Uso comercial intensivo no autorizado</li>
                  <li>Incumplimiento de las condiciones de uso</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Contacto para Garantías
                </h2>
                <p className="text-gray-700 mb-4">
                  Para consultas sobre garantías, contáctenos en:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Servicio Técnico:</strong> (809) 246-6630<br />
                    <strong>Email Garantías:</strong> ventas@orientalramirez.com<br />
                    <strong>Horario:</strong> Lunes a Viernes 8:00 AM - 6:00 PM<br />
                    <strong>Emergencias:</strong> (809) 246-6630
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
