"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Button } from "@/components/ui/button";
import CodeHeader from "./code-header";

interface Props {
  language: string;
  children: string;
}

export default function CodeBlock({ language, children }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(children);

    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="my-5 overflow-hidden rounded-2xl border">
      <div className="flex items-center justify-between border-b bg-muted/60 px-4 py-3">
        <span className="text-xs font-medium uppercase tracking-wide">
          <CodeHeader filename="auth.ts" language={language} code={children} />
        </span>

        <Button variant="ghost" size="icon" onClick={copy}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: 14,
          padding: 20,
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
