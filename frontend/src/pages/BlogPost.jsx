import { useParams, Navigate, Link } from "react-router";
import { Calendar, Clock, ChevronLeft, ArrowRight } from "lucide-react";
import { getPost, posts } from "../data/blog.js";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const related = posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <section className="page-section">
      <div className="container container--narrow">
        <Link to="/blog" className="blog-back">
          <ChevronLeft size={16} strokeWidth={2.5} /> Volver al blog
        </Link>

        <article className="blog-post">
          {post.image && (
            <img src={post.image} alt={post.title} className="blog-post__cover" />
          )}
          <header className="blog-post__header">
            <span className="blog-card__category">{post.category}</span>
            <h2 className="section-title blog-post__title">{post.title}</h2>
            <p className="blog-post__excerpt">{post.excerpt}</p>
            <div className="blog-card__meta">
              <span><Calendar size={14} strokeWidth={2} /> {post.date}</span>
              <span><Clock size={14} strokeWidth={2} /> {post.readTime}</span>
            </div>
          </header>

          <div className="blog-post__content">
            {post.sections.map(({ h, p, p2, list, quote, img, imgAlt, imgCaption }) => (
              <section key={h}>
                <h3 className="blog-post__h">{h}</h3>
                {img && (
                  <figure className="blog-post__figure">
                    <img src={img} alt={imgAlt || h} loading="lazy" />
                    {imgCaption && <figcaption>{imgCaption}</figcaption>}
                  </figure>
                )}
                {p && <p className="blog-post__p">{p}</p>}
                {list && (
                  <ul className="blog-post__list">
                    {list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {quote && (
                  <blockquote className="blog-post__quote">
                    <p>{quote.text}</p>
                    <cite>{quote.source}</cite>
                  </blockquote>
                )}
                {p2 && <p className="blog-post__p">{p2}</p>}
              </section>
            ))}
          </div>
        </article>

        <div className="blog-post__cta">
          <h3>¿Quieres aplicarlo a tu negocio?</h3>
          <p>Cuéntanos qué automatizarías primero y te respondemos en menos de 24 h.</p>
          <Link to="/demo" className="btn btn--primary">
            Pide tu demo <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>

        <div className="blog-post__related">
          <h3 className="blog-post__related-title">Sigue leyendo</h3>
          <div className="blog__grid blog__grid--related">
            {related.map((post) => (
              <article key={post.slug} className="blog-card">
                <span className="blog-card__category">{post.category}</span>
                <h3 className="blog-card__title">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <Link to={`/blog/${post.slug}`} className="blog-card__link">
                  Leer artículo <ArrowRight size={15} strokeWidth={2.5} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
