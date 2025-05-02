'use client';

import { ThemeProvider } from 'next-themes';
import dynamic from 'next/dynamic';

const LenisProvider = dynamic(() => import('./lenis-provider'), {
  ssr: false
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LenisProvider>{children}</LenisProvider>
    </ThemeProvider>
  );
}
