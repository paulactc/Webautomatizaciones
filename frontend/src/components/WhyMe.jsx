import { Euro, Clock, Headphones, Puzzle, ShieldCheck, Lock, Database, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const reasons = [
  {
    icon: Euro,
    title: "Precio cerrado, sin sorpresas",
    desc: "Sabes exactamente cuánto vas a pagar desde el primer día. Sin horas extra, sin letra pequeña.",
  },
  {
    icon: Clock,
    title: "Activo en 5-7 días",
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
      <div className="why-section__bg" />
      <div className="container container--narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title why-section__title">
            Por qué trabajamos juntos
          </h2>
          <p className="section-subtitle why-section__subtitle">
            Lo que nos diferencia no es la tecnología, es la forma de trabajar
          </p>
        </motion.div>

        <div className="why__grid">
          {reasons.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              className="why__card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="why__card-icon">
                <Icon size={22} strokeWidth={1.5} />
              </div>
              <div className="why__card-body">
                <h3 className="why__card-title">{title}</h3>
                <p className="why__card-desc">{desc}</p>
              </div>
              <ArrowRight size={16} className="why__card-arrow" strokeWidth={2} />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="why__security"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="why__security-label">Seguridad y confianza</span>
          <div className="why__security-list">
            {security.map(({ icon: Icon, title }) => (
              <span key={title} className="why__security-pill">
                <Icon size={16} strokeWidth={2} />
                {title}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
