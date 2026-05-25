# Frame Rush Studio
### High-Fidelity Cinematic Motion Design & Production House Portfolio

A luxury, Awwwards-level digital showcase built for **Frame Rush Studio**. This immersive web application is crafted with a focus on deep cinematic atmosphere, fluid interactive systems, and hardware-accelerated rendering targeting a consistent **60 FPS** benchmark.

---

## 🎥 Immersive Cinematic Visuals & Animations

*   **WebGL Particle Lens Aperture (`Hero.tsx`)**: A custom HTML5 `canvas` simulation of a camera lens aperture rendered in a glowing gold particle ring. It rotates and translates dynamically in response to mouse coordinates, coupled with subtle viewport alignment crosshairs.
*   **Widescreen Parallax Showreel (`Showreel.tsx`)**: An edge-to-edge, inline autoplay video player (`Industrial reel.mp4`) that expands and scales outward smoothly as the user scrolls, creating a zoom-out viewfinder effect.
*   **Persistent Film Grain (`FilmGrain.tsx`)**: A hardware-accelerated animated noise layer running at very low opacity (`0.03`) to give the website a tactile, cinematic celluloid texture.
*   **Spring-Physics Custom Cursor (`CustomCursor.tsx`)**: A sleek custom cursor follower circle that tracks the mouse with beautiful spring-elastic physics. It dynamically adapts, scales, and morphs into `"VIEW"` or `"PLAY"` badges depending on hovered components.

---

## ⚡ High-Fidelity Interactive Showcase

*   **Spacious Staggered Portfolio Grid (`Projects.tsx`)**: A perfectly balanced 2-column editorial showcase displaying the studio's primary works. Even items are shifted vertically (`md:translate-y-24`) to establish a relaxed, artistic staggered layout that seamlessly collapses to sequential chronological order on mobile.
*   **Grayscale-to-Color Reveal Transitions**: Covers of all showcase works are rendered in a low-exposure **cinematic grayscale filter** by default to unify mismatched backgrounds. Hovering over a card triggers a smooth, hardware-accelerated transition to full color and exposure, creating a focus-reveal effect.
*   **Scroll-Lock & Reset Overlay Sheet**: Tapping a card expands a fullscreen case details view. Includes `modalScrollRef` to ensure the view opens at scroll position `0`, and binds to a unique global `window.__framerush_lenis` namespace (safeguarded against browser smooth-scroll extensions) to pause parent scroll interception while the modal is open.
*   **Interactive Widescreen Lightbox**: Expanding concept images in the case sheet opens them in a premium fullscreen lightbox overlay backed by a deep `#0A0A0A` backdrop blur, hover expansion masks, and spring transitions.
*   **Spotlight-Tracking Capability Cards (`Services.tsx`)**: Card panels representing creative expertise (Video Editing, 3D Motion, Graphic Design, Interactive Web) that track live mouse coordinates to project a localized, glowing soft-gold radial gradient cast under the user's cursor.
*   **SVG Scroll-Drawn Timelines (`Process.tsx`)**: A progression map tracing creative stages (Discovery → Concept → Production → Delivery). An active SVG path tracks scroll-linked progression, drawing a glowing thread of gold down the timeline nodes as the client scrolls.

---

## 🎨 Luxury Brand Token System (`globals.css`)

*   **Color Palette**:
    *   `Background`: Matte Black (`#0A0A0A`)
    *   `Containers`: Dark Charcoal (`#141414`)
    *   `Highlights`: Soft Gold (`#D4AF37` / `#F9E7B9`)
    *   `Foreground`: Muted Silver (`#B8B8B8`) & Off-White (`#F2F2F2`)
*   **Premium Typography**:
    *   *Display Headings*: **Clash Display** (striking cinematic display font)
    *   *Editorial Body Text*: **Satoshi** (clean high-end sans-serif)
    *   *Fluid Scaling*: Responsive sizes computed dynamically using custom CSS `clamp()` bounds.

---

## 🚀 GPU Performance & 60 FPS Guidelines

To maintain an uncompromised 60 FPS standard across all viewports, the site adheres to strict rendering guidelines:
1.  **Hardware-Accelerated Videos**: All HTML5 videos are forced onto dedicated GPU compositor layers via `transform: translateZ(0)` and `will-change: transform`.
2.  **No Backdrop Filter Blurs**: Backdrop filter blurs (`backdrop-filter: blur()`) are strictly avoided over canvas or video layers to prevent browser paint lag. Semi-transparent, high-opacity solid panels (`rgba(20,20,20,0.75)`) are utilized instead.
3.  **Radial Light Leaks**: Glowing ambiance is rendered via static `radial-gradient` backgrounds rather than heavy CSS `filter: blur(120px+)` overlays.
4.  **No Scroll-Linked Resizes**: Visual elements avoid scroll-linked height, scale, or width modifications that cause document layout recalculations, using CSS transitions and transforms instead.

---

## 🛠️ Getting Started

### Prerequisites
*   Node.js (v18.x or v20.x recommended)
*   npm or yarn

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/Adityaxyz1/FrameRush-Studio-Portfolio.git
    cd FrameRush-Studio-Portfolio
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running Locally
*   Start the development server:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it.

*   Compile and validate the optimized production build:
    ```bash
    npm run build
    npm run start
    ```
