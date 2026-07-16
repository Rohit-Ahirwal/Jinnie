import RepositoryCard from "./RepositoryCard";
import NewChatButton from "./NewChatButton";
import ConversationSection from "./conversation/ConversationSection";
import { Conversation, UserProfile } from "@/app/types";

interface LeftSidebarProps {
  token: string;
  github_repo_id: string;
  user: UserProfile;
  selectedChatId: number | null;
  conversations: Conversation[]
}

export default function LeftSidebar({ token, github_repo_id, conversations, user, selectedChatId }: LeftSidebarProps) {

  const handleNewChat = () => {
    // TODO: Create a new chat
  };
  
  return (
    <aside className="flex h-full flex-col border-r bg-card">
      <div className="space-y-3 border-b p-4">
        <RepositoryCard />
        <NewChatButton onClick={handleNewChat} />
      </div>

      <ConversationSection github_repo_id={github_repo_id} conversations={conversations} selectedChatId={selectedChatId} />

      <div className="flex-1">Files</div>
    </aside>
  );
}
