"use client";

import ChatContent from "./ChatContent";
import ChatInput from "../../input/ChatInput";
import EmptyWorkspace from "../../EmptyWorkspace";
import ChatLoading from "../../ChatLoading";
import { useWorkspaceStore } from "@/store/workspace-store";

export default function ChatPanel() {
  const { chatLoading, selectedChatId } = useWorkspaceStore();

  if (chatLoading) return <ChatLoading />;

  if (!selectedChatId) return <EmptyWorkspace />;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <ChatContent />
      <ChatInput />
    </div>
  );
}
