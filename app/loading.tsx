export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div role="status" className="flex items-center gap-3 text-sm text-muted-foreground">
        <span className="size-2 animate-pulse rounded-full bg-foreground" aria-hidden="true" />
        Loading Taok…
      </div>
    </main>
  )
}
