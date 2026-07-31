import { Phone, Wrench, Rocket } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    icon: Phone,
    number: "01",
    title: "Hablamos",
    desc: "Te contamos cómo lo hacemos posible.",
  },
  {
    icon: Wrench,
    number: "02",
    title: "Lo montamos",
    desc: "Implementamos todo sin que tengas que mover un dedo. Sin tecnicismos, sin complicaciones.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Tu negocio trabaja solo",
    desc: "Tus clientes son atendidos 24/7. Reciben respuesta automática al instante y tus citas se confirman solas. Tú te dedicas a lo que importa.",
  },
];

export default function Process() {
  return (
    <section className="page-section process-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          Cómo funciona
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <span className="highlight">Tres pasos</span> y tu negocio está automatizado.
        </motion.p>
        <div className="process__grid">
          {steps.map(({ icon: Icon, number, title, desc }, i) => (
            <motion.div
              key={number}
              className="process__step"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.25 }}
            >
              <div className="process__step-header">
                <span className="process__ghost-number">{number}</span>
                <div className="process__icon-wrap">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <span className="process__number">{number}</span>
              </div>
              <div className="process__step-body">
                <h3 className="process__title">{title}</h3>
                <p className="process__desc">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
