'use client'

import React, { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { TocLink } from './toc-link'

interface TableOfContentsProps {
  content: string
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const navRef = useRef<HTMLElement>(null)
  const [isHovered, setIsHovered] = React.useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const handleWheel = (e: WheelEvent) => {
      if (isHovered) {
        e.preventDefault()
        nav.scrollTop += e.deltaY
      }
    }

    nav.addEventListener('wheel', handleWheel, { passive: false })
    return () => nav.removeEventListener('wheel', handleWheel)
  }, [isHovered])

  const headings = React.useMemo(() => {
    // Match markdown headings (## Heading, ### Heading, etc.)
    const headingRegex = /^(#{2,4})\s+(.+)$/gm
    const matches = Array.from(content.matchAll(headingRegex))
    
    return matches.map(match => {
      const level = match[1].length // Number of # symbols
      const text = match[2].trim()
      // Create a slug from the heading text
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .trim()

      return {
        id,
        text,
        level
      }
    })
  }, [content])

  if (headings.length === 0) return null

  return (
    <nav 
      ref={navRef}
      className={cn(
        "sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-scroll space-y-2 text-sm",
        "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700",
        "hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-600",
        "transition-colors duration-200"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="font-medium text-lg mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              'hover:text-blue-500 transition-colors',
              heading.level === 3 && 'ml-4',
              heading.level === 4 && 'ml-8'
            )}
          >
            <TocLink id={heading.id}>{heading.text}</TocLink>
          </li>
        ))}
      </ul>
    </nav>
  )
} 