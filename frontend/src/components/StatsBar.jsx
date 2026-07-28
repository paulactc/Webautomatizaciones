const stats = [
  { value: "80", label: "clientes atendidos al mes" },
  { value: "0", label: "mensajes sin responder" },
  { value: "24/7", label: "disponibilidad automática" },
  { value: "3-5", label: "días hasta estar activo" },
];

export default function StatsBar() {
  return (
    <section className="page-section case-study">
      <div className="container container--narrow">
        <div className="case-study__header">
          <span className="tag">Caso real</span>
          <h2 className="section-title">EmRider Suspensions</h2>
          <p className="case-study__lead">
            Un taller de motos que pasó de perder mensajes a atender a <strong>80 clientes al mes</strong> sin intervenir.
          </p>
        </div>

        <div className="stats-bar">
          <div className="stats-bar__grid">
            {stats.map(({ value, label }) => (
              <div key={label} className="stats-bar__item">
                <span className="stats-bar__value">{value}</span>
                <span className="stats-bar__label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="case-study__quote">
          "Antes tardaba horas en contestar presupuestos. Ahora el cliente recibe respuesta en segundos y yo solo veo los que me interesan."
        </p>
      </div>
    </section>
  );
}
