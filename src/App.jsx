import { useReveal } from "./hooks/useReveal.js";
import { useGlassPointer } from "./hooks/useGlassPointer.js";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Pillars from "./components/Pillars.jsx";
import Capabilities from "./components/Capabilities.jsx";
import Personas from "./components/Personas.jsx";
import Traction from "./components/Traction.jsx";
import TechnicalIP from "./components/TechnicalIP.jsx";
import ContactCTA from "./components/ContactCTA.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  useReveal();
  useGlassPointer();

  return (
    <div className="min-h-screen bg-forest-deep">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:text-forest-deep"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main-content">
        <Hero />
        <Dashboard />
        <Pillars />
        <Capabilities />
        <Personas />
        <Traction />
        <TechnicalIP />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
