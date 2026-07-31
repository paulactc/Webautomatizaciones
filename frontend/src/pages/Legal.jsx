import { useParams, Navigate, Link } from "react-router";
import { ShieldCheck } from "lucide-react";
import { getLegalDoc } from "../data/legal.js";

const links = [
  { to: "/legal/aviso-legal", label: "Aviso Legal" },
  { to: "/legal/politica-privacidad", label: "Política de Privacidad" },
  { to: "/legal/politica-cookies", label: "Política de Cookies" },
  { to: "/legal/terminos-servicio", label: "Términos y Condiciones" },
];

export default function Legal() {
  const { slug } = useParams();
  const doc = getLegalDoc(slug);

  if (!doc) return <Navigate to="/legal/aviso-legal" replace />;

  return (
    <section className="page-section">
      <div className="container container--narrow">
        <div className="legal__nav">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`legal__nav-link${l.to.endsWith(slug) ? " legal__nav-link--active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="legal__doc">
          <div className="legal__header">
            <span className="legal__icon">
              <ShieldCheck size={24} strokeWidth={1.5} />
            </span>
            <h2 className="section-title legal__title">{doc.title}</h2>
            <p className="legal__updated">Última actualización: {doc.updated}</p>
          </div>

          {doc.sections.map(({ heading, body }) => (
            <div key={heading} className="legal__section">
              <h3 className="legal__heading">{heading}</h3>
              {Array.isArray(body) ? (
                body.map((p, i) => <p key={i} className="legal__body">{p}</p>)
              ) : (
                <p className="legal__body">{body}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
