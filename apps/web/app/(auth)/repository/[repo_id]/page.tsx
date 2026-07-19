"use client";

import { Conversation, UserProfile } from "@/types";
import Loader from "@/components/Loader";
import Workspace from "@/components/workspace/Workspace";
import { apiRequest } from "@/lib/api/auth-client";
import { useAuth } from "@clerk/nextjs";
import { use, useEffect, useState } from "react";
import { useWorkspaceStore } from "@/store/workspace-store";
import { useShallow } from "zustand/react/shallow";


export default function Repository({
  params,
}: {
  params: Promise<{ repo_id: string }>;
}) {
  const { repo_id } = use(params);
  const { getToken } = useAuth();

  // Subscribe only to what this component actually needs
  const { token, setToken, setUser, setConversations, setGithubRepoId } =
    useWorkspaceStore(
      useShallow((state) => ({
        token: state.token,

        setToken: state.setToken,

        setUser: state.setUser,

        setConversations: state.setConversations,

        setGithubRepoId: state.setGithubRepoId,
      })),
    );

  const [loading, setLoading] = useState(true);

  // Set repo id once when route changes
  useEffect(() => {
    setGithubRepoId(repo_id);
  }, [repo_id, setGithubRepoId]);

  // Get token & user once
  useEffect(() => {
    async function init() {
      const _token = await getToken({
        template: "fastapi",
      });

      if (!_token) return;

      setToken(_token);

      const response = await apiRequest<UserProfile>(_token, {
        method: "GET",
        url: "/users/me",
      });

      setUser(response.data);
    }

    init();
  }, [getToken, setToken, setUser]);

  // Fetch conversations when token becomes available
  useEffect(() => {
    if (!token) return;

    async function getConversation() {
      const response = await apiRequest<Conversation[]>(token, {
        method: "GET",
        url: `/conversations/repository/${repo_id}`,
      });

      setConversations(response.data);
      setLoading(false);
    }

    getConversation();
  }, [token, repo_id, setConversations]);

  if (loading) return <Loader />;

  return <Workspace />;
}
