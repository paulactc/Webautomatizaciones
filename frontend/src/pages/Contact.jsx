import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import WhatsAppIcon from "../components/icons/WhatsAppIcon.jsx";

const WA_NUMBER = "34722439479";
const WA_TEXT = encodeURIComponent("Hola, me interesa automatizar mi negocio. ¿Me puedes informar?");

const INITIAL = { name: "", business: "", phone: "", automate: "" };

export default function Contact() {
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
        body: JSON.stringify({ ...form, topic: "automatizacion" }),
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
        <h2 className="section-title">Hablemos</h2>
        <p className="section-subtitle">
          Cuéntanos qué quieres automatizar y te respondemos en menos de 24 h.
        </p>

        {status === "success" ? (
          <div className="contact__success">
            <CheckCircle2 size={48} strokeWidth={1.5} />
            <p>Mensaje enviado. Te contactaremos pronto.</p>
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
              Escríbenos por WhatsApp
            </a>

            <div className="contact__divider">
              <span>o déjanos tus datos</span>
            </div>

            <form className="contact__form" onSubmit={handleSubmit}>
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
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Tu número de teléfono"
                />
              </div>
              <div className="form-group">
                <label htmlFor="automate">¿Qué quieres automatizar?</label>
                <input
                  id="automate"
                  name="automate"
                  type="text"
                  required
                  value={form.automate}
                  onChange={handleChange}
                  placeholder="Ej: citas, respuestas, presupuestos..."
                />
              </div>
              {status === "error" && (
                <p className="contact__error">Error al enviar. Inténtalo de nuevo.</p>
              )}
              <div className="contact__form-footer">
                <button type="submit" className="btn btn--primary" disabled={status === "loading"}>
                  <Send size={20} strokeWidth={2} />
                  {status === "loading" ? "Enviando..." : "Enviar"}
                </button>
                <span className="contact__guarantee">
                  <CheckCircle2 size={15} strokeWidth={2} />
                  Sin compromiso. Respondemos en menos de 24 h.
                </span>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
