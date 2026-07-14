export default function HomeFooter() {
  return (
    <footer className="mt-12 pb-8">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-muted-foreground">
          © 2026 Jinnie. Built for developers who ship faster.
        </p>

        <div className="flex justify-center gap-4 mt-3 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition">
            Privacy
          </a>

          <a href="#" className="hover:text-foreground transition">
            Terms
          </a>

          <a href="#" className="hover:text-foreground transition">
            Security
          </a>
        </div>
      </div>
    </footer>
  );
}
