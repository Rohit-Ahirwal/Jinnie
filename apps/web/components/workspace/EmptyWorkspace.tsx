"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  Bug,
  FileCode2,
  FolderGit2,
  Search,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  {
    title: "Explain Repository",
    description: "Understand the architecture and project structure.",
    icon: Search,
  },
  {
    title: "Find Bugs",
    description: "Scan the codebase for potential issues.",
    icon: Bug,
  },
  {
    title: "Review Code",
    description: "Analyze code quality and suggest improvements.",
    icon: FileCode2,
  },
  {
    title: "Generate Documentation",
    description: "Create documentation for the repository.",
    icon: Sparkles,
  },
];

export default function EmptyWorkspace() {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-5xl"
      >
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
            <FolderGit2 className="size-10 text-primary" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to Jinnie
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Select an existing conversation or start a new one to chat with your
            repository.
          </p>

          <Button className="mt-8 gap-2 rounded-xl">
            New Conversation
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <motion.div
                key={action.title}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="cursor-pointer transition-colors hover:border-primary/40">
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <div className="rounded-xl bg-primary/10 p-3">
                      <Icon className="size-5 text-primary" />
                    </div>

                    <CardTitle>{action.title}</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <Card className="mt-10">
          <CardHeader>
            <CardTitle>Repository Ready</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-muted-foreground">Repository</p>
              <p className="mt-1 font-medium">awesome-project</p>
            </div>

            <div>
              <p className="text-muted-foreground">Branch</p>
              <p className="mt-1 font-medium">main</p>
            </div>

            <div>
              <p className="text-muted-foreground">Status</p>
              <p className="mt-1 font-medium text-green-500">Indexed ✓</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
