"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Check, GitBranch, Sparkles } from "lucide-react";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaGithub } from "react-icons/fa";

import { Repo } from "@/app/types";
import { useDebounce } from "@/hooks/use-debounce";
import FindingRepos from "./FindingRepos";
import NoReposFound from "./NoReposFound";
import { apiRequest } from "@/lib/api/auth-client";
import ConnectingRepoDialog from "./ConnectingRepo";

interface ConnectRepoDialogProps {
  githubConnected: boolean;
  repositories?: Repo[];
  onGithubConnect?: () => void;
  setSearchValue: Dispatch<SetStateAction<string | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  token: string | null;
}

export default function ConnectRepoDialog({
  githubConnected,
  repositories = [],
  setSearchValue,
  loading,
  setLoading,
  token,
}: ConnectRepoDialogProps) {
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [connecting, setConnecting] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setSearchValue(debouncedSearch);
  }, [debouncedSearch, setSearchValue]);

  const selectedRepository = repositories.find(
    (repo) => repo.id === selectedRepo,
  );

  const handleAnalyze = async (repo: Repo) => {
    try {
      setConnecting(true);

      await apiRequest(token!, {
        method: "POST",
        url: "/github/repository",
        data: {
          github_repo_id: String(repo.id),
          repo_name: repo.name,
          repo_description: repo.description,
          owner: repo.owner.login,
          private: repo.private,
          default_branch: repo.default_branch,
          repo_url: repo.html_url,
          clone_url: `https://x-access-token:{github_token}@github.com/${repo.owner.login}/${repo.name}.git`,
          language: repo.language ?? "Unknown",
          stars: repo.stars ?? 0,
          issues: 0,
        },
      });

      setSelectedRepo(null);

      // optional: close dialog later
    } catch (error) {
      console.error("Failed to save repository:", error);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="rounded-full bg-primary text-primary-foreground px-5 h-11">
          <GitBranch className="size-4 mr-2" />
          Connect New Repo
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] sm:max-w-5xl rounded-3xl p-6 sm:p-8 bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl font-semibold">
            {githubConnected ? "Connect Repository" : "Connect GitHub"}
          </DialogTitle>

          <DialogDescription className="text-muted-foreground">
            {githubConnected
              ? "Choose a repository to start AI analysis."
              : "Connect your GitHub account to access repositories."}
          </DialogDescription>
        </DialogHeader>

        {!githubConnected ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5 mt-4"
          >
            <Card className="rounded-2xl border-border bg-card p-5">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-muted flex items-center justify-center">
                  <FaGithub className="size-6" />
                </div>

                <div>
                  <h3 className="font-semibold">GitHub Integration</h3>

                  <p className="text-sm text-muted-foreground">
                    Read repositories securely for AI analysis.
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              {[
                "Repository access",
                "AI code understanding",
                "Secure connection",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Check className="size-4 text-emerald-500" />
                  {item}
                </div>
              ))}
            </div>

            <Link href="/api/github/connect">
              <Button className="w-full h-12 rounded-full bg-primary text-primary-foreground">
                <FaGithub className="size-4 mr-2" />
                Connect GitHub
              </Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 mt-4"
          >
            <ConnectingRepoDialog open={connecting} />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(e) => {
                  setLoading(true);
                  setSearch(e.target.value);
                }}
                placeholder="Search repositories"
                className="h-11 rounded-xl pl-10 bg-background border-border"
              />
            </div>

            {loading ? (
              <FindingRepos />
            ) : repositories.length === 0 ? (
              <NoReposFound
                search={search}
                onReset={() => {
                  setSearch("");
                  setLoading(true);
                }}
              />
            ) : (
              <div className="max-h-[55vh] overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-4 p-2">
                {repositories.map((repo) => (
                  <Card
                    key={repo.id}
                    onClick={() => setSelectedRepo(repo.id)}
                    className={`cursor-pointer rounded-2xl p-5 transition hover:shadow-md bg-card border-border ${
                      selectedRepo === repo.id
                        ? "border-primary ring-2 ring-primary/20"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <GitBranch className="size-4 shrink-0" />

                          <h3 className="font-medium truncate">{repo.name}</h3>
                        </div>

                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2 wrap-break-words">
                          {repo.description || "No description"}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {repo.language && (
                            <Badge className="rounded-full bg-muted text-foreground">
                              {repo.language}
                            </Badge>
                          )}

                          <Badge variant="outline" className="rounded-full">
                            {repo.private ? "Private" : "Public"}
                          </Badge>
                        </div>
                      </div>

                      {selectedRepo === repo.id && (
                        <Check className="size-5 text-primary shrink-0 mt-1" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}

            <Button
              disabled={!selectedRepository}
              onClick={() =>
                selectedRepository && handleAnalyze(selectedRepository)
              }
              className="w-full h-12 rounded-full bg-primary text-primary-foreground"
            >
              <Sparkles className="size-4 mr-2" />
              Start AI Analysis
            </Button>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
