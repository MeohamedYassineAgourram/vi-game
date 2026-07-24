"use client";

import { motion } from "framer-motion";
import Button from "./Button";

const reveal = {
  hidden: { opacity: 0, y: 25 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 1.35, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HeroText() {
  const explore = () => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  const beginJourney = () => window.location.assign(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/play`);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex min-h-[100svh] flex-col items-center px-5 pt-[10vh] text-center sm:pt-[9vh]">
      <motion.p custom={0.7} initial="hidden" animate="visible" variants={reveal} className="mb-4 text-[9px] font-bold uppercase tracking-[0.42em] text-[#173940]/75 sm:text-[10px]">
        A new route is waiting
      </motion.p>
      <motion.h1 custom={0.85} initial="hidden" animate="visible" variants={reveal} className="max-w-4xl font-sans text-[clamp(1.55rem,3.55vw,3.55rem)] font-semibold uppercase leading-[1.08] tracking-[0.16em] text-[#173940] [font-family:Avenir_Next,Avenir,Futura,Century_Gothic,ui-sans-serif,sans-serif]">
        The hidden horizon
      </motion.h1>
      <motion.p custom={1.05} initial="hidden" animate="visible" variants={reveal} className="mt-4 max-w-sm text-[13px] font-medium leading-6 text-[#173940]/75 sm:text-sm">
        Five impossible worlds. A few small challenges. One path worth following.
      </motion.p>
      <motion.div custom={1.22} initial="hidden" animate="visible" variants={reveal} className="pointer-events-auto mt-6 flex items-center gap-1">
        <Button onClick={beginJourney}>I accept the challenge</Button>
        <Button variant="quiet" onClick={explore}>Learn more</Button>
      </motion.div>
      <motion.div custom={1.5} initial="hidden" animate="visible" variants={reveal} className="absolute bottom-6 flex flex-col items-center gap-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#fff]/75">
        <span>Scroll to discover</span><span className="h-8 w-px bg-[#385159]/35" />
      </motion.div>
    </div>
  );
}
