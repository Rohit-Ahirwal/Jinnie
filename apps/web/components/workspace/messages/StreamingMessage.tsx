"use client";

import Markdown from "./Markdown";
import Cursor from "./Cursor";

interface Props {
  content: string;
  streaming: boolean;
}

export default function StreamingMessage({ content, streaming }: Props) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {streaming ? (
        <pre className="whitespace-pre-wrap font-inherit">{content}</pre>
      ) : (
        <Markdown content={content} />
      )}

      {streaming && <Cursor />}
    </div>
  );
}
