"use client";

import AIMessage from "./AIMessage";
import UserMessage from "./UserMessage";
import { useEffect, useRef } from "react";
import { useWorkspaceStore } from "@/store/workspace-store";
import { useShallow } from "zustand/react/shallow";

export default function MessageList() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { newMessages, messages } = useWorkspaceStore(
    useShallow((state) => ({
      newMessages: state.newMessages,
      messages: state.messages
    }))
  );

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
