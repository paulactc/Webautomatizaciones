const { sendMail } = require("../services/mailer");

const AI_API_URL = process.env.AI_API_URL || "https://api.groq.com/openai/v1";
const AI_API_KEY = process.env.AI_API_KEY;
const CHAT_MODEL = process.env.CHAT_MODEL || "llama-3.3-70b-versatile";

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

REGLAS PARA CAPTAR LEADS:
- Cuando el visitante muestre interés concreto (pregunta por precio, plazos, cómo empezar, si automatizamos X cosa específica, o pide presupuesto), pídele amablemente su nombre y email o teléfono.
- Solo pide los datos UNA vez. Si ya los tiene, no los vuelvas a pedir.
- Cuando tengas nombre Y (email o teléfono), usa la herramienta register_lead para registrar el lead. Antes de llamarla, confirma con el usuario: "¿Quieres que te contactemos?".
- No inventes precios específicos para sectores. Usa la herramienta get_plans si te preguntan por precios detallados.`;

const tools = [
  {
    type: "function",
    function: {
      name: "get_plans",
      description: "Obtiene la información detallada de los planes y precios de Automatiza.ia",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "register_lead",
      description: "Registra un lead con los datos del visitante cuando ha mostrado interés y ha proporcionado voluntariamente su nombre y email o teléfono. Solo llamar después de que el usuario haya confirmado explícitamente que quiere que le contactemos.",
      parameters: {
        type: "object",
        properties: {
          nombre: { type: "string", description: "Nombre completo del interesado" },
          email: { type: "string", description: "Email del interesado" },
          telefono: { type: "string", description: "Teléfono del interesado" },
          interes: { type: "string", description: "Resumen breve de lo que le interesa o el servicio sobre el que pregunta" },
        },
        required: ["nombre", "interes"],
      },
    },
  },
];

class GroqError extends Error {
  constructor(body, status) {
    super(`Groq API error: ${status}`);
    this.name = "GroqError";
    this.status = status;
    this.body = body;
  }
}

async function callGroq(messages, opts = {}) {
  const body = {
    model: CHAT_MODEL,
    messages,
    max_tokens: 600,
    temperature: 0.5,
  };

  if (opts.tools) {
    body.tools = opts.tools;
    body.tool_choice = "auto";
  }

  const response = await fetch(`${AI_API_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_API_KEY}`,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(20000),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new GroqError(errBody, response.status);
  }

  return response.json();
}

function getPlanInfo() {
  return {
    planes: [
      { nombre: "Pack Base", precio: "500€ + 50€/mes", incluye: "CRM + agente de citas + respuestas frecuentes" },
      { nombre: "Pack Avanzado", precio: "850€ + 75€/mes", incluye: "Todo lo del Base + agente IA personalizado + automatización de presupuestos" },
      { nombre: "Pack a Medida", precio: "desde 1.200€", incluye: "Automatización completa a medida" },
    ],
    web_opcional: "+250€ en cualquier pack",
    como_funciona: ["1. Hablamos (llamada o WhatsApp gratuito)", "2. Lo montamos (implementación en 3-5 días)", "3. Tu negocio trabaja solo"],
  };
}

async function registerLead({ nombre, email, telefono, interes }) {
  try {
    const to = process.env.CONTACT_EMAIL || "paulact39@gmail.com";

    await sendMail({
      from: process.env.SMTP_FROM || "Automatiza.ia Chatbot <paulact39@gmail.com>",
      to,
      subject: `[Lead Chatbot] ${nombre} está interesado/a`,
      html: `
        <h2 style="color:#c9284f">Nuevo lead captado por el chatbot</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
        ${telefono ? `<p><strong>Teléfono:</strong> ${telefono}</p>` : ""}
        <p><strong>Interés:</strong> ${interes || "No especificado"}</p>
        <hr>
        <p style="color:#888;font-size:0.85em">Lead captado automáticamente desde el chat vía tool calling.</p>
      `,
    });

    return { ok: true };
  } catch (err) {
    console.error("Error enviando email de lead:", err);
    return { ok: true, notice: "Datos recibidos (fallo al enviar email, pero los datos quedaron registrados)" };
  }
}

async function handleChat(req, res) {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages requerido", reply: "Error de solicitud.", leadCaptured: false });
  }

  if (!AI_API_KEY || AI_API_KEY.startsWith("cambia_esto")) {
    console.warn("AI_API_KEY no configurada");
    return res.json({
      reply: "Lo siento, el asistente no está disponible ahora. Escríbeme a paula_ctc@hotmail.es o por WhatsApp y te atiendo yo personalmente.",
      leadCaptured: false,
    });
  }

  try {
    const fullMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ];

    const data = await callGroq(fullMessages, { tools });
    const message = data.choices?.[0]?.message;

    if (!message) {
      return res.json({ reply: "No pude generar una respuesta. Escríbeme a paula_ctc@hotmail.es y te atiendo directamente.", leadCaptured: false });
    }

    if (!message.tool_calls) {
      return res.json({ reply: message.content || "No pude generar una respuesta.", leadCaptured: false });
    }

    let leadCaptured = false;
    const toolResults = [];

    for (const call of message.tool_calls) {
      let args = {};
      try {
        args = JSON.parse(call.function.arguments);
      } catch {
        args = {};
      }

      let result;
      switch (call.function.name) {
        case "get_plans":
          result = getPlanInfo();
          break;
        case "register_lead":
          result = await registerLead(args);
          leadCaptured = !!result.ok;
          break;
        default:
          result = { error: `Tool desconocida: ${call.function.name}` };
      }

      toolResults.push({
        role: "tool",
        tool_call_id: call.id,
        content: JSON.stringify(result),
      });
    }

    const messagesWithTools = [...fullMessages, message, ...toolResults];
    const data2 = await callGroq(messagesWithTools);
    const reply = data2.choices?.[0]?.message?.content ?? "No pude generar una respuesta final.";

    return res.json({ reply, leadCaptured });
  } catch (err) {
    if (err.name === "GroqError") {
      console.error("Groq API error:", err.status, err.body);
    } else {
      console.error("Chat internal error:", err);
    }

    return res.json({
      reply: "El asistente está descansando un momento. Escríbeme a paula_ctc@hotmail.es o por WhatsApp y te respondo ya.",
      leadCaptured: false,
    });
  }
}

module.exports = { handleChat };
