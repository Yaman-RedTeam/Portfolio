"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import { Eye, PlayCircle, Mail } from "lucide-react";
import { SOCIAL_ICONS } from "@/components/ui/SocialIcon";
import profile from "@/data/profile.json";
import socials from "@/data/socials.json";

// WebGL wireframe globe is client-only — skip SSR so three.js never runs on the server.
const HeroGlobe = dynamic(() => import("@/components/ui/HeroGlobe"), {
  ssr: false,
});

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-30 bg-[#060607]" />
      <div className="absolute inset-0 -z-20 grid-bg-red" />
      {/* Ambient 3D particle globe */}
      <div className="absolute inset-0 -z-20 opacity-70 pointer-events-none">
        <HeroGlobe />
      </div>
      <div className="absolute top-1/3 right-[8%] -z-20 w-[520px] h-[520px] max-w-[70vw] rounded-full hero-glow-red opacity-60" />
      <div className="absolute -left-40 top-1/2 -z-20 w-[420px] h-[420px] rounded-full bg-neon-red/5 blur-[130px]" />
      <div className="absolute inset-0 -z-10 hero-vignette" />

      <div className="mx-auto max-w-7xl w-full px-5 md:px-8 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6 items-center">
        {/* Left column */}
        <motion.div variants={container} initial="hidden" animate="show" className="order-2 lg:order-1">
          <motion.p
            variants={item}
            className="font-hack text-neon-cyan text-sm md:text-base mb-5 tracking-wide"
          >
            {"< "}Offensive Security Specialist{" />"}
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display font-black leading-[0.95] mb-5"
          >
            <span className="block text-white text-6xl md:text-7xl xl:text-8xl drop-shadow-[0_0_18px_rgba(255,255,255,0.15)]">
              YAMAN
            </span>
            <span className="block neon-text-red text-[2rem] md:text-5xl xl:text-6xl mt-2 tracking-wide">
              RED TEAM SPECIALIST
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-white/70 text-sm md:text-base tracking-wide mb-7 max-w-xl"
          >
            Offensive Security <span className="text-neon-red">|</span> Ethical Hacker{" "}
            <span className="text-neon-red">|</span> Penetration Tester{" "}
            <span className="text-neon-red">|</span> Content Creator
          </motion.p>

          {/* Animated typing list */}
          <motion.ul variants={item} className="font-hack text-sm md:text-base space-y-2 mb-9">
            {profile.titles.map((title, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
                className="flex items-center gap-2 text-white/80"
              >
                <span className="text-neon-red">{">"}</span>
                <span>{title}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Buttons */}
          <motion.div variants={item} className="flex flex-wrap gap-4 mb-9">
            <a
              href="#projects"
              className="glow-btn group flex items-center gap-2 px-6 py-3.5 rounded-lg bg-neon-red/90 text-white font-hack text-sm uppercase tracking-wider shadow-[0_0_24px_rgba(255,0,60,0.45)] hover:shadow-[0_0_36px_rgba(255,0,60,0.75)] transition-all"
            >
              <Eye size={17} /> View Portfolio
            </a>
            <a
              href={socials.find((s) => s.name === "YouTube")?.url ?? "#videos"}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn flex items-center gap-2 px-6 py-3.5 rounded-lg neon-border-cyan text-neon-cyan font-hack text-sm uppercase tracking-wider hover:bg-neon-cyan/10 transition-colors"
            >
              <PlayCircle size={17} /> Watch YouTube
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="glow-btn flex items-center gap-2 px-6 py-3.5 rounded-lg border border-white/20 text-white/90 font-hack text-sm uppercase tracking-wider hover:border-neon-red hover:text-neon-red transition-colors"
            >
              <Mail size={17} /> Contact Me
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div variants={item} className="flex items-center gap-3">
            {socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.icon] ?? SOCIAL_ICONS.Github;
              if (!s.url) {
                return (
                  <span
                    key={s.name}
                    aria-label={`${s.name} (link coming soon)`}
                    title={`${s.name} — link coming soon`}
                    className="w-11 h-11 flex items-center justify-center rounded-lg glass opacity-40 cursor-not-allowed"
                  >
                    <Icon size={18} />
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
                  className="w-11 h-11 flex items-center justify-center rounded-lg glass cursor-pointer hover:neon-border-red hover:text-neon-red hover:scale-110 transition-all"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right column — cinematic hacker artwork */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="order-1 lg:order-2 relative"
        >
          {/* Volumetric red glow behind the figure */}
          <div className="absolute inset-x-0 top-[8%] bottom-[12%] -z-10 hero-glow-red animate-glow-pulse rounded-full" />

          {/* Realistic Earth (your image) behind the hooded figure */}
          <div className="pointer-events-none absolute left-1/2 top-[37%] -translate-x-1/2 -translate-y-1/2 w-[128%] max-w-[780px]">
            <Image
              src="/images/earth-photo.png"
              alt="Earth from space at night"
              width={1028}
              height={1028}
              priority
              sizes="(min-width: 1024px) 780px, 130vw"
              className="w-full h-auto select-none"
            />
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto w-full max-w-[540px]"
          >
            <Image
              src="/images/hacker-cutout-hd.png"
              alt="Hooded hacker with a glowing red Y"
              width={754}
              height={866}
              quality={95}
              priority
              sizes="(min-width: 1024px) 560px, 90vw"
              className="relative w-full h-auto select-none pointer-events-none"
            />
          </motion.div>

          {/* HUD annotations floating around the globe */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="pointer-events-none absolute inset-0 hidden sm:block font-hack select-none"
          >
            <span className="absolute top-[3%] right-[2%] text-[11px] tracking-[0.25em] text-neon-cyan/70">
              TARGET_01
            </span>
            <span className="absolute top-[22%] right-[0%] text-right text-[9px] leading-relaxed tracking-[0.2em] text-neon-red/50">
              SECURE
              <br />
              ACCESS_GRANTED
            </span>
            <span className="absolute top-[55%] -right-[3%] text-[11px] tracking-[0.15em] text-neon-cyan/70">
              /3.118.35.7
            </span>
            <span className="absolute top-[33%] left-[1%] flex items-center gap-1.5 text-[11px] tracking-[0.15em] text-neon-cyan/60">
              <span className="inline-block w-1.5 h-1.5 bg-neon-cyan/70" />
              1D 900FF21
            </span>
            <span className="absolute bottom-[9%] right-[4%] text-[11px] tracking-[0.25em] text-neon-red/70">
              #ATTACK_VECTOR
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/40 hover:text-neon-cyan transition-colors"
      >
        <span className="font-hack text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="w-5 h-8 rounded-full border border-white/25 flex justify-center pt-1.5">
          <motion.span
            className="w-1 h-1.5 rounded-full bg-neon-cyan"
            animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </span>
      </motion.a>
    </section>
  );
}
