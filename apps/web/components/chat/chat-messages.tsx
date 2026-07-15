"use client";

import { useEffect, useRef } from "react";

import ChatMessage from "./chat-message";
import ChatEmpty from "./chat-empty";

const messages = [
  {
    id: 1,
    role: "assistant",
    content: "Hi! I'm Jinnie. Ask me anything about your repository.",
  },
];

export default function ChatMessages() {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (messages.length === 0) {
    return <ChatEmpty />;
  }

  return (
    <div className="flex-1 min-h-0 overflow-y-auto">
      <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col gap-6 px-8 pt-8 pb-44">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {/* Auto scroll target */}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
