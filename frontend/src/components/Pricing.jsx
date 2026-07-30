import { Check } from "lucide-react";
import { Link } from "react-router";

const plans = [
  {
    name: "Pack Base",
    price: "500 €",
    monthly: "Desde 50 €/mes",
    highlight: false,
    features: [
      "Panel de gestiones realizadas",
      "Calendario de citas automático",
      "Respuestas automáticas a preguntas frecuentes",
      "Integración con WhatsApp",
    ],
  },
  {
    name: "Pack Avanzado",
    price: "850 €",
    monthly: "Desde 75 €/mes",
    highlight: true,
    features: [
      "Todo lo del Pack Base",
      "Base de datos de clientes con historial de servicios",
      "Segmentación inteligente para campañas de marketing",
    ],
  },
  {
    name: "Pack a Medida",
    price: "Desde 1.200 €",
    monthly: "Consultar",
    highlight: false,
    features: [
      "Automatización completa a tu medida",
      "Múltiples canales integrados",
      "Soporte prioritario",
      "Escalabilidad sin límites",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="page-section pricing-section" id="planes" style={{ scrollMarginTop: 80 }}>
      <div className="container">
        <h2 className="section-title">Planes y precios</h2>
        <p className="section-subtitle">
          Packs cerrados, sin sorpresas. Empiezas por 500 € y creces cuando tu negocio lo necesite.
        </p>

        <div className="pricing__grid">
          {plans.map(({ name, price, monthly, highlight, features }) => (
            <div key={name} className={`pricing-card${highlight ? " pricing-card--highlight" : ""}`}>
              {highlight && <span className="pricing-card__badge">Recomendado</span>}
              <h3 className="pricing-card__name">{name}</h3>
              <div className="pricing-card__price">{price.replace(" +IVA", "")} <span className="pricing-card__iva">+IVA</span></div>
              <div className="pricing-card__monthly">{monthly} <span className="pricing-card__iva">+IVA</span></div>
              <ul className="pricing-card__features">
                {features.map((f) => (
                  <li key={f}>
                    <Check size={16} strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contacto"
                className={`btn ${highlight ? "btn--primary" : "btn--outline"}`}
              >
                Empezar
              </Link>
            </div>
          ))}
        </div>

        <p className="pricing__note">Página web: +250 € <span class="pricing-card__iva">+IVA</span> opcional, en cualquier pack.</p>
      </div>
    </section>
  );
}
