import { useState } from "react";
import { Send, CheckCircle2, MessageCircle } from "lucide-react";
import WhatsAppIcon from "../components/icons/WhatsAppIcon.jsx";

const WA_NUMBER = "34600000000";
const WA_TEXT = encodeURIComponent("Hola, quiero una demo de 20 min. ¿Cuándo podemos hablar?");

const SECTORS = [
  "Clínica / salud",
  "Estética / peluquería / barbería",
  "Taller / automoción",
  "Hotel / alojamiento",
  "Despacho / asesoría",
  "Comercio / tienda",
  "Otro sector",
];

const INITIAL = { name: "", business: "", email: "", phone: "", sector: "", message: "" };

const demoExamples = [
  "Respuestas a tus clientes con tu tono, 24/7",
  "Gestión de citas y recordatorios en la conversación",
  "Reactivación de clientes y petición de reseñas",
  "El panel con todas tus conversaciones centralizadas",
];

export default function Demo() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState("idle");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          business: form.business,
          phone: form.phone,
          message: `Solicitud de demo.\nSector: ${form.sector}\nQuiere: ${form.message}`,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm(INITIAL);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="page-section">
      <div className="container container--narrow">
        <h2 className="section-title">Pide tu demo de 20 minutos</h2>
        <p className="section-subtitle">
          Sin compromiso y sin email obligatorio. Te enseñamos ejemplos de cómo funcionaría con tu negocio.
        </p>

        <div className="demo__intro">
          <div className="demo__intro-icon">
            <MessageCircle size={26} strokeWidth={1.5} />
          </div>
          <p className="demo__intro-title">¿Qué verás en la demo?</p>
          <ul className="demo__intro-list">
            {demoExamples.map((item) => (
              <li key={item}>
                <CheckCircle2 size={16} strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {status === "success" ? (
          <div className="contact__success">
            <CheckCircle2 size={48} strokeWidth={1.5} />
            <p>¡Recibido! Te contactaremos en menos de 24 h para cuadrar tu demo.</p>
          </div>
        ) : (
          <>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`}
              target="_blank"
              rel="noreferrer"
              className="contact__wa-btn"
            >
              <WhatsAppIcon size={24} />
              O escríbenos directo por WhatsApp
            </a>

            <div className="contact__divider">
              <span>o deja tus datos y te llamamos</span>
            </div>

            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="demo__row">
                <div className="form-group">
                  <label htmlFor="name">Nombre</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="business">Negocio</label>
                  <input
                    id="business"
                    name="business"
                    type="text"
                    required
                    value={form.business}
                    onChange={handleChange}
                    placeholder="Nombre de tu negocio"
                  />
                </div>
              </div>
              <div className="demo__row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Tu email (opcional)"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Teléfono</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Tu teléfono o WhatsApp"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="sector">Sector de tu negocio</label>
                <select
                  id="sector"
                  name="sector"
                  required
                  value={form.sector}
                  onChange={handleChange}
                  className="demo__select"
                >
                  <option value="" disabled>Selecciona tu sector</option>
                  {SECTORS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">¿Qué te gustaría automatizar?</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Ej: gestionar citas por WhatsApp, responder consultas, recordatorios..."
                  rows={3}
                />
              </div>
              {status === "error" && (
                <p className="contact__error">Error al enviar. Inténtalo de nuevo.</p>
              )}
              <div className="contact__form-footer">
                <button type="submit" className="btn btn--primary" disabled={status === "loading"}>
                  <Send size={20} strokeWidth={2} />
                  {status === "loading" ? "Enviando..." : "Solicitar demo"}
                </button>
                <span className="contact__guarantee">
                  <CheckCircle2 size={15} strokeWidth={2} />
                  Sin compromiso · Respondemos en menos de 24 h
                </span>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
