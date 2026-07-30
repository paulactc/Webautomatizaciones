import { useRef } from "react";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

const highlights = [
  "Empiezas con lo básico y escalas cuando lo necesites",
  "CRM de clientes + calendario de citas, todo integrado",
  "Cada gestión queda registrada sin que tú hagas nada",
];

export default function CrmShowcase() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 520, behavior: "smooth" });
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
            <div className="crm-showcase__track">
              <div className="crm-showcase__frame">
                <img src="/images/CRM.png" alt="Panel de control" className="crm-showcase__img" />
              </div>
              <div className="crm-showcase__frame">
                <img src="/images/calendario.png" alt="Calendario de citas" className="crm-showcase__img" />
              </div>
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
