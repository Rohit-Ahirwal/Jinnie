"use client";

import ConversationCard from "./ConversationCard";
import { Conversation } from "@/app/types";

export default function ConversationList({ conversations, github_repo_id, selectedChatId }: { conversations: Conversation[]; github_repo_id: string; selectedChatId: number | null }) {
  return (
    <div className="space-y-2">
      {conversations.map((conversation) => (
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
