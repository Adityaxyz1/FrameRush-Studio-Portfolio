"use client";

import { useRef, useState } from "react";
import { Play, VolumeX, Volume2 } from "lucide-react";

export default function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      className="relative w-full min-h-[90vh] bg-[#0A0A0A] py-16 md:py-24 overflow-hidden flex items-center justify-center"
    >
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12">

        {/* Editorial Subheader */}
        <div className="mb-10 text-left">
          <p className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#D4AF37] mb-3">
            01 • High-Octane Motion
          </p>
          <h2 className="text-white leading-tight font-display mb-4">
            The Showreel
          </h2>
          <p className="max-w-xl text-[#B8B8B8] font-sans font-light tracking-wide text-sm md:text-base">
            A dynamic display of high-concept CGI, cinematic color grades, editorial narrative pacing, and modern 3D design.
          </p>
        </div>

        {/* 
          Video Frame — Static container for zero-overhead video compositing:
          - NO scroll-linked transforms (scale/borderRadius were re-compositing 
            the entire 1080p video texture on every scroll tick)
          - will-change: transform promotes to its own GPU layer
          - Border replaces shadow — zero repaint cost
        */}
        <div
          className="relative w-full aspect-video md:h-[65vh] md:aspect-auto overflow-hidden rounded-lg bg-[#141414] border border-white/[0.06]"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
        >
          {/*
            VIDEO ELEMENT — 60fps rules:
            - NO CSS filter (brightness/contrast/saturate) — filters kill GPU compositing
            - NO scroll-linked parent transforms — causes video texture re-raster
            - playsInline + muted = required for browser autoplay policies
            - object-cover + w/h fill = no layout recalculation
            - translateZ(0) = forces GPU rasterization on its own layer
          */}
          <video
            ref={videoRef}
            src="/portfolio/Videos/Industrial reel.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: "translateZ(0)" }}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />

          {/*
            Gradient overlay — isolated z-layer, no filter, no blur
            Uses background gradient only (zero repaint cost)
          */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 40%, rgba(0,0,0,0.15) 100%)",
            }}
          />

          {/*
            Player Controls — isolated z-layer above video
            NO backdrop-blur (would create 2nd blur compositor — expensive)
            Solid bg instead of blur glass
          */}
          <div className="absolute bottom-6 right-6 flex items-center gap-3 z-20">
            <button
              onClick={togglePlay}
              data-cursor="hover"
              className="p-3.5 rounded-full bg-[#0A0A0A]/85 border border-white/10 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] transition-colors duration-200"
              aria-label={isPlaying ? "Pause Video" : "Play Video"}
            >
              {isPlaying ? (
                <span className="block w-2.5 h-2.5 border-l-2 border-r-2 border-current mx-0.5" />
              ) : (
                <Play size={12} fill="currentColor" className="ml-0.5" />
              )}
            </button>

            <button
              onClick={toggleMute}
              data-cursor="hover"
              className="p-3.5 rounded-full bg-[#0A0A0A]/85 border border-white/10 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] transition-colors duration-200"
              aria-label={muted ? "Unmute Video" : "Mute Video"}
            >
              {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
            </button>
          </div>

          {/* Watermark — pointer-events none, no filter */}
          <div className="absolute bottom-6 left-6 hidden sm:flex items-center z-20 pointer-events-none">
            <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-[#F2F2F2]/50 bg-[#0A0A0A]/70 px-3 py-1.5 rounded border border-white/[0.06]">
              Frame Rush Studio • Reel 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

