'use client';
import React from 'react';
import { CardContent, CardFooter, Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/types/project';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Technology icon mapping
const techIcons: { [key: string]: string } = {
  'TypeScript': '/icons/typescript.svg',
  'React': '/icons/react.svg',
  'Node.js': '/icons/nodejs.svg',
  'PostgreSQL': '/icons/postgresql.svg',
  'Python': '/icons/python.svg',
  'Swift': '/icons/swift.svg',
  'SwiftUI': '/icons/swiftui.svg',
  'TensorFlow': '/icons/tensorflow.svg',
  'PyTorch': '/icons/pytorch.svg',
  'Next.js': '/icons/nextjs.svg',
  'Tailwind CSS': '/icons/tailwind.svg',
  'MongoDB': '/icons/mongodb.svg',
  'Docker': '/icons/docker.svg',
  'AWS': '/icons/aws.svg',
  'Firebase': '/icons/firebase.svg',
  'GraphQL': '/icons/graphql.svg',
  'REST API': '/icons/api.svg',
  'Express': '/icons/express.svg',
  'JavaScript': '/icons/javascript.svg',
  'Flask': '/icons/flask.svg',
  'Redis': '/icons/redis.svg',
  'Neo4J DB': '/icons/neo4j.svg',
  'Vercel': '/icons/vercel.svg',
  'Analytics': '/icons/analytics.svg',
  'Automation': '/icons/automation.svg',
  'NLP': '',
  'Enterprise AI': '/icons/enterprise-ai.svg',
  'DynamoDB': '/icons/dynamodb.svg',
  'LangChain': '/icons/langchain.svg',
  'Discord.js': '/icons/discord.svg',
};

interface ProjectCardProps extends Project {
  href: string;
  thumbnail: string;
  className?: string;
}

function ProjectCard({
  title,
  description,
  href,
  thumbnail,
  tags,
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
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl">
            <Image
              src={thumbnail || '/placeholder.svg'}
              alt={`Image of ${title}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </AspectRatio>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg text-center">{title}</h3>
            <p className="mt-2 line-clamp-2 text-sm text-gray-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {description || ''}
            </p>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag, index) => {
              const icon = techIcons[tag.label];
              return (
                <Badge
                  key={`project-tag_${index}`}
                  variant="secondary"
                  className="flex items-center gap-1.5 bg-purple-100 px-2 py-1 text-purple-900 dark:bg-purple-900/20 dark:text-purple-100"
                >
                  {icon && (
                    <Image
                      src={icon}
                      alt={tag.label}
                      width={16}
                      height={16}
                      className="h-4 w-4"
                    />
                  )}
                  {tag.label}
                </Badge>
              );
            })}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2 p-6">
        <Button
          variant="ghost"
          size="sm"
          className="group flex items-center gap-2 rounded-full border border-zinc-950/10 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-md dark:border-zinc-50/10 dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
          asChild
        >
          <Link href={href}>
            View Project
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Button>
      </CardFooter>
      <Link href={href} className="absolute inset-0 z-10" />
    </Card>
  );
}

export default ProjectCard;
