import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

const WELCOME =
  "¡Hola! Soy un asistente con IA de Coworker IA. Te ayudo con información sobre servicios, proyectos y cómo empezar.";

function renderText(text) {
  if (!text) return null;
  return String(text).split("\n").map((line, li, arr) => (
    <span key={li}>
      {line.split(/(\*\*[^*]+\*\*)/g).map((part, pi) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={pi}>{part.slice(2, -2)}</strong>
        ) : (
          part
        )
      )}
      {li < arr.length - 1 && <br />}
    </span>
  ));
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: WELCOME }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = [...messages, userMsg].filter((m) => m.role !== "system");
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();

      const reply = data.reply || "Lo siento, no pude procesar tu pregunta.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);

      if (data.leadCaptured) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "He notificado a Coworker IA con tus datos. Te contactarán lo antes posible.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error de conexión. Inténtalo de nuevo." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-widget__window">
          <div className="chat-widget__header">
            <div className="chat-widget__header-info">
              <Bot size={20} strokeWidth={2} />
              <span>Asistente de Coworker IA</span>
              <span className="chat-widget__ai-badge">IA</span>
            </div>
            <button
              className="chat-widget__close"
              onClick={() => setOpen(false)}
              aria-label="Cerrar chat"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>

          <div className="chat-widget__messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-widget__msg chat-widget__msg--${msg.role}`}>
                {renderText(msg.content)}
              </div>
            ))}
            {loading && (
              <div className="chat-widget__msg chat-widget__msg--assistant chat-widget__msg--loading">
                <span />
                <span />
                <span />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form className="chat-widget__form" onSubmit={sendMessage}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              disabled={loading}
              autoFocus
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Enviar">
              <Send size={18} strokeWidth={2} />
            </button>
          </form>
          <p className="chat-widget__disclaimer">
            Asistente con IA · Puede cometer errores. Para asuntos importantes, usa WhatsApp.
          </p>
        </div>
      )}

      <button
        className={`chat-widget__fab${open ? " chat-widget__fab--open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
      >
        {open ? <X size={24} strokeWidth={2.5} /> : <MessageCircle size={28} strokeWidth={2} />}
      </button>
    </div>
  );
}
