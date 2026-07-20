"use client";

import { useEffect, useState } from "react";

type Props = {
  lines: string[];
  charDelay?: number;
  lineDelay?: number;
  restartDelay?: number;
};

export default function TypingTerminal({
  lines,
  charDelay = 28,
  lineDelay = 350,
  restartDelay = 4000,
}: Props) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const current = lines[lineIdx] ?? "";
    let timeout: ReturnType<typeof setTimeout>;

    if (charCount < current.length) {
      timeout = setTimeout(() => setCharCount((c) => c + 1), charDelay);
    } else if (lineIdx < lines.length - 1) {
      timeout = setTimeout(() => {
        setLineIdx((i) => i + 1);
        setCharCount(0);
      }, lineDelay);
    } else {
      timeout = setTimeout(() => {
        setLineIdx(0);
        setCharCount(0);
      }, restartDelay);
    }

    return () => clearTimeout(timeout);
  }, [charCount, lineIdx, lines, charDelay, lineDelay, restartDelay]);

  return (
    <div className="font-hack text-[11px] md:text-xs leading-6 min-h-[16rem]">
      {lines.slice(0, lineIdx).map((line, i) => (
        <p key={i} className="text-neon-green/85">
          <span className="text-white/30">{">"}</span> {line}
        </p>
      ))}
      <p className="text-neon-green">
        <span className="text-white/30">{">"}</span> {(lines[lineIdx] ?? "").slice(0, charCount)}
        <span className="cursor-blink">▊</span>
      </p>
    </div>
  );
}
