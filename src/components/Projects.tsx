"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { X, ArrowUpRight, Volume2, VolumeX } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  coverImage: string;
  description: string;
  client: string;
  year: string;
  gridClass: string;
  images: string[];
}

const projectsData: Project[] = [
  {
    id: "wedding",
    title: "A Timeless Promise",
    category: "Video Editing • Editorial Production",
    videoUrl: "/portfolio/Videos/Wedding invitation.mp4",
    coverImage: "/portfolio/Posts/holdings.png",
    description: "A cinematic masterpiece capturing raw emotional narratives. By incorporating premium anamorphic aspect ratios, editorial color-grading workflows, and rich atmospheric soundscapes, we sculpted real human connections into an unforgettable visual heirloom.",
    client: "Elysian Heirlooms",
    year: "2026",
    gridClass: "col-span-12 md:col-span-7",
    images: ["/portfolio/Posts/1.png", "/portfolio/Posts/holdings.png"],
  },
  {
    id: "industrial",
    title: "Echoes of Steel",
    category: "3D Motion Design • CGI Art",
    videoUrl: "/portfolio/Videos/Industrial reel.mp4",
    coverImage: "/portfolio/Posts/4aa53705-8525-4770-ba03-6f0832f9649f.png",
    description: "An high-octane 3D kinetic showcase exploring corporate machinery, metal dynamics, and abstract structural geometry. We engineered heavy metallic reflections, light refraction bloom, and micro-timing interpolation to manifest industrial power.",
    client: "Ironclad Heavy Industries",
    year: "2026",
    gridClass: "col-span-12 md:col-span-5 md:mt-16",
    images: ["/portfolio/Posts/4aa53705-8525-4770-ba03-6f0832f9649f.png", "/portfolio/Posts/holdings.png"],
  },
  {
    id: "restaurants",
    title: "Savor the Light",
    category: "Creative Direction • Commercial Video",
    videoUrl: "/portfolio/Videos/Restraunts.mp4",
    coverImage: "/portfolio/Posts/55951284-a626-426b-a852-ea60cbdba6df.png",
    description: "A luxury culinary commercial capturing organic texture grains, slow-motion steam patterns, and intimate lighting atmospheres. Curated specifically for projector presentation displays to maximize high-contrast elegance.",
    client: "Nouveau Dining Group",
    year: "2025",
    gridClass: "col-span-12 md:col-span-5",
    images: ["/portfolio/Posts/55951284-a626-426b-a852-ea60cbdba6df.png", "/portfolio/Posts/1.png"],
  },
  {
    id: "branding",
    title: "Frame Rush Identity",
    category: "Graphic Design • Interactive Web",
    videoUrl: "/portfolio/Videos/Industrial reel.mp4", // loop clip
    coverImage: "/portfolio/Posts/1.png",
    description: "The holistic visual system of Frame Rush Studio. We crafted a custom filmstrip monogram and premium typography grids (Clash Display & Satoshi) paired with gold textures to deliver brand cohesion across smart screens, print, and physical merchandise.",
    client: "Frame Rush Studio",
    year: "2026",
    gridClass: "col-span-12 md:col-span-7 md:-mt-16",
    images: ["/portfolio/Posts/1.png", "/portfolio/Posts/4aa53705-8525-4770-ba03-6f0832f9649f.png"],
  },
];

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isFullscreenMuted, setIsFullscreenMuted] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  // Position of the mouse for the floating preview
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs to add a beautiful motion lag to the floating preview
  const springConfig = { damping: 45, stiffness: 350, mass: 0.5 };
  const floatX = useSpring(mouseX, springConfig);
  const floatY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Offset relative to the section container
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsFullscreenMuted(true); // default to muted for autoplay compatibility
    
    // Reset modal scroll position to top
    setTimeout(() => {
      if (modalScrollRef.current) {
        modalScrollRef.current.scrollTop = 0;
      }
    }, 50);

    // Lock standard document body scroll and stop Lenis smooth scroll
    document.body.style.overflow = "hidden";
    if (typeof window !== "undefined" && (window as any).__framerush_lenis) {
      const scrollInstance = (window as any).__framerush_lenis;
      if (typeof scrollInstance.stop === "function") {
        scrollInstance.stop();
      }
    }
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    setLightboxImage(null);
    
    // Restore standard document body scroll and restart Lenis smooth scroll
    document.body.style.overflow = "unset";
    if (typeof window !== "undefined" && (window as any).__framerush_lenis) {
      const scrollInstance = (window as any).__framerush_lenis;
      if (typeof scrollInstance.start === "function") {
        scrollInstance.start();
      }
    }
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#0A0A0A] pt-20 pb-32 md:pt-32 md:pb-56 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#D4AF37] mb-3">
              02 • Visual Portfolios
            </p>
            <h2 className="text-white leading-tight font-display">
              Selected Works
            </h2>
          </div>
          <p className="max-w-md text-xs md:text-sm text-[#B8B8B8] font-sans font-light tracking-wide leading-relaxed">
            Every piece is designed to capture attention and tell an elegant story, blending raw emotional cinematic shots with cutting-edge 3D motions.
          </p>
        </div>

        {/* Spacious Cinematic 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-24 md:gap-y-36">
          {projectsData.map((project, index) => {
            const staggerClass = index % 2 === 1 ? "md:translate-y-24" : "";
            return (
              <motion.div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                data-cursor="view"
                className={`group cursor-none relative flex flex-col ${staggerClass}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Media Container */}
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded bg-[#141414] border border-white/[0.04] transition-all duration-700 group-hover:border-[#D4AF37]/30 shadow-lg">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover scale-100 group-hover:scale-[1.03] transition-all duration-[1200ms] ease-out filter grayscale-[80%] brightness-[0.55] contrast-[1.05] group-hover:grayscale-0 group-hover:brightness-95 group-hover:contrast-100"
                  />
                  
                  {/* Visual Glare Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500" />
                  
                  {/* Subtle Plus Sign on corners */}
                  <span className="absolute top-4 left-4 w-2.5 h-2.5 border-t border-l border-white/20 group-hover:border-[#D4AF37]/50 transition-colors duration-500 pointer-events-none" />
                  <span className="absolute top-4 right-4 w-2.5 h-2.5 border-t border-r border-white/20 group-hover:border-[#D4AF37]/50 transition-colors duration-500 pointer-events-none" />
                  <span className="absolute bottom-4 left-4 w-2.5 h-2.5 border-b border-l border-white/20 group-hover:border-[#D4AF37]/50 transition-colors duration-500 pointer-events-none" />
                  <span className="absolute bottom-4 right-4 w-2.5 h-2.5 border-b border-r border-white/20 group-hover:border-[#D4AF37]/50 transition-colors duration-500 pointer-events-none" />

                  {/* Mobile view hover indication icon */}
                  <div className="absolute bottom-4 right-4 md:hidden p-2 rounded-full bg-[#0A0A0A]/80 border border-white/10 text-[#D4AF37]">
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                {/* Text Info */}
                <div className="mt-6 flex flex-col gap-2">
                  {/* Meta Tag: Index & Year */}
                  <div className="flex items-center gap-2 text-[10px] font-sans font-medium tracking-[0.2em] text-[#D4AF37] uppercase">
                    <span>0{index + 1}</span>
                    <span className="w-1.5 h-[1px] bg-[#D4AF37]/30" />
                    <span className="text-[#B8B8B8]">{project.year}</span>
                  </div>
                  
                  <div className="flex justify-between items-end gap-4">
                    <div>
                      <h3 className="text-white text-xl md:text-2xl font-display font-light tracking-tight mb-1 group-hover:text-[#D4AF37] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-[10px] md:text-xs font-sans tracking-[0.08em] text-[#999999] uppercase">
                        {project.category}
                      </p>
                    </div>
                    
                    <div className="hidden md:flex items-center gap-1.5 text-[#D4AF37] opacity-40 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-500">
                      <span className="text-[10px] font-sans font-bold tracking-widest uppercase">View Case</span>
                      <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Floating Mouse Video Preview (Desktop Only) */}
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                rotate: 3
              }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute pointer-events-none z-30 hidden md:block w-[240px] aspect-[16/10] overflow-hidden rounded-lg bg-[#141414] border border-[#D4AF37]/40 shadow-[0_10px_25px_rgba(0,0,0,0.7)]"
              style={{
                x: floatX,
                y: floatY,
                translateX: "-50%",
                translateY: "-130%",
                willChange: "transform",
              }}
            >
              <video
                src={hoveredProject.videoUrl}
                poster={hoveredProject.coverImage}
                className="w-full h-full object-cover"
                style={{ 
                  transform: "translateZ(0)",
                  willChange: "transform"
                }}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fullscreen Interactive Project Detail Sheet */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              ref={modalScrollRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 w-full h-full bg-[#0A0A0A] overflow-y-auto px-6 py-24 md:p-12 lg:p-24 flex flex-col justify-start"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseProject}
                data-cursor="hover"
                className="fixed top-8 right-8 z-50 p-4 rounded-full bg-[#141414]/90 border border-white/5 hover:border-[#D4AF37] text-[#F2F2F2] hover:text-[#D4AF37] transition-all duration-300"
                aria-label="Close Case Study"
              >
                <X size={20} />
              </button>

              <div className="max-w-6xl mx-auto w-full flex flex-col gap-12 md:gap-20">
                {/* Title & Metadata */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/[0.06] pb-10">
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#D4AF37] mb-2 block">
                      Case Study
                    </span>
                    <h1 className="text-white text-4xl md:text-6xl font-display font-bold tracking-tight">
                      {selectedProject.title}
                    </h1>
                  </div>

                  {/* Meta Specs */}
                  <div className="flex flex-wrap gap-8 text-left">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-[#B8B8B8] mb-1">Client</p>
                      <p className="text-xs font-semibold text-white tracking-wide">{selectedProject.client}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-[#B8B8B8] mb-1">Focus</p>
                      <p className="text-xs font-semibold text-white tracking-wide">{selectedProject.category.split(" • ")[0]}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-[#B8B8B8] mb-1">Year</p>
                      <p className="text-xs font-semibold text-white tracking-wide">{selectedProject.year}</p>
                    </div>
                  </div>
                </div>

                {/* Hero Showcase Video (Autoplay Muted or Audio Selectable) */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#141414] border border-white/[0.04]">
                  <video
                    src={selectedProject.videoUrl}
                    poster={selectedProject.coverImage}
                    className="w-full h-full object-cover"
                    style={{ transform: "translateZ(0)" }}
                    autoPlay
                    loop
                    muted={isFullscreenMuted}
                    playsInline
                  />
                  <div className="absolute bottom-6 right-6 flex items-center gap-3">
                    <button
                      onClick={() => setIsFullscreenMuted(!isFullscreenMuted)}
                      className="p-3.5 rounded-full bg-[#0A0A0A]/80 border border-white/10 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] transition-all duration-300"
                    >
                      {isFullscreenMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                  </div>
                </div>

                {/* Core Narrative / Detailed Text Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
                  <div className="md:col-span-8 flex flex-col gap-6">
                    <h3 className="text-[#D4AF37] text-xl font-display font-medium">The Narrative & Scope</h3>
                    <p className="text-[#B8B8B8] leading-relaxed font-sans text-base font-light">
                      {selectedProject.description}
                    </p>
                    <p className="text-[#B8B8B8] leading-relaxed font-sans text-base font-light">
                      Every element of the design system was scrutinized. From micro-interactions in rendering particle apertures to rendering heavy textures at a consistent 60 FPS across mobile and large scale displays, we created visual excellence meant to capture and command focus.
                    </p>
                  </div>

                  <div className="md:col-span-4 bg-[#141414]/40 border border-white/[0.03] p-6 rounded-lg flex flex-col gap-4">
                    <h4 className="text-white text-xs font-display font-bold uppercase tracking-wider">Services Applied</h4>
                    <ul className="text-xs text-[#B8B8B8]/80 flex flex-col gap-3">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> High-Fidelity Video Editing
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> Custom Color Grading
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> Sound Synthesis
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> 3D CGI Rendering
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Supporting Post Layout Graphic Designs */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-[#D4AF37] text-xl font-display font-medium">Concept Framing & Graphic Designs</h3>
                  <p className="text-[#B8B8B8]/60 text-xs font-sans -mt-4">Click any image to view in fullscreen</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {selectedProject.images.map((img, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setLightboxImage(img)}
                        data-cursor="hover"
                        className="group/img relative aspect-[4/3] rounded-lg overflow-hidden border border-white/[0.04] cursor-zoom-in bg-[#141414]"
                      >
                        <Image
                          src={img}
                          alt="Layout Render"
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover scale-100 group-hover/img:scale-105 transition-transform duration-[800ms] ease-out"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="px-4 py-2 text-[10px] uppercase tracking-widest font-sans font-bold bg-black/80 text-[#D4AF37] border border-[#D4AF37]/30 rounded-full">
                            Expand Image
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call To Action within Detail Sheet */}
                <div className="border-t border-white/[0.06] pt-12 pb-24 text-center flex flex-col items-center gap-6">
                  <h3 className="text-white text-2xl font-display font-medium">Inspired by this project?</h3>
                  <button 
                    onClick={() => {
                      handleCloseProject();
                      setTimeout(() => {
                        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                      }, 400);
                    }}
                    className="px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase bg-[#D4AF37] text-[#0A0A0A] rounded-full hover:bg-[#D4AF37]/90 transition-all duration-300"
                  >
                    Start Your Project
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Supporting Image Lightbox Overlay */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
              className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
            >
              {/* Close button */}
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-6 right-6 p-4 rounded-full bg-[#141414]/90 border border-white/5 text-[#F2F2F2] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 z-[70]"
              >
                <X size={20} />
              </button>

              <motion.div
                initial={{ scale: 0.95, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="relative max-w-5xl w-full aspect-[4/3] md:aspect-[16/10] rounded-lg overflow-hidden border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()} // prevent close on image click
              >
                <Image
                  src={lightboxImage}
                  alt="Expanded Showcase View"
                  fill
                  sizes="100vw"
                  className="object-contain bg-black/40"
                  priority
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
