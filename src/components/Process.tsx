"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Step {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

const stepsData: Step[] = [
  {
    number: "01",
    title: "Discovery",
    subtitle: "Aligning on Tone & Direction",
    description: "We initiate the partnership by dissecting your brand voice, studying visual references, and defining emotional targets. No coding or filming is done until we have absolute alignment on the direction.",
    details: ["Creative Questionnaire", "Visual Moodboard", "Technical Scope Audit", "Competitor Contrast Analysis"],
  },
  {
    number: "02",
    title: "Concept",
    subtitle: "Storyboarding & Wireframing",
    description: "We sculpt ideas into tangible drafts. We storyboard video sequences, curate typographic hierarchies, and design premium wireframe layouts. This defines the kinetic blueprint of the experience.",
    details: ["Aperture & Motion Storyboard", "Brushed Metal Style Frames", "Responsive Layout Prototypes", "Audio Direction Planning"],
  },
  {
    number: "03",
    title: "Production",
    subtitle: "High-Octane Development",
    description: "The execution phase. We edit cinematic raw footage, simulate 3D kinetic forms, refine vector designs, and engineer clean, interactive code. Hardware acceleration and 60 FPS performance are enforced here.",
    details: ["Anamorphic Raw Editing", "Octane CGI Simulations", "Next.js Core Engineering", "Custom Transition Crafting"],
  },
  {
    number: "04",
    title: "Delivery",
    subtitle: "Optimizing & Deployment",
    description: "We rigorously audit performance across mobile, smart TVs, and projection screens. We perform asset compression and file tuning to guarantee fast load times before delivering production-ready packages.",
    details: ["Multi-Device Testing", "Video Bitrate Tuning", "GPU Transform Audit", "Cloud Deployment Launch"],
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking to draw the SVG line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Scale line height from 0 to 1 as user scrolls
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full bg-[#0A0A0A] py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="mb-20 md:mb-28 text-left">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#D4AF37] block mb-3">
            04 • Workflow Logic
          </span>
          <h2 className="text-white leading-tight font-display mb-4">
            The Creative Process
          </h2>
          <p className="max-w-xl text-[#B8B8B8] font-sans font-light tracking-wide text-sm md:text-base">
            An intentional timeline built to sculpt raw ideas into immersive luxury motion assets and robust interactive architectures.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full mt-10 md:mt-16">
          {/* Vertical Center Line (Background Static Track) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/[0.04] -translate-x-1/2 pointer-events-none" />

          {/* SVG Animated Glowing Active Line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 top-0 w-[1px] bg-gradient-to-b from-[#D4AF37] via-[#D4AF37] to-[#AA820A] -translate-x-1/2 origin-top shadow-[0_0_15px_rgba(212,175,55,0.4)] pointer-events-none"
          />

          {/* Steps */}
          <div className="flex flex-col gap-24 md:gap-32">
            {stepsData.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={`relative flex flex-col md:flex-row w-full ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Visual Node Dot on the center line */}
                  <div className="absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 pointer-events-none z-10 flex items-center justify-center">
                    <motion.div 
                      className="w-3.5 h-3.5 rounded-full bg-[#0A0A0A] border border-[#D4AF37] flex items-center justify-center shadow-lg"
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1.2, backgroundColor: "#D4AF37" }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
                    </motion.div>
                  </div>

                  {/* Left panel (Empty on desktop for alignment) */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content panel */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-16 md:pr-16 flex flex-col items-start text-left">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="glass-panel p-8 rounded-xl border border-white/[0.03] hover:border-[#D4AF37]/20 transition-colors duration-500 w-full"
                    >
                      {/* Step Number Badge */}
                      <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#D4AF37] bg-[#D4AF37]/5 border border-[#D4AF37]/15 px-3 py-1 rounded-full mb-6 inline-block">
                        STEP {step.number}
                      </span>

                      {/* Heading */}
                      <h3 className="text-white text-2xl font-display font-medium tracking-tight mb-2">
                        {step.title}
                      </h3>
                      
                      {/* Subtitle */}
                      <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-4">
                        {step.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-xs md:text-sm text-[#B8B8B8] font-sans font-light tracking-wide leading-relaxed mb-6">
                        {step.description}
                      </p>

                      {/* Timeline deliverables taglist */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.04]">
                        {step.details.map((detail) => (
                          <span
                            key={detail}
                            className="text-[9px] font-sans font-semibold tracking-wide text-[#B8B8B8]/60 bg-white/[0.01] px-2.5 py-1 rounded"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
