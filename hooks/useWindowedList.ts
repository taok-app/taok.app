'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface UseWindowedListOptions {
  /** How many items to show initially and reveal per batch. */
  batchSize?: number
}

interface UseWindowedListResult<T> {
  visible: T[]
  hasMore: boolean
  /** Attach to a sentinel element at the end of the list to auto-load on scroll. */
  sentinelRef: (node: HTMLElement | null) => void
  showMore: () => void
}

/**
 * Lightweight incremental rendering for potentially large lists.
 *
 * Instead of pulling in a virtualization dependency, we progressively reveal
 * items in batches and auto-advance when a sentinel scrolls into view. Resets
 * whenever the underlying collection identity changes.
 */
export function useWindowedList<T>(
  items: T[],
  { batchSize = 25 }: UseWindowedListOptions = {},
): UseWindowedListResult<T> {
  const [count, setCount] = useState(batchSize)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    setCount(batchSize)
  }, [items, batchSize])

  const showMore = useCallback(() => {
    setCount((current) => Math.min(current + batchSize, items.length))
  }, [batchSize, items.length])

  const sentinelRef = useCallback(
    (node: HTMLElement | null) => {
      observerRef.current?.disconnect()
      if (node === null) return
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            setCount((current) =>
              current >= items.length ? current : Math.min(current + batchSize, items.length),
            )
          }
        },
        { rootMargin: '200px' },
      )
      observerRef.current.observe(node)
    },
    [batchSize, items.length],
  )

  useEffect(() => () => observerRef.current?.disconnect(), [])

  return {
    visible: items.slice(0, count),
    hasMore: count < items.length,
    sentinelRef,
    showMore,
  }
}
