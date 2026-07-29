import { useState } from "react";
import { ArrowRight, CheckCircle2, X } from "lucide-react";

const highlights = [
  "Clientes, citas y mensajes en un solo panel",
  "Estados de cada servicio en tiempo real",
  "Informes de facturación mensual automatizados",
];

const demos = [
  {
    img: "/images/CRM.png",
    label: "CRM para casas rurales",
    desc: "Gestión completa de reservas, huéspedes y check-ins automatizada con IA.",
  },
  {
    img: "/images/CRMTALLER.png",
    label: "CRM para taller de motos",
    desc: "CRM más personalizado: seguimiento de reparaciones, clientes y presupuestos en tiempo real.",
  },
];

export default function CrmShowcase() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section className="crm-showcase">
      <div className="container">
        <h2 className="section-title crm-showcase__title">
          Así se ve tu CRM en acción
        </h2>
        <p className="section-subtitle crm-showcase__subtitle">
          Cada CRM se adapta a tu negocio — desde casas rurales hasta talleres. Todos con IA, panel único y precios cerrados.
        </p>

        <div className="crm-showcase__scroll">
          {demos.map((demo) => (
            <div key={demo.label} className="crm-showcase__card">
              <div className="crm-showcase__frame" onClick={() => setLightbox(demo)}>
                <img
                  src={demo.img}
                  alt={demo.desc}
                  className="crm-showcase__img"
                />
              </div>
              <div className="crm-showcase__card-body">
                <h3 className="crm-showcase__card-label">{demo.label}</h3>
                <p className="crm-showcase__card-desc">{demo.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <ul className="crm-showcase__highlights">
          {highlights.map((h) => (
            <li key={h}>
              <CheckCircle2 size={18} strokeWidth={2} />
              {h}
            </li>
          ))}
        </ul>

        <a href={`https://wa.me/34722439479?text=${encodeURIComponent("Hola, quiero ver una demo del CRM para mi negocio.")}`} target="_blank" rel="noreferrer" className="btn btn--primary btn--wa crm-showcase__cta">
          <ArrowRight size={18} strokeWidth={2.5} />
          Quiero ver mi CRM personalizado
        </a>
      </div>

      {lightbox && (
        <div className="crm-showcase__lightbox" onClick={() => setLightbox(null)}>
          <button className="crm-showcase__lightbox-close" onClick={() => setLightbox(null)}>
            <X size={28} strokeWidth={2.5} />
          </button>
          <img
            src={lightbox.img}
            alt={lightbox.desc}
            className="crm-showcase__lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
