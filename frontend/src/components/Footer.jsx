import { Mail, MapPin, FileText } from "lucide-react";
import { Link } from "react-router";
import WhatsAppIcon from "./icons/WhatsAppIcon.jsx";
import LinkedInIcon from "./icons/LinkedInIcon.jsx";

const WA_NUMBER = "34722439479";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <p className="footer__brand-name">Coworker IA</p>
            <p className="footer__brand-desc">
              Automatización con IA para negocios que no pueden perder oportunidades.
            </p>
            <p className="footer__brand-legal">
              Paula Castillo Toldos (autónoma) · Cádiz, España
              <br />
              NIF: [pendiente de rellenar]
            </p>
          </div>

          <div className="footer__nav">
            <p className="footer__nav-title">Empresa</p>
            <Link to="/servicios" className="footer__nav-link">Servicios</Link>
            <Link to="/blog" className="footer__nav-link">Blog</Link>
            <Link to="/demo" className="footer__nav-link">Demo de 20 min</Link>
            <Link to="/calculadora-ahorro" className="footer__nav-link">Potencial de ahorro</Link>
            <Link to="/sobre-mi" className="footer__nav-link">Sobre mí</Link>
          </div>

          <div className="footer__nav">
            <p className="footer__nav-title">Legal</p>
            <Link to="/legal/aviso-legal" className="footer__nav-link">Aviso Legal</Link>
            <Link to="/legal/politica-privacidad" className="footer__nav-link">Política de Privacidad</Link>
            <Link to="/legal/politica-cookies" className="footer__nav-link">Política de Cookies</Link>
            <Link to="/legal/terminos-servicio" className="footer__nav-link">Términos y Condiciones</Link>
          </div>

          <div className="footer__nav">
            <p className="footer__nav-title">Contacto</p>
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="footer__nav-link footer__nav-link--icon"
            >
              <WhatsAppIcon size={16} /> WhatsApp
            </a>
            <a
              href="mailto:paulact39@gmail.com"
              className="footer__nav-link footer__nav-link--icon"
            >
              <Mail size={16} /> paulact39@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/paula-castillo-toldos"
              target="_blank"
              rel="noreferrer"
              className="footer__nav-link footer__nav-link--icon"
            >
              <LinkedInIcon size={16} /> LinkedIn
            </a>
            <span className="footer__nav-link footer__nav-link--icon">
              <MapPin size={16} /> Cádiz · trabajando en remoto
            </span>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} Coworker IA — Automatización con IA · Paula Castillo Toldos
          </p>
          <p className="footer__copy footer__copy--note">
            <FileText size={13} strokeWidth={2} /> Esta web emplea un asistente de IA en el chat.
            Consulta nuestra <Link to="/legal/politica-privacidad">Política de Privacidad</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
}
