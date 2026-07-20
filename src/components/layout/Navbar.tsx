"use client";

import { useEffect, useState } from "react";
import { Menu, X, ShieldHalf } from "lucide-react";
import profile from "@/data/profile.json";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Certs", href: "#certifications" },
  { label: "Videos", href: "#videos" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      Boolean
    ) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="relative mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 font-display font-bold text-lg tracking-wide">
          <ShieldHalf className="text-neon-red" size={22} />
          <span className="text-white">YAMAN</span>
          <span className="neon-text-red">REDTEAM</span>
        </a>

        <div className="hidden lg:flex items-center gap-8 font-hack text-sm uppercase tracking-wider absolute left-1/2 -translate-x-1/2">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative transition-colors hover:text-white ${
                active === link.href ? "text-white" : "text-white/60"
              }`}
            >
              {link.label}
              {active === link.href && (
                <span className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full bg-neon-red shadow-[0_0_10px_#ff003c,0_0_4px_#ff003c]" />
              )}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={profile.resumeUrl}
            className="px-4 py-2 rounded-md border border-neon-cyan/60 text-neon-cyan text-xs font-hack uppercase tracking-wider hover:bg-neon-cyan/10 transition-colors"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="px-4 py-2 rounded-md bg-neon-red text-white text-xs font-hack uppercase tracking-wider hover:shadow-[0_0_20px_rgba(255,0,60,0.6)] transition-shadow"
          >
            Hire Me
          </a>
        </div>

        <button
          className="lg:hidden -m-2.5 p-2.5 text-white"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden glass-strong mt-4 mx-5 rounded-xl p-5 flex flex-col gap-4 font-hack text-sm uppercase tracking-wider">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-white/80 hover:text-neon-cyan">
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <a href={profile.resumeUrl} className="flex-1 text-center px-4 py-2 rounded-md border border-neon-cyan/60 text-neon-cyan text-xs">
              Resume
            </a>
            <a href="#contact" onClick={() => setOpen(false)} className="flex-1 text-center px-4 py-2 rounded-md bg-neon-red text-white text-xs">
              Hire Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
