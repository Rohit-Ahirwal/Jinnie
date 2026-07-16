"use client";

import { useEffect, useRef } from "react";

import ChatMessage from "./chat-message";
import ChatEmpty from "./chat-empty";
import { Message, MessageResponse } from "@/app/types";

type ChatMessageParams = {
  messages: Message[]
  newMessages: MessageResponse[]
}

export default function ChatMessages({ messages, newMessages }: ChatMessageParams) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (!messages) {
    return <ChatEmpty />;
  }

  return (
    <div className="flex-1 min-h-0 overflow-y-auto">
      <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col gap-6 px-8 pt-8 pb-44">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {newMessages.map((message) => (
          <ChatMessage key={message.message.id} message={message.message}/>
        ))}

        {/* Auto scroll target */}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
