import Hero from "@/components/Hero";
import Showreel from "@/components/Showreel";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="relative w-full flex flex-col bg-[#0A0A0A]">
      {/* 1. Hero Section with Canvas Particle Lens */}
      <Hero />

      {/* 2. Immersive Inline Cinematic Showreel */}
      <Showreel />

      {/* 3. Advanced Asymmetric Projects Grid with cursor previews & fullscreen cases */}
      <Projects />

      {/* 4. Service Capabilities with hover spotlight tracking */}
      <Services />

      {/* 5. SVG Timeline line-drawing process progression */}
      <Process />

      {/* 6. Final Conversion CTAs & Footer Branding */}
      <Contact />
    </div>
  );
}
