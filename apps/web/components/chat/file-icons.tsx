import {
  FileCode2,
  FileJson2,
  FileText,
  FileType,
  Folder,
  FolderOpen,
} from "lucide-react";

interface Props {
  filename: string;
  open?: boolean;
  folder?: boolean;
}

export function FileIcon({ filename, folder, open }: Props) {
  if (folder) {
    return open ? (
      <FolderOpen className="size-4 text-primary" />
    ) : (
      <Folder className="size-4 text-primary" />
    );
  }

  if (filename.endsWith(".tsx"))
    return <FileCode2 className="size-4 text-sky-500" />;

  if (filename.endsWith(".ts"))
    return <FileCode2 className="size-4 text-sky-500" />;

  if (filename.endsWith(".json"))
    return <FileJson2 className="size-4 text-yellow-500" />;

  if (filename.endsWith(".md"))
    return <FileText className="size-4 text-neutral-500" />;

  return <FileType className="size-4 text-muted-foreground" />;
}
