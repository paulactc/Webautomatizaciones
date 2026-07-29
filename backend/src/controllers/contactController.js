const { sendMail } = require("../services/mailer");

async function sendContactEmail(req, res) {
  const { name, email, business, phone, message } = req.body;

  try {
    await sendMail({
      from: process.env.SMTP_FROM || "Portfolio <paulact39@gmail.com>",
      to: process.env.CONTACT_EMAIL || "paulact39@gmail.com",
      replyTo: `${name} <${email}>`,
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
