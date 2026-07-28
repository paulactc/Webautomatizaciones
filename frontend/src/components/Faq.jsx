import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "¿Necesito saber de tecnología?",
    a: "Para nada. Nosotros nos encargamos de todo. Tú solo nos cuentas cómo funciona tu negocio y nosotros montamos la automatización. Sin instalar nada, sin configuraciones raras.",
  },
  {
    q: "¿Hay permanencia o puedo cancelar?",
    a: "No hay permanencia. Puedes cancelar cuando quieras. El único compromiso es el pago mensual, que puedes suspender con 15 días de aviso.",
  },
  {
    q: "¿Qué pasa si tengo dudas después de la implementación?",
    a: "Tienes soporte incluido. Si algo no funciona como esperabas o necesitas un ajuste, nos escribes y lo resolvemos sin coste adicional.",
  },
  {
    q: "¿Funciona para mi tipo de negocio?",
    a: "Si tu negocio recibe mensajes por WhatsApp o gestiona citas, sí. Trabajamos con peluquerías, clínicas, talleres, inmobiliarias, academias y cualquier pyme o autónomo que quiera dejar de perder tiempo en tareas repetitivas.",
  },
  {
    q: "¿Cuánto tarda en estar funcionando?",
    a: "Depende del pack, pero la mayoría de automatizaciones están activas en 3-5 días hábiles. Sin proyectos de meses.",
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
