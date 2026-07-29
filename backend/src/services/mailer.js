const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

function parseFrom(from) {
  const match = from.match(/^"?(.+?)"?\s*<(.+?)>$/);
  if (match) return { name: match[1].trim(), email: match[2] };
  return { name: "", email: from };
}

async function sendMail(opts) {
  if (!BREVO_API_KEY) {
    console.warn("BREVO_API_KEY no configurada — email no enviado");
    return;
  }

  const sender = parseFrom(opts.from);
  const to = Array.isArray(opts.to) ? opts.to : [{ email: opts.to }];
  const replyTo = opts.replyTo ? parseFrom(opts.replyTo) : undefined;

  const body = {
    sender,
    to,
    subject: opts.subject,
    htmlContent: opts.html,
  };

  if (replyTo) body.replyTo = replyTo;

  const response = await fetch(BREVO_URL, {
    method: "POST",
    headers: {
      "api-key": BREVO_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("Brevo error:", response.status, err);
    throw new Error(`Brevo API error: ${response.status}`);
  }
}

module.exports = { sendMail };
