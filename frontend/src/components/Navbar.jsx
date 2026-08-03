import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/#sectores", label: "Sectores" },
  { to: "/#planes", label: "Planes" },
  { to: "/calculadora-ahorro", label: "Potencial de ahorro" },
  { to: "/blog", label: "Blog" },
  { to: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function isActive(to) {
    const [path] = to.split("#");
    return location.pathname === (path || "/");
  }

  function handleClick(to) {
    setOpen(false);
    const [path, hash] = to.split("#");
    if (hash && location.pathname === (path || "/")) {
      const el = document.getElementById(hash);
      if (el) return void el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    navigate(to);
  }

  return (
    <header className="navbar">
      <a href="/" className="navbar__brand" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
        <span className="navbar__logo">Coworker IA</span>
        <span className="navbar__tagline">Automatización con IA</span>
      </a>

      <nav className={`navbar__nav ${open ? "navbar__nav--open" : ""}`}>
        {links.map(({ to, label }) => (
          <button
            key={to}
            onClick={() => handleClick(to)}
            className={`navbar__link${isActive(to) ? " navbar__link--active" : ""}`}
          >
            {label}
          </button>
        ))}
      </nav>

      <button
        className="navbar__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label="Menú"
      >
        {open ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
      </button>
    </header>
  );
}
