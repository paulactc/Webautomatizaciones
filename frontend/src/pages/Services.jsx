import { Globe, Bot, MessageCircle, Layout, Target } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Páginas web y plataformas",
    description:
      "Desde una landing page hasta una plataforma con área privada y suscripción. Diseño limpio, responsive y orientado a convertir visitas en clientes.",
  },
  {
    icon: Bot,
    title: "Automatización con IA",
    description:
      "Flujos automáticos que ahorran tiempo: generación de mensajes, clasificación de consultas, respuestas inteligentes y procesos que antes requerían intervención humana.",
  },
  {
    icon: MessageCircle,
    title: "Agentes de IA en WhatsApp",
    description:
      "Un agente que atiende a tus clientes las 24 h, responde preguntas frecuentes, informa del estado de pedidos o servicios y gestiona citas — sin que tengas que estar pendiente.",
  },
  {
    icon: Layout,
    title: "Backoffice y paneles de gestión",
    description:
      "Herramientas internas a medida para que tú y tu equipo gestionéis el negocio desde una sola pantalla: estados, clientes, notificaciones y control total.",
  },
  {
    icon: Target,
    title: "CRM de leads para campañas en Meta",
    description:
      "Conectamos tus campañas de Facebook e Instagram Ads a un CRM propio: cada lead entra automáticamente, sin perderse, con base de datos centralizada y métricas de resultados para hacer seguimiento a tus futuros clientes y medir qué campañas convierten.",
  },
];

export default function Services() {
  return (
    <section className="page-section" id="servicios">
      <div className="container">
        <h2 className="section-title">Servicios</h2>
        <p className="section-subtitle">
          Páginas web, agentes de IA y CRM para captar más clientes y no perder ninguno.
        </p>
        <div className="services__grid">
          {services.map(({ icon: Icon, title, description }) => (
            <div key={title} className="service-card">
              <Icon size={36} strokeWidth={1.5} className="service-card__icon" />
              <h3 className="service-card__title">{title}</h3>
              <p className="service-card__desc">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
