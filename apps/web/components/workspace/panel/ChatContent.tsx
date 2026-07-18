"use client";

import { Message } from "@/app/types";
import MessageList from "../messages/MessageList";

export default function ChatContent({ messages }: { messages: Message[] }) {

  return (
    <div className="flex-1 overflow-y-auto">
      <MessageList messages={messages} />
    </div>
  );
}