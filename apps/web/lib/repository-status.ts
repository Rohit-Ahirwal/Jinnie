export type RepositoryStatus =
  | "pending"
  | "cloning"
  | "scanning"
  | "syncing"
  | "completed"
  | "failed";

export function getRepositoryStatus(status: RepositoryStatus) {
  switch (status) {
    case "pending":
      return {
        label: "Pending",
        textClass: "text-neutral-500 dark:text-neutral-400 font-medium",
        progressClass: "bg-neutral-400",
      };

    case "cloning":
      return {
        label: "Cloning repository...",
        textClass: "text-blue-600 dark:text-blue-400 font-medium",
        progressClass: "bg-blue-500",
      };

    case "scanning":
      return {
        label: "Scanning files...",
        textClass: "text-cyan-600 dark:text-cyan-400 font-medium",
        progressClass: "bg-cyan-500",
      };

    case "syncing":
      return {
        label: "Syncing repository...",
        textClass: "text-amber-600 dark:text-amber-400 font-medium",
        progressClass: "bg-amber-500",
      };

    case "completed":
      return {
        label: "Analysis Complete",
        textClass: "text-emerald-600 dark:text-emerald-400 font-medium",
        progressClass: "bg-emerald-500",
      };

    case "failed":
      return {
        label: "Analysis Failed",
        textClass: "text-red-600 dark:text-red-400 font-medium",
        progressClass: "bg-red-500",
      };
  }
}
