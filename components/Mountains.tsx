"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

type MountainsProps = { scrollYProgress: MotionValue<number> };

export default function Mountains({ scrollYProgress }: MountainsProps) {
  const distantY = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const nearY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] overflow-hidden" aria-hidden>
      <motion.svg style={{ y: distantY }} viewBox="0 0 1440 400" preserveAspectRatio="none" className="absolute bottom-12 h-[42%] w-full opacity-60">
        <path d="M0 330 0 250 120 193 229 254 341 155 468 241 594 131 741 245 846 188 964 262 1103 144 1219 232 1352 175 1440 225V400H0Z" fill="#b5bec0" />
        <path d="M0 330 120 193 229 254 341 155 468 241 594 131 741 245 846 188 964 262 1103 144 1219 232 1352 175 1440 225V400H0Z" fill="#e9e3d6" opacity=".36" />
      </motion.svg>
      <motion.svg style={{ y: nearY }} viewBox="0 0 1440 400" preserveAspectRatio="none" className="absolute -bottom-1 h-[48%] w-full">
        <path d="M0 400V279l136-75 136 68 169-125 138 117 176-91 143 105 152-121 131 104 121-61 158 89v111Z" fill="#d8c9a8" />
        <path d="m0 279 136-75 53 27-84 88 167-47 169-125 138 117 176-91 143 105 152-121 131 104 121-61 158 89v111H0Z" fill="#eee7d8" opacity=".55" />
      </motion.svg>
      <div className="absolute inset-x-0 bottom-0 h-[28%] bg-[#d1ae63]/55" />
    </div>
  );
}
