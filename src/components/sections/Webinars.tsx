"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Presentation, Award } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Modal from "@/components/ui/Modal";
import webinars from "@/data/webinars.json";

type Webinar = (typeof webinars)[number];

export default function Webinars() {
  const [active, setActive] = useState<Webinar | null>(null);
  const pending = (w: Webinar) => w.id.startsWith("pending-");

  return (
    <section id="webinars" className="relative py-24 px-5 md:px-8 bg-[#0a0d10]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Talks & Workshops" title="Webinar Certificates" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {webinars.map((w, i) => (
            <motion.button
              key={w.id}
              type="button"
              onClick={() => setActive(w)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="group text-left"
            >
              {/* Hanger pin + wire */}
              <div className="flex flex-col items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan shadow-[0_0_10px_#00e5ff]" />
                <span className="w-px h-4 bg-white/25" />
              </div>

              {/* Frame */}
              <div className="cert-frame relative rounded-lg p-3 transition-transform duration-300 group-hover:-translate-y-1 group-hover:[transform:perspective(900px)_rotateX(5deg)]">
                {/* Corner bolts */}
                <span className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-neon-red/70" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-neon-red/70" />
                <span className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-neon-red/70" />
                <span className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-neon-red/70" />

                <div className="relative overflow-hidden rounded-sm border border-white/10 bg-black/40 aspect-[400/280]">
                  {pending(w) ? (
                    <div className="absolute inset-0 flex items-center justify-center font-hack text-xs text-white/30 uppercase tracking-wider">
                      Coming Soon
                    </div>
                  ) : (
                    <>
                      <Image
                        src={w.image}
                        alt={w.title}
                        width={400}
                        height={280}
                        className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      {/* Glass glare */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                </div>
              </div>

              {/* Nameplate */}
              <div className="mt-3 mx-auto w-fit px-4 py-1.5 rounded-md glass text-center">
                <p className="flex items-center justify-center gap-1.5 font-display font-semibold text-sm text-white">
                  <Presentation size={14} className="text-neon-cyan" />
                  {w.title}
                </p>
                {!pending(w) && (
                  <p className="font-hack text-[11px] text-white/45 mt-0.5">
                    {w.issuer} &middot; {w.role} &middot; {w.year}
                  </p>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)}>
        {active && (
          <div className="text-center">
            <div className="cert-frame rounded-lg p-3 mb-4">
              {pending(active) ? (
                <div className="w-full aspect-[400/280] flex items-center justify-center font-hack text-sm text-white/40 uppercase tracking-wider">
                  Certificate coming soon
                </div>
              ) : (
                <Image
                  src={active.image}
                  alt={active.title}
                  width={400}
                  height={280}
                  className="w-full h-auto rounded-sm"
                />
              )}
            </div>
            <h3 className="font-display font-bold text-lg neon-text-cyan mb-1 flex items-center justify-center gap-2">
              <Award size={18} /> {active.title}
            </h3>
            {!pending(active) && (
              <>
                <p className="text-white/60 text-sm mb-4">
                  {active.issuer} &middot; {active.role} &middot; {active.year}
                </p>
                <a
                  href={active.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-neon-cyan text-black font-hack text-xs uppercase tracking-wider"
                >
                  Verify Certificate <ExternalLink size={14} />
                </a>
              </>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
