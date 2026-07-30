const clients = [
  { name: "EmRider Suspensions", img: "/images/emriderlogo.jpg" },
  { name: "Nortea Gestión Turística", img: "/images/nortealogo.jpg" },
  { name: "Yoga Tierra Viva", img: "/images/Yogatierravivalogo.svg" },
];

import { MessageCircle } from "lucide-react";

export default function ClientLogos() {
  return (
    <section className="clients-section">
      <div className="container">
        <p className="clients-section__label">Casos de éxito recientes</p>
        <div className="clients-section__grid">
          {clients.map((c) => (
            <div key={c.name} className="clients-section__logo">
              <img
                src={c.img}
                alt={c.name}
                className="clients-section__img"
              />
            </div>
          ))}
        </div>
        <a href="#testimonios" className="clients-section__cta">
          <MessageCircle size={18} strokeWidth={1.5} />
          Lo que dicen mis clientes
        </a>
      </div>
    </section>
  );
}
