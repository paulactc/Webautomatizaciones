import { MessageCircle } from "lucide-react";

const testimonials = [
  {
    text: "Le pedí a Paula que me organizara los mensajes y las citas del taller. Ella no solo hizo eso: me creó un CRM a medida con un agente de IA que agenda citas, responde consultas generales y hasta conectado con mi base de datos para consultar el histórico de reparaciones de cada cliente. Ahora atiendo a 80 clientes al mes sin perder ni uno.",
    name: "Ernesto Merino",
    business: "EmRider Suspensions",
    sector: "Sector motor",
  },
  {
    text: "Teníamos un caos con las reservas: emails desparramados, huéspedes sin instrucciones de llegada, recordatorios que nunca se mandaban. Paula nos implementó un agente de IA que gestiona todo el proceso de recepción de reservas y manda instrucciones, avisos y recordatorios de forma organizada a cada huésped. Todo centralizado en un CRM.",
    name: "Alojamientos Rurales Quintana Romillo",
    business: "Gestión turística de alojamientos",
    sector: "Turismo rural",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title testimonials-section__title">
          Lo que dicen mis clientes
        </h2>
        <p className="section-subtitle testimonials-section__subtitle">
          Resultados reales de negocios reales
        </p>

        <div className="testimonials__grid">
          {testimonials.map(({ text, name, business, sector }) => (
            <article key={name} className="testimonial-card">
              <MessageCircle size={32} strokeWidth={1.5} className="testimonial-card__icon" />
              <p className="testimonial-card__text">{text}</p>
              <div className="testimonial-card__footer">
                <div className="testimonial-card__avatar">
                  {name.charAt(0)}
                </div>
                <div className="testimonial-card__info">
                  <span className="testimonial-card__name">{name}</span>
                  <span className="testimonial-card__business">{business}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
