const messages = [
  { id: 1, role: "user", text: "Hola, ¿podríais cambiarme la cita del jueves?", time: "17:42", check: true },
  { id: 2, role: "assistant", text: "Hola Marta 👋 Veo que tienes la limpieza dental el jueves a las 17:00. ¿Te paso huecos para la semana siguiente?", time: "17:42" },
  { id: 3, role: "user", text: "Sí, mejor el lunes", time: "17:43", check: true },
  { id: 4, role: "assistant", text: "Tengo el lunes 12 a las 17:00 o el martes 13 a las 11:00. ¿Cuál te encaja?", time: "17:43" },
  { id: 5, role: "user", text: "El lunes 12 a las 17:00", time: "17:44", check: true },
  { id: 6, role: "assistant", text: "✅ Confirmado. Tu cita queda el lunes 12 a las 17:00. Te recuerdo 24 h antes.", time: "17:44" },
];

export default function HeroChatMock() {
  return (
    <div className="herochat">
      <div className="herochat__header">
        <span className="herochat__avatar">Taller</span>
        <div className="herochat__meta">
          <span className="herochat__name">Mi negocio</span>
          <span className="herochat__status">
            <span className="herochat__dot" /> en línea · atiende solo
          </span>
        </div>
        <span className="herochat__badge">IA</span>
      </div>

      <div className="herochat__date">Hoy</div>

      <div className="herochat__body">
        {messages.map((msg, i) => (
          <div key={msg.id} className={`herochat__row herochat__row--${msg.role}`}>
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
            <span className={`herochat__typing herochat__typing--${i % 2 === 0 ? "on" : "off"}`}>
              <i /><i /><i />
            </span>
          </div>
        ))}
      </div>

      <div className="herochat__footer">
        <span className="herochat__reply">Un asistente con IA está respondiendo…</span>
      </div>
    </div>
  );
}
