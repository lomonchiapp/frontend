import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Helmet>
        <title>Política de Privacidad - Oriental Ramirez</title>
        <meta name="description" content="Política de privacidad y protección de datos de Oriental Ramirez" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Política de Privacidad
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-DO')}
              </p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Información que Recopilamos
                </h2>
                <p className="text-gray-700 mb-4">
                  En Oriental Ramirez, recopilamos información personal que usted nos proporciona directamente, como:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Nombre completo y apellidos</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Número de teléfono</li>
                  <li>Dirección física</li>
                  <li>Información financiera para solicitudes de crédito</li>
                  <li>Documentos de identificación</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Cómo Utilizamos su Información
                </h2>
                <p className="text-gray-700 mb-4">
                  Utilizamos la información recopilada para:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Procesar solicitudes de financiamiento</li>
                  <li>Evaluar la elegibilidad crediticia</li>
                  <li>Comunicarnos con usted sobre nuestros servicios</li>
                  <li>Cumplir con obligaciones legales y regulatorias</li>
                  <li>Mejorar nuestros servicios y experiencia del cliente</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Protección de la Información
                </h2>
                <p className="text-gray-700 mb-4">
                  Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Compartir Información
                </h2>
                <p className="text-gray-700 mb-4">
                  No vendemos, alquilamos ni compartimos su información personal con terceros, excepto:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Con su consentimiento explícito</li>
                  <li>Para cumplir con obligaciones legales</li>
                  <li>Con proveedores de servicios que nos ayudan a operar nuestro negocio</li>
                  <li>Para proteger nuestros derechos y seguridad</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Sus Derechos
                </h2>
                <p className="text-gray-700 mb-4">
                  Usted tiene derecho a:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Acceder a su información personal</li>
                  <li>Corregir información inexacta</li>
                  <li>Solicitar la eliminación de su información</li>
                  <li>Retirar su consentimiento en cualquier momento</li>
                  <li>Presentar una queja ante las autoridades competentes</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Contacto
                </h2>
                <p className="text-gray-700 mb-4">
                  Si tiene preguntas sobre esta política de privacidad o desea ejercer sus derechos, contáctenos en:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Email:</strong> ventas@orientalramirez.com<br />
                    <strong>Teléfono:</strong> (809) 246-6630<br />
                    <strong>Dirección:</strong> Av. 27 de Febrero #123, Santo Domingo, República Dominicana
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
