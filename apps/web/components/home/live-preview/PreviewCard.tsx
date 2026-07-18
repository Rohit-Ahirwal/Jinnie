"use client";

import { motion } from "framer-motion";
import type { TimelineStage } from "@/hooks/useTimeline";

import StatusIndicator from "./StatusIndicator";
import ProgressTracker from "./ProgressTracker";
import RepositoryTree from "./RepositoryTree";
import ChatWindow from "./ChatWindow";

interface Props {
  stage: TimelineStage;
}

export default function PreviewCard({ stage }: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
      }}
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-border/70
        bg-background/70
        backdrop-blur-xl
        shadow-2xl
      "
    >
      {/* Glow */}

      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

      {/* Header */}

      <div className="flex items-center justify-between border-b border-border/60 px-6 py-5">
        <div>
          <h3 className="font-semibold">Jinnie AI Workspace</h3>

          <p className="text-sm text-muted-foreground">
            Live repository understanding
          </p>
        </div>

        <StatusIndicator stage={stage} />
      </div>

      <div className="space-y-8 p-6">
        <ProgressTracker stage={stage} />

        <RepositoryTree stage={stage} />

        <ChatWindow stage={stage} />
      </div>
    </motion.div>
  );
}
