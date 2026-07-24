"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type ButtonProps = HTMLMotionProps<"button"> & {
  children: ReactNode;
  variant?: "primary" | "quiet";
};

export default function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const base = "group inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.17em] transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80";
  const styles = variant === "primary"
    ? "bg-[#334448] text-white shadow-[0_12px_25px_rgba(39,52,58,0.16)] hover:bg-[#26383b]"
    : "text-[#263a3f]/80 hover:text-[#263a3f]";

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`${base} ${styles} ${className}`}
      {...props}
    >
      {children}
      {variant === "primary" && <span aria-hidden className="text-base leading-none transition-transform duration-500 group-hover:translate-x-0.5">→</span>}
    </motion.button>
  );
}
