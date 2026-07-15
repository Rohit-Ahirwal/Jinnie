"use client";

import { Repo, UserProfile } from "@/app/types";
import ConnectGithub from "@/components/ConnectGithub";
import Loader from "@/components/Loader";
import { apiRequest } from "@/lib/api/auth-client";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Activity, AlertTriangle, GitBranch, Search } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import RepoCard from "@/components/RepoCard";
import ConnectRepoDialog from "@/components/ConnectRepoDialog";
import NoRepositories from "@/components/NoRepositories";

const Dashboard = () => {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string|null>(null);
  const [user, setUser] = useState<UserProfile>();
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [repositories, setRepositories] = useState<Repo[]>();
  const [repoLoading, setRepoLoading] = useState<boolean>(true);

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
      setLoading(false);
    }

    async function getRepos() {
      const token = await getToken({
        template: "fastapi",
      });

      let query = "/github/repos";

      if (searchValue) {
        query = `/github/repos?search=${searchValue}`;
      }

      const response = await apiRequest<Repo[]>(token!, {
        method: "GET",
        url: query,
      });

      console.log(response.data)

      setRepositories(response.data);
      setRepoLoading(false);
    }

    getUser();
    if (user?.github_connected) getRepos();
  }, [getToken, searchValue, user?.github_connected]);

  if (loading) return <Loader />;

  return (
    <div>
      {user?.github_connected ? (
        <div className="bg-background text-foreground min-h-screen w-full overflow-x-hidden">
          <div className="max-w-[1140px] flex flex-col lg:flex-row mx-auto p-4 sm:p-6 lg:p-8 gap-6 w-full">
            <aside className="shrink-0 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 w-full lg:w-64">
              <Card className="shadow-sm rounded-2xl border-border p-4 gap-4">
                <CardHeader className="p-0 gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-muted-foreground text-sm leading-5">
                      Total Repos
                    </span>
                    <GitBranch className="size-4 text-foreground" />
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="font-semibold text-3xl leading-9 tracking-tight">
                    {user.repositories.length}
                  </div>
                  <p className="text-muted-foreground text-xs leading-4">
                    Connected repositories
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm rounded-2xl border-border p-4 gap-4">
                <CardHeader className="p-0 gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-muted-foreground text-sm leading-5">
                      Issues Found
                    </span>
                    <AlertTriangle className="size-4 text-amber-500" />
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="font-semibold text-3xl leading-9 tracking-tight">
                    18
                  </div>
                  <p className="text-muted-foreground text-xs leading-4">
                    Across active analyses
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm rounded-2xl border-border p-4 gap-4">
                <CardHeader className="p-0 gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-muted-foreground text-sm leading-5">
                      Active Analyses
                    </span>
                    <Activity className="size-4 text-emerald-500" />
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="font-semibold text-3xl leading-9 tracking-tight">
                    7
                  </div>
                  <p className="text-muted-foreground text-xs leading-4">
                    Running right now
                  </p>
                </CardContent>
              </Card>
            </aside>

            <main className="min-w-0 space-y-6 flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h1 className="font-semibold text-3xl leading-9 tracking-tight">
                    Your Repositories
                  </h1>

                  <p className="text-muted-foreground text-sm leading-5 mt-1">
                    Monitor code health, issues, and analysis status across
                    connected repos.
                  </p>
                </div>

                <ConnectRepoDialog
                  githubConnected={user.github_connected}
                  repositories={repositories}
                  setSearchValue={setSearchValue}
                  loading={repoLoading}
                  setLoading={setRepoLoading}
                  token={token}
                />
              </div>

              <div className="shadow-sm rounded-2xl bg-card border-border border flex flex-col sm:flex-row p-3 items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <Search className="pointer-events-none top-1/2 size-4 -translate-y-1/2 text-muted-foreground absolute left-3" />

                  <Input
                    className="rounded-xl border-border pl-10 h-11 w-full"
                    placeholder="Search repositories"
                  />
                </div>

                <Select>
                  <SelectTrigger className="rounded-xl border-border w-full sm:w-45 h-11">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                </Select>
              </div>

              {user.repositories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.repositories.map((repo) => (
                    <RepoCard key={repo.github_repo_id} repo={repo} />
                  ))}
                </div>
              ) : (
                <NoRepositories />
              )}
            </main>
          </div>
        </div>
      ) : (
        <ConnectGithub />
      )}
    </div>
  );
};

export default Dashboard;
