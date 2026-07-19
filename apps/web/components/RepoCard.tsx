"use client";

import { motion } from "framer-motion";
import { Star, Bug, CalendarClock, Lock, Globe } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RepoDB } from "@/types";
import { timeAgo } from "@/lib/timeAgo";
import { getRepositoryStatus } from "@/lib/repository-status";
import Link from "next/link";

export default function RepoCard({ repo }: { repo: RepoDB }) {
  const status = getRepositoryStatus(repo.status);

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="group rounded-2xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-md transition p-5 gap-4">
        <CardHeader className="p-0 gap-4">
          <div className="flex justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={`size-2 rounded-full ${repo.status === "completed" ? "bg-emerald-500" : "bg-amber-500"}`}
                />

                <h3
                  title={repo.repo_name}
                  className="font-semibold text-neutral-950 dark:text-neutral-50 truncate max-w-[180px] sm:max-w-[220px]"
                >
                  {repo.repo_name}
                </h3>
              </div>

              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-2">
                {repo.repo_description}
              </p>
            </div>

            <Badge
              variant="secondary"
              className="rounded-full h-fit dark:bg-neutral-900 dark:text-neutral-200 shrink-0"
            >
              {repo.private ? (
                <div className="flex space-x-1 items-center">
                  <Lock className="size-3 mr-1" />
                  <span>Private</span>
                </div>
              ) : (
                <div className="flex space-x-1 items-center">
                  <Globe className="size-3 mr-1" />
                  <span>Public</span>
                </div>
              )}
            </Badge>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Badge className="rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
              {repo.language}
            </Badge>

            <Badge
              variant="outline"
              className="rounded-full dark:border-neutral-700 dark:text-neutral-300"
            >
              AI Indexed
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0 space-y-4">
          <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="flex gap-1 items-center">
              <Star className="size-3.5" />
              {repo.stars}
            </span>

            <span className="flex gap-1 items-center">
              <Bug className="size-3.5" />
              {repo.issues}
            </span>

            <span className="flex gap-1 items-center">
              <CalendarClock className="size-3.5" />
              {timeAgo(repo.analyzed_at)}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className={status.textClass}>{status.label}</span>

              <span className="text-neutral-500 dark:text-neutral-400">
                {repo.progress}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-900">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${repo.progress}%` }}
                transition={{ duration: 0.8 }}
                className={`h-full rounded-full ${status.progressClass}`}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-0 flex justify-between">
          <Button
            variant="link"
            className="p-0 text-neutral-500 dark:text-neutral-400"
          >
            View Details
          </Button>

          <Link href={`/repository/${repo.github_repo_id}`}>
            <Button className="rounded-full bg-primary text-neutral-50 px-5">
              Open Chat
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
