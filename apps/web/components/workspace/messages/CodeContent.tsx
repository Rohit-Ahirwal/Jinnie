"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  language: string;
  code: string;
}

export default function CodeContent({ language, code }: Props) {
  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      showLineNumbers
      wrapLongLines
      customStyle={{
        margin: 0,
        borderRadius: 0,
        background: "transparent",
        padding: "1rem",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
