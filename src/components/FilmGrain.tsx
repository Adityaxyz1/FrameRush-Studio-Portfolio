"use client";

import { useEffect, useState } from "react";

export default function FilmGrain() {
  const [noiseUrl, setNoiseUrl] = useState<string>("");

  useEffect(() => {
    // Generate a 128x128 tileable high-performance noise sprite once on startup
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = ctx.createImageData(128, 128);
    const data = imgData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 255;
      data[i] = noise;     // R
      data[i + 1] = noise; // G
      data[i + 2] = noise; // B
      data[i + 3] = 9;     // A (very subtle dark-light noise grain, ~3.5% opacity)
    }
    
    ctx.putImageData(imgData, 0, 0);
    setNoiseUrl(canvas.toDataURL());
  }, []);

  if (!noiseUrl) return null;

  return (
    <div 
      className="noise-overlay fixed inset-0 w-full h-full pointer-events-none z-[9999]" 
      style={{
        backgroundImage: `url(${noiseUrl})`,
        backgroundRepeat: "repeat",
        opacity: 0.7,
      }}
      aria-hidden="true" 
    />
  );
}
