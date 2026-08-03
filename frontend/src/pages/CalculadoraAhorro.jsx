import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Clock, Euro, TrendingUp, Wallet, ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";
import { Link } from "react-router";

const fmt = (n) =>
  new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 }).format(Math.round(n * 10) / 10);

const QUESTIONS = [
  {
    id: "mensajes",
    label: "¿Cuántos mensajes te llegan a la semana?",
    min: 10,
    max: 500,
    step: 10,
    format: (v) => `${v}`,
  },
  {
    id: "minutos",
    label: "¿Cuántos minutos tardas en responder cada mensaje?",
    min: 1,
    max: 15,
    step: 1,
    format: (v) => `${v} min`,
  },
  {
    id: "costeHora",
    label: "¿Cuánto vale tu hora de trabajo?",
    min: 8,
    max: 60,
    step: 1,
    format: (v) => `${v} €/h`,
  },
  {
    id: "citasPerdidas",
    label: "Citas o ventas que pierdes al mes",
    min: 0,
    max: 30,
    step: 1,
    format: (v) => `${v}`,
  },
  {
    id: "valorCita",
    label: "¿Cuánto vale cada cita?",
    min: 10,
    max: 150,
    step: 5,
    format: (v) => `${v} €`,
  },
];

const CUOTA_MENSUAL = 50;

const INITIAL = {
  mensajes: 80,
  minutos: 5,
  costeHora: 20,
  citasPerdidas: 8,
  valorCita: 30,
};

export default function CalculadoraAhorro() {
  const [values, setValues] = useState(INITIAL);
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);

  const { mensajes, minutos, costeHora, citasPerdidas, valorCita } = values;
  const cuota = CUOTA_MENSUAL;

  const horasSemana = (mensajes * minutos) / 60;
  const horasMes = horasSemana * 4.33;
  const ahorroTiempo = horasMes * costeHora;
  const ahorroCitas = citasPerdidas * valorCita * 0.5;
  const ahorroTotal = ahorroTiempo + ahorroCitas;
  const neto = ahorroTotal - cuota;
  const retorno = cuota > 0 ? ahorroTotal / cuota : 0;

  const question = QUESTIONS[step];

  const restart = () => {
    setStep(0);
    setFinished(false);
  };

  return (
    <section className="page-section">
      <div className="container">
        <h2 className="section-title">Descubre tu potencial de ahorro</h2>
        <p className="section-subtitle">
          Calcula cuánto tiempo y dinero recuperas al automatizar tu atención al cliente.
        </p>

        {!finished ? (
          <div className="calcwiz">
            <div className="calcwiz__progress">
              <span className="calcwiz__step">
                {step + 1} / {QUESTIONS.length}
              </span>
              <div className="calcwiz__bar">
                <span
                  className="calcwiz__bar-fill"
                  style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="calcwiz__card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  className="calcwiz__question"
                  initial={{ opacity: 0, x: 48 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -48 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <h3 className="calcwiz__label">{question.label}</h3>
                  <span className="calcwiz__value">{question.format(values[question.id])}</span>
                  <input
                    type="range"
                    min={question.min}
                    max={question.max}
                    step={question.step}
                    value={values[question.id]}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [question.id]: Number(e.target.value) }))
                    }
                  />
                </motion.div>
              </AnimatePresence>

              <div className="calcwiz__actions">
                {step > 0 ? (
                  <button className="btn btn--ghost" onClick={() => setStep((s) => s - 1)}>
                    <ArrowLeft size={16} /> Atrás
                  </button>
                ) : (
                  <span />
                )}
                {step < QUESTIONS.length - 1 ? (
                  <button className="btn btn--primary calcwiz__next" onClick={() => setStep((s) => s + 1)}>
                    Siguiente <ArrowRight size={16} strokeWidth={2.5} />
                  </button>
                ) : (
                  <button className="btn btn--primary calcwiz__next" onClick={() => setFinished(true)}>
                    Ver mi ahorro <ArrowRight size={16} strokeWidth={2.5} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="calcwiz__results">
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

              {citasPerdidas > 0 && (
                <div className="roi__result">
                  <span className="roi__result-icon"><Wallet size={20} strokeWidth={2} /></span>
                  <div>
                    <span className="roi__result-value">{fmt(ahorroCitas)} €/mes</span>
                    <span className="roi__result-label">recuperados en citas (50% menos pérdidas)</span>
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
                  <span className="roi__result-label">beneficio neto con cuota desde 50 €/mes</span>
                </div>
              </div>

              <div className="roi__roi">
                <span className="roi__roi-value">{fmt(retorno)}x</span>
                <span className="roi__roi-label">veces que tu inversión se paga sola al mes</span>
              </div>

              <p className="roi__note">
                Estimación orientativa con una reducción del 50% de citas perdidas y respuesta automática en
                menos de 1 min. Cada negocio es distinto: te lo calculamos con tus datos reales.
              </p>

              <div className="calcwiz__results-actions">
                <button className="btn btn--ghost" onClick={restart}>
                  <RotateCcw size={16} /> Volver a calcular
                </button>
                <Link to="/demo" className="btn btn--primary">
                  Calcularlo con mis datos <ArrowRight size={16} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
