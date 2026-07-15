import { FileCode2 } from "lucide-react";

const files = ["src/auth.ts", "package.json", "README.md"];

export default function ReferencedFiles() {
  return (
    <div>
      <h3 className="mb-3 font-medium">Referenced Files</h3>

      <div className="space-y-2">
        {files.map((file) => (
          <button
            key={file}
            className="flex w-full items-center gap-3 rounded-xl border p-3 transition-all hover:border-primary/40 hover:bg-accent"
          >
            <FileCode2 className="size-4 text-primary" />

            <span className="truncate text-sm">{file}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
