"use client";

import { chatStream } from "@/lib/api/chat-stream";
import { useState } from "react";

interface Props {
  token: string;
  conversationId: number;
}

export default function TestStream({ token, conversationId }: Props) {
  const [output, setOutput] = useState("");

  const start = async () => {
    setOutput("");

    await chatStream({
      token: token,
      conversationId: conversationId,
      prompt: "Explain how Pyodide is initialized.",

      onToken(token) {
        setOutput((prev) => prev + token);
      },

      onDone(data) {
        console.log("DONE", data);
      },

      onError(error) {
        console.error(error);
      },
    });
  };

  return (
    <div className="space-y-4 p-10">
      <button onClick={start} className="rounded bg-black px-4 py-2 text-white">
        Start Stream
      </button>

      <pre className="whitespace-pre-wrap rounded border p-4">{output}</pre>
    </div>
  );
}
