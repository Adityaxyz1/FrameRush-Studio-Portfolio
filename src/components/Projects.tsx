"use client";

import { useState } from "react";
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
  
  // Track mute status for each video separately
  const [mutedVideos, setMutedVideos] = useState<Record<string, boolean>>({
    wedding: true,
    industrial: true,
    restaurants: true,
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

        {/* Separated Two-Part Layout (Videos vs Posts) */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start w-full">
          
          {/* LEFT PART: Videos (16:9 aspect ratio, plays inline) */}
          <div className="w-full lg:w-1/2 flex flex-col gap-16">
            <div className="border-b border-white/[0.06] pb-4 mb-2">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                01 // Motion Productions (Videos)
              </span>
            </div>

            {videoProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col"
              >
                {/* Meta details */}
                <div className="flex items-center gap-2 text-[10px] font-sans font-medium tracking-[0.2em] text-[#D4AF37] uppercase mb-2">
                  <span>0{idx + 1}</span>
                  <span className="w-1.5 h-[1px] bg-[#D4AF37]/30" />
                  <span className="text-white/60">{project.year}</span>
                </div>

                <h3 className="text-white text-xl md:text-2xl font-display font-light tracking-tight mb-1">
                  {project.title}
                </h3>
                <p className="text-[10px] md:text-xs font-sans tracking-[0.08em] text-[#999999] uppercase mb-4">
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
                  <span className="absolute top-4 left-4 w-2.5 h-2.5 border-t border-l border-white/20 pointer-events-none" />
                  <span className="absolute top-4 right-4 w-2.5 h-2.5 border-t border-r border-white/20 pointer-events-none" />
                  <span className="absolute bottom-4 left-4 w-2.5 h-2.5 border-b border-l border-white/20 pointer-events-none" />
                  <span className="absolute bottom-4 right-4 w-2.5 h-2.5 border-b border-r border-white/20 pointer-events-none" />

                  {/* Volume Control Overlay (Appears on hover) */}
                  <button
                    onClick={() => toggleMute(project.id)}
                    className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/75 border border-white/10 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] transition-all duration-300 z-10 opacity-0 group-hover:opacity-100"
                    title={mutedVideos[project.id] ? "Unmute" : "Mute"}
                  >
                    {mutedVideos[project.id] ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT PART: Posts (16:9 aspect ratio, opens lightbox) */}
          <div className="w-full lg:w-1/2 flex flex-col gap-16">
            <div className="border-b border-white/[0.06] pb-4 mb-2">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                02 // Concept Art & Designs (Posts)
              </span>
            </div>

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

                <div className="flex justify-between items-end gap-4 mb-1">
                  <h3 className="text-white text-xl md:text-2xl font-display font-light tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <div className="hidden md:flex items-center gap-1.5 text-[#D4AF37] opacity-40 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-500">
                    <span className="text-[10px] font-sans font-bold tracking-widest uppercase">Expand</span>
                    <Eye size={13} />
                  </div>
                </div>
                
                <p className="text-[10px] md:text-xs font-sans tracking-[0.08em] text-[#999999] uppercase mb-4">
                  {project.category}
                </p>

                {/* 16:9 Image Container (Click opens lightbox) */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/[0.04] bg-[#141414] shadow-lg cursor-zoom-in">
                  <Image
                    src={project.imageUrl}
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

                  {/* Mobile-only Expand Badge */}
                  <div className="absolute bottom-4 right-4 md:hidden p-2 rounded-full bg-[#0A0A0A]/85 border border-white/10 text-[#D4AF37]">
                    <Eye size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
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
      </div>
    </section>
  );
}
