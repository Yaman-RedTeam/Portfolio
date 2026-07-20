"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, BadgeCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Marquee from "@/components/ui/Marquee";
import Modal from "@/components/ui/Modal";
import certificates from "@/data/certificates.json";

type Cert = (typeof certificates)[number];

export default function Certifications() {
  const [active, setActive] = useState<Cert | null>(null);

  return (
    <section id="certifications" className="relative py-24 px-5 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Verified Credentials" title="CyberWarFare Certificates" />
      </div>

      <Marquee speed={38}>
        {certificates.map((cert) => (
          <button
            key={cert.id}
            type="button"
            onClick={() => setActive(cert)}
            className="cyber-card w-[360px] shrink-0 overflow-hidden text-left group"
          >
            {/* Certificate preview */}
            <div className="relative w-full aspect-[1.414/1] bg-black/40 overflow-hidden">
              <Image
                src={cert.image}
                alt={cert.fullName}
                fill
                sizes="360px"
                className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-1.5 mb-1">
                <BadgeCheck size={15} className="text-neon-cyan shrink-0" />
                <h3 className="font-display font-bold text-sm">{cert.name}</h3>
              </div>
              <p className="text-white/60 text-xs">{cert.fullName}</p>
              <p className="flex items-center justify-between mt-2 text-[11px] font-hack text-white/40">
                <span>{cert.issuer}</span>
                <span className="inline-flex items-center gap-1 text-neon-red uppercase tracking-wider">
                  View <ExternalLink size={11} />
                </span>
              </p>
            </div>
          </button>
        ))}
      </Marquee>

      <Modal open={!!active} onClose={() => setActive(null)} panelClassName="max-w-4xl">
        {active && (
          <div>
            <div className="relative w-full aspect-[1.414/1] rounded-lg overflow-hidden bg-black/50 border border-white/10">
              <Image
                src={active.image}
                alt={active.fullName}
                fill
                sizes="(min-width: 768px) 800px, 100vw"
                className="object-contain"
              />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-lg neon-text-cyan flex items-center gap-2">
                  <BadgeCheck size={18} /> {active.fullName}
                </h3>
                <p className="text-white/60 text-sm mt-0.5">
                  {active.issuer} &middot; {active.year}
                </p>
                <p className="font-hack text-[11px] text-white/40 mt-1 break-all">
                  ID: {active.credentialId}
                </p>
              </div>

              <a
                href={active.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-neon-cyan text-black font-hack text-xs uppercase tracking-wider hover:shadow-[0_0_16px_rgba(0,229,255,0.6)] transition-shadow"
              >
                View PDF <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
