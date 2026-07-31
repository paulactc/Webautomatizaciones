import { Link } from "react-router";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { posts } from "../data/blog.js";

export default function Blog() {
  return (
    <section className="page-section">
      <div className="container">
        <h2 className="section-title">Blog</h2>
        <p className="section-subtitle">
          Guías y recursos sobre automatización con IA para negocios que no pueden perder oportunidades.
        </p>

        <div className="blog__grid">
          {posts.map((post) => (
            <article key={post.slug} className="blog-card">
              <span className="blog-card__category">{post.category}</span>
              <h3 className="blog-card__title">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="blog-card__excerpt">{post.excerpt}</p>
              <div className="blog-card__meta">
                <span><Calendar size={14} strokeWidth={2} /> {post.date}</span>
                <span><Clock size={14} strokeWidth={2} /> {post.readTime}</span>
              </div>
              <Link to={`/blog/${post.slug}`} className="blog-card__link">
                Leer artículo <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
