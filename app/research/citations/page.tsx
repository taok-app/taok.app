import type { Metadata } from 'next'
import { CitationWorkspace } from '@/components/research/citations/CitationWorkspace'

export const metadata: Metadata = {
  title: 'Citations & Sources · Taok',
  description:
    'Every claim Taok makes is backed by inspectable, verifiable evidence — with confidence scores, source trust ratings, and full provenance.',
}

export default function CitationsPage() {
  return (
    <main className="flex h-dvh w-full flex-col overflow-hidden bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <a href="/" className="font-display text-lg hover:text-muted-foreground">Taok</a>
        <nav aria-label="Research navigation" className="flex items-center gap-4 text-sm">
          <a href="/research" className="text-muted-foreground hover:text-foreground">Workspace</a>
          <a href="/research/citations" aria-current="page" className="font-medium text-foreground">Citations</a>
        </nav>
      </header>
      <CitationWorkspace className="min-h-0 flex-1" />
    </main>
  )
}
