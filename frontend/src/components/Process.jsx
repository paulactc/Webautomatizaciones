import { Phone, Wrench, Rocket } from "lucide-react";

const steps = [
  {
    icon: Phone,
    number: "01",
    title: "Hablamos",
    desc: "Llamada o WhatsApp gratuito. Nos cuentas qué necesitas y te decimos si se puede.",
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
    desc: "Tus clientes reciben respuesta automática. Tus citas se confirman solas. Tú te dedicas a lo que importa.",
  },
];

export default function Process() {
  return (
    <section className="page-section process-section">
      <div className="container">
        <h2 className="section-title">Cómo funciona</h2>
        <p className="section-subtitle">
          Tres pasos y tu negocio está automatizado.
        </p>
        <div className="process__grid">
          {steps.map(({ icon: Icon, number, title, desc }) => (
            <div key={number} className="process__step">
              <Icon size={32} strokeWidth={1.5} className="process__icon" />
              <span className="process__number">{number}</span>
              <h3 className="process__title">{title}</h3>
              <p className="process__desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
