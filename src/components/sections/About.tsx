"use client";

import { motion } from "framer-motion";
import { Award, FileBadge, Timer, MonitorPlay } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Counter from "@/components/ui/Counter";
import profile from "@/data/profile.json";

const STAT_ICONS = [Timer, FileBadge, Award, MonitorPlay];

export default function About() {
  return (
    <section id="about" className="relative py-24 px-5 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Who Am I" title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 cyber-card p-6"
          >
            <p className="text-white/70 leading-relaxed mb-6">{profile.bio}</p>
            <div className="grid grid-cols-2 gap-4">
              {profile.stats.map((stat, i) => {
                const Icon = STAT_ICONS[i % STAT_ICONS.length];
                return (
                  <div key={stat.label} className="glass rounded-lg p-4 text-center">
                    <Icon className="mx-auto mb-2 text-neon-cyan" size={20} />
                    <p className="font-display text-2xl font-bold text-white">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-[11px] text-white/50 uppercase tracking-wider mt-1">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
            <a
              href="#contact"
              className="mt-6 inline-block px-5 py-2.5 rounded-md neon-border-red font-hack text-xs uppercase tracking-wider hover:bg-neon-red/10 transition-colors"
            >
              Read More
            </a>
          </motion.div>

          <div className="lg:col-span-3 relative pl-6">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-neon-red via-neon-cyan to-transparent" />
            {profile.timeline.map((item, i) => (
              <motion.div
                key={`${item.year}-${item.title}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative mb-8 last:mb-0"
              >
                <span className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-neon-cyan shadow-[0_0_10px_#00e5ff]" />
                <div className="cyber-card p-5">
                  <span className="font-hack text-neon-red text-xs">{item.year}</span>
                  <h3 className="font-display font-semibold text-lg mt-1 mb-1">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
