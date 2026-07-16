"use client";

import ChatContent from "./ChatContent";
import ChatInput from "../input/ChatInput";
import { Message, MessageResponse } from "@/app/types";
import EmptyWorkspace from "../EmptyWorkspace";
import ChatLoading from "../ChatLoading";
import { Dispatch, SetStateAction, useState } from "react";
interface ChatPanelProps {
  messages: Message[];
  selectedChatId?: number | null;
  chatLoading: boolean;
  token: string;
}

export default function ChatPanel({
  messages,
  selectedChatId,
  chatLoading,
  token
}: ChatPanelProps) {
  
  const [newMessages, setNewMessages] = useState<MessageResponse[]>([]);

  if (chatLoading) return <ChatLoading />;

  if (!selectedChatId) return <EmptyWorkspace />;

  return (
    <div className="flex h-full flex-col">
      <ChatContent messages={messages} newMessages={newMessages} />
      <ChatInput selectedChatId={selectedChatId} token={token} setNewMessages={setNewMessages} />
    </div>
  );
}
