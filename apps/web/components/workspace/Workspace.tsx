"use client";

import { Panel, PanelGroup } from "react-resizable-panels";

import WorkspaceHeader from "./WorkspaceHeader";
import LeftSidebar from "./LeftSidebar";
import ChatPanel from "./panel/ChatPanel/ChatPanel";
import RightSidebar from "./context/RightSidebar";
import ResizeHandle from "./ResizeHandle";
import { Message } from "@/types";
import { useEffect } from "react";
import { apiRequest } from "@/lib/api/auth-client";
import { useWorkspaceStore } from "@/store/workspace-store";
import { useShallow } from "zustand/react/shallow";
import EditorPanel from "./panel/EditorPanel/EditorPanel";

export default function Workspace() {
  const { token, setMessages, setChatLoading, selectedChatId, editorOpened } =
    useWorkspaceStore(
      useShallow((state) => ({
        token: state.token,
        setMessages: state.setMessages,
        setChatLoading: state.setChatLoading,
        selectedChatId: state.selectedChatId,
        editorOpened: state.editorOpened,
      })),
    );

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
  }, [selectedChatId, token, setMessages, setChatLoading]);

  return (
    <div className="flex h-screen flex-col bg-background">
      <WorkspaceHeader />

      <div className="flex-1 min-h-0 relative">
        <div className={`${editorOpened ? "hidden h-full" : "block h-full"}`}>
          <PanelGroup direction="horizontal" autoSaveId="chat-workspace">
            <Panel defaultSize={22} minSize={18} maxSize={30}>
              <LeftSidebar />
            </Panel>

            <ResizeHandle />

            <Panel defaultSize={58} minSize={40}>
              <ChatPanel />
            </Panel>

            <ResizeHandle />

            <Panel defaultSize={20} minSize={18} maxSize={28}>
              <RightSidebar />
            </Panel>
          </PanelGroup>
        </div>

        <div className={`${editorOpened ? "block min-h-0 h-full" : "hidden h-full"}`}>
          <EditorPanel />
        </div>
      </div>
    </div>
  );
}
