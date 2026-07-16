"use client";

import { Conversation, UserProfile } from "@/app/types";
import Loader from "@/components/Loader";
import Workspace from "@/components/workspace/Workspace";
import { apiRequest } from "@/lib/api/auth-client";
import { useAuth } from "@clerk/nextjs";
import { use, useEffect, useState } from "react";

export default function Repository({
  params,
}: {
  params: Promise<{ repo_id: string }>;
}) {
  const { repo_id } = use(params);
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile>();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
      const response = await apiRequest<Conversation[]>(token!, {
        method: "GET",
        url: `/conversations/repository/${repo_id}`,
      });

      setConversations(response.data);
      setLoading(false);
    }

    getUser();
    if (token) getConversation();
  }, [getToken, repo_id, token]);

  if (loading) return <Loader />;

  return <Workspace conversations={conversations} github_repo_id={repo_id} token={token!} user={user!} />;
}
