type Props = {
  eyebrow: string;
  title: string;
  accent?: "red" | "cyan";
  center?: boolean;
};

export default function SectionHeading({ eyebrow, title, accent = "cyan", center = false }: Props) {
  const accentClass = accent === "red" ? "neon-text-red" : "neon-text-cyan";
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      <p className="font-hack text-xs tracking-[0.3em] text-white/50 uppercase mb-2">
        {"// "}
        {eyebrow}
      </p>
      <h2 className={`font-display text-3xl md:text-4xl font-bold tracking-wide ${accentClass}`}>
        {title}
      </h2>
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-neon-red to-neon-cyan" />
    </div>
  );
}
