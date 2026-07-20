"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Activity, Radar as RadarIcon, TerminalSquare, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Radar from "@/components/ui/Radar";
import TypingTerminal from "@/components/ui/TypingTerminal";
import Sparkline from "@/components/ui/Sparkline";
import LiveClock from "@/components/ui/LiveClock";
import profile from "@/data/profile.json";

const d = profile.dashboard;

const card = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: "easeOut" as const },
  }),
};

function Panel({
  children,
  className = "",
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={card}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className={`cyber-card p-5 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Label({ icon: Icon, text }: { icon: typeof Activity; text: string }) {
  return (
    <p className="flex items-center gap-2 text-[10px] text-white/45 uppercase tracking-[0.2em] mb-3">
      <Icon size={13} className="text-neon-cyan" />
      {text}
    </p>
  );
}

export default function CyberDashboard() {
  return (
    <section className="relative py-24 px-5 md:px-8 bg-[#080a0d]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Live Operations" title="Cyber Command Center" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 font-hack">
          {/* System Status */}
          <Panel index={0}>
            <Label icon={ShieldCheck} text="System Status" />
            <div className="flex items-center gap-2 text-neon-green text-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-neon-green animate-pulse-glow shadow-[0_0_8px_#00ff9c]" />
              {profile.system.status}
            </div>
            <p className="text-white/40 text-[11px] mt-3">
              OS: {profile.system.os}
              <br />
              IP: {profile.system.ip}
            </p>
          </Panel>

          {/* Threat Level */}
          <Panel index={1}>
            <Label icon={Activity} text="Threat Level" />
            <p className="text-neon-green text-lg mb-3">{d.threatLevel}</p>
            <div className="flex gap-1 items-end h-8">
              {Array.from({ length: 16 }).map((_, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${30 + i * 4}%`,
                    background: i < 5 ? "#00ff9c" : i < 11 ? "#e5d400" : "#ff003c",
                    opacity: i < 4 ? 1 : 0.35,
                  }}
                />
              ))}
            </div>
          </Panel>

          {/* Uptime / quick stat */}
          <Panel index={2}>
            <Label icon={Clock} text="Uptime" />
            <p className="text-neon-cyan text-2xl">{d.uptime}</p>
            <p className="text-white/40 text-[11px] mt-3">Access: Granted</p>
          </Panel>

          {/* Live Clock */}
          <Panel index={3}>
            <Label icon={Clock} text="Live Clock" />
            <LiveClock />
          </Panel>

          {/* Live Radar */}
          <Panel index={4} className="col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col">
            <Label icon={RadarIcon} text="Live Radar" />
            <div className="flex-1 flex items-center justify-center py-2">
              <div className="w-full max-w-[220px]">
                <Radar />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center mt-2">
              <div>
                <p className="text-white/40 text-[9px] uppercase">Targets</p>
                <p className="text-neon-green text-sm">24</p>
              </div>
              <div>
                <p className="text-white/40 text-[9px] uppercase">Threats</p>
                <p className="text-neon-red text-sm">1</p>
              </div>
              <div>
                <p className="text-white/40 text-[9px] uppercase">Nodes</p>
                <p className="text-neon-cyan text-sm">128</p>
              </div>
            </div>
          </Panel>

          {/* Terminal Logs */}
          <Panel index={5} className="col-span-2 lg:row-span-2">
            <Label icon={TerminalSquare} text="Terminal Logs" />
            <div className="rounded-lg bg-black/50 border border-white/5 p-4 h-full">
              <TypingTerminal lines={d.logs} />
            </div>
          </Panel>

          {/* Packets */}
          <Panel index={6}>
            <Label icon={Activity} text="Packets" />
            <p className="text-neon-cyan text-2xl">{d.packets}</p>
            <p className="text-white/35 text-[10px] mt-1">req/s</p>
          </Panel>

          {/* Latency */}
          <Panel index={7}>
            <Label icon={Activity} text="Latency" />
            <p className="text-neon-cyan text-2xl">{d.latency}</p>
            <p className="text-white/35 text-[10px] mt-1">avg round-trip</p>
          </Panel>

          {/* CPU Usage */}
          <Panel index={8} className="col-span-2">
            <Label icon={Activity} text="CPU Usage" />
            <div className="flex items-end justify-between gap-4">
              <p className="text-neon-green text-2xl leading-none">{d.cpu}%</p>
              <div className="flex-1 max-w-[220px]">
                <Sparkline color="#00ff9c" />
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}
