'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

export default function LenisProvider({
  children
}: {
  children: React.ReactNode;
}) {
  if (typeof window === 'undefined') {
    return children;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 2,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
} 