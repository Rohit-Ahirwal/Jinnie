import { GitBranch, MessageSquare, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: GitBranch,
    title: "Repo-aware",
    description:
      "Understands your codebase structure, dependencies, and patterns.",
  },
  {
    icon: MessageSquare,
    title: "Chat naturally",
    description:
      "Ask about bugs, features, routes, and implementation details.",
  },
  {
    icon: ShieldCheck,
    title: "Secure access",
    description: "Connect via GitHub OAuth and keep your workflow private.",
  },
];

export default function Features() {
  return (
    <section className="space-y-4">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div
            key={feature.title}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="size-10 rounded-xl bg-muted flex items-center justify-center mb-4">
              <Icon className="size-5" />
            </div>

            <h3 className="font-semibold text-lg">{feature.title}</h3>

            <p className="text-sm text-muted-foreground mt-2">
              {feature.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}
