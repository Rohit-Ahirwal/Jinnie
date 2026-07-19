"use client";

import RepositoryCard from "./RepositoryCard";
import NewChatButton from "./NewChatButton";
import ConversationSection from "./conversation/ConversationSection";
import FilesSection from "./Files/FilesSection";

import { Conversation } from "@/types";
import { apiRequest } from "@/lib/api/auth-client";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWorkspaceStore } from "@/store/workspace-store";
import { useShallow } from "zustand/react/shallow";

export default function LeftSidebar() {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  // Subscribe only to what is needed
  const { token, github_repo_id, setSelectedChatId } = useWorkspaceStore(
    useShallow((state) => ({
      token: state.token,
      github_repo_id: state.github_repo_id,
      setSelectedChatId: state.setSelectedChatId,
    })),
  );

  const handleNewChat = async () => {
    if (!title.trim()) return;

    const response = await apiRequest<Conversation>(token, {
      method: "POST",
      url: `conversations/repository/${github_repo_id}`,
      data: {
        title,
      },
    });

    const conversation = response.data;

    if (conversation) {
      setSelectedChatId(conversation.id);
    }

    setTitle("");
    setOpen(false);
  };

  return (
    <aside className="flex h-full flex-col border-r bg-card min-h-0">
      <div className="space-y-3 border-b p-4">
        <RepositoryCard />
        <NewChatButton onClick={() => setOpen(true)} />
      </div>

      <ConversationSection />

      <div className="flex-1 min-h-0">
        <FilesSection />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Chat</DialogTitle>
            <DialogDescription>
              Give your conversation a name so you can find it later.
            </DialogDescription>
          </DialogHeader>

          <Input
            placeholder="e.g. Authentication bug analysis"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleNewChat();
              }
            }}
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleNewChat} disabled={!title.trim()}>
              Create Chat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
