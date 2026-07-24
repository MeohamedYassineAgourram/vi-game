"use client";

import { motion } from "framer-motion";

const worlds = [
  { number: "01", title: "Tidebreak Isles", copy: "Chart a route through clear waters and find the clue hidden between the islands.", image: "/journey/img/worlds/tidebreak-isles.png" },
  { number: "02", title: "Sunstone Ruins", copy: "Cross an amber horizon where the desert keeps its own quiet language.", image: "/journey/img/worlds/sunstone-ruins.png" },
  { number: "03", title: "Azure Coves", copy: "Follow the tide through luminous coves, stone arches, and an unmarked passage.", image: "/journey/img/worlds/azure-coves.png" },
  { number: "04", title: "Waterfall Archives", copy: "A forgotten garden where every falling stream carries a piece of the answer.", image: "/journey/img/worlds/waterfall-archives.png" },
  { number: "05", title: "Floating Sanctuary", copy: "The final path rises above the mist, where the journey’s last light is waiting.", image: "/journey/img/worlds/floating-sanctuary.png" },
];

export default function JourneyPreview() {
  return (
    <section id="about" className="relative z-30 bg-[#fbfaf6] px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8 }} className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#b18443]">Three worlds · one path</p>
          <h2 className="mt-5 text-4xl font-light tracking-[-0.055em] text-[#27343a] sm:text-6xl">The journey is shaped by your curiosity.</h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#506368]">There are no loud directions here. Just a few beautiful worlds, small puzzles, and an ending worth finding.</p>
        </motion.div>
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {worlds.map((world, index) => (
            <motion.article key={world.number} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8, delay: index * 0.12 }} className="group overflow-hidden rounded-[2rem] bg-white p-4 shadow-[0_12px_35px_rgba(40,54,56,0.06)]">
              <div className="relative h-60 overflow-hidden rounded-[1.5rem] bg-[#dfeef0]">
                <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${world.image}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c3235]/35 via-transparent to-white/10" />
                <span className="absolute left-6 top-6 text-[10px] font-bold tracking-[0.25em] text-[#506368]/60">{world.number}</span>
              </div>
              <div className="px-3 pb-4 pt-6">
                <h3 className="text-xl font-medium tracking-[-0.04em]">{world.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#506368]/75">{world.copy}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
