import { FileCode2 } from "lucide-react";

export default function SourceChip({ name }: { name: string }) {
  return (
    <button
      className="
        flex
        w-full
        items-center
        gap-2
        rounded-lg
        border
        px-3
        py-2
        text-sm
        transition-colors
        hover:bg-muted
      "
    >
      <FileCode2 className="size-4 text-primary" />

      <span className="truncate">{name}</span>
    </button>
  );
}
