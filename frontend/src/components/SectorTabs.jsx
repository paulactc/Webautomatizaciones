import { useState } from "react";
import { Scissors, Stethoscope, Wrench, Building2, GraduationCap } from "lucide-react";

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
      "Primera cita agendada desde WhatsApp",
      "Recordatorios de tratamiento pendiente",
      "Confirmación automática de citas",
    ],
  },
  {
    id: "talleres",
    icon: Wrench,
    label: "Talleres mecánicos",
    automations: [
      "Presupuesto orientativo automático",
      "Aviso cuando el coche está listo",
      "Seguimiento de presupuestos sin respuesta",
    ],
  },
  {
    id: "inmobiliarias",
    icon: Building2,
    label: "Inmobiliarias",
    automations: [
      "Respuesta inmediata a cada consulta de inmueble",
      "Filtrado automático de interesados",
      "Seguimiento post-visita sin intervención manual",
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
                <Icon size={20} strokeWidth={1.5} />
                {label}
              </button>
            ))}
          </div>

          <div className="sector-tabs__content">
            {current.automations.map((item, i) => (
              <div key={i} className="sector-tabs__item">
                <span className="sector-tabs__check">&#10003;</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
