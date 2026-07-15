'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid, FileText, Users, Settings, HelpCircle } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/workspace', icon: LayoutGrid },
  { label: 'Research', href: '/research', icon: FileText },
  { label: 'Team', href: '/workspace/team', icon: Users },
]

const footerItems = [
  { label: 'Settings', href: '/workspace/settings', icon: Settings },
  { label: 'Help', href: '/workspace/help', icon: HelpCircle },
]

interface WorkspaceSidebarProps {
  onClose?: () => void
}

export default function WorkspaceSidebar({ onClose }: WorkspaceSidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/workspace') {
      return pathname === '/workspace'
    }
    return pathname.startsWith(href)
  }

  const handleNavClick = () => {
    // Close mobile sidebar when navigating
    if (onClose && window.innerWidth < 1024) {
      onClose()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-border flex-shrink-0">
        <a
          href="/"
          className="font-display text-lg text-slate-900 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 rounded px-1 inline-block"
          onClick={handleNavClick}
        >
          Taok
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-auto" aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              aria-current={active ? 'page' : undefined}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 ${
                active
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 active:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer items */}
      <nav className="px-2 py-4 border-t border-border space-y-1 flex-shrink-0" aria-label="Settings">
        {footerItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              aria-current={active ? 'page' : undefined}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 ${
                active
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 active:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
