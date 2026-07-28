import WhatsAppIcon from "./icons/WhatsAppIcon.jsx";

const WA_NUMBER = "34722439479";
const WA_TEXT = encodeURIComponent("Hola, me interesa automatizar mi negocio. ¿Me puedes informar?");

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-fab"
      aria-label="Contactar por WhatsApp"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
