'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TocLinkProps {
  id: string
  children: React.ReactNode
  className?: string
}

export function TocLink({ id, children, className }: TocLinkProps) {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsActive(true)
          } else {
            setIsActive(false)
          }
        })
      },
      {
        rootMargin: '-20% 0px -80% 0px'
      }
    )

    const element = document.getElementById(id)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [id])

  const handleClick = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [id])

  return (
    <a
      href={`#${id}`}
      onClick={handleClick}
      className={cn(
        'block py-1 text-muted-foreground hover:text-blue-500 transition-colors',
        isActive && 'text-primary font-medium',
        className
      )}
    >
      {children}
    </a>
  )
} 