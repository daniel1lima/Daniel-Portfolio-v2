'use client';

import dynamic from 'next/dynamic';

const Loader = dynamic(() => import('@/app/loader'), {
  ssr: false
});

export default function ClientLoader() {
  return <Loader />;
} 