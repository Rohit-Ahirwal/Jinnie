const stats = [
  {
    value: "24",
    title: "Connected repos",
    description: "Across teams and projects",
  },
  {
    value: "18",
    title: "Issues surfaced",
    description: "With actionable context",
  },
  {
    value: "7",
    title: "Active analyses",
    description: "Running right now",
  },
  {
    value: "42h",
    title: "Time saved",
    description: "Estimated per month",
  },
];

export default function Stats() {
  return (
    <section className="mt-12 rounded-3xl border border-border bg-muted/20 p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl bg-muted/50 border border-border p-6"
          >
            <p className="text-sm text-muted-foreground">{stat.title}</p>

            <h3 className="mt-2 text-3xl font-bold tracking-tight">
              {stat.value}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
