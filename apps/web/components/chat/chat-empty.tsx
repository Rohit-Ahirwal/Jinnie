"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bug, FolderGit2, GitBranch, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

const suggestions = [
  {
    icon: FolderGit2,
    title: "Explain project structure",
    description: "Understand folders and architecture",
  },
  {
    icon: Search,
    title: "Find authentication flow",
    description: "Locate login and auth logic",
  },
  {
    icon: GitBranch,
    title: "Summarize repository",
    description: "Get a quick overview of the project",
  },
  {
    icon: Bug,
    title: "Help debug an issue",
    description: "Find potential problems in the code",
  },
];

export default function ChatEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-1 items-center justify-center px-8"
    >
      <div className="w-full max-w-4xl">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
            ✨
          </div>

          <h1 className="text-4xl font-bold tracking-tight">Jinnie</h1>

          <p className="mt-3 text-muted-foreground text-lg">
            Your AI pair programmer for GitHub repositories.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {suggestions.map((item) => (
            <Button
              key={item.title}
              variant="outline"
              className="h-auto justify-between rounded-2xl p-5"
            >
              <div className="flex items-start gap-4 text-left">
                <div className="rounded-xl bg-primary/10 p-3">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="font-medium">{item.title}</p>

                  <p className="mt-1 text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              </div>

              <ArrowRight className="h-4 w-4 opacity-50" />
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
