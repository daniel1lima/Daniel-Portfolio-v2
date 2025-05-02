import TextReveal from '@/components/motion/text-reveal';
import React from 'react';
import Line from '@/components/motion/line';

export default function About() {
  return (
    <main className="my-24 flex-1">
      <section
        className="relative flex min-h-[calc(50dvh)] items-center justify-center"
        id="hero"
      >
        <div className="flex flex-col items-center md:max-w-7xl">
          <h1 className="leading-wide tracking-relaxed text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
            <TextReveal delay={0.1}>
              Hopefully I&apos;ll find some time to write something here...
            </TextReveal>
          </h1>

          <Line className={'mt-16'} />
        </div>
      </section>
    </main>
  );
}
