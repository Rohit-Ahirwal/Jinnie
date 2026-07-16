"use client";

import { Panel, PanelGroup } from "react-resizable-panels";

import WorkspaceHeader from "./WorkspaceHeader";
import LeftSidebar from "./LeftSidebar";
import ChatPanel from "./panel/ChatPanel";
import RightSidebar from "./context/RightSidebar";
import ResizeHandle from "./ResizeHandle";
import { Conversation, Message, UserProfile } from "@/app/types";
import { Dispatch, useEffect, useState } from "react";
import { apiRequest } from "@/lib/api/auth-client";

interface WorkspaceProps {
  token: string;
  user: UserProfile;
  conversations: Conversation[];
  chatLoading?: boolean;
  github_repo_id: string;
  selectedChatId?: number | null;
  setChatLoading?: Dispatch<React.SetStateAction<boolean>>;
}

export default function Workspace({
  token,
  user,
  conversations,
  chatLoading = false,
  github_repo_id,
  selectedChatId = null,
  setChatLoading,
}: WorkspaceProps) {
  
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function getPrevMessages() {
      const response = await apiRequest<Message[]>(token, {
        method: "GET",
        url: `/messages/conversation/${selectedChatId}`,
      });

      setMessages(response.data);
      setChatLoading?.(false);
    }

    if (!selectedChatId) return;
    getPrevMessages();
  }, [selectedChatId, token]);

  return (
    <div className="flex h-screen flex-col bg-background">
      <WorkspaceHeader />

      <PanelGroup
        direction="horizontal"
        autoSaveId="chat-workspace"
        className="flex-1"
      >
        <Panel defaultSize={22} minSize={18} maxSize={30}>
          <LeftSidebar
            token={token}
            github_repo_id={github_repo_id}
            conversations={conversations}
            user={user}
            selectedChatId={selectedChatId}
          />
        </Panel>

        <ResizeHandle />

        <Panel defaultSize={58} minSize={40}>
          <ChatPanel
            messages={messages}
            selectedChatId={selectedChatId}
            chatLoading={chatLoading}
            token={token}
          />
        </Panel>

        <ResizeHandle />

        <Panel defaultSize={20} minSize={18} maxSize={28}>
          <RightSidebar />
        </Panel>
      </PanelGroup>
    </div>
  );
}
