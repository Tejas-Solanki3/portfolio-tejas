"use client";

import { useEffect, useRef, useState } from "react";
// @ts-ignore
import webGLFluidSimulation from "webgl-fluid";

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || ('ontouchstart' in window) || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    setIsInitialized(true);
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isInitialized) return; // Wait until we know if it's mobile or not
    if (isMobile) return; // Completely disable fluid simulation on mobile devices

    if (canvasRef.current) {
      webGLFluidSimulation(canvasRef.current, {
        IMMEDIATE: false,
        TRIGGER: 'hover',
        SIM_RESOLUTION: 256,
        DYE_RESOLUTION: 1024,
        CAPTURE_RESOLUTION: 512,
        DENSITY_DISSIPATION: 2.5,
        VELOCITY_DISSIPATION: 2.0,
        PRESSURE: 0.1,
        PRESSURE_ITERATIONS: 20,
        CURL: 3,
        SPLAT_RADIUS: 0.2,
        SPLAT_FORCE: 6000,
        SHADING: true,
        COLORFUL: true,
        COLOR_UPDATE_SPEED: 10,
        PAUSED: false,
        BACK_COLOR: { r: 255, g: 255, b: 255 },
        TRANSPARENT: true,
        BLOOM: false,
        SUNRAYS: false,
      });

      // Forward window mouse events to the canvas so fluid works everywhere
      const forwardEvent = (e: any) => {
        if (!canvasRef.current || e.target === canvasRef.current) return;
        try {
          if (e.type.startsWith('mouse')) {
            const clonedEvent = new MouseEvent(e.type, e);
            canvasRef.current.dispatchEvent(clonedEvent);
          }
        } catch (error) {
          // Ignore event forwarding errors
        }
      };

      const events = ['mousemove'];
      events.forEach(ev => window.addEventListener(ev, forwardEvent, { passive: true }));
      
      return () => {
        events.forEach(ev => window.removeEventListener(ev, forwardEvent));
      };
    }
  }, [isInitialized, isMobile]);

  if (isMobile || !isInitialized) return null;

  return (
    <div className="fixed top-0 left-0 z-0 h-screen w-screen pointer-events-none overflow-hidden hidden md:block">
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-70"
        style={{ pointerEvents: 'auto' }} // Allow mouse interactions
      />
    </div>
  );
}

