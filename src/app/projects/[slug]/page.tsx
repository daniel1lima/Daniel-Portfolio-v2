import type { Metadata } from 'next';

import { MDXContent } from '@content-collections/mdx/react';

import { notFound } from 'next/navigation';
import { project } from '@/app/source';

import Header from './header';
import Image from 'next/image';
import Link from 'next/link';

import { createMetadata } from '@/lib/metadata';
import { metadata as meta } from '@/app/config';
import { Heading, headingTypes, MDXLink } from '@/lib/mdx/default-components';
import { cn } from '@/lib/utils';

import { HTMLAttributes, ReactElement, ComponentProps } from 'react';
import { Badge } from '@/components/ui/badge';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { Button } from '@/components/ui/button';
import { ArrowUpRightIcon, GithubIcon, GlobeIcon, ArrowLeftIcon } from 'lucide-react';
import { ImageModal } from '../_components/image-modal'

type FigureComponent = ComponentProps<'figure'> & {
  caption?: string;
}

interface FigureProps extends HTMLAttributes<HTMLElement> {
  caption?: string;
  children?: ReactElement;
}

export async function generateStaticParams({
  params
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  // @ts-ignore
  return project.generateParams([slug]);
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const page = project.getPage([slug]);
  if (!page) notFound();

  return createMetadata({
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      type: 'article',
      images: [
        {
          alt: 'banner',
          width: 1200,
          height: 630,
          url: `/images/projects/${slug}/cover.jpg`,
          type: 'image/png'
        }
      ],
      authors: meta.author.name
      // modifiedTime: page.data.date.toISOString()
    },
    twitter: {
      images: [
        {
          alt: 'banner',
          width: 1200,
          height: 630,
          url: `/images/projects/${slug}/cover.jpg`
        }
      ]
    }
  }) satisfies Metadata;
}

export default async function ProjectPage({
  params
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const page = project.getPage([slug]);
  if (!page) notFound();

  const {
    data: { toc, body, structuredData }
  } = page;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`/images/projects/${slug}/cover.jpg`}
            alt={`Cover image for ${page.data.title}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        {/* Back Button */}
        <div className="absolute top-8 left-8 z-20">
          <Button asChild variant="outline" className="text-white border-white hover:bg-white/10">
            <Link href="../">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {page.data.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              {page.data.description}
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {page.data.tags?.map((tag) => (
                <Badge key={tag.label} variant="secondary">
                  {tag.label}
                </Badge>
              ))}
            </div>
            <div className="flex gap-4 justify-center">
              {page.data.github && (
                <Button asChild variant="outline" className="text-white border-white hover:bg-white/10">
                  <a href={page.data.github} target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>
              )}
              {page.data.website && (
                <Button asChild variant="outline" className="text-white border-white hover:bg-white/10">
                  <a href={page.data.website} target="_blank" rel="noopener noreferrer">
                    <GlobeIcon className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
              {/* Main Content */}
              <div className="prose dark:prose-invert max-w-none">
                <MDXContent
                  code={body}
                  components={{
                    a: MDXLink,
                    img: (props) => {
                      console.log('Image props:', props); // Debug log
                      return (
                        <ImageModal
                          src={props.src || ''}
                          alt={props.alt || ''}
                          className="my-8"
                        />
                      );
                    },
                    // Custom video component
                    video: (props) => (
                      <div className="my-8 aspect-video">
                        <video
                          className="rounded-xl w-full shadow-lg"
                          controls
                          {...props}
                        />
                      </div>
                    ),
                    // YouTube embed component
                    iframe: (props) => {
                      if (props.src?.includes('youtube.com') || props.src?.includes('youtu.be')) {
                        return (
                          <div className="my-8 aspect-video">
                            <iframe
                              className="rounded-xl w-full shadow-lg"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              {...props}
                            />
                          </div>
                        );
                      }
                      return <iframe {...props} />;
                    },
                    // Image with caption
                    figure: (props: FigureComponent) => {
                      const imgElement = props.children as ReactElement;
                      console.log('Figure props:', props); // Debug log
                      return (
                        <ImageModal
                          src={imgElement?.props?.src || ''}
                          alt={imgElement?.props?.alt || ''}
                          caption={props.caption}
                          className="my-8"
                        />
                      );
                    },
                    ...Object.fromEntries(
                      headingTypes.map((type) => [
                        type,
                        (props: HTMLAttributes<HTMLHeadingElement>) => (
                          <Heading as={type} {...props} />
                        )
                      ])
                    ),
                    pre: ({ className, style: _style, ...props }) => (
                      <pre
                        className={cn(
                          'max-h-[500px] overflow-auto rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-sm',
                          className
                        )}
                        {...props}
                      >
                        {props.children}
                      </pre>
                    )
                  }}
                />
              </div>

              {/* Table of Contents */}
              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <TableOfContents content={body} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
