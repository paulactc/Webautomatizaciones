const transporter = require("../services/mailer");

const OMNIROUTE_URL = process.env.OMNIROUTE_URL || "http://localhost:20128/v1";

const SYSTEM_PROMPT = `Eres el asistente virtual de Automatiza.ia, servicio de automatización con IA y CRM para pymes y autónomos.

Sobre Automatiza.ia:
- Automatizamos la atención al cliente y la gestión de citas con inteligencia artificial
- Ofrecemos CRM, agentes de IA para WhatsApp, respuestas automáticas y seguimiento de clientes
- Trabajamos con peluquerías, clínicas, talleres, inmobiliarias, academias y cualquier pyme o autónomo
- Packs cerrados desde 500€ + 50€/mes, sin sorpresas ni permanencia

Planes:
- Pack Base (500€ + 50€/mes): CRM + agente de citas + respuestas frecuentes
- Pack Avanzado (850€ + 75€/mes): Todo lo del Base + agente IA personalizado + automatización de presupuestos
- Pack a Medida (desde 1.200€): Automatización completa a medida
- Página web opcional: +250€ en cualquier pack

Cómo funciona:
1. Hablamos (llamada o WhatsApp gratuito)
2. Lo montamos (implementación en 3-5 días)
3. Tu negocio trabaja solo

Responde siempre en español, de forma amigable y concisa (máximo 3-4 frases por respuesta).

REGLAS PARA CAPTAR CONTACTOS:
- Cuando el visitante muestre interés concreto (pregunta por precio, plazos, cómo empezar, si automatizamos X cosa específica, o pide presupuesto), pídele amablemente su nombre, negocio y teléfono para que le contactemos.
- Solo pide los datos UNA vez. Si ya los tiene, no los vuelvas a pedir.
- Una vez que el visitante te haya dado TANTO su nombre COMO su email o teléfono, incluye al final de tu respuesta, en una línea separada, este marcador oculto exacto (nunca lo menciones al usuario):
  [LEAD:nombre=NOMBRE,email=EMAIL,interes=RESUMEN_BREVE]
  Sustituye NOMBRE, EMAIL y RESUMEN_BREVE con los datos reales de la conversación.
- No inventes precios específicos para sectores. Di que los packs están cerrados y que se pueden consultar en la web.`;

// Extrae y elimina el marcador [LEAD:...] del texto de la IA
function extractLead(text) {
  const match = text.match(/\[LEAD:nombre=([^,\]]+),email=([^,\]]+),interes=([^\]]+)\]/);
  if (!match) return { lead: null, clean: text };
  const clean = text.replace(match[0], "").replace(/\n{3,}/g, "\n\n").trim();
  return {
    lead: { nombre: match[1].trim(), email: match[2].trim(), interes: match[3].trim() },
    clean,
  };
}

async function sendLeadEmail(lead) {
  await transporter.sendMail({
    from: `"Automatiza.ia Chatbot" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    subject: `[Lead Chatbot] ${lead.nombre} está interesado/a`,
    html: `
      <h2 style="color:#c9284f">Nuevo lead captado por el chatbot</h2>
      <p><strong>Nombre:</strong> ${lead.nombre}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Interés:</strong> ${lead.interes}</p>
      <hr>
      <p style="color:#888;font-size:0.85em">Este contacto se ha captado automáticamente desde el chat del portfolio.</p>
    `,
  });
}

async function handleChat(req, res) {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages requerido" });
  }

  if (!process.env.OMNIROUTE_URL) {
    console.warn("OMNIROUTE_URL no configurado");
    return res.status(502).json({
      reply: "Lo siento, el servicio de IA no está disponible en este momento. Escríbeme a paula_ctc@hotmail.es o por WhatsApp y te atiendo personalmente.",
      leadCaptured: false,
    });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(`${OMNIROUTE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OMNIROUTE_API_KEY || "omniroute"}`,
      },
      body: JSON.stringify({
        model: "auto/best-free",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 350,
        stream: false,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      const err = await response.text();
      console.error("OmniRoute error:", err);
      return res.status(502).json({
        reply: "El servicio de IA está temporalmente fuera de servicio. Inténtalo de nuevo más tarde o contáctame directamente.",
        leadCaptured: false,
      });
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content ?? "No pude generar una respuesta.";

    const { lead, clean } = extractLead(raw);

    if (lead) {
      if (!transporter) {
        console.warn("SMTP no configurado — lead capturado pero no notificado por email");
      } else {
        sendLeadEmail(lead).catch((err) => console.error("Error enviando lead:", err));
      }
    }

    res.json({ reply: clean, leadCaptured: !!lead });
  } catch (err) {
    console.error("Chat error:", err);
    const msg = err.name === "AbortError"
      ? "El servicio de IA tardó demasiado en responder. Inténtalo de nuevo."
      : "Error de conexión con el servicio de IA. Inténtalo de nuevo.";
    res.status(502).json({ reply: msg, leadCaptured: false });
  }
}

module.exports = { handleChat };
