import { Suspense } from 'react';
import { MarkdownContent } from './markdown-content';
import { Skeleton } from '@/components/ui/skeleton';

interface MarkdownContentWrapperProps {
  content: string;
  className?: string;
}

function MarkdownContentLoader() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export async function MarkdownContentWrapper({ content, className }: MarkdownContentWrapperProps) {
  return (
    <Suspense fallback={<MarkdownContentLoader />}>
      <MarkdownContent content={content} className={className} />
    </Suspense>
  );
}