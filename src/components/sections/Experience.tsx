"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import experience from "@/data/experience.json";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 px-5 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Career Log" title="Experience" accent="red" />

        <div className="relative">
          {/* Vertical rail */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-neon-red via-neon-cyan to-transparent md:-translate-x-1/2" />

          <div className="space-y-10">
            {experience.map((job, i) => {
              const alignRight = i % 2 === 1;
              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`relative pl-12 md:pl-0 md:w-1/2 ${
                    alignRight ? "md:ml-auto md:pl-12" : "md:pr-12"
                  }`}
                >
                  {/* Node */}
                  <span
                    className={`absolute top-6 left-[9px] md:left-auto w-4 h-4 rounded-full bg-neon-red shadow-[0_0_12px_#ff003c] ${
                      alignRight ? "md:-left-2" : "md:-right-2"
                    }`}
                  />

                  <div className="cyber-card p-6 group">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-hack text-xs px-2.5 py-1 rounded-full neon-border-cyan text-neon-cyan">
                        {job.period}
                      </span>
                      {job.type && (
                        <span className="font-hack text-[10px] uppercase tracking-wider text-white/40">
                          {job.type}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                      <Briefcase size={16} className="text-neon-red shrink-0" />
                      {job.role}
                    </h3>
                    {Array.isArray(job.company) ? (
                      job.company.map((line) => (
                        <p key={line} className="text-neon-cyan text-sm mb-1">
                          {line}
                        </p>
                      ))
                    ) : (
                      <p className="text-neon-cyan text-sm mb-1">{job.company}</p>
                    )}
                    <p className="flex items-center gap-1.5 text-white/40 text-xs mb-4">
                      <MapPin size={12} /> {job.location}
                    </p>

                    <ul className="space-y-2">
                      {job.points.map((point) => (
                        <li key={point} className="flex gap-2 text-white/65 text-sm leading-relaxed">
                          <ChevronRight size={15} className="text-neon-red shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
