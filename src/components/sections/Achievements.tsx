"use client";

import { motion } from "framer-motion";
import { Trophy, FileBadge, Video, FolderGit2, FlaskConical, Timer } from "lucide-react";
import Counter from "@/components/ui/Counter";
import achievements from "@/data/achievements.json";

const ICONS = [FileBadge, Video, FolderGit2, FlaskConical, Trophy, Timer];

export default function Achievements() {
  return (
    <section className="relative py-24 px-5 md:px-8 bg-[#0a0d10]">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-2 mb-10">
          <Trophy className="text-neon-cyan" size={22} />
          <h2 className="font-display text-2xl font-bold neon-text-cyan">Achievements</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="cyber-card p-5 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full glass flex items-center justify-center">
                  <Icon className="text-neon-red" size={20} />
                </div>
                <p className="font-display text-2xl font-bold neon-text-cyan">
                  <Counter value={item.value} suffix={item.suffix} />
                </p>
                <p className="text-white/50 text-[11px] uppercase tracking-wider mt-1">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
