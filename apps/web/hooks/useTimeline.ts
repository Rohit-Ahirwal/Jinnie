"use client";

import { useEffect, useState } from "react";

export type TimelineStage =
  "connecting" | "indexing" | "thinking" | "answering" | "complete";

const stages: TimelineStage[] = [
  "connecting",
  "indexing",
  "thinking",
  "answering",
  "complete",
];

export function useTimeline() {
  const [stage, setStage] = useState<TimelineStage>("connecting");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % stages.length;
      setStage(stages[index]);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return stage;
}
