'use client'

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <section className="w-full max-w-lg border border-border bg-card p-8 text-card-foreground">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Unable to load</p>
        <h1 className="mt-4 font-display text-4xl text-balance">This view encountered an unexpected error.</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">Retry the current view or return to the supported research workspace.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="bg-foreground px-4 py-2 text-sm font-medium text-background">Try again</button>
          <a href="/research" className="border border-border px-4 py-2 text-sm font-medium hover:bg-accent">Open research</a>
          <a href="/" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground">Return home</a>
        </div>
      </section>
    </main>
  )
}
