"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

type CloudsProps = { scrollYProgress: MotionValue<number> };

const cloudShape = "absolute rounded-[999px] bg-white/80 blur-[1px] before:absolute before:rounded-full before:bg-white/90 after:absolute after:rounded-full after:bg-white/80";

export default function Clouds({ scrollYProgress }: CloudsProps) {
  const farLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const farRight = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div style={{ x: farLeft }} className="cloud-drift-left absolute -left-20 top-[16%] h-16 w-48 opacity-75 md:top-[13%] md:h-24 md:w-72">
        <div className={`${cloudShape} inset-x-0 bottom-0 h-10 before:-left-3 before:-top-5 before:h-16 before:w-16 after:left-[38%] after:-top-9 after:h-20 after:w-24`} />
      </motion.div>
      <motion.div style={{ x: farRight }} className="cloud-drift-right absolute -right-20 top-[22%] h-16 w-52 opacity-70 md:top-[15%] md:h-28 md:w-80">
        <div className={`${cloudShape} inset-x-0 bottom-0 h-11 before:left-[6%] before:-top-7 before:h-20 before:w-20 after:right-[12%] after:-top-11 after:h-24 after:w-28`} />
      </motion.div>
      <div className="cloud-drift-right absolute left-[13%] top-[42%] h-8 w-24 opacity-40 md:left-[20%]">
        <div className={`${cloudShape} inset-x-0 bottom-0 h-5 before:left-[14%] before:-top-3 before:h-9 before:w-9 after:right-[16%] after:-top-5 after:h-11 after:w-12`} />
      </div>
      <div className="cloud-drift-left absolute right-[12%] top-[48%] h-8 w-28 opacity-45">
        <div className={`${cloudShape} inset-x-0 bottom-0 h-5 before:left-[12%] before:-top-4 before:h-10 before:w-10 after:right-[12%] after:-top-5 after:h-11 after:w-12`} />
      </div>
    </div>
  );
}
