"use client";

import { ExternalLink, FileCode2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  file: string;
  lines: string;
}

export default function SourceCard({ file, lines }: Props) {
  return (
    <div className="rounded-2xl border bg-card p-4 transition-all hover:border-primary/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileCode2 className="size-5 text-primary" />

          <div>
            <p className="font-medium">{file}</p>

            <Badge variant="secondary" className="mt-1">
              {lines}
            </Badge>
          </div>
        </div>

        <Button size="icon" variant="ghost">
          <ExternalLink className="size-4" />
        </Button>
      </div>
    </div>
  );
}
