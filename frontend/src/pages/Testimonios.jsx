import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import Testimonials from "../components/Testimonials.jsx";

export default function Testimonios() {
  return (
    <div className="testimonios-page">
      <div className="container testimonios-page__back">
        <Link to="/" className="blog-back">
          <ArrowLeft size={16} strokeWidth={2.5} />
          Volver al inicio
        </Link>
      </div>
      <Testimonials />
    </div>
  );
}
