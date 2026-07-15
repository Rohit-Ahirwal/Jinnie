"use client";

import { Check, Copy, FileCode2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface Props {
  filename?: string;
  language?: string;
  code: string;
}

export default function CodeHeader({ filename, language, code }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex items-center justify-between border-b bg-muted/60 px-4 py-3">
      <div className="flex items-center gap-3">
        <FileCode2 className="size-4 text-primary" />

        <div>
          <p className="font-medium text-sm">{filename ?? "Code"}</p>

          <p className="text-muted-foreground text-xs">{language}</p>
        </div>
      </div>

      <Button size="icon" variant="ghost" onClick={copy}>
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>
    </div>
  );
}
