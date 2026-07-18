"use client";

import ChatContent from "./ChatContent";
import ChatInput from "../input/ChatInput";
import { Message } from "@/app/types";
import EmptyWorkspace from "../EmptyWorkspace";
import ChatLoading from "../ChatLoading";
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

  if (chatLoading) return <ChatLoading />;

  if (!selectedChatId) return <EmptyWorkspace />;

  return (
    <div className="flex h-full flex-col">
      <ChatContent messages={messages} />
      <ChatInput selectedChatId={selectedChatId} token={token} />
    </div>
  );
}
