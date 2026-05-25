"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import CalBookingButton from "./CalBookingButton";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true; // IntersectionObserver flag
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create offscreen canvas sprite to pre-render a gold glow particle texture
    const spriteCanvas = document.createElement("canvas");
    const spriteSize = 64;
    spriteCanvas.width = spriteSize;
    spriteCanvas.height = spriteSize;
    const sCtx = spriteCanvas.getContext("2d");
    if (sCtx) {
      const half = spriteSize / 2;
      const grad = sCtx.createRadialGradient(half, half, 0, half, half, half);
      grad.addColorStop(0, "rgba(212, 175, 55, 1.0)");
      grad.addColorStop(0.2, "rgba(249, 231, 185, 0.75)");
      grad.addColorStop(0.5, "rgba(212, 175, 55, 0.2)");
      grad.addColorStop(1, "rgba(212, 175, 55, 0)");
      sCtx.fillStyle = grad;
      sCtx.beginPath();
      sCtx.arc(half, half, half, 0, Math.PI * 2);
      sCtx.fill();
    }

    // Particles representing a floating camera aperture / lens shape
    const particlesCount = 180;
    const particles: Array<{
      angle: number;
      radius: number;
      originalRadius: number;
      speed: number;
      size: number;
      depth: number;
      phase: number;
    }> = [];

    for (let i = 0; i < particlesCount; i++) {
      const angle = (i / particlesCount) * Math.PI * 2;
      const originalRadius = 160 + Math.random() * 50;
      particles.push({
        angle,
        radius: originalRadius,
        originalRadius,
        speed: 0.003 + Math.random() * 0.004,
        size: 0.8 + Math.random() * 1.5,
        depth: Math.random(),
        phase: Math.random() * Math.PI * 2,
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.08;
      targetMouseY = (e.clientY - height / 2) * 0.08;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // IntersectionObserver: pause the render loop when hero is not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        // Resume the loop when the section becomes visible again
        if (!wasVisible && isVisible) {
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Render loop — only runs when the hero section is in the viewport
    const render = () => {
      if (!isVisible) return; // Stop the loop when off-screen

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.fillStyle = "rgba(10, 10, 10, 0.15)";
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid texture
      ctx.strokeStyle = "rgba(212, 175, 55, 0.015)";
      ctx.lineWidth = 1;
      
      const gridSpacing = 80;
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw floating particles using the pre-rendered sprite
      particles.forEach((p) => {
        p.angle += p.speed;
        p.phase += 0.01;

        const breathe = Math.sin(p.phase) * 6;
        const currentRadius = p.radius + breathe;

        const x3d = Math.cos(p.angle) * currentRadius;
        const y3d = Math.sin(p.angle) * currentRadius * 0.5;
        const depthScale = 0.5 + p.depth * 0.5;

        const x = width / 2 + x3d * depthScale + mouseX * depthScale;
        const y = height / 2 + y3d * depthScale + mouseY * depthScale;

        const size = p.size * 6 * depthScale;
        const alpha = (0.2 + 0.6 * Math.sin(p.phase)) * (0.3 + 0.7 * depthScale);

        ctx.globalAlpha = alpha;
        ctx.drawImage(spriteCanvas, x - size / 2, y - size / 2, size, size);
      });
      ctx.globalAlpha = 1.0;

      // Crosshairs
      ctx.strokeStyle = "rgba(212, 175, 55, 0.08)";
      ctx.beginPath();
      const cx = width / 2 + mouseX * 0.2;
      const cy = height / 2 + mouseY * 0.2;
      ctx.moveTo(cx - 10, cy);
      ctx.lineTo(cx + 10, cy);
      ctx.moveTo(cx, cy - 10);
      ctx.lineTo(cx, cy + 10);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.querySelector("#projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.querySelector("#contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Background canvas for 3D gold particle aperture */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ willChange: "transform" }}
      />

      {/* Cinematic Golden Light Leaks — pre-blurred radial gradients (no CSS filter) */}
      <div 
        className="absolute top-[20%] left-[10%] w-[35vw] h-[35vw] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)" }}
      />
      <div 
        className="absolute bottom-[10%] right-[10%] w-[45vw] h-[45vw] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)" }}
      />

      {/* Main Hero Panel */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-28 flex flex-col items-center text-center z-10">
        
        {/* Subtle Brand Tag */}
        <div className="mb-8 px-4 py-1.5 glass-panel rounded-full border border-white/[0.04] flex items-center gap-2 animate-reveal-up">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
            01 • Premium Motion Agency
          </span>
        </div>

        {/* Cinematic Headline */}
        <div className="max-w-4xl animate-reveal-up-delayed">
          <h1 className="text-white leading-tight font-display mb-6 tracking-tight">
            Motion That <br className="hidden md:block"/>
            <span className="text-gold-brushed">Holds Attention.</span>
          </h1>
        </div>

        {/* Editorial Subtext */}
        <p className="max-w-xl text-base md:text-lg text-[#B8B8B8] font-sans font-light tracking-wide mb-10 leading-relaxed animate-reveal-up-more-delayed">
          Video Editing <span className="text-[#D4AF37]/50 mx-2">•</span> 
          3D Visuals <span className="text-[#D4AF37]/50 mx-2">•</span> 
          Creative Direction <span className="text-[#D4AF37]/50 mx-2">•</span> 
          Interactive Experiences
        </p>

        {/* Elegant CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto animate-reveal-up-more-delayed">
          <button
            onClick={handleScrollToProjects}
            data-cursor="play"
            className="w-full sm:w-auto px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase text-[#0A0A0A] bg-[#D4AF37] border border-[#D4AF37] rounded-full hover:bg-transparent hover:text-[#D4AF37] transition-all duration-500 shadow-xl shadow-[#D4AF37]/10"
          >
            View Projects
          </button>
          <CalBookingButton variant="glass" className="w-full sm:w-auto" />
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, delay: 1.5 }}
        className="absolute bottom-10 left-0 right-0 mx-auto w-fit flex flex-col items-center gap-2 pointer-events-none z-20"
      >
        <span className="text-[9px] font-sans font-bold tracking-[0.25em] uppercase text-[#B8B8B8]/60">
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#D4AF37] to-transparent" />
      </motion.div>
    </section>
  );
}

