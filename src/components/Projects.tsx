"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Eye } from "lucide-react";

interface VideoProject {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  year: string;
}

interface PostProject {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  year: string;
}

const videoProjects: VideoProject[] = [
  {
    id: "wedding",
    title: "A Timeless Promise",
    category: "Cinematic Editing • Editorial Color",
    videoUrl: "/portfolio/Videos/Wedding invitation.mp4",
    year: "2026",
  },
  {
    id: "industrial",
    title: "Echoes of Steel",
    category: "3D Motion Design • CGI Art",
    videoUrl: "/portfolio/Videos/Industrial reel.mp4",
    year: "2026",
  },
  {
    id: "restaurants",
    title: "Savor the Light",
    category: "Commercial Direction • High-Contrast Video",
    videoUrl: "/portfolio/Videos/Restraunts.mp4",
    year: "2025",
  },
  {
    id: "aura",
    title: "Aura of Movement",
    category: "Cinematic CGI • Brand Simulation",
    videoUrl: "/portfolio/Videos/4.mp4",
    year: "2026",
  },
];

const postProjects: PostProject[] = [
  {
    id: "holdings",
    title: "Varanasi Billboard Concept",
    category: "Creative Direction • Architectural Placement",
    imageUrl: "/portfolio/Posts/holdings.png",
    year: "2026",
  },
  {
    id: "livepure",
    title: "Live Pure 3D Branding",
    category: "3D Graphic Design • Packaging Concept",
    imageUrl: "/portfolio/Posts/4aa53705-8525-4770-ba03-6f0832f9649f.png",
    year: "2026",
  },
  {
    id: "savorlight",
    title: "Nouveau Eye Care Ad Frame",
    category: "Commercial Graphic Art • Print Media",
    imageUrl: "/portfolio/Posts/55951284-a626-426b-a852-ea60cbdba6df.png",
    year: "2025",
  },
  {
    id: "framerush",
    title: "Solar Panel Identity Concept",
    category: "Graphic Design • Brand Board Framing",
    imageUrl: "/portfolio/Posts/1.png",
    year: "2026",
  },
];

export default function Projects() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxVideo, setLightboxVideo] = useState<VideoProject | null>(null);

  // Hook into Lenis scroll behavior to pause scrolling when any lightbox is active
  useEffect(() => {
    const lenis = (window as any).__framerush_lenis;
    if (!lenis) return;
    if (lightboxImage || lightboxVideo) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lightboxImage, lightboxVideo]);
  
  // Track mute status for each video separately
  const [mutedVideos, setMutedVideos] = useState<Record<string, boolean>>({
    wedding: true,
    industrial: true,
    restaurants: true,
    aura: true,
  });

  const toggleMute = (id: string) => {
    setMutedVideos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="projects"
      className="relative w-full bg-[#0A0A0A] pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#D4AF37] block mb-3">
              02 • Visual Portfolios
            </span>
            <h2 className="text-white leading-tight font-display">
              Selected Works
            </h2>
          </div>
          <p className="max-w-md text-xs md:text-sm text-[#B8B8B8] font-sans font-light tracking-wide leading-relaxed">
            Every piece is designed to capture attention and tell an elegant story, blending raw emotional cinematic shots with cutting-edge 3D motions.
          </p>
        </div>

        {/* Separated Two-Part Layout (Videos vs Posts) */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start w-full">
          
          {/* LEFT PART: Videos (16:9 aspect ratio, plays inline) */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <div className="border-b border-white/[0.06] pb-4 mb-2">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                01 // Motion Productions (Videos)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {videoProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  onClick={() => setLightboxVideo(project)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full flex flex-col group cursor-none"
                  data-cursor="play"
                >
                  {/* Meta details */}
                  <div className="flex items-center gap-2 text-[10px] font-sans font-medium tracking-[0.2em] text-[#D4AF37] uppercase mb-2">
                    <span>0{idx + 1}</span>
                    <span className="w-1.5 h-[1px] bg-[#D4AF37]/30" />
                    <span className="text-white/60">{project.year}</span>
                  </div>

                  <h3 className="text-white text-sm md:text-base font-display font-light tracking-tight mb-1 truncate" title={project.title}>
                    {project.title}
                  </h3>
                  <p className="text-[9px] font-sans tracking-[0.08em] text-[#999999] uppercase mb-3 truncate" title={project.category}>
                    {project.category}
                  </p>

                  {/* 16:9 Video Player Container (Shrinks responsively) */}
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/[0.04] bg-[#141414] shadow-lg group">
                    <video
                      src={project.videoUrl}
                      className="w-full h-full object-cover"
                      style={{ transform: "translateZ(0)", willChange: "transform" }}
                      autoPlay
                      loop
                      muted={mutedVideos[project.id]}
                      playsInline
                    />
                    
                    {/* Subtle Plus Sign on corners */}
                    <span className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/20 pointer-events-none" />
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white/20 pointer-events-none" />
                    <span className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-white/20 pointer-events-none" />
                    <span className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/20 pointer-events-none" />

                    {/* Volume Control Overlay (Appears on hover) */}
                    <button
                      onClick={() => toggleMute(project.id)}
                      className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/75 border border-white/10 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] transition-all duration-300 z-10 opacity-0 group-hover:opacity-100"
                      title={mutedVideos[project.id] ? "Unmute" : "Mute"}
                    >
                      {mutedVideos[project.id] ? <VolumeX size={10} /> : <Volume2 size={10} />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT PART: Posts (16:9 aspect ratio, opens lightbox) */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <div className="border-b border-white/[0.06] pb-4 mb-2">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                02 // Concept Art & Designs (Posts)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {postProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  onClick={() => setLightboxImage(project.imageUrl)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full flex flex-col group cursor-none"
                  data-cursor="view"
                >
                  {/* Meta details */}
                  <div className="flex items-center gap-2 text-[10px] font-sans font-medium tracking-[0.2em] text-[#D4AF37] uppercase mb-2">
                    <span>0{idx + 1}</span>
                    <span className="w-1.5 h-[1px] bg-[#D4AF37]/30" />
                    <span className="text-white/60">{project.year}</span>
                  </div>

                  <div className="flex justify-between items-end gap-2 mb-1">
                    <h3 className="text-white text-sm md:text-base font-display font-light tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300 truncate" title={project.title}>
                      {project.title}
                    </h3>
                    
                    <div className="hidden md:flex items-center gap-1 text-[#D4AF37] opacity-40 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-500 flex-shrink-0">
                      <Eye size={11} />
                    </div>
                  </div>
                  
                  <p className="text-[9px] font-sans tracking-[0.08em] text-[#999999] uppercase mb-3 truncate" title={project.category}>
                    {project.category}
                  </p>

                  {/* 16:9 Image Container (Click opens lightbox) */}
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/[0.04] bg-[#141414] shadow-lg cursor-zoom-in">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover scale-100 group-hover:scale-[1.03] transition-all duration-[1200ms] ease-out filter grayscale-[80%] brightness-[0.55] contrast-[1.05] group-hover:grayscale-0 group-hover:brightness-95 group-hover:contrast-100"
                    />
                    
                    {/* Visual Glare Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500" />
                    
                    {/* Subtle Plus Sign on corners */}
                    <span className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/20 group-hover:border-[#D4AF37]/50 transition-colors duration-500 pointer-events-none" />
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-[#D4AF37]/50 transition-colors duration-500 pointer-events-none" />
                    <span className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-[#D4AF37]/50 transition-colors duration-500 pointer-events-none" />
                    <span className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/20 group-hover:border-[#D4AF37]/50 transition-colors duration-500 pointer-events-none" />

                    {/* Mobile-only Expand Badge */}
                    <div className="absolute bottom-2 right-2 md:hidden p-1.5 rounded-full bg-[#0A0A0A]/85 border border-white/10 text-[#D4AF37]">
                      <Eye size={10} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Supporting Image Lightbox Overlay */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
              className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
            >
              {/* Close button */}
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-6 right-6 p-4 rounded-full bg-[#141414]/90 border border-white/5 text-[#F2F2F2] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 z-[99999]"
              >
                <X size={20} />
              </button>

              <motion.div
                initial={{ scale: 0.95, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="relative max-w-5xl w-full aspect-video rounded-lg overflow-hidden border border-white/10 shadow-2xl"
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

        {/* Supporting Video Lightbox Overlay */}
        <AnimatePresence>
          {lightboxVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxVideo(null)}
              className="fixed inset-0 z-[9999] bg-[#0A0A0A]/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            >
              {/* Cinematic Header Inside Overlay */}
              <div className="absolute top-6 left-6 right-6 flex items-start justify-between z-50 pointer-events-none">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#D4AF37] mb-1">
                    Motion Production
                  </span>
                  <h3 className="text-white text-base md:text-xl font-display font-light tracking-tight">
                    {lightboxVideo.title}
                  </h3>
                  <p className="text-[9px] font-sans tracking-[0.08em] text-[#999999] uppercase">
                    {lightboxVideo.category}
                  </p>
                </div>

                {/* Close button - override pointer events to enable click */}
                <button
                  onClick={() => setLightboxVideo(null)}
                  className="p-4 rounded-full bg-[#141414]/90 border border-white/5 text-[#F2F2F2] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 pointer-events-auto shadow-xl"
                  title="Close Preview"
                >
                  <X size={20} />
                </button>
              </div>

              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/60 cursor-default"
                onClick={(e) => e.stopPropagation()} // prevent close on player click
              >
                <video
                  src={lightboxVideo.videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  playsInline
                />

                {/* Corner crosshair plus symbols */}
                <span className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-[#D4AF37]/50 pointer-events-none" />
                <span className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-[#D4AF37]/50 pointer-events-none" />
                <span className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-[#D4AF37]/50 pointer-events-none" />
                <span className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-[#D4AF37]/50 pointer-events-none" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
