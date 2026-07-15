"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import CodeBlock from "./code-block";

interface Props {
  children: string;
}

export default function Markdown({ children }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code(props) {
          const { children, className } = props;

          const match = /language-(\w+)/.exec(className || "");

          if (!match) {
            return (
              <code className="rounded bg-muted px-1.5 py-1 font-mono text-sm">
                {children}
              </code>
            );
          }

          return (
            <CodeBlock language={match[1]}>
              {String(children).replace(/\n$/, "")}
            </CodeBlock>
          );
        },

        p(props) {
          return <p className="leading-8">{props.children}</p>;
        },

        ul(props) {
          return <ul className="ml-6 list-disc space-y-2">{props.children}</ul>;
        },

        ol(props) {
          return (
            <ol className="ml-6 list-decimal space-y-2">{props.children}</ol>
          );
        },

        h1(props) {
          return (
            <h1 className="mb-4 mt-8 text-3xl font-bold">{props.children}</h1>
          );
        },

        h2(props) {
          return (
            <h2 className="mb-3 mt-7 text-2xl font-semibold">
              {props.children}
            </h2>
          );
        },

        h3(props) {
          return (
            <h3 className="mb-2 mt-6 text-xl font-semibold">
              {props.children}
            </h3>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
