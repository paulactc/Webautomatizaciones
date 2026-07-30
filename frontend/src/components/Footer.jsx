import { Mail, MapPin } from "lucide-react";
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
            <p className="footer__brand-name">Paula Castillo Toldos</p>
            <p className="footer__brand-desc">
              Automatización con IA para negocios que no pueden perder oportunidades.
            </p>
          </div>

          <div className="footer__nav">
            <p className="footer__nav-title">Navegación</p>
            <Link to="/" className="footer__nav-link">Inicio</Link>
            <Link to="/servicios" className="footer__nav-link">Servicios</Link>
            <Link to="/sobre-mi" className="footer__nav-link">Sobre mí</Link>
            <Link to="/contacto" className="footer__nav-link">Contacto</Link>
          </div>

          <div className="footer__nav">
            <p className="footer__nav-title">Servicios</p>
            <a href="/#sectores" className="footer__nav-link">Por sector</a>
            <a href="/#planes" className="footer__nav-link">Planes</a>
            <Link to="/servicios" className="footer__nav-link">CRM con IA</Link>
            <Link to="/servicios" className="footer__nav-link">Chatbots</Link>
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
              <MapPin size={16} /> España
            </span>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} Paula Castillo Toldos — Automatización con IA
          </p>
        </div>
      </div>
    </footer>
  );
}
