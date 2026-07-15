"use client";

import ChatHeader from "./chat-header";
import ChatMessages from "./chat-messages";
import ChatInput from "./chat-input";

export default function ChatPanel() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <ChatHeader />

      <ChatMessages />

      <ChatInput />
    </div>
  );
}
