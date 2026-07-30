import { useState } from "react";
import { Scissors, Stethoscope, Wrench, Building2, GraduationCap, Globe, Sparkles } from "lucide-react";

const sectors = [
  {
    id: "peluqueria",
    icon: Scissors,
    label: "Peluquerías / Estética",
    automations: [
      "Agenda que se llena sola",
      "Recordatorio automático 24h antes",
      "Respuestas automáticas de precios y servicios",
    ],
  },
  {
    id: "clinica",
    icon: Stethoscope,
    label: "Clínicas / Fisioterapia",
    automations: [
      "Avisos de próximas revisiones y sesiones",
      "Citas agendadas automáticamente por servicios",
      "Presupuestos",
    ],
  },
  {
    id: "talleres",
    icon: Wrench,
    label: "Talleres mecánicos",
    automations: [
      "Aviso de próximas revisiones",
      "Confirmación de estados de reparación",
      "Citas agendadas",
    ],
  },
  {
    id: "inmobiliarias",
    icon: Building2,
    label: "Inmobiliarias",
    automations: [
      "Respuesta inmediata a cada consulta de inmueble",
      "Filtrado automático de interesados",
      "Respuestas genéricas",
    ],
  },
  {
    id: "academias",
    icon: GraduationCap,
    label: "Academias / Autoescuelas",
    automations: [
      "Inscripción y reserva de plazas automática",
      "Recordatorio de clases y exámenes",
      "Respuesta a preguntas frecuentes de cursos",
    ],
  },
  {
    id: "web",
    icon: Globe,
    label: "Páginas web y plataformas",
    automations: [
      "Captura y respuesta automática desde formularios",
      "Notificaciones al instante de nuevos leads",
      "Chatbot integrado en tu web 24/7",
    ],
  },
];

export default function SectorTabs() {
  const [active, setActive] = useState(sectors[0].id);
  const current = sectors.find((s) => s.id === active);

  return (
    <section className="page-section" id="sectores" style={{ scrollMarginTop: 80 }}>
      <div className="container">
        <h2 className="section-title">Automatizaciones reales para cada sector</h2>
        <p className="section-subtitle">
          Cada negocio tiene sus propios cuellos de botella. Estos son algunos ejemplos de lo que automatizamos.
        </p>

        <div className="sector-tabs">
          <div className="sector-tabs__list">
            {sectors.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                className={`sector-tabs__btn${active === id ? " sector-tabs__btn--active" : ""}`}
                onClick={() => setActive(id)}
              >
                <Icon size={22} strokeWidth={1.5} />
                {label}
              </button>
            ))}
          </div>

          <div className="sector-tabs__content" key={current.id}>
            {current.automations.map((item, i) => (
              <div key={i} className="sector-tabs__item">
                <span className="sector-tabs__check">&#10003;</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="sector-tabs__maintenance">
          <Sparkles size={18} strokeWidth={1.5} />
          <span>
            Todo incluido en tu pack con <strong>mantenimiento mensual por solo 30€/mes</strong> — 
            agente IA siempre actualizado, ajustes sin coste y soporte en 24h.
          </span>
        </div>
      </div>
    </section>
  );
}
