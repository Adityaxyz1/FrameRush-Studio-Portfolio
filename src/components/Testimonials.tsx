"use client";

import { motion } from "framer-motion";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  position: string;
  company: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    quote: "“Frame Rush Studio completely re-imagined our digital narrative. The 3D motion elements they crafted hold user focus longer than any asset we've deployed. An absolute masterclass in luxury cinematic design.”",
    author: "Elena Rostova",
    position: "VP of Creative Direction",
    company: "Vanguard Global",
  },
  {
    id: 2,
    quote: "“Their attention to timing, rhythm, and structural micro-movement is unparalleled. It felt less like hiring a production agency and more like collaborating with high-end digital artists.”",
    author: "Julian Thorne",
    position: "Founder & Chief Architect",
    company: "Studio Thorne",
  },
  {
    id: 3,
    quote: "“We commissioned them for a large-scale product projection reel and an interactive portfolio site. The result was visually breathtaking and performed flawlessly at 60 FPS across all Smart display systems.”",
    author: "Sophia Sterling",
    position: "Executive Brand Director",
    company: "Aether Lifestyle",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative w-full bg-[#0A0A0A] py-20 md:py-32 overflow-hidden">
      {/* Soft Background Spotlight */}
      <div className="absolute top-[30%] left-[35%] w-[40vw] h-[40vw] rounded-full bg-[#D4AF37]/[0.012] filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="mb-16 md:mb-24 text-left">
          <p className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#D4AF37] mb-3">
            05 • Client Verifications
          </p>
          <h2 className="text-white leading-tight font-display mb-4">
            Studio Endorsements
          </h2>
        </div>

        {/* Minimal Luxury List Grid */}
        <div className="flex flex-col gap-10">
          {testimonialsData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative border-b border-white/[0.06] pb-10 flex flex-col md:flex-row gap-6 md:gap-12 justify-between items-start"
            >
              {/* Quote Italic typography */}
              <div className="w-full md:w-3/4">
                <p className="text-[#F2F2F2] font-display font-light italic leading-relaxed text-lg md:text-xl lg:text-2xl transition-colors duration-500 group-hover:text-white">
                  {item.quote}
                </p>
              </div>

              {/* Author Credits */}
              <div className="w-full md:w-1/4 flex flex-col md:items-end text-left md:text-right pt-2 md:pt-0">
                <h4 className="text-white font-sans font-semibold text-sm md:text-base tracking-wide mb-1">
                  {item.author}
                </h4>
                <p className="text-[10px] font-sans tracking-[0.1em] text-[#D4AF37] uppercase mb-0.5">
                  {item.position}
                </p>
                <p className="text-[10px] font-sans tracking-[0.1em] text-[#B8B8B8]/60 uppercase">
                  {item.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
