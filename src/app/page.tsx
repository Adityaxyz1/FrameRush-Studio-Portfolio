import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Showreel from "@/components/Showreel";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="relative w-full flex flex-col bg-[#0A0A0A]">
      {/* 1. Hero Section with Canvas Particle Lens */}
      <Hero />

      {/* 2. Advanced 2-Column Projects Grid with cursor previews & fullscreen cases */}
      <Projects />

      {/* 3. Service Capabilities with hover spotlight tracking */}
      <Services />

      {/* 4. SVG Timeline line-drawing process progression */}
      <Process />

      {/* 5. Immersive Widescreen Cinematic Showreel (Viewing Area) */}
      <Showreel />

      {/* 6. Final Conversion CTAs & Footer Branding */}
      <Contact />
    </div>
  );
}
