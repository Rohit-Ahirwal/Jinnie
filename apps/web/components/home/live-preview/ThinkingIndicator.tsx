"use client";

import { motion } from "framer-motion";

export default function ThinkingIndicator() {
  return (
    <div className="flex-1 rounded-2xl border border-border/60 bg-muted/40 p-4">
      <p className="font-medium">Jinnie is reasoning</p>

      <div className="mt-4 flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              repeat: Infinity,
              delay: i * 0.15,
              duration: 0.6,
            }}
            className="h-2 w-2 rounded-full bg-primary"
          />
        ))}
      </div>
    </div>
  );
}
