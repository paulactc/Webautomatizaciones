import { useRef } from "react";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import CalendarShowcase from "./CalendarShowcase.jsx";
import CrmKanbanShowcase from "./CrmKanbanShowcase.jsx";

const highlights = [
  "Empiezas con lo básico y escalas cuando lo necesites",
  "CRM de clientes + calendario de citas, todo integrado",
  "Cada gestión queda registrada sin que tú hagas nada",
];

export default function CrmShowcase() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const frame = scrollRef.current.querySelector(".crm-showcase__frame");
    const step = (frame ? frame.offsetWidth : 720) + 24;
    scrollRef.current.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="crm-showcase">
      <div className="container">
        <h2 className="section-title crm-showcase__title">
          Un sistema que crece contigo
        </h2>
        <p className="section-subtitle crm-showcase__subtitle">
          Empieza por lo que necesitas hoy y construye mucho más mañana.
        </p>

        <div className="crm-showcase__carousel">
          <button className="crm-showcase__arrow crm-showcase__arrow--left" onClick={() => scroll(-1)} aria-label="Anterior">
            <ChevronLeft size={24} />
          </button>

          <div className="crm-showcase__scroll" ref={scrollRef}>
            <div className="crm-showcase__frame crm-showcase__frame--wide crm-showcase__frame--nav">
              <CalendarShowcase />
              <button
                className="crm-showcase__nav crm-showcase__nav--next"
                onClick={() => scroll(1)}
                aria-label="Ver gestiones del agente"
              >
                <ChevronRight size={20} />
                <span>Gestiones del agente</span>
              </button>
            </div>
            <div className="crm-showcase__frame crm-showcase__frame--wide crm-showcase__frame--nav">
              <CrmKanbanShowcase />
              <button
                className="crm-showcase__nav crm-showcase__nav--prev"
                onClick={() => scroll(-1)}
                aria-label="Volver al calendario"
              >
                <ChevronLeft size={20} />
                <span>Calendario</span>
              </button>
            </div>
          </div>

          <button className="crm-showcase__arrow crm-showcase__arrow--right" onClick={() => scroll(1)} aria-label="Siguiente">
            <ChevronRight size={24} />
          </button>
        </div>

        <ul className="crm-showcase__highlights">
          {highlights.map((h) => (
            <li key={h}>
              <CheckCircle2 size={18} strokeWidth={2} />
              {h}
            </li>
          ))}
        </ul>

        <a
          href={`https://wa.me/34722439479?text=${encodeURIComponent("Hola, quiero una demo del panel para mi negocio.")}`}
          target="_blank" rel="noreferrer"
          className="btn btn--primary btn--wa crm-showcase__cta"
        >
          <ArrowRight size={18} strokeWidth={2.5} />
          Quiero ver el panel en acción
        </a>
      </div>
    </section>
  );
}
