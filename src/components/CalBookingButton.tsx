"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { getCalApi } from "@calcom/embed-react";
import { Calendar } from "lucide-react";

interface CalButtonProps {
  className?: string;
  variant?: "solid" | "glass" | "text" | "minimal";
  text?: string;
}

const CAL_LINK = "framerush-studio-zmpiyb/project-inquiry";

export default function CalBookingButton({ className = "", variant = "solid", text = "Book a Call" }: CalButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const calApiRef = useRef<Awaited<ReturnType<typeof getCalApi>> | null>(null);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "project-inquiry" });
      cal("ui", {
        styles: {
          branding: { brandColor: "#D4AF37" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      calApiRef.current = cal;
    })();
  }, []);

  // Imperative open — does NOT rely on data-cal-* attribute scanning
  const handleClick = useCallback(() => {
    const cal = calApiRef.current;
    if (cal) {
      cal("modal", {
        calLink: CAL_LINK,
        config: { layout: "month_view" },
      });
    } else {
      // Fallback: open in same tab if the embed hasn't loaded yet
      window.location.href = `https://cal.com/${CAL_LINK}`;
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles = {
    solid: "bg-[#D4AF37] text-[#0A0A0A] border border-[#D4AF37] hover:bg-[#D4AF37]/90 hover:text-[#0A0A0A] shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_40px_rgba(212,175,55,0.45)] px-8 py-4",
    glass: "glass-panel text-[#F2F2F2] border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 hover:text-[#D4AF37] px-8 py-4",
    minimal: "glass-panel text-[#F2F2F2] border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 hover:text-[#D4AF37] px-6 py-2.5",
    text: "text-[#B8B8B8] hover:text-[#D4AF37]",
  };

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      data-cursor="hover"
      className={`relative overflow-hidden flex items-center justify-center gap-2.5 text-xs font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-500 ${variantStyles[variant]} ${className}`}
    >
      {variant === "solid" && <Calendar size={14} />}
      {text}
    </motion.button>
  );
}
