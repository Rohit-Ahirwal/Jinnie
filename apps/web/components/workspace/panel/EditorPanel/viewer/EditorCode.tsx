"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { highlighterPromise } from "@/lib/shiki";

interface Props {
  language: string;
  code: string;
}

export default function EditorCode({ language, code }: Props) {
  const [html, setHtml] = useState("");

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    async function highlight() {
      const highlighter = await highlighterPromise;

      setHtml(
        highlighter.codeToHtml(code, {
          lang: language,
          theme: resolvedTheme === "dark" ? "github-dark" : "github-light",
        }),
      );
    }

    highlight();
  }, [language, code, resolvedTheme]);

  return (
    <div className="flex-1 overflow-auto">
      <div
        className="min-w-max px-8 py-6"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
