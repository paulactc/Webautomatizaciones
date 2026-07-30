import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "¿Necesito saber de tecnología?",
    a: "Para nada. Nosotros nos encargamos de todo. Tú solo nos cuentas cómo funciona tu negocio y nosotros montamos la automatización. Sin instalar nada, sin configuraciones raras.",
  },
  {
    q: "¿La automatización es mía o os la quedáis vosotros?",
    a: "Es tuya. Una vez abonado el importe inicial, te entregamos todo el proyecto: código, configuraciones y acceso. Puedes quedártelo aunque decidas no seguir con el mantenimiento mensual.",
  },
  {
    q: "¿Qué diferencia hay entre un agente de IA y un chatbot normal?",
    a: "Un chatbot normal sigue reglas fijas y solo responde lo que le programaron. Un agente de IA entiende el contexto, adapta sus respuestas y puede gestionar conversaciones complejas: reservar citas, consultar estados, clasificar consultas y derivar al humano solo cuando es necesario.",
  },
  {
    q: "¿Funciona para mi tipo de negocio?",
    a: "Si tu negocio recibe mensajes por WhatsApp o gestiona citas, sí. Trabajamos con peluquerías, clínicas, talleres mecánicos, inmobiliarias, academias, autoescuelas y cualquier autónomo o pyme que quiera dejar de perder tiempo en tareas repetitivas.",
  },
  {
    q: "¿Cuánto tarda en estar funcionando?",
    a: "Entre 5 y 7 días hábiles desde que damos el visto bueno. Empezamos con una reunión para entender tu negocio y en menos de una semana ya está todo operativo.",
  },
  {
    q: "¿Qué incluye cada pack?",
    a: "El Pack Base (500 €) incluye panel de gestiones, calendario de citas automático, respuestas a preguntas frecuentes e integración con WhatsApp. El Pack Avanzado (850 €) añade base de datos de clientes con historial y segmentación para campañas. Si necesitas algo más completo, el Pack a Medida se adapta a ti. La página web son 250 € adicionales en cualquier pack.",
  },
  {
    q: "¿Qué pasa si tengo dudas después de la implementación?",
    a: "Tienes soporte incluido. Si algo no funciona como esperabas o necesitas un ajuste, nos escribes y lo resolvemos sin coste adicional.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="page-section faq-section">
      <div className="container container--narrow">
        <h2 className="section-title">Preguntas frecuentes</h2>
        <p className="section-subtitle">
          Las dudas más comunes antes de empezar.
        </p>

        <div className="faq__list">
          {faqs.map(({ q, a }, i) => (
            <div key={i} className={`faq__item${openIndex === i ? " faq__item--open" : ""}`}>
              <button
                className="faq__question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {q}
                <ChevronDown size={20} strokeWidth={2.5} className="faq__icon" />
              </button>
              {openIndex === i && (
                <div className="faq__answer">{a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
