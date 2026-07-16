"use client";

import { Check, Copy, FileCode2, Wand2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  filename?: string;
  language: string;
  code: string;
}

export default function CodeHeader({ filename, language, code }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="flex h-12 items-center justify-between border-b bg-muted/50 px-4">
      <div className="flex items-center gap-3">
        <FileCode2 className="size-4 text-primary" />

        <span className="font-medium">{filename ?? "Generated Code"}</span>

        <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary uppercase">
          {language}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm" variant="ghost" onClick={handleCopy}>
          {copied ? (
            <>
              <Check className="mr-2 size-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="mr-2 size-4" />
              Copy
            </>
          )}
        </Button>

        <Button size="sm" variant="secondary">
          <Wand2 className="mr-2 size-4" />
          Apply
        </Button>
      </div>
    </div>
  );
}
