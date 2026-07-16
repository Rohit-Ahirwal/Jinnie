import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function SidebarSection({ title, children }: Props) {
  return (
    <section>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>

      <div className="space-y-2">{children}</div>
    </section>
  );
}
