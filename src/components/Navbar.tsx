"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import CalBookingButton from "./CalBookingButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? "py-3 bg-[#0A0A0A]/70 backdrop-blur-xl border-b border-white/[0.04] shadow-2xl" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo / Monogram */}
          <a
            href="/"
            className="flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="relative w-8 h-8 md:w-9 md:h-9 overflow-hidden rounded bg-[#141414] border border-[#D4AF37]/30 flex items-center justify-center transition-all duration-500 group-hover:border-[#D4AF37]/80">
              <Image
                src="/portfolio/Branding/monogram.png"
                alt="Frame Rush Monogram"
                width={36}
                height={36}
                className="object-contain scale-110 group-hover:scale-125 transition-transform duration-700"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-sm md:text-base tracking-[0.2em] uppercase text-[#F2F2F2] group-hover:text-[#D4AF37] transition-colors duration-300">
                FRAME RUSH
              </span>
              <span className="text-[8px] tracking-[0.35em] uppercase text-[#D4AF37]/70 font-sans font-medium">
                STUDIO
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs font-medium tracking-[0.15em] uppercase text-[#B8B8B8] hover:text-[#D4AF37] transition-colors duration-300 relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA Action */}
          <div className="hidden md:flex items-center">
            <CalBookingButton variant="minimal" text="Book a Call" />
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#F2F2F2] hover:text-[#D4AF37] transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-[60px] bg-[#0A0A0A] z-40 md:hidden flex flex-col justify-between px-8 py-16 border-t border-white/[0.04]"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-display font-medium text-3xl tracking-wider text-[#B8B8B8] hover:text-[#D4AF37] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4"
            >
              <p className="text-[10px] uppercase tracking-widest text-[#B8B8B8]/60">
                Frame Rush Studio • Motion Excellence
              </p>
              <CalBookingButton variant="solid" className="w-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
