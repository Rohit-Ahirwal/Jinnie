"use client";

import { FolderGit2, Globe, Lock, GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface RepositoryCardProps {
  name?: string;
  isPrivate?: boolean;
  branch?: string;
  indexed?: boolean;
  fileCount?: number;
}

export default function RepositoryCard({
  name = "Jinnie",
  isPrivate = false,
  branch = "main",
  indexed = true,
  fileCount = 1248,
}: RepositoryCardProps) {
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
      <div className="flex items-start gap-3">
        <motion.div
          whileHover={{ rotate: -5, scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <FolderGit2 className="size-5" />
        </motion.div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold">{name}</h3>

          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            {isPrivate ? (
              <Lock className="size-3" />
            ) : (
              <Globe className="size-3" />
            )}
            {isPrivate ? "Private" : "Public"} Repository
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-1">
              <GitBranch className="size-3" />
              {branch}
            </Badge>

            <Badge variant="secondary">
              {indexed ? "Indexed" : "Indexing"}
            </Badge>

            <Badge variant="outline">{fileCount.toLocaleString()} Files</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
