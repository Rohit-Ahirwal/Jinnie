"use client";

import { useTimeline } from "@/hooks/useTimeline";
import PreviewCard from "./PreviewCard";

export default function LivePreview() {
  const stage = useTimeline();

  return (
    <div className="relative">
      <PreviewCard stage={stage} />
    </div>
  );
}
