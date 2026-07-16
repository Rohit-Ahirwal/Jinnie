"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

export default function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code(props) {
          const { children, className } = props;

          const match = /language-(\w+)/.exec(className || "");

          if (!match) {
            return (
              <code className="rounded bg-muted px-1 py-0.5">{children}</code>
            );
          }

          return (
            <CodeBlock
              filename="app/api/auth/route.ts"
              language={match?.[1] ?? "text"}
              code={String(children).replace(/\n$/, "")}
            />
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
