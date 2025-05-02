import type { Metadata } from 'next';

import { Header } from '@/components/sections';

import Loader from '@/app/loader';
import SmoothScroll from '@/components/smooth-scroll';

export default function ProjectLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="flex min-h-[100dvh] flex-col">
        {children}
      </div>
  );
}
