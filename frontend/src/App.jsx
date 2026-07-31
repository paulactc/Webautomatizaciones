import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Services from "./pages/Services.jsx";
import Demo from "./pages/Demo.jsx";
import CalculadoraRoi from "./pages/CalculadoraRoi.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Legal from "./pages/Legal.jsx";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre-mi" element={<About />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/calculadora-roi" element={<CalculadoraRoi />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/legal/:slug" element={<Legal />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
    </div>
  );
}
