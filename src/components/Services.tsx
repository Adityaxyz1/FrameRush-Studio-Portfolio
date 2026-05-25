"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Film, Compass, Layers, Terminal } from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

const servicesData: Service[] = [
  {
    id: 1,
    title: "Video Editing",
    description: "Cinematic, rhythm-driven editing that establishes emotional narrative. From brand commercials to widescreen editorial showreels, we design cuts that lock viewers in.",
    icon: <Film className="text-[#D4AF37]" size={28} />,
    tags: ["Sound Synthesis", "Color Grading", "Multi-cam Edit", "Narrative Cuts"],
  },
  {
    id: 2,
    title: "3D Motion Design",
    description: "CGI simulated environments and brushed metallic motion visuals. We generate high-end, responsive abstract 3D elements that elevate storytelling to premium dimensions.",
    icon: <Compass className="text-[#D4AF37]" size={28} />,
    tags: ["Octane Rendering", "Kinetic Physics", "Lighting Design", "Product Simulation"],
  },
  {
    id: 3,
    title: "Graphic Design",
    description: "Sleek, spacious brand systems that project modern luxury. We design editorial layout assets, logos, and digital merchandise guidelines built on precise visual typography.",
    icon: <Layers className="text-[#D4AF37]" size={28} />,
    tags: ["Visual Systems", "Merchandise Spec", "Typography Grids", "Cine Layouts"],
  },
  {
    id: 4,
    title: "Interactive Websites",
    description: "High-performance digital products engineered at Awwwards standard. Fully fluid responsive systems built with smooth scroll architectures and micro-animations.",
    icon: <Terminal className="text-[#D4AF37]" size={28} />,
    tags: ["Next.js & WebGL", "Fluid Responsive", "GSAP Timeline", "Physics Scrolling"],
  },
];

// Card component with custom mouse-coordinate tracking spotlight
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-[#141414]/30 border border-white/[0.04] p-8 md:p-10 rounded-xl overflow-hidden flex flex-col justify-between min-h-[360px] hover:border-[#D4AF37]/35 transition-colors duration-500"
    >
      {/* Interactive Mouse Tracking Radial Glow Background */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 175, 55, 0.07), transparent 80%)"
        }}
      />

      <div>
        {/* Vector Icon with subtle float */}
        <div className="w-14 h-14 rounded-lg bg-[#0A0A0A] border border-white/[0.04] flex items-center justify-center mb-8 shadow-inner shadow-black/80 transition-all duration-500 group-hover:border-[#D4AF37]/30">
          {service.icon}
        </div>

        {/* Headline */}
        <h3 className="text-white text-xl font-display font-medium tracking-tight mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">
          {service.title}
        </h3>

        {/* Narrative Description */}
        <p className="text-xs md:text-sm text-[#B8B8B8] font-sans font-light tracking-wide leading-relaxed mb-8">
          {service.description}
        </p>
      </div>

      {/* Meta Specs/Tags */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.03]">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="text-[9px] font-sans font-semibold tracking-wider text-[#B8B8B8]/60 bg-white/[0.02] border border-white/[0.03] px-2.5 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative w-full bg-[#0A0A0A] py-20 md:py-32 overflow-hidden">
      {/* Background Lighting Bloom — pre-blurred radial gradients (no CSS filter) */}
      <div 
        className="absolute top-[40%] right-[5%] w-[35vw] h-[35vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)" }}
      />
      <div 
        className="absolute bottom-[20%] left-[5%] w-[35vw] h-[35vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="mb-16 md:mb-24 text-left">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#D4AF37] block mb-3">
            03 • Core Capabilities
          </span>
          <h2 className="text-white leading-tight font-display mb-4">
            Studio Expertise
          </h2>
          <p className="max-w-xl text-[#B8B8B8] font-sans font-light tracking-wide text-sm md:text-base">
            Crafting premium interactive and video assets designed to hold user focus across all Smart TVs, projectors, desktops, and mobile devices.
          </p>
        </div>

        {/* 2x2 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
