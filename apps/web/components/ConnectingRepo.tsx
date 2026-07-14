"use client";

import { motion } from "framer-motion";
import { CheckCircle2, GitBranch, Loader2, Sparkles } from "lucide-react";

interface ConnectingRepoDialogProps {
  open: boolean;
}

export default function ConnectingRepoDialog({
  open,
}: ConnectingRepoDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-[90%] max-w-md rounded-3xl border border-border bg-background p-8 shadow-xl"
      >
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <motion.div
            className="relative flex size-20 items-center justify-center rounded-3xl bg-primary/10"
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <GitBranch className="size-9 text-primary" />

            <motion.div
              className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
              animate={{
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Sparkles className="size-4" />
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.h2
            className="mt-6 text-xl font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Connecting Repository
          </motion.h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Saving your repository and preparing AI analysis environment.
          </p>

          {/* Steps */}
          <div className="mt-6 w-full space-y-3 text-left">
            <Step text="Validating repository details" active />

            <Step text="Creating secure connection" />

            <Step text="Preparing AI workspace" />
          </div>

          {/* Loader */}
          <Loader2 className="mt-6 size-5 animate-spin text-primary" />
        </div>
      </motion.div>
    </div>
  );
}

function Step({ text, active = false }: { text: string; active?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-3"
    >
      {active ? (
        <Loader2 className="size-4 animate-spin text-primary" />
      ) : (
        <CheckCircle2 className="size-4 text-muted-foreground" />
      )}

      <span
        className={
          active ? "text-sm font-medium" : "text-sm text-muted-foreground"
        }
      >
        {text}
      </span>
    </motion.div>
  );
}
