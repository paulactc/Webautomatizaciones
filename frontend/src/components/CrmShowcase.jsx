export default function CrmShowcase() {
  return (
    <section className="crm-showcase">
      <div className="container">
        <h2 className="section-title crm-showcase__title">
          Así se ve tu CRM en acción
        </h2>
        <p className="section-subtitle crm-showcase__subtitle">
          Panel real implantado para un cliente — gestionando citas, clientes y mensajes en un solo sitio
        </p>
        <div className="crm-showcase__frame">
          <img
            src="/images/CRMALOJAMIENTOS.png"
            alt="Dashboard del CRM implantado — panel de gestión de clientes y citas"
            className="crm-showcase__img"
          />
        </div>
      </div>
    </section>
  );
}
