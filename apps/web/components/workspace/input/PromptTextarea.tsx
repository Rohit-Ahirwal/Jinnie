"use client";

import { Dispatch } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function PromptTextarea({ prompt, setPrompt }: { prompt: string; setPrompt: Dispatch<React.SetStateAction<string>> }) {
  return (
    <TextareaAutosize
      minRows={2}
      maxRows={8}
      placeholder="Ask Jinnie anything about this repository..."
      className="w-full resize-none bg-transparent px-5 py-4 text-sm outline-none"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
    />
  );
}
