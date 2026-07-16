"use client";

import { Message, MessageResponse } from "@/app/types";
import MessageList from "../messages/MessageList";

export default function ChatContent({ messages, newMessages }: { messages: Message[]; newMessages: MessageResponse[] }) {

  return (
    <div className="flex-1 overflow-y-auto">
      <MessageList messages={messages} newMessages={newMessages} />
    </div>
  );
}