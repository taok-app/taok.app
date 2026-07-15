'use client'

import React from 'react'
import { Menu, X, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function WorkspaceHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const [menuOpen, setMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    onMenuClick()
  }

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card px-4 py-3 h-16 w-full">
      {/* Mobile menu button */}
      <button
        onClick={toggleMenu}
        className="p-2 hover:bg-slate-100 rounded-lg lg:hidden transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
        aria-label={menuOpen ? 'Close sidebar' : 'Open sidebar'}
        aria-expanded={menuOpen}
        aria-controls="mobile-sidebar"
      >
        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Logo */}
      <a
        href="/"
        className="font-display text-lg ml-2 lg:ml-0 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 rounded px-1"
      >
        Taok
      </a>

      {/* Search bar - hidden on mobile */}
      <div className="hidden md:flex flex-1 max-w-sm mx-4 items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 border border-border focus-within:ring-2 focus-within:ring-slate-900 focus-within:ring-offset-2 transition-all">
        <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 bg-transparent text-sm outline-none text-slate-600 placeholder:text-slate-400"
          disabled
          aria-label="Search (coming soon)"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 lg:gap-4">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
        >
          <a href="/">Exit workspace</a>
        </Button>
      </div>
    </header>
  )
}
