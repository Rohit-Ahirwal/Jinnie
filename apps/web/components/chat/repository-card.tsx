import { GitBranch } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function RepositoryCard() {
  return (
    <div className="rounded-2xl border bg-muted/30 p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
          <FaGithub className="size-5 text-primary" />
        </div>

        <div className="min-w-0">
          <p className="truncate font-medium">next-dynamic-metadata</p>

          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <GitBranch className="size-3" />
            <span>main</span>
          </div>
        </div>
      </div>
    </div>
  );
}
