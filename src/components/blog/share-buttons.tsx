'use client'

import { Button } from '@/components/ui/button'
import { Share2Icon, TwitterIcon, LinkedinIcon } from 'lucide-react'

interface ShareButtonsProps {
  title: string
  description: string
  url: string
}

export function ShareButtons({ title, description, url }: ShareButtonsProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600 dark:text-gray-300">Share this post:</span>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" asChild>
          <a 
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon className="size-4" />
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <a 
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon className="size-4" />
          </a>
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => {
            navigator.share({
              title,
              text: description,
              url,
            })
          }}
        >
          <Share2Icon className="size-4" />
        </Button>
      </div>
    </div>
  )
} 