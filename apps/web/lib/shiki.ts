import { createHighlighter } from "shiki";

export const highlighterPromise = createHighlighter({
  themes: ["vitesse-dark", "vitesse-light", "github-dark", "github-light"],
  langs: [
    "typescript",
    "javascript",
    "tsx",
    "jsx",
    "python",
    "json",
    "bash",
    "css",
    "html",
    "sql",
    "yaml",
    "markdown",
    "diff",
  ],
});