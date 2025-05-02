'use client';

import dynamic from 'next/dynamic';

const SmoothScroll = dynamic(() => import('./smooth-scroll'), {
  ssr: false
});

export default function ClientSmoothScroll({ children }: { children: React.ReactNode }) {
  return <SmoothScroll>{children}</SmoothScroll>;
} 