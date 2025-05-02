import type { Metadata } from 'next';
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  Montserrat
} from 'next/font/google';
import '@/styles/globals.css';
import { Analytics } from "@vercel/analytics/react"

import { Toaster } from '@/components/ui/sonner';

import { metadata as meta } from '@/app/config';
import ClientLoader from '@/components/client-loader';
import { Providers } from '@/components/providers';

import { createMetadata } from '@/lib/metadata';

import { ThemeProvider } from 'next-themes'

// https://iamsteve.me/blog/the-best-ink-trap-typefaces-for-websites
const bricolage_grotesque = Bricolage_Grotesque({ subsets: ['latin'] });

export const metadata = createMetadata({
  title: {
    absolute: meta.site.title,
    template: `%s | ${meta.site.title}`
  },
  description: meta.site.description,
  twitter: {
    title: meta.site.title,
    description: meta.site.description
  }
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={bricolage_grotesque.className}>
        <Analytics />
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
