"use client";

const particles = [
  [12, 59, 1, 0], [19, 77, 1.5, 3], [27, 63, 1, 5], [36, 70, 1.5, 2], [44, 50, 1, 7],
  [55, 72, 1.5, 1], [66, 61, 1, 4], [75, 78, 1.5, 6], [84, 55, 1, 2], [91, 70, 1.5, 5],
];

export default function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map(([left, top, size, delay], index) => (
        <i
          key={index}
          className="dust absolute rounded-full bg-white/90"
          style={{ left: `${left}%`, top: `${top}%`, width: `${size * 2}px`, height: `${size * 2}px`, animationDelay: `${delay}s` }}
        />
      ))}
      <div className="bird absolute left-0 top-[31%] text-[#4c666b]/55" style={{ animationDelay: "-5s" }}>⌁</div>
      <div className="bird absolute left-0 top-[35%] text-[#4c666b]/45" style={{ animationDelay: "-14s", animationDuration: "34s" }}>⌁</div>
    </div>
  );
}
