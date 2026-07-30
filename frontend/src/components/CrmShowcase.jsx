import { useState } from "react";
import { ArrowRight, CheckCircle2, X } from "lucide-react";

const highlights = [
  "Empiezas con lo básico y escalas cuando lo necesites",
  "Clientes, citas y mensajes en un solo panel",
  "Cada gestión queda registrada sin que tú hagas nada",
];

export default function CrmShowcase() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section className="crm-showcase">
      <div className="container">
        <h2 className="section-title crm-showcase__title">
          Un sistema que crece contigo
        </h2>
        <p className="section-subtitle crm-showcase__subtitle">
          Empieza por lo que necesitas hoy y construye mucho más mañana.
        </p>

        <div className="crm-showcase__single">
          <div className="crm-showcase__frame" onClick={() => setLightbox("/images/CRM.png")}>
            <img
              src="/images/CRM.png"
              alt="Panel de control"
              className="crm-showcase__img"
            />
          </div>
        </div>

        <ul className="crm-showcase__highlights">
          {highlights.map((h) => (
            <li key={h}>
              <CheckCircle2 size={18} strokeWidth={2} />
              {h}
            </li>
          ))}
        </ul>

        <a href={`https://wa.me/34722439479?text=${encodeURIComponent("Hola, quiero una demo del panel para mi negocio.")}`} target="_blank" rel="noreferrer" className="btn btn--primary btn--wa crm-showcase__cta">
          <ArrowRight size={18} strokeWidth={2.5} />
          Quiero ver el panel en acción
        </a>
      </div>

      {lightbox && (
        <div className="crm-showcase__lightbox" onClick={() => setLightbox(null)}>
          <button className="crm-showcase__lightbox-close" onClick={() => setLightbox(null)}>
            <X size={28} strokeWidth={2.5} />
          </button>
          <img
            src={lightbox}
            alt="Panel de control"
            className="crm-showcase__lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
