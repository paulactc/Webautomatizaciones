import { CheckCircle2, ShieldCheck, Lock, Database } from "lucide-react";

const reasons = [
  {
    icon: CheckCircle2,
    title: "Precio cerrado, sin sorpresas",
    desc: "Sabes exactamente cuánto vas a pagar desde el primer día. Sin horas extra, sin letra pequeña.",
  },
  {
    icon: CheckCircle2,
    title: "Sin permanencia",
    desc: "No te atamos a contratos largos. Si no funciona, no pagas. Confianza mutua.",
  },
  {
    icon: CheckCircle2,
    title: "Activo en 3-5 días",
    desc: "No meses de desarrollo. Tu automatización está funcionando en menos de una semana.",
  },
  {
    icon: CheckCircle2,
    title: "Soporte humano incluido",
    desc: "Detrás de cada automatización hay una persona que responde. No un chatbot que te redirige.",
  },
  {
    icon: CheckCircle2,
    title: "Adaptado a tu negocio",
    desc: "No usamos plantillas genéricas. Cada solución se diseña para la forma en que tú trabajas.",
  },
];

const security = [
  {
    icon: ShieldCheck,
    title: "RGPD por diseño",
    desc: "Cada automatización se construye con privacidad integrada desde el primer día.",
  },
  {
    icon: Lock,
    title: "Protección de datos",
    desc: "Tus datos y los de tus clientes están seguros. Sin excepciones.",
  },
  {
    icon: Database,
    title: "Buenas prácticas de seguridad",
    desc: "Estándares de seguridad en cada línea de código. Tus información protegida.",
  },
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

        <div className="why__list">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="why__item">
              <Icon size={24} strokeWidth={2} className="why__icon" />
              <div className="why__text">
                <h3 className="why__item-title">{title}</h3>
                <p className="why__item-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="why-section__subtitle" style={{ marginTop: "2.5rem", marginBottom: "1.5rem", textAlign: "center", fontWeight: 700 }}>
          Seguridad y confianza
        </h3>

        <div className="why__list">
          {security.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="why__item why__item--security">
              <Icon size={24} strokeWidth={2} className="why__icon why__icon--security" />
              <div className="why__text">
                <h3 className="why__item-title">{title}</h3>
                <p className="why__item-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
