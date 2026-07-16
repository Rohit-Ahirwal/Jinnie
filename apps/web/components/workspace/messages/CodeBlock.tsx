"use client";

import CodeHeader from "./CodeHeader";
import CodeContent from "./CodeContent";

interface Props {
  filename?: string;
  language: string;
  code: string;
}

export default function CodeBlock({
  filename,
  language,
  code,
}: Props) {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border bg-card shadow-sm">
      <CodeHeader
        filename={filename}
        language={language}
        code={code}
      />

      <CodeContent
        language={language}
        code={code}
      />
    </div>
  );
}