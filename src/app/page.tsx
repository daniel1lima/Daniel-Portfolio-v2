import {
  Header,
  Hero,
  About,
  Skills,
  Experience,
  Projects,
  Footer,
} from '@/components/sections';
import CoverImages from '@/components/sections/coverimages/coverimages';

import Scroller from '@/components/sections/scroller/modern/scroller';

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* <Header loader={true} /> */}
      <main className="flex-1">
        <Hero />
        <CoverImages />
        <About />
        {/* <Skills /> */}
        <Scroller/>
        <Projects />
        <Experience />
        <Footer />
      </main>
    </div>
  );
}
