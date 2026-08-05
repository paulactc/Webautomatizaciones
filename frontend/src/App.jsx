import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Services from "./pages/Services.jsx";
import Demo from "./pages/Demo.jsx";
import CalculadoraAhorro from "./pages/CalculadoraAhorro.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Testimonios from "./pages/Testimonios.jsx";
import Legal from "./pages/Legal.jsx";

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) return void el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <div className="app">
      <ScrollManager />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre-mi" element={<About />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/calculadora-ahorro" element={<CalculadoraAhorro />} />
          <Route path="/calculadora-roi" element={<Navigate to="/calculadora-ahorro" replace />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/testimonios" element={<Testimonios />} />
          <Route path="/legal/:slug" element={<Legal />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
    </div>
  );
}
