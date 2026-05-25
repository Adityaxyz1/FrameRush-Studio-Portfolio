"use client";

import Image from "next/image";
import { MessageSquare, Mail } from "lucide-react";
import CalBookingButton from "./CalBookingButton";

export default function Contact() {
  const emailAddress = "studioframerush@gmail.com";

  return (
    <section 
      id="contact" 
      className="relative w-full bg-[#0A0A0A] pt-20 md:pt-32 pb-16 overflow-hidden flex flex-col justify-between"
    >
      {/* Heavy gold radial light leak at the bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[30vw] rounded-full bg-[#D4AF37]/[0.025] filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 flex-grow mb-16 md:mb-24">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Subtle Tag */}
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#D4AF37] mb-6 block">
            05 • Collaboration Hub
          </span>

          {/* High-Impact Headline */}
          <h2 className="text-white font-display mb-8 tracking-tight max-w-2xl leading-none">
            Need visuals that actually make people <span className="text-gold-brushed">stop scrolling?</span>
          </h2>

          <p className="max-w-lg text-[#B8B8B8] font-sans font-light tracking-wide text-sm md:text-base leading-relaxed mb-12">
            Let&apos;s build an unforgettable visual benchmark. Connect via our direct hotlines or coordinate a full technical concept review call.
          </p>

          {/* Conversion Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-lg mb-16">
            
            {/* Book a Call */}
            <CalBookingButton variant="solid" className="w-full sm:w-auto" />

            {/* WhatsApp */}
            <a
              href="https://wa.me/916386257515"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-4 text-xs font-bold tracking-[0.15em] uppercase text-[#F2F2F2] glass-panel border border-white/10 rounded-full hover:border-[#D4AF37] hover:bg-white/[0.02] transition-all duration-500"
            >
              <MessageSquare size={14} className="text-[#D4AF37]" />
              WhatsApp
            </a>

            {/* Email — mailto link */}
            <a
              href={`mailto:${emailAddress}`}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-4 text-xs font-bold tracking-[0.15em] uppercase text-[#F2F2F2] glass-panel border border-white/10 rounded-full hover:border-[#D4AF37] hover:bg-white/[0.02] transition-all duration-500"
            >
              <Mail size={14} className="text-[#D4AF37]" />
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Premium Studio Footer */}
      <footer className="w-full border-t border-white/[0.04] pt-12 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          {/* Logo & Voice */}
          <div className="md:col-span-6 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-7 h-7 overflow-hidden rounded bg-[#141414] border border-[#D4AF37]/30 flex items-center justify-center">
                <Image
                  src="/portfolio/Branding/monogram.png"
                  alt="Frame Rush Monogram"
                  width={28}
                  height={28}
                  className="object-contain scale-110"
                />
              </div>
              <span className="font-display font-bold text-sm tracking-[0.2em] uppercase text-white">
                FRAME RUSH
              </span>
            </div>
            <p className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-[#B8B8B8]/60 max-w-xs">
              Bold. Creative. Cinematic. Relentless. We create visuals that capture attention and leave a lasting impact.
            </p>
          </div>

          {/* Site Directories */}
          <div className="md:col-span-3 flex flex-col items-start gap-3">
            <h4 className="text-white text-xs font-display font-semibold uppercase tracking-wider mb-1">Directories</h4>
            <a href="#projects" className="text-[10px] font-sans uppercase tracking-wider text-[#B8B8B8] hover:text-[#D4AF37] transition-colors">Selected Projects</a>
            <a href="#services" className="text-[10px] font-sans uppercase tracking-wider text-[#B8B8B8] hover:text-[#D4AF37] transition-colors">Expert Capabilities</a>
            <a href="#process" className="text-[10px] font-sans uppercase tracking-wider text-[#B8B8B8] hover:text-[#D4AF37] transition-colors">Workflow Logic</a>
          </div>

          {/* Contact specs */}
          <div className="md:col-span-3 flex flex-col items-start gap-3">
            <h4 className="text-white text-xs font-display font-semibold uppercase tracking-wider mb-1">Press & Calls</h4>
            <span className="text-[10px] font-sans uppercase tracking-wider text-[#B8B8B8]">{emailAddress}</span>
            <span className="text-[10px] font-sans uppercase tracking-wider text-[#B8B8B8]">Based Globally • Digital Execution</span>
          </div>
        </div>

        {/* Dynamic system stats & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.03] pt-6 text-[9px] font-sans font-semibold tracking-widest text-[#B8B8B8]/40 uppercase">
          <span suppressHydrationWarning>© {new Date().getFullYear()} Frame Rush Studio. All Rights Reserved.</span>
        </div>
      </footer>
    </section>
  );
}
