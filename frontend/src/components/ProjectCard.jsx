import { ArrowUpRight, CheckCircle2, ExternalLink } from "lucide-react";

export default function ProjectCard({ project, index }) {
  const { title, eyebrow, tagline, description, highlights, tags, demo, image } = project;
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="pcard">
      {/* ── Header row ───────────────────────────────────── */}
      <div className="pcard__header">
        <div className="pcard__header-left">
          <span className="pcard__number">{num}</span>
          <span className="pcard__eyebrow">{eyebrow}</span>
        </div>
        <div className="pcard__header-right">
          <span className="pcard__category">{eyebrow}</span>
          <h3 className="pcard__name">{title}</h3>
        </div>
        {demo && (
          <a href={demo} target="_blank" rel="noreferrer" className="pcard__link-icon" aria-label="Ver proyecto">
            <ArrowUpRight size={20} strokeWidth={2.5} />
          </a>
        )}
      </div>

      {/* ── Content grid (4 + 6 cols) ────────────────────── */}
      <div className="pcard__grid">
        {/* Left col: info card */}
        <div className="pcard__col-left">
          <div className="pcard__info">
            <p className="pcard__tagline">{tagline}</p>
            <p className="pcard__desc">{description}</p>
            <ul className="pcard__highlights">
              {highlights.map((item) => (
                <li key={item} className="pcard__highlight-item">
                  <CheckCircle2 size={15} strokeWidth={2} className="pcard__check" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="pcard__tags">
              {tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            {demo && (
              <a href={demo} target="_blank" rel="noreferrer" className="pcard__visit-btn">
                <ExternalLink size={18} strokeWidth={2.5} />
                Visitar proyecto
              </a>
            )}
          </div>
        </div>

        {/* Right col: image */}
        <div className="pcard__col-right">
          {image ? (
            <div className="pcard__img-wrap">
              <img src={image} alt={title} loading="lazy" className="pcard__img" />
            </div>
          ) : (
            <div className="pcard__img-placeholder">
              <span>{eyebrow}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
