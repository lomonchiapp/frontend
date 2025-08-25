import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Helmet>
        <title>Términos y Condiciones - Oriental Ramirez</title>
        <meta name="description" content="Términos y condiciones de uso de los servicios de Oriental Ramirez" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Términos y Condiciones
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-DO')}
              </p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Aceptación de los Términos
                </h2>
                <p className="text-gray-700 mb-4">
                  Al acceder y utilizar los servicios de Oriental Ramirez, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Descripción de los Servicios
                </h2>
                <p className="text-gray-700 mb-4">
                  Oriental Ramirez ofrece servicios de financiamiento para la adquisición de motocicletas y vehículos, incluyendo:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Evaluación crediticia</li>
                  <li>Financiamiento personalizado</li>
                  <li>Asesoría financiera</li>
                  <li>Gestión de documentos</li>
                  <li>Seguimiento de pagos</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Requisitos de Elegibilidad
                </h2>
                <p className="text-gray-700 mb-4">
                  Para ser elegible para nuestros servicios de financiamiento, debe cumplir con los siguientes requisitos:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Ser mayor de edad (18 años o más)</li>
                  <li>Ser residente legal de la República Dominicana</li>
                  <li>Tener un ingreso estable y comprobable</li>
                  <li>No tener antecedentes crediticios negativos</li>
                  <li>Proporcionar documentación completa y válida</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Proceso de Solicitud
                </h2>
                <p className="text-gray-700 mb-4">
                  El proceso de solicitud incluye los siguientes pasos:
                </p>
                <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                  <li>Completar el formulario de solicitud</li>
                  <li>Proporcionar documentación requerida</li>
                  <li>Evaluación crediticia y financiera</li>
                  <li>Aprobación o rechazo de la solicitud</li>
                  <li>Firma de contratos y desembolso</li>
                </ol>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Condiciones de Pago
                </h2>
                <p className="text-gray-700 mb-4">
                  Los pagos deben realizarse según el cronograma establecido en su contrato. Las condiciones incluyen:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Fechas de vencimiento específicas</li>
                  <li>Métodos de pago aceptados</li>
                  <li>Cargos por pagos tardíos</li>
                  <li>Opciones de pago anticipado</li>
                  <li>Penalizaciones por incumplimiento</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Responsabilidades del Cliente
                </h2>
                <p className="text-gray-700 mb-4">
                  Como cliente, usted es responsable de:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Proporcionar información veraz y actualizada</li>
                  <li>Realizar pagos puntuales</li>
                  <li>Mantener comunicación activa con nosotros</li>
                  <li>Notificar cambios en su situación financiera</li>
                  <li>Cumplir con todas las obligaciones contractuales</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Limitaciones de Responsabilidad
                </h2>
                <p className="text-gray-700 mb-4">
                  Oriental Ramirez no será responsable por daños indirectos, incidentales o consecuentes que puedan resultar del uso de nuestros servicios, excepto cuando la ley lo requiera.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Modificaciones de los Términos
                </h2>
                <p className="text-gray-700 mb-4">
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán notificados a través de nuestro sitio web o por correo electrónico.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Ley Aplicable
                </h2>
                <p className="text-gray-700 mb-4">
                  Estos términos se rigen por las leyes de la República Dominicana. Cualquier disputa será resuelta en los tribunales competentes de Santo Domingo.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Contacto
                </h2>
                <p className="text-gray-700 mb-4">
                  Si tiene preguntas sobre estos términos y condiciones, contáctenos en:
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
