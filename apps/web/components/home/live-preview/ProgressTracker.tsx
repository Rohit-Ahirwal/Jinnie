"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  FolderSearch,
  GitBranch,
  BrainCircuit,
  Sparkles,
} from "lucide-react";
import type { TimelineStage } from "./hooks/useTimeline";

interface Props {
  stage: TimelineStage;
}

const stages = {
  connecting: {
    progress: 18,
    icon: GitBranch,
    title: "Connecting Repository",
    subtitle: "Authenticating with GitHub...",
  },
  indexing: {
    progress: 48,
    icon: FolderSearch,
    title: "Indexing Source Code",
    subtitle: "Scanning files and project structure...",
  },
  thinking: {
    progress: 76,
    icon: BrainCircuit,
    title: "Building AI Context",
    subtitle: "Understanding architecture and dependencies...",
  },
  answering: {
    progress: 94,
    icon: Sparkles,
    title: "Preparing Response",
    subtitle: "Generating repository-aware answer...",
  },
  complete: {
    progress: 100,
    icon: CheckCircle2,
    title: "Repository Ready",
    subtitle: "Jinnie understands your entire project.",
  },
};

export default function ProgressTracker({ stage }: Props) {
  const current = stages[stage];
  const Icon = current.icon;

  return (
    <div className="rounded-2xl border border-border/60 bg-muted/40 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            key={stage}
            initial={{ scale: 0.8, rotate: -15, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10"
          >
            <Icon className="size-5 text-primary" />
          </motion.div>

          <div>
            <motion.h4
              key={current.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="font-semibold"
            >
              {current.title}
            </motion.h4>

            <motion.p
              key={current.subtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="text-sm text-muted-foreground"
            >
              {current.subtitle}
            </motion.p>
          </div>
        </div>

        <motion.div
          key={current.progress}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-lg font-bold"
        >
          {current.progress}%
        </motion.div>
      </div>

      <div className="mt-6">
        <div className="h-2 overflow-hidden rounded-full bg-background">
          <motion.div
            animate={{
              width: `${current.progress}%`,
            }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 18,
            }}
            className="relative h-full rounded-full bg-primary"
          >
            {/* Moving highlight */}

            <motion.div
              animate={{
                x: ["-100%", "350%"],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "linear",
              }}
              className="absolute inset-y-0 w-12 bg-white/30 blur-sm"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
