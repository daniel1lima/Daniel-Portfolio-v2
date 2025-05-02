import React from 'react';
import { CardContent, CardFooter, Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { GithubIcon, GlobeIcon, InfoIcon } from 'lucide-react';
import { Project } from '@/types/project';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ProjectCardProps extends Project {
  href: string;
  thumbnail: string;
  className?: string;
}

function ProjectCard({
  title,
  description,
  thumbnail,
  tags,
  href,
  className
}: ProjectCardProps) {
  return (
    <Card
      className={cn(
        'group relative flex h-full flex-col justify-between overflow-hidden border border-zinc-950/10 bg-white transition-all duration-300 dark:border-zinc-50/10 dark:bg-zinc-900',
        className
      )}
    >
      <CardContent className="p-0">
        <div className="relative">
          <AspectRatio ratio={16 / 9} className="overflow-hidden">
            <Image
              src={thumbnail || '/placeholder.svg'}
              alt={`Image of ${title}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </AspectRatio>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
        </div>
        <div className="p-4">
          <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
            {description || ''}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags?.map((tag, index) => (
              <Badge
                key={`project-tag_${index}`}
                variant="secondary"
                className="bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2 p-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-zinc-950/10 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-md dark:border-zinc-50/10 dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
                asChild
              >
                <Link href={href}>
                  <InfoIcon className="h-4 w-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
      <Link href={href} className="absolute inset-0 z-10" />
    </Card>
  );
}

export default ProjectCard;
