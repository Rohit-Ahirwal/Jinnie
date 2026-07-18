"use client";

import { useEffect, useState } from "react";
import { highlighterPromise } from "@/lib/shiki";
import { useTheme } from "next-themes";

interface Props {
  language: string;
  code: string;
}

export default function CodeContent({ language, code }: Props) {
  const [html, setHtml] = useState("");
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    async function highlight() {
      const highlighter = await highlighterPromise;

      const html = highlighter.codeToHtml(code, {
        lang: language,
        theme: resolvedTheme === "dark" ? "github-dark" : "github-light",
      });

      setHtml(html);
    }

    highlight();
  }, [language, code, resolvedTheme]);

  return (
    <div
      className="overflow-x-auto px-6 py-5"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
