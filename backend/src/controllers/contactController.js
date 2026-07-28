const transporter = require("../services/mailer");

async function sendContactEmail(req, res) {
  const { name, email, business, phone, message } = req.body;

  try {
    if (!transporter) {
      console.warn("SMTP no configurado — omitiendo envío de email");
      return res.json({ ok: true, notice: "Mensaje recibido (email no enviado: SMTP sin configurar)" });
    }
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `[Portfolio] Mensaje de ${name}`,
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${business ? `<p><strong>Negocio:</strong> ${business}</p>` : ""}
        ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ""}
        <p><strong>Quiere automatizar:</strong></p>
        <p>${(message || "").replace(/\n/g, "<br>")}</p>
      `,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error("Error enviando email:", err);
    res.status(500).json({ error: "Error al enviar el mensaje" });
  }
}

module.exports = { sendContactEmail };
