"use client";

import { Copy, RefreshCcw, ThumbsDown, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function MessageActions() {
  return (
    <div className="mt-4 flex items-center gap-1">
      <Button size="icon" variant="ghost">
        <Copy className="size-4" />
      </Button>

      <Button size="icon" variant="ghost">
        <RefreshCcw className="size-4" />
      </Button>

      <Button size="icon" variant="ghost">
        <ThumbsUp className="size-4" />
      </Button>

      <Button size="icon" variant="ghost">
        <ThumbsDown className="size-4" />
      </Button>
    </div>
  );
}
