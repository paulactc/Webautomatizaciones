import { MessageSquareText, BarChart3 } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: MessageSquareText,
    title: "Conversa con tu tono",
    desc: "Aprende cómo hablas tú, responde con datos reales de tu negocio y pasa el relevo al equipo cuando hace falta criterio.",
  },
  {
    icon: BarChart3,
    title: "Te informa sin que preguntes",
    desc: "Citas confirmadas y agendadas, respuestas genéricas, reseñas pedidas, recordatorios de citas... Todo recogido en tu nuevo panel diario donde tienes todo el control.",
  },
];

export default function AgentFeatures() {
  return (
    <section className="page-section agent-features">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Tu agente, contigo</h2>
          <p className="section-subtitle">
            Habla como tú y te cuenta cómo va todo, sin que tengas que preguntar.
          </p>
        </motion.div>

        <div className="agent-features__grid">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.article
              key={title}
              className="agent-features__card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="agent-features__icon">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="agent-features__title">{title}</h3>
              <p className="agent-features__desc">{desc}</p>
            </motion.article>
          ))}
        </div>

        <p className="agent-features__note">
          Todo incluido en tu pack con mantenimiento mensual desde 50€/mes — agente IA
          siempre actualizado, ajustes sin coste y soporte en 24h.
        </p>
      </div>
    </section>
  );
}
