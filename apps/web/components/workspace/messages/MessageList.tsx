"use client";

import { Message } from "@/app/types";
import AIMessage from "./AIMessage";
import UserMessage from "./UserMessage";
import { useEffect, useRef } from "react";
import { useNewMessagesStore } from "@/store/repository-store";

export default function MessageList({ messages }: { messages: Message[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const newMessages = useNewMessagesStore((state) => state.newMessages);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      })
    });
  }, [messages, newMessages]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-8">
      {messages.map((message) =>
        message.role === "assistant" ? (
          <AIMessage
            streaming={false}
            key={message.id}
            content={message.content}
          />
        ) : (
          <UserMessage key={message.id} content={message.content} />
        ),
      )}

      {newMessages.map((message) =>
        message.message.role === "assistant" ? (
          <AIMessage
            streaming={message.streaming ?? false}
            key={message.message.id}
            content={message.message.content}
          />
        ) : (
          <UserMessage
            key={message.message.id}
            content={message.message.content}
          />
        ),
      )}

      <div ref={bottomRef} />
    </div>
  );
}
