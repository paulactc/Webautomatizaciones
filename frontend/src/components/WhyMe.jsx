import { Euro, CalendarX, Clock, Headphones, Puzzle, ShieldCheck, Lock, Database } from "lucide-react";

const reasons = [
  {
    icon: Euro,
    title: "Precio cerrado, sin sorpresas",
    desc: "Sabes exactamente cuánto vas a pagar desde el primer día. Sin horas extra, sin letra pequeña.",
  },
  {
    icon: CalendarX,
    title: "Sin permanencia",
    desc: "No te atamos a contratos largos. Si no funciona, no pagas. Confianza mutua.",
  },
  {
    icon: Clock,
    title: "Activo en 3-5 días",
    desc: "No meses de desarrollo. Tu automatización está funcionando en menos de una semana.",
  },
  {
    icon: Headphones,
    title: "Soporte humano incluido",
    desc: "Detrás de cada automatización hay una persona que responde. No un chatbot que te redirige.",
  },
  {
    icon: Puzzle,
    title: "Adaptado a tu negocio",
    desc: "No usamos plantillas genéricas. Cada solución se diseña para la forma en que tú trabajas.",
  },
];

const security = [
  { icon: ShieldCheck, title: "RGPD por diseño" },
  { icon: Lock, title: "Protección de datos" },
  { icon: Database, title: "Buenas prácticas de seguridad" },
];

export default function WhyMe() {
  return (
    <section className="why-section">
      <div className="container container--narrow">
        <h2 className="section-title why-section__title">
          Por qué trabajamos juntos
        </h2>
        <p className="section-subtitle why-section__subtitle">
          Lo que nos diferencia no es la tecnología, es la forma de trabajar
        </p>

        <div className="why__grid">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="why__card">
              <div className="why__card-icon">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="why__card-title">{title}</h3>
              <p className="why__card-desc">{desc}</p>
            </div>
          ))}
        </div>

        <div className="why__security">
          <span className="why__security-label">Seguridad y confianza</span>
          <div className="why__security-list">
            {security.map(({ icon: Icon, title }) => (
              <span key={title} className="why__security-pill">
                <Icon size={16} strokeWidth={2} />
                {title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
