export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <section className="w-full max-w-lg border border-border bg-card p-8 text-card-foreground">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">404 · Page not found</p>
        <h1 className="mt-4 font-display text-5xl text-balance">That destination is not available.</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">Use one of the supported routes below to continue without losing your place.</p>
        <nav aria-label="Recovery links" className="mt-8 flex flex-wrap gap-3">
          <a href="/research" className="bg-foreground px-4 py-2 text-sm font-medium text-background">Open research</a>
          <a href="/research/citations" className="border border-border px-4 py-2 text-sm font-medium hover:bg-accent">Review citations</a>
          <a href="/" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground">Return home</a>
        </nav>
      </section>
    </main>
  )
}
