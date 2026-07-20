"use client";

import { useEffect, useState } from "react";

type Props = {
  color?: string;
  points?: number;
};

// Deterministic seed data so SSR and first client render match.
const SEED = [8, 14, 10, 18, 12, 22, 16, 26, 19, 30, 24, 34];

export default function Sparkline({ color = "#00ff9c", points = 12 }: Props) {
  const [data, setData] = useState<number[]>(() => SEED.slice(0, points));

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const next = prev.slice(1);
        next.push(10 + Math.round(Math.random() * 30));
        return next;
      });
    }, 1200);
    return () => clearInterval(id);
  }, []);

  const w = 100;
  const h = 32;
  const max = Math.max(...data, 1);
  const step = w / (data.length - 1);
  const path = data
    .map((v, i) => `${i === 0 ? "M" : "L"} ${(i * step).toFixed(1)} ${(h - (v / max) * h).toFixed(1)}`)
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-8" preserveAspectRatio="none">
      <path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill={color} opacity="0.12" />
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
