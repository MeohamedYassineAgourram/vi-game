"use client";

import { motion, type MotionValue } from "framer-motion";

type LandmarkProps = { scrollYProgress: MotionValue<number> };

export default function Landmark({ scrollYProgress }: LandmarkProps) {
  return (
    <motion.div
      style={{ y: scrollYProgress }}
      className="landmark-scene pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[48svh] min-h-[330px]"
      aria-hidden
    >
      <div className="landmark-haze" />
      <div className="sunlit-knoll">
        <div className="knoll-grass" />
      </div>
      <div className="waystone" aria-hidden="true">
        <div className="waystone-ring" />
        <div className="waystone-cap" />
        <div className="waystone-crossbeam" />
        <div className="waystone-left" />
        <div className="waystone-right" />
        <div className="waystone-shadow" />
      </div>
      <div className="foreground-grass" />
    </motion.div>
  );
}
