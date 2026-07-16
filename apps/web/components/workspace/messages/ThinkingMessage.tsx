"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export default function ThinkingMessage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-3 text-muted-foreground"
    >
      <Sparkles className="size-4 text-primary" />

      <motion.span
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
        }}
      >
        Jinnie is thinking...
      </motion.span>
    </motion.div>
  );
}
