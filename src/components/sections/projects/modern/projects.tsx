'use client';
import React, { useState } from 'react';
import MotionWrap from '@/components/motion-wrap';
import ProjectCard from './project-card';
import Reveal from '@/components/reveal';
import { project } from '@/app/source';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

function Projects() {
  const [showAll, setShowAll] = useState(false);
  const projects = [...project.getPages()].sort(
    (a, b) =>
      new Date(b.data.date ?? b.file.name).getTime() -
      new Date(a.data.date ?? a.file.name).getTime()
  );
  const highlightProjects = ['ClipMore', "Opinio", "Request", "Portfolio"];
  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <MotionWrap className="w-full py-24 lg:py-32" id="projects">
      <div className="relative px-4 md:px-6">
        {/* Gradient background */}
        <div className="absolute inset-0 from-purple-50/50 to-transparent dark:from-purple-950/20 dark:to-transparent" />
        
        <div className="relative grid gap-10">
          <div className="flex w-full flex-col items-center justify-center text-center">
            <div className="flex flex-col items-center gap-4">
              <Reveal>
                <h2 className="text-4xl font-bold sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                  My
                </h2>
              </Reveal>
              <Reveal>
                <h2 className="-mt-2 text-4xl font-bold sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                  Projects
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {displayedProjects.map((project, index) => (
              <div
                key={`project_${index}`}
                className="h-full"
              >
                <ProjectCard
                  title={project.data.title}
                  href={project.url}
                  description={project.data.description}
                  tags={project.data.tags}
                  thumbnail={`/images/projects/${project.slugs[0]}/${project.data.coverImage || 'cover.jpg'}`}
                  className={`h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                    highlightProjects.some(highlight => project.data.title.includes(highlight))
                      ? "outline outline-2 outline-purple-700 "
                      : ''
                  }`}
                />
              </div>
            ))}
          </div>

          {projects.length > 3 && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAll(!showAll)}
                className="group flex items-center gap-2 rounded-full border-2 px-8 py-6 text-lg font-medium transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/20"
              >
                {showAll ? 'Show Less' : 'View More Projects'}
                <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </MotionWrap>
  );
}

export default Projects;
