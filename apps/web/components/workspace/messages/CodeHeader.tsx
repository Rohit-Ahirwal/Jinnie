"use client";

import { Check, Copy, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex h-10 items-center justify-between border-b bg-muted/40 px-4">
      <div className="flex items-center gap-2 overflow-hidden text-sm">
        {filename && (
          <>
            <span className="truncate font-medium text-foreground">
              {filename}
            </span>

            <span className="text-muted-foreground">•</span>
          </>
        )}

        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {language}
        </span>
      </div>

      <TooltipProvider delayDuration={100}>
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost">
                <Sparkles className="size-4" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>Apply</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost" onClick={handleCopy}>
                {copied ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </TooltipTrigger>

            <TooltipContent>{copied ? "Copied" : "Copy"}</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
