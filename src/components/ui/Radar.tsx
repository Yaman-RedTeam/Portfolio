export default function Radar() {
  return (
    <div className="relative w-full aspect-square max-w-[160px] mx-auto rounded-full overflow-hidden border border-neon-green/30 bg-black/40">
      <div className="absolute inset-0 rounded-full border border-neon-green/20" />
      <div className="absolute inset-[15%] rounded-full border border-neon-green/20" />
      <div className="absolute inset-[30%] rounded-full border border-neon-green/20" />
      <div className="absolute inset-[45%] rounded-full border border-neon-green/20" />
      <div className="absolute inset-0 top-1/2 h-px w-full bg-neon-green/10" />
      <div className="absolute inset-0 left-1/2 w-px h-full bg-neon-green/10" />
      <div
        className="radar-sweep absolute inset-0 origin-center"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(0,255,156,0.5), rgba(0,255,156,0) 35%)",
        }}
      />
      <span className="absolute top-[30%] left-[60%] w-1.5 h-1.5 rounded-full bg-neon-red animate-pulse-glow" />
      <span className="absolute top-[55%] left-[35%] w-1 h-1 rounded-full bg-neon-cyan animate-pulse-glow" />
    </div>
  );
}
