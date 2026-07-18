const stats = [
  {
    value: "24",
    title: "Repositories",
    description: "Connected",
  },
  {
    value: "18",
    title: "Issues",
    description: "Detected with AI context",
  },
  {
    value: "7",
    title: "Analyses",
    description: "Running now",
  },
  {
    value: "42h",
    title: "Time saved",
    description: "This month",
    highlight: true,
  },
];

export default function Stats() {
  return (
    <section className="mt-12 rounded-3xl border border-border bg-background p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Workspace overview</h2>
          <p className="text-sm text-muted-foreground">
            Your AI engineering activity
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`
              group rounded-2xl p-4
              transition-all duration-200
              hover:bg-muted/50
              ${stat.highlight ? "bg-primary/5" : ""}
            `}
          >
            <p className="text-sm text-muted-foreground">{stat.title}</p>

            <div className="mt-3 flex items-baseline gap-2">
              <h3 className="text-4xl font-semibold tracking-tight">
                {stat.value}
              </h3>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
