"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Code2, FileText } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import projects from "@/data/projects.json";

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 px-5 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Built &amp; Battle-Tested" title="Projects" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="cyber-card overflow-hidden group"
            >
              <div className="relative w-full aspect-[16/9] bg-white/5 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-lg mb-2 neon-text-cyan">
                  {project.title}
                </h3>
                <p className="text-white/60 text-sm mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full text-[11px] font-hack border border-white/15 text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-white/15 text-xs font-hack uppercase tracking-wider hover:border-neon-cyan hover:text-neon-cyan transition-colors"
                    >
                      <Code2 size={14} /> GitHub
                    </a>
                  )}
                  {project.report && (
                    <a
                      href={project.report}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-neon-red text-xs font-hack uppercase tracking-wider hover:shadow-[0_0_16px_rgba(255,0,60,0.6)] transition-shadow"
                    >
                      <FileText size={14} /> View Report
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
