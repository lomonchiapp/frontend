import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'

export default function Returns() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Helmet>
        <title>Política de Devoluciones - Oriental Ramirez</title>
        <meta name="description" content="Política de devoluciones y reembolsos de Oriental Ramirez" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Política de Devoluciones
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-DO')}
              </p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Política General de Devoluciones
                </h2>
                <p className="text-gray-700 mb-4">
                  Oriental Ramirez se compromete a garantizar la satisfacción total de nuestros clientes. Entendemos que en ocasiones puede ser necesario devolver un producto, y hemos establecido una política clara y justa para manejar estas situaciones.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Período de Devolución
                </h2>
                <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                  <p className="text-green-800">
                    <strong>Período Estándar:</strong> 30 días desde la fecha de compra<br />
                    <strong>Período Extendido:</strong> 60 días para clientes premium
                  </p>
                </div>
                <p className="text-gray-700 mb-4">
                  El período de devolución comienza desde la fecha de entrega del vehículo o producto.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Condiciones para Devolución
                </h2>
                <p className="text-gray-700 mb-4">
                  Para que una devolución sea aceptada, el producto debe cumplir con:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Estar en su estado original sin modificaciones</li>
                  <li>No mostrar signos de uso o desgaste</li>
                  <li>Incluir todos los accesorios y documentación original</li>
                  <li>No tener daños por accidente o mal uso</li>
                  <li>Mantener el kilometraje original (para vehículos)</li>
                  <li>No haber sido registrado o transferido a otro propietario</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Productos No Elegibles para Devolución
                </h2>
                <p className="text-gray-700 mb-4">
                  Los siguientes productos no pueden ser devueltos:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Vehículos con más de 100 km recorridos</li>
                  <li>Productos personalizados o modificados</li>
                  <li>Accesorios instalados o utilizados</li>
                  <li>Productos en oferta o liquidación</li>
                  <li>Servicios ya prestados</li>
                  <li>Productos de higiene personal</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Proceso de Devolución
                </h2>
                <p className="text-gray-700 mb-4">
                  Para iniciar una devolución, siga estos pasos:
                </p>
                <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                  <li>Contacte a nuestro servicio al cliente dentro del período de devolución</li>
                  <li>Proporcione el número de factura y motivo de la devolución</li>
                  <li>Programe una inspección del producto</li>
                  <li>Complete el formulario de devolución</li>
                  <li>Entregue el producto en nuestras instalaciones</li>
                  <li>Reciba confirmación y procesamiento del reembolso</li>
                </ol>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Opciones de Reembolso
                </h2>
                <p className="text-gray-700 mb-4">
                  Ofrecemos las siguientes opciones de reembolso:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Reembolso en Efectivo</h4>
                    <p className="text-blue-700 text-sm">Para compras en efectivo o transferencia</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Crédito en Cuenta</h4>
                    <p className="text-green-700 text-sm">Para futuras compras en nuestra empresa</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Cambio por Otro Producto</h4>
                    <p className="text-purple-700 text-sm">De igual o mayor valor</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Reembolso a Tarjeta</h4>
                    <p className="text-orange-700 text-sm">Para compras con tarjeta de crédito/débito</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Cargos por Devolución
                </h2>
                <p className="text-gray-700 mb-4">
                  Pueden aplicarse los siguientes cargos:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Cargo de Inspección:</strong> $50 USD para vehículos</li>
                  <li><strong>Cargo de Reacondicionamiento:</strong> $100 USD si es necesario</li>
                  <li><strong>Cargo de Transporte:</strong> Costos de envío si aplica</li>
                  <li><strong>Cargo de Gestión:</strong> $25 USD por procesamiento</li>
                </ul>
                <p className="text-gray-600 text-sm mt-2">
                  * Los cargos se deducen del monto total del reembolso
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Tiempo de Procesamiento
                </h2>
                <p className="text-gray-700 mb-4">
                  Los reembolsos se procesan en los siguientes plazos:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Crédito en Cuenta:</strong> 1-3 días hábiles</li>
                  <li><strong>Reembolso a Tarjeta:</strong> 5-10 días hábiles</li>
                  <li><strong>Reembolso en Efectivo:</strong> 3-5 días hábiles</li>
                  <li><strong>Cambio de Producto:</strong> Inmediato (si hay stock)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Devoluciones por Defectos
                </h2>
                <p className="text-gray-700 mb-4">
                  Para productos con defectos de fabricación:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>No se aplican cargos por inspección</li>
                  <li>Período de devolución extendido a 90 días</li>
                  <li>Reembolso completo sin deducciones</li>
                  <li>Opción de cambio por producto idéntico</li>
                  <li>Cobertura de costos de transporte</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Devoluciones de Financiamiento
                </h2>
                <p className="text-gray-700 mb-4">
                  Para vehículos adquiridos con financiamiento:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Se debe cancelar el saldo pendiente del préstamo</li>
                  <li>Se procesa el reembolso después de la cancelación</li>
                  <li>Se pueden aplicar cargos por cancelación anticipada</li>
                  <li>Se requiere autorización de la entidad financiera</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Contacto para Devoluciones
                </h2>
                <p className="text-gray-700 mb-4">
                  Para iniciar una devolución o consultar sobre nuestra política, contáctenos en:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Servicio al Cliente:</strong> (809) 246-6630<br />
                    <strong>Email Devoluciones:</strong> ventas@orientalramirez.com<br />
                    <strong>Horario:</strong> Lunes a Viernes 8:00 AM - 6:00 PM, Sábados 9:00 AM - 2:00 PM<br />
                    <strong>WhatsApp:</strong> (809) 246-6630
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Información Importante
                </h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <p className="text-yellow-800">
                    <strong>Nota:</strong> Esta política está sujeta a cambios sin previo aviso. Para obtener la información más actualizada, consulte con nuestro personal o visite nuestras instalaciones.
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
