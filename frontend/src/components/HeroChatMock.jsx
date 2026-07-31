import { useEffect, useRef, useState } from "react";

const messages = [
  { id: 1, role: "user", text: "Hola, ¿podríais cambiarme la cita del jueves?", time: "17:42", check: true },
  { id: 2, role: "assistant", text: "Hola Marta 👋 Veo que tenéis la revisión de Luka, vuestro perro, el jueves a las 17:00 con la Dra. Sánchez. ¿Te paso huecos para la semana que viene?", time: "17:42" },
  { id: 3, role: "user", text: "Sí, mejor el lunes", time: "17:43", check: true },
  { id: 4, role: "assistant", text: "Tengo el lunes 12 a las 17:00 o el martes 13 a las 11:00. ¿Cuál te encaja?", time: "17:43" },
  { id: 5, role: "user", text: "El lunes 12 a las 17:00", time: "17:44", check: true },
  { id: 6, role: "assistant", text: "✅ Confirmado. La revisión de Luka queda el lunes 12 a las 17:00 en Clínica Veterinaria Patitas. Te recuerdo 24 h antes.", time: "17:44" },
];

const SHOW_MS = 1600;
const TYPING_MS = 850;
const PAUSE_MS = 4500;

export default function HeroChatMock() {
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [run, setRun] = useState(0);
  const timers = useRef([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setCount(0);
    setTyping(false);

    let t = 400;
    messages.forEach((msg) => {
      if (msg.role === "assistant") {
        timers.current.push(setTimeout(() => setTyping(true), t));
        t += TYPING_MS;
      }
      timers.current.push(setTimeout(() => {
        setTyping(false);
        setCount(msg.id);
      }, t));
      t += SHOW_MS;
    });

    timers.current.push(setTimeout(() => setRun((r) => r + 1), t + PAUSE_MS));

    return () => timers.current.forEach(clearTimeout);
  }, [run]);

  const visible = messages.filter((m) => m.id <= count);

  return (
    <div className="herochat">
      <div className="herochat__header">
        <span className="herochat__avatar">Vet</span>
        <div className="herochat__meta">
          <span className="herochat__name">Clínica Veterinaria Patitas</span>
          <span className="herochat__status">
            <span className="herochat__dot" /> en línea · atiende solo
          </span>
        </div>
        <span className="herochat__badge">IA</span>
      </div>

      <div className="herochat__date">Hoy</div>

      <div className="herochat__body">
        {visible.map((msg) => (
          <div key={msg.id} className={`herochat__row herochat__row--${msg.role}`}>
            <span className="herochat__who">
              {msg.role === "user" ? "Cliente" : "Agente IA"}
            </span>
            <div className="herochat__bubble">
              <p>{msg.text}</p>
              <span className="herochat__time">
                {msg.time}
                {msg.role === "user" && (
                  <span className="herochat__check">
                    {msg.check ? "✓✓" : "✓"}
                  </span>
                )}
              </span>
            </div>
          </div>
        ))}
        {typing && (
          <div className="herochat__row herochat__row--assistant">
            <span className="herochat__typing">
              <i /><i /><i />
            </span>
          </div>
        )}
      </div>

      <div className="herochat__footer">
        <span className="herochat__reply">Un asistente con IA está respondiendo…</span>
      </div>
    </div>
  );
}
