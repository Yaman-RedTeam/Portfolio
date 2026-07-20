"use client";

import { useEffect, useState } from "react";

export default function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const kickoff = setTimeout(() => setNow(new Date()), 0);
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => {
      clearTimeout(kickoff);
      clearInterval(id);
    };
  }, []);

  const time = now ? now.toLocaleTimeString("en-US", { hour12: false }) : "00:00:00";
  const date = now
    ? now.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <div>
      <p className="font-hack text-3xl md:text-4xl text-neon-red tabular-nums tracking-wider drop-shadow-[0_0_12px_rgba(255,0,60,0.5)]">
        {time}
      </p>
      <p className="font-hack text-[11px] text-white/50 mt-1">{date || " "}</p>
    </div>
  );
}
