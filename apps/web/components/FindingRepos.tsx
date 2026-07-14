"use client";

import { motion } from "framer-motion";
import { Search, Loader2 } from "lucide-react";

export default function FindingRepos() {
  return (
    <div className="flex min-h-[280px] w-full items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-900"
        >
          <Search className="size-7 text-neutral-700 dark:text-neutral-300" />
        </motion.div>

        <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
          Finding repositories
        </h3>

        <p className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
          Searching through your GitHub repositories. This may take a moment.
        </p>

        <Loader2 className="mt-5 size-5 animate-spin text-primary" />
      </motion.div>
    </div>
  );
}
