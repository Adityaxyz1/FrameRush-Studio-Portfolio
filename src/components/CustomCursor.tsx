"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hoverType, setHoverType] = useState<"none" | "hover" | "view" | "play">("none");
  const [visible, setVisible] = useState(false);

  // Position of the mouse
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for lag effect
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Event delegation to capture hovered interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, [role='button'], [data-cursor]");
      
      if (interactiveEl) {
        const type = interactiveEl.getAttribute("data-cursor");
        if (type === "view") {
          setHoverType("view");
        } else if (type === "play") {
          setHoverType("play");
        } else {
          setHoverType("hover");
        }
      } else {
        setHoverType("none");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, visible]);

  if (!mounted) return null;

  // Render responsive cursor (disabled on mobile devices via CSS media queries)
  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#D4AF37] pointer-events-none z-[99999] hidden md:flex items-center justify-center -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: visible ? 1 : 0,
      }}
      animate={{
        width: hoverType === "hover" ? 48 : hoverType === "view" || hoverType === "play" ? 80 : 20,
        height: hoverType === "hover" ? 48 : hoverType === "view" || hoverType === "play" ? 80 : 20,
        backgroundColor: 
          hoverType === "view" || hoverType === "play" 
            ? "rgba(212, 175, 55, 0.9)" 
            : "rgba(212, 175, 55, 0.0)",
        borderColor: hoverType === "none" ? "rgba(212, 175, 55, 0.6)" : "#D4AF37",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.2 }}
    >
      {(hoverType === "view" || hoverType === "play") && (
        <motion.span 
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[10px] font-display font-bold uppercase tracking-widest text-[#0A0A0A]"
        >
          {hoverType}
        </motion.span>
      )}
    </motion.div>
  );
}
