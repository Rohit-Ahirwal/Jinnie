"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

export default function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mt-8 mb-4 text-3xl font-bold tracking-tight">
            {children}
          </h1>
        ),

        h2: ({ children }) => (
          <h2 className="mt-8 mb-3 text-2xl font-semibold">{children}</h2>
        ),

        h3: ({ children }) => (
          <h3 className="mt-6 mb-2 text-xl font-semibold">{children}</h3>
        ),

        p: ({ children }) => (
          <p className="leading-8 text-[15px] mb-4">{children}</p>
        ),

        ul: ({ children }) => (
          <ul className="list-disc ml-6 space-y-2 mb-4">{children}</ul>
        ),

        ol: ({ children }) => (
          <ol className="list-decimal ml-6 space-y-2 mb-4">{children}</ol>
        ),

        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
            {children}
          </blockquote>
        ),

        hr: () => <hr className="my-8 border-border" />,
        code(props) {
          const { children, className } = props;

          const match = /language-(\w+)/.exec(className || "");

          if (!match) {
            return (
              <code className="rounded-md bg-muted px-1.5 py-1 text-[0.9em] font-mono border">
                {children}
              </code>
            );
          }

          return (
            <CodeBlock
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
