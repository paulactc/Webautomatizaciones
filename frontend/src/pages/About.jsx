import { Code, Brain, Smartphone, Cloud, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router";

const services = [
  { icon: Code, text: "Páginas web y plataformas a medida (React, Node.js, Vite)" },
  { icon: Brain, text: "Automatización con IA para negocios (flujos, respuestas, clasificación)" },
  { icon: Smartphone, text: "Agentes de IA en WhatsApp (atención al cliente 24/7)" },
  { icon: Cloud, text: "Backoffice y paneles de gestión personalizados" },
];

export default function About() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="about__header">
          <img
            src="/images/IMG_20260727_144413.jpg"
            alt="Coworker IA"
            className="about__photo"
          />
          <h2 className="section-title">Sobre mí</h2>
        </div>

        <div className="about__grid">
          <div className="about__text">
            <p className="about__intro">
              Coworker IA — desarrollo web y automatización con IA para negocios que quieren trabajar más y mejor.
            </p>

            <p className="about__story">
              Soy desarrolladora y automatizadora. Creo soluciones tecnológicas para negocios reales: desde páginas web hasta agentes de IA que gestionan clientes solos. Mi enfoque es siempre entender primero el negocio, no solo escribir código.
            </p>

            <p className="about__story">
              Trabajo de forma cercana, adaptando cada proyecto a las necesidades reales de mis clientes: emprendedores, negocios locales, talleres, clínicas y profesionales que quieren optimizar su tiempo y crecer sin depender de procesos manuales.
            </p>

            <p className="about__lead">Mis servicios:</p>

            <ul className="about__services">
              {services.map(({ icon: Icon, text }) => (
                <li key={text} className="about__service-item">
                  <Icon size={18} strokeWidth={1.5} className="about__service-icon" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <p className="about__differentiator">
              Si tienes un negocio que pierde tiempo en tareas repetitivas o necesitas presencia digital profesional, te acompaño desde la idea hasta el lanzamiento.
            </p>

            <div className="about__contact-info">
              <a href="mailto:paula_ctc@hotmail.es" className="about__detail about__detail--link">
                <Mail size={16} strokeWidth={1.5} />
paulact39@gmail.com
              </a>
              <a href="tel:722439479" className="about__detail about__detail--link">
                <Phone size={16} strokeWidth={1.5} />
                722 439 479
              </a>
              <span className="about__detail">
                <MapPin size={16} strokeWidth={1.5} />
                Cádiz — trabajando en remoto para toda España
              </span>
            </div>

            <div className="about__cta-row">
              <Link to="/proyectos" className="btn btn--primary">Ver los proyectos</Link>
              <Link to="/contacto" className="btn btn--ghost">Hablemos</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
