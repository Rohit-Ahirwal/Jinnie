"use client";

import { FolderGit2, Globe, Lock, GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api/auth-client";
import Link from "next/link";

interface RepositoryCardProps {
  github_repo_id: number;
  token: string;
}

interface RepositoryResponse {
  id: number;
  repo_name: string;
  repo_url: string;
  owner: string;
  private: boolean;
  default_branch: string;
  file_count: number;
  language: string;
  stars: number;
  issues: number;
  status: string;
}

export default function RepositoryCard({
  github_repo_id,
  token,
}: RepositoryCardProps) {
  const [repository, setRepository] = useState<RepositoryResponse | null>(null);

  useEffect(() => {
    const fetchRepository = async () => {
      const response = await apiRequest<RepositoryResponse>(token, {
        method: "GET",
        url: `/github/repositories/${github_repo_id}`,
      });

      setRepository(response.data);
    };

    fetchRepository();
  }, [github_repo_id, token]);

  return (
    <Card
      className="
        group
        cursor-pointer
        border-border/60
        transition-all
        duration-200
        hover:border-primary/30
        hover:shadow-md
        hover:-translate-y-0.5
        p-4
      "
    >
      <Link href={repository ? repository.repo_url : "#"} target="_blank">
        <div className="flex items-start gap-3">
          <motion.div
            whileHover={{ rotate: -5, scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <FolderGit2 className="size-5" />
          </motion.div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold">{repository?.repo_name}</h3>

            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              {repository?.private ? (
                <Lock className="size-3" />
              ) : (
                <Globe className="size-3" />
              )}
              {repository?.private ? "Private" : "Public"} Repository
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="secondary" className="gap-1">
                <GitBranch className="size-3" />
                {repository?.default_branch}
              </Badge>

              <Badge variant="secondary">
                {repository?.status == "completed" ? "Indexed" : "Indexing"}
              </Badge>

              <Badge variant="outline">
                {repository?.file_count.toLocaleString()} Files
              </Badge>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
