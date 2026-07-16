'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import WorkspaceHeader from '../header/WorkspaceHeader'
import WorkspaceSidebar from '../sidebar/WorkspaceSidebar'

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  // Get page title from current path
  const getPageTitle = (path: string): string | undefined => {
    if (path === '/workspace') return undefined
    if (path === '/workspace/team') return 'Team'
    if (path === '/workspace/settings') return 'Settings'
    if (path === '/workspace/help') return 'Help'
    return undefined
  }

  const pageTitle = getPageTitle(pathname)

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen && window.innerWidth < 1024) {
        setSidebarOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [sidebarOpen])

  // Close sidebar when viewport expands to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card flex-shrink-0">
        <WorkspaceSidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
          role="presentation"
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        id="mobile-sidebar"
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-card border-r border-border overflow-auto transition-transform duration-300 ease-out lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <WorkspaceSidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <WorkspaceHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} pageTitle={pageTitle} />
        <main className="flex-1 overflow-auto" role="main">
          {children}
        </main>
      </div>
    </div>
  )
}
