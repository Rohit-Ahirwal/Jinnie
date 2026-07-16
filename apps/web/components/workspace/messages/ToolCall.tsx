"use client";

import { Search, FileCode2 } from "lucide-react";

interface Props {
  title: string;
  description: string;
  icon?: "search" | "file";
}

export default function ToolCall({
  title,
  description,
  icon = "search",
}: Props) {
  const Icon = icon === "search" ? Search : FileCode2;

  return (
    <div className="my-3 flex items-start gap-3 rounded-xl border bg-muted/40 p-3">
      <div className="rounded-lg bg-primary/10 p-2">
        <Icon className="size-4 text-primary" />
      </div>

      <div>
        <h4 className="text-sm font-medium">{title}</h4>

        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
