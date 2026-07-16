"use client";

import { motion } from "motion/react";

export default function Cursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{
        duration: 1,
        repeat: Infinity,
      }}
      className="ml-0.5 inline-block h-5 w-0.5 rounded-full bg-primary align-middle"
    />
  );
}
