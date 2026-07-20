"use client";

import { motion } from "framer-motion";
import {
  Globe,
  AppWindow,
  Plug,
  Server,
  Bug,
  Radar,
  ShieldAlert,
  Skull,
  Terminal,
  Network,
  Eye,
  Cloud,
  Bot,
  ShieldCheck,
  Sparkles,
  Workflow,
  Code2,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import skills from "@/data/skills.json";

const ICONS: Record<string, LucideIcon> = {
  Globe,
  AppWindow,
  Plug,
  Server,
  Bug,
  Radar,
  ShieldAlert,
  Skull,
  Terminal,
  Network,
  Eye,
  Cloud,
  Bot,
  ShieldCheck,
  Sparkles,
  Workflow,
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-5 md:px-8 bg-[#0a0d10]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Arsenal" title="Skills" accent="red" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill, i) => {
            const Icon = ICONS[skill.icon] ?? Code2;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
                className="cyber-card p-5 group cursor-default"
              >
                <Icon
                  className="text-neon-cyan mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:text-neon-red"
                  size={26}
                />
                <div className="flex items-center justify-between mb-2">
                  <p className="font-display font-semibold text-sm">{skill.name}</p>
                  <span className="font-hack text-[11px] text-white/40 group-hover:text-neon-cyan transition-colors">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-neon-red to-neon-cyan shadow-[0_0_8px_rgba(0,229,255,0.5)]"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
