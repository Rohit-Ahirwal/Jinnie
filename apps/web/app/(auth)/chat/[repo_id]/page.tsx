"use client";
import { Conversation, UserProfile } from "@/app/types";
import ChatLayout from "@/components/chat/chat-layout";
import Loader from "@/components/Loader";
import { apiRequest } from "@/lib/api/auth-client";
import { useAuth } from "@clerk/nextjs";
import { use, useEffect, useState } from "react";

export default function ChatPage({
  params,
}: {
  params: Promise<{ repo_id: string }>
}) {
  const { repo_id } = use(params)
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile>();
  const [conversation, setConverstion] = useState<Conversation>();
  const [loading, setLoading] = useState<boolean>(true);
  const [chatLoading, setChatLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getUser() {
      const token = await getToken({
        template: "fastapi",
      });

      setToken(token);

      const response = await apiRequest<UserProfile>(token!, {
        method: "GET",
        url: "/users/me",
      });

      setUser(response.data);
    }

    async function getConversation() {
      const response = await apiRequest<Conversation>(token!, {
        method: "GET",
        url: `/conversations/repository/${repo_id}`
      });

      setConverstion(response.data);
      setLoading(false);
    }

    getUser();
    if (token) getConversation();
  }, [getToken, repo_id, token]);

  if (loading) return <Loader />;

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden">
      <ChatLayout token={token!} user={user!} chatLoading={chatLoading} conversation={conversation!} />
    </div>
  );
}
