"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  color?: string;
  opacity?: number;
};

export default function MatrixRain({ className = "", color = "#00e5ff", opacity = 0.15 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    let drops = new Array(columns).fill(1);

    const chars = "01ｱｲｳｴｵｶｷｸｹｺABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&*";

    let animationId: number;

    function draw() {
      if (!ctx) return;
      ctx.fillStyle = "rgba(10, 10, 10, 0.08)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    }

    draw();

    function handleResize() {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      columns = Math.floor(width / fontSize);
      drops = new Array(columns).fill(1);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
