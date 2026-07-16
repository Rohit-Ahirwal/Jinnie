"use client";

import ChatHeader from "./chat-header";
import ChatMessages from "./chat-messages";
import ChatInput from "./chat-input";
import { Conversation, Message, MessageResponse } from "@/app/types";
import { Dispatch, SetStateAction } from "react";

type ChatPanel = {
  token: string;
  messages: Message[];
  newMessages: MessageResponse[];
  setNewMessages: Dispatch<SetStateAction<MessageResponse[]>>;
  conversation: Conversation;
};

export default function ChatPanel({
  messages,
  token,
  conversation,
  setNewMessages,
  newMessages
}: ChatPanel) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <ChatHeader />

      <ChatMessages newMessages={newMessages} messages={messages} />

      <ChatInput token={token} setNewMessages={setNewMessages} conversation_id={conversation.id} />
    </div>
  );
}
