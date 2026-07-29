import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Particles } from "../components/magicui/particles.jsx";
import { BlurFade } from "../components/magicui/blur-fade.jsx";
import WhatsAppIcon from "../components/icons/WhatsAppIcon.jsx";
import SectorTabs from "../components/SectorTabs.jsx";
import Pricing from "../components/Pricing.jsx";
import Process from "../components/Process.jsx";
import Faq from "../components/Faq.jsx";
import Testimonials from "../components/Testimonials.jsx";
import CrmShowcase from "../components/CrmShowcase.jsx";
import WhyMe from "../components/WhyMe.jsx";

const WA_NUMBER = "34722439479";
const WA_TEXT = encodeURIComponent("Hola, me interesa automatizar mi negocio. ¿Me puedes informar?");

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <Particles
          className="hero__particles"
          quantity={150}
          ease={70}
          color="#c4652a"
          size={0.8}
          staticity={30}
          refresh
        />
        <div className="hero__content">
          <BlurFade delay={0.1} inView>
            <img
              src="/images/IMG_20260727_144413.jpg"
              alt="Paula Castillo Toldos"
              className="hero__photo"
            />
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <p className="hero__name">Paula Castillo Toldos</p>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <h1 className="hero__title">
              Tu negocio responde solo,<br />
              <span className="highlight">aunque tú no estés</span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <p className="hero__subtitle">
              Automatizo la atención al cliente y las citas con inteligencia artificial
              para negocios reales que no pueden perder oportunidades.
              Sin líos técnicos y con precio cerrado.
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
              <a href="#planes" className="btn btn--outline">
                Ver planes <ArrowRight size={16} strokeWidth={2.5} />
              </a>
            </div>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <div className="hero__pills">
              <span className="hero__pill">Sin permanencia</span>
              <span className="hero__pill">Precio cerrado</span>
              <span className="hero__pill">Activo en 3-5 días</span>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ── CRM visual ── */}
      <CrmShowcase />

      {/* ── Dolor ── */}
      <section className="pain-section">
        <div className="container container--narrow">
          <p className="pain-section__text">
            Cada mensaje sin responder es un cliente que se va a la competencia.
            Cada cita sin confirmar es una hora de agenda perdida.
          </p>
        </div>
      </section>

      {/* ── Sectores ── */}
      <SectorTabs />

      {/* ── Planes ── */}
      <Pricing />

      {/* ── Cómo funciona ── */}
      <Process />

      {/* ── Testimonios ── */}
      <Testimonials />

      {/* ── Por qué elegirme ── */}
      <WhyMe />

      {/* ── FAQ ── */}
      <Faq />

      {/* ── CTA final ── */}
      <section className="cta-final">
        <div className="container container--narrow">
          <h2 className="cta-final__title">
            Tu negocio puede empezar a trabajar solo <span className="highlight">esta semana</span>
          </h2>
          <p className="cta-final__subtitle">
            Escríbenos por WhatsApp o déjanos tus datos. Sin compromiso, sin llamadas incómodas.
          </p>
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
        </div>
      </section>
    </>
  );
}
