export default function HomeFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <div
        className="
          max-w-[1180px]
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-8
          flex
          flex-col
          sm:flex-row
          items-center
          justify-between
          gap-4
        "
      >
        <div className="text-center sm:text-left">
          <p className="font-medium">Jinnie</p>

          <p className="mt-1 text-sm text-muted-foreground">
            AI engineering assistant for developers.
          </p>
        </div>

        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <a
            href="#"
            className="
              hover:text-foreground
              transition-colors
            "
          >
            Privacy
          </a>

          <a
            href="#"
            className="
              hover:text-foreground
              transition-colors
            "
          >
            Terms
          </a>

          <a
            href="#"
            className="
              hover:text-foreground
              transition-colors
            "
          >
            Security
          </a>
        </div>

        <p className="text-sm text-muted-foreground">© 2026 Jinnie</p>
      </div>
    </footer>
  );
}
