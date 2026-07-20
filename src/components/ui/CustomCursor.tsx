"use client";

import { useEffect, useRef } from "react";

const FLARE_COUNT = 22; // pool of reusable trail particles

/**
 * Cyberpunk cursor: a precise red dot + a trailing neon ring that expands over
 * interactive elements, plus a light flare trail that drops fading particles as
 * the pointer moves. Tracking only binds on fine-pointer (mouse) devices.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const flaresRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...target };
    const lastEmit = { x: target.x, y: target.y };
    let flareIdx = 0;
    let visible = false;
    let hovering = false;

    const INTERACTIVE =
      "a, button, input, textarea, select, label, [role='button'], .cyber-card";

    // Drop a fading flare particle at (x, y) with a little random drift.
    const emitFlare = (x: number, y: number) => {
      const p = flaresRef.current[flareIdx];
      flareIdx = (flareIdx + 1) % FLARE_COUNT;
      if (!p) return;
      const dx = (Math.random() - 0.5) * 14;
      const dy = (Math.random() - 0.5) * 14;
      p.style.transition = "none";
      p.style.opacity = "0.55";
      p.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(1)`;
      // force reflow so the reset above applies before we animate out
      void p.offsetWidth;
      p.style.transition = "transform 0.55s ease-out, opacity 0.55s ease-out";
      p.style.opacity = "0";
      p.style.transform = `translate3d(${x + dx}px, ${y + dy}px, 0) translate(-50%, -50%) scale(0.2)`;
    };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }

      // Emit a flare once the pointer has travelled a little distance.
      const dist = Math.hypot(e.clientX - lastEmit.x, e.clientY - lastEmit.y);
      if (dist > 6) {
        emitFlare(e.clientX, e.clientY);
        lastEmit.x = e.clientX;
        lastEmit.y = e.clientY;
      }

      const overInteractive = !!(e.target as Element)?.closest?.(INTERACTIVE);
      if (overInteractive !== hovering) {
        hovering = overInteractive;
        ring.classList.toggle("cursor-ring--active", hovering);
        dot.classList.toggle("cursor-dot--active", hovering);
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onDown = () => ring.classList.add("cursor-ring--down");
    const onUp = () => ring.classList.remove("cursor-ring--down");

    let raf = 0;
    const loop = () => {
      ringPos.x += (target.x - ringPos.x) * 0.18;
      ringPos.y += (target.y - ringPos.y) * 0.18;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      {Array.from({ length: FLARE_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            flaresRef.current[i] = el;
          }}
          className="cursor-flare"
          aria-hidden
        />
      ))}
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
