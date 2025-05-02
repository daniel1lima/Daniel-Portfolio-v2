'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import Image from 'next/image'
import { useState } from 'react'

interface ImageModalProps {
  src: string
  alt: string
  caption?: string
  className?: string
}

export function ImageModal({ src, alt, caption, className }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!src) {
    console.warn('ImageModal: No src provided')
    return null
  }

  return (
    <>
      <figure 
        className={`cursor-pointer transition-transform hover:scale-[1.02] ${className || ''}`}
        onClick={() => setIsOpen(true)}
      >
        <img
          src={src}
          alt={alt}
          className="rounded-lg shadow-lg w-full"
          loading="lazy"
        />
        {caption && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </figure>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0">
          <div className="relative aspect-video w-full">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
          {caption && (
            <p className="p-4 text-center text-sm text-muted-foreground">
              {caption}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
} 