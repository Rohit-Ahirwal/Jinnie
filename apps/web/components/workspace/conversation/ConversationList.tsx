"use client";

import { useWorkspaceStore } from "@/store/workspace-store";
import ConversationCard from "./ConversationCard";
import { useShallow } from "zustand/react/shallow";

export default function ConversationList() {
  const { conversations, github_repo_id, selectedChatId } = useWorkspaceStore(
    useShallow((state) => ({
      conversations: state.conversations,
      github_repo_id: state.github_repo_id,
      selectedChatId: state.selectedChatId,
    })),
  );
  
  return (
    <div className="space-y-2">
      {conversations?.map((conversation) => (
        <ConversationCard
          key={conversation.id}
          title={conversation.title}
          createdAt={conversation.created_at}
          conversation_id={conversation.id}
          github_repo_id={github_repo_id}
          active={conversation.id === selectedChatId}
        />
      ))}
    </div>
  );
}
