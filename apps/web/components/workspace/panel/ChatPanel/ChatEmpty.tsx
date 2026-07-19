"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export default function ChatEmpty() {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mx-auto flex max-w-3xl flex-col items-center"
      >
        <div className="mb-6 rounded-2xl bg-primary/10 p-5 text-primary">
          <Sparkles className="size-10" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight">Welcome to Jinnie</h1>

        <p className="mt-3 max-w-xl text-center text-muted-foreground">
          Ask questions, review code, debug issues and understand your
          repository with AI.
        </p>
      </motion.div>
    </div>
  );
}
