"use client";

import { Message, MessageResponse } from "@/app/types";
import AIMessage from "./AIMessage";
import UserMessage from "./UserMessage";
import { useEffect, useRef } from "react";

export default function MessageList({ messages, newMessages }: { messages: Message[]; newMessages: MessageResponse[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
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
            streaming={false}
            key={message.message.id}
            content={message.message.content}
          />
        ) : (
          <UserMessage key={message.message.id} content={message.message.content} />
        ),
      )}

      <div ref={bottomRef} />
    </div>
  );
}
