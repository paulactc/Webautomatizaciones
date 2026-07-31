import { useState } from "react";
import { Clock, Euro, TrendingUp, Wallet, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const fmt = (n) =>
  new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 }).format(Math.round(n * 10) / 10);

export default function CalculadoraRoi() {
  const [mensajes, setMensajes] = useState(80);
  const [minutos, setMinutos] = useState(5);
  const [costeHora, setCosteHora] = useState(20);
  const [cuota, setCuota] = useState(75);
  const [noShows, setNoShows] = useState(5);
  const [costeNoShow, setCosteNoShow] = useState(30);

  const horasSemana = (mensajes * minutos) / 60;
  const horasMes = horasSemana * 4.33;
  const ahorroTiempo = horasMes * costeHora;
  const ahorroNoShows = noShows * 4.33 * costeNoShow * 0.5;
  const ahorroTotal = ahorroTiempo + ahorroNoShows;
  const neto = ahorroTotal - cuota;
  const roi = cuota > 0 ? ahorroTotal / cuota : 0;

  return (
    <section className="page-section">
      <div className="container">
        <h2 className="section-title">Calculadora de ROI</h2>
        <p className="section-subtitle">
          ¿Cuánto te cuesta atender a mano? Calcula lo que ahorras con una automatización.
        </p>

        <div className="roi">
          <div className="roi__controls">
            <h3 className="roi__controls-title">Tus números</h3>

            <label className="roi__field">
              <span className="roi__label">
                Mensajes de clientes por semana
                <strong>{mensajes}</strong>
              </span>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={mensajes}
                onChange={(e) => setMensajes(Number(e.target.value))}
              />
            </label>

            <label className="roi__field">
              <span className="roi__label">
                Minutos por respuesta manual
                <strong>{minutos} min</strong>
              </span>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={minutos}
                onChange={(e) => setMinutos(Number(e.target.value))}
              />
            </label>

            <label className="roi__field">
              <span className="roi__label">
                Valor de tu hora de trabajo
                <strong>{costeHora} €/h</strong>
              </span>
              <input
                type="range"
                min="8"
                max="60"
                step="1"
                value={costeHora}
                onChange={(e) => setCosteHora(Number(e.target.value))}
              />
            </label>

            <label className="roi__field">
              <span className="roi__label">
                Cuota mensual del servicio
                <strong>{cuota} €/mes</strong>
              </span>
              <input
                type="range"
                min="0"
                max="300"
                step="5"
                value={cuota}
                onChange={(e) => setCuota(Number(e.target.value))}
              />
            </label>

            <div className="roi__grid2">
              <label className="roi__field">
                <span className="roi__label">
                  Citas perdidas por semana
                  <strong>{noShows}</strong>
                </span>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="1"
                  value={noShows}
                  onChange={(e) => setNoShows(Number(e.target.value))}
                />
              </label>
              <label className="roi__field">
                <span className="roi__label">
                  Valor de cada cita
                  <strong>{costeNoShow} €</strong>
                </span>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="5"
                  value={costeNoShow}
                  onChange={(e) => setCosteNoShow(Number(e.target.value))}
                />
              </label>
            </div>
          </div>

          <div className="roi__results">
            <div className="roi__result roi__result--big">
              <span className="roi__result-icon"><Clock size={20} strokeWidth={2} /></span>
              <div>
                <span className="roi__result-value">{fmt(horasSemana)} h</span>
                <span className="roi__result-label">ahorradas a la semana</span>
              </div>
            </div>

            <div className="roi__result">
              <span className="roi__result-icon"><Euro size={20} strokeWidth={2} /></span>
              <div>
                <span className="roi__result-value">{fmt(ahorroTiempo)} €/mes</span>
                <span className="roi__result-label">en tiempo de atención</span>
              </div>
            </div>

            {noShows > 0 && (
              <div className="roi__result">
                <span className="roi__result-icon"><Wallet size={20} strokeWidth={2} /></span>
                <div>
                  <span className="roi__result-value">{fmt(ahorroNoShows)} €/mes</span>
                  <span className="roi__result-label">recuperados en citas (50% menos no-shows)</span>
                </div>
              </div>
            )}

            <div className="roi__total">
              <span className="roi__total-value">{fmt(ahorroTotal)} €/mes</span>
              <span className="roi__total-label">ahorro estimado total</span>
            </div>

            <div className="roi__result roi__result--neto">
              <span className="roi__result-icon"><TrendingUp size={20} strokeWidth={2} /></span>
              <div>
                <span className="roi__result-value">
                  {neto >= 0 ? "+" : "−"}{fmt(Math.abs(neto))} €/mes
                </span>
                <span className="roi__result-label">beneficio neto frente a la cuota</span>
              </div>
            </div>

            <div className="roi__roi">
              <span className="roi__roi-value">{fmt(roi)}x</span>
              <span className="roi__roi-label">de retorno por cada euro invertido</span>
            </div>

            <p className="roi__note">
              Estimación orientativa con una reducción del 50% de ausencias y respuesta automática en
              menos de 1 min. Cada negocio es distinto: te lo calculamos con tus datos reales.
            </p>

            <Link to="/demo" className="btn btn--primary">
              Calcularlo con mis datos <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
