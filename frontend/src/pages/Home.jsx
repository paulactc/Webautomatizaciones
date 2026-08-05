import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { BlurFade } from "../components/magicui/blur-fade.jsx";
import WhatsAppIcon from "../components/icons/WhatsAppIcon.jsx";
import HeroChatMock from "../components/HeroChatMock.jsx";
import SectorTabs from "../components/SectorTabs.jsx";
import Pricing from "../components/Pricing.jsx";
import Process from "../components/Process.jsx";
import Faq from "../components/Faq.jsx";
import CrmShowcase from "../components/CrmShowcase.jsx";
import WhyMe from "../components/WhyMe.jsx";
import AgentFeatures from "../components/AgentFeatures.jsx";
import ClientLogos from "../components/ClientLogos.jsx";
import { useMediaQuery } from "../lib/useMediaQuery.js";

const WA_NUMBER = "34600000000";
const WA_TEXT = encodeURIComponent("Hola, me interesa automatizar mi negocio. ¿Me puedes informar?");

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 920px)");

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__video-wrapper">
          <video
            className="hero__video"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/CRM.png"
          >
            <source src="/videos/videocoworkeria.mp4" type="video/mp4" />
          </video>
          <div className="hero__video-overlay" />
        </div>
        <div className="hero__grid">
          <div className="hero__content">
            <BlurFade delay={0.2} inView>
              <h1 className="hero__title">
                Mientras tu negocio responde,<br />
                <span className="highlight">tú puedes centrarte en hacerlo crecer</span>
              </h1>
            </BlurFade>

            <BlurFade delay={0.4} inView>
              <p className="hero__subtitle">
                Automatizamos tu atención con inteligencia artificial.<br />
                Tecnología para responder al instante. Personas para resolver lo importante.
              </p>
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <div className="hero__actions">
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="btn btn--primary btn--wa">
                    <WhatsAppIcon size={20} />
                    Quiero mi automatización
                  </span>
                </a>
                <Link to="/demo" className="btn btn--outline">
                  Pide tu demo <ArrowRight size={16} strokeWidth={2.5} />
                </Link>
              </div>
            </BlurFade>

            <BlurFade delay={0.6} inView>
              <div className="hero__pills">
                <span className="hero__pill">Precio cerrado</span>
                <span className="hero__pill">Activo en 7-10 días</span>
                <span className="hero__pill">Sin permanencia</span>
              </div>
            </BlurFade>
          </div>

          {!isMobile && (
            <BlurFade delay={0.35} inView>
              <HeroChatMock />
            </BlurFade>
          )}
        </div>
      </section>

      {/* ── Confían en mí ── */}
      <ClientLogos />

      {/* ── CRM visual ── */}
      <CrmShowcase />

      {/* ── Filosofía ── */}
      <section className="philosophy-section">
        <div className="container container--narrow">
          <p className="philosophy-section__text">
            La mejor experiencia de cliente no consiste en sustituir a las personas,
            sino en permitir que estén donde realmente aportan valor.
          </p>
          <p className="philosophy-section__text philosophy-section__text--mt">
            Automatizamos la atención repetitiva, centralizamos todas las conversaciones
            en un único panel y conectamos cada interacción con tu equipo cuando es necesario.
          </p>
          <p className="philosophy-section__text philosophy-section__text--mt">
            Porque una empresa que responde mejor, también genera más confianza,
            más fidelidad y más ventas.
          </p>
        </div>
      </section>

      {/* ── Sectores ── */}
      <SectorTabs />

      {/* ── Planes ── */}
      <Pricing />

      {/* ── Cómo funciona ── */}
      <Process />

      {/* ── Qué hace el agente ── */}
      <AgentFeatures />

      {/* ── Por qué elegirme ── */}
      <WhyMe />

      {/* ── FAQ ── */}
      <Faq />

      {/* ── CTA final ── */}
      <section className="cta-final">
        <div className="container cta-final__inner">
          <h2 className="cta-final__title">
            Desconecta por fin.<br />
            <span className="highlight">Tu negocio se encarga.</span>
          </h2>
          <p className="cta-final__subtitle">
            Te enseñamos cómo funcionaría realmente con tu negocio:
            sencillo, rápido y sin complicaciones.
          </p>
          <div className="cta-final__actions">
            <Link to="/demo" className="btn btn--primary cta-final__btn">
              Pide tu demo
            </Link>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="btn btn--outline cta-final__btn">
                <WhatsAppIcon size={20} />
                Escríbenos por WhatsApp
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
