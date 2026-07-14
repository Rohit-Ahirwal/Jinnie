import {
  CheckCircle2,
  GitBranch,
  MessageSquare,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProductDemo() {
  return (
    <section className="mt-12 rounded-3xl border border-border bg-muted/30 p-4 sm:p-6">
      <div className="space-y-3">
        {/* Connect Github */}
        <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-4">
          <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
            <GitBranch className="size-5" />
          </div>

          <div>
            <h3 className="font-medium">Connect GitHub</h3>

            <p className="text-sm text-muted-foreground">
              Authorize your repository
            </p>
          </div>
        </div>

        {/* Find issues */}
        <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-4">
          <div className="size-10 rounded-xl bg-muted flex items-center justify-center">
            <Search className="size-5" />
          </div>

          <div>
            <h3 className="font-medium">Find issues</h3>

            <p className="text-sm text-muted-foreground">Locate bugs faster</p>
          </div>
        </div>

        {/* Code Analysis */}
        <div className="rounded-2xl border border-border bg-card p-5 mt-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">Live code analysis</h3>

              <p className="text-sm text-muted-foreground">
                See how the assistant reasons over your repo.
              </p>
            </div>

            <Badge variant="secondary" className="rounded-full">
              Realtime
            </Badge>
          </div>

          {/* Code window */}

          <div className="mt-5 rounded-xl bg-neutral-950 p-5 text-neutral-200 text-xs font-mono overflow-hidden">
            <div className="flex justify-between text-neutral-400 mb-4">
              <span>src/api/routes.ts</span>

              <span>Lines 42-58</span>
            </div>

            <pre className="leading-6">
              {`const payload = await req.json()
  
  const repo = await db.repo.findUnique(...)
  
  return new Response(JSON.stringify(repo))`}
            </pre>
          </div>

          {/* Suggested fix */}

          <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <div className="flex gap-2 items-center text-emerald-600 dark:text-emerald-400 font-medium text-sm">
              <CheckCircle2 className="size-4" />
              Suggested fix
            </div>

            <p className="text-sm text-muted-foreground mt-2">
              Validate the request body before querying the database and return
              a clear 400 response for invalid payloads.
            </p>
          </div>
        </div>

        {/* Questions */}

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">What you can ask</h3>

              <p className="text-sm text-muted-foreground">
                Built for debugging and code understanding.
              </p>
            </div>

            <MessageSquare className="size-5 text-muted-foreground" />
          </div>

          <div className="mt-5 space-y-3">
            {[
              [
                "Why is this route failing?",
                "Get a root-cause explanation with exact file references.",
              ],
              [
                "Show me the exact line",
                "Jump straight to the code that needs attention.",
              ],
              [
                "How do I fix this safely?",
                "Receive a suggested patch and implementation guidance.",
              ],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-xl border border-border p-4">
                <h4 className="text-sm font-medium">{title}</h4>

                <p className="text-sm text-muted-foreground mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
