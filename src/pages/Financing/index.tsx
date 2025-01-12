import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, FileText, Calculator, Clock, AlertCircle } from "lucide-react"
import { Helmet } from 'react-helmet-async'

const requirements = [
  {
    title: "Documentos de Identidad",
    items: [
      "Cédula de identidad y electoral",
      "Comprobante de domicilio reciente",
      "Referencias personales y comerciales"
    ]
  },
  {
    title: "Documentos Laborales",
    items: [
      "Carta de trabajo (si es empleado)",
      "Comprobantes de ingresos últimos 3 meses",
      "Declaración de impuestos (si es independiente)"
    ]
  },
  {
    title: "Documentos Financieros",
    items: [
      "Estados de cuenta bancarios (últimos 3 meses)",
      "Historial crediticio favorable",
      "Comprobante de otros ingresos (si aplica)"
    ]
  }
]

const faqs = [
  {
    question: "¿Cuál es el monto mínimo de inicial requerido?",
    answer: "El monto mínimo de inicial es del 20% del valor del vehículo. Sin embargo, mientras mayor sea el inicial, mejores serán las condiciones del financiamiento."
  },
  {
    question: "¿Cuál es el plazo máximo de financiamiento?",
    answer: "Ofrecemos plazos flexibles de hasta 60 meses (5 años), dependiendo del modelo del vehículo y el perfil crediticio del cliente."
  },
  {
    question: "¿Necesito tener historial crediticio?",
    answer: "Aunque es preferible tener un historial crediticio, evaluamos cada caso de manera individual. Nuevos clientes pueden calificar con un inicial mayor o un co-deudor."
  },
  {
    question: "¿Cuánto tiempo toma el proceso de aprobación?",
    answer: "El proceso de pre-aprobación toma 24-48 horas. La aprobación final puede tomar hasta 5 días hábiles dependiendo de la verificación de documentos."
  },
  {
    question: "¿Puedo realizar pagos anticipados?",
    answer: "Sí, aceptamos pagos anticipados sin penalidad. Estos pueden aplicarse para reducir el plazo o la cuota mensual, según prefiera el cliente."
  }
]

const steps = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Selecciona tu Vehículo",
    description: "Explora nuestro catálogo y elige el vehículo que mejor se adapte a tus necesidades."
  },
  {
    icon: <Calculator className="h-6 w-6" />,
    title: "Calcula tu Cuota",
    description: "Utiliza nuestra calculadora para simular diferentes escenarios de financiamiento."
  },
  {
    icon: <CheckCircle2 className="h-6 w-6" />,
    title: "Solicita tu Préstamo",
    description: "Completa el formulario de solicitud y adjunta los documentos requeridos."
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Aprobación",
    description: "Recibirás una respuesta en 24-48 horas sobre el estado de tu solicitud."
  }
]

export default function Financing() {
  return (
    <>
      <Helmet>
        <title>Financiamiento de Vehículos | Oriental Ramirez</title>
        <meta 
          name="description" 
          content="Opciones flexibles de financiamiento para motos y vehículos. Conoce nuestros requisitos y proceso de aprobación rápido. Oriental Ramirez República Dominicana." 
        />
        <meta 
          name="keywords" 
          content="financiamiento vehículos, préstamos motos, crédito vehicular, Oriental Ramirez, República Dominicana" 
        />
        <link rel="canonical" href="https://orientalramirez.com/financiamiento" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-[#38367D] text-white py-24">
          <div className="container mx-auto px-8">
            <h1 className="text-4xl font-bold mb-4">Financiamiento de Vehículos</h1>
            <p className="text-lg text-gray-200 max-w-2xl">
              Hacemos realidad tu sueño de tener un vehículo nuevo con opciones de financiamiento flexibles y adaptadas a tus necesidades.
            </p>
          </div>
        </div>

        {/* Process Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Proceso de Financiamiento</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                    {step.icon}
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Requirements Section */}
        <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Requisitos</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {requirements.map((category, index) => (
                <Card key={index} className="border-2">
                  <CardHeader>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>Documentos necesarios</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-[#38367D] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <AlertCircle className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">¿Necesitas más información?</h2>
              <p className="text-gray-200 mb-8">
                Nuestro equipo de asesores financieros está disponible para responder todas tus dudas y ayudarte en el proceso.
              </p>
              <div className="flex justify-center gap-4">
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="flex flex-col items-center p-6">
                    <p className="text-lg font-semibold">Llámanos</p>
                    <p className="text-xl">(809) 555-0123</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="flex flex-col items-center p-6">
                    <p className="text-lg font-semibold">Escríbenos</p>
                    <p className="text-xl">financiamiento@oriental.com</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 