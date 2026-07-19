import type { LucideIcon } from "lucide-react";
import {
  Braces,
  Database,
  File,
  FileCode2,
  FileJson,
  FileText,
  Image,
  Lock,
  Package,
  Settings,
  Terminal,
} from "lucide-react";

export function getFileIcon(filename: string): LucideIcon {
  const extension = filename.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "ts":
    case "tsx":
    case "js":
    case "jsx":
    case "py":
    case "java":
    case "kt":
    case "go":
    case "rs":
    case "c":
    case "cpp":
    case "cs":
      return FileCode2;

    case "json":
      return FileJson;

    case "md":
    case "txt":
      return FileText;

    case "css":
    case "scss":
    case "sass":
    case "less":
    case "html":
    case "xml":
      return Braces;

    case "yaml":
    case "yml":
    case "toml":
      return Settings;

    case "sql":
      return Database;

    case "sh":
    case "bash":
    case "zsh":
      return Terminal;

    case "svg":
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "webp":
      return Image;

    case "env":
      return Lock;

    case "lock":
      return Package;

    default:
      return File;
  }
}
