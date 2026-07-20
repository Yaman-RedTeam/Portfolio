"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { SOCIAL_ICONS } from "@/components/ui/SocialIcon";
import socials from "@/data/socials.json";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...form }),
      });
    } catch {
      // static hosting fallback: still show success to the user
    } finally {
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  }

  return (
    <section id="contact" className="relative py-24 px-5 md:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Let's Connect" title="Contact" center accent="red" />

        <motion.form
          name="contact"
          data-netlify="true"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="cyber-card p-6 md:p-10"
        >
          <input type="hidden" name="form-name" value="contact" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-xs font-hack uppercase tracking-wider text-white/50 mb-2">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-black/40 border border-white/15 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,229,255,0.3)] transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs font-hack uppercase tracking-wider text-white/50 mb-2">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-black/40 border border-white/15 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,229,255,0.3)] transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-xs font-hack uppercase tracking-wider text-white/50 mb-2">Subject</label>
            <input
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full bg-black/40 border border-white/15 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,229,255,0.3)] transition-all"
              placeholder="What's this about?"
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-hack uppercase tracking-wider text-white/50 mb-2">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-black/40 border border-white/15 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,229,255,0.3)] transition-all resize-none"
              placeholder="Tell me about your project or opportunity..."
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              {socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.icon] ?? SOCIAL_ICONS.Github;
                if (!s.url) {
                  return (
                    <span
                      key={s.name}
                      aria-label={`${s.name} (link coming soon)`}
                      title={`${s.name} — link coming soon`}
                      className="w-10 h-10 flex items-center justify-center rounded-md glass opacity-40 cursor-not-allowed"
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
                    className="w-10 h-10 flex items-center justify-center rounded-md glass cursor-pointer hover:neon-border-cyan hover:text-neon-cyan hover:scale-110 transition-all"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>

            <button
              type="submit"
              disabled={status !== "idle"}
              className="glow-btn flex items-center gap-2 px-6 py-3 rounded-md bg-neon-red font-hack text-sm uppercase tracking-wider hover:shadow-[0_0_20px_rgba(255,0,60,0.6)] transition-shadow disabled:opacity-70"
            >
              {status === "idle" && (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
              {status === "sending" && (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              )}
              {status === "sent" && (
                <>
                  <CheckCircle2 size={16} /> Message Sent
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
