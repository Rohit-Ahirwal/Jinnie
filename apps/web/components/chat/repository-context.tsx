import { GitBranch } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { FaGithub } from "react-icons/fa";

export default function RepositoryContext() {
  return (
    <div className="rounded-2xl border bg-card p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-3">
          <FaGithub className="size-5 text-primary" />
        </div>

        <div>
          <p className="font-medium">next-dynamic-metadata</p>

          <div className="mt-1 flex items-center gap-2">
            <GitBranch className="size-3 text-muted-foreground" />

            <span className="text-xs text-muted-foreground">main</span>
          </div>
        </div>
      </div>

      <Badge className="mt-4">Indexed</Badge>
    </div>
  );
}
