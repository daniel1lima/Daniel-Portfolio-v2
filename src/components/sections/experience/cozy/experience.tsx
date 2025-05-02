'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import MotionWrap from '@/components/motion-wrap';
import ExperienceCard from './experience-card';
import { experiences } from '@/components/sections/experience/config';
import TextReveal from '@/components/motion/text-reveal';
import Image from 'next/image';

function Experiences() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: -50,
      transition: {
        duration: 0.3,
      }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: {
        duration: 0.2,
      }
    }
  };

  return (
    <MotionWrap className="min-h-screen w-full py-24 lg:py-32" id="experiences">
      <div className="relative h-full w-full px-4 md:px-6">
        {/* Background Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />
        </motion.div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 space-y-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none"
            >
              <TextReveal>My Journey</TextReveal>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto max-w-2xl text-gray-500 dark:text-gray-400"
            >
              <TextReveal>
                A timeline of my professional growth, where each experience has shaped my expertise and passion for technology.
              </TextReveal>
            </motion.p>
          </div>

          {/* Experience Timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-pink-500/50" />

            {/* Experience Cards */}
            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <motion.div
                  key={`experience_${index}`}
                  variants={itemVariants}
                  className="relative flex items-center gap-28 flex-row pr-48 justify-start"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 ring-4 ring-white dark:ring-gray-900" />

                  {/* Experience Card */}
                  <div 
                    className="w-full max-w-xl"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <ExperienceCard
                      name={experience.name}
                      description={experience.description}
                      company={experience.company}
                      duration={experience.duration}
                    />
                  </div>

                  {/* Images Container */}
                  <AnimatePresence>
                    {hoveredIndex === index && experience.images && (
                      <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 top-0 flex gap-4"
                      >
                        {experience.images.map((image, imageIndex) => (
                          <motion.div
                            key={`image_${imageIndex}`}
                            className="relative h-48 w-48 overflow-hidden rounded-lg shadow-lg"
                          >
                            <Image
                              src={image}
                              alt={`${experience.company} experience image ${imageIndex + 1}`}
                              fill
                              className="object-cover"
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </MotionWrap>
  );
}

export default Experiences;
