import { useState } from "react";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/#sectores", label: "Sectores" },
  { to: "/#planes", label: "Planes" },
  { to: "/sobre-mi", label: "Sobre mí" },
  { to: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <NavLink to="/" className="navbar__brand">
        <span className="navbar__logo">Paula Castillo</span>
        <span className="navbar__tagline">Automatización con IA</span>
      </NavLink>

      <nav className={`navbar__nav ${open ? "navbar__nav--open" : ""}`}>
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
            onClick={() => setOpen(false)}
          >
            {label}
          </NavLink>
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
