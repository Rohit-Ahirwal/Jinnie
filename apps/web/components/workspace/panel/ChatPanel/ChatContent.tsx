"use client";

import MessageList from "../../messages/MessageList";

export default function ChatContent() {

  return (
    <div className="flex-1 overflow-y-auto">
      <MessageList />
    </div>
  );
}