"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  edgeColor?: string;
};

export default function Marquee({ children, speed = 40, reverse = false, edgeColor = "#0a0a0a" }: Props) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
        style={{ background: `linear-gradient(to right, ${edgeColor}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
        style={{ background: `linear-gradient(to left, ${edgeColor}, transparent)` }}
      />
      <div
        className={`flex w-max gap-6 ${paused ? "animate-marquee-paused" : ""}`}
        style={{
          animation: `marquee-left ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
