"use client";

import { useEffect, useState } from "react";
import { ShieldHalf } from "lucide-react";
import { SOCIAL_ICONS } from "@/components/ui/SocialIcon";
import socials from "@/data/socials.json";
import profile from "@/data/profile.json";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Videos", href: "#videos" },
  { label: "Certifications", href: "#certifications" },
  { label: "Experience", href: "#experience" },
  { label: "Webinars", href: "#webinars" },
];

export default function Footer() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    const kickoff = setTimeout(() => setTime(new Date()), 0);
    return () => {
      clearInterval(id);
      clearTimeout(kickoff);
    };
  }, []);

  return (
    <footer className="relative border-t border-white/10 bg-[#070707] pt-16 pb-8 px-5 md:px-8">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg mb-3">
            <ShieldHalf className="text-neon-red" size={20} />
            <span>YAMAN</span>
            <span className="neon-text-red">REDTEAM</span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed">
            {profile.tagline}
          </p>
        </div>

        <div>
          <h4 className="font-hack text-xs uppercase tracking-widest text-neon-cyan mb-4">Quick Links</h4>
          <ul className="grid grid-cols-2 gap-2">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-white/50 text-sm hover:text-neon-cyan transition-colors">
                  {"> "}{l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-hack text-xs uppercase tracking-widest text-neon-cyan mb-4">Social Links</h4>
          <div className="flex items-center gap-3">
            {socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.icon] ?? SOCIAL_ICONS.Github;
              if (!s.url) {
                return (
                  <span
                    key={s.name}
                    aria-label={`${s.name} (link coming soon)`}
                    title={`${s.name} — link coming soon`}
                    className="w-11 h-11 flex items-center justify-center rounded-md glass opacity-40 cursor-not-allowed"
                  >
                    <Icon size={16} />
                  </span>
                );
              }
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="w-11 h-11 flex items-center justify-center rounded-md glass cursor-pointer hover:neon-border-cyan hover:text-neon-cyan hover:scale-110 transition-all"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="font-hack text-xs">
          <h4 className="uppercase tracking-widest text-neon-cyan mb-4">System Info</h4>
          <p className="text-white/50 mb-1">OS: {profile.system.os}</p>
          <p className="text-white/50 mb-1">IP: {profile.system.ip}</p>
          <p className="text-neon-green mb-1">STATUS: {profile.system.status}</p>
          <p className="text-white/50">LOCATION: {profile.system.location}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
        <p className="font-hack text-neon-red text-lg tabular-nums">
          {time
            ? time.toLocaleTimeString("en-US", { hour12: false })
            : "00:00:00"}
        </p>
        <p className="text-white/40 text-xs text-center">
          © {new Date().getFullYear()} Yaman RedTeam. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
