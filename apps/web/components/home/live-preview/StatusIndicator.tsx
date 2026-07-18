"use client";

import { CheckCircle2, LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";
import type { TimelineStage } from "./hooks/useTimeline";

interface Props {
  stage: TimelineStage;
}

export default function StatusIndicator({ stage }: Props) {
  const finished = stage === "complete";

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-3
        py-1.5
        text-sm
        font-medium

        ${
          finished
            ? "bg-emerald-500/10 text-emerald-500"
            : "bg-primary/10 text-primary"
        }
      `}
    >
      {finished ? (
        <CheckCircle2 className="size-4" />
      ) : (
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 2,
          }}
        >
          <LoaderCircle className="size-4" />
        </motion.div>
      )}

      {finished ? "Analysis Complete" : "Analyzing"}
    </div>
  );
}
