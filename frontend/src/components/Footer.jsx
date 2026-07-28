import { Mail } from "lucide-react";
import WhatsAppIcon from "./icons/WhatsAppIcon.jsx";
import LinkedInIcon from "./icons/LinkedInIcon.jsx";

const WA_NUMBER = "34722439479";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copy">
        © {new Date().getFullYear()} Paula Castillo Toldos — Automatización con IA
      </p>
      <div className="footer__links">
        <a
          href={`https://wa.me/${WA_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
        >
          <WhatsAppIcon size={22} />
        </a>
        <a href="mailto:paulact39@gmail.com" aria-label="Email">
          <Mail size={22} strokeWidth={1.5} />
        </a>
        <a
          href="https://www.linkedin.com/in/paula-castillo-toldos"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <LinkedInIcon size={22} />
        </a>
      </div>
    </footer>
  );
}
