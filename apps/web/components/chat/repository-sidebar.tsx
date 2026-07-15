"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import FileTree from "./file-tree";
import RepositoryCard from "./repository-card";

export default function RepositorySidebar() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input placeholder="Search files..." className="pl-9" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <FileTree />
      </div>

      <div className="border-t p-4">
        <RepositoryCard />
      </div>
    </div>
  );
}
